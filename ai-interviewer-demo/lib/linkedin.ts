import axios from "axios";
import { CandidateProfile } from "./types";

const PROXYCURL_API = "https://nubela.co/proxycurl/api/v2/linkedin";

interface ProxycurlExperience {
  title: string;
  company: string;
  starts_at?: { year: number; month?: number };
  ends_at?: { year: number; month?: number } | null;
  description?: string;
}

interface ProxycurlProfile {
  first_name: string;
  last_name: string;
  headline?: string;
  summary?: string;
  skills?: string[];
  experiences?: ProxycurlExperience[];
}

export async function fetchLinkedInProfile(profileUrl: string): Promise<CandidateProfile> {
  if (!process.env.PROXYCURL_API_KEY) {
    throw new Error(
      "LinkedIn API not configured. Please use manual input or GitHub profile instead."
    );
  }

  try {
    const response = await axios.get<ProxycurlProfile>(PROXYCURL_API, {
      headers: {
        Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`,
      },
      params: {
        url: profileUrl,
        skills: "include",
      },
    });

    const data = response.data;

    // Format experience entries
    const experience = (data.experiences || []).map((exp) => {
      const startYear = exp.starts_at?.year || "N/A";
      const endYear = exp.ends_at?.year || "Present";
      return `${exp.title} at ${exp.company} (${startYear} - ${endYear})`;
    });

    // Extract skills from profile
    const skills = data.skills || [];

    // Add skills from experience descriptions if available
    const experienceSkills = (data.experiences || [])
      .filter((exp) => exp.description)
      .flatMap((exp) => {
        // Simple keyword extraction from descriptions
        const techKeywords = [
          "JavaScript",
          "TypeScript",
          "Python",
          "Java",
          "React",
          "Node.js",
          "AWS",
          "Docker",
          "Kubernetes",
          "SQL",
          "MongoDB",
          "GraphQL",
          "REST",
          "API",
          "Agile",
          "Scrum",
        ];
        return techKeywords.filter(
          (keyword) =>
            exp.description?.toLowerCase().includes(keyword.toLowerCase())
        );
      });

    const allSkills = [...new Set([...skills, ...experienceSkills])];

    return {
      source: "linkedin",
      url: profileUrl,
      name: `${data.first_name} ${data.last_name}`,
      bio: data.summary || data.headline || undefined,
      skills: allSkills,
      experience,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Invalid Proxycurl API key");
      } else if (error.response?.status === 404) {
        throw new Error("LinkedIn profile not found");
      } else if (error.response?.status === 429) {
        throw new Error("Proxycurl rate limit exceeded. Please try again later.");
      }
      throw new Error(
        `LinkedIn API error: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error(`Failed to fetch LinkedIn profile: ${error}`);
  }
}

export function extractLinkedInUrl(input: string): string | null {
  // Handle various LinkedIn URL formats
  const patterns = [
    /linkedin\.com\/in\/([a-zA-Z0-9\-]+)/i,
    /linkedin\.com\/pub\/([a-zA-Z0-9\-]+)/i,
  ];

  for (const pattern of patterns) {
    if (pattern.test(input)) {
      // Normalize the URL
      if (!input.startsWith("http")) {
        return `https://www.${input}`;
      }
      return input;
    }
  }

  return null;
}

export function isLinkedInUrl(input: string): boolean {
  return /linkedin\.com\/(in|pub)\/[a-zA-Z0-9\-]+/i.test(input);
}
