import { NextResponse } from "next/server";
import { getArticlesWithCrawl } from "@/lib/data-with-crawl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") ?? "50", 10)));
  const data = await getArticlesWithCrawl(q, page, limit);
  return NextResponse.json(data);
}
