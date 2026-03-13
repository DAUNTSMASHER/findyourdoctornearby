"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import type { Article } from "@/lib/articles-data";

export default function ArticleDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/articles/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-stone-50 to-amber-50/30">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
          <p className="mt-4 text-neutral-600">Loading...</p>
        </main>
        <BottomBar />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-neutral-600">Article not found.</p>
          <Link
            href="/articles"
            className="mt-4 inline-block text-teal-600 hover:underline"
          >
            ← Back to Articles
          </Link>
        </main>
        <BottomBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-stone-50 to-amber-50/30">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <Link
          href="/articles"
          className="mb-6 inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700"
        >
          <span>←</span> {t("articles.diseaseGuides")}
        </Link>

        {/* Book-like reading layout */}
        <article className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/95 shadow-xl shadow-stone-200/50">
          <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-8 sm:px-10 sm:py-12">
            <span className="inline-block rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-white">
              {article.disease}
            </span>
            <h1 className="mt-4 font-serif text-2xl font-bold leading-tight text-stone-900 sm:text-3xl md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              {article.summary}
            </p>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-stone-100">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
              priority
            />
          </div>

          <div className="px-6 py-10 sm:px-12 sm:py-14">
            <p className="text-sm font-medium uppercase tracking-wider text-amber-700">
              {t("articles.whatToDo")}
            </p>
            <div className="mt-6 font-serif text-lg leading-[1.9] tracking-wide text-stone-800 sm:text-xl">
              {article.content.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-justify">{para}</p>
              ))}
            </div>
          </div>
        </article>

        <Disclaimer variant="compact" className="mt-8" />

        <div className="mt-8 flex justify-center">
          <Link
            href="/articles"
            className="rounded-xl border border-teal-200 bg-teal-50 px-6 py-3 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100"
          >
            ← Back to all articles
          </Link>
        </div>
      </main>
      <BottomBar />
    </div>
  );
}
