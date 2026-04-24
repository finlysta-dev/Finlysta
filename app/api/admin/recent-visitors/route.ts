import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    
    return NextResponse.json(visitors);
  } catch (error) {
    console.error('Error fetching recent visitors:', error);
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}
