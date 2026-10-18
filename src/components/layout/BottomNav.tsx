"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BookOpen } from "lucide-react";
import { useDetections } from "@/context/DetectionContext";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { hasNewIncoming } = useDetections();

  const navItems = [
    {
      href: "/",
      label: "Beranda",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      href: "/riwayat",
      label: "Riwayat",
      icon: Clock,
      isActive: pathname.startsWith("/riwayat"),
      hasBadge: hasNewIncoming,
    },
    {
      href: "/edukasi",
      label: "Edukasi",
      icon: BookOpen,
      isActive: pathname.startsWith("/edukasi"),
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border px-2 py-1.5 safe-area-bottom"
      aria-label="Navigasi Bawah Ponsel"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 px-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${
                item.isActive
                  ? "text-brand-dark font-semibold"
                  : "text-brand-muted hover:text-brand-text active:scale-95"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    item.isActive ? "scale-110 text-brand-dark" : "text-brand-muted"
                  }`}
                  aria-hidden="true"
                />
                {item.hasBadge && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-dark"></span>
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 ${item.isActive ? "font-bold text-brand-dark" : "font-normal"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
