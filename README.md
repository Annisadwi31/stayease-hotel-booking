# StayEase Hotel Booking System

## Deskripsi

StayEase Hotel Booking System merupakan aplikasi reservasi hotel berbasis web yang menerapkan **Role-Based Access Control (RBAC)** menggunakan **Supabase**. Sistem ini dikembangkan untuk mengatur hak akses pengguna berdasarkan peran sehingga setiap pengguna hanya dapat mengakses fitur sesuai dengan tugas dan tanggung jawabnya.

Aplikasi menggunakan **React** dan **Vite** sebagai frontend, **Supabase** sebagai layanan database dan autentikasi, serta **Vercel** sebagai platform deployment.

---

## Fitur

### Admin
- Login ke sistem
- Mengelola data kamar
- Mengelola data fasilitas
- Mengelola data reservasi
- Mengelola data pengguna
- Mengelola seluruh fitur sistem

### Resepsionis
- Login ke sistem
- Melihat daftar reservasi pelanggan
- Melakukan konfirmasi check-in
- Melakukan konfirmasi check-out

### Customer
- Registrasi akun
- Login ke sistem
- Melihat daftar kamar
- Melihat detail kamar
- Melakukan reservasi
- Melihat data reservasi

---

## Role-Based Access Control (RBAC)

| Role | Hak Akses |
|------|-----------|
| Admin | Mengelola seluruh data dan fitur sistem |
| Resepsionis | Melihat reservasi pelanggan serta melakukan konfirmasi check-in dan check-out |
| Customer | Melihat informasi kamar dan melakukan reservasi |

---

## Teknologi yang Digunakan

- React
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel
- GitHub

---

## Arsitektur Sistem

```
User
   │
   ▼
React + Vite
   │
   ▼
Vercel
   │
   ▼
Supabase
├── Authentication
├── PostgreSQL Database
└── Role-Based Access Control (RBAC)
```

---

## Cara Menjalankan Project

1. Clone repository.

```bash
git clone https://github.com/Annisadwi31/stayease-hotel-booking.git
```

2. Masuk ke folder project.

```bash
cd stayease-hotel-booking
```

3. Install seluruh dependency.

```bash
npm install
```

4. Buat file `.env` kemudian tambahkan konfigurasi berikut.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

5. Jalankan aplikasi.

```bash
npm run dev
```

---

## Deployment

Aplikasi telah di-deploy menggunakan Vercel dan dapat diakses melalui:

https://stayease-hotel-booking-eosin.vercel.app

---

## Struktur Project

```
hotel-booking-system/
├── public/
├── src/
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## Pengujian

Pengujian dilakukan terhadap beberapa fungsi utama sistem, antara lain:

- Login dan registrasi pengguna
- Pembatasan hak akses berdasarkan Role-Based Access Control (RBAC)
- Proses reservasi kamar
- Konfirmasi check-in dan check-out
- Deployment aplikasi pada Vercel

Hasil pengujian menunjukkan bahwa seluruh fungsi utama berjalan sesuai dengan kebutuhan sistem.

---

## Pengembang

**Nama Project**

StayEase Hotel Booking System

**Judul**

Penerapan Model Role-Based Access Control (RBAC) pada Web App Berbasis Supabase

---

## Lisensi

Project ini dikembangkan untuk keperluan pembelajaran dan penyelesaian tugas akademik.
