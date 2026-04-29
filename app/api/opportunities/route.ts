import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const type = url.searchParams.get('type');
    
    // Build the where clause
    const where: any = {
      published: true
    };
    
    // Apply type filter if provided
    if (type && type !== 'all') {
      where.type = type;
    }
    
    console.log('Fetching from Opportunity table with where:', where);
    
    const opportunities = await prisma.opportunity.findMany({
      where,
      orderBy: {
        postedAt: 'desc'  // Using postedAt from Opportunity table
      },
      take: limit ? parseInt(limit) : 50
    });
    
    console.log(`Found ${opportunities.length} opportunities`);
    
    return NextResponse.json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}