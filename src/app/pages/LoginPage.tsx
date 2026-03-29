import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, Shield, GraduationCap, BookOpen, Users, Globe } from 'lucide-react';

const roles = [
  { key: 'admin' as const, icon: Shield, color: '#00aeff' },
  { key: 'guru' as const, icon: BookOpen, color: '#1aff00' },
  { key: 'murid' as const, icon: GraduationCap, color: '#c800ff' },
  { key: 'orangtua' as const, icon: Users, color: '#ffb700' },
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
    if (role) { setUsername(role); setPassword(''); }
    else { setUsername(''); setPassword(''); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    const success = await login(username, password);
    if (success) toast.success(t('login.success'), { description: `${t('login.welcome')}, ${username}!` });
    else toast.error(t('login.failed'), { description: t('login.wrongCredentials') });
  };

  const roleColor = roles.find(r => r.key === selectedRole)?.color || '#00aeff';
  const getRoleLabel = (key: string) => t(`login.${key}` as any);

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[#050a15]">
      {/* Ambient blobs - these bleed through the glass cards */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-[#00aeff]/[0.12] rounded-full blur-[140px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-[#c800ff]/[0.12] rounded-full blur-[140px]" />
        <div className="absolute top-[45%] left-[40%] w-[400px] h-[400px] bg-[#1aff00]/[0.07] rounded-full blur-[130px]" />
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-[#ffb700]/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Language toggle */}
      <button onClick={toggleLanguage} className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
        <Globe size={14} />
        {language === 'id' ? 'EN' : 'ID'}
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 w-full max-w-lg">
          <img
            src="/logo.svg"
            alt="Anak Panah Cyberschool"
            className="w-full max-h-32 sm:max-h-40 md:max-h-44 object-contain mb-4"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0,174,255,0.35))' }}
          />
          <h1 className="font-['Inter',sans-serif] text-base sm:text-lg md:text-xl font-semibold text-white/60 tracking-widest text-center uppercase">
            Learning Management System
          </h1>
        </div>

        {/* Main Glass Card */}
        <div className="w-full max-w-lg">
          <div
            className="rounded-2xl p-[1.5px]"
            style={{
              background: 'linear-gradient(160deg, rgba(0,174,255,0.7), rgba(0,174,255,0.15) 40%, rgba(200,0,255,0.2) 70%, rgba(200,0,255,0.6))',
              boxShadow: '0 0 20px rgba(0,174,255,0.12), 0 0 40px rgba(200,0,255,0.08)',
            }}
          >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
          >

            <div className="relative p-6 sm:p-8 md:p-10">
              {!selectedRole ? (
                <>
                  <h2 className="font-['Inter',sans-serif] text-lg sm:text-xl font-semibold text-white text-center mb-6 sm:mb-8">
                    {t('login.selectRole')}
                  </h2>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {roles.map(({ key, icon: Icon, color }) => (
                      <div key={key} className="rounded-2xl p-[1.5px] transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: `linear-gradient(135deg, ${color}80, ${color}20 50%, ${color}60)`,
                          boxShadow: `0 0 12px ${color}15`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 25px ${color}25, 0 0 50px ${color}10`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 12px ${color}15`;
                        }}>
                        <button
                          onClick={() => handleRoleSelect(key)}
                          className="group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl w-full transition-all duration-300"
                          style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
                            <Icon size={20} style={{ color }} className="sm:w-6 sm:h-6" />
                          </div>
                          <span className="font-['Inter',sans-serif] text-sm sm:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                            {getRoleLabel(key)}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div
                    className="rounded-xl p-3 sm:p-4 text-center"
                    style={{ background: 'rgba(0,174,255,0.06)', border: '1px solid rgba(0,174,255,0.12)' }}
                  >
                    <p className="text-white/50 text-xs sm:text-sm font-['Inter',sans-serif]">
                      {t('login.demoCredentials')} username: admin/guru/murid/orangtua | password: [role]123
                    </p>
                  </div>
                </>
              ) : (
                <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
                  <button type="button" onClick={() => handleRoleSelect(null)} className="text-white/50 hover:text-white text-sm sm:text-base flex items-center gap-1 transition-colors font-['Inter',sans-serif]">
                    {t('login.backToRole')}
                  </button>
                  <div className="text-center">
                    <h2 className="font-['Inter',sans-serif] text-lg sm:text-xl font-semibold text-white mb-2">
                      {t('login.loginAs')} {getRoleLabel(selectedRole).toUpperCase()}
                    </h2>
                    <div className="h-0.5 w-16 mx-auto rounded-full" style={{ backgroundColor: roleColor }} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-white/60 text-sm sm:text-base font-['Inter',sans-serif] font-medium">{t('login.username')}</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-xl px-4 py-3.5 text-base text-white placeholder-white/20 focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => { e.target.style.borderColor = roleColor + '50'; e.target.style.boxShadow = `0 0 15px ${roleColor}12`; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                      placeholder={`${t('login.enterUsername')} ${getRoleLabel(selectedRole).toLowerCase()}`} required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-white/60 text-sm sm:text-base font-['Inter',sans-serif] font-medium">{t('login.password')}</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl px-4 py-3.5 pr-11 text-base text-white placeholder-white/20 focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={(e) => { e.target.style.borderColor = roleColor + '50'; e.target.style.boxShadow = `0 0 15px ${roleColor}12`; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
                        placeholder={t('login.enterPassword')} required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="w-full rounded-xl py-3.5 font-['Inter',sans-serif] text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:brightness-125"
                    style={{ backgroundColor: roleColor + '25', border: `1px solid ${roleColor}40`, boxShadow: `0 0 20px ${roleColor}15` }}>
                    <LogIn size={16} /> {t('login.loginButton')}
                  </button>
                  <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-white/40 text-xs sm:text-sm font-['Inter',sans-serif]">
                      Demo: <span className="text-white/60">{selectedRole}</span> / <span className="text-white/60">{selectedRole}123</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
          </div>
        </div>

        <p className="mt-6 text-white/20 text-xs sm:text-sm font-['Inter',sans-serif]">© 2026 Anak Panah Cyberschool. All rights reserved.</p>
      </div>
    </div>
  );
}
