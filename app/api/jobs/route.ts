import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUUID, generateSlug } from "@/lib/utils";

// =============================================
// POST - Create a new job
// =============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📝 Received submission:", body);

    // Validate required fields
    const requiredFields = ["companyName", "jobTitle", "location", "companyEmail", "responsibilities", "requirements"];
    for (const field of requiredFields) {
      if (!body[field] || !body[field].toString().trim()) {
        console.log(`❌ Missing field: ${field}`);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate slug for job
    const slug = `${body.jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    console.log("🔗 Generated slug:", slug);

    // Generate unique token for the opportunity (for recruiter access)
    const posterToken = generateUUID();
    console.log("🔑 Generated posterToken:", posterToken);

    // First, find or create recruiter separately
    let recruiter = await prisma.recruiter.findFirst({
      where: {
        OR: [
          { email: body.companyEmail },
          { companyEmail: body.companyEmail }
        ]
      }
    });

    if (!recruiter) {
      console.log("Creating new recruiter...");
      recruiter = await prisma.recruiter.create({
        data: {
          email: body.companyEmail,
          name: body.recruiterName || "Recruiter",
          companyName: body.companyName,
          companyLogo: body.companyLogo || null,
          companyWebsite: body.companyWebsite || null,
          companyLinkedin: body.companyLinkedin || null,
          companyDescription: body.companyDescription || null,
          companyEmail: body.companyEmail,
          recruiterContact: body.recruiterContact || null,
          isVerified: false,
          isActive: true,
          role: "RECRUITER",
        }
      });
      console.log("✅ Recruiter created:", recruiter.id);
    } else {
      console.log("✅ Existing recruiter found:", recruiter.id);
    }

    // Second, find or create company separately
    let company = await prisma.company.findFirst({
      where: {
        OR: [
          { email: body.companyEmail },
          { name: body.companyName }
        ]
      }
    });

    if (!company) {
      console.log("Creating new company...");
      const companySlug = body.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      company = await prisma.company.create({
        data: {
          slug: companySlug,
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
      console.log("✅ Company created:", company.id);
    } else {
      console.log("✅ Existing company found:", company.id);
    }

    // Third, create the job
    const job = await prisma.job.create({
      data: {
        slug: slug,
        recruiterId: recruiter.id,
        companyId: company.id,
        jobTitle: body.jobTitle,
        hiringFor: body.hiringFor || "Internship",
        jobType: body.jobType || null,
        workMode: body.workMode || null,
        location: body.location,
        numberOfOpenings: Number(body.numberOfOpenings) || 1,
        salaryStipend: body.salaryStipend || "Not Disclosed",
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
        applicationProcess: body.applicationProcess || "finlysta",
        applicationEmail: body.applicationEmail || body.companyEmail,
        externalLink: null,
        additionalInstructions: body.additionalInstructions || null,
        isGenuine: body.confirmGenuine || false,
        termsAccepted: body.confirmTerms || false,
        status: "pending",
        showOnTrending: false,
        showOnJobs: true,
      }
    });

    console.log("✅ Created job:", {
      id: job.id,
      title: job.jobTitle,
      status: job.status
    });

    // 🆕 Create an Opportunity entry for the success page (with token for recruiter access)
    const opportunity = await prisma.opportunity.create({
      data: {
        slug: slug + "-opp",
        title: job.jobTitle,
        company: body.companyName,
        companyLogo: body.companyLogo || null,
        aboutCompany: body.companyDescription || null,
        type: body.jobType || "Full-time",
        workMode: body.workMode || "On-site",
        location: body.location,
        experience: body.experienceRequired || "Not specified",
        duration: null,
        salary: body.salaryStipend || null,
        skills: body.skillsRequired || [],
        overview: body.responsibilities?.substring(0, 500) || null,
        responsibilities: body.responsibilities || null,
        qualifications: body.requirements || null,
        benefits: body.niceToHave || null,
        applyLink: `/jobs/${job.id}`,
        isNew: true,
        isVerified: false,
        isTrending: false,
        isActivelyHiring: true,
        published: true,
        postedAt: new Date(),
        views: 0,
        applyClicks: 0,
        posterToken: posterToken,
        posterEmail: body.companyEmail,
        posterName: body.recruiterName || null,
        posterPhone: body.recruiterContact || null,
        companyWebsite: body.companyWebsite || null,
      },
    });

    console.log("✅ Created opportunity with token:", {
      id: opportunity.id,
      posterToken: opportunity.posterToken,
      title: opportunity.title,
    });

    // 🔍 VERIFICATION - Fetch back the opportunity to confirm it was saved
    const verifyOpportunity = await prisma.opportunity.findUnique({
      where: { id: opportunity.id }
    });
    console.log("🔍 VERIFICATION - Opportunity saved:", verifyOpportunity ? "✅ YES" : "❌ NO");
    console.log("🔍 VERIFICATION - Token in DB:", verifyOpportunity?.posterToken);
    console.log("🔍 VERIFICATION - Token from variable:", posterToken);
    console.log("🔍 VERIFICATION - Match:", verifyOpportunity?.posterToken === posterToken ? "✅ YES" : "❌ NO");

    // Add skills if any
    if (body.skillsRequired && body.skillsRequired.length > 0) {
      await prisma.jobSkill.createMany({
        data: body.skillsRequired.map((skill: string) => ({
          jobId: job.id,
          skillName: skill,
        })),
        skipDuplicates: true,
      });
      console.log("✅ Skills added");
    }

    // Create company-job relation
    await prisma.companyJob.create({
      data: {
        companyId: company.id,
        jobId: job.id,
        status: "active",
      }
    });

    // Create recruiter-job relation
    await prisma.recruiterJob.create({
      data: {
        recruiterId: recruiter.id,
        jobId: job.id,
        status: "active",
      }
    });

    // Return the token along with job data for the success page
    return NextResponse.json(
      { 
        message: "Job posted successfully! We will review and add it to jobs page.",
        jobId: job.id,
        opportunityId: opportunity.id,
        posterToken: posterToken,
        status: "pending",
        jobData: {
          id: job.id,
          title: job.jobTitle,
          company: body.companyName,
          location: body.location,
          type: body.jobType || "Full-time",
          experience: body.experienceRequired || "Fresher",
          salary: body.salaryStipend,
          skills: body.skillsRequired || [],
          posterEmail: body.companyEmail,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Error submitting job:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}

// =============================================
// GET - Fetch jobs
// =============================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const adminKey = searchParams.get("adminKey");
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    const isAdmin = adminKey === ADMIN_KEY;
    
    console.log("📋 GET request - status:", status, "isAdmin:", isAdmin);
    
    let whereClause: any = {};
    
    if (isAdmin && status === "pending") {
      whereClause = { status: "pending" };
    } else if (isAdmin && status === "approved") {
      whereClause = { status: "approved" };
    } else if (!isAdmin) {
      whereClause = { status: "approved", showOnJobs: true };
    }
    
    const jobs = await prisma.job.findMany({
      where: whereClause,
      include: {
        recruiter: {
          select: {
            companyName: true,
            companyLogo: true,
          }
        },
        company: true,
        jobSkills: true,
      },
      orderBy: { createdAt: "desc" },
      take: isAdmin && status === "pending" ? 100 : 20,
    });
    
    console.log(`📊 Found ${jobs.length} jobs`);
    
    return NextResponse.json({ jobs });
    
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// =============================================
// PUT - Update job status (approve/reject)
// =============================================
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, action, adminKey } = body;
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    let updateData: any = {};
    
    if (action === "approve") {
      updateData = {
        status: "approved",
        showOnJobs: true,
        approvedAt: new Date(),
        publishedAt: new Date(),
      };
      console.log(`✅ Approving job: ${jobId}`);
      
      // Also update the corresponding opportunity
      await prisma.opportunity.updateMany({
        where: { title: body.jobTitle, company: body.companyName },
        data: { isVerified: true, published: true }
      });
      
    } else if (action === "reject") {
      updateData = {
        status: "rejected",
        showOnJobs: false,
      };
      console.log(`❌ Rejecting job: ${jobId}`);
      
      // Also update the corresponding opportunity
      await prisma.opportunity.updateMany({
        where: { title: body.jobTitle, company: body.companyName },
        data: { published: false }
      });
      
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    
    const updated = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
    });
    
    console.log(`✅ ${action}d job:`, updated.id, "status:", updated.status);
    
    return NextResponse.json({
      message: `Job ${action}d successfully`,
      job: updated,
    });
    
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}