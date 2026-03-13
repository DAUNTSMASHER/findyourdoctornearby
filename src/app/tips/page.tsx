"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { WebResultsSection } from "@/components/WebResultsSection";
import { IconTips } from "@/components/icons/MedicalIcons";
import { sampleTips, tipCategories, type Tip } from "@/lib/tips-data";

export default function TipsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [tips, setTips] = useState<Tip[]>(sampleTips);
  const [webResults, setWebResults] = useState<{ title: string; url: string; snippet: string }[]>([]);

  useEffect(() => {
    const q = search.trim();
    const t = setTimeout(() => {
      fetch(`/api/tips?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => {
          setTips(data.tips ?? sampleTips);
          setWebResults(data.webResults ?? []);
        })
        .catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const filteredTips = useMemo(() => {
    let result = tips;
    if (filterCategory !== "All") {
      result = result.filter((tip) => tip.category === filterCategory);
    }
    return result;
  }, [tips, filterCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
            <IconTips className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-600 sm:text-3xl">
              {t("tips.title")}
            </h1>
            <p className="mt-1 text-neutral-500">
              {t("tips.subtitle")}
            </p>
          </div>
        </div>
        {/* Search */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("tips.searchPlaceholder")}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <RealTimeInfo
            query={search.trim() ? `${search} health tips` : ""}
          />
        </div>

        {/* Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory("All")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filterCategory === "All"
                ? "bg-teal-500 text-white"
                : "bg-white/80 text-neutral-600 hover:bg-teal-50 hover:text-teal-600"
            }`}
          >
            All
          </button>
          {tipCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filterCategory === cat
                  ? "bg-teal-500 text-white"
                  : "bg-white/80 text-neutral-600 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {webResults.length > 0 && (
          <WebResultsSection results={webResults} className="mt-6" />
        )}

        {/* Top Tips */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-700">
            {t("tips.topTips")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {filteredTips.length > 0 ? (
              filteredTips.map((tip) => <TipCard key={tip.id} tip={tip} />)
            ) : (
              <p className="col-span-2 py-12 text-center text-neutral-500">
                {t("tips.noTipsFound")}
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

function TipCard({ tip }: { tip: Tip }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      onClick={() => setExpanded(!expanded)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/15"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={tip.coverImage}
          alt={tip.title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-teal-500/0 transition-colors duration-300 group-hover:bg-teal-500/25" />
        <span className="absolute left-3 top-3 rounded-full bg-teal-500/90 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {tip.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-800 group-hover:text-teal-700">{tip.title}</h3>
        <p className="mt-1.5 text-sm text-neutral-600">{tip.summary}</p>
        {expanded && (
          <p className="mt-3 border-t border-neutral-100 pt-3 text-sm text-neutral-600">
            {tip.content}
          </p>
        )}
        <p className="mt-2 text-xs text-teal-600">
          {expanded ? "Tap to collapse" : "Tap to read more"}
        </p>
      </div>
    </article>
  );
}
