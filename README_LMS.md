# Learning Management System (LMS)

Sistem Manajemen Pembelajaran yang lengkap untuk sekolah dengan fitur-fitur modern dan terintegrasi.

## 🎯 Fitur Utama

### 1. **Multi-Role Authentication**
- Login sebagai Admin, Guru, Murid, dan Orang Tua
- Dashboard khusus untuk setiap role
- Demo credentials tersedia untuk testing

### 2. **Manajemen Akademik**

#### Admin
- Manajemen data guru dan siswa
- Manajemen kelas dan mata pelajaran
- Pengaturan jadwal pelajaran
- Laporan akademik lengkap
- Pengumuman sekolah

#### Guru
- Membuat dan mengelola tugas
- Membuat dan mengelola ujian
- Input nilai siswa
- Catat absensi
- Lihat laporan kelas

#### Murid
- Lihat dan kerjakan tugas
- Ikuti ujian online
- Cek nilai dan rapor
- Lihat jadwal pelajaran
- Lihat absensi

#### Orang Tua
- Pantau nilai anak
- Lihat laporan perkembangan
- Monitor kehadiran
- Bayar SPP
- Komunikasi dengan guru

### 3. **Sistem Pembelajaran**
- **Tugas**: Upload, submit, dan grading tugas
- **Ujian**: Quiz, UTS, UAS dengan timer
- **Nilai**: Real-time grade tracking dengan analytics
- **Absensi**: Digital attendance system
- **Laporan**: Comprehensive academic reports

### 4. **Pembayaran SPP Terintegrasi**
Terintegrasi dengan platform pembayaran populer di Indonesia:

**Bank Virtual Account:**
- BCA Virtual Account
- Mandiri Virtual Account
- BNI Virtual Account
- BRI Virtual Account

**E-Wallet:**
- GoPay
- OVO
- DANA
- ShopeePay
- LinkAja

**QRIS:**
- Scan QR Code untuk pembayaran

Fitur pembayaran:
- Notifikasi pembayaran real-time
- Riwayat transaksi
- Cetak bukti pembayaran
- Status pembayaran otomatis

### 5. **Forum & Event**
- Forum diskusi untuk semua anggota
- Buat dan kelola event sekolah
- Pendaftaran online untuk event
- Kategori: Academic, Sport, Art
- Real-time notifications

### 6. **Sistem Notifikasi**
- Browser push notifications
- Email notifications (configurable)
- In-app notification center
- Smartphone notification support
- Unread badge counter

### 7. **Responsive Design**
- Desktop-first design
- Mobile responsive
- Tablet support
- Touch-friendly interface
- Hamburger menu untuk mobile

## 🚀 Demo Credentials

Gunakan credentials berikut untuk login:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Guru | guru | guru123 |
| Murid | murid | murid123 |
| Orang Tua | orangtua | orangtua123 |

## 🎨 Design System

### Color Palette
- **Admin**: #00AEFF (Blue)
- **Guru**: #1AFF00 (Green)
- **Murid**: #C800FF (Purple)
- **Orang Tua**: #FFB700 (Orange)

### Typography
- Primary Font: Michroma (Headers)
- Secondary Font: Inter/System (Body text)

### Theme
- Dark mode optimized
- Consistent spacing system
- Modern glassmorphism effects
- Smooth animations

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Technical Stack

- **Framework**: React 18.3.1 with TypeScript
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Forms**: React Hook Form
- **State Management**: React Context API

## 📂 Project Structure

```
/src
  /app
    /components
      /layout
        - DashboardLayout.tsx (Main layout dengan sidebar)
      /ui (Reusable UI components)
    /context
      - AuthContext.tsx (Authentication state)
      - NotificationContext.tsx (Notification management)
    /pages
      - LoginPage.tsx
      - Dashboard.tsx
      - GuruPage.tsx
      - MuridPage.tsx
      - KelasPage.tsx
      - MataPelajaranPage.tsx
      - JadwalPage.tsx
      - TugasPage.tsx
      - UjianPage.tsx
      - NilaiPage.tsx
      - AbsensiPage.tsx
      - LaporanPage.tsx
      - PembayaranPage.tsx
      - ForumPage.tsx
      - PengaturanPage.tsx
    - routes.ts (Router configuration)
    - App.tsx
  /imports (Figma imported assets)
  /styles
    - fonts.css
    - index.css
    - tailwind.css
    - theme.css
  - main.tsx
```

## 🌟 Key Features Detail

### Dashboard
Setiap role memiliki dashboard yang disesuaikan dengan kebutuhan:
- Quick stats cards
- Recent activities
- Quick action buttons
- Announcements

### Manajemen Data
- CRUD operations untuk semua entitas
- Search dan filter functionality
- Data tables dengan sorting
- Export data (coming soon)

### Sistem Pembelajaran
- Tugas dengan deadline tracking
- Ujian dengan berbagai tipe (UTS, UAS, Kuis)
- Grading otomatis
- Laporan progress real-time

### Pembayaran
- Multiple payment methods
- Virtual account generation
- QR code payment
- Payment history
- Receipt generation

### Forum & Event
- Post discussions
- Comment system
- Like/share functionality
- Event registration
- Capacity management

## 🔐 Security Features
- Protected routes
- Role-based access control
- Local storage session management
- Auto-logout on inactivity (coming soon)

## 📊 Analytics & Reporting
- Student performance analytics
- Attendance tracking
- Payment status monitoring
- Grade distribution charts

## 🌍 Localization
- Bahasa Indonesia (Primary)
- English (Coming soon)

## 🔄 Real-time Features
- Push notifications
- Live attendance updates
- Real-time payment status
- Instant messaging (coming soon)

## 📱 Mobile App Features
- PWA ready
- Offline mode (coming soon)
- Push notifications on mobile
- Native-like experience

## 🎯 Future Enhancements
- [ ] Video conference integration
- [ ] AI-powered grading
- [ ] Parent-teacher chat
- [ ] Advanced analytics
- [ ] Mobile apps (iOS/Android)
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Export to PDF
- [ ] Bulk operations
- [ ] Calendar integration

## 📝 Notes

Aplikasi ini dirancang khusus untuk kebutuhan sekolah di Indonesia dengan mempertimbangkan:
- Sistem pendidikan Indonesia
- Platform pembayaran lokal
- Bahasa Indonesia sebagai bahasa utama
- Kebutuhan sekolah pada umumnya

## 🤝 Support

Untuk pertanyaan atau dukungan, silakan hubungi administrator sekolah.

## 📄 License

Private - All rights reserved
