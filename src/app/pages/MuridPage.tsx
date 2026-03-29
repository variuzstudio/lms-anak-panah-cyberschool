import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone, User, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { mockStudents, mockClasses, mockParents, Student } from '../data/mockData';

export default function MuridPage() {
  const { user, hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter students based on permissions and search
  const filteredStudents = students.filter(student => {
    // Privacy control: Murid hanya lihat diri sendiri, Orangtua hanya lihat anaknya
    if (!hasPermission('view_student_data', student.id)) {
      return false;
    }

    // Search filter
    const searchLower = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.nis.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = (id: string) => {
    if (!hasPermission('edit_student_data')) {
      toast.error('Anda tidak memiliki akses untuk menghapus data siswa');
      return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      setStudents(students.filter(s => s.id !== id));
      toast.success('Data siswa berhasil dihapus');
    }
  };

  const getClassName = (classId: string) => {
    return mockClasses.find(c => c.id === classId)?.name || 'N/A';
  };

  const getParentName = (parentId: string) => {
    return mockParents.find(p => p.id === parentId)?.name || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-['Orbitron',sans-serif]">DATA SISWA</h1>
          <p className="text-gray-400 mt-1">Kelola data siswa sekolah</p>
        </div>
        {hasPermission('edit_student_data') && (
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#00aeff] hover:bg-[#00aeff]/80 text-white px-6 py-3 rounded-lg font-['Orbitron',sans-serif] text-sm flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            TAMBAH SISWA
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Cari siswa berdasarkan nama, NIS, atau email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00aeff] transition-all"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#00aeff] p-3 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Siswa</p>
              <p className="text-2xl font-bold">{filteredStudents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#1aff00] p-3 rounded-lg">
              <User size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Siswa Aktif</p>
              <p className="text-2xl font-bold">
                {filteredStudents.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#c800ff] p-3 rounded-lg">
              <User size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Siswa Laki-laki</p>
              <p className="text-2xl font-bold">
                {filteredStudents.filter(s => s.gender === 'L').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#ffb700] p-3 rounded-lg">
              <User size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Siswa Perempuan</p>
              <p className="text-2xl font-bold">
                {filteredStudents.filter(s => s.gender === 'P').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">NIS</th>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">NAMA</th>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">KELAS</th>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">EMAIL</th>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">TELEPON</th>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">ORANG TUA</th>
                <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">STATUS</th>
                {hasPermission('edit_student_data') && (
                  <th className="px-6 py-4 text-left font-['Orbitron',sans-serif] text-sm">AKSI</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                    Tidak ada data siswa yang ditemukan
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-white/[0.06] transition-colors">
                    <td className="px-6 py-4 text-sm">{student.nis}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{getClassName(student.classId)}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail size={14} />
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone size={14} />
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{getParentName(student.parentId)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {student.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    {hasPermission('edit_student_data') && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-[#00aeff]/20 rounded-lg transition-colors text-[#00aeff]"
                            onClick={() => toast.info('Fitur edit akan segera hadir')}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                            onClick={() => handleDelete(student.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}