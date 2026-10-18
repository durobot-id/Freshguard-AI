"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { DetectionFiltersState } from "@/types/detection";

interface DetectionFiltersProps {
  filters: DetectionFiltersState;
  onChange: (newFilters: DetectionFiltersState) => void;
  uniqueFoodTypes: string[];
  uniqueLabels: string[];
  totalCount: number;
  filteredCount: number;
}

export const DetectionFilters: React.FC<DetectionFiltersProps> = ({
  filters,
  onChange,
  uniqueFoodTypes,
  uniqueLabels,
  totalCount,
  filteredCount,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, searchQuery: e.target.value });
  };

  const handleFoodTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, foodType: e.target.value });
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, label: e.target.value });
  };

  const handleReset = () => {
    onChange({ foodType: "all", label: "all", searchQuery: "" });
  };

  const hasActiveFilters =
    filters.foodType !== "all" ||
    filters.label !== "all" ||
    filters.searchQuery.trim() !== "";

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle space-y-3">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
          <Search className="w-4 h-4" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={handleSearchChange}
          placeholder="Cari berdasarkan tipe makanan atau tanggal..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-brand-bg/60 border border-brand-border text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:bg-white transition-all min-h-[44px]"
          aria-label="Pencarian riwayat deteksi"
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => onChange({ ...filters, searchQuery: "" })}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted hover:text-brand-text min-w-[44px] justify-center"
            aria-label="Hapus kata kunci pencarian"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Select Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 items-center">
        {/* Food Type Select */}
        <div className="relative">
          <select
            value={filters.foodType}
            onChange={handleFoodTypeChange}
            className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg/60 border border-brand-border text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/50 appearance-none min-h-[44px]"
            aria-label="Filter berdasarkan tipe makanan"
          >
            <option value="all">Semua Tipe Makanan</option>
            {uniqueFoodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-muted">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>

        {/* Label Status Select */}
        <div className="relative">
          <select
            value={filters.label}
            onChange={handleLabelChange}
            className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg/60 border border-brand-border text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/50 appearance-none min-h-[44px]"
            aria-label="Filter berdasarkan label hasil"
          >
            <option value="all">Semua Status Label</option>
            {uniqueLabels.map((lbl) => (
              <option key={lbl} value={lbl}>
                {lbl}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-muted">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>

        {/* Counts & Clear Filter Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:col-span-2 lg:col-span-1">
          <span className="text-xs text-brand-muted">
            Menampilkan <strong className="text-brand-text font-semibold">{filteredCount}</strong> dari{" "}
            {totalCount} data
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-brand-dark hover:underline flex items-center gap-1 min-h-[44px] px-2 py-1"
            >
              <X className="w-3 h-3" aria-hidden="true" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
