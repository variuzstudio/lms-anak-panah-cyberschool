import { FileText, Download, TrendingUp, Award, Users, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-['Acumin_Variable_Concept',sans-serif]">LAPORAN</h1>
        <p className="text-gray-400 text-sm mt-1">Laporan akademik dan perkembangan siswa</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award size={20} className="text-[#00aeff]" />
            <h3 className="text-sm text-gray-400">Rata-rata Nilai</h3>
          </div>
          <p className="text-2xl font-bold text-[#00aeff]">85.5</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={20} className="text-[#1aff00]" />
            <h3 className="text-sm text-gray-400">Peningkatan</h3>
          </div>
          <p className="text-2xl font-bold text-[#1aff00]">+2.3</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-[#c800ff]" />
            <h3 className="text-sm text-gray-400">Kehadiran</h3>
          </div>
          <p className="text-2xl font-bold text-[#c800ff]">95%</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} className="text-[#ffb700]" />
            <h3 className="text-sm text-gray-400">Peringkat</h3>
          </div>
          <p className="text-2xl font-bold text-[#ffb700]">3/32</p>
        </div>
      </div>

      {/* Report List */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
        <h3 className="font-['Acumin_Variable_Concept',sans-serif] text-lg mb-4">LAPORAN TERSEDIA</h3>
        <div className="space-y-3">
          {[
            { title: 'Rapor Semester Ganjil 2025/2026', date: '15 Januari 2026', type: 'PDF' },
            { title: 'Laporan Perkembangan Bulanan - Januari', date: '31 Januari 2026', type: 'PDF' },
            { title: 'Laporan Kehadiran Semester 1', date: '20 Desember 2025', type: 'PDF' },
            { title: 'Laporan Prestasi Akademik', date: '15 Desember 2025', type: 'PDF' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-transparent rounded-lg hover:bg-transparent/70 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00aeff]/20 rounded-lg">
                  <FileText size={24} className="text-[#00aeff]" />
                </div>
                <div>
                  <h4 className="font-semibold">{report.title}</h4>
                  <p className="text-sm text-gray-400">{report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#00aeff]/20 text-[#00aeff] px-2 py-1 rounded">
                  {report.type}
                </span>
                <Button size="sm" className="bg-[#00aeff] hover:bg-[#00aeff]/80">
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Performance */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
        <h3 className="font-['Acumin_Variable_Concept',sans-serif] text-lg mb-4">PERFORMA AKADEMIK</h3>
        <div className="space-y-4">
          {[
            { subject: 'Matematika', score: 87, trend: '+3' },
            { subject: 'Bahasa Indonesia', score: 88, trend: '+2' },
            { subject: 'Fisika', score: 85, trend: '+5' },
            { subject: 'Kimia', score: 82, trend: '+1' },
            { subject: 'Biologi', score: 87, trend: '+4' },
          ].map((subject, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#00aeff]">{subject.score}</span>
                    <span className="text-xs text-green-400">{subject.trend}</span>
                  </div>
                </div>
                <div className="w-full bg-transparent rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#00aeff] to-[#1aff00] h-2 rounded-full"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
