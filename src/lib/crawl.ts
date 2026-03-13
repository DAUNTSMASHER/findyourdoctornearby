export interface CrawlResult {
  title: string;
  url: string;
  snippet: string;
}

export async function crawlWeb(query: string): Promise<CrawlResult[]> {
  const tavilyKey = process.env.TAVILY_API_KEY;
  const serperKey = process.env.SERPER_API_KEY;

  if (tavilyKey) {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: tavilyKey,
        query,
        search_depth: "basic",
        max_results: 8,
        topic: "general",
      }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      results?: Array<{ title?: string; url?: string; content?: string }>;
    };
    return (data.results ?? []).map((r) => ({
      title: r.title ?? "Untitled",
      url: r.url ?? "#",
      snippet: r.content ?? "",
    }));
  }

  if (serperKey) {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": serperKey,
      },
      body: JSON.stringify({ q: query }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      organic?: Array<{ title?: string; link?: string; snippet?: string }>;
    };
    return (data.organic ?? []).map((r) => ({
      title: r.title ?? "Untitled",
      url: r.link ?? "#",
      snippet: r.snippet ?? "",
    }));
  }

  return [];
}
