"use client";

import { useEffect } from "react";
import { useTranslation } from "@/contexts/LocaleContext";

const localeToLang: Record<string, string> = {
  en: "en",
  bn: "bn",
  hi: "hi",
  ur: "ur",
};

export function LocaleSync() {
  const { locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = localeToLang[locale] ?? "en";
    document.documentElement.dir = locale === "ur" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
