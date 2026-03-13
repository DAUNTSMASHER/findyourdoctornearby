"use client";

import { useTranslation } from "@/contexts/LocaleContext";

interface WebResult {
  title: string;
  url: string;
  snippet: string;
}

interface WebResultsSectionProps {
  results: WebResult[];
  className?: string;
  titleKey?: string;
}

export function WebResultsSection({
  results,
  className = "",
  titleKey = "crawl.realTimeInfo",
}: WebResultsSectionProps) {
  const { t } = useTranslation();
  if (!results?.length) return null;

  return (
    <div className={`rounded-xl border border-neutral-200 bg-white p-4 shadow-sm ${className}`.trim()}>
      <h4 className="mb-3 text-sm font-semibold text-teal-700">
        {t(titleKey)}
      </h4>
      <ul className="space-y-3">
        {results.map((r, i) => (
          <li
            key={i}
            className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0"
          >
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
    </div>
  );
}
