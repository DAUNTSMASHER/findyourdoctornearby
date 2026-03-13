"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { WebResultsSection } from "@/components/WebResultsSection";
import { IconKnow } from "@/components/icons/MedicalIcons";
import { type StatItem } from "@/lib/do-you-know-data";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  return n.toLocaleString();
}

export default function DoYouKnowPage() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [period, setPeriod] = useState<"daily" | "monthly" | "yearly">("daily");
  const [result, setResult] = useState<StatItem | null>(null);
  const [webResults, setWebResults] = useState<{ title: string; url: string; snippet: string }[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topicList, setTopicList] = useState<StatItem[]>([]);

  useEffect(() => {
    fetch("/api/stats?list=1")
      .then((res) => res.json())
      .then((data) => {
        const items = data.items ?? [];
        const seen = new Set<string>();
        const unique = items.filter((i: StatItem) => {
          if (seen.has(i.topic)) return false;
          seen.add(i.topic);
          return true;
        });
        setTopicList(unique.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  const handleSearch = async (topicOverride?: string) => {
    const topic = topicOverride ?? input.trim();
    setInput(topicOverride ?? input);
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/stats?topic=${encodeURIComponent(topic)}`);
      const data = await res.json();
      setResult(data.stat ?? null);
      setWebResults(data.webResults ?? []);
    } catch {
      setResult(null);
      setWebResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getValue = (item: StatItem) => {
    if (period === "daily") return item.daily;
    if (period === "monthly") return item.monthly;
    return item.yearly;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
            <IconKnow className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-600 sm:text-3xl">
              {t("doYouKnow.title")}
            </h1>
            <p className="mt-1 text-neutral-500">
              {t("doYouKnow.subtitle")}
            </p>
          </div>
        </div>

        {/* Question + Input */}
        <div className="mt-8 rounded-2xl bg-white/90 p-6 shadow-lg">
          <p className="text-lg font-medium text-neutral-700">
            {t("doYouKnow.question")}
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g. smoking, heart disease, diabetes"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div className="flex gap-2">
              {(["daily", "monthly", "yearly"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    period === p
                      ? "bg-teal-500 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-teal-100 hover:text-teal-700"
                  }`}
                >
                  {t(`doYouKnow.${p}`)}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-teal-500 py-3 font-medium text-white transition-colors hover:bg-teal-600 disabled:opacity-70"
          >
            {loading ? t("crawl.loading") : t("doYouKnow.showStatistics")}
          </button>

          <RealTimeInfo query={input} className="mt-6" />
        </div>

        {/* Result: Hero Card or Stat Table */}
        {searched && (
          <div className="mt-8 animate-pop-in">
            {result ? (
              <>
                {webResults.length > 0 && (
                  <WebResultsSection results={webResults} className="mb-6" />
                )}
                <StatHeroCard
                  item={result}
                  period={period}
                  value={getValue(result)}
                />
                <StatTable item={result} />
              </>
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-center">
                <p className="font-medium text-amber-800">
                  {t("doYouKnow.noMatchFound")} &quot;{input}&quot;
                </p>
                <p className="mt-2 text-sm text-amber-700">
                  Try: smoking, heart disease, diabetes, cancer, stroke, depression, road accidents, malaria
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick topic suggestions */}
        {!searched && (
          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-500">
              Try these topics
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(topicList.length ? topicList : [
                { id: "1", topic: "smoking" },
                { id: "2", topic: "heart disease" },
                { id: "3", topic: "diabetes" },
                { id: "4", topic: "cancer" },
                { id: "5", topic: "stroke" },
                { id: "6", topic: "depression" },
              ]).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setInput(item.topic);
                    handleSearch(item.topic);
                  }}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm text-neutral-600 shadow-sm transition-colors hover:bg-teal-100 hover:text-teal-700"
                >
                  {item.topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <Disclaimer variant="compact" className="mt-8" />
      </main>
      <BottomBar />
    </div>
  );
}

function StatHeroCard({
  item,
  period,
  value,
}: {
  item: StatItem;
  period: string;
  value: number;
}) {
  const formatted = value >= 1000 ? formatNumber(value) : value.toString();
  const periodLabel = period === "daily" ? "per day" : period === "monthly" ? "per month" : "per year";

  return (
    <div className="overflow-hidden rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-500 to-teal-600 p-8 text-white shadow-xl shadow-teal-500/25">
      <p className="text-sm font-medium uppercase tracking-wider text-teal-100">
        {item.label}
      </p>
      <p className="mt-6 text-5xl font-bold tabular-nums tracking-tight sm:text-7xl">
        {formatted}
      </p>
      <p className="mt-1 text-teal-100">{periodLabel} worldwide</p>
      <p className="mt-4 text-sm text-teal-100/90">{item.summary}</p>
    </div>
  );
}

function StatTable({ item }: { item: StatItem }) {
  const rows = [
    { label: "Daily", value: item.daily, key: "daily" },
    { label: "Monthly", value: item.monthly, key: "monthly" },
    { label: "Yearly", value: item.yearly, key: "yearly" },
  ].filter((r) => r.value > 0);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 shadow-lg">
      <div className="border-b border-neutral-200 bg-neutral-50/80 px-4 py-3">
        <h3 className="font-semibold text-neutral-800">
          {item.label} — full breakdown
        </h3>
      </div>
      <div className="divide-y divide-neutral-100">
        {rows.map((row, i) => (
          <div
            key={row.key}
            className={`flex items-center justify-between px-4 py-4 ${
              i % 2 === 1 ? "bg-neutral-50/50" : ""
            }`}
          >
            <span className="font-medium text-neutral-600">{row.label}</span>
            <span className="font-bold tabular-nums text-teal-600">
              {row.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
