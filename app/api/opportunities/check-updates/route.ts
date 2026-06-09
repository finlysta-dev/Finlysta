// app/api/opportunities/check-updates/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

let lastCheckTime = new Date();

export async function GET() {
  try {
    const now = new Date();
    
    // Check for recently approved opportunities
    const opportunities = await prisma.opportunity.count({
      where: {
        status: 'approved',
        updatedAt: {
          gt: lastCheckTime
        }
      }
    });
    
    // Check for recently approved jobs
    const jobs = await prisma.job.count({
      where: {
        status: 'approved',
        updatedAt: {
          gt: lastCheckTime
        }
      }
    });
    
    const hasUpdates = opportunities > 0 || jobs > 0;
    
    lastCheckTime = now;
    
    return NextResponse.json({ hasUpdates });
  } catch (error) {
    console.error('Error checking for updates:', error);
    return NextResponse.json({ hasUpdates: false }, { status: 500 });
  }
}