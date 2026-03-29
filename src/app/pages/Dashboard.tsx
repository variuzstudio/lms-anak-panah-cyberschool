import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Users, GraduationCap, BookOpen, DollarSign,
  TrendingUp, Award, Calendar, CheckCircle,
  Clock, AlertCircle, FileText, BarChart3,
  Send, Sparkles, Bot
} from 'lucide-react';
import {
  mockStudents, mockTeachers, mockClasses, mockSubjects,
  mockPayments
} from '../data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <div className="group relative rounded-2xl p-[1.5px] transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: `linear-gradient(135deg, ${color}90, ${color}30 40%, #c800ff40 70%, #c800ff80)`,
        boxShadow: `0 0 15px ${color}20, 0 0 30px ${color}08`,
      }}>
      <div className="relative rounded-2xl p-4 md:p-5 h-full"
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)',
        }}>
        <div className="relative flex items-center justify-between mb-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color + '15' }}>
            <div style={{ color }}>{icon}</div>
          </div>
          {trend && (
            <div className="text-[#1aff00] text-xs flex items-center gap-1 bg-[#1aff00]/10 px-2 py-0.5 rounded-full border border-[#1aff00]/15">
              <TrendingUp size={11} />{trend}
            </div>
          )}
        </div>
        <p className="text-white/50 text-xs md:text-sm mb-0.5">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  onClick?: () => void;
  color: string;
}

function QuickAction({ title, description, onClick, color }: QuickActionProps) {
  return (
    <button onClick={onClick}
      className="group relative rounded-2xl p-[1px] transition-all duration-300 cursor-pointer w-full text-left hover:scale-[1.02]"
      style={{
        background: `linear-gradient(135deg, ${color}50, transparent 50%, ${color}20)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${color}80, ${color}30 50%, #c800ff50)`;
        e.currentTarget.style.boxShadow = `0 0 20px ${color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${color}50, transparent 50%, ${color}20)`;
        e.currentTarget.style.boxShadow = 'none';
      }}>
      <div className="relative rounded-2xl p-4 md:p-5 h-full"
        style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
        <div className="w-1 h-6 rounded-full absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }} />
        <h3 className="text-sm md:text-base font-semibold mb-1 text-white/80 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-xs md:text-sm text-white/30">{description}</p>
      </div>
    </button>
  );
}

function GlassCard({ children, className = '', glowColor }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const glow = glowColor || '#00aeff';
  return (
    <div className={`relative rounded-2xl p-[1.5px] ${className}`}
      style={{
        background: `linear-gradient(160deg, ${glow}70, ${glow}20 40%, #c800ff30 70%, #c800ff60)`,
        boxShadow: `0 0 12px ${glow}12`,
      }}>
      <div className="relative rounded-2xl p-4 md:p-6 h-full"
        style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
        {children}
      </div>
    </div>
  );
}

function WelcomeSection({ avatar, welcomeKey, subtitleKey, name }: { avatar?: string; welcomeKey: string; subtitleKey: string; name?: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full p-[1.5px]"
          style={{ background: 'linear-gradient(135deg, #00aeff90, #c800ff80)' }}>
          <img
            src={avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
            style={{ background: '#0d1117' }}
          />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1aff00] border-2" style={{ borderColor: '#0d1117' }} />
      </div>
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-0.5">
          {t(welcomeKey as any)}{name ? `, ${name}` : ''}
        </h2>
        <p className="text-xs md:text-sm text-white/40">{t(subtitleKey as any)}</p>
      </div>
    </div>
  );
}

