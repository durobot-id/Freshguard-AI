"use client";

import React, { useEffect, useState } from "react";
import { DetectionRecord } from "@/types/detection";
import { downloadDetectionPdf, getDetectionPdfBlobUrl } from "@/lib/pdfReportGenerator";
import {
  X,
  Download,
  FileText,
  ExternalLink,
  Printer,
  Sparkles,
  Utensils,
  Calendar,
  Activity,
  Gauge,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface ReportModalProps {
  record: DetectionRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ record, isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !record) return null;

  const handleDownload = () => {
    setIsGenerating(true);
    try {
      downloadDetectionPdf(record);
    } catch (err) {
      console.error("Gagal mendownload PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenPdfTab = () => {
    try {
      const url = getDetectionPdfBlobUrl(record);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Gagal membuka PDF di tab baru:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-prominent border border-brand-border flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-brand-border bg-brand-bg/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-pale text-brand-dark">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 id="report-modal-title" className="font-bold text-base sm:text-lg text-brand-text">
                Laporan Hasil Deteksi FRESHGUARD AI
              </h3>
              <p className="text-xs text-brand-muted">
                Dokumen resmi pengujian sampel makanan berbasis sensor &amp; AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-dark text-white text-xs font-bold hover:bg-brand-text transition-colors shadow-xs"
              title="Download File PDF Laporan"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-brand-muted hover:text-brand-text hover:bg-white transition-colors"
              aria-label="Tutup jendela laporan"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Content / Report Document Paper Preview */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 bg-slate-50/60">
          <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 sm:p-8 space-y-6">
            {/* Kop Laporan */}
            <div className="border-b-2 border-brand-dark pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-brand-dark uppercase">
                  Official Test Report
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-brand-text tracking-tight">
                  FRESHGUARD <span className="text-brand-dark">AI</span>
                </h4>
                <p className="text-xs text-brand-muted">
                  Sistem Pemantauan Kesegaran Pangan Berbasis Sensor ESP32-S3 &amp; Random Forest
                </p>
              </div>

              <div className="sm:text-right text-xs">
                <span className="font-mono font-bold text-brand-dark bg-brand-pale px-2.5 py-1 rounded-lg border border-brand-primary/30">
                  REF: RPT-{record.id}
                </span>
                <p className="text-[11px] text-brand-muted mt-1.5">
                  Waktu Cetak: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            {/* Ringkasan Hasil Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-brand-bg/70 border border-brand-border space-y-2">
                <span className="text-xs font-semibold text-brand-muted flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
                  <span>Sampel Makanan</span>
                </span>
                <div className="text-lg font-bold text-brand-text">{record.foodType}</div>
                <div className="text-xs text-brand-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
                  <span>{record.formattedDateTime}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-bg/70 border border-brand-border space-y-2">
                <span className="text-xs font-semibold text-brand-muted flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
                  <span>Klasifikasi AI Random Forest</span>
                </span>
                <div>
                  <span className={`inline-flex px-3.5 py-1 rounded-full text-base font-black border ${labelBg}`}>
                    {record.label}
                  </span>
                </div>
                <p className="text-[11px] text-brand-muted">
                  {isFresh
                    ? "Sampel terindikasi dalam batas kesegaran prima."
                    : isStale
                    ? "Sampel terindikasi telah mengalami pembusukan."
                    : "Klasifikasi otomatis dari parameter sensor."}
                </p>
              </div>
            </div>

            {/* Tabel Parameter Sensor Lengkap (pH, VOC, Sulfur) */}
            <div>
              <h5 className="font-bold text-sm text-brand-text mb-2.5">
                Data Pengukuran Sensor Fisik
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* pH Card */}
                <div className="p-4 rounded-xl bg-white border border-brand-border shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span>Kadar pH</span>
                    <Activity className="w-4 h-4 text-brand-dark" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-black text-brand-text">
                    {record.ph !== null ? record.ph.toFixed(2) : "—"}
                  </div>
                  <p className="text-[10px] text-brand-muted">
                    {record.ph !== null
                      ? record.ph < 6.5
                        ? "Karakteristik Asam"
                        : record.ph > 7.5
                        ? "Karakteristik Basa"
                        : "Karakteristik Netral"
                      : "Tidak tersedia"}
                  </p>
                </div>

                {/* VOC Card */}
                <div className="p-4 rounded-xl bg-white border border-brand-border shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span>Gas VOC (MS1100)</span>
                    <Gauge className="w-4 h-4 text-brand-dark" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-black text-brand-text">
                    {record.voc !== null ? record.voc : "—"}
                  </div>
                  <p className="text-[10px] text-brand-muted">
                    {record.voc !== null ? "Senyawa Organik Volatil" : "Tidak tersedia"}
                  </p>
                </div>

                {/* Sulfur Card */}
                <div className="p-4 rounded-xl bg-white border border-brand-border shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span>Gas Sulfur (H₂S)</span>
                    <Flame className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-black text-brand-text">
                    {record.sulfur !== null ? record.sulfur : "—"}
                  </div>
                  <p className="text-[10px] text-brand-muted">
                    {record.sulfur !== null ? "Indikator Dekomposisi Protein" : "Tidak tersedia"}
                  </p>
                </div>
              </div>
            </div>

            {/* Analisis Teknis Ringkas */}
            <div className="p-4 rounded-xl bg-brand-bg/50 border border-brand-border text-xs space-y-2">
              <h6 className="font-bold text-brand-dark flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-dark" aria-hidden="true" />
                <span>Analisis Komputasi Perangkat</span>
              </h6>
              <p className="text-brand-muted leading-relaxed">
                Sensor gas Sulfur dan VOC mendeteksi emisi gas hasil metabolisme mikroba, dipadukan
                dengan nilai keasaman pH. Mikrokontroler ESP32-S3 memasukkan seluruh data tersebut
                ke dalam model Machine Learning Random Forest yang menghasilkan klasifikasi status{" "}
                <strong className="text-brand-text">{record.label}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-brand-border bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPdfTab}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-text hover:bg-brand-bg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-muted" aria-hidden="true" />
              <span>Buka Dokumen PDF</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-text hover:bg-brand-bg transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-brand-muted" aria-hidden="true" />
              <span>Cetak</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-muted hover:text-brand-text hover:bg-brand-bg transition-colors"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-dark text-white text-xs font-bold hover:bg-brand-text transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
