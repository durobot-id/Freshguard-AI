"use client";

import React from "react";
import { ConnectionStatus } from "@/types/detection";
import { Radio, RefreshCw, AlertTriangle } from "lucide-react";

interface ConnectionBadgeProps {
  status: ConnectionStatus;
  showIcon?: boolean;
  className?: string;
}

export const ConnectionBadge: React.FC<ConnectionBadgeProps> = ({
  status,
  showIcon = true,
  className = "",
}) => {
  if (status === "connected") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-pale text-brand-dark border border-brand-primary/30 transition-colors ${className}`}
        role="status"
        aria-label="Status koneksi: Terhubung"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-dark"></span>
        </span>
        {showIcon && <Radio className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />}
        <span>Terhubung</span>
      </div>
    );
  }

  if (status === "connecting") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 transition-colors ${className}`}
        role="status"
        aria-label="Status koneksi: Menghubungkan"
      >
        <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin" aria-hidden="true" />
        <span>Menghubungkan</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-800 border border-red-200 transition-colors ${className}`}
      role="status"
      aria-label="Status koneksi: Koneksi terputus"
    >
      <AlertTriangle className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
      <span>Koneksi terputus</span>
    </div>
  );
};
