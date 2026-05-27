import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch pending/approved opportunities for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const adminKey = searchParams.get("adminKey");
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    
    // Verify admin
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    let whereClause = {};
    
    if (status === "pending") {
      whereClause = { 
        published: false,
        isVerified: false
      };
    } else if (status === "approved") {
      whereClause = { 
        published: true,
        isVerified: true
      };
    }
    
    const opportunities = await prisma.opportunity.findMany({
      where: whereClause,
      orderBy: { postedAt: "desc" },
    });
    
    console.log(`📊 Found ${opportunities.length} ${status} opportunities`);
    
    return NextResponse.json({ opportunities });
    
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Approve or reject opportunity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { opportunityId, action, adminKey } = body;
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    
    // Verify admin
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!opportunityId || !action) {
      return NextResponse.json(
        { error: "opportunityId and action required" },
        { status: 400 }
      );
    }
    
    let updateData = {};
    
    if (action === "approve") {
      updateData = {
        published: true,
        isVerified: true,
        isNew: true,
        isActivelyHiring: true,
      };
    } else if (action === "reject") {
      updateData = {
        published: false,
        isVerified: false,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid action. Use 'approve' or 'reject'" },
        { status: 400 }
      );
    }
    
    const updated = await prisma.opportunity.update({
      where: { id: opportunityId },
      data: updateData,
    });
    
    console.log(`✅ ${action}d opportunity: ${updated.title}`);
    
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

// DELETE - Delete an opportunity (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const opportunityId = searchParams.get("opportunityId");
    const adminKey = searchParams.get("adminKey");
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    
    // Verify admin
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!opportunityId) {
      return NextResponse.json(
        { error: "opportunityId required" },
        { status: 400 }
      );
    }
    
    // Check if opportunity exists before deleting
    const existingOpportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
    });
    
    if (!existingOpportunity) {
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }
    
    // Delete the opportunity
    await prisma.opportunity.delete({
      where: { id: opportunityId },
    });
    
    console.log(`🗑️ Deleted opportunity: ${opportunityId} - ${existingOpportunity.title} at ${existingOpportunity.company}`);
    
    return NextResponse.json({
      message: "Opportunity deleted successfully",
      deletedOpportunity: {
        id: opportunityId,
        title: existingOpportunity.title,
        company: existingOpportunity.company
      }
    });
    
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
