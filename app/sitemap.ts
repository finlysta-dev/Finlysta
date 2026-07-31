import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const BASE_URL = "https://finlysta.com";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/jobs", changeFrequency: "daily", priority: 0.95 },
  { path: "/internships", changeFrequency: "daily", priority: 0.95 },
  { path: "/interview-prep", changeFrequency: "weekly", priority: 0.9 },
  { path: "/career-paths", changeFrequency: "weekly", priority: 0.85 },
  { path: "/learning-hub", changeFrequency: "weekly", priority: 0.85 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.85 },
  { path: "/guides/excel-functions-guide", changeFrequency: "monthly", priority: 0.9 },
  { path: "/practice-hub", changeFrequency: "weekly", priority: 0.8 },
  { path: "/domains", changeFrequency: "weekly", priority: 0.75 },
  { path: "/templates", changeFrequency: "weekly", priority: 0.75 },
  { path: "/roadmap", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/employers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/mission", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/learning-hub/finance-fundamentals", changeFrequency: "monthly", priority: 0.6 },
  { path: "/learning-hub/finance-fundamentals/balance-sheet", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/budgeting-basics", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/capital-budgeting", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/cash-flow-statement", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/financial-ratios", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/forecasting-methods", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/profit-loss-statement", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/finance-fundamentals/working-capital", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/advanced-excel/excel-interface-navigation", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/advanced-excel/vlookup", changeFrequency: "monthly", priority: 0.5 },
  { path: "/learning-hub/topics/advanced-excel", changeFrequency: "monthly", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [opportunities, blogs] = await Promise.all([
    prisma.opportunity.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, type: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.careerResource.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }).catch(() => []),
  ]);

  const opportunityEntries: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${BASE_URL}/jobs/${o.slug}`,
    lastModified: o.updatedAt,
    changeFrequency: "daily",
    priority: o.type === "job" ? 0.85 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...opportunityEntries, ...blogEntries];
}
