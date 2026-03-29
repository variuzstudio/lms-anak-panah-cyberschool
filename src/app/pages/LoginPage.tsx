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
    <div className="relative min-h-screen w-full overflow-auto bg-[#050a15]">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-15%] w-[600px] h-[600px] bg-[#00aeff]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[600px] h-[600px] bg-[#c800ff]/10 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-[#1aff00]/6 rounded-full blur-[130px]" />
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
          <img
            src="/logo.png"
            alt="Logo"
            className="h-16 sm:h-20 md:h-24 mb-4"
            style={{
              mixBlendMode: 'screen',
              filter: 'drop-shadow(0 0 25px rgba(0,174,255,0.4)) drop-shadow(0 0 50px rgba(0,174,255,0.15))',
            }}
          />
          <h1 className="font-['Inter',sans-serif] text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide text-center">
            {t('login.schoolName')}
          </h1>
          <p className="text-white/40 text-xs sm:text-sm mt-1 font-['Inter',sans-serif] text-center">
            {t('login.lms')}
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-lg">
          {/* Outer glow wrapper */}
          <div className="relative">
            {/* Edge glow effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#00aeff]/30 via-[#00aeff]/5 to-[#c800ff]/20 blur-[1px]" />
            <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-br from-white/[0.15] via-transparent to-white/[0.05]" />

            {/* Card body */}
            <div className="relative rounded-2xl bg-[#0c1220]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden">
              {/* Inner glass highlight */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#00aeff]/[0.03] via-transparent to-transparent pointer-events-none" />

              <div className="relative p-6 sm:p-8 md:p-10">
                {!selectedRole ? (
                  <>
                    <h2 className="font-['Inter',sans-serif] text-base sm:text-lg font-semibold text-white text-center mb-6 sm:mb-8">
                      {t('login.selectRole')}
                    </h2>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      {roles.map(({ key, icon: Icon, color }) => (
                        <button
                          key={key}
                          onClick={() => handleRoleSelect(key)}
                          className="group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-[1.03] overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${color}12, ${color}05)`,
                            border: `1px solid ${color}18`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = color + '50';
                            e.currentTarget.style.boxShadow = `0 0 20px ${color}15, inset 0 1px 0 ${color}20`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = color + '18';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all"
                            style={{ backgroundColor: color + '18' }}
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
                    <div
                      className="rounded-xl p-3 sm:p-4 text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,174,255,0.08), rgba(0,174,255,0.02))',
                        border: '1px solid rgba(0,174,255,0.15)',
                      }}
                    >
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
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: `1px solid rgba(255,255,255,0.08)`,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = getRoleColor() + '50';
                          e.target.style.boxShadow = `0 0 12px ${getRoleColor()}15`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = 'none';
                        }}
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
                          className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: `1px solid rgba(255,255,255,0.08)`,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = getRoleColor() + '50';
                            e.target.style.boxShadow = `0 0 12px ${getRoleColor()}15`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                          }}
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
                      className="w-full rounded-xl py-3 font-['Inter',sans-serif] text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:brightness-125"
                      style={{
                        backgroundColor: getRoleColor() + '25',
                        border: `1px solid ${getRoleColor()}40`,
                        boxShadow: `0 0 20px ${getRoleColor()}15`,
                      }}
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
        </div>

        {/* Footer */}
        <p className="mt-6 text-white/20 text-[10px] sm:text-xs font-['Inter',sans-serif]">
          © 2026 Anak Panah Cyberschool. All rights reserved.
        </p>
      </div>
    </div>
  );
}
