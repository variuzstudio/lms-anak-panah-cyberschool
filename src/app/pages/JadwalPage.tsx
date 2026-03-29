import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Schedule {
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const MOCK_SCHEDULE: Schedule[] = [
  { day: 'Senin', time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Budi Santoso, S.Pd', room: 'R.101' },
  { day: 'Senin', time: '08:30 - 10:00', subject: 'Bahasa Indonesia', teacher: 'Siti Aminah, S.Pd', room: 'R.102' },
  { day: 'Senin', time: '10:15 - 11:45', subject: 'Fisika', teacher: 'Ahmad Hidayat, S.Si', room: 'Lab Fisika' },
  { day: 'Selasa', time: '07:00 - 08:30', subject: 'Kimia', teacher: 'Dr. Rina Kusuma', room: 'Lab Kimia' },
  { day: 'Selasa', time: '08:30 - 10:00', subject: 'Biologi', teacher: 'Maya Sari, S.Pd', room: 'Lab Bio' },
  { day: 'Rabu', time: '07:00 - 08:30', subject: 'Sejarah', teacher: 'Doni Susanto, M.Pd', room: 'R.103' },
  { day: 'Rabu', time: '08:30 - 10:00', subject: 'Matematika', teacher: 'Budi Santoso, S.Pd', room: 'R.101' },
  { day: 'Kamis', time: '07:00 - 08:30', subject: 'Bahasa Inggris', teacher: 'Linda Wijaya, M.Pd', room: 'R.104' },
  { day: 'Jumat', time: '07:00 - 08:30', subject: 'Pendidikan Agama', teacher: 'Ustadz Ahmad', room: 'R.105' },
];

export default function JadwalPage() {
  const [selectedDay, setSelectedDay] = useState('Senin');

  const scheduleByDay = DAYS.reduce((acc, day) => {
    acc[day] = MOCK_SCHEDULE.filter(s => s.day === day);
    return acc;
  }, {} as Record<string, Schedule[]>);

  const currentDaySchedule = scheduleByDay[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-['Orbitron',sans-serif]">JADWAL PELAJARAN</h1>
        <p className="text-gray-400 text-sm mt-1">Lihat jadwal pelajaran mingguan</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3 rounded-lg transition-all ${
              selectedDay === day
                ? 'bg-[#00aeff] text-white'
                : 'bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:border-white/[0.12] hover:text-white'
            }`}
          >
            <span className="font-['Orbitron',sans-serif] text-sm">{day}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {currentDaySchedule.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-12 text-center">
            <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400">Tidak ada jadwal untuk hari ini</p>
          </div>
        ) : (
          currentDaySchedule.map((schedule, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6 hover:border-white/[0.12] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="flex items-center gap-2 text-[#00aeff] min-w-[120px]">
                    <Clock size={20} />
                    <span className="font-['Orbitron',sans-serif] text-sm">{schedule.time}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Orbitron',sans-serif] text-lg mb-1">{schedule.subject}</h3>
                    <p className="text-sm text-gray-400">{schedule.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-[#00aeff]/20 text-[#00aeff] px-3 py-1 rounded text-sm">
                    {schedule.room}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
        <h3 className="font-['Orbitron',sans-serif] mb-4">JADWAL LENGKAP MINGGU INI</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-transparent">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-['Orbitron',sans-serif]">Waktu</th>
                {DAYS.map((day) => (
                  <th key={day} className="px-4 py-3 text-left text-sm font-['Orbitron',sans-serif]">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['07:00 - 08:30', '08:30 - 10:00', '10:15 - 11:45', '13:00 - 14:30'].map((time) => (
                <tr key={time} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3 text-sm text-gray-400">{time}</td>
                  {DAYS.map((day) => {
                    const schedule = MOCK_SCHEDULE.find(s => s.day === day && s.time === time);
                    return (
                      <td key={day} className="px-4 py-3">
                        {schedule ? (
                          <div className="text-xs">
                            <p className="font-semibold text-[#00aeff]">{schedule.subject}</p>
                            <p className="text-gray-500">{schedule.room}</p>
                          </div>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
