import { NextResponse } from "next/server";
import { getTipsWithCrawl } from "@/lib/data-with-crawl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const data = await getTipsWithCrawl(q);
  return NextResponse.json(data);
}
