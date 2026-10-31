"use client";

import React, { useEffect, useState } from "react";
import { DetectionRecord } from "@/types/detection";
import {
  X,
  Calendar,
  Utensils,
  Activity,
  Gauge,
  Flame,
  Info,
  Hash,
  FileText,
  Download,
} from "lucide-react";
import Link from "next/link";
import { ReportModal } from "@/components/report/ReportModal";
import { downloadDetectionPdf } from "@/lib/pdfReportGenerator";

interface RecordDetailModalProps {
  record: DetectionRecord | null;
  onClose: () => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  onClose,
}) => {
  const [showReport, setShowReport] = useState(false);

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
    <>
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

          {/* Sensor Measurements (pH, VOC, Sulfur) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* pH */}
            <div className="bg-white rounded-2xl p-3.5 border border-brand-border shadow-subtle">
              <div className="flex items-center justify-between mb-1 text-xs text-brand-muted">
                <span>Derajat pH</span>
                <Activity className="w-4 h-4 text-brand-dark" aria-hidden="true" />
              </div>
              <div className="text-xl font-extrabold text-brand-text">
                {record.ph !== null ? record.ph.toFixed(1) : "—"}
              </div>
              <p className="text-[10px] text-brand-muted mt-1">Keasaman sampel</p>
            </div>

            {/* VOC */}
            <div className="bg-white rounded-2xl p-3.5 border border-brand-border shadow-subtle">
              <div className="flex items-center justify-between mb-1 text-xs text-brand-muted">
                <span>Gas VOC</span>
                <Gauge className="w-4 h-4 text-brand-dark" aria-hidden="true" />
              </div>
              <div className="text-xl font-extrabold text-brand-text">
                {record.voc !== null ? record.voc : "—"}
              </div>
              <p className="text-[10px] text-brand-muted mt-1">Sensor MS1100</p>
            </div>

            {/* Sulfur */}
            <div className="bg-white rounded-2xl p-3.5 border border-brand-border shadow-subtle">
              <div className="flex items-center justify-between mb-1 text-xs text-brand-muted">
                <span>Gas Sulfur</span>
                <Flame className="w-4 h-4 text-amber-600" aria-hidden="true" />
              </div>
              <div className="text-xl font-extrabold text-brand-text">
                {record.sulfur !== null ? record.sulfur : "—"}
              </div>
              <p className="text-[10px] text-brand-muted mt-1">Dekomposisi</p>
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

          {/* Report Action Buttons */}
          <div className="p-3.5 rounded-2xl bg-brand-pale/60 border border-brand-primary/30 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-dark" aria-hidden="true" />
              <span className="text-xs font-bold text-brand-dark">Laporan Uji PDF</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowReport(true)}
                className="px-3 py-1.5 rounded-xl bg-white border border-brand-border text-xs font-semibold text-brand-dark hover:bg-brand-pale transition-colors shadow-2xs"
              >
                Lihat Laporan
              </button>
              <button
                type="button"
                onClick={() => downloadDetectionPdf(record)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-dark text-white text-xs font-bold hover:bg-brand-text transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Link
              href={`/riwayat/${record.id}`}
              className="text-xs font-semibold text-brand-dark hover:underline flex items-center gap-1 min-h-[44px] px-2 py-2"
            >
              <Info className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Halaman Lengkap</span>
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

      <ReportModal
        record={record}
        isOpen={showReport}
        onClose={() => setShowReport(false)}
      />
    </>
  );
};
