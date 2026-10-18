"use client";

import React, { use } from "react";
import Link from "next/link";
import { useDetections } from "@/context/DetectionContext";
import { parseRecordKey } from "@/lib/dateUtils";
import { FoodSafetyDisclaimer } from "@/components/common/FoodSafetyDisclaimer";
import {
  ArrowLeft,
  Calendar,
  Utensils,
  Activity,
  Gauge,
  Hash,
  Clock,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface RecordDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function RecordDetailPage({ params }: RecordDetailPageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { getRecordById, isLoading } = useDetections();

  const record = getRecordById(id);

  // If loading and not found yet
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-64 bg-white rounded-3xl border border-brand-border animate-pulse"></div>
      </div>
    );
  }

  // If record not found, parse the key anyway to show what we can
  const fallbackDateInfo = parseRecordKey(id);

  const displayRecord = record || {
    id,
    label: "—",
    ph: null,
    foodType: "—",
    voc: null,
    timestamp: fallbackDateInfo.timestamp,
    formattedDateTime: fallbackDateInfo.formatted,
    isTimestampValid: fallbackDateInfo.isValid,
    receivedAt: Date.now(),
  };

  const isFresh = displayRecord.label.toLowerCase().includes("segar");
  const isStale =
    displayRecord.label.toLowerCase().includes("basi") ||
    displayRecord.label.toLowerCase().includes("rusak");

  let labelBg = "bg-brand-pale text-brand-dark border-brand-primary/40";
  if (isStale) labelBg = "bg-red-50 text-red-700 border-red-200";
  else if (!isFresh && displayRecord.label !== "—")
    labelBg = "bg-amber-50 text-amber-800 border-amber-200";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/riwayat"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-dark hover:text-brand-text min-h-[44px] px-3 py-2 rounded-xl bg-white border border-brand-border hover:bg-brand-bg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Riwayat</span>
        </Link>
      </div>

      {/* Main Detail Card */}
      <article
        aria-labelledby="record-title"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-6"
      >
        {/* Header */}
        <div className="border-b border-brand-border pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <Clock className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
              <span>Detail Catatan Uji Sensor</span>
            </div>
            <h1 id="record-title" className="text-2xl sm:text-3xl font-extrabold text-brand-text">
              {displayRecord.foodType}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-2xl text-lg sm:text-xl font-black border ${labelBg}`}
            >
              {displayRecord.label}
            </span>
          </div>
        </div>

        {/* Timestamp combined row */}
        <div className="p-4 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
          <span className="text-brand-muted font-medium">Waktu Deteksi:</span>
          <div className="inline-flex items-center gap-2 font-bold text-brand-text">
            <Calendar className="w-4 h-4 text-brand-dark" aria-hidden="true" />
            <time>{displayRecord.formattedDateTime}</time>
          </div>
        </div>

        {/* Measurements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* pH */}
          <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-brand-muted">
              <span>Tingkat Keasaman (pH)</span>
              <Activity className="w-4 h-4 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="text-3xl font-black text-brand-text">
              {displayRecord.ph !== null ? displayRecord.ph.toFixed(1) : "—"}
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              {displayRecord.ph !== null
                ? displayRecord.ph < 7
                  ? "Parameter menunjukkan sifat asam pada sampel makanan."
                  : displayRecord.ph > 7
                  ? "Parameter menunjukkan sifat basa pada sampel makanan."
                  : "Parameter berada pada nilai netral."
                : "Nilai pH tidak tersedia atau tidak terdefinisi."}
            </p>
          </div>

          {/* VOC */}
          <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-brand-muted">
              <span>Senyawa Volatil (VOC)</span>
              <Gauge className="w-4 h-4 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="text-3xl font-black text-brand-text">
              {displayRecord.voc !== null ? displayRecord.voc : "—"}
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              {displayRecord.voc !== null
                ? "Nilai pembacaan mentah dari sensor gas pendeteksi penguapan organik."
                : "Nilai VOC tidak tersedia atau tidak terdefinisi."}
            </p>
          </div>
        </div>

        {/* Technical Metadata Box */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
              <span>Firebase Key (Record ID):</span>
            </span>
            <span className="font-mono font-bold text-gray-900">{displayRecord.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Validitas Pola Key:</span>
            <span className="font-medium text-gray-800">
              {displayRecord.isTimestampValid ? "Format valid (ddMMyyyyHHmm)" : "Format tidak sesuai pola"}
            </span>
          </div>
        </div>

        {/* Food safety disclaimer */}
        <FoodSafetyDisclaimer />
      </article>
    </div>
  );
}
