import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Users, GraduationCap, BookOpen, DollarSign,
  TrendingUp, Award, Calendar, CheckCircle,
  Clock, AlertCircle, FileText, BarChart3
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
    <div className="group relative rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 md:p-5 hover:bg-white/[0.05] transition-all duration-300">
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 1px 0 ${color}20` }} />
      <div className="relative flex items-center justify-between mb-3">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
          <div style={{ color }}>{icon}</div>
        </div>
        {trend && (
          <div className="text-[#1aff00] text-[10px] md:text-xs flex items-center gap-1 bg-[#1aff00]/10 px-2 py-0.5 rounded-full">
            <TrendingUp size={11} />
            {trend}
          </div>
        )}
      </div>
      <p className="text-white/40 text-[10px] md:text-xs mb-0.5">{title}</p>
      <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
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
    <button
      onClick={onClick}
      className="relative rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 md:p-5 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer w-full text-left group"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color + '30')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
    >
      <div className="w-1 h-6 rounded-full absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: color }} />
      <h3 className="text-xs md:text-sm font-semibold mb-1 text-white/80 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-[10px] md:text-xs text-white/30">{description}</p>
    </button>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

function AdminDashboard() {
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
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-1">{t('dash.welcomeAdmin')}</h2>
        <p className="text-xs md:text-sm text-white/40">{t('dash.manageSchool')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.totalStudents')} value={totalStudents} icon={<GraduationCap size={18} />} color="#00aeff" trend="+5.2%" />
        <StatCard title={t('dash.totalTeachers')} value={totalTeachers} icon={<Users size={18} />} color="#1aff00" trend="+2.1%" />
        <StatCard title={t('dash.totalClasses')} value={totalClasses} icon={<BookOpen size={18} />} color="#c800ff" />
        <StatCard title={t('dash.subjects')} value={totalSubjects} icon={<Award size={18} />} color="#ffb700" />
      </div>

      <GlassCard>
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
          <div className="w-full bg-white/[0.06] rounded-full h-1.5 mt-3">
            <div className="bg-gradient-to-r from-[#00aeff] to-[#1aff00] h-1.5 rounded-full transition-all" style={{ width: `${paymentPercentage}%` }} />
          </div>
          <p className="text-[10px] text-white/30 text-center">{paymentPercentage}% {t('dash.paidPercentage')}</p>
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
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-1">{t('dash.welcomeGuru')}</h2>
        <p className="text-xs md:text-sm text-white/40">{t('dash.manageClass')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.activeClasses')} value={myClasses.length} icon={<BookOpen size={18} />} color="#1aff00" />
        <StatCard title={t('dash.totalStudents')} value={totalStudents} icon={<GraduationCap size={18} />} color="#00aeff" />
        <StatCard title={t('dash.subjects')} value={mySubjects.length} icon={<Award size={18} />} color="#c800ff" />
        <StatCard title={t('dash.activeAssignments')} value={8} icon={<FileText size={18} />} color="#ffb700" />
      </div>

      <GlassCard>
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.myClasses')}</h3>
        <div className="space-y-2">
          {myClasses.map(cls => (
            <div key={cls.id} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg border border-white/[0.04]">
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
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-1">{t('dash.welcomeMurid')}, {myData?.name}</h2>
        <p className="text-xs md:text-sm text-white/40">{t('dash.trackProgress')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title={t('dash.activeAssignments')} value={5} icon={<FileText size={18} />} color="#c800ff" />
        <StatCard title={t('dash.upcomingExams')} value={2} icon={<Calendar size={18} />} color="#ffb700" />
        <StatCard title={t('dash.averageGrade')} value="85.5" icon={<BarChart3 size={18} />} color="#1aff00" />
        <StatCard title={t('dash.attendanceRate')} value="95%" icon={<CheckCircle size={18} />} color="#00aeff" />
      </div>

      {pendingPayment && (
        <div className="relative rounded-xl bg-[#ffb700]/[0.06] border border-[#ffb700]/20 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-[#ffb700]" size={18} />
            <h3 className="text-sm font-semibold">{t('dash.pendingPayment')}</h3>
          </div>
          <p className="text-white/50 text-xs mb-3">
            SPP {pendingPayment.month} {pendingPayment.year} - Rp {pendingPayment.amount.toLocaleString('id-ID')}
          </p>
          <button className="bg-[#ffb700]/20 border border-[#ffb700]/30 text-[#ffb700] px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#ffb700]/30 transition-all">
            {t('dash.payNow')}
          </button>
        </div>
      )}

      <GlassCard>
        <h3 className="text-sm md:text-base font-semibold mb-3">{t('dash.todoAssignments')}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg border border-white/[0.04]">
            <div>
              <p className="text-sm font-medium">Matematika - Persamaan Linear</p>
              <p className="text-xs text-white/40 flex items-center gap-1.5 mt-0.5"><Clock size={11} />{t('dash.deadline')}: 10 Feb 2026</p>
            </div>
            <button className="text-[#c800ff] hover:underline text-xs">{t('dash.doAssignment')}</button>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg border border-white/[0.04]">
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
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-1">{t('dash.welcomeOrangtua')}</h2>
        <p className="text-xs md:text-sm text-white/40">{t('dash.monitorChild')}</p>
      </div>

      {child && (
        <GlassCard>
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
        <div className="relative rounded-xl bg-[#ffb700]/[0.06] border border-[#ffb700]/20 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-[#ffb700]" size={18} />
            <h3 className="text-sm font-semibold">{t('dash.sppBill')}</h3>
          </div>
          <p className="text-white/50 text-xs mb-3">
            SPP {pendingPayment.month} {pendingPayment.year} - Rp {pendingPayment.amount.toLocaleString('id-ID')}
          </p>
          <button className="bg-[#ffb700]/20 border border-[#ffb700]/30 text-[#ffb700] px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#ffb700]/30 transition-all">
            {t('dash.payNow')}
          </button>
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
