// app/blogs/[slug]/page.tsx
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogPostClient from './BlogPostClient';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const resource = await prisma.careerResource.findUnique({
    where: { slug: params.slug },
  });

  if (!resource || !resource.published) {
    return {
      title: "Blog Post Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    resource.shortDescription || resource.excerpt || `Read ${resource.title} on Finlysta.`;
  const url = `https://finlysta.com/blogs/${resource.slug}`;
  const image = resource.coverImage || "https://finlysta.com/og-image.png";

  return {
    title: resource.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${resource.title} | Finlysta`,
      description,
      url,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: resource.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} | Finlysta`,
      description,
      images: [image],
    },
  };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const resource = await prisma.careerResource.findUnique({
    where: { slug: params.slug },
  });

  const articleSchema = resource
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: resource.title,
        description: resource.shortDescription || resource.excerpt || undefined,
        image: resource.coverImage || "https://finlysta.com/og-image.png",
        datePublished: resource.createdAt?.toISOString?.() ?? resource.createdAt,
        dateModified: resource.updatedAt?.toISOString?.() ?? resource.updatedAt,
        author: { "@type": "Organization", name: "Finlysta" },
        publisher: {
          "@type": "Organization",
          name: "Finlysta",
          logo: { "@type": "ImageObject", url: "https://finlysta.com/og-image.png" },
        },
        mainEntityOfPage: `https://finlysta.com/blogs/${resource.slug}`,
      }
    : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <BlogPostClient params={params} />
    </>
  );
}
