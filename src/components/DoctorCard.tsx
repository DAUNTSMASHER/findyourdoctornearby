"use client";

import { useState } from "react";
import { useTranslation } from "@/contexts/LocaleContext";
import Image from "next/image";
import {
  IconDoctorProfile,
  IconThumbsUp,
  IconEye,
  IconAppointment,
  IconPhoneConsultation,
  IconTelemedicine,
  IconInPerson
} from "@/components/icons/MedicalIcons";
import type { Doctor } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor;
  userDistanceKm?: number | null;
  onRecommend?: (doctorId: string) => void;
}

export function DoctorCard({
  doctor,
  userDistanceKm,
  onRecommend,
}: DoctorCardProps) {
  const { t } = useTranslation();
  const [recommended, setRecommended] = useState(false);
  const [localRecCount, setLocalRecCount] = useState(doctor.recommendationCount ?? 0);

  const distanceKm = userDistanceKm ?? doctor.distanceKm;
  const mockExperience = (doctor.totalViews ?? 5000) % 25 + 5; // Generate realistic mock experience
  const mockFee = ((doctor.recommendationCount ?? 200) % 10 + 5) * 100;

  const handleRecommend = () => {
    if (recommended) return;
    setRecommended(true);
    setLocalRecCount((c) => c + 1);
    onRecommend?.(doctor.id);
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:p-6">
      {/* Profile Image - Square/Rectangle */}
      <div className="shrink-0">
        <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50 sm:h-36 sm:w-36">
          {doctor.imageUrl ? (
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 112px, 144px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <IconDoctorProfile className="h-12 w-12 text-teal-400" />
            </div>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header Row */}
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-neutral-800">{doctor.name}</h3>
            <p className="text-sm font-medium text-neutral-500">{doctor.specialization}</p>
            <p className="inline-flex items-center gap-1 text-sm font-medium text-teal-600">
              <span className="flex h-5 items-center rounded-sm bg-teal-50 px-1.5 font-bold">
                {mockExperience}
              </span>
              Years of Experience Overall
            </p>
          </div>
          
          {/* Badges / Contact top right */}
          <div className="flex shrink-0 flex-col items-end gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
              <IconTelemedicine className="h-3.5 w-3.5" />
              Available for Video Call
            </div>
            {doctor.phone && doctor.phone !== "N/A" && (
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-600">
                <IconPhoneConsultation className="h-4 w-4" />
                {doctor.phone}
              </p>
            )}
          </div>
        </div>

        {/* Chamber Info Grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 rounded-lg bg-neutral-50/50 p-4 sm:grid-cols-2">
          {/* Chamber Name & Location */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-700">
              <IconInPerson className="h-4 w-4 text-teal-600" />
              <strong className="text-sm font-bold">Chamber / Hospital</strong>
            </div>
            <p className="text-sm font-medium text-neutral-800">{doctor.workplace}</p>
            <p className="text-xs text-neutral-500">
              {doctor.area ? `${doctor.area}, ${doctor.city}` : doctor.city}
              {distanceKm != null && ` • ~${distanceKm} km away`}
            </p>
          </div>

          {/* Schedule & Fees */}
          <div className="space-y-1 sm:text-right">
            <p className="text-sm font-bold text-neutral-700">Sat - Thu</p>
            <p className="text-sm text-neutral-600">05:00 PM - 09:00 PM</p>
            <p className="text-sm font-bold text-teal-700">Fee: {mockFee} Tk</p>
          </div>
        </div>

        {/* Footer actions and description */}
        <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <div className="w-full space-y-3 sm:w-auto flex-1">
            {doctor.description && (
              <p className="text-sm leading-relaxed text-neutral-600 italic border-l-2 border-teal-200 pl-3">
                "{doctor.description}"
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
              {(doctor.totalViews ?? 0) > 0 && (
                <span className="flex items-center gap-1">
                  <IconEye className="h-3.5 w-3.5" />
                  {(doctor.totalViews ?? 0).toLocaleString()} Views
                </span>
              )}
              <button
                onClick={handleRecommend}
                disabled={recommended}
                className={`flex items-center gap-1 transition-colors ${
                  recommended ? "text-teal-600 font-medium" : "hover:text-teal-600"
                }`}
              >
                <IconThumbsUp className={`h-3.5 w-3.5 ${recommended ? "fill-teal-500" : ""}`} />
                {localRecCount} Recommend
              </button>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-teal-600 bg-white px-5 py-2.5 text-sm font-bold text-teal-600 shadow-sm transition-colors hover:bg-teal-600 hover:text-white"
            >
              View Profile
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-600"
            >
              <IconAppointment className="h-4 w-4" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
