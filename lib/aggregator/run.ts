import prisma from "@/lib/prisma";
import { SEARCH_QUERIES, isEntryLevelFinance } from "./keywords";
import { normalizeJob } from "./normalize";
import { fetchAdzunaJobs } from "./sources/adzuna";
import { fetchJoobleJobs } from "./sources/jooble";
import type { AggregatorRunSummary, RawJobPosting } from "./types";

const SOURCES: { name: string; fetch: (query: string) => Promise<RawJobPosting[]> }[] = [
  { name: "adzuna", fetch: (query) => fetchAdzunaJobs(query, 1) },
  { name: "jooble", fetch: (query) => fetchJoobleJobs(query, 1) },
];

export async function runAggregator(): Promise<AggregatorRunSummary[]> {
  const summaries: AggregatorRunSummary[] = [];

  for (const source of SOURCES) {
    const summary: AggregatorRunSummary = {
      source: source.name,
      fetched: 0,
      matchedFilter: 0,
      inserted: 0,
      skippedDuplicate: 0,
    };

    try {
      const seenExternalIds = new Set<string>();

      for (const query of SEARCH_QUERIES) {
        const jobs = await source.fetch(query);
        summary.fetched += jobs.length;

        for (const job of jobs) {
          if (seenExternalIds.has(job.externalId)) continue;
          seenExternalIds.add(job.externalId);

          if (!isEntryLevelFinance(job.title, job.description)) continue;
          summary.matchedFilter += 1;

          const data = normalizeJob(job);

          const existing = await prisma.opportunity.findUnique({
            where: { slug: data.slug },
            select: { id: true },
          });

          if (existing) {
            summary.skippedDuplicate += 1;
            continue;
          }

          await prisma.opportunity.create({ data });
          summary.inserted += 1;
        }
      }
    } catch (error) {
      summary.error = error instanceof Error ? error.message : String(error);
    }

    summaries.push(summary);
  }

  return summaries;
}
