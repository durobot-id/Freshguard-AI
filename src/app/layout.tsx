import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DetectionProvider } from "@/context/DetectionContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FRESHGUARD AI — Pemantauan Deteksi Kesegaran Makanan",
  description:
    "Website responsif pemantauan hasil deteksi kesegaran makanan real-time dari perangkat sensor dan Firebase Realtime Database.",
  applicationName: "FRESHGUARD AI",
  keywords: [
    "Freshguard AI",
    "Deteksi makanan basi",
    "Sensor pH",
    "Sensor VOC",
    "Firebase Realtime Database",
    "Keamanan pangan",
  ],
  authors: [{ name: "FRESHGUARD AI Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#72D94C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-text antialiased selection:bg-brand-pale selection:text-brand-dark">
        <DetectionProvider>
          <Navbar />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </DetectionProvider>
      </body>
    </html>
  );
}
