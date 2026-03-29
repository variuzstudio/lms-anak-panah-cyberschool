import { useState } from 'react';
import { Plus, FileText, Clock, CheckCircle, Upload, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { mockStudents, mockSubjects, mockClasses, Assignment, AssignmentSubmission } from '../data/mockData';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const mockAssignments: Assignment[] = [
  {
    id: 'ASG001',
    title: 'Persamaan Linear Dua Variabel',
    description: 'Kerjakan soal-soal tentang persamaan linear dua variabel yang ada di buku halaman 45-50',
    subjectId: 'SUB001',
    teacherId: 'T001',
    classId: 'C001',
    dueDate: '2026-02-10T23:59:00Z',
    createdAt: '2026-02-01T08:00:00Z',
    submissions: []
  },
  {
    id: 'ASG002',
    title: 'Gerak Lurus Berubah Beraturan',
    description: 'Buat laporan praktikum tentang gerak lurus berubah beraturan',
    subjectId: 'SUB002',
    teacherId: 'T001',
    classId: 'C001',
    dueDate: '2026-02-12T23:59:00Z',
    createdAt: '2026-02-03T10:00:00Z',
    submissions: []
  }
];

export default function TugasPage() {
  const { user, hasPermission } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    subjectId: '',
    classId: '',
    dueDate: ''
  });

  const canCreateAssignment = hasPermission('create_assignment');

  // Filter assignments based on role
  const filteredAssignments = assignments.filter(assignment => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'guru' && assignment.teacherId === user.teacherId) return true;
    if (user?.role === 'murid') {
      const myStudent = mockStudents.find(s => s.id === user.studentId);
      return assignment.classId === myStudent?.classId;
    }
    return false;
  });

  const handleCreateAssignment = () => {
    if (!user || !canCreateAssignment) return;

    if (!newAssignment.title || !newAssignment.description || !newAssignment.subjectId || !newAssignment.classId || !newAssignment.dueDate) {
      toast.error('Semua field harus diisi');
      return;
    }

    const assignment: Assignment = {
      id: `ASG${assignments.length + 1}`,
      title: newAssignment.title,
      description: newAssignment.description,
      subjectId: newAssignment.subjectId,
      teacherId: user.teacherId || 'T001',
      classId: newAssignment.classId,
      dueDate: new Date(newAssignment.dueDate).toISOString(),
      createdAt: new Date().toISOString(),
      submissions: []
    };

    setAssignments([assignment, ...assignments]);
    setNewAssignment({ title: '', description: '', subjectId: '', classId: '', dueDate: '' });
    setIsCreateDialogOpen(false);
    toast.success('Tugas berhasil dibuat!');
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    if (!user?.studentId) return;

    const submission: AssignmentSubmission = {
      id: `SUB${Date.now()}`,
      assignmentId,
      studentId: user.studentId,
      submittedAt: new Date().toISOString(),
      files: ['submission.pdf'],
      status: 'submitted'
    };

    setAssignments(assignments.map(a => 
      a.id === assignmentId 
        ? { ...a, submissions: [...a.submissions, submission] }
        : a
    ));

    toast.success('Tugas berhasil dikumpulkan!');
  };

  const getSubjectName = (subjectId: string) => {
    return mockSubjects.find(s => s.id === subjectId)?.name || 'N/A';
  };

  const getClassName = (classId: string) => {
    return mockClasses.find(c => c.id === classId)?.name || 'N/A';
  };

  const getStatus = (assignment: Assignment) => {
    if (user?.role === 'murid') {
      const mySubmission = assignment.submissions.find(s => s.studentId === user.studentId);
      if (mySubmission) {
        if (mySubmission.grade !== undefined) {
          return { label: 'Dinilai', color: 'bg-green-500/20 text-green-400', icon: <CheckCircle size={14} /> };
        }
        return { label: 'Sudah Dikumpulkan', color: 'bg-blue-500/20 text-blue-400', icon: <CheckCircle size={14} /> };
      }
      const isLate = new Date() > new Date(assignment.dueDate);
      if (isLate) {
        return { label: 'Terlambat', color: 'bg-red-500/20 text-red-400', icon: <Clock size={14} /> };
      }
      return { label: 'Belum Dikumpulkan', color: 'bg-yellow-500/20 text-yellow-400', icon: <Clock size={14} /> };
    }
    
    // For guru/admin
    const submittedCount = assignment.submissions.length;
    const totalStudents = mockStudents.filter(s => s.classId === assignment.classId).length;
    return { 
      label: `${submittedCount}/${totalStudents} Siswa`, 
      color: 'bg-blue-500/20 text-blue-400', 
      icon: <FileText size={14} /> 
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-['Acumin_Variable_Concept',sans-serif]">TUGAS</h1>
          <p className="text-gray-400 mt-1">
            {user?.role === 'guru' ? 'Kelola tugas untuk siswa' : 'Lihat dan kumpulkan tugas'}
          </p>
        </div>
        {canCreateAssignment && (
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#00aeff] hover:bg-[#00aeff]/80 text-white px-6 py-3 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            BUAT TUGAS
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#00aeff]/20 p-3 rounded-lg">
              <FileText className="text-[#00aeff]" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Tugas</p>
          <p className="text-2xl font-bold">{filteredAssignments.length}</p>
        </div>

        {user?.role === 'murid' && (
          <>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <CheckCircle className="text-green-400" size={24} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Sudah Dikumpulkan</p>
              <p className="text-2xl font-bold text-green-400">
                {filteredAssignments.filter(a => a.submissions.some(s => s.studentId === user.studentId)).length}
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Clock className="text-yellow-400" size={24} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Belum Dikumpulkan</p>
              <p className="text-2xl font-bold text-yellow-400">
                {filteredAssignments.filter(a => !a.submissions.some(s => s.studentId === user.studentId)).length}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-12 text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">Belum ada tugas</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => {
            const status = getStatus(assignment);
            const mySubmission = user?.role === 'murid' 
              ? assignment.submissions.find(s => s.studentId === user.studentId)
              : null;

            return (
              <div key={assignment.id} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-[#c800ff]/20 p-2 rounded-lg">
                        <FileText className="text-[#c800ff]" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-['Acumin_Variable_Concept',sans-serif] mb-1">{assignment.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{getSubjectName(assignment.subjectId)} • {getClassName(assignment.classId)}</p>
                        <p className="text-gray-300 text-sm">{assignment.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        Deadline: {format(new Date(assignment.dueDate), 'dd MMM yyyy, HH:mm', { locale: localeId })}
                      </div>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </span>
                      {mySubmission?.grade !== undefined && (
                        <span className="text-green-400 font-bold">
                          Nilai: {mySubmission.grade}/100
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {user?.role === 'murid' && !mySubmission && (
                      <button
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        className="bg-[#00aeff] hover:bg-[#00aeff]/80 text-white px-4 py-2 rounded-lg text-sm font-['Acumin_Variable_Concept',sans-serif] flex items-center gap-2 transition-all"
                      >
                        <Upload size={16} />
                        KUMPULKAN
                      </button>
                    )}
                    {user?.role === 'murid' && mySubmission && (
                      <button
                        className="bg-white/[0.04] hover:bg-white/[0.08] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
                        onClick={() => toast.info('Mengunduh file...')}
                      >
                        <Download size={16} />
                        UNDUH
                      </button>
                    )}
                    {(user?.role === 'guru' || user?.role === 'admin') && (
                      <button
                        onClick={() => setSelectedAssignment(assignment)}
                        className="bg-white/[0.04] hover:bg-white/[0.08] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
                      >
                        LIHAT DETAIL
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Assignment Dialog */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-white/[0.06]">
              <h2 className="text-xl font-['Acumin_Variable_Concept',sans-serif]">BUAT TUGAS BARU</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Judul Tugas</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
                  placeholder="Masukkan judul tugas..."
                />
              </div>

              <div>
                <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Deskripsi</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all resize-none"
                  placeholder="Masukkan deskripsi tugas..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Mata Pelajaran</label>
                  <select
                    value={newAssignment.subjectId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, subjectId: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
                  >
                    <option value="">Pilih mata pelajaran</option>
                    {mockSubjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Kelas</label>
                  <select
                    value={newAssignment.classId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, classId: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
                  >
                    <option value="">Pilih kelas</option>
                    {mockClasses.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Deadline</label>
                <input
                  type="datetime-local"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.06] flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setNewAssignment({ title: '', description: '', subjectId: '', classId: '', dueDate: '' });
                }}
                className="px-6 py-2 border border-white/[0.06] rounded-lg hover:bg-white/[0.06] transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleCreateAssignment}
                className="px-6 py-2 bg-[#00aeff] hover:bg-[#00aeff]/80 rounded-lg font-['Acumin_Variable_Concept',sans-serif] transition-all"
              >
                BUAT TUGAS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
