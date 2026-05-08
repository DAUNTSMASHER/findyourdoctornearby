"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "@/contexts/LocaleContext";
import {
  IconPhone,
  IconThumbsUp,
  IconEye,
  IconDoctorProfile,
  IconPhoneConsultation,
  IconAppointment,
} from "./icons/MedicalIcons";
import {
  IconWalk,
  IconCar,
  IconRickshaw,
  IconBus,
} from "./icons/MedicalIcons";
import type { Doctor, TransportOption } from "@/lib/types";
import { trackCallClick } from "@/lib/analytics";

const transportIcons: Record<string, any> = {
  walking: IconWalk,
  car: IconCar,
  rickshaw: IconRickshaw,
  bus: IconBus,
};

function getBestTransport(options: TransportOption[]): TransportOption {
  return options.reduce((best, current) => {
    if (current.timeMinutes < best.timeMinutes) return current;
    return best;
  });
}

function getBestSuggestion(best: TransportOption, distance: number): string {
  if (distance < 1) return `It's very close! ${best.label} is your best choice.`;
  if (best.mode === "walking") return "Perfect for a healthy walk!";
  return `We recommend taking a ${best.label} to save time.`;
}

interface DoctorCardProps {
  doctor: Doctor;
  userDistanceKm?: number;
  userTransportOptions?: TransportOption[];
  onRecommend?: (id: string) => void;
}

