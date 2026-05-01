import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogSlug, sessionId, targetUrl, linkText, linkType } = body;
    
    if (!blogSlug || !targetUrl) {
      return NextResponse.json({ error: 'Blog slug and target URL required' }, { status: 400 });
    }
    
    // Find blog by slug (using CareerResource)
    const blog = await prisma.careerResource.findUnique({
      where: { slug: blogSlug }
    });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Record blog click
    await prisma.blogClick.create({
      data: {
        blogId: blog.id,
        sessionId: sessionId || null,
        targetUrl,
        linkText: linkText || null,
        linkType: linkType || 'external',
        clickedAt: new Date(),
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
          blogClicks: { increment: 1 }
        }
      });
    } else {
      await prisma.dailyStat.create({
        data: {
          date: today,
          totalVisitors: 0,
          totalViews: 0,
          totalClicks: 0,
          applications: 0,
          newSubscribers: 0,
          blogViews: 0,
          blogClicks: 1,
          uniqueBlogReaders: 0,
        }
      });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Blog click tracking error:', error);
    return NextResponse.json({ error: 'Failed to track blog click' }, { status: 500 });
  }
}