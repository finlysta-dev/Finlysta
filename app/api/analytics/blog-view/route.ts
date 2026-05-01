import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogSlug, sessionId, pageUrl } = body;
    
    if (!blogSlug) {
      return NextResponse.json({ error: 'Blog slug required' }, { status: 400 });
    }
    
    // Find blog by slug using CareerResource
    const blog = await prisma.careerResource.findUnique({
      where: { slug: blogSlug }
    });
    
    if (!blog) {
      console.log('Blog not found:', blogSlug);
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    // Check if already viewed in last hour (prevent duplicate counting)
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    
    const existingView = await prisma.blogView.findFirst({
      where: {
        sessionId: sessionId || null,
        viewedAt: {
          gte: oneHourAgo
        }
      }
    });
    
    // If already viewed recently, don't count again
    if (existingView) {
      return NextResponse.json({ success: true, duplicate: true });
    }
    
    // Get IP address
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    
    // Record blog view - Wrap in try-catch for foreign key error
    try {
      await prisma.blogView.create({
        data: {
          blogId: blog.id,
          sessionId: sessionId || null,
          ipAddress: ipAddress || null,
          userAgent: request.headers.get('user-agent') || null,
          referrer: request.headers.get('referer') || null,
          viewedAt: new Date(),
        }
      });
    } catch (dbError) {
      console.error('Database error creating blog view:', dbError);
      // If foreign key fails, just return success without tracking
      return NextResponse.json({ success: true, error: 'Tracking skipped due to schema issue' });
    }
    
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
          blogViews: { increment: 1 }
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
          blogViews: 1,
          blogClicks: 0,
          uniqueBlogReaders: 1,
        }
      });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Blog view tracking error:', error);
    return NextResponse.json({ error: 'Failed to track blog view' }, { status: 500 });
  }
}