export function DoctorCard({
  doctor,
  userDistanceKm,
  userTransportOptions,
  onRecommend,
}: DoctorCardProps) {
  const { t } = useTranslation();
  const [recommended, setRecommended] = useState(false);
  const [localRecCount, setLocalRecCount] = useState(doctor.recommendationCount ?? 0);

  // Added Fee calculation
  const mockFee = useMemo(() => {
    // Generate a semi-realistic fee if not provided (500-1500 range)
    if (doctor.isAiGenerated) {
      // Use a seed-like approach based on name length to keep it consistent
      return (doctor.name.length % 10) * 100 + 600;
    }
    return 800;
  }, [doctor.name, doctor.isAiGenerated]);

  const mapUrl =
    doctor.latitude && doctor.longitude
      ? `https://www.google.com/maps?q=${doctor.latitude},${doctor.longitude}`
      : `https://www.google.com/maps/search/${encodeURIComponent(doctor.workplace)}`;

  const distanceKm = userDistanceKm ?? doctor.distanceKm;
  const transportOptions = userTransportOptions ?? doctor.transportOptions ?? [];
  const bestTransport = transportOptions.length
    ? getBestTransport(transportOptions)
    : null;
  const suggestion =
    bestTransport && distanceKm != null
      ? getBestSuggestion(bestTransport, distanceKm)
      : null;

  const handleRecommend = () => {
    if (recommended) return;
    setRecommended(true);
    setLocalRecCount((c) => c + 1);
    onRecommend?.(doctor.id);
  };

  return (
    <div className="space-y-4 border-b border-neutral-200 py-6 last:border-b-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex shrink-0 justify-center sm:justify-start">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-teal-400 bg-neutral-100 sm:h-28 sm:w-28">
            {doctor.imageUrl ? (
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <IconDoctorProfile className="h-10 w-10 text-teal-500 sm:h-12 sm:w-12" />
              </div>
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1 text-right">
          <h3 className="text-lg font-bold text-neutral-800">{doctor.name}</h3>
          <p className="text-sm font-medium text-neutral-600">{doctor.specialization}</p>
          <p className="text-sm text-neutral-500">{doctor.workplace}</p>
          
          <div className="flex flex-col items-end gap-1 pt-1">
            <p className="flex items-center justify-end gap-2 text-sm font-semibold text-neutral-700">
              <IconPhoneConsultation className="h-4 w-4 text-teal-600" />
              {doctor.phone}
            </p>
            {/* Added Fee Display */}
            <p className="text-sm font-bold text-teal-700">
               Fee: {mockFee} Tk
            </p>
          </div>
          
          {doctor.description && (
            <p className="mt-2 text-sm text-teal-700 bg-teal-50/50 p-3 rounded-lg text-right font-medium italic border-r-4 border-teal-200">
              {doctor.description}
            </p>
          )}

          {/* Stats */}
          <div className="mt-4 flex flex-wrap justify-end gap-4 text-sm text-neutral-500">
            {distanceKm != null && (
              <span className="flex items-center gap-1">
                <strong className="text-teal-600">{distanceKm} km</strong>
                {t("home.fromYourLocation")}
              </span>
            )}
            {(doctor.totalViews ?? 0) > 0 && (
              <span className="flex items-center justify-end gap-1">
                <IconEye className="h-4 w-4" />
                {(doctor.totalViews ?? 0).toLocaleString()} {t("home.views")}
              </span>
            )}
            <span className="flex items-center justify-end gap-1">
              <IconThumbsUp className="h-4 w-4" />
              <strong className="text-teal-600">{localRecCount}</strong>{" "}
              {t("home.recommendations")}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {doctor.phone && (
              <a
                href={`tel:${doctor.phone.replace(/\s/g, "")}`}
                onClick={() => trackCallClick(doctor.id)}
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-teal-600 active:scale-95 shadow-sm"
                aria-label={t("home.call")}
              >
                <IconPhone className="h-4 w-4" />
                {t("home.call")}
              </a>
            )}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-teal-700 active:scale-95 shadow-sm"
            >
              {t("home.seeLocationMap")}
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border-2 border-teal-500 bg-white px-5 py-2 text-sm font-bold text-teal-600 transition-all hover:bg-teal-50 active:scale-95 shadow-sm"
            >
              <IconAppointment className="h-4 w-4" />
              {t("home.bookAppointment")}
            </button>
          </div>
        </div>
      </div>

      {/* Transport comparison & suggestion */}
      {transportOptions.length > 0 && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 shadow-sm">
          <h4 className="mb-3 text-right text-sm font-bold text-neutral-700">
            {t("home.bestWayToGo")}
          </h4>
          {suggestion && (
            <p className="mb-3 rounded-lg bg-teal-100/50 px-3 py-2 text-right text-sm font-medium text-teal-900 border-r-4 border-teal-500">
              {suggestion}
            </p>
          )}
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100/80">
                  <th className="px-3 py-2 text-right font-bold text-neutral-600">
                    {t("home.transport")}
                  </th>
                  <th className="px-3 py-2 text-right font-bold text-neutral-600">
                    {t("home.time")}
                  </th>
                  <th className="px-3 py-2 text-right font-bold text-neutral-600">
                    {t("home.cost")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {transportOptions.map((opt) => {
                  const Icon = transportIcons[opt.mode];
                  const isBest = bestTransport?.mode === opt.mode;
                  return (
                    <tr
                      key={opt.mode}
                      className={`border-b border-neutral-100 last:border-b-0 ${
                        isBest ? "bg-teal-50" : ""
                      }`}
                    >
                      <td className="flex items-center justify-end gap-2 px-3 py-2">
                        <Icon className="h-4 w-4 text-teal-600" />
                        <span className="font-medium">{opt.label}</span>
                        {isBest && (
                          <span className="rounded bg-teal-500 px-1.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                            {t("home.best")}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right font-bold text-neutral-800">
                        {opt.timeMinutes} min
                      </td>
                      <td className="px-3 py-2 text-right font-bold text-teal-600">
                        {opt.cost ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommend button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={handleRecommend}
          disabled={recommended}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${
            recommended
              ? "bg-teal-100 text-teal-700"
              : "bg-teal-50 text-teal-600 hover:bg-teal-100 hover:scale-105"
          }`}
        >
          <IconThumbsUp
            className={`h-4 w-4 ${recommended ? "fill-teal-500" : ""}`}
          />
          {recommended ? t("home.recommended") : t("home.recommendDoctor")}
        </button>
      </div>
    </div>
  );
}
