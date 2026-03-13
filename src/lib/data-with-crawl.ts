import { getFromBlob, saveToBlob } from "@/lib/blob-cache";
import { crawlWeb } from "@/lib/crawl";
import { sampleDoctors } from "@/lib/data";
import {
  getEnrichedDoctors,
  getEnrichedArticles,
  getEnrichedInfo,
} from "@/lib/enriched-loader";
import {
  findMedicines,
  countriesWithStates,
  type Medicine,
} from "@/lib/medicine-data";
import { sampleArticles, type Article } from "@/lib/articles-data";
import { sampleTips, type Tip } from "@/lib/tips-data";
import { getEnrichedTips } from "@/lib/enriched-loader";
import {
  statItems,
  findStatByInput,
  type StatItem,
} from "@/lib/do-you-know-data";
import { doctorMatchesProblem } from "@/lib/problem-to-specialization";
import { haversineDistance } from "@/lib/geo";

export interface WebResult {
  title: string;
  url: string;
  snippet: string;
}

async function getOrCrawl(key: string, crawlQuery: string): Promise<WebResult[]> {
  const cached = await getFromBlob<WebResult[]>(key);
  if (cached?.length) return cached;
  const results = await crawlWeb(crawlQuery);
  if (results.length > 0) await saveToBlob(key, results);
  return results;
}

export interface DoctorsResponse {
  doctors: typeof sampleDoctors;
  webResults?: WebResult[];
  total?: number;
  /** true when area filter was relaxed to show results from city */
  relaxedSearch?: boolean;
}

const MILES_TO_KM = 1.60934;

function applyDoctorFilters(
  doctors: typeof sampleDoctors,
  filters: {
    country?: string;
    city?: string;
    area?: string;
    problem?: string;
    radiusMiles?: number;
    userLat?: number;
    userLon?: number;
  }
): typeof sampleDoctors {
  const { country, city, area, problem, radiusMiles, userLat, userLon } = filters;
  let result = [...doctors];

  if (country?.trim()) {
    result = result.filter((d) =>
      d.country.toLowerCase().includes(country.toLowerCase())
    );
  }
  if (city?.trim()) {
    result = result.filter((d) =>
      d.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  if (area?.trim()) {
    const a = area.toLowerCase();
    result = result.filter(
      (d) =>
        d.area?.toLowerCase().includes(a) ||
        d.workplace?.toLowerCase().includes(a) ||
        d.city.toLowerCase().includes(a)
    );
  }
  if (problem?.trim()) {
    result = result.filter((d) =>
      doctorMatchesProblem(d.specialization, problem)
    );
  }
  if (
    radiusMiles != null &&
    radiusMiles > 0 &&
    userLat != null &&
    userLon != null
  ) {
    const maxKm = radiusMiles * MILES_TO_KM;
    result = result.filter((d) => {
      if (d.latitude == null || d.longitude == null) return true;
      const km = haversineDistance(userLat, userLon, d.latitude, d.longitude);
      return km <= maxKm;
    });
  }
  return result;
}

export async function getDoctorsWithCrawl(
  filters: {
    country?: string;
    city?: string;
    area?: string;
    problem?: string;
    radiusMiles?: number;
    userLat?: number;
    userLon?: number;
  } = {},
  page = 1,
  limit = 100
): Promise<DoctorsResponse> {
  const { country, city, area, problem, radiusMiles, userLat, userLon } = filters;

  const allDoctors = getEnrichedDoctors(sampleDoctors);
  let doctors = applyDoctorFilters(allDoctors, filters);
  let relaxedSearch = false;

  if (doctors.length === 0 && area?.trim()) {
    doctors = applyDoctorFilters(allDoctors, {
      ...filters,
      area: undefined,
    });
    relaxedSearch = doctors.length > 0;
  }

  const total = doctors.length;
  const start = (page - 1) * limit;
  doctors = doctors.slice(start, start + limit);

  const crawlParts = [
    problem && `doctors for ${problem}`,
    area,
    city,
    country,
    radiusMiles && `${radiusMiles} mile radius`,
  ].filter(Boolean);
  const crawlQ =
    crawlParts.length > 0
      ? crawlParts.join(" ")
      : "doctors near me healthcare";
  const key = `doctors-${crawlQ.replace(/\s+/g, "-").slice(0, 80)}`;
  const webResults = await getOrCrawl(key, crawlQ);

  return { doctors, webResults, total, relaxedSearch };
}

export interface MedicineResponse {
  medicines: Medicine[];
  countriesWithStates: typeof countriesWithStates;
  webResults?: WebResult[];
}

export async function getMedicineWithCrawl(
  condition: string,
  country: string,
  state: string
): Promise<MedicineResponse> {
  const staticMeds = findMedicines(condition, country, state);
  const key = `medicine-${condition}-${country}-${state}`.replace(/\s+/g, "-");
  const crawlQ =
    condition && country
      ? `${condition} medicine treatment ${country} ${state || ""}`.trim()
      : "medicine for common conditions";
  const webResults = await getOrCrawl(key, crawlQ);
  return {
    medicines: staticMeds,
    countriesWithStates,
    webResults,
  };
}

export interface ArticlesResponse {
  articles: Article[];
  webResults?: WebResult[];
  total?: number;
}

export async function getArticlesWithCrawl(
  query?: string,
  page = 1,
  limit = 50
): Promise<ArticlesResponse> {
  let articles = getEnrichedArticles(sampleArticles);
  if (query?.trim()) {
    const q = query.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.disease.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
    );
  }
  const total = articles.length;
  const start = (page - 1) * limit;
  articles = articles.slice(start, start + limit);
  const key = `articles-${query || "all"}`.replace(/\s+/g, "-").slice(0, 80);
  const crawlQ = query?.trim()
    ? `${query} health disease guide`
    : "health articles disease prevention";
  const webResults = await getOrCrawl(key, crawlQ);
  return { articles, webResults, total };
}

export interface TipsResponse {
  tips: Tip[];
  webResults?: WebResult[];
}

export async function getTipsWithCrawl(query?: string): Promise<TipsResponse> {
  let tips = getEnrichedTips(sampleTips);
  if (query?.trim()) {
    const q = query.toLowerCase();
    tips = tips.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q)
    );
  }
  const key = `tips-${query || "all"}`.replace(/\s+/g, "-").slice(0, 80);
  const crawlQ = query?.trim()
    ? `${query} health tips`
    : "health wellness tips";
  const webResults = await getOrCrawl(key, crawlQ);
  return { tips, webResults };
}

export interface StatsResponse {
  stat: StatItem | null;
  webResults?: WebResult[];
}

export async function getStatsWithCrawl(topic?: string): Promise<StatsResponse> {
  const enrichedItems = getEnrichedInfo(statItems);
  const findInItems = (input: string) => {
    const q = input.toLowerCase().trim();
    if (!q) return null;
    return enrichedItems.find((item) =>
      item.keywords.some((k) => q.includes(k))
    ) ?? enrichedItems.find((item) => item.topic.includes(q)) ?? null;
  };
  const stat = topic?.trim() ? findInItems(topic) : null;
  const key = `stats-${topic || "list"}`.replace(/\s+/g, "-").slice(0, 80);
  const crawlQ = topic?.trim()
    ? `${topic} worldwide statistics health`
    : "global health statistics";
  const webResults = await getOrCrawl(key, crawlQ);
  return { stat, webResults };
}

export async function getStatsList(): Promise<{ items: StatItem[] }> {
  return { items: getEnrichedInfo(statItems) };
}
