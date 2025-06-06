"use server";

export async function fetchAniListToken(authCode) {
  const ANI_API_URL = "https://anilist.co/api/v2/oauth/token";
  const CLIENT_ID = process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_ANILIST_CLIENT_SECRET;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/callback`;

  try {
    const res = await fetch(ANI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: authCode,
      }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.access_token || null;
  } catch (error) {
    console.error("Failed to get AniList token:", error);
    return null;
  }
}
