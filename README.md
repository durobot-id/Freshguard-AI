# FRESHGUARD AI — Website Pemantauan Kesegaran Makanan

> Website responsif mobile-first untuk pemantauan hasil deteksi kesegaran makanan berbasis sensor pH, sensor gas VOC, mikrokontroler ESP32-S3, model AI Random Forest, dan Firebase Realtime Database.

---

## 🥗 Ringkasan Produk

**FRESHGUARD AI** membantu pengguna melihat hasil deteksi kesegaran makanan terbaru dan riwayat pembacaan sensor secara otomatis (real-time tanpa tombol refresh), serta mempelajari panduan penyimpanan bahan pangan higienis dan pencegahan pembusukan.

- **Platform**: Web Responsif Mobile-First (dioptimalkan untuk ponsel mulai lebar 320px, tablet, dan desktop)
- **Mikrokontroler Hardware**: ESP32-S3
- **Sensor**: Sensor pH, Sensor Gas VOC (MS1100), dan Sensor Gas Sulfur (H₂S)
- **Model Kecerdasan Buatan**: Random Forest (Klasifikasi Segar / Basi)
- **Database**: Database Terkonfigurasi dengan Firebase (Firebase Realtime Database)
- **Laporan Dokumen**: Fitur Preview & Download Laporan Pengujian PDF Otomatis
- **Hosting**: Vercel Ready
- **Bahasa Antarmuka**: Bahasa Indonesia

---

## 🚀 Fitur Utama

1. **Dashboard / Beranda (`/`)**:
   - Status koneksi real-time (**Terhubung**, **Menghubungkan**, **Koneksi terputus**).
   - **Kartu Deteksi Terbaru** sebagai fokus utama:
     - Tanggal dan jam digabung (format ramah pengguna hasil parsing key `ddMMyyyyHHmm`, misal `19 Okt 2026, 12.30`).
     - Status label hasil klasifikasi model AI (misal `Segar` / `Basi`).
     - Tipe makanan dinamis (`Nasi`, `Lauk Kering`, dll.).
     - Parameter numerik kadar keasaman (pH) dan konsentrasi senyawa volatil (VOC).
   - **Cuplikan Riwayat Terbaru**: Daftar pembacaan individual secara vertikal (tanpa kurva tren/grafik).
   - **Kartu Edukasi Pilihan**: Cuplikan panduan penyimpanan dengan foto berkualitas tinggi.

2. **Riwayat Deteksi (`/riwayat`)**:
   - Daftar record kronologis dari terbaru ke terlama.
   - Filter dinamis berdasarkan **Tipe Makanan** (otomatis mendeteksi tipe baru dari Firebase).
   - Filter berdasarkan **Status Label**.
   - Fitur pencarian kata kunci berdasarkan tipe makanan atau tanggal.
   - Paginasi rapi dengan target sentuh mobile minimal 44x44 px.
   - Dialog & sheet inspeksi cepat tanpa meninggalkan konteks halaman.
   - Banner notifikasi data baru saat ada pembacaan sensor masuk secara real-time.

3. **Detail Record (`/riwayat/[id]`)**:
   - Tampilan rincian pembacaan sensor spesifik dengan URL yang dapat dibagikan / direct link.
   - Metadata teknis record key Firebase.

4. **Pusat Edukasi Keamanan Pangan (`/edukasi` & `/edukasi/[slug]`)**:
   - 5 materi edukasi komprehensif:
     1. *Memahami Hasil Sensor pH, VOC, dan Alat FRESHGUARD AI* (dilengkapi pembahasan ESP32-S3 dan model AI Random Forest)
     2. *Tanda-Tanda Makanan Mulai Basi*
     3. *Cara Menyimpan Makanan Matang dengan Benar*
     4. *Berapa Lama Sisa Makanan Dapat Disimpan?*
     5. *Mengapa Makanan Bisa Basi?*
   - Dilengkapi foto relevan, teks alternatif (*alt text*), estimasi waktu baca, poin kunci, langkah praktis, dan referensi ilmiah tepercaya.

5. **Tentang FRESHGUARD AI (`/tentang`)**:
   - **Tujuan FRESHGUARD AI**: Menyediakan monitoring kesegaran makanan otomatis, akurat, dan real-time.
   - **Cara Kerja Alat FRESHGUARD AI**: Pengambilan data sensor pH dan VOC oleh ESP32-S3, inferensi model Machine Learning Random Forest untuk menentukan makanan segar atau basi.
   - **Database Terkonfigurasi dengan Firebase**: Sinkronisasi data real-time ke cloud dan antarmuka web.

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
