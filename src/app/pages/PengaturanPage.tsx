import { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function PengaturanPage() {
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Profil berhasil diperbarui');
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Password berhasil diubah');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-['Inter',sans-serif]">PENGATURAN</h1>
        <p className="text-gray-400 text-sm mt-1">Kelola pengaturan akun dan preferensi</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <User size={24} className="text-[#00aeff]" />
            <h3 className="font-['Inter',sans-serif] text-lg">PROFIL</h3>
          </div>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nama Lengkap</Label>
                <Input 
                  defaultValue={user?.name}
                  className="bg-transparent border-white/[0.06]"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  type="email"
                  defaultValue={user?.email}
                  className="bg-transparent border-white/[0.06]"
                />
              </div>
            </div>
            <div>
              <Label>Username</Label>
              <Input 
                defaultValue={user?.username}
                className="bg-transparent border-white/[0.06]"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Username tidak dapat diubah</p>
            </div>
            <div>
              <Label>No. Telepon</Label>
              <Input 
                type="tel"
                placeholder="08xxxxxxxxxx"
                className="bg-transparent border-white/[0.06]"
              />
            </div>
            <Button type="submit" className="bg-[#00aeff] hover:bg-[#00aeff]/80">
              Simpan Perubahan
            </Button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={24} className="text-[#1aff00]" />
            <h3 className="font-['Inter',sans-serif] text-lg">KEAMANAN</h3>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label>Password Lama</Label>
              <Input 
                type="password"
                className="bg-transparent border-white/[0.06]"
                required
              />
            </div>
            <div>
              <Label>Password Baru</Label>
              <Input 
                type="password"
                className="bg-transparent border-white/[0.06]"
                required
              />
            </div>
            <div>
              <Label>Konfirmasi Password Baru</Label>
              <Input 
                type="password"
                className="bg-transparent border-white/[0.06]"
                required
              />
            </div>
            <Button type="submit" className="bg-[#1aff00] hover:bg-[#1aff00]/80 text-black">
              Ubah Password
            </Button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-[#c800ff]" />
            <h3 className="font-['Inter',sans-serif] text-lg">NOTIFIKASI</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Notifikasi Push</p>
                <p className="text-sm text-gray-400">Terima notifikasi di browser dan smartphone</p>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Notifikasi Email</p>
                <p className="text-sm text-gray-400">Terima pemberitahuan melalui email</p>
              </div>
              <Switch 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={24} className="text-[#ffb700]" />
            <h3 className="font-['Inter',sans-serif] text-lg">TAMPILAN</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                <div>
                  <p className="font-semibold">Mode Gelap</p>
                  <p className="text-sm text-gray-400">Gunakan tema gelap untuk mata yang lebih nyaman</p>
                </div>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <div>
              <Label>Bahasa</Label>
              <select className="w-full bg-transparent border border-white/[0.06] rounded-lg px-3 py-2 mt-2">
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
