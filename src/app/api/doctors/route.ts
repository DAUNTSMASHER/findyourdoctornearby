import { NextResponse } from "next/server";
import { getDoctorsWithCrawl } from "@/lib/data-with-crawl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country")?.trim() || undefined;
  const city = searchParams.get("city")?.trim() || undefined;
  const area = searchParams.get("area")?.trim() || undefined;
  const problem = searchParams.get("problem")?.trim() || undefined;
  const radiusMiles = searchParams.get("radius");
  const userLat = searchParams.get("lat");
  const userLon = searchParams.get("lon");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") ?? "100", 10)));

  const filters = {
    country,
    city,
    area,
    problem,
    radiusMiles: radiusMiles ? parseFloat(radiusMiles) : undefined,
    userLat: userLat ? parseFloat(userLat) : undefined,
    userLon: userLon ? parseFloat(userLon) : undefined,
  };
  const data = await getDoctorsWithCrawl(filters, page, limit);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, specialization, workplace, phone, country, city, area, imageUrl } = body;

    if (!name || !specialization || !workplace || !phone || !country || !city || !area) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDoctor = {
      id: crypto.randomUUID(),
      name,
      specialization,
      workplace,
      phone,
      country,
      city,
      area,
      imageUrl: imageUrl || undefined,
    };

    // In production, persist to database
    return NextResponse.json({ doctor: newDoctor }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
