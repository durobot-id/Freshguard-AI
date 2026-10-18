"use client";

import React from "react";
import { ShieldAlert, ExternalLink } from "lucide-react";
import Link from "next/link";

interface FoodSafetyDisclaimerProps {
  compact?: boolean;
  className?: string;
}

export const FoodSafetyDisclaimer: React.FC<FoodSafetyDisclaimerProps> = ({
  compact = false,
  className = "",
}) => {
  if (compact) {
    return (
      <div
        className={`p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5 ${className}`}
      >
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-950">Catatan Keamanan:</strong> Hasil
          deteksi merupakan pembacaan teknis perangkat sensor dan bukan jaminan mutlak bahwa
          makanan aman dikonsumsi. Selalu gunakan pertimbangan higienitas fisik.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-amber-950 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
          <ShieldAlert className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-semibold text-sm sm:text-base text-amber-950">
            Batasan Hasil Sensor dan Keamanan Pangan
          </h4>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            FRESHGUARD AI menampilkan hasil pembacaan parameter fisik dari perangkat keras yang
            terhubung. Indikator status seperti &quot;Segar&quot; bukan pengganti uji laboratorium
            mikrobiologis resmi dan tidak menjamin ketiadaan bakteri patogen berbahaya.
          </p>
          <div className="pt-1">
            <Link
              href="/edukasi/memahami-hasil-sensor-ph-dan-voc"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark hover:underline"
            >
              <span>Pelajari interpretasi hasil sensor</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
