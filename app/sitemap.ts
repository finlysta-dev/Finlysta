import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.tryFinlysta.in'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/domains`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Finance domain pages
  const domainPages = [
    {
      url: `${baseUrl}/investment-banking-internships-india`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/equity-research-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fintech-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/financial-analyst-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ca-articleship-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/risk-compliance-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/corporate-finance-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio-management-internships`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Location pages
  const locations = ['mumbai', 'bangalore', 'delhi-ncr', 'pune', 'hyderabad', 'chennai', 'kolkata', 'remote']
  
  const locationPages = locations.map(location => ({
    url: `${baseUrl}/internships/location/${location}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  // Category pages
  const categories = [
    'investment-banking', 'equity-research', 'fintech', 
    'financial-analyst', 'ca-articleship', 'risk-compliance',
    'corporate-finance', 'portfolio-management'
  ]
  
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/internships/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  // Dynamic internship pages
  let internshipPages: MetadataRoute.Sitemap = []
  
  try {
    const internships = await prisma.internship.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      take: 1000,
    })

    internshipPages = internships.map((internship) => ({
      url: `${baseUrl}/internships/${internship.slug}`,
      lastModified: internship.updatedAt || new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching internships for sitemap:', error)
  }

  return [
    ...staticPages,
    ...domainPages,
    ...locationPages,
    ...categoryPages,
    ...internshipPages,
  ]
}
