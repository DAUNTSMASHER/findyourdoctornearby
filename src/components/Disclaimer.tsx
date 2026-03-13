"use client";

import { useTranslation } from "@/contexts/LocaleContext";
import { useDisclaimer } from "@/contexts/DisclaimerContext";

interface DisclaimerProps {
  variant?: "default" | "compact";
  className?: string;
}

export function Disclaimer({ variant = "default", className = "" }: DisclaimerProps) {
  const { t } = useTranslation();
  const { openDisclaimer } = useDisclaimer();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={openDisclaimer}
        className={`block w-full text-center text-xs text-amber-800/90 underline decoration-amber-400/50 underline-offset-2 transition-colors hover:text-amber-900 hover:decoration-amber-500 ${className}`.trim()}
      >
        {t("disclaimer.compact")}
      </button>
    );
  }

  return (
    <div className={`rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 ${className}`.trim()}>
      <p className="text-sm font-medium text-amber-900">
        ⚠️ {t("disclaimer.title")}
      </p>
      <p className="mt-1 text-sm text-amber-800">
        {t("disclaimer.text")}
      </p>
    </div>
  );
}
