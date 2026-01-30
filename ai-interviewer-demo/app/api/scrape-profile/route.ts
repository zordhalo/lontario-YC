import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubProfile, extractGitHubUsername } from "@/lib/github";
import { fetchLinkedInProfile, extractLinkedInUrl, isLinkedInUrl } from "@/lib/linkedin";
import { ScrapeProfileRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: ScrapeProfileRequest = await req.json();
    const { url, source } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (source === "github") {
      const username = extractGitHubUsername(url);
      if (!username) {
        return NextResponse.json(
          { error: "Invalid GitHub URL or username" },
          { status: 400 }
        );
      }

      const profile = await fetchGitHubProfile(username);
      return NextResponse.json(profile);
    }

    if (source === "linkedin") {
      if (!isLinkedInUrl(url)) {
        return NextResponse.json(
          { error: "Invalid LinkedIn URL" },
          { status: 400 }
        );
      }

      const normalizedUrl = extractLinkedInUrl(url);
      if (!normalizedUrl) {
        return NextResponse.json(
          { error: "Could not parse LinkedIn URL" },
          { status: 400 }
        );
      }

      const profile = await fetchLinkedInProfile(normalizedUrl);
      return NextResponse.json(profile);
    }

    return NextResponse.json(
      { error: "Invalid source. Must be 'github' or 'linkedin'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error scraping profile:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// Auto-detect source from URL
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  // Detect source
  if (url.includes("github.com") || extractGitHubUsername(url)) {
    return NextResponse.json({ source: "github" });
  }

  if (isLinkedInUrl(url)) {
    return NextResponse.json({ source: "linkedin" });
  }

  return NextResponse.json({ source: "unknown" });
}
