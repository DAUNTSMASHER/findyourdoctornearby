import { NextResponse } from "next/server";
import { sampleDoctors } from "@/lib/data";

export async function GET() {
  // In production, replace with database lookup (e.g. Vercel KV, Postgres)
  return NextResponse.json({ doctors: sampleDoctors });
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
