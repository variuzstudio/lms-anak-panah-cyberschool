import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Video, VideoOff, Mic, MicOff, Monitor, MonitorOff, Phone,
  MessageSquare, Users, Settings, Plus, Calendar, Clock, Copy,
  Check, Hand, Smile, PenTool, LayoutGrid, ChevronLeft,
  Circle, MoreVertical, Search, X, Send, Link2,
  Maximize2, Minimize2, Volume2, VolumeX, Shield
} from 'lucide-react';

type MeetingStatus = 'live' | 'scheduled' | 'completed';
type ViewMode = 'lobby' | 'room' | 'create' | 'join';

interface Meeting {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  status: MeetingStatus;
  date: string;
  time: string;
  duration: number;
  participants: number;
  maxParticipants: number;
  subject?: string;
  className?: string;
  description?: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  isMe?: boolean;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHandRaised: boolean;
  isHost?: boolean;
  isCoHost?: boolean;
}

const mockMeetings: Meeting[] = [
  {
    id: 'MTG-001',
    title: 'Kelas Matematika - Persamaan Linear',
    host: 'Budi Santoso, S.Pd',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    status: 'live',
    date: '2026-03-29',
    time: '09:00',
    duration: 90,
    participants: 24,
    maxParticipants: 40,
    subject: 'Matematika',
    className: 'XI IPA 1',
    description: 'Pembahasan materi persamaan linear dua variabel dan latihan soal.',
  },
  {
    id: 'MTG-002',
    title: 'Kelas Fisika - Gerak Lurus',
    host: 'Siti Rahayu, S.Pd',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2',
    status: 'scheduled',
    date: '2026-03-29',
    time: '10:30',
    duration: 90,
    participants: 0,
    maxParticipants: 40,
    subject: 'Fisika',
    className: 'XI IPA 1',
    description: 'Materi gerak lurus beraturan dan berubah beraturan.',
  },
  {
    id: 'MTG-003',
    title: 'Rapat Guru - Evaluasi Semester',
    host: 'Administrator',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    status: 'scheduled',
    date: '2026-03-30',
    time: '14:00',
    duration: 120,
    participants: 0,
    maxParticipants: 50,
    description: 'Rapat evaluasi kegiatan belajar mengajar semester genap.',
  },
  {
    id: 'MTG-004',
    title: 'Kelas Bahasa Inggris - Grammar',
    host: 'Dewi Lestari, S.Pd',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher3',
    status: 'completed',
    date: '2026-03-28',
    time: '08:00',
    duration: 90,
    participants: 30,
    maxParticipants: 40,
    subject: 'Bahasa Inggris',
    className: 'X IPA 2',
  },
  {
    id: 'MTG-005',
    title: 'Konsultasi Orang Tua - Wali Kelas',
    host: 'Budi Santoso, S.Pd',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    status: 'completed',
    date: '2026-03-27',
    time: '15:00',
    duration: 60,
    participants: 12,
    maxParticipants: 30,
  },
];

