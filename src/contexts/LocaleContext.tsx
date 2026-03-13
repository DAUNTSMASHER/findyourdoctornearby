"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useLocale } from "@/lib/i18n";
import { t as tFn, localeLabels, type Locale } from "@/lib/i18n/translations";
import { LocaleSync } from "@/components/LocaleSync";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  localeLabels: typeof localeLabels;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { locale, setLocale } = useLocale();
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => tFn(locale, key, vars),
    [locale]
  );
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, localeLabels }}>
      <LocaleSync />
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useTranslation must be used within LocaleProvider");
  return ctx;
}
