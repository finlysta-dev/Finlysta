import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Fast lookup by slug - only published and verified
    const opportunity = await prisma.opportunity.findFirst({
      where: {
        slug: slug,
        published: true,
        isVerified: true,
      },
    });
    
    if (!opportunity) {
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }
    
    // Update view count (optional - can be done separately)
    await prisma.opportunity.update({
      where: { id: opportunity.id },
      data: { views: { increment: 1 } },
    });
    
    return NextResponse.json(opportunity);
    
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}