const mockParticipants: Participant[] = [
  { id: 'P1', name: 'Budi Santoso, S.Pd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1', role: 'Guru', isMuted: false, isVideoOn: true, isHandRaised: false, isHost: true },
  { id: 'P2', name: 'Ahmad Ridwan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1', role: 'Murid', isMuted: true, isVideoOn: true, isHandRaised: false },
  { id: 'P3', name: 'Siti Nurhaliza', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2', role: 'Murid', isMuted: true, isVideoOn: false, isHandRaised: true },
  { id: 'P4', name: 'Rizky Maulana', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student3', role: 'Murid', isMuted: false, isVideoOn: true, isHandRaised: false },
  { id: 'P5', name: 'Putri Ayu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student4', role: 'Murid', isMuted: true, isVideoOn: true, isHandRaised: false },
  { id: 'P6', name: 'Dimas Prasetyo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student5', role: 'Murid', isMuted: true, isVideoOn: false, isHandRaised: false },
  { id: 'P7', name: 'Anisa Rahma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student6', role: 'Murid', isMuted: false, isVideoOn: true, isHandRaised: false },
  { id: 'P8', name: 'Fajar Nugroho', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student7', role: 'Murid', isMuted: true, isVideoOn: true, isHandRaised: true },
  { id: 'P9', name: 'Maya Sari', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student8', role: 'Murid', isMuted: true, isVideoOn: false, isHandRaised: false },
];

const mockChatMessages: ChatMessage[] = [
  { id: 'C1', sender: 'Budi Santoso, S.Pd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1', message: 'Selamat pagi semua, kita mulai kelasnya ya.', time: '09:00' },
  { id: 'C2', sender: 'Ahmad Ridwan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1', message: 'Pagi pak!', time: '09:01' },
  { id: 'C3', sender: 'Siti Nurhaliza', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2', message: 'Pagi pak, siap belajar!', time: '09:01' },
  { id: 'C4', sender: 'Budi Santoso, S.Pd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1', message: 'Hari ini kita akan membahas persamaan linear dua variabel. Silakan buka buku halaman 45.', time: '09:02' },
  { id: 'C5', sender: 'Rizky Maulana', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student3', message: 'Pak, yang kemarin tugasnya kapan dibahas?', time: '09:05' },
  { id: 'C6', sender: 'Budi Santoso, S.Pd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1', message: 'Tugas kemarin akan kita bahas di sesi terakhir ya.', time: '09:06' },
];

function MeetingCard({ meeting, onJoin, onStart }: { meeting: Meeting; onJoin: (id: string) => void; onStart: (id: string) => void }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const statusColors: Record<MeetingStatus, { bg: string; text: string; dot: string; glow: string }> = {
    live: { bg: 'rgba(26,255,0,0.1)', text: '#1aff00', dot: '#1aff00', glow: 'rgba(26,255,0,0.3)' },
    scheduled: { bg: 'rgba(0,174,255,0.1)', text: '#00aeff', dot: '#00aeff', glow: 'rgba(0,174,255,0.3)' },
    completed: { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.4)', dot: 'rgba(255,255,255,0.3)', glow: 'transparent' },
  };

  const sc = statusColors[meeting.status];

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://lms.anakpanah.sch.id/meet/${meeting.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-2xl p-[1.5px] transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: meeting.status === 'live'
          ? 'linear-gradient(135deg, #1aff0070, #1aff0020 40%, #00aeff30 70%, #00aeff60)'
          : meeting.status === 'scheduled'
            ? 'linear-gradient(135deg, #00aeff50, #00aeff15 40%, #c800ff20 70%, #c800ff40)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04))',
        boxShadow: meeting.status === 'live' ? '0 0 20px rgba(26,255,0,0.1)' : meeting.status === 'scheduled' ? '0 0 15px rgba(0,174,255,0.08)' : 'none',
      }}>
      <div className="relative rounded-2xl p-5 md:p-6" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: sc.bg, color: sc.text, boxShadow: `0 0 8px ${sc.glow}` }}>
                {meeting.status === 'live' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sc.dot }} />}
                {t(`meet.${meeting.status}` as any)}
              </span>
              {meeting.className && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-white/40">{meeting.className}</span>
              )}
            </div>
            <h3 className="text-sm md:text-base font-semibold text-white/90 truncate">{meeting.title}</h3>
            {meeting.description && (
              <p className="text-xs text-white/30 mt-1 line-clamp-2">{meeting.description}</p>
            )}
          </div>
          <button className="shrink-0 p-2 rounded-lg hover:bg-white/[0.06] transition-colors" onClick={handleCopy}>
            {copied ? <Check size={14} className="text-[#1aff00]" /> : <Copy size={14} className="text-white/30" />}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <img src={meeting.hostAvatar} alt={meeting.host} className="w-7 h-7 rounded-full" style={{ background: '#1a1f2e' }} />
          <div className="text-xs">
            <span className="text-white/50">{t('meet.host' as any)}:</span>
            <span className="text-white/70 ml-1 font-medium">{meeting.host}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
          <span className="flex items-center gap-1"><Calendar size={12} />{meeting.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} />{meeting.time}</span>
          <span className="flex items-center gap-1"><Clock size={12} />{meeting.duration} {t('meet.minutes' as any)}</span>
          <span className="flex items-center gap-1 ml-auto"><Users size={12} />{meeting.participants}/{meeting.maxParticipants}</span>
        </div>

        {meeting.subject && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] px-2.5 py-1 rounded-lg text-white/50" style={{ background: 'rgba(0,174,255,0.08)', border: '1px solid rgba(0,174,255,0.1)' }}>
              {meeting.subject}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {meeting.status === 'live' && (
            <button onClick={() => onJoin(meeting.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(26,255,0,0.15), rgba(26,255,0,0.05))',
                border: '1px solid rgba(26,255,0,0.25)',
                color: '#1aff00',
                boxShadow: '0 0 15px rgba(26,255,0,0.1)',
              }}>
              <Video size={15} />{t('meet.join' as any)}
            </button>
          )}
          {meeting.status === 'scheduled' && (
            <button onClick={() => onStart(meeting.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(0,174,255,0.15), rgba(0,174,255,0.05))',
                border: '1px solid rgba(0,174,255,0.25)',
                color: '#00aeff',
                boxShadow: '0 0 15px rgba(0,174,255,0.1)',
              }}>
              <Video size={15} />{t('meet.start' as any)}
            </button>
          )}
          <button className="p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <MoreVertical size={15} className="text-white/40" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MeetingRoom({ meeting, onLeave }: { meeting: Meeting; onLeave: () => void }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [layout, setLayout] = useState<'grid' | 'speaker'>('grid');
  const [elapsed, setElapsed] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: `C${chatMessages.length + 1}`,
      sender: user?.name || 'You',
      avatar: user?.avatar || '',
      message: newMessage,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setChatMessages([...chatMessages, msg]);
    setNewMessage('');
  };

  const sidebarOpen = showChat || showParticipants || showSettings;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0a0e17' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: 'linear-gradient(90deg, #0d1117, #111827)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <button onClick={onLeave} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
            <ChevronLeft size={18} className="text-white/60" />
          </button>
          <div>
            <h3 className="text-sm font-semibold text-white/90">{meeting.title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <span className="flex items-center gap-1">
                <Circle size={6} className="text-[#1aff00] fill-[#1aff00] animate-pulse" />
                {t('meet.live' as any)}
              </span>
              <span>•</span>
              <span>{formatTime(elapsed)}</span>
              <span>•</span>
              <span>{mockParticipants.length} {t('meet.participants' as any)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isRecording && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full mr-2" style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,60,60,0.25)' }}>
              <Circle size={6} className="text-red-500 fill-red-500 animate-pulse" />
              <span className="text-[11px] text-red-400 font-medium">{t('meet.recording' as any)}</span>
            </div>
          )}
          <button onClick={() => setLayout(layout === 'grid' ? 'speaker' : 'grid')} className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors" title="Layout">
            <LayoutGrid size={16} className="text-white/50" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors">
            {isFullscreen ? <Minimize2 size={16} className="text-white/50" /> : <Maximize2 size={16} className="text-white/50" />}
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-white/[0.1]' : 'hover:bg-white/[0.06]'}`}>
            <Settings size={16} className={showSettings ? 'text-[#00aeff]' : 'text-white/50'} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 p-3 md:p-4 overflow-auto">
          {layout === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 h-full auto-rows-fr">
              {mockParticipants.map((p) => (
                <div key={p.id} className="relative rounded-xl overflow-hidden group/vid"
                  style={{ background: 'linear-gradient(135deg, #111827, #0d1117)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {p.isVideoOn ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={p.avatar} alt={p.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold"
                        style={{ background: 'linear-gradient(135deg, #00aeff20, #c800ff20)', color: '#00aeff' }}>
                        {p.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between"
                    style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-white/80 font-medium truncate max-w-[100px]">{p.name.split(' ')[0]}</span>
                      {p.isHost && <Shield size={10} className="text-[#ffb700]" />}
                    </div>
                    <div className="flex items-center gap-1">
                      {p.isHandRaised && <Hand size={12} className="text-[#ffb700]" />}
                      {p.isMuted ? <MicOff size={12} className="text-red-400" /> : <Mic size={12} className="text-[#1aff00]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full gap-3">
              <div className="flex-1 relative rounded-xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #111827, #0d1117)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={mockParticipants[0].avatar} alt={mockParticipants[0].name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                  <Shield size={12} className="text-[#ffb700]" />
                  <span className="text-sm text-white/90 font-medium">{mockParticipants[0].name}</span>
                  <span className="text-[11px] text-white/40 ml-1">({t('meet.host' as any)})</span>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {mockParticipants.slice(1).map((p) => (
                  <div key={p.id} className="relative w-28 h-20 md:w-36 md:h-24 shrink-0 rounded-lg overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #111827, #0d1117)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {p.isVideoOn ? (
                      <img src={p.avatar} alt={p.name} className="w-full h-full object-cover opacity-70" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ background: 'linear-gradient(135deg, #00aeff20, #c800ff20)', color: '#00aeff' }}>
                          {p.name.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 text-[10px] text-white/70 truncate"
                      style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                      {p.name.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (chat/participants/settings) */}
        {sidebarOpen && (
          <div className="w-80 shrink-0 flex flex-col border-l border-white/[0.06]" style={{ background: 'linear-gradient(180deg, #0d1117, #0f1520)' }}>
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06]">
              <button onClick={() => { setShowChat(true); setShowParticipants(false); setShowSettings(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showChat ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/60'}`}>
                {t('meet.chat' as any)}
              </button>
              <button onClick={() => { setShowParticipants(true); setShowChat(false); setShowSettings(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showParticipants ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/60'}`}>
                {t('meet.participants' as any)} ({mockParticipants.length})
              </button>
              {showSettings && (
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.08] text-white">
                  {t('meet.settings' as any)}
                </span>
              )}
              <button onClick={() => { setShowChat(false); setShowParticipants(false); setShowSettings(false); }} className="ml-auto p-1 rounded hover:bg-white/[0.06]">
                <X size={14} className="text-white/40" />
              </button>
            </div>

            {showChat && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hidden">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                      <img src={msg.avatar} alt={msg.sender} className="w-7 h-7 rounded-full shrink-0 mt-0.5" style={{ background: '#1a1f2e' }} />
                      <div className={`max-w-[85%] ${msg.isMe ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[11px] font-medium text-white/50">{msg.isMe ? 'You' : msg.sender.split(' ')[0]}</span>
                          <span className="text-[10px] text-white/25">{msg.time}</span>
                        </div>
                        <div className={`inline-block px-3 py-2 rounded-xl text-xs text-white/80 ${msg.isMe ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                          style={{ background: msg.isMe ? 'rgba(0,174,255,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${msg.isMe ? 'rgba(0,174,255,0.15)' : 'rgba(255,255,255,0.05)'}` }}>
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-3 border-t border-white/[0.06]">
                  <div className="flex gap-2">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder={t('meet.typeMessage' as any)}
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#00aeff]/30 transition-colors" />
                    <button onClick={sendMessage} className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                      style={{ background: 'linear-gradient(135deg, #00aeff25, #c800ff25)', border: '1px solid rgba(0,174,255,0.15)' }}>
                      <Send size={13} className="text-[#00aeff]" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hidden">
                {mockParticipants.map((p) => (
                  <div key={p.id} className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors">
                    <div className="relative">
                      <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full" style={{ background: '#1a1f2e' }} />
                      {p.isHost && <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#ffb700] flex items-center justify-center"><Shield size={8} className="text-black" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{p.name}</p>
                      <p className="text-[10px] text-white/30">{p.role}{p.isHost ? ` • ${t('meet.host' as any)}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.isHandRaised && <Hand size={12} className="text-[#ffb700]" />}
                      {p.isMuted ? <MicOff size={12} className="text-red-400/60" /> : <Mic size={12} className="text-[#1aff00]/60" />}
                      {p.isVideoOn ? <Video size={12} className="text-[#00aeff]/60" /> : <VideoOff size={12} className="text-white/20" />}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showSettings && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hidden">
                {[
                  { key: 'meet.enableWaiting', default: true },
                  { key: 'meet.muteOnEntry', default: true },
                  { key: 'meet.allowChat', default: true },
                  { key: 'meet.allowRecord', default: false },
                  { key: 'meet.allowScreenShare', default: true },
                ].map((setting) => (
                  <SettingToggle key={setting.key} labelKey={setting.key} defaultValue={setting.default} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-center gap-2 md:gap-3 px-4 py-3 shrink-0" style={{ background: 'linear-gradient(90deg, #0d1117, #111827)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <ControlButton active={!isMuted} onClick={() => setIsMuted(!isMuted)}
          icon={isMuted ? <MicOff size={18} /> : <Mic size={18} />}
          activeColor="#1aff00" label={isMuted ? t('meet.unmute' as any) : t('meet.mute' as any)} />
        <ControlButton active={isVideoOn} onClick={() => setIsVideoOn(!isVideoOn)}
          icon={isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
          activeColor="#00aeff" label={t('meet.camera' as any)} />
        <ControlButton active={isScreenSharing} onClick={() => setIsScreenSharing(!isScreenSharing)}
          icon={isScreenSharing ? <MonitorOff size={18} /> : <Monitor size={18} />}
          activeColor="#c800ff" label={t('meet.shareScreen' as any)} />
        <ControlButton active={isRecording} onClick={() => setIsRecording(!isRecording)}
          icon={<Circle size={18} className={isRecording ? 'fill-red-500' : ''} />}
          activeColor="#ff4444" label={t('meet.record' as any)} />

        <div className="w-px h-8 bg-white/[0.08] mx-1" />

        <ControlButton active={isHandRaised} onClick={() => setIsHandRaised(!isHandRaised)}
          icon={<Hand size={18} />}
          activeColor="#ffb700" label={t('meet.raiseHand' as any)} />
        <ControlButton active={showChat} onClick={() => { setShowChat(!showChat); setShowParticipants(false); setShowSettings(false); }}
          icon={<MessageSquare size={18} />}
          activeColor="#00aeff" label={t('meet.chat' as any)} />
        <ControlButton active={showParticipants} onClick={() => { setShowParticipants(!showParticipants); setShowChat(false); setShowSettings(false); }}
          icon={<Users size={18} />}
          activeColor="#c800ff" label={t('meet.participants' as any)} badge={mockParticipants.length} />

        <div className="w-px h-8 bg-white/[0.08] mx-1" />

        <button onClick={onLeave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(255,60,60,0.2), rgba(255,60,60,0.08))',
            border: '1px solid rgba(255,60,60,0.3)',
            color: '#ff4444',
            boxShadow: '0 0 15px rgba(255,60,60,0.1)',
          }}>
          <Phone size={16} className="rotate-[135deg]" />
          <span className="hidden md:inline">{t('meet.leave' as any)}</span>
        </button>
      </div>
    </div>
  );
}

function ControlButton({ active, onClick, icon, activeColor, label, badge }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; activeColor: string; label: string; badge?: number;
}) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center gap-1 group" title={label}>
      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all"
        style={{
          background: active ? `${activeColor}15` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${active ? activeColor + '30' : 'rgba(255,255,255,0.06)'}`,
          color: active ? activeColor : 'rgba(255,255,255,0.5)',
          boxShadow: active ? `0 0 12px ${activeColor}15` : 'none',
        }}>
        {icon}
        {badge !== undefined && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: activeColor, color: '#0d1117' }}>
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-white/30 hidden md:block">{label}</span>
    </button>
  );
}

function SettingToggle({ labelKey, defaultValue }: { labelKey: string; defaultValue: boolean }) {
  const { t } = useLanguage();
  const [enabled, setEnabled] = useState(defaultValue);
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/60">{t(labelKey as any)}</span>
      <button onClick={() => setEnabled(!enabled)}
        className="relative w-10 h-5.5 rounded-full transition-all"
        style={{
          background: enabled ? 'linear-gradient(135deg, #00aeff40, #c800ff40)' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${enabled ? 'rgba(0,174,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
        }}>
        <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
          style={{
            left: enabled ? '22px' : '2px',
            background: enabled ? '#00aeff' : 'rgba(255,255,255,0.3)',
            boxShadow: enabled ? '0 0 8px rgba(0,174,255,0.4)' : 'none',
          }} />
      </button>
    </div>
  );
}

function CreateMeetingModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('90');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl p-[1.5px]"
        style={{ background: 'linear-gradient(160deg, rgba(0,174,255,0.5), rgba(0,174,255,0.1) 40%, rgba(200,0,255,0.15) 70%, rgba(200,0,255,0.4))' }}>
        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">{t('meet.create' as any)}</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06]"><X size={18} className="text-white/40" /></button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t('meet.meetingTitle' as any)}</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder={t('meet.enterTitle' as any)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#00aeff]/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">{t('meet.description' as any)}</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#00aeff]/40 transition-colors resize-none" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">{t('meet.date' as any)}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00aeff]/40 transition-colors [color-scheme:dark]" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">{t('meet.time' as any)}</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00aeff]/40 transition-colors [color-scheme:dark]" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">{t('meet.duration' as any)}</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00aeff]/40 transition-colors [color-scheme:dark]">
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white/50 transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {t('meet.cancel' as any)}
            </button>
            <button onClick={onCreate}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(0,174,255,0.2), rgba(200,0,255,0.15))',
                border: '1px solid rgba(0,174,255,0.3)',
                color: '#00aeff',
                boxShadow: '0 0 15px rgba(0,174,255,0.1)',
              }}>
              {t('meet.schedule' as any)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JoinMeetingModal({ onClose, onJoin }: { onClose: () => void; onJoin: (id: string) => void }) {
  const { t } = useLanguage();
  const [meetingId, setMeetingId] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl p-[1.5px]"
        style={{ background: 'linear-gradient(160deg, rgba(26,255,0,0.4), rgba(26,255,0,0.1) 40%, rgba(0,174,255,0.15) 70%, rgba(0,174,255,0.4))' }}>
        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">{t('meet.joinMeeting' as any)}</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06]"><X size={18} className="text-white/40" /></button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3 mb-5 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(26,255,0,0.1)' }}>
                <Video size={18} className="text-[#1aff00]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Preview</p>
                <p className="text-[11px] text-white/30">Camera & Microphone ready</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(26,255,0,0.1)', border: '1px solid rgba(26,255,0,0.2)' }}>
                  <Mic size={14} className="text-[#1aff00]" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,174,255,0.1)', border: '1px solid rgba(0,174,255,0.2)' }}>
                  <Video size={14} className="text-[#00aeff]" />
                </button>
              </div>
            </div>

            <label className="text-xs text-white/50 mb-1.5 block">{t('meet.meetingId' as any)}</label>
            <div className="flex gap-2">
              <input type="text" value={meetingId} onChange={(e) => setMeetingId(e.target.value)}
                placeholder={t('meet.enterMeetingId' as any)}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#1aff00]/40 transition-colors" />
              <button onClick={() => meetingId && onJoin(meetingId)}
                disabled={!meetingId.trim()}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(26,255,0,0.2), rgba(26,255,0,0.08))',
                  border: '1px solid rgba(26,255,0,0.3)',
                  color: '#1aff00',
                  boxShadow: '0 0 15px rgba(26,255,0,0.1)',
                }}>
                {t('meet.join' as any)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetingPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('lobby');
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'scheduled' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeetings = mockMeetings.filter(m => {
    if (filter !== 'all' && m.status !== filter) return false;
    if (searchQuery && !m.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const liveMeetings = mockMeetings.filter(m => m.status === 'live');
  const scheduledMeetings = mockMeetings.filter(m => m.status === 'scheduled');

  const handleJoinMeeting = (meetingId: string) => {
    const meeting = mockMeetings.find(m => m.id === meetingId) || mockMeetings[0];
    setActiveMeeting(meeting);
    setViewMode('room');
    setShowJoinModal(false);
  };

  const handleStartMeeting = (meetingId: string) => {
    const meeting = mockMeetings.find(m => m.id === meetingId);
    if (meeting) {
      setActiveMeeting({ ...meeting, status: 'live' });
      setViewMode('room');
    }
  };

  const handleLeaveMeeting = () => {
    setActiveMeeting(null);
    setViewMode('lobby');
  };

  if (viewMode === 'room' && activeMeeting) {
    return <MeetingRoom meeting={activeMeeting} onLeave={handleLeaveMeeting} />;
  }

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-1 flex items-center gap-2">
            <Video size={22} className="text-[#00aeff]" />
            {t('meet.title' as any)}
          </h2>
          <p className="text-xs md:text-sm text-white/40">{t('meet.subtitle' as any)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(26,255,0,0.12), rgba(26,255,0,0.04))',
              border: '1px solid rgba(26,255,0,0.2)',
              color: '#1aff00',
            }}>
            <Link2 size={15} />{t('meet.joinMeeting' as any)}
          </button>
          <button onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(0,174,255,0.15), rgba(200,0,255,0.1))',
              border: '1px solid rgba(0,174,255,0.3)',
              color: '#00aeff',
              boxShadow: '0 0 15px rgba(0,174,255,0.08)',
            }}>
            <Plus size={15} />{t('meet.newMeeting' as any)}
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl p-[1.5px]" style={{ background: 'linear-gradient(135deg, #1aff0060, #1aff0015 50%, #00aeff30)', boxShadow: '0 0 12px rgba(26,255,0,0.08)' }}>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(26,255,0,0.1)' }}>
              <Circle size={18} className="text-[#1aff00] fill-[#1aff00] animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#1aff00]">{liveMeetings.length}</p>
              <p className="text-[11px] text-white/40">{t('meet.live' as any)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-[1.5px]" style={{ background: 'linear-gradient(135deg, #00aeff50, #00aeff10 50%, #c800ff20)' }}>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,174,255,0.1)' }}>
              <Calendar size={18} className="text-[#00aeff]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#00aeff]">{scheduledMeetings.length}</p>
              <p className="text-[11px] text-white/40">{t('meet.scheduled' as any)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-[1.5px]" style={{ background: 'linear-gradient(135deg, #c800ff40, #c800ff10 50%, #00aeff20)' }}>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(200,0,255,0.1)' }}>
              <Users size={18} className="text-[#c800ff]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#c800ff]">{mockParticipants.length}</p>
              <p className="text-[11px] text-white/40">{t('meet.participants' as any)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search' as any)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-[#00aeff]/30 transition-colors" />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'live', 'scheduled', 'completed'] as const).map((f) => {
            const colors: Record<string, string> = { all: '#ffffff', live: '#1aff00', scheduled: '#00aeff', completed: '#c800ff' };
            const c = colors[f];
            const labels: Record<string, string> = { all: 'All', live: t('meet.live' as any), scheduled: t('meet.scheduled' as any), completed: t('meet.completed' as any) };
            return (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: filter === f ? `${c}15` : 'transparent',
                  border: `1px solid ${filter === f ? c + '30' : 'rgba(255,255,255,0.06)'}`,
                  color: filter === f ? c : 'rgba(255,255,255,0.4)',
                }}>
                {labels[f]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meeting list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        {filteredMeetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} onJoin={handleJoinMeeting} onStart={handleStartMeeting} />
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="text-center py-16">
          <Video size={40} className="text-white/10 mx-auto mb-3" />
          <p className="text-sm text-white/30">{t('meet.noUpcoming' as any)}</p>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateMeetingModal onClose={() => setShowCreateModal(false)} onCreate={() => setShowCreateModal(false)} />}
      {showJoinModal && <JoinMeetingModal onClose={() => setShowJoinModal(false)} onJoin={handleJoinMeeting} />}
    </div>
  );
}
