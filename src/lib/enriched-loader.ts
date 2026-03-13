import { readFileSync } from "fs";
import path from "path";
import type { Doctor } from "./types";
import type { Article } from "./articles-data";
import type { Tip } from "./tips-data";
import type { StatItem } from "./do-you-know-data";

const dataDir = path.join(process.cwd(), "data");

function loadJson<T>(filename: string, fallback: T): T {
  try {
    const raw = readFileSync(path.join(dataDir, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

let _doctors: Doctor[] | null = null;
let _articles: Article[] | null = null;
let _tips: Tip[] | null = null;
let _info: StatItem[] | null = null;

export function getEnrichedDoctors(fallback: Doctor[] = []): Doctor[] {
  if (_doctors) return _doctors;
  _doctors = loadJson<Doctor[]>("doctors.json", fallback);
  return _doctors;
}

export function getEnrichedArticles(fallback: Article[] = []): Article[] {
  if (_articles) return _articles;
  _articles = loadJson<Article[]>("articles.json", fallback);
  return _articles;
}

export function getEnrichedTips(fallback: Tip[] = []): Tip[] {
  if (_tips) return _tips;
  _tips = loadJson<Tip[]>("tips.json", fallback);
  return _tips;
}

export function getEnrichedInfo(fallback: StatItem[] = []): StatItem[] {
  if (_info) return _info;
  _info = loadJson<StatItem[]>("info.json", fallback);
  return _info;
}

export function getEnrichedArticleById(
  id: string,
  fallback: Article[] = []
): Article | undefined {
  return getEnrichedArticles(fallback).find((a) => a.id === id);
}
