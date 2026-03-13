"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { BottomBar } from "@/components/BottomBar";
import { Disclaimer } from "@/components/Disclaimer";
import { DoctorList } from "@/components/DoctorList";
import { SearchFilters } from "@/components/SearchFilters";
import type { Doctor, SearchFilters as SearchFiltersType, UserLocation } from "@/lib/types";

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [locationInfo, setLocationInfo] = useState({ location: "your location", radius: "y" });
  const [hasSearched, setHasSearched] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await fetch("/api/doctors");
      if (res.ok) {
        const data = await res.json();
        setDoctors(data.doctors);
        setFilteredDoctors(data.doctors);
      } else {
        const { sampleDoctors } = await import("@/lib/data");
        setDoctors(sampleDoctors);
        setFilteredDoctors(sampleDoctors);
      }
    } catch {
      const { sampleDoctors } = await import("@/lib/data");
      setDoctors(sampleDoctors);
      setFilteredDoctors(sampleDoctors);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleSearch = (filters: SearchFiltersType) => {
    let result = [...doctors];

    if (filters.problem) {
      const problemLower = filters.problem.toLowerCase();
      result = result.filter((d) =>
        d.specialization.toLowerCase().includes(problemLower)
      );
    }
    if (filters.country) {
      result = result.filter((d) =>
        d.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }
    if (filters.city) {
      result = result.filter((d) =>
        d.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.area) {
      result = result.filter((d) =>
        d.area.toLowerCase().includes(filters.area.toLowerCase())
      );
    }

    setFilteredDoctors(result);
    setLocationInfo({
      location: filters.city || filters.area || filters.country || "your location",
      radius: filters.radius || "y",
    });
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/50">
      <Header />
      <main
        className={`mx-auto min-h-screen px-4 py-8 pb-20 transition-all duration-500 sm:px-6 ${
          hasSearched ? "max-w-7xl pt-12 lg:px-8" : "flex max-w-md items-center justify-center"
        }`}
      >
        {!hasSearched ? (
          <div className="w-full animate-fade-in">
            <SearchFilters
              onSearch={handleSearch}
              resultCount={filteredDoctors.length}
              compact={false}
            />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0 animate-pop-in">
              <DoctorList
                doctors={filteredDoctors}
                userLocation={userLocation}
                locationPlaceholder={locationInfo.location}
                radiusPlaceholder={locationInfo.radius}
              />
              <Disclaimer variant="compact" className="mt-6" />
            </div>
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="animate-pop-in [animation-delay:100ms]">
                <SearchFilters
                  onSearch={handleSearch}
                  resultCount={filteredDoctors.length}
                  compact={true}
                />
              </div>
            </aside>
          </div>
        )}
      </main>
      <BottomBar />
    </div>
  );
}
