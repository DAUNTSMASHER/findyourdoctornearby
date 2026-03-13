export interface TransportOption {
  mode: "car" | "transit" | "walk" | "bike";
  label: string;
  timeMinutes: number;
  cost?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  workplace: string;
  phone: string;
  imageUrl?: string;
  country: string;
  city: string;
  area: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  transportOptions?: TransportOption[];
  totalViews?: number;
  recommendationCount?: number;
}

export interface SearchFilters {
  problem: string;
  country: string;
  city: string;
  area: string;
  radius: string;
}

export interface UserLocation {
  lat: number;
  lon: number;
}
