"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import { DoctorCard } from "./DoctorCard";
import { IconStethoscope } from "./icons/MedicalIcons";
import { haversineDistance, getTransportFromDistance } from "@/lib/geo";
import type { Doctor, UserLocation } from "@/lib/types";

const DOCTORS_PER_PAGE = 5;

export function DoctorList({
  doctors,
  userLocation = null,
  locationPlaceholder = "your location",
  radiusPlaceholder = "y",
  relaxedSearch = false,
}: {
  doctors: Doctor[];
  userLocation?: UserLocation | null;
  locationPlaceholder?: string;
  radiusPlaceholder?: string;
  relaxedSearch?: boolean;
}) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const doctorsWithUserDistance = useMemo(() => {
    if (!userLocation) return doctors.map((d) => ({ doctor: d, userDistanceKm: d.distanceKm, userTransport: d.transportOptions }));
    return doctors.map((doctor) => {
      if (doctor.latitude != null && doctor.longitude != null) {
        const km = haversineDistance(userLocation.lat, userLocation.lon, doctor.latitude, doctor.longitude);
        return {
          doctor: { ...doctor, distanceKm: km },
          userDistanceKm: km,
          userTransport: getTransportFromDistance(km),
        };
      }
      return {
        doctor,
        userDistanceKm: doctor.distanceKm,
        userTransport: doctor.transportOptions,
      };
    });
  }, [doctors, userLocation]);

  const totalPages = Math.ceil(doctorsWithUserDistance.length / DOCTORS_PER_PAGE);
  const start = (page - 1) * DOCTORS_PER_PAGE;
  const paginatedDoctors = doctorsWithUserDistance.slice(start, start + DOCTORS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [doctors.length, userLocation]);

  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur sm:p-6">
      <div className="flex items-center gap-2">
        <IconStethoscope className="h-6 w-6 text-teal-600" />
        <h2 className="text-xl font-bold text-teal-600 sm:text-2xl">
          {t("home.topDoctors")}
        </h2>
      </div>
      <p className="mb-4 text-sm text-neutral-500">
        {t("home.nearLocation")} {locationPlaceholder} {t("home.withinRadius")} {radiusPlaceholder} {t("home.mile")}
      </p>
      {relaxedSearch && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          No exact matches in your area. Showing doctors from nearby.
        </p>
      )}

      <div className="divide-y divide-neutral-200">
        {paginatedDoctors.length > 0 ? (
          paginatedDoctors.map(({ doctor, userDistanceKm, userTransport }) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              userDistanceKm={userDistanceKm}
              userTransportOptions={userTransport}
            />
          ))
        ) : (
          <p className="py-8 text-center text-neutral-500">
            {t("home.noDoctorsFound")}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg bg-teal-400/60 px-4 py-2 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-teal-500"
          >
            {t("home.previous")}
          </button>
          <span className="text-sm text-neutral-600">
            {t("home.page")} {page} {t("home.of")} {Math.max(1, totalPages)}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg bg-teal-500 px-4 py-2 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-teal-600"
          >
            {t("home.next")}
          </button>
      </div>
    </div>
  );
}
