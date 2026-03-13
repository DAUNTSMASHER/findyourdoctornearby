import { NextResponse } from "next/server";
import {
  getStatsWithCrawl,
  getStatsList,
} from "@/lib/data-with-crawl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") ?? "";
  const list = searchParams.get("list") === "1";

  if (list) {
    const data = await getStatsList();
    return NextResponse.json(data);
  }

  const data = await getStatsWithCrawl(topic);
  return NextResponse.json(data);
}
