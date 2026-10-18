"use client";

import React, { useState, useMemo } from "react";
import { useDetections } from "@/context/DetectionContext";
import { DetectionFilters } from "@/components/history/DetectionFilters";
import { DetectionCard } from "@/components/history/DetectionCard";
import { RecordDetailModal } from "@/components/history/RecordDetailModal";
import { DetectionFiltersState, DetectionRecord } from "@/types/detection";
import {
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function RiwayatPage() {
  const {
    records,
    isLoading,
    uniqueFoodTypes,
    uniqueLabels,
    hasNewIncoming,
    clearNewIncomingAlert,
  } = useDetections();

  const [filters, setFilters] = useState<DetectionFiltersState>({
    foodType: "all",
    label: "all",
    searchQuery: "",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRecord, setSelectedRecord] = useState<DetectionRecord | null>(null);

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      // Filter by food type
      if (filters.foodType !== "all" && item.foodType !== filters.foodType) {
        return false;
      }

      // Filter by label
      if (filters.label !== "all" && item.label !== filters.label) {
        return false;
      }

      // Search query (matches food type or date string or id)
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesFood = item.foodType.toLowerCase().includes(query);
        const matchesDate = item.formattedDateTime.toLowerCase().includes(query);
        const matchesLabel = item.label.toLowerCase().includes(query);
        const matchesId = item.id.toLowerCase().includes(query);

        if (!matchesFood && !matchesDate && !matchesLabel && !matchesId) {
          return false;
        }
      }

      return true;
    });
  }, [records, filters]);

  // Reset pagination when filters change
  const handleFilterChange = (newFilters: DetectionFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ITEMS_PER_PAGE));
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Title & Subtitle */}
      <section aria-labelledby="history-heading" className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <Clock className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
            Arsip Pembacaan
          </span>
        </div>
        <h1 id="history-heading" className="text-2xl sm:text-3xl font-extrabold text-brand-text">
          Riwayat Deteksi Kesegaran
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted max-w-2xl leading-relaxed">
          Semua catatan hasil uji sensor yang tersimpan di Firebase Realtime Database. Data disajikan
          secara kronologis dari yang paling baru ke terlama tanpa generalisasi kurva tren.
        </p>
      </section>

      {/* New Data Alert Banner (Live Incoming Record) */}
      {hasNewIncoming && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-pale border border-brand-primary/50 text-brand-dark flex items-center justify-between gap-3 shadow-subtle animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-semibold">
              Data deteksi baru baru saja masuk dari perangkat!
            </p>
          </div>
          <button
            type="button"
            onClick={clearNewIncomingAlert}
            className="px-3 py-1.5 rounded-xl bg-brand-dark text-white text-xs font-bold hover:bg-brand-text transition-colors min-h-[44px]"
          >
            Tandai Dilihat
          </button>
        </div>
      )}

      {/* Filters & Search Component */}
      <DetectionFilters
        filters={filters}
        onChange={handleFilterChange}
        uniqueFoodTypes={uniqueFoodTypes}
        uniqueLabels={uniqueLabels}
        totalCount={records.length}
        filteredCount={filteredRecords.length}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-white rounded-2xl sm:rounded-3xl border border-brand-border animate-pulse p-4"
            ></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredRecords.length === 0 && (
        <div className="text-center py-12 px-4 bg-white rounded-3xl border border-brand-border space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-bg text-brand-muted mx-auto flex items-center justify-center">
            <Inbox className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-base text-brand-text">Tidak ada data yang sesuai</h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            {records.length === 0
              ? "Belum ada record deteksi yang tersimpan pada database Firebase."
              : "Tidak ada record yang cocok dengan filter atau kata kunci pencarian Anda."}
          </p>
        </div>
      )}

      {/* Records List */}
      {!isLoading && filteredRecords.length > 0 && (
        <div className="space-y-3">
          {paginatedRecords.map((record) => (
            <DetectionCard
              key={record.id}
              record={record}
              onSelect={(rec) => setSelectedRecord(rec)}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-border bg-white text-xs sm:text-sm font-semibold text-brand-text disabled:opacity-40 disabled:pointer-events-none hover:bg-brand-bg min-h-[44px]"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs font-semibold text-brand-muted">
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-brand-border bg-white text-xs sm:text-sm font-semibold text-brand-text disabled:opacity-40 disabled:pointer-events-none hover:bg-brand-bg min-h-[44px]"
            aria-label="Halaman berikutnya"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Detail Modal Component */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}
