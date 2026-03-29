import { useState } from 'react';
import { CreditCard, Smartphone, Building2, CheckCircle, Clock, XCircle, QrCode, Download, Receipt } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { mockPayments, mockStudents, Payment } from '../data/mockData';

// Platform pembayaran Indonesia dengan logo
const PAYMENT_METHODS = [
  { id: 'BCA', name: 'BCA Virtual Account', type: 'bank', color: '#0066CC' },
  { id: 'Mandiri', name: 'Mandiri Virtual Account', type: 'bank', color: '#003D79' },
  { id: 'BNI', name: 'BNI Virtual Account', type: 'bank', color: '#F15A29' },
  { id: 'BRI', name: 'BRI Virtual Account', type: 'bank', color: '#004A9C' },
  { id: 'GoPay', name: 'GoPay', type: 'ewallet', color: '#00AA13' },
  { id: 'OVO', name: 'OVO', type: 'ewallet', color: '#4C3494' },
  { id: 'DANA', name: 'DANA', type: 'ewallet', color: '#1E88E5' },
  { id: 'ShopeePay', name: 'ShopeePay', type: 'ewallet', color: '#EE4D2D' },
  { id: 'LinkAja', name: 'LinkAja', type: 'ewallet', color: '#E8313D' },
  { id: 'QRIS', name: 'QRIS (Semua E-Wallet & Bank)', type: 'qris', color: '#1DB954' },
];

