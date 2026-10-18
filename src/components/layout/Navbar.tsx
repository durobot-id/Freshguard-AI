"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Menu, X, Info, Clock, BookOpen, Home } from "lucide-react";
import { ConnectionBadge } from "@/components/common/ConnectionBadge";
import { useDetections } from "@/context/DetectionContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { status, records } = useDetections();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/riwayat", label: "Riwayat Deteksi", icon: Clock },
    { href: "/edukasi", label: "Edukasi", icon: BookOpen },
    { href: "/tentang", label: "Tentang", icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded-lg py-1 px-1.5 -ml-1.5 transition-opacity hover:opacity-90"
            aria-label="Kembali ke Beranda FRESHGUARD AI"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-dark shadow-sm">
              <ShieldCheck className="w-5 h-5 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-brand-text">
                FRESHGUARD <span className="text-brand-dark">AI</span>
              </span>
              <span className="text-[10px] text-brand-muted -mt-1 font-medium hidden sm:inline">
                Deteksi Kesegaran Makanan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Menu Utama">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-brand-pale text-brand-dark font-semibold shadow-xs"
                      : "text-brand-muted hover:text-brand-text hover:bg-brand-bg"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Connection Status & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ConnectionBadge status={status} />

            {/* Mobile Hamburger Button (min 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-brand-text hover:bg-brand-bg border border-transparent hover:border-brand-border active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden backdrop-blur-xs animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 right-0 w-3/4 max-w-xs h-[calc(100vh-4rem)] bg-white shadow-prominent border-l border-brand-border p-5 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="border-b border-brand-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Menu Aplikasi
                </span>
              </div>
              <nav className="flex flex-col gap-1.5" aria-label="Menu Mobile">
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                        active
                          ? "bg-brand-pale text-brand-dark font-semibold"
                          : "text-brand-text hover:bg-brand-bg"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-brand-dark" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-brand-border space-y-2 text-xs text-brand-muted">
              <div className="flex items-center justify-between">
                <span>Total Data Tersimpan</span>
                <span className="font-semibold text-brand-text">{records.length} record</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
