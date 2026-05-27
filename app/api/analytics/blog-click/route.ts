import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogSlug, sessionId, targetUrl, linkText, linkType } = body;
    
    console.log('🖱️ Blog click received:', { blogSlug, targetUrl, linkText });
    
    // Find the CareerResource by slug
    const resource = await prisma.careerResource.findUnique({
      where: { slug: blogSlug }
    });

    if (!resource) {
      console.log('❌ Resource not found for click:', blogSlug);
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Create the blog click using raw query to avoid foreign key constraint
    await prisma.$executeRawUnsafe(
      `INSERT INTO "BlogClick" ("id", "blogId", "sessionId", "targetUrl", "linkText", "linkType", "clickedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      `click_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      resource.id,
      sessionId || 'unknown',
      targetUrl || '',
      linkText || '',
      linkType || 'internal',
      new Date()
    );

    console.log('✅ BlogClick created for:', resource.title);

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyStat.upsert({
      where: { date: today },
      update: { blogClicks: { increment: 1 } },
      create: {
        date: today,
        totalVisitors: 0, totalViews: 0, totalClicks: 0,
        applications: 0, newSubscribers: 0,
        blogViews: 0, blogClicks: 1, uniqueBlogReaders: 0,
      }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('❌ Blog click error:', error);
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}
