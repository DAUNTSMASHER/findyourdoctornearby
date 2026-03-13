import { NextResponse } from "next/server";
import { getFromBlob, saveToBlob } from "@/lib/blob-cache";
import { crawlWeb } from "@/lib/crawl";

export interface CrawlResult {
  title: string;
  url: string;
  snippet: string;
}

function cacheKey(q: string): string {
  return `crawl/${q.replace(/\s+/g, "-").slice(0, 100)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const force = searchParams.get("force") === "1";

  if (!q) {
    return NextResponse.json(
      { error: "Missing query parameter: q" },
      { status: 400 }
    );
  }

  const key = cacheKey(q);
  if (!force) {
    const cached = await getFromBlob<CrawlResult[]>(key);
    if (cached?.length) {
      return NextResponse.json({ results: cached, fromCache: true });
    }
  }

  const results = await crawlWeb(q);
  if (results.length > 0) {
    await saveToBlob(key, results);
  }

  const hasApi =
    !!process.env.TAVILY_API_KEY || !!process.env.SERPER_API_KEY;
  if (results.length === 0 && !hasApi) {
    return NextResponse.json(
      {
        error: "No search API configured",
        hint: "Add TAVILY_API_KEY or SERPER_API_KEY to environment variables.",
        results: [],
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ results });
}
