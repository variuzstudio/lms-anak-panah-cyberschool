import { useState } from 'react';
import { Award, TrendingUp, BarChart3, FileText, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockStudents, mockSubjects, mockClasses, Grade } from '../data/mockData';
import { toast } from 'sonner';

const mockGrades: Grade[] = [
  {
    id: 'GRD001',
    studentId: 'S001',
    subjectId: 'SUB001',
    semester: 1,
    year: '2025/2026',
    tugas: [85, 90, 88],
    uts: 87,
    uas: 89,
    finalGrade: 88
  },
  {
    id: 'GRD002',
    studentId: 'S001',
    subjectId: 'SUB002',
    semester: 1,
    year: '2025/2026',
    tugas: [80, 85, 82],
    uts: 83,
    uas: 86,
    finalGrade: 84
  },
  {
    id: 'GRD003',
    studentId: 'S001',
    subjectId: 'SUB003',
    semester: 1,
    year: '2025/2026',
    tugas: [90, 92, 88],
    uts: 91,
    uas: 90,
    finalGrade: 90
  }
];

export default function NilaiPage() {
  const { user, hasPermission } = useAuth();
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Get students based on role
  const getAccessibleStudents = () => {
    if (user?.role === 'admin' || user?.role === 'guru') {
      return mockStudents;
    }
    if (user?.role === 'murid') {
      return mockStudents.filter(s => s.id === user.studentId);
    }
    if (user?.role === 'orangtua') {
      return mockStudents.filter(s => user.childrenIds?.includes(s.id));
    }
    return [];
  };

  const accessibleStudents = getAccessibleStudents();
  const currentStudentId = selectedStudent || user?.studentId || (accessibleStudents[0]?.id);
  
  // Filter grades for current student
  const studentGrades = grades.filter(g => 
    hasPermission('view_grades', g.studentId) && g.studentId === currentStudentId
  );

  const currentStudent = mockStudents.find(s => s.id === currentStudentId);

  // Calculate statistics
  const averageGrade = studentGrades.length > 0
    ? Math.round(studentGrades.reduce((sum, g) => sum + g.finalGrade, 0) / studentGrades.length)
    : 0;

  const highestGrade = studentGrades.length > 0
    ? Math.max(...studentGrades.map(g => g.finalGrade))
    : 0;

  const lowestGrade = studentGrades.length > 0
    ? Math.min(...studentGrades.map(g => g.finalGrade))
    : 0;

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-400';
    if (grade >= 80) return 'text-blue-400';
    if (grade >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeLabel = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'E';
  };

  const downloadRapor = () => {
    toast.success('Mengunduh rapor...', {
      description: 'File rapor akan segera diunduh'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-['Acumin_Variable_Concept',sans-serif]">NILAI & RAPOR</h1>
          <p className="text-gray-400 mt-1">Lihat nilai dan rapor siswa</p>
        </div>

        {/* Student Selector for Admin/Guru/Orangtua */}
        {(user?.role === 'admin' || user?.role === 'guru' || user?.role === 'orangtua') && accessibleStudents.length > 1 && (
          <select
            value={selectedStudent || ''}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
          >
            {accessibleStudents.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} - {mockClasses.find(c => c.id === student.classId)?.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Student Info */}
      {currentStudent && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentStudent.avatar} 
              alt={currentStudent.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{currentStudent.name}</h2>
              <p className="text-gray-400 text-sm">
                NIS: {currentStudent.nis} • Kelas: {mockClasses.find(c => c.id === currentStudent.classId)?.name}
              </p>
            </div>
            <button
              onClick={downloadRapor}
              className="bg-[#00aeff] hover:bg-[#00aeff]/80 text-white px-6 py-3 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm flex items-center gap-2 transition-all"
            >
              <Download size={20} />
              UNDUH RAPOR
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#00aeff]/20 p-3 rounded-lg">
              <BarChart3 className="text-[#00aeff]" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Rata-rata Nilai</p>
          <p className={`text-3xl font-bold ${getGradeColor(averageGrade)}`}>
            {averageGrade} ({getGradeLabel(averageGrade)})
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Nilai Tertinggi</p>
          <p className="text-3xl font-bold text-green-400">
            {highestGrade} ({getGradeLabel(highestGrade)})
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Award className="text-yellow-400" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Nilai Terendah</p>
          <p className="text-3xl font-bold text-yellow-400">
            {lowestGrade} ({getGradeLabel(lowestGrade)})
          </p>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/[0.06]">
          <h3 className="font-['Acumin_Variable_Concept',sans-serif] text-lg">DAFTAR NILAI</h3>
          <p className="text-sm text-gray-400 mt-1">Semester 1 - Tahun Ajaran 2025/2026</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="px-6 py-4 text-left font-['Acumin_Variable_Concept',sans-serif] text-sm">MATA PELAJARAN</th>
                <th className="px-6 py-4 text-center font-['Acumin_Variable_Concept',sans-serif] text-sm">TUGAS</th>
                <th className="px-6 py-4 text-center font-['Acumin_Variable_Concept',sans-serif] text-sm">UTS</th>
                <th className="px-6 py-4 text-center font-['Acumin_Variable_Concept',sans-serif] text-sm">UAS</th>
                <th className="px-6 py-4 text-center font-['Acumin_Variable_Concept',sans-serif] text-sm">NILAI AKHIR</th>
                <th className="px-6 py-4 text-center font-['Acumin_Variable_Concept',sans-serif] text-sm">HURUF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {studentGrades.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Belum ada data nilai
                  </td>
                </tr>
              ) : (
                studentGrades.map((grade) => {
                  const subject = mockSubjects.find(s => s.id === grade.subjectId);
                  const avgTugas = grade.tugas.reduce((sum, t) => sum + t, 0) / grade.tugas.length;

                  return (
                    <tr key={grade.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#c800ff]/20 p-2 rounded-lg">
                            <FileText className="text-[#c800ff]" size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{subject?.name}</p>
                            <p className="text-xs text-gray-400">Kode: {subject?.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="font-bold">{Math.round(avgTugas)}</p>
                        <p className="text-xs text-gray-400">
                          ({grade.tugas.join(', ')})
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center font-bold">{grade.uts}</td>
                      <td className="px-6 py-4 text-center font-bold">{grade.uas}</td>
                      <td className="px-6 py-4 text-center">
                        <p className={`text-2xl font-bold ${getGradeColor(grade.finalGrade)}`}>
                          {grade.finalGrade}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-4 py-2 rounded-full font-bold text-lg ${
                          grade.finalGrade >= 90 ? 'bg-green-500/20 text-green-400' :
                          grade.finalGrade >= 80 ? 'bg-blue-500/20 text-blue-400' :
                          grade.finalGrade >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {getGradeLabel(grade.finalGrade)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Legend */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
        <h3 className="font-['Acumin_Variable_Concept',sans-serif] text-sm mb-4">KETERANGAN NILAI</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 font-bold">A</span>
            <span className="text-sm text-gray-400">90 - 100</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold">B</span>
            <span className="text-sm text-gray-400">80 - 89</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-bold">C</span>
            <span className="text-sm text-gray-400">70 - 79</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold">D</span>
            <span className="text-sm text-gray-400">60 - 69</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-bold">E</span>
            <span className="text-sm text-gray-400">{'< 60'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}