import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Database,
  Layers,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { FoodSafetyDisclaimer } from "@/components/common/FoodSafetyDisclaimer";

export const metadata: Metadata = {
  title: "Tentang FRESHGUARD AI — Pemantauan Deteksi Kesegaran Makanan",
  description:
    "Pelajari tujuan proyek FRESHGUARD AI, integrasi sensor IoT, skema data Firebase Realtime Database, dan batasan operasionalnya.",
};

export default function TentangPage() {
  const fields = [
    {
      name: "Key record",
      type: "String (ddMMyyyyHHmm)",
      desc: "Menyimpan identitas unik dan waktu pembacaan perangkat (misal: 191020261230 berarti 19 Oktober 2026 pukul 12.30 WIB).",
    },
    {
      name: "Label",
      type: "String",
      desc: "Status klasifikasi hasil deteksi sensor, disajikan persis sesuai nilai yang diterima (misalnya 'Segar').",
    },
    {
      name: "Tipe_makanan",
      type: "String",
      desc: "Kategori bahan makanan yang diuji (misal: Nasi, Lauk Kering, Lauk Basah, Sayur, Sayur Asam, Kuah, Buah). Sistem bersifat dinamis menerima tipe baru.",
    },
    {
      name: "PH",
      type: "Number",
      desc: "Derajat keasaman atau kebasaan sampel makanan yang diukur oleh probe elektrokimia.",
    },
    {
      name: "VOC",
      type: "Number",
      desc: "Konsentrasi senyawa organik volatil terdeteksi sensor gas MOS. Nilai ditampilkan dalam bentuk angka numerik asli dari perangkat.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <section aria-labelledby="about-title" className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-pale text-brand-dark border border-brand-primary/30">
          <ShieldCheck className="w-4 h-4 text-brand-dark" aria-hidden="true" />
          <span>Informasi Proyek</span>
        </div>
        <h1 id="about-title" className="text-2xl sm:text-4xl font-black text-brand-text tracking-tight">
          Tentang FRESHGUARD AI
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Platform web pemantauan hasil pengujian kesegaran makanan berbasis integrasi mikrokontroler
          sensor dan Firebase Realtime Database yang dirancang khusus untuk kenyamanan mobile.
        </p>
      </section>

      {/* Tujuan Proyek */}
      <section
        aria-labelledby="purpose-heading"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <Cpu className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="purpose-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Tujuan Proyek
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          FRESHGUARD AI dikembangkan untuk menjembatani perangkat keras deteksi kesegaran makanan
          dengan antarmuka pengguna yang bersih, responsif, dan mudah dipahami. Website bertindak
          sebagai layar pemantauan otomatis (real-time monitoring dashboard) yang langsung memperbarui
          data tanpa perlu memuat ulang halaman saat sensor mengirimkan hasil uji terbaru.
        </p>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Selain menyajikan angka dan status teknis, FRESHGUARD AI berkomitmen meningkatkan kesadaran
          masyarakat terhadap praktik penanganan bahan pangan yang higienis melalui modul edukasi
          komprehensif.
        </p>
      </section>

      {/* Skema Field yang Ditampilkan */}
      <section
        aria-labelledby="fields-heading"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <Layers className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="fields-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Ringkasan Field Data Sensor
          </h2>
        </div>
        <p className="text-xs text-brand-muted">
          Berikut adalah atribut data yang disinkronisasikan dari node Firebase Realtime Database:
        </p>

        <div className="divide-y divide-brand-border">
          {fields.map((f, i) => (
            <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-xs">
              <div className="sm:w-40 shrink-0 font-mono font-bold text-brand-dark">
                {f.name}
              </div>
              <div className="text-brand-muted sm:flex-1">
                <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono mr-2 text-gray-700">
                  {f.type}
                </span>
                <span>{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sumber Data & Arsitektur Realtime */}
      <section
        aria-labelledby="architecture-heading"
        className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <Database className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="architecture-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Arsitektur &amp; Sumber Data
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Koneksi data menggunakan WebSocket persisten melalui Firebase Realtime Database SDK resmi.
          Website tidak menggunakan polling berulang atau reload manual, melainkan merespons secara
          reaktif setiap perubahan pada root database node.
        </p>
        <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border font-mono text-[11px] text-brand-muted break-all">
          Host: deteksi-makanan-basi-default-rtdb.asia-southeast1.firebasedatabase.app
        </div>
      </section>

      {/* Batasan Sensor & Keamanan Pangan */}
      <FoodSafetyDisclaimer />

      {/* Link to Education */}
      <div className="p-6 rounded-3xl bg-brand-pale border border-brand-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-brand-dark">Pelajari Lebih Lanjut</h3>
          <p className="text-xs text-brand-muted">
            Kunjungi panduan edukasi untuk tips penyimpanan makanan dan prinsip keamanan pangan.
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
