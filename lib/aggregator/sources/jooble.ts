import type { RawJobPosting } from "../types";

interface JoobleJob {
  id?: string | number;
  title?: string;
  location?: string;
  snippet?: string;
  salary?: string;
  company?: string;
  link?: string;
  updated?: string;
}

interface JoobleResponse {
  jobs?: JoobleJob[];
}

// Docs (gated behind signup): https://jooble.org/api/about
// Verify this shape against the real response once JOOBLE_API_KEY is set —
// field names below match Jooble's commonly documented format but were not
// confirmed against a live key while building this.
export async function fetchJoobleJobs(query: string, page = 1): Promise<RawJobPosting[]> {
  const apiKey = process.env.JOOBLE_API_KEY;
  if (!apiKey) return [];

  const response = await fetch(`https://jooble.org/api/${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keywords: query,
      location: "India",
      page: String(page),
    }),
  });

  if (!response.ok) {
    throw new Error(`Jooble request failed: ${response.status} ${await response.text()}`);
  }

  const data: JoobleResponse = await response.json();

  return (data.jobs || [])
    .filter((job) => job.link)
    .map((job, index) => ({
      source: "jooble",
      externalId: String(job.id ?? `${query}-${page}-${index}`),
      title: job.title || "",
      company: job.company || "Unknown Company",
      description: job.snippet || "",
      location: job.location || "India",
      applyLink: job.link as string,
      salaryMin: null,
      salaryMax: null,
      postedAt: job.updated ? new Date(job.updated) : null,
    }));
}
