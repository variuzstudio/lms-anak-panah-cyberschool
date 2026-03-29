import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface Attendance {
  date: string;
  status: 'present' | 'absent' | 'late' | 'sick' | 'permission';
  note?: string;
}

const MOCK_ATTENDANCE: Attendance[] = [
  { date: '2026-02-06', status: 'present' },
  { date: '2026-02-05', status: 'present' },
  { date: '2026-02-04', status: 'late', note: 'Terlambat 15 menit' },
  { date: '2026-02-03', status: 'present' },
  { date: '2026-02-02', status: 'present' },
  { date: '2026-01-30', status: 'sick', note: 'Sakit demam' },
  { date: '2026-01-29', status: 'present' },
];

export default function AbsensiPage() {
  const [attendance] = useState<Attendance[]>(MOCK_ATTENDANCE);

  const stats = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length,
    sick: attendance.filter(a => a.status === 'sick').length,
    permission: attendance.filter(a => a.status === 'permission').length,
  };

  const totalDays = attendance.length;
  const percentage = ((stats.present / totalDays) * 100).toFixed(1);

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'present': return 'Hadir';
      case 'absent': return 'Tidak Hadir';
      case 'late': return 'Terlambat';
      case 'sick': return 'Sakit';
      case 'permission': return 'Izin';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'present': return 'text-green-400 bg-green-400/20';
      case 'absent': return 'text-red-400 bg-red-400/20';
      case 'late': return 'text-yellow-400 bg-yellow-400/20';
      case 'sick': return 'text-blue-400 bg-blue-400/20';
      case 'permission': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present': return <CheckCircle size={20} className="text-green-400" />;
      case 'absent': return <XCircle size={20} className="text-red-400" />;
      case 'late': return <Clock size={20} className="text-yellow-400" />;
      case 'sick': return <XCircle size={20} className="text-blue-400" />;
      case 'permission': return <XCircle size={20} className="text-purple-400" />;
      default: return <XCircle size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-['Orbitron',sans-serif]">ABSENSI</h1>
        <p className="text-gray-400 text-sm mt-1">Rekap kehadiran siswa</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white/[0.03] border border-green-500 rounded-lg p-4">
          <CheckCircle size={24} className="text-green-400 mb-2" />
          <p className="text-2xl font-bold text-green-400">{stats.present}</p>
          <p className="text-xs text-gray-400">Hadir</p>
        </div>
        <div className="bg-white/[0.03] border border-red-500 rounded-lg p-4">
          <XCircle size={24} className="text-red-400 mb-2" />
          <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
          <p className="text-xs text-gray-400">Tidak Hadir</p>
        </div>
        <div className="bg-white/[0.03] border border-yellow-500 rounded-lg p-4">
          <Clock size={24} className="text-yellow-400 mb-2" />
          <p className="text-2xl font-bold text-yellow-400">{stats.late}</p>
          <p className="text-xs text-gray-400">Terlambat</p>
        </div>
        <div className="bg-white/[0.03] border border-blue-500 rounded-lg p-4">
          <XCircle size={24} className="text-blue-400 mb-2" />
          <p className="text-2xl font-bold text-blue-400">{stats.sick}</p>
          <p className="text-xs text-gray-400">Sakit</p>
        </div>
        <div className="bg-white/[0.03] border border-purple-500 rounded-lg p-4">
          <XCircle size={24} className="text-purple-400 mb-2" />
          <p className="text-2xl font-bold text-purple-400">{stats.permission}</p>
          <p className="text-xs text-gray-400">Izin</p>
        </div>
      </div>

      {/* Percentage */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-['Orbitron',sans-serif] text-lg">PERSENTASE KEHADIRAN</h3>
          <span className="text-3xl font-bold text-[#00aeff]">{percentage}%</span>
        </div>
        <div className="w-full bg-transparent rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-[#00aeff] to-[#1aff00] h-4 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {stats.present} dari {totalDays} hari kehadiran
        </p>
      </div>

      {/* Attendance List */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/[0.06]">
          <h3 className="font-['Orbitron',sans-serif] text-lg">RIWAYAT ABSENSI</h3>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {attendance.map((record, index) => (
            <div key={index} className="p-4 hover:bg-transparent transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getStatusIcon(record.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="font-semibold">
                      {new Date(record.date).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {record.note && (
                    <p className="text-sm text-gray-400 mt-1">{record.note}</p>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-xs ${getStatusColor(record.status)}`}>
                {getStatusLabel(record.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
