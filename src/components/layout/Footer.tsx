"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-brand-border mt-16 pb-20 md:pb-8 pt-10 text-brand-muted text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-dark">
                <ShieldCheck className="w-4 h-4 text-brand-dark" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-brand-text">
                FRESHGUARD <span className="text-brand-dark">AI</span>
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed max-w-md">
              Sistem pemantauan hasil deteksi kesegaran makanan berbasis sensor pH, sensor gas VOC,
              mikrokontroler ESP32-S3, dan model Machine Learning Random Forest yang terhubung dengan
              Firebase Realtime Database.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-semibold text-brand-text uppercase tracking-wider text-[11px]">
              Navigasi Cepat
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-brand-dark transition-colors">
                  Beranda / Dashboard
                </Link>
              </li>
              <li>
                <Link href="/riwayat" className="hover:text-brand-dark transition-colors">
                  Riwayat Deteksi
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="hover:text-brand-dark transition-colors">
                  Materi Edukasi Pangan
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-brand-dark transition-colors">
                  Tentang FRESHGUARD AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Edukasi Populer */}
          <div className="space-y-3">
            <h5 className="font-semibold text-brand-text uppercase tracking-wider text-[11px]">
              Edukasi Pilihan
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/edukasi/memahami-hasil-sensor-ph-dan-voc"
                  className="hover:text-brand-dark transition-colors"
                >
                  Memahami Alat &amp; Sensor
                </Link>
              </li>
              <li>
                <Link
                  href="/edukasi/tanda-tanda-makanan-mulai-basi"
                  className="hover:text-brand-dark transition-colors"
                >
                  Tanda Makanan Mulai Basi
                </Link>
              </li>
              <li>
                <Link
                  href="/edukasi/cara-menyimpan-makanan-matang-dengan-benar"
                  className="hover:text-brand-dark transition-colors"
                >
                  Cara Menyimpan Makanan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>&copy; {new Date().getFullYear()} FRESHGUARD AI. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1.5 text-brand-muted">
            <HeartHandshake className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
            <span>Dibangun untuk keandalan dan edukasi keamanan pangan keluarga</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
