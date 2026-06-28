import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import JobDetailClient from './JobDetailClient';

// Server Component - fetches data
export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  console.log("🔍 Looking for job with slug:", slug);
  
  // Try to find with isVerified: true first
  let opportunity = await prisma.opportunity.findFirst({
    where: {
      slug: slug,
      published: true,
      isVerified: true,
    },
  });

  // If not found, try without isVerified filter
  if (!opportunity) {
    console.log("⚠️ Job not found with isVerified: true, trying without filter...");
    opportunity = await prisma.opportunity.findFirst({
      where: {
        slug: slug,
        published: true,
      },
    });
  }

  console.log("📊 Found opportunity:", opportunity ? opportunity.title : "NOT FOUND");
  console.log("📊 isVerified:", opportunity?.isVerified);
  console.log("📊 published:", opportunity?.published);

  if (!opportunity) {
    console.log("❌ No opportunity found with slug:", slug);
    notFound();
  }

  // Increment view count in database (server-side)
  try {
    await prisma.opportunity.update({
      where: { id: opportunity.id },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    console.error("Error updating views:", error);
  }

  // Fetch related jobs
  const relatedJobs = await prisma.opportunity.findMany({
    where: {
      type: opportunity.type,
      published: true,
      isVerified: opportunity.isVerified || true,
      slug: { not: slug },
      id: { not: opportunity.id },
    },
    take: 3,
    orderBy: { postedAt: 'desc' },
  });

  // Serialize the data
  const serializedOpportunity = JSON.parse(JSON.stringify(opportunity));
  const serializedRelatedJobs = JSON.parse(JSON.stringify(relatedJobs));

  return <JobDetailClient opportunity={serializedOpportunity} relatedJobs={serializedRelatedJobs} />;
}