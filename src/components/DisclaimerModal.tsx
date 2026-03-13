"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "@/contexts/LocaleContext";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl border border-amber-200/80 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-amber-200/80 bg-amber-50/90 px-5 py-4">
          <h2 id="disclaimer-title" className="text-lg font-bold text-amber-900">
            ⚠️ {t("disclaimer.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-amber-700 transition-colors hover:bg-amber-100 hover:text-amber-900"
            aria-label={t("disclaimer.close")}
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-5">
          <p className="text-sm leading-relaxed text-amber-800">
            {t("disclaimer.text")}
          </p>
        </div>
        <div className="border-t border-amber-100 bg-amber-50/50 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-teal-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
          >
            {t("disclaimer.close")}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}
