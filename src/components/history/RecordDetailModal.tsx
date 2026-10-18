"use client";

import React, { useEffect } from "react";
import { DetectionRecord } from "@/types/detection";
import {
  X,
  Calendar,
  Utensils,
  Activity,
  Gauge,
  Info,
  Hash,
} from "lucide-react";
import Link from "next/link";

interface RecordDetailModalProps {
  record: DetectionRecord | null;
  onClose: () => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (record) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [record, onClose]);

  if (!record) return null;

  const isFresh = record.label.toLowerCase().includes("segar");
  const isStale =
    record.label.toLowerCase().includes("basi") ||
    record.label.toLowerCase().includes("rusak");

  let labelBg = "bg-brand-pale text-brand-dark border-brand-primary/40";
  if (isStale) labelBg = "bg-red-50 text-red-700 border-red-200";
  else if (!isFresh && record.label !== "—")
    labelBg = "bg-amber-50 text-amber-800 border-amber-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-record-title"
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-prominent border border-brand-border space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-pale text-brand-dark">
              <Utensils className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                Detail Pembacaan Sensor
              </span>
              <h3 id="modal-record-title" className="text-lg font-bold text-brand-text">
                {record.foodType}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-bg transition-colors"
            aria-label="Tutup jendela detail"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Status and Timestamp */}
        <div className="bg-brand-bg/70 rounded-2xl p-4 border border-brand-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-muted">Status Klasifikasi:</span>
            <span className={`text-sm font-extrabold px-3 py-1 rounded-full border ${labelBg}`}>
              {record.label}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-muted">Waktu Pembacaan:</span>
            <div className="inline-flex items-center gap-1.5 font-semibold text-brand-text">
              <Calendar className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
              <span>{record.formattedDateTime}</span>
            </div>
          </div>
        </div>

        {/* Sensor Measurements */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-subtle">
            <div className="flex items-center justify-between mb-1 text-xs text-brand-muted">
              <span>Derajat Keasaman</span>
              <Activity className="w-4 h-4 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="text-2xl font-extrabold text-brand-text">
              {record.ph !== null ? record.ph.toFixed(1) : "—"}
            </div>
            <p className="text-[11px] text-brand-muted mt-1">Nilai pH terukur</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-subtle">
            <div className="flex items-center justify-between mb-1 text-xs text-brand-muted">
              <span>Senyawa Volatil</span>
              <Gauge className="w-4 h-4 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="text-2xl font-extrabold text-brand-text">
              {record.voc !== null ? record.voc : "—"}
            </div>
            <p className="text-[11px] text-brand-muted mt-1">Nilai VOC mentah</p>
          </div>
        </div>

        {/* Technical Key info */}
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-gray-500" aria-hidden="true" />
            <span className="font-medium">Firebase Record ID:</span>
          </div>
          <span className="font-mono font-bold">{record.id}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href={`/riwayat/${record.id}`}
            className="text-xs font-semibold text-brand-dark hover:underline flex items-center gap-1 min-h-[44px] px-3 py-2"
          >
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Buka Halaman Lengkap</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-brand-dark text-white text-xs font-bold hover:bg-brand-text transition-colors min-h-[44px]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
