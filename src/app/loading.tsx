import React from "react";
import { RefreshCw } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
      <RefreshCw className="w-8 h-8 text-brand-dark animate-spin" aria-hidden="true" />
      <span className="text-xs font-semibold text-brand-muted">Memuat antarmuka FRESHGUARD AI...</span>
    </div>
  );
}
