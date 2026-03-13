"use client";

import { useState } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import { IconSearch, IconSymptomFever } from "@/components/icons/MedicalIcons";
import type { SearchFilters as SearchFiltersType } from "@/lib/types";

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersType) => void;
  resultCount: number;
  compact?: boolean;
}

export function SearchFilters({ onSearch, resultCount, compact = false }: SearchFiltersProps) {
  const { t } = useTranslation();
  const [problem, setProblem] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [radius, setRadius] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ problem, country, city, area, radius });
  };

  return (
    <div className={`rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur sm:p-6 ${compact ? "border border-white/60" : ""}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="problem"
            className="mb-1 flex items-center gap-2 text-sm font-medium text-teal-600"
          >
            <IconSymptomFever className="h-4 w-4" />
            {t("home.problemSymptom")}
          </label>
          <input
            id="problem"
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g. Medicine, Heart, Bone, Skin, Child"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="mb-1 block text-sm font-medium text-teal-600"
          >
            {t("home.country")}
          </label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-sm font-medium text-teal-600"
          >
            {t("home.city")}
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="area"
            className="mb-1 block text-sm font-medium text-teal-600"
          >
            {t("home.area")}
          </label>
          <input
            id="area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="radius"
            className="mb-1 block text-sm font-medium text-teal-600"
          >
            {t("home.radius")}
          </label>
          <input
            id="radius"
            type="text"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            placeholder="Enter radius (miles)"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 font-medium text-white transition-colors hover:bg-teal-600"
        >
          <IconSearch className="h-4 w-4" />
          {t("home.searchNow")}
        </button>
      </form>
      {compact && (
        <p className="mt-4 text-sm text-neutral-500">
          {t("home.foundDoctors", { count: resultCount })}
        </p>
      )}
    </div>
  );
}
