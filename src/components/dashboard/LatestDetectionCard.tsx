"use client";

import React from "react";
import Link from "next/link";
import { DetectionRecord, ConnectionStatus } from "@/types/detection";
import {
  Calendar,
  Utensils,
  Activity,
  Gauge,
  Sparkles,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Info,
} from "lucide-react";

interface LatestDetectionCardProps {
  record: DetectionRecord | null;
  status: ConnectionStatus;
  isLoading: boolean;
  lastUpdatedAt: number | null;
}

export const LatestDetectionCard: React.FC<LatestDetectionCardProps> = ({
  record,
  status,
  isLoading,
}) => {
  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card animate-pulse">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-4 mb-8">
          <div className="h-10 w-48 bg-gray-200 rounded-xl"></div>
          <div className="h-5 w-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl p-4"></div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state when no records exist
  if (!record) {
    return (
      <div className="w-full bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-card text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-pale flex items-center justify-center text-brand-dark mb-4">
          <HelpCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-text mb-2">Belum ada hasil deteksi</h3>
        <p className="text-sm text-brand-muted max-w-md mb-6 leading-relaxed">
          Sistem sedang menunggu pengiriman data dari perangkat sensor FRESHGUARD AI. Pastikan
          perangkat telah menyala dan terhubung dengan jaringan internet.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg border border-brand-border text-xs text-brand-muted">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Menunggu pembacaan sensor pertama...</span>
        </div>
      </div>
    );
  }

  // Determine badge styling based on label
  const isFresh = record.label.toLowerCase().includes("segar");
  const isStale =
    record.label.toLowerCase().includes("basi") ||
    record.label.toLowerCase().includes("rusak") ||
    record.label.toLowerCase().includes("tidak");

  let labelBadgeClass = "bg-brand-pale text-brand-dark border-brand-primary/40";
  if (isStale) {
    labelBadgeClass = "bg-red-50 text-red-700 border-red-200";
  } else if (!isFresh && record.label !== "—") {
    labelBadgeClass = "bg-amber-50 text-amber-800 border-amber-200";
  }

  const isDisconnected = status === "disconnected";

  return (
    <section
      aria-labelledby="latest-detection-heading"
      className="relative w-full bg-gradient-to-br from-white via-white to-brand-pale/30 rounded-3xl p-6 sm:p-8 border border-brand-border/80 shadow-prominent overflow-hidden transition-all"
    >
      {/* Top Banner if connection is lost */}
      {isDisconnected && (
        <div className="mb-5 -mt-2 -mx-2 px-4 py-2.5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" aria-hidden="true" />
          <p className="font-medium">
            Koneksi database terputus. Data di bawah merupakan catatan terakhir yang berhasil
            diterima dan mungkin belum diperbarui.
          </p>
        </div>
      )}

      {/* Header Row: "Data Terbaru" Badge + Date/Time */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-brand-border/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-dark text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            <span>Data Terbaru</span>
          </span>
          <span className="text-xs text-brand-muted hidden sm:inline">• Realtime update</span>
        </div>

        {/* Combined Date & Time Element */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-text bg-brand-bg px-3.5 py-1.5 rounded-xl border border-brand-border">
          <Calendar className="w-4 h-4 text-brand-dark shrink-0" aria-hidden="true" />
          <time dateTime={record.timestamp ? new Date(record.timestamp).toISOString() : undefined}>
            {record.formattedDateTime}
          </time>
        </div>
      </div>

      {/* Primary Highlights: Label & Food Type */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted block mb-1">
            Status Hasil Deteksi
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-2xl text-xl sm:text-2xl font-black border ${labelBadgeClass} shadow-xs`}
            >
              {record.label}
            </span>
            <span className="text-xs text-brand-muted max-w-[200px] leading-tight hidden lg:inline">
              Klasifikasi model AI Random Forest via ESP32-S3
            </span>
          </div>
        </div>

        <div className="sm:text-right">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted block mb-1">
            Tipe Makanan
          </span>
          <div className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-brand-text bg-white px-4 py-2 rounded-2xl border border-brand-border shadow-xs">
            <Utensils className="w-4 h-4 text-brand-dark" aria-hidden="true" />
            <span>{record.foodType}</span>
          </div>
        </div>
      </div>

      {/* Reading Details Grid (pH and VOC values with clean display) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
        {/* pH Card */}
        <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle hover:border-brand-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-brand-muted">Kadar Keasaman (pH)</span>
            <Activity className="w-4 h-4 text-brand-dark" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-text">
              {record.ph !== null ? record.ph.toFixed(1) : "—"}
            </span>
          </div>
          <p className="text-[11px] text-brand-muted mt-1.5">
            {record.ph !== null
              ? record.ph < 6
                ? "Karakteristik asam"
                : record.ph > 7.5
                ? "Karakteristik basa"
                : "Rentang netral"
              : "Nilai tidak valid"}
          </p>
        </div>

        {/* VOC Card */}
        <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle hover:border-brand-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-brand-muted">Senyawa Volatil (VOC)</span>
            <Gauge className="w-4 h-4 text-brand-dark" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-text">
              {record.voc !== null ? record.voc : "—"}
            </span>
          </div>
          <p className="text-[11px] text-brand-muted mt-1.5">
            {record.voc !== null ? "Nilai mentah sensor gas" : "Nilai tidak valid"}
          </p>
        </div>

        {/* ID Record Technical Box */}
        <div className="col-span-2 sm:col-span-1 bg-white/90 rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-brand-muted">ID Perangkat/Key</span>
            <Info className="w-4 h-4 text-brand-dark" aria-hidden="true" />
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-brand-text truncate">
            {record.id}
          </div>
          <p className="text-[11px] text-brand-muted mt-1.5 truncate">
            Format: {record.isTimestampValid ? "ddMMyyyyHHmm valid" : "Non-standar"}
          </p>
        </div>
      </div>

      {/* Footer of Card: Quick Link to Full Record Details */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-border/60 text-xs">
        <span className="text-brand-muted">
          Perubahan pada Firebase akan otomatis memperbarui tampilan ini.
        </span>
        <Link
          href={`/riwayat/${record.id}`}
          className="inline-flex items-center gap-1 font-bold text-brand-dark hover:underline p-1 -m-1 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded"
        >
          <span>Detail Record</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
