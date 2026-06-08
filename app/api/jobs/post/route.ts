import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('JOB POST API CALLED');
    console.log('Received data:', JSON.stringify(body, null, 2));

    const {
      companyName,
      companyLogo,
      companyWebsite,
      companyEmail,
      companyLinkedin,
      companyDescription,
      recruiterName,
      recruiterContact,
      jobTitle,
      hiringFor,
      jobType,
      workMode,
      location,
      numberOfOpenings,
      salaryStipend,
      applicationDeadline,
      joiningTimeline,
      eligibleEducation,
      graduationYear,
      experienceRequired,
      skillsRequired,
      responsibilities,
      requirements,
      niceToHave,
      whyJoinTeam,
      applicationProcess,
      applicationEmail,
      additionalInstructions,
      confirmGenuine,
      confirmTerms,
    } = body;

    // Validate required fields
    if (!companyName || !companyEmail || !jobTitle || !responsibilities || !requirements) {
      return NextResponse.json(
        { error: 'Missing required fields. Please fill all required fields.' },
        { status: 400 }
      );
    }

    // 1. Create or find Recruiter
    let recruiter = await prisma.recruiter.findFirst({
      where: { 
        OR: [
          { email: companyEmail },
          { companyName: companyName }
        ]
      }
    });

    if (!recruiter) {
      recruiter = await prisma.recruiter.create({
        data: {
          email: companyEmail,
          name: recruiterName || 'Recruiter',
          companyName: companyName,
          companyLogo: companyLogo || null,
          companyWebsite: companyWebsite || null,
          companyLinkedin: companyLinkedin || null,
          companyDescription: companyDescription || null,
          companyEmail: companyEmail,
          recruiterContact: recruiterContact || null,
          isVerified: false,
          isActive: true,
          role: "RECRUITER",
        }
      });
    }

    // 2. Create or find Company (with required slug field)
    let company = await prisma.company.findFirst({
      where: { 
        OR: [
          { email: companyEmail },
          { name: companyName }
        ]
      }
    });

    if (!company) {
      // Generate a unique slug for the company
      const companySlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      
      company = await prisma.company.create({
        data: {
          slug: companySlug,
          name: companyName,
          logo: companyLogo || null,
          website: companyWebsite || null,
          linkedinUrl: companyLinkedin || null,
          email: companyEmail,
          description: companyDescription || null,
          isVerified: false,
          isActive: true,
        }
      });
    }

    // 3. Generate unique slug for job
    const baseSlug = jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${baseSlug}-${Date.now()}`;

    // 4. Create Job
    const job = await prisma.job.create({
      data: {
        slug,
        recruiterId: recruiter.id,
        companyId: company.id,
        jobTitle: jobTitle,
        hiringFor: hiringFor || 'Internship',
        jobType: jobType || null,
        workMode: workMode || null,
        location: location || 'Remote',
        numberOfOpenings: Number(numberOfOpenings) || 1,
        salaryStipend: salaryStipend || 'Not Disclosed',
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
        joiningTimeline: joiningTimeline || null,
        isFresherSuitable: true,
        eligibleEducation: eligibleEducation || null,
        graduationYear: graduationYear || null,
        experienceRequired: experienceRequired || null,
        skillsRequired: skillsRequired || [],
        responsibilities: responsibilities,
        requirements: requirements,
        niceToHave: niceToHave || null,
        whyJoinTeam: whyJoinTeam || null,
        applicationProcess: applicationProcess || 'finlysta',
        applicationEmail: applicationEmail || companyEmail,
        externalLink: null,
        additionalInstructions: additionalInstructions || null,
        isGenuine: confirmGenuine || false,
        termsAccepted: confirmTerms || false,
        status: 'pending',
        showOnTrending: false,
        showOnJobs: true,
      }
    });

    // 5. Add skills if any
    if (skillsRequired && skillsRequired.length > 0) {
      await prisma.jobSkill.createMany({
        data: skillsRequired.map((skill: string) => ({
          jobId: job.id,
          skillName: skill,
        })),
        skipDuplicates: true,
      });
    }

    // 6. Create company-job relation
    await prisma.companyJob.create({
      data: {
        companyId: company.id,
        jobId: job.id,
        status: "active",
      }
    });

    // 7. Create recruiter-job relation
    await prisma.recruiterJob.create({
      data: {
        recruiterId: recruiter.id,
        jobId: job.id,
        status: "active",
      }
    });

    return NextResponse.json({
      success: true,
      message: "Job posted successfully! We'll review and add it to jobs page.",
      job: {
        id: job.id,
        slug: job.slug,
        title: job.jobTitle,
        status: job.status,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('JOB POST ERROR:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to post job. Please try again.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}