export default function PembayaranPage() {
  const { user, hasPermission } = useAuth();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<typeof PAYMENT_METHODS[number] | null>(null);
  const [showQRIS, setShowQRIS] = useState(false);

  // Filter payments berdasarkan permission
  const filteredPayments = payments.filter(payment => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'murid' && payment.studentId === user.studentId) return true;
    if (user?.role === 'orangtua' && user.childrenIds?.includes(payment.studentId)) return true;
    return false;
  });

  const totalPaid = filteredPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = filteredPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = filteredPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const handlePayment = (payment: Payment) => {
    if (!hasPermission('view_payments', payment.studentId)) {
      toast.error('Anda tidak memiliki akses untuk pembayaran ini');
      return;
    }

    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const processPayment = () => {
    if (!selectedPayment || !selectedMethod) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    // Simulasi pembayaran
    setPayments(payments.map(p => 
      p.id === selectedPayment.id 
        ? { 
            ...p, 
            status: 'paid' as const, 
            paidAt: new Date().toISOString(),
            paymentMethod: selectedMethod.id as any
          }
        : p
    ));

    toast.success('Pembayaran berhasil!', {
      description: `SPP ${selectedPayment.month} ${selectedPayment.year} telah dibayar melalui ${selectedMethod.name}`
    });

    setDialogOpen(false);
    setSelectedPayment(null);
    setSelectedMethod(null);
    setShowQRIS(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            <CheckCircle size={14} />
            Lunas
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
            <Clock size={14} />
            Menunggu
          </span>
        );
      case 'overdue':
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
            <XCircle size={14} />
            Terlambat
          </span>
        );
      default:
        return null;
    }
  };

  const getStudentName = (studentId: string) => {
    return mockStudents.find(s => s.id === studentId)?.name || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-['Inter',sans-serif]">PEMBAYARAN SPP</h1>
        <p className="text-gray-400 mt-1">Kelola pembayaran SPP sekolah</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <CheckCircle className="text-green-400" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Sudah Dibayar</p>
          <p className="text-2xl font-bold text-green-400">
            Rp {totalPaid.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Clock className="text-yellow-400" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Belum Dibayar</p>
          <p className="text-2xl font-bold text-yellow-400">
            Rp {totalPending.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <XCircle className="text-red-400" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Terlambat</p>
          <p className="text-2xl font-bold text-red-400">
            Rp {totalOverdue.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Tabel Pembayaran */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.04]">
              <tr>
                {user?.role === 'admin' && (
                  <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">SISWA</th>
                )}
                <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">BULAN</th>
                <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">TAHUN</th>
                <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">JUMLAH</th>
                <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">STATUS</th>
                <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">METODE</th>
                <th className="px-6 py-4 text-left font-['Inter',sans-serif] text-sm">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    Tidak ada data pembayaran
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/[0.02] transition-colors">
                    {user?.role === 'admin' && (
                      <td className="px-6 py-4 text-sm">{getStudentName(payment.studentId)}</td>
                    )}
                    <td className="px-6 py-4 font-medium">{payment.month}</td>
                    <td className="px-6 py-4 text-sm">{payment.year}</td>
                    <td className="px-6 py-4 font-bold text-[#00aeff]">
                      Rp {payment.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                    <td className="px-6 py-4 text-sm">
                      {payment.paymentMethod || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {payment.status === 'paid' ? (
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] hover:bg-[#00aeff]/20 rounded-lg transition-all text-sm"
                          onClick={() => toast.info('Mendownload bukti pembayaran...')}
                        >
                          <Download size={16} />
                          Unduh Bukti
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-[#00aeff] hover:bg-[#00aeff]/80 rounded-lg transition-all text-sm font-['Inter',sans-serif]"
                          onClick={() => handlePayment(payment)}
                        >
                          <CreditCard size={16} />
                          BAYAR
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Dialog */}
      {dialogOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/[0.06]">
              <h2 className="text-xl font-['Inter',sans-serif]">PILIH METODE PEMBAYARAN</h2>
              <p className="text-gray-400 text-sm mt-1">
                Pembayaran SPP {selectedPayment.month} {selectedPayment.year} - Rp {selectedPayment.amount.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Bank Transfer */}
              <div>
                <h3 className="text-sm font-['Inter',sans-serif] mb-3 flex items-center gap-2">
                  <Building2 size={16} />
                  TRANSFER BANK
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.filter(m => m.type === 'bank').map(method => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method)}
                      className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                        selectedMethod?.id === method.id
                          ? 'border-[#00aeff] bg-[#00aeff]/10'
                          : 'border-white/[0.06] hover:border-white/[0.12]'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: method.color }}
                      >
                        {method.id}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs text-gray-400">Virtual Account</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* E-Wallet */}
              <div>
                <h3 className="text-sm font-['Inter',sans-serif] mb-3 flex items-center gap-2">
                  <Smartphone size={16} />
                  E-WALLET
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.filter(m => m.type === 'ewallet').map(method => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method)}
                      className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                        selectedMethod?.id === method.id
                          ? 'border-[#00aeff] bg-[#00aeff]/10'
                          : 'border-white/[0.06] hover:border-white/[0.12]'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: method.color }}
                      >
                        {method.id.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{method.name}</p>
                        <p className="text-xs text-gray-400">E-Wallet</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* QRIS */}
              <div>
                <h3 className="text-sm font-['Inter',sans-serif] mb-3 flex items-center gap-2">
                  <QrCode size={16} />
                  QRIS
                </h3>
                <button
                  onClick={() => {
                    setSelectedMethod(PAYMENT_METHODS.find(m => m.id === 'QRIS')!);
                    setShowQRIS(true);
                  }}
                  className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 w-full ${
                    selectedMethod?.id === 'QRIS'
                      ? 'border-[#00aeff] bg-[#00aeff]/10'
                      : 'border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="w-12 h-12 bg-[#1DB954] rounded-lg flex items-center justify-center">
                    <QrCode size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">QRIS (Quick Response Code Indonesian Standard)</p>
                    <p className="text-xs text-gray-400">Scan untuk bayar dengan semua e-wallet & bank</p>
                  </div>
                </button>

                {showQRIS && selectedMethod?.id === 'QRIS' && (
                  <div className="mt-4 p-6 bg-white rounded-lg text-center">
                    <p className="text-black font-bold mb-3">Scan QR Code untuk membayar</p>
                    <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                      <QrCode size={200} className="text-black" />
                    </div>
                    <p className="text-black text-sm mt-3">
                      Total: Rp {selectedPayment.amount.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Scan menggunakan aplikasi e-wallet atau mobile banking Anda
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.06] flex gap-3 justify-end">
              <button
                onClick={() => {
                  setDialogOpen(false);
                  setSelectedMethod(null);
                  setShowQRIS(false);
                }}
                className="px-6 py-2 border border-white/[0.06] rounded-lg hover:bg-white/[0.02] transition-all"
              >
                Batal
              </button>
              <button
                onClick={processPayment}
                disabled={!selectedMethod}
                className="px-6 py-2 bg-[#00aeff] hover:bg-[#00aeff]/80 rounded-lg font-['Inter',sans-serif] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                BAYAR SEKARANG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
