// app/jobs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import JobDetailClient from './JobDetailClient';

// Dynamic metadata per job page
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const opportunity = await prisma.opportunity.findFirst({
    where: { slug: params.slug, published: true },
  });

  if (!opportunity) {
    return {
      title: "Job Not Found",
      description: "This job listing is no longer available.",
      robots: { index: false, follow: false },
    };
  }

  const location = opportunity.city
    ? `${opportunity.city}, India`
    : "India";

  const experience = (opportunity as any).experience || "0–2 years";

  const title = `${opportunity.title} at ${opportunity.company}`;
  const description = `Apply for ${opportunity.title} at ${opportunity.company} in ${location}. ${experience} experience required. Entry-level finance role for freshers. Apply free on Finlysta.`;
  const url = `https://finlysta.com/jobs/${opportunity.slug}`;

  return {
    title,
    description,
    keywords: [
      opportunity.title,
      opportunity.company,
      "finance jobs India",
      "entry level finance",
      "fresher finance jobs",
      location,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Finlysta`,
      description,
      url,
      siteName: "Finlysta",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: (opportunity as any).companyLogo || "/Finlysta.png",
          width: 1200,
          height: 630,
          alt: `${opportunity.title} at ${opportunity.company}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Finlysta`,
      description,
      images: [(opportunity as any).companyLogo || "/Finlysta.png"],
      site: "@Finlysta",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  };
}

// Server Component - fetches data
export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  let opportunity = await prisma.opportunity.findFirst({
    where: { slug, published: true, isVerified: true },
  });

  if (!opportunity) {
    opportunity = await prisma.opportunity.findFirst({
      where: { slug, published: true },
    });
  }

  if (!opportunity) notFound();

  // Increment view count
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
      slug: { not: slug },
      id: { not: opportunity.id },
    },
    take: 3,
    orderBy: { postedAt: 'desc' },
  });

  // JobPosting structured data for Google Jobs rich results
  const location = (opportunity as any).city
    ? `${(opportunity as any).city}, India`
    : "India";

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opportunity.title,
    description: (opportunity as any).overview || (opportunity as any).shortDescription || `${opportunity.title} at ${opportunity.company}`,
    hiringOrganization: {
      "@type": "Organization",
      name: opportunity.company,
      ...((opportunity as any).companyLogo && { logo: (opportunity as any).companyLogo }),
      sameAs: `https://finlysta.com/jobs?search=${encodeURIComponent(opportunity.company)}`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: (opportunity as any).city || "India",
        addressRegion: (opportunity as any).state || "",
        addressCountry: "IN",
      },
    },
    ...((opportunity as any).workMode?.toLowerCase().includes("remote") && {
      jobLocationType: "TELECOMMUTE",
    }),
    employmentType:
      opportunity.type === "job" ? "FULL_TIME" :
      opportunity.type === "internship" ? "INTERN" : "FULL_TIME",
    datePosted: (opportunity as any).postedAt
      ? new Date((opportunity as any).postedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    url: `https://finlysta.com/jobs/${opportunity.slug}`,
    ...((opportunity as any).salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: {
          "@type": "QuantitativeValue",
          description: (opportunity as any).salary,
        },
      },
    }),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
  };

  const serializedOpportunity = JSON.parse(JSON.stringify(opportunity));
  const serializedRelatedJobs = JSON.parse(JSON.stringify(relatedJobs));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <JobDetailClient
        opportunity={serializedOpportunity}
        relatedJobs={serializedRelatedJobs}
      />
    </>
  );
}