import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    console.log("🔍 API - Looking for job with slug:", slug);
    
    const opportunity = await prisma.opportunity.findFirst({
      where: {
        slug: slug,
        published: true,
        isVerified: true,
      },
    });
    
    console.log("📊 Found opportunity:", opportunity ? opportunity.title : "NOT FOUND");
    
    if (!opportunity) {
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }
    
    // Update view count
    try {
      await prisma.opportunity.update({
        where: { id: opportunity.id },
        data: { views: { increment: 1 } },
      });
    } catch (viewError) {
      console.error("Error updating views:", viewError);
    }
    
    return NextResponse.json(opportunity);
    
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}