import { GoogleGenAI, Type } from "@google/genai";
import crypto from "crypto";
import type { Doctor } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDoctorsWithGemini(
  location: string,
  problem: string,
  limit: number = 5
): Promise<Doctor[] | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  const prompt = `
You are a highly accurate medical directory assistant for ${location}.
Find the top ${limit} real, practicing doctors or specialized clinics in or very near ${location} that specialize in treating "${problem}".
You must use Google Search to find real, accurate, and up-to-date doctors, exactly as if a user searched "Top doctors for ${problem} in ${location}".

Rules:
1. Provide real names, real specializations, real workplaces, and real phone numbers. If phone number is unknown, use "N/A".
2. You must provide a short description indicating why they are recommended.
3. The response must perfectly match the requested JSON schema.
4. Assume distanceKm is a reasonable estimate (e.g., 1.5, 3.2) based on the location.
5. Make sure the output is a valid JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Doctor or Clinic Name" },
              specialization: { type: Type.STRING, description: "Detailed specialization, e.g., 'Medicine Specialist (FCPS)'" },
              workplace: { type: Type.STRING, description: "Hospital or Chamber name and exact location" },
              phone: { type: Type.STRING, description: "Contact phone number" },
              description: { type: Type.STRING, description: "Short 1-2 sentence reason for recommendation" },
              latitude: { type: Type.NUMBER, description: "Approximate latitude" },
              longitude: { type: Type.NUMBER, description: "Approximate longitude" },
              distanceKm: { type: Type.NUMBER, description: "Estimated distance in km from search center (e.g., 2.5)" }
            },
            required: ["name", "specialization", "workplace", "phone", "description", "distanceKm"]
          }
        }
      }
    });

    if (!response.text) return null;
    
    const parsed = JSON.parse(response.text);
    
    // Map to our app's Doctor interface
    return parsed.map((d: any) => ({
      id: crypto.randomUUID(),
      name: d.name,
      specialization: d.specialization,
      workplace: d.workplace,
      phone: d.phone,
      country: "Bangladesh",
      city: location.includes(',') ? location.split(',')[0].trim() : "Local City",
      area: location,
      latitude: d.latitude || undefined,
      longitude: d.longitude || undefined,
      distanceKm: d.distanceKm,
      totalViews: Math.floor(Math.random() * 5000) + 1000,
      recommendationCount: Math.floor(Math.random() * 500) + 50,
      description: d.description + " ✨ (AI Found)"
    }));
  } catch (error) {
    console.error("Gemini AI error:", error);
    return null;
  }
}
