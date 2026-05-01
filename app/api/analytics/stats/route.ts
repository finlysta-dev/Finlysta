import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get total visitors
    const totalVisitors = await prisma.visitor.count();
    
    // Get unique sessions - FIXED: removed orderBy
    const uniqueSessionsData = await prisma.visitor.groupBy({
      by: ['sessionId'],
    });
    const uniqueSessions = uniqueSessionsData.length;
    
    // Total opportunity clicks
    const totalOpportunityClicks = await prisma.opportunityClick.count();
    
    // Total active subscribers
    const totalSubscribers = await prisma.subscriber.count({
      where: { status: "ACTIVE" }
    });
    
    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayStats = await prisma.dailyStat.findUnique({
      where: { date: today }
    });
    
    // Last 7 days stats
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    
    const dailyStatsData = await prisma.dailyStat.findMany({
      where: {
        date: {
          gte: sevenDaysAgo
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    // Most viewed opportunities
    const mostViewedOpportunities = await prisma.opportunity.findMany({
      where: {
        published: true
      },
      select: {
        id: true,
        title: true,
        company: true,
        type: true,
        views: true,
        applyClicks: true,
      },
      orderBy: {
        views: 'desc'
      },
      take: 10
    });
    
    // Recent visitors - FIXED: removed distinct
    const recentVisitorsRaw = await prisma.visitor.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 100,
    });
    
    // Process unique recent visitors manually
    const uniqueRecentVisitors = [];
    const seenSessions = new Set();
    for (const visitor of recentVisitorsRaw) {
      if (!seenSessions.has(visitor.sessionId)) {
        seenSessions.add(visitor.sessionId);
        uniqueRecentVisitors.push(visitor);
        if (uniqueRecentVisitors.length >= 50) break;
      }
    }
    
    // Get all career resources (blogs)
    const careerResources = await prisma.careerResource.findMany({
      where: {
        published: true
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Build blog stats
    const blogStats = [];
    let totalBlogViews = 0;
    let totalBlogClicks = 0;
    
    for (const resource of careerResources) {
      const viewCount = await prisma.blogView.count({
        where: { blogId: resource.id }
      });
      
      const clickCount = await prisma.blogClick.count({
        where: { blogId: resource.id }
      });
      
      totalBlogViews += viewCount;
      totalBlogClicks += clickCount;
      
      blogStats.push({
        id: resource.id,
        title: resource.title,
        slug: resource.slug,
        views: viewCount,
        clicks: clickCount,
        category: resource.category,
        avgReadTime: null,
        ctr: viewCount > 0 ? ((clickCount / viewCount) * 100).toFixed(1) : 0,
      });
    }
    
    // Sort by views descending
    blogStats.sort((a, b) => b.views - a.views);
    
    // Process last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dateStr = date.toISOString().split('T')[0];
      const existingStat = dailyStatsData.find(
        stat => stat.date.toISOString().split('T')[0] === dateStr
      );
      
      last7Days.push({
        date: dateStr,
        visitors: existingStat?.totalVisitors || 0,
        views: existingStat?.totalViews || 0,
        clicks: existingStat?.totalClicks || 0,
        applications: existingStat?.applications || 0,
        subscribers: existingStat?.newSubscribers || 0,
        blogViews: existingStat?.blogViews || 0,
        blogClicks: existingStat?.blogClicks || 0,
      });
    }
    
    return NextResponse.json({
      stats: {
        totalVisitors: totalVisitors || 0,
        totalPageViews: totalVisitors || 0,
        totalClicks: totalOpportunityClicks || 0,
        totalApplications: 0,
        totalSubscribers: totalSubscribers || 0,
        uniqueVisitors: uniqueSessions || 0,
        todayVisitors: todayStats?.totalVisitors || 0,
        todayViews: todayStats?.totalViews || 0,
        todayClicks: todayStats?.totalClicks || 0,
        todayApplications: todayStats?.applications || 0,
        uniqueSessions: uniqueSessions || 0,
        totalBlogViews: totalBlogViews || 0,
        totalBlogClicks: totalBlogClicks || 0,
      },
      dailyStats: last7Days,
      mostViewed: mostViewedOpportunities.map(opp => ({
        id: opp.id,
        title: opp.title,
        company: opp.company,
        type: opp.type === 'job' ? 'Job' : 'Internship',
        views: opp.views,
        applyClicks: opp.applyClicks,
      })),
      recentVisitors: uniqueRecentVisitors.map(v => ({
        id: v.id,
        sessionId: v.sessionId,
        page: v.page,
        createdAt: v.createdAt.toISOString(),
        ipAddress: v.ipAddress || 'N/A',
      })),
      blogStats: blogStats,
    });
    
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data: ' + (error as Error).message },
      { status: 500 }
    );
  }
}