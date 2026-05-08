import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to generate clean slug
function generateSlug(title: string, company: string, location: string): string {
  // Clean company name (remove special characters, convert to lowercase)
  const cleanCompany = company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Clean job title
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Clean location (take first part before comma)
  const cleanLocation = location
    .toLowerCase()
    .split(',')[0]
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Combine: company-title-location
  let slug = `${cleanCompany}-${cleanTitle}-${cleanLocation}`;
  
  // Remove multiple hyphens
  slug = slug.replace(/-+/g, '-');
  
  // Limit length
  if (slug.length > 90) {
    slug = slug.substring(0, 90).replace(/-$/, '');
  }
  
  return slug;
}

// GET - Fetch opportunities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');
    const slug = searchParams.get('slug');
    
    // If fetching single opportunity by slug
    if (slug) {
      const opportunity = await prisma.opportunity.findFirst({
        where: {
          slug: slug,
          published: true,
          isVerified: true,
        },
      });
      
      if (!opportunity) {
        return NextResponse.json(
          { error: 'Opportunity not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(opportunity);
    }
    
    // Otherwise fetch list
    const where: any = {
      published: true,
      isVerified: true,
    };
    
    if (type && type !== 'all') {
      where.type = type;
    }
    
    const opportunities = await prisma.opportunity.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        company: true,
        companyLogo: true,
        type: true,
        workMode: true,
        location: true,
        experience: true,
        salary: true,
        skills: true,
        isVerified: true,
        isNew: true,
        isActivelyHiring: true,
        postedAt: true,
      },
      orderBy: { postedAt: 'desc' },
      take: limit ? parseInt(limit) : 50,
    });
    
    return NextResponse.json(opportunities);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

// POST - Create new opportunity (for job submissions)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const required = ['company', 'title', 'location', 'applyLink', 'email'];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Generate slug
    let baseSlug = generateSlug(body.title, body.company, body.location);
    let slug = baseSlug;
    let counter = 1;
    
    // Check for duplicate slugs
    while (true) {
      const existing = await prisma.opportunity.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Process skills
    const skillsArray = body.skills 
      ? (Array.isArray(body.skills) ? body.skills : body.skills.split(',').map((s: string) => s.trim()))
      : [];
    
    // Create opportunity
    const opportunity = await prisma.opportunity.create({
      data: {
        slug,  // ← This is the important field!
        title: body.title,
        company: body.company,
        companyLogo: body.companyLogo || null,
        aboutCompany: body.aboutCompany || null,
        type: body.type || 'job',
        workMode: body.workMode || 'onsite',
        location: body.location,
        experience: body.type === 'job' ? (body.experience || '0-2 years') : null,
        duration: body.type === 'internship' ? (body.duration || '3-6 months') : null,
        salary: body.salary || 'Competitive',
        skills: skillsArray,
        overview: body.overview || null,
        responsibilities: body.responsibilities || null,
        qualifications: body.qualifications || null,
        benefits: body.benefits || null,
        applyLink: body.applyLink,
        deadline: body.deadline ? new Date(body.deadline) : null,
        isVerified: false,
        published: false,
        isNew: true,
        isActivelyHiring: true,
        postedAt: new Date(),
      },
    });
    
    console.log('✅ Created opportunity with slug:', slug);
    
    return NextResponse.json(
      {
        message: 'Job submitted successfully',
        slug: opportunity.slug,
        id: opportunity.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}