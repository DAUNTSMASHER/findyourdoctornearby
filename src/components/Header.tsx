"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/contexts/LocaleContext";
import { useDisclaimer } from "@/contexts/DisclaimerContext";
import { IconHome, IconArticles, IconTips, IconKnow, IconPill, IconStethoscope, IconInfo } from "@/components/icons/MedicalIcons";
import type { Locale } from "@/lib/i18n/translations";

export function Header() {
  const pathname = usePathname();
  const { t, locale, setLocale, localeLabels } = useTranslation();
  const { openDisclaimer } = useDisclaimer();
  const [showLang, setShowLang] = useState(false);

  const navItems = [
    { href: "/", key: "home", Icon: IconHome },
    { href: "/medicine", key: "medicine", Icon: IconPill },
    { href: "/articles", key: "articles", Icon: IconArticles },
    { href: "/tips", key: "tips", Icon: IconTips },
    { href: "/do-you-know", key: "know", Icon: IconKnow },
  ];

  const locales: Locale[] = ["en", "bn", "hi", "ur"];

  return (
    <header className="sticky top-0 z-20 border-b border-teal-100/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <IconStethoscope className="h-6 w-6 text-teal-500" />
          <span className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-500/80">
              {t("brand.findYour")}
            </span>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-lg font-bold uppercase tracking-tight text-transparent sm:text-xl">
              {t("brand.doctorNearby")}
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openDisclaimer}
          className="flex items-center gap-1.5 rounded-lg border border-amber-200 px-2 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-50"
          title={t("disclaimer.title")}
        >
          <IconInfo className="h-4 w-4" />
          <span className="hidden sm:inline">{t("disclaimer.title")}</span>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="rounded-lg border border-teal-200 px-2 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-50"
          >
            {localeLabels[locale]}
          </button>
          {showLang && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowLang(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setShowLang(false); }}
                    className={`block w-full px-3 py-2 text-left text-sm ${locale === l ? "bg-teal-50 text-teal-700" : "text-neutral-700 hover:bg-neutral-50"}`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map(({ href, key, Icon }) => {
            const isActive = pathname === href;
            const label = t(`nav.${key}`);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                  isActive
                    ? "bg-teal-500 text-white shadow-md shadow-teal-500/25"
                    : "text-neutral-600 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        </div>
      </div>
    </header>
  );
}
