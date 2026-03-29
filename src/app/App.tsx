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

function Watermark() {
  const text = 'ANAK PANAH CYBERSCHOOL';
  const rows = 12;
  const cols = 6;

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          transform: 'rotate(-25deg) scale(1.5)',
          transformOrigin: 'center center',
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center whitespace-nowrap"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '3px',
              color: 'rgba(255, 255, 255, 0.04)',
              textShadow: '0 0 2px rgba(255,255,255,0.01)',
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
          <Watermark />
          <Toaster position="top-right" richColors theme="dark" />
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
