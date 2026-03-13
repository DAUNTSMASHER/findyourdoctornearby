"use client";

import { useState, useEffect } from "react";
import type { Locale } from "./translations";

const STORAGE_KEY = "fybn_locale";

// Map browser/lang to our locales: bn, hi, ur, en
// bn-BD, bn -> bn; hi-IN, hi -> hi; ur-PK, ur -> ur; else -> en
export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && ["en", "bn", "hi", "ur"].includes(stored)) return stored;
  const lang = navigator.language || (navigator.languages && navigator.languages[0]) || "en";
  const code = lang.toLowerCase().split("-")[0];
  if (code === "bn") return "bn";
  if (code === "hi") return "hi";
  if (code === "ur") return "ur";
  return "en";
}

export function saveLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, locale);
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    saveLocale(l);
  };

  return { locale, setLocale };
}
