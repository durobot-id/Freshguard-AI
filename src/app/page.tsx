"use client";

import React from "react";
import { useDetections } from "@/context/DetectionContext";
import { LatestDetectionCard } from "@/components/dashboard/LatestDetectionCard";
import { RecentHistorySnippet } from "@/components/dashboard/RecentHistorySnippet";
import { FeaturedEducation } from "@/components/dashboard/FeaturedEducation";
import { Sparkles, RefreshCw } from "lucide-react";

export default function HomePage() {
  const { latestRecord, records, status, isLoading, lastUpdatedAt } = useDetections();

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Sapaan dan Ringkasan Section */}
      <section aria-labelledby="welcome-heading" className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-pale text-brand-dark border border-brand-primary/30">
          <Sparkles className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
          <span>Sistem Pemantauan Otomatis AI</span>
        </div>
        <h1
          id="welcome-heading"
          className="text-2xl sm:text-4xl font-extrabold text-brand-text tracking-tight"
        >
          Pantau kesegaran makanan.
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed flex items-center gap-2">
          <span>
            Data diperbarui secara otomatis dari Firebase Realtime Database begitu perangkat sensor
            ESP32-S3 menyelesaikan klasifikasi kesegaran makanan.
          </span>
          <RefreshCw className="w-4 h-4 text-brand-primary animate-spin-slow shrink-0 hidden sm:inline" aria-hidden="true" />
        </p>
      </section>

      {/* Kartu Deteksi Terbaru (Fokus Utama) */}
      <LatestDetectionCard
        record={latestRecord}
        status={status}
        isLoading={isLoading}
        lastUpdatedAt={lastUpdatedAt}
      />

      {/* Cuplikan Riwayat Terbaru (Vertikal, No Graphs) */}
      <RecentHistorySnippet records={records} isLoading={isLoading} />

      {/* Kartu Edukasi Pilihan */}
      <FeaturedEducation />
    </div>
  );
}
