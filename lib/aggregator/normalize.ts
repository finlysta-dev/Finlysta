import type { RawJobPosting } from "./types";

function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildSlug(job: RawJobPosting): string {
  const base = slugifyText(`${job.title}-${job.company}`).slice(0, 80);
  const idPart = slugifyText(`${job.source}-${job.externalId}`).slice(-30);
  return `${base}-${idPart}`;
}

function detectType(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  // Word boundaries matter here: a plain substring check on "intern" also
  // matches "international"/"internal"/"internet".
  if (/\bintern(ship)?\b/.test(text) || /\barticleship\b/.test(text)) {
    return "internship";
  }
  return "job";
}

function detectWorkMode(location: string, description: string): string {
  const text = `${location} ${description}`.toLowerCase();
  if (text.includes("remote") || text.includes("work from home")) return "Remote";
  if (text.includes("hybrid")) return "Hybrid";
  return "On-site";
}

function extractCity(location: string): string | null {
  const first = location.split(",")[0]?.trim();
  return first || null;
}

function formatSalary(min?: number | null, max?: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
  if (min && max) return `${fmt(min)} - ${fmt(max)} /year`;
  if (min) return `${fmt(min)}+ /year`;
  if (max) return `Up to ${fmt(max)} /year`;
  return null;
}

export function normalizeJob(job: RawJobPosting) {
  const type = detectType(job.title, job.description);
  const shortDescription = job.description.replace(/\s+/g, " ").trim().slice(0, 300);

  return {
    slug: buildSlug(job),
    title: job.title.trim(),
    company: job.company.trim(),
    companyLogo: job.companyLogo || null,
    type,
    workMode: detectWorkMode(job.location, job.description),
    location: job.location || "India",
    city: job.city || extractCity(job.location),
    country: "India",
    experience: "0-2 years",
    salary: formatSalary(job.salaryMin, job.salaryMax),
    skills: [] as string[],
    overview: job.description.replace(/\s+/g, " ").trim().slice(0, 2000) || null,
    shortDescription: shortDescription || null,
    applyLink: job.applyLink,
    isNew: true,
    status: "active",
    featured: false,
    isVerified: false,
    isTrending: false,
    isActivelyHiring: true,
    published: true,
    postedAt: job.postedAt || new Date(),
  };
}
