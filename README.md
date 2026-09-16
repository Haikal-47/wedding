# The Wedding of Romeo & Juliet — Digital Invitation 💍

Website undangan digital pernikahan modern, elegan, dan responsif (*Single Page Application*) yang dibangun menggunakan **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, dan **Neon Database (PostgreSQL)** dengan **Drizzle ORM**.

---

## ✨ Fitur Utama

1. **Hero Cover (Overlay & Scroll Lock)**:
   - Tampilan pembuka layar penuh dengan animasi kelopak bunga jatuh.
   - Mengunci scrolling sampai tombol **"Buka Undangan"** ditekan.
   - Mendukung parameter URL dinamis: `?to=Nama+Tamu` (contoh: `http://localhost:3000/?to=Budi+Santoso`).
   - Memulai audio musik latar secara otomatis saat tombol diklik.

2. **Floating Music Controller**:
   - Widget audio mengambang dengan efek piringan hitam berputar & indikator gelombang suara.
   - Tombol kontrol Play/Pause dan Mute/Unmute yang tetap terlihat saat halaman di-scroll.

3. **Profil Kedua Mempelai**:
   - Profil Mempelai Pria & Wanita (nama lengkap, nama orang tua, dan tautan Instagram).
   - Teks pembuka dan doa dalam nuansa islami/universal.
   - Transisi fade-in halus saat di-scroll.

4. **Waktu & Detail Acara**:
   - Informasi detail Akad Nikah & Resepsi (hari, tanggal, jam, venue, dan alamat lengkap).
   - **Real-time Countdown Timer** (Hari, Jam, Menit, Detik).
   - Tombol interaktif langsung: **"Buka Google Maps"** dan **"Simpan Tanggal ke Google Calendar"**.

5. **Our Love Story (Timeline Vertikal)**:
   - Timeline perjalanan kisah cinta (Awal Pertemuan, Menjalin Hubungan, Lamaran, Pernikahan) dengan animasi bertahap.

6. **Galeri Foto & Lightbox Modal**:
   - Grid layout foto pre-wedding yang estetik dan responsif.
   - Lightbox popup layar penuh dengan tombol navigasi (Next/Prev) dan counter foto.

7. **Amplop Digital (Digital Gift)**:
   - Nomor rekening Bank BCA & Mandiri dengan fitur **"Salin Nomor Rekening"** (Copy to Clipboard) + notifikasi toast otomatis.
   - Kartu QRIS interaktif yang dapat ditampilkan/disembunyikan.

8. **RSVP & Buku Tamu (Guestbook Real-time dengan Neon Database)**:
   - Form konfirmasi kehadiran (Nama terisi otomatis dari URL `?to=`, pilihan Hadir/Tidak Hadir, jumlah tamu, pesan ucapan).
   - **Server Action Next.js** dengan integrasi langsung ke serverless PostgreSQL Neon melalui Drizzle ORM.
   - Efek selebrasi **Confetti** saat formulir berhasil terkirim.
   - Daftar ucapan dan doa yang tersimpan di Neon DB dan langsung ter-update secara real-time.

9. **Footer**:
   - Kutipan ayat suci Al-Qur'an (QS. Ar-Rum: 21) dan ucapan terima kasih dari kedua mempelai.

---

## 🎨 Palet Warna & Tipografi

- **Background Utama**: Off-white / Cream (`#FDFBF7`)
- **Primary Accent**: Sage Green (`#849683`)
- **Secondary Accent**: Muted Gold (`#C5A059`)
- **Text Color**: Dark Charcoal (`#2C3E35`)
- **Font Display / Heading**: Cormorant Garamond (Serif)
- **Font Body**: Plus Jakarta Sans (Sans-serif)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Animation**: Framer Motion & Canvas-Confetti
- **Database**: Neon Serverless PostgreSQL
- **ORM**: Drizzle ORM & Drizzle Kit
- **Deployment**: Vercel

---

## 🚀 Panduan Menjalankan Proyek

### 1. Clone & Install Dependensi
```bash
git clone https://github.com/Haikal-47/wedding.git
cd wedding
npm install
```

### 2. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel `DATABASE_URL` dengan connection string Neon PostgreSQL Anda:
```env
DATABASE_URL="postgresql://neondb_owner:npg_c0ezMgBwvl1q@ep-divine-rice-b3bpysiq-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Migrasi Schema Database (Neon DB)
Jalankan perintah berikut untuk menyinkronkan schema tabel `rsvps` ke Neon Database:
```bash
npm run db:push
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser di:
- Standar: `http://localhost:3000`
- Dengan nama tamu undangan: `http://localhost:3000/?to=Budi+Santoso`

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🌐 Deploy ke Vercel

1. Push repositori ini ke GitHub.
2. Buka [Vercel Dashboard](https://vercel.com) dan impor repository `wedding`.
3. Tambahkan Environment Variable di Vercel:
   - Key: `DATABASE_URL`
   - Value: Connection string Neon Anda (`postgresql://...`)
4. Klik **Deploy**. Website Anda siap diakses secara online!
