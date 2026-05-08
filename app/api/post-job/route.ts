import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📝 Received submission:", body);

    // Validate required fields
    const requiredFields = ["company", "role", "location", "applyLink", "email", "howDidYouHear"];
    for (const field of requiredFields) {
      if (!body[field] || !body[field].trim()) {
        console.log(`❌ Missing field: ${field}`);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate slug
    const slug = `${body.role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${body.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    console.log("🔗 Generated slug:", slug);

    // Create opportunity - FORCE published: false and isVerified: false
    const opportunity = await prisma.opportunity.create({
      data: {
        slug: slug,
        title: body.role,
        company: body.company,
        type: body.type === "Internship" ? "internship" : "job",
        workMode: body.location.toLowerCase().includes("remote") ? "remote" : 
                  body.location.toLowerCase().includes("hybrid") ? "hybrid" : "onsite",
        location: body.location,
        experience: body.type === "Job" ? (body.experience || "0-2 years") : null,
        duration: body.type === "Internship" ? (body.duration || "3-6 months") : null,
        salary: body.salary || "Competitive",
        skills: [],
        overview: body.description || null,
        applyLink: body.applyLink,
        // CRITICAL: These MUST be false for pending approval
        isVerified: false,
        published: false,  // ← This makes it pending
        isNew: true,
        isActivelyHiring: true,
        postedAt: new Date(),
      },
    });

    console.log("✅ Created opportunity:", {
      id: opportunity.id,
      title: opportunity.title,
      published: opportunity.published,
      isVerified: opportunity.isVerified
    });

    return NextResponse.json(
      { 
        message: "Job submitted successfully for review",
        opportunityId: opportunity.id,
        status: "pending_review"
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
      whereClause = { 
        published: false,
        isVerified: false 
      };
      console.log("🔍 Fetching pending opportunities with where:", whereClause);
    } else if (isAdmin && status === "approved") {
      whereClause = { 
        published: true, 
        isVerified: true 
      };
    } else if (!isAdmin) {
      whereClause = { 
        published: true, 
        isVerified: true 
      };
    }
    
    const opportunities = await prisma.opportunity.findMany({
      where: whereClause,
      orderBy: { postedAt: "desc" },
      take: isAdmin && status === "pending" ? 100 : 20,
    });
    
    console.log(`📊 Found ${opportunities.length} opportunities with status: ${status}`);
    
    return NextResponse.json({ opportunities });
    
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { opportunityId, action, adminKey } = body;
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    let updateData: any = {};
    
    if (action === "approve") {
      updateData = {
        published: true,
        isVerified: true,
        isNew: true,
        isActivelyHiring: true,
      };
      console.log(`✅ Approving opportunity: ${opportunityId}`);
    } else if (action === "reject") {
      updateData = {
        published: false,
        isVerified: false,
      };
      console.log(`❌ Rejecting opportunity: ${opportunityId}`);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    
    const updated = await prisma.opportunity.update({
      where: { id: opportunityId },
      data: updateData,
    });
    
    console.log(`✅ ${action}d opportunity:`, updated.id, "published:", updated.published);
    
    return NextResponse.json({
      message: `Opportunity ${action}d successfully`,
      opportunity: updated,
    });
    
  } catch (error) {
    console.error("Error updating opportunity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}