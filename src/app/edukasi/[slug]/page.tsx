import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getEducationArticleBySlug,
  getRelatedArticles,
  EDUCATION_ARTICLES,
} from "@/lib/educationData";
import {
  ArrowLeft,
  Clock,
  Calendar,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ArrowRight,
  Cpu,
} from "lucide-react";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EDUCATION_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const resolved = await params;
  const article = getEducationArticleBySlug(resolved.slug);
  if (!article) {
    return { title: "Artikel Tidak Ditemukan — FRESHGUARD AI" };
  }
  return {
    title: `${article.title} — FRESHGUARD AI`,
    description: article.shortDescription,
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolved = await params;
  const article = getEducationArticleBySlug(resolved.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      {/* Back to Edukasi */}
      <div>
        <Link
          href="/edukasi"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-dark hover:text-brand-text min-h-[44px] px-3 py-2 rounded-xl bg-white border border-brand-border hover:bg-brand-bg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Pusat Edukasi</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted">
          <span className="px-3 py-1 rounded-full bg-brand-pale text-brand-dark font-bold uppercase tracking-wider text-[10px]">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{article.readTime}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Diperbarui: {article.reviewDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-brand-text leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
          {article.shortDescription}
        </p>
      </header>

      {/* Featured Image with proper alt text and caption */}
      <figure className={`relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden border border-brand-border shadow-card ${article.imageUrl.endsWith('.svg') ? 'bg-slate-950' : 'bg-gray-100'}`}>
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className={article.imageUrl.endsWith('.svg') ? "object-contain p-2" : "object-cover"}
        />
        <figcaption className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-white text-[11px] p-2.5 text-center">
          {article.imageCaption}
        </figcaption>
      </figure>

      {/* Key Takeaways Box */}
      <section
        aria-label="Poin Penting Ringkasan"
        className="p-5 sm:p-6 rounded-3xl bg-brand-pale/70 border border-brand-primary/40 space-y-3"
      >
        <div className="flex items-center gap-2 text-brand-dark font-bold text-sm">
          <BookOpen className="w-4 h-4 text-brand-dark" aria-hidden="true" />
          <span>Poin Kunci yang Perlu Diingat</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-brand-text">
          {article.summaryPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-dark shrink-0 mt-0.5" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Hardware Components Gallery (Dedicated for FRESHGUARD AI Device & Sensors) */}
      {article.hardwareGallery && article.hardwareGallery.length > 0 && (
        <section aria-labelledby="hardware-gallery-heading" className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
              <Cpu className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 id="hardware-gallery-heading" className="text-lg sm:text-xl font-bold text-brand-text">
                Visualisasi Komponen Perangkat Keras
              </h2>
              <p className="text-xs text-brand-muted">
                Sensor pH, sensor gas VOC MS1100, sensor gas Sulfur (H₂S), mikrokontroler ESP32-S3, dan unit alat FRESHGUARD AI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.hardwareGallery.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-subtle hover:border-brand-primary/60 transition-all flex flex-col justify-between"
              >
                <div className="relative w-full h-56 bg-slate-950 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-contain p-2"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-dark text-brand-primary shadow-xs">
                      {item.badge}
                    </span>
                  </div>
                  {item.isUserDevice && (
                    <div className="absolute bottom-2 inset-x-2 bg-black/80 backdrop-blur-xs text-[10px] text-brand-primary px-2.5 py-1.5 rounded-xl text-center font-semibold border border-brand-primary/40">
                      Letakkan foto alat Anda di: public/images/alat-freshguard-ai.jpg
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-brand-text">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Article Content Sections */}
      <div className="prose max-w-none space-y-6 text-sm sm:text-base text-brand-text leading-relaxed">
        <p className="font-normal text-brand-muted">{article.content.intro}</p>

        {article.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-brand-text">
              {section.heading}
            </h2>
            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-brand-muted leading-relaxed">
                {paragraph}
              </p>
            ))}

            {section.callout && (
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 my-4 text-xs sm:text-sm ${
                  section.callout.type === "warning"
                    ? "bg-red-50/70 border-red-200 text-red-950"
                    : "bg-brand-pale/60 border-brand-primary/40 text-brand-dark"
                }`}
              >
                {section.callout.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-brand-dark shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <h4 className="font-bold mb-1">{section.callout.title}</h4>
                  <p className="leading-relaxed">{section.callout.message}</p>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Practical Tips Box */}
        <section className="p-5 sm:p-6 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-3 mt-8">
          <div className="flex items-center gap-2 text-brand-dark font-bold text-base">
            <Lightbulb className="w-5 h-5 text-brand-dark" aria-hidden="true" />
            <span>Langkah &amp; Tips Praktis Sehari-hari</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-brand-muted">
            {article.content.practicalTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-pale text-brand-dark font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed text-brand-text">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* References and Sources */}
      <section
        aria-label="Daftar Referensi Tepercaya"
        className="p-5 rounded-2xl bg-brand-bg border border-brand-border text-xs space-y-3"
      >
        <h3 className="font-bold text-brand-text uppercase tracking-wider text-[11px]">
          Sumber Referensi Tepercaya
        </h3>
        <ul className="space-y-2">
          {article.references.map((ref, idx) => (
            <li key={idx} className="flex items-start gap-2 text-brand-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-dark shrink-0 mt-1.5"></span>
              <div>
                <strong className="text-brand-text font-semibold">{ref.title}</strong> —{" "}
                <span>{ref.organization}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-brand-muted pt-1 italic">
          Tanggal peninjauan konten: {article.reviewDate}. Materi edukasi disusun sebagai informasi
          pendamping dan bukan pengganti instruksi resmi instansi pangan terkait.
        </p>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-4 pt-6 border-t border-brand-border">
          <h3 id="related-heading" className="text-base sm:text-lg font-bold text-brand-text">
            Materi Edukasi Terkait
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/edukasi/${rel.slug}`}
                className="group p-4 rounded-2xl bg-white border border-brand-border hover:border-brand-primary/50 hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-brand-text group-hover:text-brand-dark transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-brand-muted line-clamp-2 mt-1">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="pt-3 flex items-center justify-between text-xs font-bold text-brand-dark mt-2">
                  <span>Baca artikel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
