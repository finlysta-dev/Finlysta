import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import JobDetailClient from './JobDetailClient';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const opportunity = await prisma.opportunity.findFirst({
    where: {
      slug: params.slug,
      published: true,
      isVerified: true,
    },
  });

  if (!opportunity) {
    return {
      title: 'Job Not Found | Finlysta',
      description: 'The job you\'re looking for doesn\'t exist or has been removed.',
      robots: 'noindex, nofollow',
    };
  }

  const title = `${opportunity.title} at ${opportunity.company} | Finlysta`;
  
  let description = `Apply for ${opportunity.title} position at ${opportunity.company}.`;
  if (opportunity.location) description += ` Location: ${opportunity.location}.`;
  if (opportunity.experience) description += ` Experience: ${opportunity.experience}.`;
  if (opportunity.salary) description += ` Salary: ${opportunity.salary}.`;
  description += ` Entry-level financial analyst job in India.`;

  const keywords = [
    opportunity.title,
    opportunity.company,
    'finance jobs',
    'entry level finance',
    'financial analyst jobs India',
    'fresher jobs finance',
    opportunity.location,
    opportunity.skills?.slice(0, 3).join(', '),
  ].filter(Boolean).join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Finlysta' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Finlysta',
      url: `https://finlysta.com/jobs/${params.slug}`,
      images: [
        {
          url: opportunity.companyLogo || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${opportunity.title} at ${opportunity.company}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [opportunity.companyLogo || '/og-image.png'],
      creator: '@finlysta',
    },
    alternates: {
      canonical: `https://finlysta.com/jobs/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Fetch data for the page (for static generation if needed)
async function getOpportunity(slug: string) {
  const opportunity = await prisma.opportunity.findFirst({
    where: {
      slug: slug,
      published: true,
      isVerified: true,
    },
  });
  
  return opportunity;
}

// Page component
export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const opportunity = await getOpportunity(params.slug);
  
  if (!opportunity) {
    notFound();
  }
  
  // Pass data to client component for interactive features
  return <JobDetailClient initialOpportunity={opportunity} />;
}