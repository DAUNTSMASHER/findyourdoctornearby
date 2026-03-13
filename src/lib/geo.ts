import type { TransportOption } from "./types";

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function getTransportFromDistance(distanceKm: number): TransportOption[] {
  const options: TransportOption[] = [];

  // Car: ~25 km/h in city
  const carTime = Math.round((distanceKm / 25) * 60);
  const carCost = `৳${Math.round(distanceKm * 35)}`;
  options.push({ mode: "car", label: "Car", timeMinutes: Math.max(5, carTime), cost: carCost });

  // Transit: ~15 km/h
  const transitTime = Math.round((distanceKm / 15) * 60);
  const transitCost = `৳${Math.round(distanceKm * 8)}`;
  options.push({ mode: "transit", label: "Bus/CNG", timeMinutes: Math.max(8, transitTime), cost: transitCost });

  // Bike: ~18 km/h, skip if > 10 km
  if (distanceKm <= 10) {
    const bikeTime = Math.round((distanceKm / 18) * 60);
    const bikeCost = `৳${Math.round(distanceKm * 5)}`;
    options.push({ mode: "bike", label: "Bike", timeMinutes: Math.max(5, bikeTime), cost: bikeCost });
  }

  // Walk: ~5 km/h, only if < 3 km
  if (distanceKm < 3) {
    const walkTime = Math.round((distanceKm / 5) * 60);
    options.push({ mode: "walk", label: "Walk", timeMinutes: Math.max(10, walkTime) });
  }

  return options;
}
