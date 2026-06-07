// app/api/jobs/post/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('========================================');
    console.log('JOB POST API CALLED');
    console.log('Received data:', JSON.stringify(body, null, 2));
    console.log('========================================');

    // Create or find Recruiter
    let recruiter = await prisma.recruiter.findFirst({
      where: { 
        OR: [
          { email: body.companyEmail },
          { companyName: body.companyName }
        ]
      }
    });

    if (!recruiter) {
      console.log('Creating new recruiter...');
      recruiter = await prisma.recruiter.create({
        data: {
          email: body.companyEmail,
          name: body.recruiterName || 'Recruiter',
          companyName: body.companyName,
          companyLogo: body.companyLogo || null,
          companyWebsite: body.companyWebsite || null,
          companyLinkedin: body.companyLinkedin || null,
          companyDescription: body.companyDescription || null,
          recruiterContact: body.recruiterContact || null,
          isVerified: false,
          isActive: true,
          role: "RECRUITER",
        }
      });
      console.log('Recruiter created:', recruiter.id);
    }

    // Create or find Company
    let company = await prisma.company.findFirst({
      where: { 
        OR: [
          { email: body.companyEmail },
          { name: body.companyName }
        ]
      }
    });

    if (!company) {
      console.log('Creating new company...');
      company = await prisma.company.create({
        data: {
          name: body.companyName,
          logo: body.companyLogo || null,
          website: body.companyWebsite || null,
          linkedinUrl: body.companyLinkedin || null,
          email: body.companyEmail,
          description: body.companyDescription || null,
          isVerified: false,
          isActive: true,
        }
      });
      console.log('Company created:', company.id);
    }

    // Generate unique slug
    const baseSlug = body.jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${baseSlug}-${Date.now()}`;

    // Create Job
    console.log('Creating job...');
    const job = await prisma.job.create({
      data: {
        slug,
        recruiterId: recruiter.id,
        companyId: company.id,
        jobTitle: body.jobTitle,
        hiringFor: body.hiringFor || 'Internship',
        jobType: body.jobType || null,
        workMode: body.workMode || null,
        location: body.location || 'Remote',
        numberOfOpenings: Number(body.numberOfOpenings) || 1,
        salaryStipend: body.salaryStipend || 'Not Disclosed',
        applicationDeadline: body.applicationDeadline ? new Date(body.applicationDeadline) : null,
        joiningTimeline: body.joiningTimeline || null,
        isFresherSuitable: true,
        eligibleEducation: body.eligibleEducation || null,
        graduationYear: body.graduationYear || null,
        experienceRequired: body.experienceRequired || null,
        skillsRequired: body.skillsRequired || [],
        responsibilities: body.responsibilities,
        requirements: body.requirements,
        niceToHave: body.niceToHave || null,
        whyJoinTeam: body.whyJoinTeam || null,
        applicationProcess: body.applicationProcess || 'finlysta',
        applicationEmail: body.applicationEmail || body.companyEmail,
        externalLink: body.externalLink || null,
        additionalInstructions: body.additionalInstructions || null,
        isGenuine: body.confirmGenuine || false,
        termsAccepted: body.confirmTerms || false,
        status: 'pending',
        showOnTrending: false,
        showOnJobs: true,
      }
    });
    console.log('Job created:', job.id);

    // Add skills
    if (body.skillsRequired && body.skillsRequired.length > 0) {
      console.log('Adding skills...');
      await prisma.jobSkill.createMany({
        data: body.skillsRequired.map((skill: string) => ({
          jobId: job.id,
          skillName: skill,
        })),
        skipDuplicates: true,
      });
    }

    // Create relations
    await prisma.companyJob.create({
      data: {
        companyId: company.id,
        jobId: job.id,
        status: "active",
      }
    });

    await prisma.recruiterJob.create({
      data: {
        recruiterId: recruiter.id,
        jobId: job.id,
        status: "active",
      }
    });

    console.log('========================================');
    console.log('JOB POST SUCCESSFUL!');
    console.log('========================================');

    return NextResponse.json({
      success: true,
      message: "Job posted successfully! We'll review and publish it within 24 hours.",
      job: {
        id: job.id,
        slug: job.slug,
        title: job.jobTitle,
        status: job.status,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('========================================');
    console.error('JOB POST ERROR:', error);
    console.error('========================================');
    
    return NextResponse.json(
      { 
        error: 'Failed to post job. Please try again.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}