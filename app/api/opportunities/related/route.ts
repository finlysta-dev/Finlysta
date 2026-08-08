import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const type = searchParams.get('type');
    
    if (!jobId) {
      return NextResponse.json({ error: 'jobId required' }, { status: 400 });
    }
    
    const related = await prisma.opportunity.findMany({
      where: {
        id: { not: jobId },
        type: type || undefined,
        published: true,
        isVerified: true,
      },
      take: 3,
      orderBy: { postedAt: 'desc' },
    });
    
    return NextResponse.json(related);
  } catch (error) {
    console.error('Error fetching related jobs:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
