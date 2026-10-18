import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-brand-pale text-brand-dark flex items-center justify-center">
        <HelpCircle className="w-8 h-8" aria-hidden="true" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm text-brand-muted max-w-md">
        Halaman yang Anda tuju mungkin telah dipindahkan atau tautan yang Anda buka tidak valid.
      </p>
      <div className="pt-2 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark text-white text-xs sm:text-sm font-bold hover:bg-brand-text transition-colors min-h-[44px]"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Ke Beranda</span>
        </Link>
        <Link
          href="/riwayat"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border bg-white text-xs sm:text-sm font-semibold text-brand-text hover:bg-brand-bg transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Lihat Riwayat</span>
        </Link>
      </div>
    </div>
  );
}
