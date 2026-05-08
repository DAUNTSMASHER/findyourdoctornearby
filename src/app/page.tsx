"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import { DoctorList } from "@/components/DoctorList";
import { WebResultsSection } from "@/components/WebResultsSection";
import { SearchFilters } from "@/components/SearchFilters";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { AdUnit } from "@/components/AdUnit";
import type { Doctor, SearchFilters as SearchFiltersType, UserLocation } from "@/lib/types";
import { trackSearch } from "@/lib/analytics";

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [locationInfo, setLocationInfo] = useState({ location: "your location", radius: "y" });
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  const [webResults, setWebResults] = useState<{ title: string; url: string; snippet: string }[]>([]);
  const [relaxedSearch, setRelaxedSearch] = useState(false);

  const fetchDoctors = useCallback(
    async (filters?: {
      country?: string;
      city?: string;
      area?: string;
      problem?: string;
      radius?: string;
    }) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters?.country) params.set("country", filters.country);
        if (filters?.city) params.set("city", filters.city);
        if (filters?.area) params.set("area", filters.area);
        if (filters?.problem) params.set("problem", filters.problem);
        if (filters?.radius) {
          const num = parseFloat(filters.radius);
          if (!isNaN(num) && num > 0) params.set("radius", String(num));
        }
        if (userLocation) {
          params.set("lat", String(userLocation.lat));
          params.set("lon", String(userLocation.lon));
        }
        params.set("limit", "100");
        const res = await fetch(`/api/doctors?${params}`);
      if (res.ok) {
        const data = await res.json();
        setDoctors(data.doctors ?? []);
        setFilteredDoctors(data.doctors ?? []);
        setWebResults(data.webResults ?? []);
        setRelaxedSearch(!!data.relaxedSearch);
      } else {
        const { sampleDoctors } = await import("@/lib/data");
        setDoctors(sampleDoctors);
        setFilteredDoctors(sampleDoctors);
        setWebResults([]);
        setRelaxedSearch(false);
      }
    } catch {
      const { sampleDoctors } = await import("@/lib/data");
      setDoctors(sampleDoctors);
      setFilteredDoctors(sampleDoctors);
      setWebResults([]);
      setRelaxedSearch(false);
    } finally {
      setLoading(false);
    }
  },
    [userLocation]
  );

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleSearch = (filters: SearchFiltersType) => {
    trackSearch({
      problem: filters.problem || undefined,
      country: filters.country || undefined,
      city: filters.city || undefined,
      area: filters.area || undefined,
    });
    setLocationInfo({
      location: filters.city || filters.area || filters.country || "your location",
      radius: filters.radius || "y",
    });
    setHasSearched(true);
    void fetchDoctors({
      country: filters.country || undefined,
      city: filters.city || undefined,
      area: filters.area || undefined,
      problem: filters.problem || undefined,
      radius: filters.radius || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
      <Header />
      <main
        className={`mx-auto min-h-screen px-4 py-8 pb-20 transition-all duration-500 sm:px-6 ${
          hasSearched ? "max-w-7xl pt-12 lg:px-8" : "flex max-w-md flex-col items-center justify-center pt-20"
        }`}
      >
        {!hasSearched ? (
          <div className="w-full animate-fade-in space-y-12">
            <SearchFilters
              onSearch={handleSearch}
              resultCount={filteredDoctors.length}
              compact={false}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center overflow-x-auto pb-4 hide-scrollbar">
              <AdUnit 
                id="50bbf212b722a5bb5fd154a5249a5920" 
                format="iframe" 
                height={90} 
                width={728} 
                className="min-w-[728px]"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="min-w-0 animate-pop-in">
                {loading && (
                  <div className="mb-6 space-y-2">
                    <p className="text-sm font-medium text-teal-600">Loading doctors...</p>
                    <LoadingProgressBar />
                  </div>
                )}
                {!loading && (
                  <>
                    <DoctorList
                      doctors={filteredDoctors}
                      userLocation={userLocation}
                      locationPlaceholder={locationInfo.location}
                      radiusPlaceholder={locationInfo.radius}
                      relaxedSearch={relaxedSearch}
                    />
                    
                    <div className="mt-8 flex justify-center">
                      <AdUnit 
                        id="e353dd181d7c01859c2e118023fbd66c" 
                        format="iframe" 
                        height={60} 
                        width={468} 
                        label="Promoted"
                      />
                    </div>

                    {webResults.length > 0 && (
                      <WebResultsSection
                        results={webResults}
                        titleKey="crawl.doctorsFromGoogle"
                        className="mt-6"
                      />
                    )}
                    <Disclaimer variant="compact" className="mt-6" />
                  </>
                )}
              </div>
              <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                <div className="animate-pop-in [animation-delay:100ms]">
                  <SearchFilters
                    onSearch={handleSearch}
                    resultCount={filteredDoctors.length}
                    compact={true}
                  />
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
      <BottomBar />
    </div>
  );
}
