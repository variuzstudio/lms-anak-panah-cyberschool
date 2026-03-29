import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

interface Teacher {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  classes: string[];
  status: 'active' | 'inactive';
}

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    nip: '198501012010011001',
    name: 'Budi Santoso, S.Pd',
    email: 'budi.santoso@school.com',
    phone: '081234567890',
    subject: 'Matematika',
    classes: ['X-1', 'X-2', 'XI-1'],
    status: 'active'
  },
  {
    id: '2',
    nip: '198702152011012002',
    name: 'Siti Aminah, S.Pd',
    email: 'siti.aminah@school.com',
    phone: '081234567891',
    subject: 'Bahasa Indonesia',
    classes: ['X-1', 'X-3'],
    status: 'active'
  },
  {
    id: '3',
    nip: '199003202012011003',
    name: 'Ahmad Hidayat, S.Si',
    email: 'ahmad.hidayat@school.com',
    phone: '081234567892',
    subject: 'Fisika',
    classes: ['XI-1', 'XI-2', 'XII-1'],
    status: 'active'
  }
];

export default function GuruPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.nip.includes(searchQuery) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      nip: formData.get('nip') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      classes: [],
      status: 'active'
    };
    setTeachers([...teachers, newTeacher]);
    setDialogOpen(false);
    toast.success('Guru berhasil ditambahkan');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-['Acumin_Variable_Concept',sans-serif]">MANAJEMEN GURU</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola data guru sekolah</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1aff00] hover:bg-[#1aff00]/80 text-black">
              <Plus size={20} className="mr-2" />
              Tambah Guru
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/[0.03] border-white/[0.06] text-white">
            <DialogHeader>
              <DialogTitle className="font-['Acumin_Variable_Concept',sans-serif]">Tambah Guru Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div>
                <Label htmlFor="nip">NIP</Label>
                <Input id="nip" name="nip" required className="bg-transparent border-white/[0.06]" />
              </div>
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" name="name" required className="bg-transparent border-white/[0.06]" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="bg-transparent border-white/[0.06]" />
              </div>
              <div>
                <Label htmlFor="phone">No. Telepon</Label>
                <Input id="phone" name="phone" required className="bg-transparent border-white/[0.06]" />
              </div>
              <div>
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <Input id="subject" name="subject" required className="bg-transparent border-white/[0.06]" />
              </div>
              <Button type="submit" className="w-full bg-[#1aff00] hover:bg-[#1aff00]/80 text-black">
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Cari berdasarkan nama, NIP, atau mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-transparent border-white/[0.06]"
          />
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-transparent border-b border-white/[0.06]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">NIP</th>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">Mata Pelajaran</th>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">Kontak</th>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">Kelas</th>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-['Acumin_Variable_Concept',sans-serif]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-white/[0.06] hover:bg-transparent transition-colors">
                  <td className="px-6 py-4 text-sm">{teacher.nip}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{teacher.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-[#1aff00]/20 text-[#1aff00] px-2 py-1 rounded text-xs">
                      {teacher.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400 mb-1">
                      <Mail size={14} />
                      <span className="text-xs">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Phone size={14} />
                      <span className="text-xs">{teacher.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((cls) => (
                        <span key={cls} className="bg-[#00aeff]/20 text-[#00aeff] px-2 py-0.5 rounded text-xs">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      teacher.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {teacher.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-[#00aeff]/20 rounded transition-colors">
                        <Edit size={16} className="text-[#00aeff]" />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded transition-colors">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
