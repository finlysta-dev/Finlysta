import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('========================================');
    console.log('JOB POST API CALLED');
    console.log('Received data:', JSON.stringify(body, null, 2));
    console.log('========================================');

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
      console.log('Creating new recruiter...');
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
      console.log('Recruiter created:', recruiter.id);
    } else {
      console.log('Existing recruiter found:', recruiter.id);
    }

    // 2. Create or find Company
    let company = await prisma.company.findFirst({
      where: { 
        OR: [
          { email: companyEmail },
          { name: companyName }
        ]
      }
    });

    if (!company) {
      console.log('Creating new company...');
      company = await prisma.company.create({
        data: {
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
      console.log('Company created:', company.id);
    } else {
      console.log('Existing company found:', company.id);
    }

    // 3. Generate unique slug
    const baseSlug = jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${baseSlug}-${Date.now()}`;

    // 4. Create Job with all fields
    console.log('Creating job with data:', {
      slug,
      recruiterId: recruiter.id,
      companyId: company.id,
      jobTitle,
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
      additionalInstructions: additionalInstructions || null,
      isGenuine: confirmGenuine || false,
      termsAccepted: confirmTerms || false,
      status: 'pending',
      showOnTrending: false,
      showOnJobs: true,
    });

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
    console.log('Job created successfully with ID:', job.id);

    // 5. Add skills if any
    if (skillsRequired && skillsRequired.length > 0) {
      console.log('Adding skills:', skillsRequired);
      await prisma.jobSkill.createMany({
        data: skillsRequired.map((skill: string) => ({
          jobId: job.id,
          skillName: skill,
        })),
        skipDuplicates: true,
      });
      console.log('Skills added successfully');
    }

    // 6. Create company-job relation
    await prisma.companyJob.create({
      data: {
        companyId: company.id,
        jobId: job.id,
        status: "active",
      }
    });
    console.log('CompanyJob relation created');

    // 7. Create recruiter-job relation
    await prisma.recruiterJob.create({
      data: {
        recruiterId: recruiter.id,
        jobId: job.id,
        status: "active",
      }
    });
    console.log('RecruiterJob relation created');

    console.log('========================================');
    console.log('JOB POST SUCCESSFUL!');
    console.log('========================================');

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