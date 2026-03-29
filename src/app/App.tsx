import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LanguageProvider } from './context/LanguageContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import GuruPage from './pages/GuruPage';
import MuridPage from './pages/MuridPage';
import KelasPage from './pages/KelasPage';
import MataPelajaranPage from './pages/MataPelajaranPage';
import JadwalPage from './pages/JadwalPage';
import TugasPage from './pages/TugasPage';
import UjianPage from './pages/UjianPage';
import NilaiPage from './pages/NilaiPage';
import AbsensiPage from './pages/AbsensiPage';
import LaporanPage from './pages/LaporanPage';
import PembayaranPage from './pages/PembayaranPage';
import MeetingPage from './pages/MeetingPage';
import ForumPage from './pages/ForumPage';
import PengaturanPage from './pages/PengaturanPage';
import DashboardLayout from './components/layout/DashboardLayout';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'guru': return <GuruPage />;
      case 'murid': return <MuridPage />;
      case 'kelas': return <KelasPage />;
      case 'mata-pelajaran': return <MataPelajaranPage />;
      case 'jadwal': return <JadwalPage />;
      case 'tugas': return <TugasPage />;
      case 'ujian': return <UjianPage />;
      case 'nilai': return <NilaiPage />;
      case 'absensi': return <AbsensiPage />;
      case 'laporan': return <LaporanPage />;
      case 'pembayaran': return <PembayaranPage />;
      case 'meeting': return <MeetingPage />;
      case 'forum': return <ForumPage />;
      case 'pengaturan': return <PengaturanPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <DashboardLayout onNavigate={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
          <Toaster position="top-right" richColors theme="dark" />
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
