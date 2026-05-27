import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || '';
    
    let device = 'desktop';
    if (userAgent.includes('Mobile')) device = 'mobile';
    else if (userAgent.includes('Tablet')) device = 'tablet';
    
    const feedback = await prisma.feedback.create({
      data: {
        name: body.name || 'Anonymous',
        rating: body.rating || 0,
        comment: body.comment || '',
        page: body.page || '/',
        sessionId: body.sessionId || null,
        category: body.category || 'general',
        userAgent: userAgent,
        ipAddress: ipAddress,
        device: device,
        status: 'NEW',
      }
    });
    
    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    await prisma.dailyStat.upsert({
      where: { date: today },
      update: {},
      create: {
        date: today,
        totalVisitors: 0,
        totalViews: 0,
        totalClicks: 0,
        applications: 0,
        newSubscribers: 0,
        blogViews: 0,
        blogClicks: 0,
        uniqueBlogReaders: 0,
      }
    });
    
    return NextResponse.json({ success: true, id: feedback.id });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback: ' + (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const rating = searchParams.get('rating');
    const status = searchParams.get('status');
    
    const where: any = {};
    if (rating) where.rating = parseInt(rating);
    if (status) where.status = status;
    
    const feedback = await prisma.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        rating: true,
        comment: true,
        page: true,
        category: true,
        status: true,
        device: true,
        createdAt: true,
        adminNotes: true,
      }
    });
    
    const total = await prisma.feedback.count({ where });
    
    const avgRating = await prisma.feedback.aggregate({
      where,
      _avg: { rating: true }
    });
    
    return NextResponse.json({
      data: feedback,
      total,
      averageRating: Math.round((avgRating._avg.rating || 0) * 10) / 10,
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback: ' + (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, adminNotes, reviewedBy } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 });
    }
    
    const updateData: any = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (reviewedBy) {
      updateData.reviewedBy = reviewedBy;
      updateData.reviewedAt = new Date();
    }
    
    const feedback = await prisma.feedback.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 });
    }
    
    await prisma.feedback.delete({ where: { id } });
    
    return NextResponse.json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}
