import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type Language = 'id' | 'en';

const translations = {
  // Login
  'login.selectRole': { id: 'PILIH ROLE UNTUK LOGIN', en: 'SELECT ROLE TO LOGIN' },
  'login.admin': { id: 'Admin', en: 'Admin' },
  'login.guru': { id: 'Guru', en: 'Teacher' },
  'login.murid': { id: 'Murid', en: 'Student' },
  'login.orangtua': { id: 'Orang Tua', en: 'Parent' },
  'login.backToRole': { id: '← Kembali ke pilihan role', en: '← Back to role selection' },
  'login.loginAs': { id: 'LOGIN SEBAGAI', en: 'LOGIN AS' },
  'login.username': { id: 'Username', en: 'Username' },
  'login.password': { id: 'Password', en: 'Password' },
  'login.enterUsername': { id: 'Masukkan username', en: 'Enter username' },
  'login.enterPassword': { id: 'Masukkan password', en: 'Enter password' },
  'login.loginButton': { id: 'MASUK', en: 'LOGIN' },
  'login.demoCredentials': { id: 'Demo Credentials:', en: 'Demo Credentials:' },
  'login.success': { id: 'Login berhasil!', en: 'Login successful!' },
  'login.welcome': { id: 'Selamat datang', en: 'Welcome' },
  'login.failed': { id: 'Login gagal!', en: 'Login failed!' },
  'login.wrongCredentials': { id: 'Username atau password salah', en: 'Wrong username or password' },
  'login.schoolName': { id: 'Anak Panah Cyberschool', en: 'Anak Panah Cyberschool' },
  'login.schoolDesc': { id: 'Sekolah Nasional Online SD, SMP, SMA', en: 'National Online School SD, SMP, SMA' },
  'login.lms': { id: 'Learning Management System', en: 'Learning Management System' },

  // Sidebar/Nav
  'nav.dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'nav.guru': { id: 'Guru', en: 'Teachers' },
  'nav.murid': { id: 'Murid', en: 'Students' },
  'nav.kelas': { id: 'Kelas', en: 'Classes' },
  'nav.mataPelajaran': { id: 'Mata Pelajaran', en: 'Subjects' },
  'nav.jadwal': { id: 'Jadwal', en: 'Schedule' },
  'nav.tugas': { id: 'Tugas', en: 'Assignments' },
  'nav.ujian': { id: 'Ujian', en: 'Exams' },
  'nav.nilai': { id: 'Nilai', en: 'Grades' },
  'nav.absensi': { id: 'Absensi', en: 'Attendance' },
  'nav.laporan': { id: 'Laporan', en: 'Reports' },
  'nav.pembayaran': { id: 'Pembayaran SPP', en: 'Tuition Payment' },
  'nav.forum': { id: 'Forum', en: 'Forum' },
  'nav.pengaturan': { id: 'Pengaturan', en: 'Settings' },
  'nav.logout': { id: 'Keluar', en: 'Logout' },
  'nav.notifications': { id: 'Notifikasi', en: 'Notifications' },
  'nav.noNotifications': { id: 'Tidak ada notifikasi', en: 'No notifications' },

  // Dashboard
  'dash.welcomeAdmin': { id: 'Selamat Datang, Admin', en: 'Welcome, Admin' },
  'dash.welcomeGuru': { id: 'Selamat Datang, Guru', en: 'Welcome, Teacher' },
  'dash.welcomeMurid': { id: 'Selamat Datang', en: 'Welcome' },
  'dash.welcomeOrangtua': { id: 'Selamat Datang, Orang Tua', en: 'Welcome, Parent' },
  'dash.manageSchool': { id: 'Kelola seluruh sistem LMS sekolah Anda', en: 'Manage your entire school LMS system' },
  'dash.manageClass': { id: 'Kelola kelas dan pembelajaran Anda', en: 'Manage your classes and teaching' },
  'dash.trackProgress': { id: 'Pantau progress belajar Anda', en: 'Track your learning progress' },
  'dash.monitorChild': { id: 'Pantau perkembangan putra/putri Anda', en: 'Monitor your child\'s development' },
  'dash.totalStudents': { id: 'Total Siswa', en: 'Total Students' },
  'dash.totalTeachers': { id: 'Total Guru', en: 'Total Teachers' },
  'dash.totalClasses': { id: 'Total Kelas', en: 'Total Classes' },
  'dash.subjects': { id: 'Mata Pelajaran', en: 'Subjects' },
  'dash.paymentStatus': { id: 'Status Pembayaran SPP', en: 'Tuition Payment Status' },
  'dash.paid': { id: 'Sudah Bayar', en: 'Paid' },
  'dash.unpaid': { id: 'Belum Bayar', en: 'Unpaid' },
  'dash.paidPercentage': { id: 'sudah membayar', en: 'have paid' },
  'dash.viewDetail': { id: 'Lihat Detail', en: 'View Detail' },
  'dash.quickActions': { id: 'Aksi Cepat', en: 'Quick Actions' },
  'dash.addStudent': { id: 'Tambah Siswa', en: 'Add Student' },
  'dash.addStudentDesc': { id: 'Daftarkan siswa baru ke sistem', en: 'Register new student to the system' },
  'dash.addTeacher': { id: 'Tambah Guru', en: 'Add Teacher' },
  'dash.addTeacherDesc': { id: 'Daftarkan guru baru ke sistem', en: 'Register new teacher to the system' },
  'dash.makeAnnouncement': { id: 'Buat Pengumuman', en: 'Make Announcement' },
  'dash.makeAnnouncementDesc': { id: 'Buat pengumuman untuk seluruh sekolah', en: 'Create announcement for the whole school' },
  'dash.forumEvent': { id: 'Forum Event', en: 'Forum Event' },
  'dash.forumEventDesc': { id: 'Kelola event dan acara sekolah', en: 'Manage school events and activities' },
  'dash.activeClasses': { id: 'Kelas Aktif', en: 'Active Classes' },
  'dash.activeAssignments': { id: 'Tugas Aktif', en: 'Active Assignments' },
  'dash.myClasses': { id: 'Kelas Yang Diampu', en: 'My Classes' },
  'dash.students': { id: 'siswa', en: 'students' },
  'dash.createAssignment': { id: 'Buat Tugas', en: 'Create Assignment' },
  'dash.createAssignmentDesc': { id: 'Berikan tugas baru untuk siswa', en: 'Give new assignment to students' },
  'dash.createExam': { id: 'Buat Ujian', en: 'Create Exam' },
  'dash.createExamDesc': { id: 'Buat ujian atau kuis baru', en: 'Create new exam or quiz' },
  'dash.inputGrade': { id: 'Input Nilai', en: 'Input Grade' },
  'dash.inputGradeDesc': { id: 'Input nilai siswa', en: 'Input student grades' },
  'dash.attendance': { id: 'Absensi', en: 'Attendance' },
  'dash.attendanceDesc': { id: 'Catat absensi siswa', en: 'Record student attendance' },
  'dash.upcomingExams': { id: 'Ujian Mendatang', en: 'Upcoming Exams' },
  'dash.averageGrade': { id: 'Nilai Rata-rata', en: 'Average Grade' },
  'dash.attendanceRate': { id: 'Kehadiran', en: 'Attendance' },
  'dash.pendingPayment': { id: 'Pembayaran SPP Tertunda', en: 'Pending Tuition Payment' },
  'dash.payNow': { id: 'Bayar Sekarang', en: 'Pay Now' },
  'dash.todoAssignments': { id: 'Tugas Yang Harus Dikerjakan', en: 'Assignments To Complete' },
  'dash.deadline': { id: 'Deadline', en: 'Deadline' },
  'dash.doAssignment': { id: 'Kerjakan', en: 'Work On' },
  'dash.viewAssignment': { id: 'Lihat Tugas', en: 'View Assignments' },
  'dash.viewAssignmentDesc': { id: 'Cek tugas yang belum dikerjakan', en: 'Check incomplete assignments' },
  'dash.viewSchedule': { id: 'Lihat Jadwal', en: 'View Schedule' },
  'dash.viewScheduleDesc': { id: 'Cek jadwal pelajaran hari ini', en: 'Check today\'s class schedule' },
  'dash.viewGrade': { id: 'Lihat Nilai', en: 'View Grades' },
  'dash.viewGradeDesc': { id: 'Cek nilai dan rapor', en: 'Check grades and report' },
  'dash.paySPP': { id: 'Bayar SPP', en: 'Pay Tuition' },
  'dash.paySPPDesc': { id: 'Bayar tagihan SPP', en: 'Pay tuition bill' },
  'dash.childInfo': { id: 'Informasi Anak', en: 'Child Information' },
  'dash.completedAssignments': { id: 'Tugas Selesai', en: 'Completed Assignments' },
  'dash.sppStatus': { id: 'Status SPP', en: 'Tuition Status' },
  'dash.notPaid': { id: 'Belum Lunas', en: 'Unpaid' },
  'dash.fullyPaid': { id: 'Lunas', en: 'Paid' },
  'dash.sppBill': { id: 'Tagihan SPP', en: 'Tuition Bill' },
  'dash.viewGradeChild': { id: 'Lihat Nilai', en: 'View Grades' },
  'dash.viewGradeChildDesc': { id: 'Cek nilai anak Anda', en: 'Check your child\'s grades' },
  'dash.viewReport': { id: 'Lihat Laporan', en: 'View Report' },
  'dash.viewReportDesc': { id: 'Cek laporan perkembangan', en: 'Check development report' },
  'dash.contactTeacher': { id: 'Hubungi Guru', en: 'Contact Teacher' },
  'dash.contactTeacherDesc': { id: 'Komunikasi dengan guru', en: 'Communicate with teacher' },

  // Role labels
  'role.admin': { id: 'Admin Sekolah', en: 'School Admin' },
  'role.guru': { id: 'Guru', en: 'Teacher' },
  'role.murid': { id: 'Murid', en: 'Student' },
  'role.orangtua': { id: 'Orang Tua', en: 'Parent' },

  // Common
  'common.search': { id: 'Cari...', en: 'Search...' },
  'common.add': { id: 'Tambah', en: 'Add' },
  'common.edit': { id: 'Edit', en: 'Edit' },
  'common.delete': { id: 'Hapus', en: 'Delete' },
  'common.save': { id: 'Simpan', en: 'Save' },
  'common.cancel': { id: 'Batal', en: 'Cancel' },
  'common.close': { id: 'Tutup', en: 'Close' },
  'common.loading': { id: 'Memuat...', en: 'Loading...' },
  'common.noData': { id: 'Tidak ada data', en: 'No data' },
  'common.status': { id: 'Status', en: 'Status' },
  'common.active': { id: 'Aktif', en: 'Active' },
  'common.inactive': { id: 'Tidak Aktif', en: 'Inactive' },
} as const;

type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('lms_language');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('lms_language', lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    handleSetLanguage(language === 'id' ? 'en' : 'id');
  }, [language, handleSetLanguage]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
