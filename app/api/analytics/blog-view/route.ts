import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogSlug, sessionId, readTime } = body;
    
    console.log('📊 Blog view received:', { blogSlug, sessionId });
    
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      '127.0.0.1';
    const referrer = request.headers.get('referer') || '';
    
    // Find the CareerResource by slug
    const resource = await prisma.careerResource.findUnique({
      where: { slug: blogSlug }
    });

    if (!resource) {
      console.log('❌ CareerResource not found for slug:', blogSlug);
      return NextResponse.json({ 
        error: 'Resource not found', 
        slug: blogSlug 
      }, { status: 404 });
    }

    console.log('✅ Found resource:', resource.title, resource.id);

    // Create the blog view using CareerResource ID
    // Use raw query to avoid foreign key constraint with Blog table
    await prisma.$executeRawUnsafe(
      `INSERT INTO "BlogView" ("id", "blogId", "sessionId", "ipAddress", "userAgent", "referrer", "readTime", "viewedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      `view_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      resource.id,
      sessionId || 'unknown',
      ipAddress,
      userAgent,
      referrer,
      readTime || null,
      new Date()
    );

    console.log('✅ BlogView created for:', resource.title);

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyStat.upsert({
      where: { date: today },
      update: { 
        blogViews: { increment: 1 },
        totalViews: { increment: 1 }
      },
      create: {
        date: today,
        totalVisitors: 0,
        totalViews: 1,
        totalClicks: 0,
        applications: 0,
        newSubscribers: 0,
        blogViews: 1,
        blogClicks: 0,
        uniqueBlogReaders: 0,
      }
    });

    return NextResponse.json({ 
      success: true,
      resourceTitle: resource.title 
    });
    
  } catch (error) {
    console.error('❌ Blog view error:', error);
    return NextResponse.json({ 
      error: 'Failed to track view',
      details: (error as Error).message 
    }, { status: 500 });
  }
}
