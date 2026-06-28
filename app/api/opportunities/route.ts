import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');
    
    // Build where clause
    const where: any = {
      published: true,
      isVerified: true,
    };
    
    // Filter by type if provided
    if (type && type !== 'all') {
      where.type = type;
    }
    
    console.log('🔍 Fetching opportunities with where:', where);
    
    // Fetch opportunities
    const opportunities = await prisma.opportunity.findMany({
      where: where,
      orderBy: { postedAt: 'desc' },
      take: limit ? parseInt(limit) : 50,
    });
    
    console.log(`✅ Found ${opportunities.length} opportunities`);
    
    return NextResponse.json(opportunities);
    
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}