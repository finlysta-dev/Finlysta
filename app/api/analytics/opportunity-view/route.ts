import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, sessionId } = body;
    
    if (!slug) {
      return NextResponse.json({ error: 'Opportunity slug required' }, { status: 400 });
    }
    
    // Find opportunity by slug
    const opportunity = await prisma.opportunity.findUnique({
      where: { slug: slug }
    });
    
    if (!opportunity) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }
    
    // Record view
    await prisma.opportunityView.create({
      data: {
        opportunityId: opportunity.id,
        sessionId: sessionId || null,
        viewedAt: new Date(),
      }
    });
    
    // Update opportunity view count
    await prisma.opportunity.update({
      where: { id: opportunity.id },
      data: {
        views: { increment: 1 }
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
          totalViews: { increment: 1 }
        }
      });
    }
    
    return NextResponse.json({ success: true, views: opportunity.views + 1 });
    
  } catch (error) {
    console.error('Opportunity view tracking error:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}