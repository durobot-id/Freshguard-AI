"use client";

import React from "react";
import Link from "next/link";
import { DetectionRecord } from "@/types/detection";
import { History, ArrowRight, Utensils, Calendar, ChevronRight } from "lucide-react";

interface RecentHistorySnippetProps {
  records: DetectionRecord[];
  isLoading: boolean;
}

export const RecentHistorySnippet: React.FC<RecentHistorySnippetProps> = ({
  records,
  isLoading,
}) => {
  // Take up to 4 recent records for the dashboard snippet
  const recentRecords = records.slice(0, 4);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-card animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded-lg mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recentRecords.length === 0) {
    return null; // Empty state handled by latest card
  }

  return (
    <section aria-labelledby="recent-history-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <History className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="recent-history-heading" className="text-base sm:text-lg font-bold text-brand-text">
              Riwayat Pembacaan Terakhir
            </h2>
            <p className="text-xs text-brand-muted">
              Daftar pembacaan mandiri dari sensor tanpa interpolasi grafik
            </p>
          </div>
        </div>

        <Link
          href="/riwayat"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-dark hover:text-brand-text hover:underline min-h-[44px] px-2 py-1 rounded-xl transition-colors"
        >
          <span>Lihat semua</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {recentRecords.map((item) => {
          const isFresh = item.label.toLowerCase().includes("segar");
          const isStale =
            item.label.toLowerCase().includes("basi") ||
            item.label.toLowerCase().includes("rusak");

          let labelBg = "bg-brand-pale text-brand-dark border-brand-primary/40";
          if (isStale) labelBg = "bg-red-50 text-red-700 border-red-200";
          else if (!isFresh && item.label !== "—")
            labelBg = "bg-amber-50 text-amber-800 border-amber-200";

          return (
            <Link
              key={item.id}
              href={`/riwayat/${item.id}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-brand-border hover:border-brand-primary/50 hover:shadow-subtle transition-all"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-bg text-brand-dark border border-brand-border shrink-0">
                  <Utensils className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm text-brand-text group-hover:text-brand-dark transition-colors">
                      {item.foodType}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${labelBg}`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Calendar className="w-3.5 h-3.5 text-brand-muted" aria-hidden="true" />
                    <span>{item.formattedDateTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-brand-border/40 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-brand-muted">
                    pH:{" "}
                    <strong className="text-brand-text font-semibold">
                      {item.ph !== null ? item.ph.toFixed(1) : "—"}
                    </strong>
                  </span>
                  <span className="text-brand-muted">
                    VOC:{" "}
                    <strong className="text-brand-text font-semibold">
                      {item.voc !== null ? item.voc : "—"}
                    </strong>
                  </span>
                  <span className="text-brand-muted">
                    Sulfur:{" "}
                    <strong className="text-amber-700 font-semibold">
                      {item.sulfur !== null ? item.sulfur : "—"}
                    </strong>
                  </span>
                </div>
                <div className="text-brand-muted group-hover:text-brand-dark group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
