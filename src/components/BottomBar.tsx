"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/contexts/LocaleContext";
import { IconHome, IconArticles, IconTips, IconKnow, IconPill } from "@/components/icons/MedicalIcons";

export function BottomBar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: "/", key: "home", Icon: IconHome },
    { href: "/medicine", key: "medicine", Icon: IconPill },
    { href: "/articles", key: "articles", Icon: IconArticles },
    { href: "/tips", key: "tips", Icon: IconTips },
    { href: "/do-you-know", key: "know", Icon: IconKnow },
  ];

  return (
    <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-teal-100/80 bg-white/95 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        {navItems.map(({ href, key, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 sm:flex-row sm:gap-2 sm:px-5 sm:text-sm ${
                isActive
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "text-neutral-500 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              {t(`nav.${key}`)}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
