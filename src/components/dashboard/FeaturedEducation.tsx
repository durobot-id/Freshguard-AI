"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import { EDUCATION_ARTICLES } from "@/lib/educationData";

export const FeaturedEducation: React.FC = () => {
  // Select 2 featured articles for homepage
  const featured = EDUCATION_ARTICLES.slice(0, 2);

  return (
    <section aria-labelledby="featured-education-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="featured-education-heading" className="text-base sm:text-lg font-bold text-brand-text">
              Panduan &amp; Edukasi Pangan
            </h2>
            <p className="text-xs text-brand-muted">
              Pencegahan pembusukan dan standar penyimpanan makanan higienis
            </p>
          </div>
        </div>

        <Link
          href="/edukasi"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-dark hover:text-brand-text hover:underline min-h-[44px] px-2 py-1 rounded-xl transition-colors"
        >
          <span>Semua artikel</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featured.map((article) => (
          <Link
            key={article.slug}
            href={`/edukasi/${article.slug}`}
            className="group flex flex-col bg-white rounded-3xl border border-brand-border overflow-hidden hover:border-brand-primary/50 hover:shadow-card transition-all"
          >
            <div className={`relative w-full h-44 overflow-hidden ${article.imageUrl.endsWith('.svg') ? 'bg-slate-950' : 'bg-gray-100'}`}>
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={article.imageUrl.endsWith('.svg') ? "object-contain p-2 group-hover:scale-105 transition-transform duration-300" : "object-cover group-hover:scale-105 transition-transform duration-300"}
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-brand-dark shadow-xs">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs text-brand-muted">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-brand-text group-hover:text-brand-dark transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                  {article.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-dark">
                <span>Baca panduan lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
