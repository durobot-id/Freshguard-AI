"use client";

import React from "react";
import Link from "next/link";
import { DetectionRecord } from "@/types/detection";
import { Calendar, Utensils, Activity, Gauge, ChevronRight, Hash } from "lucide-react";

interface DetectionCardProps {
  record: DetectionRecord;
  onSelect?: (record: DetectionRecord) => void;
}

export const DetectionCard: React.FC<DetectionCardProps> = ({ record, onSelect }) => {
  const isFresh = record.label.toLowerCase().includes("segar");
  const isStale =
    record.label.toLowerCase().includes("basi") ||
    record.label.toLowerCase().includes("rusak");

  let labelBg = "bg-brand-pale text-brand-dark border-brand-primary/40";
  if (isStale) labelBg = "bg-red-50 text-red-700 border-red-200";
  else if (!isFresh && record.label !== "—")
    labelBg = "bg-amber-50 text-amber-800 border-amber-200";

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(record);
    }
  };

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-brand-border hover:border-brand-primary/50 hover:shadow-card transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        {/* Food Type & Label Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-bg text-brand-dark border border-brand-border flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-brand-text group-hover:text-brand-dark transition-colors">
                {record.foodType}
              </h3>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${labelBg}`}
              >
                {record.label}
              </span>
            </div>
            {/* Combined Date & Time */}
            <div className="flex items-center gap-1.5 text-xs text-brand-muted mt-0.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{record.formattedDateTime}</span>
            </div>
          </div>
        </div>

        {/* Technical Key Badge (Desktop) */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 font-mono text-xs">
          <Hash className="w-3 h-3" aria-hidden="true" />
          <span>{record.id}</span>
        </div>
      </div>

      {/* Sensor Measurements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-3 border-y border-brand-border/60 text-xs">
        {/* pH */}
        <div className="flex items-center gap-2 bg-brand-bg/50 px-3 py-2 rounded-xl">
          <Activity className="w-4 h-4 text-brand-dark shrink-0" aria-hidden="true" />
          <div>
            <span className="text-[11px] text-brand-muted block">pH</span>
            <span className="font-extrabold text-sm text-brand-text">
              {record.ph !== null ? record.ph.toFixed(1) : "—"}
            </span>
          </div>
        </div>

        {/* VOC */}
        <div className="flex items-center gap-2 bg-brand-bg/50 px-3 py-2 rounded-xl">
          <Gauge className="w-4 h-4 text-brand-dark shrink-0" aria-hidden="true" />
          <div>
            <span className="text-[11px] text-brand-muted block">VOC</span>
            <span className="font-extrabold text-sm text-brand-text">
              {record.voc !== null ? record.voc : "—"}
            </span>
          </div>
        </div>

        {/* Mobile Key Display */}
        <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-end gap-2 px-3 py-2 sm:p-0">
          <div className="sm:hidden font-mono text-[11px] text-brand-muted flex items-center gap-1">
            <Hash className="w-3 h-3" aria-hidden="true" />
            <span>{record.id}</span>
          </div>
          <Link
            href={`/riwayat/${record.id}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark hover:underline min-h-[44px] px-2 py-1"
          >
            <span>Lihat Detail</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};
