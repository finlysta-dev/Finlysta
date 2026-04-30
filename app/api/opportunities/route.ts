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
    
    // Return response with no-cache headers
    return NextResponse.json(opportunities, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}