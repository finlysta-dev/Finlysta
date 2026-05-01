import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { opportunityId, sessionId } = body;
    
    if (!opportunityId) {
      return NextResponse.json({ error: 'Opportunity ID required' }, { status: 400 });
    }
    
    // Record click
    await prisma.opportunityClick.create({
      data: {
        opportunityId: opportunityId,
        sessionId: sessionId || null,
        clickedAt: new Date(),
      }
    });
    
    // Update opportunity click count
    await prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        applyClicks: { increment: 1 }
      }
    });
    
    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingStat = await prisma.dailyStat.findUnique({
      where: { date: today }
    });
    
    if (existingStat) {
      await prisma.dailyStat.update({
        where: { date: today },
        data: {
          totalClicks: { increment: 1 }
        }
      });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Opportunity click tracking error:', error);
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}