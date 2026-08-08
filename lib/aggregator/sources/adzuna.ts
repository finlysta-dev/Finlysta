import type { RawJobPosting } from "../types";

interface AdzunaJob {
  id: string;
  title: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  description?: string;
  redirect_url: string;
  salary_min?: number;
  salary_max?: number;
  created?: string;
}

interface AdzunaResponse {
  results: AdzunaJob[];
}

// Docs: https://developer.adzuna.com/docs/search
export async function fetchAdzunaJobs(query: string, page = 1): Promise<RawJobPosting[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    return [];
  }

  const url = new URL(`https://api.adzuna.com/v1/api/jobs/in/search/${page}`);
  url.searchParams.set("app_id", appId);
  url.searchParams.set("app_key", appKey);
  url.searchParams.set("results_per_page", "50");
  url.searchParams.set("what", query);
  url.searchParams.set("where", "india");
  url.searchParams.set("content-type", "application/json");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Adzuna request failed: ${response.status} ${await response.text()}`);
  }

  const data: AdzunaResponse = await response.json();

  return (data.results || []).map((job) => ({
    source: "adzuna",
    externalId: job.id,
    title: job.title || "",
    company: job.company?.display_name || "Unknown Company",
    description: job.description || "",
    location: job.location?.display_name || "India",
    applyLink: job.redirect_url,
    salaryMin: job.salary_min ?? null,
    salaryMax: job.salary_max ?? null,
    postedAt: job.created ? new Date(job.created) : null,
  }));
}
