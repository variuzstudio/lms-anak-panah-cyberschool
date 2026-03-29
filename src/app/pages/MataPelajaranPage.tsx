import { useState } from 'react';
import { Plus, Search, BookOpen, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Subject {
  id: string;
  code: string;
  name: string;
  teacher: string;
  credits: number;
  hours: number;
  classes: string[];
}

const MOCK_SUBJECTS: Subject[] = [
  { id: '1', code: 'MTK101', name: 'Matematika', teacher: 'Budi Santoso, S.Pd', credits: 4, hours: 6, classes: ['X-1', 'X-2', 'XI-1'] },
  { id: '2', code: 'BIN101', name: 'Bahasa Indonesia', teacher: 'Siti Aminah, S.Pd', credits: 3, hours: 4, classes: ['X-1', 'X-3'] },
  { id: '3', code: 'FIS101', name: 'Fisika', teacher: 'Ahmad Hidayat, S.Si', credits: 4, hours: 6, classes: ['XI-1', 'XI-2'] },
  { id: '4', code: 'KIM101', name: 'Kimia', teacher: 'Dr. Rina Kusuma', credits: 4, hours: 6, classes: ['XI-1', 'XI-2'] },
  { id: '5', code: 'BIO101', name: 'Biologi', teacher: 'Maya Sari, S.Pd', credits: 4, hours: 6, classes: ['X-1', 'X-2'] },
  { id: '6', code: 'SEJ101', name: 'Sejarah', teacher: 'Doni Susanto, M.Pd', credits: 2, hours: 3, classes: ['X-1', 'X-2', 'X-3'] },
];

export default function MataPelajaranPage() {
  const [subjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-['Inter',sans-serif]">MATA PELAJARAN</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola mata pelajaran sekolah</p>
        </div>
        <Button className="bg-[#1aff00] hover:bg-[#1aff00]/80 text-black">
          <Plus size={20} className="mr-2" />
          Tambah Mata Pelajaran
        </Button>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Cari mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-transparent border-white/[0.06]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6 hover:border-[#1aff00] transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1aff00]/20 rounded-lg">
                  <BookOpen size={24} className="text-[#1aff00]" />
                </div>
                <div>
                  <h3 className="font-['Inter',sans-serif] text-lg">{subject.name}</h3>
                  <p className="text-sm text-gray-400">{subject.code}</p>
                </div>
              </div>
              <span className="text-xs bg-[#1aff00]/20 text-[#1aff00] px-2 py-1 rounded">{subject.credits} SKS</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Pengampu:</span>
                <span className="text-white">{subject.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>{subject.hours} jam/minggu</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-2">
                {subject.classes.map((cls) => (
                  <span key={cls} className="bg-[#00aeff]/20 text-[#00aeff] px-2 py-0.5 rounded text-xs">
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
