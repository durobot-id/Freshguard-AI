import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang FRESHGUARD AI — Pemantauan Deteksi Kesegaran Makanan",
  description:
    "Pelajari tujuan FRESHGUARD AI, cara kerja sensor ESP32-S3, model AI Random Forest, dan database terkonfigurasi dengan Firebase.",
};

export default function TentangPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <section aria-labelledby="about-title" className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-pale text-brand-dark border border-brand-primary/30">
          <ShieldCheck className="w-4 h-4 text-brand-dark" aria-hidden="true" />
          <span>Informasi FRESHGUARD AI</span>
        </div>
        <h1 id="about-title" className="text-2xl sm:text-4xl font-black text-brand-text tracking-tight">
          Tentang FRESHGUARD AI
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Platform web pemantauan kesegaran makanan cerdas yang mengintegrasikan mikrokontroler
          ESP32-S3, sensor pH dan VOC, model AI Random Forest, serta Firebase Realtime Database.
        </p>
      </section>

      {/* Tujuan FRESHGUARD AI */}
      <section
        aria-labelledby="purpose-heading"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <Cpu className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="purpose-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Tujuan FRESHGUARD AI
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          FRESHGUARD AI bertujuan menyediakan sistem pemantauan kesegaran makanan yang cerdas, cepat,
          dan otomatis bagi pengguna rumah tangga maupun pengelola makanan. Dengan memadukan perangkat
          sensor fisik dan kecerdasan buatan, sistem ini membantu mengidentifikasi status kesegaran
          makanan secara langsung tanpa proses rumit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border space-y-1.5">
            <div className="flex items-center gap-2 text-brand-dark font-bold text-xs">
              <BrainCircuit className="w-4 h-4" aria-hidden="true" />
              <span>Klasifikasi Cerdas AI</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Memproses data pH, gas VOC, dan gas Sulfur melalui model Random Forest untuk menentukan tingkat basi dan kesegaran makanan secara presisi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border space-y-1.5">
            <div className="flex items-center gap-2 text-brand-dark font-bold text-xs">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Pemantauan &amp; Laporan PDF</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Menampilkan hasil deteksi otomatis ke antarmuka web secara real-time serta menyediakan fitur unduh Laporan Pengujian berformat PDF resmi.
            </p>
          </div>
        </div>
      </section>

      {/* Cara Kerja Alat FRESHGUARD AI */}
      <section
        aria-labelledby="device-heading"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <BrainCircuit className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="device-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Cara Kerja Alat FRESHGUARD AI
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Alat FRESHGUARD AI menggunakan mikrokontroler canggih <strong>ESP32-S3</strong> yang terhubung
          dengan probe sensor pH, sensor gas VOC (Volatile Organic Compounds MS1100), dan sensor gas Sulfur (H₂S):
        </p>
        <ol className="space-y-3 text-xs sm:text-sm text-brand-muted list-decimal list-inside leading-relaxed">
          <li>
            <strong className="text-brand-text">Pengambilan Data Tiga Sensor Fisik:</strong> Sensor membaca derajat
            keasaman (pH), konsentrasi senyawa volatil (VOC), dan emisi gas Sulfur (H₂S) dari uap makanan secara simultan.
          </li>
          <li>
            <strong className="text-brand-text">Deteksi Biomarker Pembusukan (Sulfur &amp; VOC):</strong> Gas sulfur
            merupakan indikator paling kuat dari dekomposisi asam amino dan protein oleh bakteri pembusuk yang menyebabkan bau basi khas.
          </li>
          <li>
            <strong className="text-brand-text">Pemrosesan Model AI (Random Forest):</strong> Nilai pH, VOC, dan Sulfur
            diinput ke dalam algoritma Machine Learning <strong>Random Forest</strong> yang telah
            dilatih untuk mengklasifikasikan kondisi makanan apakah berstatus <strong>Segar</strong> atau{" "}
            <strong>Basi</strong>.
          </li>
          <li>
            <strong className="text-brand-text">Pengiriman Otomatis oleh ESP32-S3:</strong> Mikrokontroler
            ESP32-S3 mengirimkan hasil klasifikasi, nilai sensor, tipe makanan, dan waktu pembacaan ke
            Firebase Realtime Database melalui koneksi Wi-Fi.
          </li>
        </ol>
      </section>

      {/* Database Terkonfigurasi dengan Firebase */}
      <section
        aria-labelledby="database-heading"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <Database className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="database-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Database Terkonfigurasi dengan Firebase
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Sistem FRESHGUARD AI terintegrasi langsung dengan <strong>Firebase Realtime Database</strong>.
          Setiap kali ESP32-S3 selesai melakukan inferensi AI dan menyimpan record baru ke database,
          antarmuka website langsung memperbarui data secara reaktif dan instan tanpa perlu memuat ulang
          halaman atau menekan tombol refresh.
        </p>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Koneksi sinkronisasi data ini menjamin seluruh pembacaan riwayat tersimpan rapi dan dapat
          diakses kapan saja dari berbagai perangkat seperti ponsel pintar, tablet, maupun komputer.
        </p>
      </section>

      {/* Link to Education */}
      <div className="p-6 rounded-3xl bg-brand-pale border border-brand-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-brand-dark">Pelajari Lebih Lanjut</h3>
          <p className="text-xs text-brand-muted">
            Kunjungi panduan edukasi untuk tips penyimpanan makanan dan pemahaman cara kerja sensor pH serta VOC.
          </p>
        </div>
        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-xs hover:bg-brand-text transition-colors min-h-[44px] shrink-0 justify-center"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Buka Pusat Edukasi</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
