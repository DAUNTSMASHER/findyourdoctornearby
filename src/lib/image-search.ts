export async function getDoctorImageUrl(name: string, workplace: string): Promise<string | undefined> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return undefined;

  // Enhance the query to target profile pictures
  const query = `"${name}" doctor profile picture OR photo ${workplace || ""}`;

  try {
    const res = await fetch("https://google.serper.dev/images", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: query })
    });

    if (!res.ok) {
      console.error("Serper API error:", await res.text());
      return undefined;
    }

    const data = await res.json();
    
    // Check if we have image results
    if (data.images && data.images.length > 0) {
      // Return the first image URL
      return data.images[0].imageUrl;
    }
  } catch (error) {
    console.error("Failed to fetch image from Serper:", error);
  }

  return undefined;
}
