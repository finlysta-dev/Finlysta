import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');
    const adminKey = searchParams.get('adminKey');
    
    const ADMIN_KEY = process.env.ADMIN_KEY || "finlysta_admin_2026";
    const isAdmin = adminKey === ADMIN_KEY;
    
    // Build where clause
    const where: any = {};
    
    // For non-admin, only show published and verified
    if (!isAdmin) {
      where.published = true;
      where.isVerified = true;
    }
    
    // Filter by type
    if (type && type !== 'all') {
      where.type = type;
    }
    
    console.log('🔍 Fetching with where:', where);
    
    const opportunities = await prisma.opportunity.findMany({
      where,
      orderBy: { postedAt: 'desc' },
      take: limit ? parseInt(limit) : 50,
    });
    
    console.log(`✅ Found ${opportunities.length} opportunities`);
    
    return NextResponse.json(opportunities);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}
