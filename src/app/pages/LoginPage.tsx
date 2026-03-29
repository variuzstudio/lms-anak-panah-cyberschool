import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, Shield, GraduationCap, BookOpen, Users, Globe } from 'lucide-react';

const roles = [
  { key: 'admin' as const, icon: Shield, color: '#00aeff', gradient: 'from-[#00aeff]/20 to-[#00aeff]/5' },
  { key: 'guru' as const, icon: BookOpen, color: '#1aff00', gradient: 'from-[#1aff00]/20 to-[#1aff00]/5' },
  { key: 'murid' as const, icon: GraduationCap, color: '#c800ff', gradient: 'from-[#c800ff]/20 to-[#c800ff]/5' },
  { key: 'orangtua' as const, icon: Users, color: '#ffb700', gradient: 'from-[#ffb700]/20 to-[#ffb700]/5' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'guru' | 'murid' | 'orangtua' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();

  const handleRoleSelect = (role: typeof selectedRole) => {
    setSelectedRole(role);
    if (role) {
      setUsername(role);
      setPassword('');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    const success = await login(username, password);
    if (success) {
      toast.success(t('login.success'), { description: `${t('login.welcome')}, ${username}!` });
    } else {
      toast.error(t('login.failed'), { description: t('login.wrongCredentials') });
    }
  };

  const getRoleColor = () => {
    return roles.find(r => r.key === selectedRole)?.color || '#00aeff';
  };

  const getRoleLabel = (key: string) => {
    return t(`login.${key}` as any);
  };

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[#060b18]">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00aeff]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#c800ff]/8 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-[#1aff00]/5 rounded-full blur-[100px]" />
      </div>

      {/* Language toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
      >
        <Globe size={14} />
        {language === 'id' ? 'EN' : 'ID'}
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12">
        {/* Logo & School Name */}
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <img src="/logo.png" alt="Logo" className="h-16 sm:h-20 md:h-24 mb-4 drop-shadow-[0_0_30px_rgba(0,174,255,0.3)]" />
          <h1 className="font-['Inter',sans-serif] text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide text-center">
            {t('login.schoolName')}
          </h1>
          <p className="text-white/40 text-xs sm:text-sm mt-1 font-['Inter',sans-serif] text-center">
            {t('login.lms')}
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-lg">
          <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

            <div className="relative p-6 sm:p-8 md:p-10">
              {!selectedRole ? (
                <>
                  <h2 className="font-['Inter',sans-serif] text-base sm:text-lg font-semibold text-white text-center mb-6 sm:mb-8">
                    {t('login.selectRole')}
                  </h2>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {roles.map(({ key, icon: Icon, color, gradient }) => (
                      <button
                        key={key}
                        onClick={() => handleRoleSelect(key)}
                        className={`group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl bg-gradient-to-br ${gradient} border border-white/[0.06] hover:border-opacity-100 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg`}
                        style={{ '--hover-border': color } as any}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = color + '40')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                      >
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all"
                          style={{ backgroundColor: color + '20' }}
                        >
                          <Icon size={20} style={{ color }} className="sm:w-6 sm:h-6" />
                        </div>
                        <span className="font-['Inter',sans-serif] text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                          {getRoleLabel(key)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Demo credentials */}
                  <div className="rounded-xl bg-[#00aeff]/[0.06] border border-[#00aeff]/20 p-3 sm:p-4 text-center">
                    <p className="text-white/50 text-[10px] sm:text-xs font-['Inter',sans-serif]">
                      {t('login.demoCredentials')} username: admin/guru/murid/orangtua | password: [role]123
                    </p>
                  </div>
                </>
              ) : (
                <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect(null)}
                    className="text-white/50 hover:text-white text-xs sm:text-sm flex items-center gap-1 transition-colors font-['Inter',sans-serif]"
                  >
                    {t('login.backToRole')}
                  </button>

                  <div className="text-center">
                    <h2 className="font-['Inter',sans-serif] text-base sm:text-lg font-semibold text-white mb-2">
                      {t('login.loginAs')} {getRoleLabel(selectedRole).toUpperCase()}
                    </h2>
                    <div className="h-0.5 w-16 mx-auto rounded-full" style={{ backgroundColor: getRoleColor() }} />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-white/60 text-xs sm:text-sm font-['Inter',sans-serif] font-medium">{t('login.username')}</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-opacity-100 transition-all"
                      style={{ '--tw-ring-color': getRoleColor() } as any}
                      onFocus={(e) => (e.target.style.borderColor = getRoleColor() + '60')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                      placeholder={`${t('login.enterUsername')} ${getRoleLabel(selectedRole).toLowerCase()}`}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-white/60 text-xs sm:text-sm font-['Inter',sans-serif] font-medium">{t('login.password')}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                        onFocus={(e) => (e.target.style.borderColor = getRoleColor() + '60')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                        placeholder={t('login.enterPassword')}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl py-3 font-['Inter',sans-serif] text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:shadow-lg"
                    style={{ backgroundColor: getRoleColor() + '30', border: `1px solid ${getRoleColor()}40` }}
                  >
                    <LogIn size={16} />
                    {t('login.loginButton')}
                  </button>

                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <p className="text-white/40 text-[10px] sm:text-xs font-['Inter',sans-serif]">
                      Demo: <span className="text-white/60">{selectedRole}</span> / <span className="text-white/60">{selectedRole}123</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-white/20 text-[10px] sm:text-xs font-['Inter',sans-serif]">
          © 2026 Anak Panah Cyberschool. All rights reserved.
        </p>
      </div>
    </div>
  );
}
