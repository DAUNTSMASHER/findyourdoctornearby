/**
 * Analytics helpers - use with @vercel/analytics track() for custom events.
 * Requires Vercel Pro/Enterprise for custom events; page views work on free tier.
 */
"use client";

import { track } from "@vercel/analytics";

export function trackSearch(filters: {
  problem?: string;
  country?: string;
  city?: string;
  area?: string;
}) {
  track("Search", filters);
}

export function trackDoctorView(doctorId: string, doctorName: string) {
  track("Doctor View", { id: doctorId, name: doctorName });
}

export function trackCallClick(doctorId: string) {
  track("Call Click", { doctorId });
}

export function trackArticleView(articleId: string, title: string) {
  track("Article View", { id: articleId, title });
}
