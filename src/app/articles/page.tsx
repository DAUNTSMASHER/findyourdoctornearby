"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { IconArticles } from "@/components/icons/MedicalIcons";
import { sampleArticles, type Article } from "@/lib/articles-data";

const diseaseFilters = [
  "All",
  "Fever",
  "Diarrhea",
  "Hypertension",
  "Diabetes",
  "Migraine",
  "Cold",
  "Stomach Pain",
  "Allergies",
];

export default function ArticlesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterDisease, setFilterDisease] = useState<string>("All");

  const filteredArticles = useMemo(() => {
    let result = sampleArticles;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.disease.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q)
      );
    }
    if (filterDisease !== "All") {
      result = result.filter((a) => a.disease === filterDisease);
    }
    return result;
  }, [search, filterDisease]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
            <IconArticles className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-600 sm:text-3xl">
              {t("articles.title")}
            </h1>
            <p className="mt-1 text-neutral-500">
              {t("articles.subtitle")}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("articles.searchPlaceholder")}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <RealTimeInfo
            query={search.trim() ? `${search} health disease guide` : ""}
          />
        </div>

        {/* Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {diseaseFilters.map((disease) => (
            <button
              key={disease}
              onClick={() => setFilterDisease(disease)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filterDisease === disease
                  ? "bg-teal-500 text-white"
                  : "bg-white/80 text-neutral-600 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              {disease}
            </button>
          ))}
        </div>

        {/* Top Articles */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-700">
            {t("articles.diseaseGuides")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <p className="col-span-2 py-12 text-center text-neutral-500">
                {t("articles.noArticlesFound")}
              </p>
            )}
          </div>
        </section>

        <Disclaimer className="mt-8" />
      </main>
      <BottomBar />
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      onClick={() => setExpanded(!expanded)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/15"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-teal-500/0 transition-colors duration-300 group-hover:bg-teal-500/25" />
        <span className="absolute left-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {article.disease}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-800 group-hover:text-teal-700">{article.title}</h3>
        <p className="mt-1.5 text-sm text-neutral-600">{article.summary}</p>
        {expanded && (
          <div className="mt-3 border-t border-neutral-100 pt-3">
            <p className="text-sm font-medium text-neutral-700">{t("articles.whatToDo")}</p>
            <p className="mt-1 text-sm text-neutral-600">{article.content}</p>
          </div>
        )}
        <p className="mt-2 text-xs text-teal-600">
          {expanded ? t("articles.tapToCollapse") : t("articles.tapToRead")}
        </p>
      </div>
    </article>
  );
}
