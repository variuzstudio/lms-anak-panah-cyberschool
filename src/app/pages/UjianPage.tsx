import { useState } from 'react';
import { Plus, Calendar, Clock, FileCheck, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

interface Exam {
  id: string;
  title: string;
  subject: string;
  type: 'UTS' | 'UAS' | 'Kuis' | 'Ulangan Harian';
  date: string;
  duration: number;
  room: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  score?: number;
}

const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    title: 'Ujian Tengah Semester Matematika',
    subject: 'Matematika',
    type: 'UTS',
    date: '2026-02-15',
    duration: 90,
    room: 'R.101',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Kuis Bahasa Indonesia',
    subject: 'Bahasa Indonesia',
    type: 'Kuis',
    date: '2026-02-08',
    duration: 30,
    room: 'R.102',
    status: 'completed',
    score: 88
  },
  {
    id: '3',
    title: 'Ulangan Harian Fisika',
    subject: 'Fisika',
    type: 'Ulangan Harian',
    date: '2026-02-10',
    duration: 60,
    room: 'Lab Fisika',
    status: 'upcoming'
  },
];

export default function UjianPage() {
  const { user } = useAuth();
  const [exams] = useState<Exam[]>(MOCK_EXAMS);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'text-yellow-400 bg-yellow-400/20';
      case 'ongoing': return 'text-blue-400 bg-blue-400/20';
      case 'completed': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'UTS': return 'bg-red-500/20 text-red-400';
      case 'UAS': return 'bg-red-500/20 text-red-400';
      case 'Kuis': return 'bg-blue-500/20 text-blue-400';
      case 'Ulangan Harian': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-['Inter',sans-serif]">UJIAN & EVALUASI</h1>
          <p className="text-gray-400 text-sm mt-1">
            {user?.role === 'guru' ? 'Kelola ujian dan evaluasi' : 'Daftar ujian dan evaluasi'}
          </p>
        </div>
        {user?.role === 'guru' && (
          <Button className="bg-[#ffb700] hover:bg-[#ffb700]/80 text-black">
            <Plus size={20} className="mr-2" />
            Buat Ujian Baru
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6 hover:border-[#ffb700] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FileCheck size={24} className="text-[#ffb700]" />
                  <div>
                    <h3 className="font-['Inter',sans-serif] text-lg">{exam.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${getTypeColor(exam.type)}`}>
                        {exam.type}
                      </span>
                      <span className="bg-[#1aff00]/20 text-[#1aff00] px-2 py-0.5 rounded text-xs">
                        {exam.subject}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-xs ${getStatusColor(exam.status)}`}>
                {getStatusLabel(exam.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-white/[0.06]">
              <div>
                <p className="text-xs text-gray-400 mb-1">Tanggal</p>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#00aeff]" />
                  <span className="text-sm">{new Date(exam.date).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Durasi</p>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#00aeff]" />
                  <span className="text-sm">{exam.duration} menit</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Ruangan</p>
                <span className="text-sm">{exam.room}</span>
              </div>
              {exam.score !== undefined && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Nilai</p>
                  <span className="text-lg font-bold text-green-400">{exam.score}</span>
                </div>
              )}
            </div>

            {user?.role === 'murid' && exam.status === 'upcoming' && (
              <div className="pt-4 border-t border-white/[0.06]">
                <Button className="bg-[#ffb700] hover:bg-[#ffb700]/80 text-black">
                  <Play size={16} className="mr-2" />
                  Lihat Detail
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {exams.length === 0 && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-12 text-center">
          <FileCheck size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">Tidak ada ujian</p>
        </div>
      )}
    </div>
  );
}
