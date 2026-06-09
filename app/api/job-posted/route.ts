import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    
    console.log('🔍 API called with token:', token);
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided', success: false },
        { status: 400 }
      );
    }
    
    const job = await prisma.job.findUnique({
      where: { id: token },
      include: {
        recruiter: {
          select: {
            companyName: true,
            companyEmail: true,
            name: true,
            companyLogo: true,
          }
        },
        company: true,
        jobSkills: true,
      }
    });
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found', success: false },
        { status: 404 }
      );
    }
    
    const jobData = {
      id: job.id,
      title: job.jobTitle,
      company: job.company?.name || job.recruiter?.companyName || 'Company',
      companyLogo: job.company?.logo || job.recruiter?.companyLogo || null,
      location: job.location,
      type: job.hiringFor,
      workMode: job.workMode,
      experience: job.experienceRequired || 'Fresher',
      salary: job.salaryStipend,
      skills: job.skillsRequired,
      posterEmail: job.recruiter?.companyEmail || job.applicationEmail,
      posterName: job.recruiter?.name,
      status: job.status,
    };
    
    return NextResponse.json({
      success: true,
      job: jobData,
      status: job.status,
    });
    
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
