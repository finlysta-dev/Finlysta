import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
      console.log("Recruiter created:", recruiter.id);
    } else {
      console.log("Existing recruiter found:", recruiter.id);
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
      console.log("Company created:", company.id);
    } else {
      console.log("Existing company found:", company.id);
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

    // Add skills if any
    if (body.skillsRequired && body.skillsRequired.length > 0) {
      await prisma.jobSkill.createMany({
        data: body.skillsRequired.map((skill: string) => ({
          jobId: job.id,
          skillName: skill,
        })),
        skipDuplicates: true,
      });
      console.log("Skills added");
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

    // Return the job ID so frontend can redirect correctly
    return NextResponse.json(
      { 
        success: true,
        message: "Job posted successfully! We will review and add it to jobs page.",
        jobId: job.id,
        token: job.id,
        status: "pending"
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
    } else if (action === "reject") {
      updateData = {
        status: "rejected",
        showOnJobs: false,
      };
      console.log(`❌ Rejecting job: ${jobId}`);
    } else if (action === "review") {
      updateData = {
        status: "review",
      };
      console.log(`🔍 Setting job to review: ${jobId}`);
    } else if (action === "waiting") {
      updateData = {
        status: "waiting",
      };
      console.log(`⏳ Setting job to waiting: ${jobId}`);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    
    const updated = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
    });
    
    console.log(`✅ ${action}d job:`, updated.id, "status:", updated.status);
    
    return NextResponse.json({
      success: true,
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