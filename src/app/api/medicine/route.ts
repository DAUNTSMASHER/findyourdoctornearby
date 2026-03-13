import { NextResponse } from "next/server";
import { getMedicineWithCrawl } from "@/lib/data-with-crawl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const condition = searchParams.get("condition") ?? "";
  const country = searchParams.get("country") ?? "";
  const state = searchParams.get("state") ?? "";
  const data = await getMedicineWithCrawl(condition, country, state);
  return NextResponse.json(data);
}
