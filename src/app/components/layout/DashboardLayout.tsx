import { ReactNode, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';

import {
  Menu, Bell, X, Home, Users, BookOpen, Calendar, ClipboardList,
  GraduationCap, DollarSign, MessageSquare, FileText, Settings,
  ChevronLeft, UserCheck, FileCheck, TrendingUp, Award, Globe, LogOut
} from 'lucide-react';
import { cn } from '../ui/utils';
import { format } from 'date-fns';

interface MenuItem {
  icon: ReactNode;
  labelKey: string;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { icon: <Home size={18} />, labelKey: 'nav.dashboard', path: 'dashboard', roles: ['admin', 'guru', 'murid', 'orangtua'] },
  { icon: <Users size={18} />, labelKey: 'nav.guru', path: 'guru', roles: ['admin'] },
  { icon: <GraduationCap size={18} />, labelKey: 'nav.murid', path: 'murid', roles: ['admin', 'guru', 'orangtua'] },
  { icon: <BookOpen size={18} />, labelKey: 'nav.kelas', path: 'kelas', roles: ['admin', 'guru', 'murid'] },
  { icon: <Calendar size={18} />, labelKey: 'nav.mataPelajaran', path: 'mata-pelajaran', roles: ['admin', 'guru', 'murid'] },
  { icon: <ClipboardList size={18} />, labelKey: 'nav.jadwal', path: 'jadwal', roles: ['admin', 'guru', 'murid'] },
  { icon: <FileText size={18} />, labelKey: 'nav.tugas', path: 'tugas', roles: ['admin', 'guru', 'murid'] },
  { icon: <FileCheck size={18} />, labelKey: 'nav.ujian', path: 'ujian', roles: ['admin', 'guru', 'murid'] },
  { icon: <Award size={18} />, labelKey: 'nav.nilai', path: 'nilai', roles: ['admin', 'guru', 'murid', 'orangtua'] },
  { icon: <UserCheck size={18} />, labelKey: 'nav.absensi', path: 'absensi', roles: ['admin', 'guru', 'murid'] },
  { icon: <TrendingUp size={18} />, labelKey: 'nav.laporan', path: 'laporan', roles: ['admin', 'guru', 'orangtua'] },
  { icon: <DollarSign size={18} />, labelKey: 'nav.pembayaran', path: 'pembayaran', roles: ['admin', 'murid', 'orangtua'] },
  { icon: <MessageSquare size={18} />, labelKey: 'nav.forum', path: 'forum', roles: ['admin', 'guru', 'murid', 'orangtua'] },
  { icon: <Settings size={18} />, labelKey: 'nav.pengaturan', path: 'pengaturan', roles: ['admin', 'guru', 'murid', 'orangtua'] },
];

interface DashboardLayoutProps {
  children: ReactNode;
  onNavigate?: (page: string) => void;
}

export default function DashboardLayout({ children, onNavigate }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('dashboard');
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { t, language, toggleLanguage } = useLanguage();

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setMobileMenuOpen(false);
    onNavigate?.(path);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role || '')
  );

  const getRoleColor = () => {
    switch (user?.role) {
      case 'admin': return '#00aeff';
      case 'guru': return '#1aff00';
      case 'murid': return '#c800ff';
      case 'orangtua': return '#ffb700';
      default: return '#00aeff';
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'admin': return t('role.admin');
      case 'guru': return t('role.guru');
      case 'murid': return t('role.murid');
      case 'orangtua': return t('role.orangtua');
      default: return '';
    }
  };

  return (
    <div className="flex h-screen bg-[#050a15] text-white overflow-hidden font-['Orbitron',sans-serif]">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[180px]" style={{ backgroundColor: getRoleColor() + '0c' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#c800ff]/8 rounded-full blur-[150px]" />
        <div className="absolute top-[50%] left-[30%] w-[300px] h-[300px] bg-[#1aff00]/4 rounded-full blur-[140px]" />
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "relative z-30 h-full flex flex-col transition-all duration-300",
        sidebarOpen ? "w-60" : "w-[68px]",
        "fixed md:relative",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
        style={{
          background: 'rgba(8, 12, 24, 0.55)',
          backdropFilter: 'blur(24px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '1px 0 30px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col border-b border-white/[0.08] shrink-0 px-3 py-3">
          <div className="flex items-center justify-end gap-2 mb-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors hidden md:flex items-center justify-center"
            >
              {sidebarOpen ? <ChevronLeft size={16} className="text-white/40" /> : <Menu size={16} className="text-white/40" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors md:hidden"
            >
              <X size={16} className="text-white/40" />
            </button>
          </div>
          <img src="/logo.svg" alt="Logo" className={cn("transition-all", sidebarOpen ? "w-full h-auto" : "h-7 w-auto mx-auto")} />
          {sidebarOpen && (
            <p className="text-[9px] text-white/40 tracking-widest uppercase mt-2 font-['Orbitron',sans-serif] text-center">Learning Management System</p>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {filteredMenuItems.map((item) => {
            const isActive = currentPath === item.path;
            const color = getRoleColor();
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full group",
                  isActive
                    ? "text-white"
                    : "text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                )}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                  border: `1px solid ${color}25`,
                  boxShadow: `inset 3px 0 0 ${color}, 0 0 12px ${color}10`,
                } : { border: '1px solid transparent' }}
              >
                <div className="shrink-0 flex items-center justify-center" style={isActive ? { color } : undefined}>
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <span className="text-xs font-medium truncate">{t(item.labelKey as any)}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-white/[0.06] p-3 shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0"
                style={{ backgroundColor: getRoleColor() + '30' }}
              >
                {user?.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate">{user?.name}</p>
                <p className="text-[10px] text-white/40 truncate">{getRoleLabel()}</p>
              </div>
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white mx-auto mb-3"
              style={{ backgroundColor: getRoleColor() + '30' }}
            >
              {user?.name.charAt(0)}
            </div>
          )}
          <button
            onClick={logout}
            className="w-full py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-xs font-medium flex items-center justify-center gap-2"
          >
            <LogOut size={14} />
            {sidebarOpen && t('nav.logout')}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header
          className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6"
          style={{
            background: 'rgba(8, 12, 24, 0.5)',
            backdropFilter: 'blur(24px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 1px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors md:hidden">
              <Menu size={18} className="text-white/60" />
            </button>
            <div>
              <h1 className="text-sm md:text-base font-semibold text-white truncate max-w-[200px] md:max-w-none">
                {t(filteredMenuItems.find(item => item.path === currentPath)?.labelKey as any) || 'Dashboard'}
              </h1>
              <p className="text-[10px] md:text-xs text-white/30 hidden sm:block">
                {format(new Date(), 'EEEE, dd MMMM yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all text-xs"
            >
              <Globe size={13} />
              <span className="hidden sm:inline">{language === 'id' ? 'EN' : 'ID'}</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors relative"
              >
                <Bell size={17} className="text-white/50" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#0c1020]/95 backdrop-blur-2xl border border-white/[0.10] rounded-xl z-50 max-h-80 overflow-y-auto" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)' }}>
                  <div className="p-3 border-b border-white/[0.06]">
                    <h3 className="font-semibold text-sm">{t('nav.notifications')}</h3>
                  </div>
                  <div className="py-1">
                    {notifications.length === 0 ? (
                      <p className="text-center text-white/30 py-6 text-xs">{t('nav.noNotifications')}</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={cn(
                            "px-3 py-2.5 hover:bg-white/[0.04] cursor-pointer border-b border-white/[0.04] last:border-0",
                            !notif.read && "bg-white/[0.03]"
                          )}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className="font-medium text-xs">{notif.title}</h4>
                            {!notif.read && <span className="w-1.5 h-1.5 bg-[#00aeff] rounded-full mt-1 shrink-0" />}
                          </div>
                          <p className="text-[10px] text-white/40">{notif.message}</p>
                          <p className="text-[10px] text-white/20 mt-1">{format(new Date(notif.createdAt), 'dd/MM/yyyy HH:mm')}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
