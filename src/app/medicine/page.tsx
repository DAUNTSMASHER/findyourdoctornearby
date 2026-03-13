"use client";

import { useState } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { IconPill } from "@/components/icons/MedicalIcons";
import {
  countriesWithStates,
  findMedicines,
  type Medicine,
} from "@/lib/medicine-data";

export default function MedicinePage() {
  const { t } = useTranslation();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [condition, setCondition] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);
  const [searched, setSearched] = useState(false);

  const states = country ? countriesWithStates[country] ?? [] : [];

  const handleSearch = () => {
    const meds = findMedicines(condition, country, state);
    setResults(meds);
    setSearched(true);
  };

  const handleCountryChange = (c: string) => {
    setCountry(c);
    setState("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
            <IconPill className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-600 sm:text-3xl">
              {t("medicine.title")}
            </h1>
            <p className="mt-1 text-neutral-500">
              {t("medicine.subtitle")}
            </p>
          </div>
        </div>

        <Disclaimer className="mb-6" />
        <div className="rounded-2xl bg-white/90 p-6 shadow-lg">
          <p className="text-lg font-medium text-neutral-700">
            {t("medicine.needMedicineFor")}
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-teal-600">
                {t("home.problemSymptom")}
              </label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t("medicine.conditionPlaceholder")}
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-teal-600">
                {t("home.country")}
              </label>
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="">{t("medicine.selectCountry")}</option>
                {Object.keys(countriesWithStates).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-teal-600">
                {t("medicine.selectState")}
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={!country}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
              >
                <option value="">{t("medicine.selectState")}</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mt-6 w-full rounded-xl bg-teal-500 py-3 font-medium text-white transition-colors hover:bg-teal-600"
          >
            {t("medicine.findMedicine")}
          </button>

          <RealTimeInfo
            query={condition ? `${condition} medicine treatment${country ? ` ${country}` : ""}`.trim() : ""}
            className="mt-6"
          />
        </div>

        {searched && (
          <div className="mt-8 animate-pop-in">
            {results.length > 0 ? (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-neutral-700">
                  {t("medicine.availableIn")} {state}, {country}
                </h2>
                <div className="grid gap-3">
                  {results.map((med) => (
                    <div
                      key={`${med.name}-${med.country}`}
                      className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-neutral-800">
                            {med.name}
                          </h3>
                          <p className="mt-0.5 text-sm capitalize text-neutral-600">
                            {t("medicine.for")} {med.condition}
                          </p>
                          {med.note && (
                            <p className="mt-1 text-sm text-teal-600">
                              {med.note}
                            </p>
                          )}
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                          <IconPill className="h-5 w-5 text-teal-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Disclaimer variant="compact" className="mt-4" />
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-center">
                <p className="font-medium text-amber-800">
                  {t("medicine.noMedicinesFound")} &quot;{condition}&quot; — {state}, {country}
                </p>
                <p className="mt-2 text-sm text-amber-700">
                  {t("medicine.tryConditions")}
                </p>
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-500">
              {t("medicine.tryConditions")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["gastric", "fever", "headache", "cold", "diarrhea"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className="rounded-full bg-white/80 px-4 py-2 text-sm text-neutral-600 shadow-sm transition-colors hover:bg-teal-100 hover:text-teal-700"
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>
      <BottomBar />
    </div>
  );
}
