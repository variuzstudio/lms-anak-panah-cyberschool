import { useState } from 'react';
import { Plus, Search, Users, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Class {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  students: number;
  subjects: number;
}

const MOCK_CLASSES: Class[] = [
  { id: '1', name: 'X-1', grade: '10', teacher: 'Budi Santoso, S.Pd', students: 32, subjects: 12 },
  { id: '2', name: 'X-2', grade: '10', teacher: 'Siti Aminah, S.Pd', students: 30, subjects: 12 },
  { id: '3', name: 'XI-1', grade: '11', teacher: 'Ahmad Hidayat, S.Si', students: 28, subjects: 14 },
];

export default function KelasPage() {
  const [classes] = useState<Class[]>(MOCK_CLASSES);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-['Acumin_Variable_Concept',sans-serif]">MANAJEMEN KELAS</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola kelas dan wali kelas</p>
        </div>
        <Button className="bg-[#00aeff] hover:bg-[#00aeff]/80">
          <Plus size={20} className="mr-2" />
          Tambah Kelas
        </Button>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Cari kelas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-transparent border-white/[0.06]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white/[0.03] border border-[#00aeff] rounded-lg p-6 hover:border-white/[0.12] hover:shadow-lg hover:shadow-[#00aeff]/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-['Acumin_Variable_Concept',sans-serif] text-[#00aeff]">{cls.name}</h3>
              <span className="text-sm text-gray-400">Kelas {cls.grade}</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">Wali Kelas</p>
                <p className="text-sm">{cls.teacher}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#c800ff]" />
                  <span className="text-sm">{cls.students} Siswa</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#1aff00]" />
                  <span className="text-sm">{cls.subjects} Mapel</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
