import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { EDUCATION_ARTICLES } from "@/lib/educationData";
import { BookOpen, Clock, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Panduan Edukasi Keamanan Pangan — FRESHGUARD AI",
  description:
    "Pelajari tanda makanan basi, cara penyimpanan makanan matang, durasi simpan sisa makanan, dan cara kerja sensor pH serta VOC.",
};

export default function EdukasiPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section with Relevant Storage Photo */}
      <section
        aria-labelledby="education-hero-title"
        className="relative rounded-3xl overflow-hidden bg-brand-dark text-white p-6 sm:p-12 shadow-prominent"
      >
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1600&q=80"
            alt="Penyimpanan bahan pangan bersih dan higienis di lemari pendingin"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-brand-primary border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            <span>Pusat Edukasi Keamanan Pangan</span>
          </div>

          <h1
            id="education-hero-title"
            className="text-2xl sm:text-4xl font-black tracking-tight leading-tight"
          >
            Memahami Pembusukan &amp; Menjaga Kesegaran Makanan
          </h1>

          <p className="text-xs sm:text-base text-gray-200 leading-relaxed">
            Kumpulan panduan ilmiah praktis seputar penanganan makanan matang, faktor pemicu basi,
            durasi penyimpanan aman di kulkas, serta interpretasi pembacaan sensor pH dan VOC.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-primary" aria-hidden="true" />
              <span>5 Materi Wajib Standar PRD</span>
            </span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-brand-primary" aria-hidden="true" />
              <span>Bersumber dari BPOM, WHO &amp; USDA</span>
            </span>
          </div>
        </div>
      </section>

      {/* Grid of 5 Mandatory Articles */}
      <section aria-labelledby="articles-list-heading" className="space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <h2 id="articles-list-heading" className="text-lg sm:text-xl font-bold text-brand-text">
            Daftar Materi Edukasi ({EDUCATION_ARTICLES.length} Artikel)
          </h2>
          <span className="text-xs text-brand-muted">Disusun untuk kenyamanan baca ponsel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION_ARTICLES.map((article, idx) => (
            <Link
              key={article.slug}
              href={`/edukasi/${article.slug}`}
              className="group flex flex-col bg-white rounded-3xl border border-brand-border overflow-hidden hover:border-brand-primary/50 hover:shadow-card transition-all"
            >
              {/* Cover Image with alt text */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-dark shadow-xs">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-brand-text group-hover:text-brand-dark transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed">
                    {article.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-dark">
                  <span>Pelajari selengkapnya</span>
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
