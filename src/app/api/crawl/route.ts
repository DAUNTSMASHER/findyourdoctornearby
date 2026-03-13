import { NextResponse } from "next/server";

export interface CrawlResult {
  title: string;
  url: string;
  snippet: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json(
      { error: "Missing query parameter: q" },
      { status: 400 }
    );
  }

  const tavilyKey = process.env.TAVILY_API_KEY;
  const serperKey = process.env.SERPER_API_KEY;

  if (tavilyKey) {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: tavilyKey,
        query: q,
        search_depth: "basic",
        max_results: 8,
        topic: "general",
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: "Tavily API error", details: err },
        { status: 502 }
      );
    }
    const data = (await res.json()) as {
      results?: Array<{
        title?: string;
        url?: string;
        content?: string;
      }>;
    };
    const results: CrawlResult[] = (data.results ?? []).map((r) => ({
      title: r.title ?? "Untitled",
      url: r.url ?? "#",
      snippet: r.content ?? "",
    }));
    return NextResponse.json({ results });
  }

  if (serperKey) {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": serperKey,
      },
      body: JSON.stringify({ q }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: "Serper API error", details: err },
        { status: 502 }
      );
    }
    const data = (await res.json()) as {
      organic?: Array<{
        title?: string;
        link?: string;
        snippet?: string;
      }>;
    };
    const results: CrawlResult[] = (data.organic ?? []).map((r) => ({
      title: r.title ?? "Untitled",
      url: r.link ?? "#",
      snippet: r.snippet ?? "",
    }));
    return NextResponse.json({ results });
  }

  return NextResponse.json(
    {
      error: "No search API configured",
      hint: "Add TAVILY_API_KEY or SERPER_API_KEY to your environment variables.",
      results: [],
    },
    { status: 503 }
  );
}
