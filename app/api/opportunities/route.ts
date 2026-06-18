import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');
    const adminKey = searchParams.get('adminKey');
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    const isAdmin = adminKey === ADMIN_KEY;
    
    // Build where clause for opportunities
    const opportunitiesWhere: any = {};
    
    // For non-admin, only show published and verified
    if (!isAdmin) {
      opportunitiesWhere.published = true;
      opportunitiesWhere.isVerified = true;
    }
    
    // Filter by type for opportunities
    if (type && type !== 'all') {
      opportunitiesWhere.type = type;
    }
    
    console.log('🔍 Fetching opportunities with where:', opportunitiesWhere);
    
    // Fetch opportunities
    const opportunities = await prisma.opportunity.findMany({
      where: opportunitiesWhere,
      orderBy: { postedAt: 'desc' },
      take: limit ? parseInt(limit) : 50,
    });
    
    // Build where clause for jobs
    const jobsWhere: any = {};
    
    // For non-admin, only show approved jobs
    if (!isAdmin) {
      jobsWhere.status = 'approved';
    }
    
    // Filter by type for jobs
    if (type && type !== 'all') {
      jobsWhere.type = type;
    }
    
    console.log('🔍 Fetching jobs with where:', jobsWhere);
    
    // Fetch jobs from jobs table
    const jobs = await prisma.job.findMany({
      where: jobsWhere,
      orderBy: { createdAt: 'desc' },
    });
    
    // Format jobs to match opportunity structure
    const formattedJobs = jobs.map(job => ({
      id: job.id,
      title: job.jobTitle,
      company: job.companyName,
      companyLogo: job.companyLogo,
      location: job.location,
      salary: job.salaryStipend,
      stipendAmount: null,
      duration: "Not specified",
      skills: job.skillsRequired || [],
      isActivelyHiring: job.isActivelyHiring || false,
      isVerified: true,
      isTrending: false,
      description: job.companyDescription || "",
      shortDescription: null,
      workMode: job.workMode || "Onsite",
      postedAt: job.createdAt,
      applyLink: job.externalLink || null,
      type: job.type || "job",
      experience: job.experienceRequired || null,
      views: job.views || 0,
      slug: job.slug,
      published: job.status === 'approved',
      status: job.status,
    }));
    
    // Combine and sort
    const allItems = [...opportunities, ...formattedJobs];
    const sortedItems = allItems.sort((a, b) => {
      const dateA = a.postedAt || new Date(0);
      const dateB = b.postedAt || new Date(0);
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    
    // Apply limit
    const finalItems = limit ? sortedItems.slice(0, parseInt(limit)) : sortedItems;
    
    console.log(`✅ Found ${opportunities.length} opportunities and ${jobs.length} jobs`);
    
    return NextResponse.json(finalItems);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}