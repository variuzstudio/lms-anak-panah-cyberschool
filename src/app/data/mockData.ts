// Mock data untuk LMS dengan security dan privacy controls

export interface Student {
  id: string;
  nis: string;
  name: string;
  email: string;
  gender: 'L' | 'P';
  birthDate: string;
  address: string;
  phone: string;
  classId: string;
  parentId: string;
  avatar: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  email: string;
  gender: 'L' | 'P';
  phone: string;
  subjects: string[];
  classes: string[];
  avatar: string;
  status: 'active' | 'inactive';
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: 'Ayah' | 'Ibu' | 'Wali';
  studentIds: string[];
  avatar: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  teacherId: string;
  studentCount: number;
  schedule: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  classIds: string[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  dueDate: string;
  createdAt: string;
  attachments?: string[];
  submissions: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  files: string[];
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  examDate: string;
  duration: number; // dalam menit
  totalQuestions: number;
  createdAt: string;
  results: ExamResult[];
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  semester: number;
  year: string;
  tugas: number[];
  uts: number;
  uas: number;
  finalGrade: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpha';
  note?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  month: string;
  year: string;
  status: 'pending' | 'paid' | 'overdue';
  paidAt?: string;
  paymentMethod?: 'BCA' | 'Mandiri' | 'BNI' | 'BRI' | 'GoPay' | 'OVO' | 'DANA' | 'ShopeePay' | 'LinkAja' | 'QRIS';
  transactionId?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorRole: 'admin' | 'guru' | 'murid' | 'orangtua';
  authorName: string;
  category: 'pengumuman' | 'event' | 'diskusi';
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  comments: ForumComment[];
  visibility: 'public' | 'guru-only' | 'parent-student';
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorRole: 'admin' | 'guru' | 'murid' | 'orangtua';
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  userRole: 'admin' | 'guru' | 'murid' | 'orangtua';
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'tugas' | 'ujian' | 'nilai' | 'pembayaran' | 'pengumuman' | 'absensi';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Mock Data
export const mockStudents: Student[] = [
  {
    id: 'S001',
    nis: '2024001',
    name: 'Ani Wijaya',
    email: 'ani.wijaya@student.school.com',
    gender: 'P',
    birthDate: '2010-05-15',
    address: 'Jl. Merdeka No. 123, Jakarta',
    phone: '081234567890',
    classId: 'C001',
    parentId: 'P001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ani',
    status: 'active'
  },
  {
    id: 'S002',
    nis: '2024002',
    name: 'Budi Santoso',
    email: 'budi.s@student.school.com',
    gender: 'L',
    birthDate: '2010-08-20',
    address: 'Jl. Sudirman No. 456, Jakarta',
    phone: '081234567891',
    classId: 'C001',
    parentId: 'P002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=budi',
    status: 'active'
  },
  {
    id: 'S003',
    nis: '2024003',
    name: 'Citra Dewi',
    email: 'citra.d@student.school.com',
    gender: 'P',
    birthDate: '2010-03-10',
    address: 'Jl. Gatot Subroto No. 789, Jakarta',
    phone: '081234567892',
    classId: 'C002',
    parentId: 'P003',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=citra',
    status: 'active'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 'T001',
    nip: '198501012010011001',
    name: 'Budi Santoso, S.Pd',
    email: 'budi.santoso@school.com',
    gender: 'L',
    phone: '081298765432',
    subjects: ['SUB001', 'SUB002'],
    classes: ['C001', 'C002'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    status: 'active'
  },
  {
    id: 'T002',
    nip: '198702032011012002',
    name: 'Siti Nurhaliza, S.Pd',
    email: 'siti.nurhaliza@school.com',
    gender: 'P',
    phone: '081298765433',
    subjects: ['SUB003'],
    classes: ['C001'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2',
    status: 'active'
  }
];

export const mockParents: Parent[] = [
  {
    id: 'P001',
    name: 'Siti Rahayu',
    email: 'siti.rahayu@parent.school.com',
    phone: '081287654321',
    relationship: 'Ibu',
    studentIds: ['S001'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent1'
  },
  {
    id: 'P002',
    name: 'Ahmad Hidayat',
    email: 'ahmad.h@parent.school.com',
    phone: '081287654322',
    relationship: 'Ayah',
    studentIds: ['S002'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent2'
  },
  {
    id: 'P003',
    name: 'Ratna Sari',
    email: 'ratna.s@parent.school.com',
    phone: '081287654323',
    relationship: 'Ibu',
    studentIds: ['S003'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent3'
  }
];

export const mockClasses: Class[] = [
  {
    id: 'C001',
    name: 'X IPA 1',
    level: '10',
    teacherId: 'T001',
    studentCount: 30,
    schedule: 'Senin - Jumat, 07:00 - 14:00'
  },
  {
    id: 'C002',
    name: 'X IPA 2',
    level: '10',
    teacherId: 'T002',
    studentCount: 28,
    schedule: 'Senin - Jumat, 07:00 - 14:00'
  },
  {
    id: 'C003',
    name: 'XI IPA 1',
    level: '11',
    teacherId: 'T001',
    studentCount: 32,
    schedule: 'Senin - Jumat, 07:00 - 14:00'
  }
];

export const mockSubjects: Subject[] = [
  {
    id: 'SUB001',
    name: 'Matematika',
    code: 'MAT',
    teacherId: 'T001',
    classIds: ['C001', 'C002']
  },
  {
    id: 'SUB002',
    name: 'Fisika',
    code: 'FIS',
    teacherId: 'T001',
    classIds: ['C001']
  },
  {
    id: 'SUB003',
    name: 'Bahasa Indonesia',
    code: 'BIN',
    teacherId: 'T002',
    classIds: ['C001', 'C002']
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    studentId: 'S001',
    amount: 500000,
    month: 'Januari',
    year: '2026',
    status: 'paid',
    paidAt: '2026-01-05T10:30:00Z',
    paymentMethod: 'BCA',
    transactionId: 'TRX001'
  },
  {
    id: 'PAY002',
    studentId: 'S001',
    amount: 500000,
    month: 'Februari',
    year: '2026',
    status: 'pending'
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'POST001',
    title: 'Pengumuman: Libur Semester Genap',
    content: 'Libur semester genap akan dimulai dari tanggal 15 Juni 2026 dan sekolah akan kembali dibuka pada tanggal 15 Juli 2026.',
    authorId: 'ADM001',
    authorRole: 'admin',
    authorName: 'Administrator',
    category: 'pengumuman',
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-02-01T08:00:00Z',
    comments: [],
    visibility: 'public'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'NOT001',
    userId: 'S001',
    userRole: 'murid',
    title: 'Tugas Baru: Matematika',
    message: 'Tugas baru telah diberikan untuk mata pelajaran Matematika. Deadline: 10 Februari 2026',
    type: 'info',
    category: 'tugas',
    read: false,
    createdAt: '2026-02-06T09:00:00Z',
    actionUrl: '/tugas'
  }
];

// Security Helper Functions
export function canAccessStudentData(
  currentUserRole: string,
  currentUserId: string,
  targetStudentId: string,
  students: Student[],
  parents: Parent[]
): boolean {
  // Admin dan Guru bisa akses semua data siswa
  if (currentUserRole === 'admin' || currentUserRole === 'guru') {
    return true;
  }
  
  // Murid hanya bisa akses data sendiri
  if (currentUserRole === 'murid') {
    return currentUserId === targetStudentId;
  }
  
  // Orang tua hanya bisa akses data anak mereka
  if (currentUserRole === 'orangtua') {
    const parent = parents.find(p => p.id === currentUserId);
    return parent?.studentIds.includes(targetStudentId) || false;
  }
  
  return false;
}

export function filterStudentsByAccess(
  currentUserRole: string,
  currentUserId: string,
  students: Student[],
  parents: Parent[]
): Student[] {
  if (currentUserRole === 'admin' || currentUserRole === 'guru') {
    return students;
  }
  
  if (currentUserRole === 'murid') {
    return students.filter(s => s.id === currentUserId);
  }
  
  if (currentUserRole === 'orangtua') {
    const parent = parents.find(p => p.id === currentUserId);
    if (!parent) return [];
    return students.filter(s => parent.studentIds.includes(s.id));
  }
  
  return [];
}

export function canAccessGrade(
  currentUserRole: string,
  currentUserId: string,
  targetStudentId: string,
  students: Student[],
  parents: Parent[]
): boolean {
  return canAccessStudentData(currentUserRole, currentUserId, targetStudentId, students, parents);
}

export function canAccessPayment(
  currentUserRole: string,
  currentUserId: string,
  targetStudentId: string,
  students: Student[],
  parents: Parent[]
): boolean {
  return canAccessStudentData(currentUserRole, currentUserId, targetStudentId, students, parents);
}
