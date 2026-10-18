# FRESHGUARD AI — Website Pemantauan Kesegaran Makanan

> Website responsif mobile-first untuk pemantauan hasil deteksi kesegaran makanan berbasis perangkat sensor dan Firebase Realtime Database.

---

## 🥗 Ringkasan Produk

**FRESHGUARD AI** membantu pengguna melihat hasil deteksi kesegaran makanan terbaru dan riwayat pembacaan sensor secara otomatis (real-time tanpa tombol refresh), serta mempelajari panduan penyimpanan bahan pangan higienis dan pencegahan pembusukan.

- **Platform**: Web Responsif Mobile-First (dioptimalkan untuk ponsel mulai lebar 320px, tablet, dan desktop)
- **Sumber Data**: Firebase Realtime Database
- **Hosting**: Vercel Ready
- **Bahasa Antarmuka**: Bahasa Indonesia

---

## 🚀 Fitur Utama Sesuai PRD

1. **Dashboard / Beranda (`/`)**:
   - Status koneksi real-time (**Terhubung**, **Menghubungkan**, **Koneksi terputus**).
   - **Kartu Deteksi Terbaru** sebagai fokus utama:
     - Tanggal dan jam digabung (format ramah pengguna hasil parsing key `ddMMyyyyHHmm`, misal `19 Okt 2026, 12.30`).
     - Status label asli dari sensor (misal `Segar`).
     - Tipe makanan dinamis.
     - Parameter pH dan VOC numerik.
   - **Cuplikan Riwayat Terbaru**: Daftar pembacaan individual secara vertikal (tanpa kurva tren/grafik sesuai kaidah PRD).
   - **Kartu Edukasi Pilihan**: Cuplikan panduan penyimpanan dengan foto berkualitas tinggi.
   - Penyangkalan (Disclaimer) keamanan pangan.

2. **Riwayat Deteksi (`/riwayat`)**:
   - Daftar record kronologis dari terbaru ke terlama.
   - Filter dinamis berdasarkan **Tipe Makanan** (menerima tipe makanan baru otomatis).
   - Filter berdasarkan **Status Label**.
   - Fitur pencarian kata kunci berdasarkan tipe makanan atau tanggal.
   - Paginasi rapi dengan target sentuh mobile minimal 44x44 px.
   - Dialog & sheet inspeksi cepat tanpa meninggalkan konteks halaman.
   - Banner notifikasi data baru saat ada pembacaan sensor masuk secara real-time.

3. **Detail Record (`/riwayat/[id]`)**:
   - Tampilan rincian pembacaan sensor spesifik dengan URL yang dapat dibagikan / direct link.
   - Metadata teknis record key Firebase.

4. **Pusat Edukasi Keamanan Pangan (`/edukasi` & `/edukasi/[slug]`)**:
   - 5 materi edukasi lengkap sesuai PRD:
     1. *Tanda-Tanda Makanan Mulai Basi*
     2. *Cara Menyimpan Makanan Matang dengan Benar*
     3. *Berapa Lama Sisa Makanan Dapat Disimpan?*
     4. *Mengapa Makanan Bisa Basi?*
     5. *Memahami Hasil Sensor pH dan VOC*
   - Dilengkapi gambar representatif, teks alternatif (*alt text*), estimasi waktu baca, poin kunci, langkah praktis, referensi resmi (BPOM, WHO, USDA, FAO), tanggal peninjauan, dan disclaimer keamanan pangan.

5. **Tentang FRESHGUARD AI (`/tentang`)**:
   - Latar belakang dan tujuan proyek.
   - Kamus dan spesifikasi teknis field sensor (`Label`, `PH`, `Tipe_makanan`, `VOC`, Key `ddMMyyyyHHmm`).
   - Penjelasan arsitektur integrasi Firebase Realtime Database.

---

## 🎨 Desain dan Identitas Visual

- **Palet Warna**:
  - Hijau Utama: `#72D94C`
  - Hijau Gelap: `#205C36`
  - Hijau Pucat: `#EAF8E3`
  - Latar Utama: `#F7FAF5`
  - Kartu/Permukaan: `#FFFFFF`
  - Teks Utama: `#1D2B21`
  - Teks Sekunder: `#657268`
  - Garis/Border: `#E3EAE1`
  - Aksen Peringatan: `#D97706` (Amber)
  - Aksen Bahaya: `#DC2626` (Merah)
- **Ikon**: Menggunakan Lucide Icons secara konsisten. **Tidak menggunakan emoji atau emotikon sama sekali.**
- **Aksesibilitas**: Target sentuh minimal 44 × 44 px, kontras teks tinggi, navigasi bawah (*Bottom Navigation*) praktis pada perangkat ponsel.

---

## 🛠️ Instalasi & Menjalankan Proyek

### Prasyarat
- Node.js versi 18 ke atas (direkomendasikan v20+)
- npm / yarn / pnpm

### 1. Salin Konfigurasi Lingkungan
Pastikan file `.env.local` telah terkonfigurasi:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyPlaceholderKeyForClientSDK
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=deteksi-makanan-basi.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://deteksi-makanan-basi-default-rtdb.asia-southeast1.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=deteksi-makanan-basi
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=deteksi-makanan-basi.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=279481061054
NEXT_PUBLIC_FIREBASE_APP_ID=1:279481061054:web:dc7444324afda1b00258ef
```

### 2. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada `http://localhost:3000`.

### 3. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🌐 Panduan Deployment ke Vercel

1. Push repositori ini ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com) dan impor repositori.
3. Masukkan variabel lingkungan dari `.env.example` ke bagian **Environment Variables** di Vercel:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. Klik **Deploy**. Vercel akan otomatis mengompilasi dan menyediakan URL HTTPS produksi.

---

## ⚖️ Penyangkalan (Disclaimer)

Website FRESHGUARD AI menampilkan pembacaan eksperimental dari modul sensor terhubung. Status hasil klasifikasi (seperti *Segar*) bukan merupakan sertifikasi laboratorium pangan atau jaminan mutlak bahwa makanan bebas dari bakteri atau racun patogen. Gunakan selalu prinsip kebersihan dan pengamatan fisik sebelum mengonsumsi makanan.
