"use client";

import { useState } from "react";
import { useTranslation } from "@/contexts/LocaleContext";

interface CrawlResult {
  title: string;
  url: string;
  snippet: string;
}

interface RealTimeInfoProps {
  query: string;
  className?: string;
}

export function RealTimeInfo({ query, className = "" }: RealTimeInfoProps) {
  const { t } = useTranslation();
  const [results, setResults] = useState<CrawlResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch(`/api/crawl?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.hint ?? data.error ?? t("crawl.error"));
        setResults([]);
        return;
      }
      setResults(data.results ?? []);
      if (!(data.results?.length)) {
        setError(data.hint ?? t("crawl.noResults"));
      }
    } catch {
      setError(t("crawl.error"));
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <button
        type="button"
        onClick={fetchInfo}
        disabled={!hasQuery || loading}
        className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50/80 px-4 py-2.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100 hover:border-teal-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
            {t("crawl.loading")}
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t("crawl.getRealTimeInfo")}
          </>
        )}
      </button>

      {results !== null && (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h4 className="mb-3 text-sm font-semibold text-teal-700">
            {t("crawl.realTimeInfo")}
          </h4>
          {results.length === 0 ? (
            <p className="text-sm text-neutral-500">{error ?? t("crawl.noResults")}</p>
          ) : (
            <ul className="space-y-3">
              {results.map((r, i) => (
                <li key={i} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    {r.title}
                  </a>
                  <p className="mt-0.5 line-clamp-3 text-xs text-neutral-600">
                    {r.snippet}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
