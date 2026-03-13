export interface StatItem {
  id: string;
  topic: string;
  keywords: string[];
  label: string;
  unit: string;
  daily: number;
  monthly: number;
  yearly: number;
  summary: string;
}

export const statItems: StatItem[] = [
  {
    id: "1",
    topic: "smoking",
    keywords: ["smoking", "tobacco", "cigarette"],
    label: "deaths from smoking",
    unit: "people",
    daily: 22000,
    monthly: 660000,
    yearly: 8000000,
    summary: "Smoking causes more deaths than HIV, malaria, and tuberculosis combined.",
  },
  {
    id: "2",
    topic: "heart disease",
    keywords: ["heart", "cardiovascular", "cardiac"],
    label: "deaths from heart disease",
    unit: "people",
    daily: 49000,
    monthly: 1500000,
    yearly: 17900000,
    summary: "About 31% of all global deaths. Many cases can be prevented with lifestyle changes.",
  },
  {
    id: "3",
    topic: "diabetes",
    keywords: ["diabetes", "diabetic", "blood sugar"],
    label: "deaths from diabetes",
    unit: "people",
    daily: 4200,
    monthly: 125000,
    yearly: 1500000,
    summary: "Globally. Proper management and lifestyle changes can significantly reduce risk.",
  },
  {
    id: "4",
    topic: "depression",
    keywords: ["depression", "mental health", "depressed"],
    label: "people affected by depression",
    unit: "people",
    daily: 0,
    monthly: 0,
    yearly: 280000000,
    summary: "A leading cause of disability worldwide. Treatment and support help most people recover.",
  },
  {
    id: "5",
    topic: "road accidents",
    keywords: ["road", "accident", "traffic", "car crash"],
    label: "deaths from road accidents",
    unit: "people",
    daily: 3700,
    monthly: 110000,
    yearly: 1350000,
    summary: "Road traffic injuries are a leading cause of death, especially among young adults.",
  },
  {
    id: "6",
    topic: "stroke",
    keywords: ["stroke", "brain"],
    label: "deaths from stroke",
    unit: "people",
    daily: 16500,
    monthly: 500000,
    yearly: 6000000,
    summary: "Many strokes can be prevented by managing blood pressure, diet, and lifestyle.",
  },
  {
    id: "7",
    topic: "cancer",
    keywords: ["cancer"],
    label: "deaths from cancer",
    unit: "people",
    daily: 27400,
    monthly: 820000,
    yearly: 10000000,
    summary: "Early detection and prevention can save lives. Regular screenings matter.",
  },
  {
    id: "8",
    topic: "malaria",
    keywords: ["malaria"],
    label: "deaths from malaria",
    unit: "people",
    daily: 1200,
    monthly: 36000,
    yearly: 430000,
    summary: "Most deaths occur in sub-Saharan Africa. Prevention and treatment are available.",
  },
];

export function findStatByInput(input: string): StatItem | null {
  const q = input.toLowerCase().trim();
  if (!q) return null;
  return statItems.find((item) =>
    item.keywords.some((k) => q.includes(k))
  ) ?? statItems.find((item) => item.topic.includes(q)) ?? null;
}
