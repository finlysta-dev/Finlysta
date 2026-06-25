import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import JobDetailClient from './JobDetailClient';

// Server Component - fetches data
export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  console.log("🔍 Looking for job with slug:", slug);
  
  const opportunity = await prisma.opportunity.findFirst({
    where: {
      slug: slug,
      published: true,
      isVerified: true,
    },
  });

  console.log("📊 Found opportunity:", opportunity ? opportunity.title : "NOT FOUND");

  if (!opportunity) {
    notFound();
  }

  // Increment view count in database (server-side)
  await prisma.opportunity.update({
    where: { id: opportunity.id },
    data: { views: { increment: 1 } },
  });

  // Fetch related jobs
  const relatedJobs = await prisma.opportunity.findMany({
    where: {
      type: opportunity.type,
      published: true,
      isVerified: true,
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