function AiInputField() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    setTimeout(() => {
      setResponse(t('dash.aiResponse' as any));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative rounded-2xl p-[1.5px]"
      style={{
        background: 'linear-gradient(160deg, rgba(0,174,255,0.5), rgba(0,174,255,0.1) 40%, rgba(200,0,255,0.15) 70%, rgba(200,0,255,0.4))',
        boxShadow: '0 0 15px rgba(0,174,255,0.08), 0 0 30px rgba(200,0,255,0.05)',
      }}>
      <div className="rounded-2xl p-4 md:p-5" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00aeff20, #c800ff20)' }}>
            <Bot size={15} className="text-[#00aeff]" />
          </div>
          <span className="text-sm font-semibold text-white/70">{t('dash.aiAssistant' as any)}</span>
          <Sparkles size={13} className="text-[#c800ff] ml-auto" />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={t('dash.aiPlaceholder' as any)}
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#00aeff]/40 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !query.trim()}
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              background: 'linear-gradient(135deg, #00aeff30, #c800ff30)',
              border: '1px solid rgba(0,174,255,0.2)',
            }}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#00aeff]/30 border-t-[#00aeff] rounded-full animate-spin" />
            ) : (
              <Send size={15} className="text-[#00aeff]" />
            )}
          </button>
        </div>
        {response && (
          <div className="mt-3 p-3 rounded-xl text-xs md:text-sm text-white/60 leading-relaxed" style={{ background: 'rgba(0,174,255,0.04)', border: '1px solid rgba(0,174,255,0.08)' }}>
            <Bot size={13} className="text-[#00aeff] inline mr-1.5 -mt-0.5" />
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const totalStudents = mockStudents.filter(s => s.status === 'active').length;
  const totalTeachers = mockTeachers.filter(t => t.status === 'active').length;
  const totalClasses = mockClasses.length;
  const totalSubjects = mockSubjects.length;

  const paidPayments = mockPayments.filter(p => p.status === 'paid').length;
  const totalPayments = mockPayments.length;
  const paymentPercentage = Math.round((paidPayments / totalPayments) * 100);

  return (
    <div className="space-y-5 md:space-y-6">
      <WelcomeSection avatar={user?.avatar} welcomeKey="dash.welcomeAdmin" subtitleKey="dash.manageSchool" />
      <AiInputField />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.totalStudents')} value={totalStudents} icon={<GraduationCap size={18} />} color="#00aeff" trend="+5.2%" />
        <StatCard title={t('dash.totalTeachers')} value={totalTeachers} icon={<Users size={18} />} color="#1aff00" trend="+2.1%" />
        <StatCard title={t('dash.totalClasses')} value={totalClasses} icon={<BookOpen size={18} />} color="#c800ff" />
        <StatCard title={t('dash.subjects')} value={totalSubjects} icon={<Award size={18} />} color="#ffb700" />
      </div>

      <GlassCard glowColor="#00aeff">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm md:text-base font-semibold flex items-center gap-2">
            <DollarSign size={16} className="text-[#00aeff]" />
            {t('dash.paymentStatus')}
          </h3>
          <button className="text-[#00aeff] text-xs hover:underline">{t('dash.viewDetail')}</button>
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs md:text-sm">{t('dash.paid')}</span>
            <span className="text-[#1aff00] font-semibold text-sm">{paidPayments} {t('dash.students')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs md:text-sm">{t('dash.unpaid')}</span>
            <span className="text-red-400 font-semibold text-sm">{totalPayments - paidPayments} {t('dash.students')}</span>
          </div>
          <div className="w-full bg-white/[0.06] rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-gradient-to-r from-[#00aeff] to-[#1aff00] h-1.5 rounded-full transition-all" style={{ width: `${paymentPercentage}%`, boxShadow: '0 0 10px rgba(0,174,255,0.4)' }} />
          </div>
          <p className="text-xs text-white/30 text-center">{paymentPercentage}% {t('dash.paidPercentage')}</p>
        </div>
      </GlassCard>

      <div>
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.quickActions')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction title={t('dash.addStudent')} description={t('dash.addStudentDesc')} color="#00aeff" />
          <QuickAction title={t('dash.addTeacher')} description={t('dash.addTeacherDesc')} color="#1aff00" />
          <QuickAction title={t('dash.makeAnnouncement')} description={t('dash.makeAnnouncementDesc')} color="#c800ff" />
          <QuickAction title={t('dash.forumEvent')} description={t('dash.forumEventDesc')} color="#ffb700" />
        </div>
      </div>
    </div>
  );
}

function GuruDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const myClasses = mockClasses.filter(c => c.teacherId === user?.teacherId);
  const mySubjects = mockSubjects.filter(s => s.teacherId === user?.teacherId);
  let totalStudents = 0;
  myClasses.forEach(cls => { totalStudents += mockStudents.filter(s => s.classId === cls.id).length; });

  return (
    <div className="space-y-5 md:space-y-6">
      <WelcomeSection avatar={user?.avatar} welcomeKey="dash.welcomeGuru" subtitleKey="dash.manageClass" />
      <AiInputField />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.activeClasses')} value={myClasses.length} icon={<BookOpen size={18} />} color="#1aff00" />
        <StatCard title={t('dash.totalStudents')} value={totalStudents} icon={<GraduationCap size={18} />} color="#00aeff" />
        <StatCard title={t('dash.subjects')} value={mySubjects.length} icon={<Award size={18} />} color="#c800ff" />
        <StatCard title={t('dash.activeAssignments')} value={8} icon={<FileText size={18} />} color="#ffb700" />
      </div>

      <GlassCard glowColor="#1aff00">
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.myClasses')}</h3>
        <div className="space-y-2">
          {myClasses.map(cls => (
            <div key={cls.id} className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <p className="text-sm font-medium">{cls.name}</p>
                <p className="text-xs text-white/40">{cls.studentCount} {t('dash.students')}</p>
              </div>
              <button className="text-[#1aff00] hover:underline text-xs">{t('dash.viewDetail')}</button>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.quickActions')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction title={t('dash.createAssignment')} description={t('dash.createAssignmentDesc')} color="#1aff00" />
          <QuickAction title={t('dash.createExam')} description={t('dash.createExamDesc')} color="#c800ff" />
          <QuickAction title={t('dash.inputGrade')} description={t('dash.inputGradeDesc')} color="#00aeff" />
          <QuickAction title={t('dash.attendance')} description={t('dash.attendanceDesc')} color="#ffb700" />
        </div>
      </div>
    </div>
  );
}

function MuridDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const myData = mockStudents.find(s => s.id === user?.studentId);
  const myPayments = mockPayments.filter(p => p.studentId === user?.studentId);
  const pendingPayment = myPayments.find(p => p.status === 'pending');

  return (
    <div className="space-y-5 md:space-y-6">
      <WelcomeSection avatar={user?.avatar} welcomeKey="dash.welcomeMurid" subtitleKey="dash.trackProgress" name={myData?.name} />
      <AiInputField />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.activeAssignments')} value={5} icon={<FileText size={18} />} color="#c800ff" />
        <StatCard title={t('dash.upcomingExams')} value={2} icon={<Calendar size={18} />} color="#ffb700" />
        <StatCard title={t('dash.averageGrade')} value="85.5" icon={<BarChart3 size={18} />} color="#1aff00" />
        <StatCard title={t('dash.attendanceRate')} value="95%" icon={<CheckCircle size={18} />} color="#00aeff" />
      </div>

      {pendingPayment && (
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute -inset-[0.5px] rounded-xl" style={{ background: 'linear-gradient(135deg, #ffb70040, transparent 50%, #ffb70015)' }} />
          <div className="relative rounded-xl p-4 md:p-5" style={{ background: 'linear-gradient(135deg, rgba(255,183,0,0.08), rgba(12,18,32,0.9))', border: '1px solid rgba(255,183,0,0.15)', boxShadow: '0 0 20px rgba(255,183,0,0.05)' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-[#ffb700]" size={18} />
              <h3 className="text-sm font-semibold">{t('dash.pendingPayment')}</h3>
            </div>
            <p className="text-white/50 text-xs mb-3">
              SPP {pendingPayment.month} {pendingPayment.year} - Rp {pendingPayment.amount.toLocaleString('id-ID')}
            </p>
            <button className="text-[#ffb700] px-4 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: 'rgba(255,183,0,0.15)', border: '1px solid rgba(255,183,0,0.25)', boxShadow: '0 0 12px rgba(255,183,0,0.1)' }}>
              {t('dash.payNow')}
            </button>
          </div>
        </div>
      )}

      <GlassCard glowColor="#c800ff">
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.todoAssignments')}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <p className="text-sm font-medium">Matematika - Persamaan Linear</p>
              <p className="text-xs text-white/40 flex items-center gap-1.5 mt-0.5"><Clock size={11} />{t('dash.deadline')}: 10 Feb 2026</p>
            </div>
            <button className="text-[#c800ff] hover:underline text-xs">{t('dash.doAssignment')}</button>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <p className="text-sm font-medium">Fisika - Gerak Lurus</p>
              <p className="text-xs text-white/40 flex items-center gap-1.5 mt-0.5"><Clock size={11} />{t('dash.deadline')}: 12 Feb 2026</p>
            </div>
            <button className="text-[#c800ff] hover:underline text-xs">{t('dash.doAssignment')}</button>
          </div>
        </div>
      </GlassCard>

      <div>
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.quickActions')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction title={t('dash.viewAssignment')} description={t('dash.viewAssignmentDesc')} color="#c800ff" />
          <QuickAction title={t('dash.viewSchedule')} description={t('dash.viewScheduleDesc')} color="#1aff00" />
          <QuickAction title={t('dash.viewGrade')} description={t('dash.viewGradeDesc')} color="#00aeff" />
          <QuickAction title={t('dash.paySPP')} description={t('dash.paySPPDesc')} color="#ffb700" />
        </div>
      </div>
    </div>
  );
}

function OrangTuaDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const children = mockStudents.filter(s => user?.childrenIds?.includes(s.id));
  const child = children[0];
  const childPayments = mockPayments.filter(p => p.studentId === child?.id);
  const pendingPayment = childPayments.find(p => p.status === 'pending');

  return (
    <div className="space-y-5 md:space-y-6">
      <WelcomeSection avatar={user?.avatar} welcomeKey="dash.welcomeOrangtua" subtitleKey="dash.monitorChild" />
      <AiInputField />

      {child && (
        <GlassCard glowColor="#00aeff">
          <h3 className="text-sm font-semibold mb-3">{t('dash.childInfo')}</h3>
          <div className="flex items-center gap-3">
            <img src={child.avatar} alt={child.name} className="w-12 h-12 rounded-xl bg-white/10" />
            <div>
              <p className="text-sm font-semibold">{child.name}</p>
              <p className="text-xs text-white/40">NIS: {child.nis}</p>
              <p className="text-xs text-white/40">{mockClasses.find(c => c.id === child.classId)?.name}</p>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.averageGrade')} value="85.5" icon={<BarChart3 size={18} />} color="#1aff00" />
        <StatCard title={t('dash.attendanceRate')} value="95%" icon={<CheckCircle size={18} />} color="#00aeff" />
        <StatCard title={t('dash.completedAssignments')} value="12/15" icon={<FileText size={18} />} color="#c800ff" />
        <StatCard title={t('dash.sppStatus')} value={pendingPayment ? t('dash.notPaid') : t('dash.fullyPaid')} icon={<DollarSign size={18} />} color={pendingPayment ? '#ffb700' : '#1aff00'} />
      </div>

      {pendingPayment && (
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute -inset-[0.5px] rounded-xl" style={{ background: 'linear-gradient(135deg, #ffb70040, transparent 50%, #ffb70015)' }} />
          <div className="relative rounded-xl p-4 md:p-5" style={{ background: 'linear-gradient(135deg, rgba(255,183,0,0.08), rgba(12,18,32,0.9))', border: '1px solid rgba(255,183,0,0.15)', boxShadow: '0 0 20px rgba(255,183,0,0.05)' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-[#ffb700]" size={18} />
              <h3 className="text-sm font-semibold">{t('dash.sppBill')}</h3>
            </div>
            <p className="text-white/50 text-xs mb-3">
              SPP {pendingPayment.month} {pendingPayment.year} - Rp {pendingPayment.amount.toLocaleString('id-ID')}
            </p>
            <button className="text-[#ffb700] px-4 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: 'rgba(255,183,0,0.15)', border: '1px solid rgba(255,183,0,0.25)', boxShadow: '0 0 12px rgba(255,183,0,0.1)' }}>
              {t('dash.payNow')}
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.quickActions')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction title={t('dash.viewGradeChild')} description={t('dash.viewGradeChildDesc')} color="#ffb700" />
          <QuickAction title={t('dash.viewReport')} description={t('dash.viewReportDesc')} color="#00aeff" />
          <QuickAction title={t('dash.paySPP')} description={t('dash.paySPPDesc')} color="#c800ff" />
          <QuickAction title={t('dash.contactTeacher')} description={t('dash.contactTeacherDesc')} color="#1aff00" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case 'admin': return <AdminDashboard />;
    case 'guru': return <GuruDashboard />;
    case 'murid': return <MuridDashboard />;
    case 'orangtua': return <OrangTuaDashboard />;
    default: return <AdminDashboard />;
  }
}
