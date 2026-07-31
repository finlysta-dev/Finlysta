// Search queries run against each job source. Keep this list short —
// each entry costs an API call (or more, with pagination) against a
// free-tier rate limit.
export const SEARCH_QUERIES: string[] = [
  "finance fresher",
  "financial analyst fresher",
  "accounts executive fresher",
  "accounting fresher",
  "finance graduate trainee",
  "audit associate",
  "tax analyst fresher",
  "mis executive finance",
  "finance internship",
  "articleship",
];

// A posting must match at least one of these to be considered entry-level.
export const ENTRY_LEVEL_INCLUDE = [
  "fresher",
  "entry level",
  "entry-level",
  "trainee",
  "graduate",
  "intern",
  "internship",
  "articleship",
  "0-1 year",
  "0-2 year",
  "0 to 1 year",
  "0 to 2 year",
  "junior",
  "associate",
];

// A posting matching any of these is rejected, even if it also matched
// an include term above (e.g. "Senior Associate").
export const SENIORITY_EXCLUDE = [
  "senior",
  "sr.",
  "sr ",
  "manager",
  "director",
  " vp ",
  "vice president",
  "head of",
  "lead ",
  "principal",
  "chief",
  "10+ years",
  "8+ years",
  "5+ years",
  "3+ years",
  "avp",
  "gm ",
  "general manager",
];

// A posting must match at least one to be considered finance-related
// (guards against generic "trainee"/"fresher" postings in unrelated fields).
export const FINANCE_DOMAIN_INCLUDE = [
  "finance",
  "financial",
  "accounts",
  "accounting",
  "account executive",
  "audit",
  "taxation",
  "tax ",
  "mis",
  "bookkeeping",
  "gst",
  "articleship",
  "chartered accountant",
  "cost accountant",
  "credit analyst",
  "investment",
  "equity research",
  "fp&a",
  "fpna",
];

export function isEntryLevelFinance(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();

  const hasExclusion = SENIORITY_EXCLUDE.some((term) => text.includes(term));
  if (hasExclusion) return false;

  const isFinance = FINANCE_DOMAIN_INCLUDE.some((term) => text.includes(term));
  if (!isFinance) return false;

  const isEntryLevel = ENTRY_LEVEL_INCLUDE.some((term) => text.includes(term));
  return isEntryLevel;
}
