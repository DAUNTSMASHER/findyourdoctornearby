import { NextResponse } from "next/server";
import { getEnrichedArticleById } from "@/lib/enriched-loader";
import { sampleArticles } from "@/lib/articles-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article =
    getEnrichedArticleById(id, sampleArticles) ??
    sampleArticles.find((a) => a.id === id);
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(article);
}
