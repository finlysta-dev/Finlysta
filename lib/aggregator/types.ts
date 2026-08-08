export interface RawJobPosting {
  source: string; // e.g. "adzuna", "jooble"
  externalId: string;
  title: string;
  company: string;
  companyLogo?: string | null;
  description: string;
  location: string;
  city?: string | null;
  applyLink: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  postedAt?: Date | null;
}

export interface AggregatorRunSummary {
  source: string;
  fetched: number;
  matchedFilter: number;
  inserted: number;
  skippedDuplicate: number;
  error?: string;
}
