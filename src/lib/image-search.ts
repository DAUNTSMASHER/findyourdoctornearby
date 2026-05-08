export async function getDoctorImageUrl(name: string, workplace: string): Promise<string | undefined> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return undefined;

  // Try a comprehensive query first
  const query = `"${name}" ${workplace ? workplace : ""} doctor profile photo`;

  try {
    const fetchWithQuery = async (q: string) => {
      const res = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ q: q, num: 5 })
      });
      if (!res.ok) return null;
      return await res.json();
    };

    let data = await fetchWithQuery(query);
    
    // Fallback 1: Remove workplace if it was too specific
    if ((!data || !data.images || data.images.length === 0) && workplace) {
      data = await fetchWithQuery(`"${name}" doctor profile picture`);
    }

    // Fallback 2: Just the name + doctor
    if (!data || !data.images || data.images.length === 0) {
      data = await fetchWithQuery(`${name} medical doctor photo`);
    }
    
    if (data && data.images && data.images.length > 0) {
      // Find the first image that looks like a direct link (ends in jpg/png/webp) or just return the first one
      return data.images[0].imageUrl;
    }
  } catch (error) {
    console.error("Failed to fetch image from Serper:", error);
  }

  return undefined;
}
