import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // ============================================================
    // DATE SETUP
    // ============================================================
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // ============================================================
    // VISITOR STATS
    // ============================================================
    const totalVisitors = await prisma.visitor.count();
    
    const uniqueSessionsData = await prisma.visitor.groupBy({
      by: ['sessionId'],
    });
    const uniqueSessions = uniqueSessionsData.length;
    
    const totalPageViews = await prisma.visitor.count();
    
    const todayVisitors = await prisma.visitor.count({
      where: { createdAt: { gte: today, lt: tomorrow } }
    });
    
    const yesterdayStart = new Date(today);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayVisitors = await prisma.visitor.count({
      where: { createdAt: { gte: yesterdayStart, lt: today } }
    });
    
    const weekVisitors = await prisma.visitor.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    });
    
    const monthVisitors = await prisma.visitor.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    });

    // ============================================================
    // OPPORTUNITY & SUBSCRIBER STATS
    // ============================================================
    const totalOpportunityClicks = await prisma.opportunityClick.count();
    
    const totalSubscribers = await prisma.subscriber.count({
      where: { status: "ACTIVE" }
    });
    
    const newSubscribersToday = await prisma.subscriber.count({
      where: { subscribedAt: { gte: today, lt: tomorrow } }
    });
    
    const newSubscribersWeek = await prisma.subscriber.count({
      where: { subscribedAt: { gte: sevenDaysAgo } }
    });

    // ============================================================
    // TODAY'S DAILY STAT
    // ============================================================
    const todayStats = await prisma.dailyStat.findUnique({
      where: { date: today }
    });

    // ============================================================
    // FEEDBACK STATS
    // ============================================================
    const totalFeedback = await prisma.feedback.count();
    
    const todayFeedback = await prisma.feedback.count({
      where: { createdAt: { gte: today, lt: tomorrow } }
    });
    
    const weekFeedback = await prisma.feedback.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    });
    
    // Average rating
    const ratingResult = await prisma.feedback.aggregate({
      _avg: { rating: true }
    });
    const averageRating = ratingResult._avg.rating || 0;
    
    // Rating distribution
    const ratingDistributionRaw = await prisma.feedback.groupBy({
      by: ['rating'],
      _count: { rating: true }
    });
    
    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingDistributionRaw.forEach(item => {
      ratingDistribution[item.rating] = item._count.rating;
    });
    
    // Feedback by status
    const feedbackByStatus = await prisma.feedback.groupBy({
      by: ['status'],
      _count: { status: true }
    });
    
    const statusCounts: Record<string, number> = {};
    feedbackByStatus.forEach(item => {
      statusCounts[item.status] = item._count.status;
    });
    
    // Feedback by category
    const feedbackByCategory = await prisma.feedback.groupBy({
      by: ['category'],
      _count: { category: true },
      _avg: { rating: true }
    });
    
    // Feedback by page
    const feedbackByPage = await prisma.feedback.groupBy({
      by: ['page'],
      _count: { page: true },
      _avg: { rating: true },
      orderBy: { _count: { page: 'desc' } },
      take: 10,
    });

    // ============================================================
    // PAGE STATS
    // ============================================================
    const pageStatsRaw = await prisma.visitor.groupBy({
      by: ['page'],
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } },
      take: 20
    });
    
    const pageStats: Record<string, number> = {};
    pageStatsRaw.forEach(item => {
      pageStats[item.page || '/'] = item._count.page;
    });
    
    const topPages = Object.entries(pageStats).map(([page, views]) => ({ page, views }));
    topPages.sort((a, b) => b.views - a.views);

    // ============================================================
    // HOURLY TRAFFIC (TODAY)
    // ============================================================
    const hourlyViews: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hourlyViews[i] = 0;
    
    const todayVisitorsList = await prisma.visitor.findMany({
      where: { createdAt: { gte: today, lt: tomorrow } },
      select: { createdAt: true }
    });
    
    todayVisitorsList.forEach(visitor => {
      const hour = visitor.createdAt.getHours();
      hourlyViews[hour] = (hourlyViews[hour] || 0) + 1;
    });

    // ============================================================
    // LAST 7 DAYS DAILY STATS
    // ============================================================
    const dailyStatsData = await prisma.dailyStat.findMany({
      where: { date: { gte: sevenDaysAgo } },
      orderBy: { date: 'asc' }
    });
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dateStr = date.toISOString().split('T')[0];
      const existingStat = dailyStatsData.find(
        stat => stat.date.toISOString().split('T')[0] === dateStr
      );
      
      const dayStart = new Date(date);
      const dayEnd = new Date(date);
      dayEnd.setDate(dayEnd.getDate() + 1);
      
      const dayVisitors = await prisma.visitor.count({
        where: { createdAt: { gte: dayStart, lt: dayEnd } }
      }).catch(() => 0);
      
      const dayFeedback = await prisma.feedback.count({
        where: { createdAt: { gte: dayStart, lt: dayEnd } }
      }).catch(() => 0);
      
      const dayBlogViews = await prisma.blogView.count({
        where: { viewedAt: { gte: dayStart, lt: dayEnd } }
      }).catch(() => 0);
      
      const dayBlogClicks = await prisma.blogClick.count({
        where: { clickedAt: { gte: dayStart, lt: dayEnd } }
      }).catch(() => 0);
      
      last7Days.push({
        date: dateStr,
        visitors: dayVisitors,
        views: existingStat?.totalViews || dayVisitors,
        clicks: existingStat?.totalClicks || 0,
        applications: existingStat?.applications || 0,
        subscribers: existingStat?.newSubscribers || 0,
        blogViews: existingStat?.blogViews || dayBlogViews,
        blogClicks: existingStat?.blogClicks || dayBlogClicks,
        feedback: dayFeedback,
      });
    }

    // ============================================================
    // RECENT VISITORS
    // ============================================================
    const recentVisitorsRaw = await prisma.visitor.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    
    const uniqueRecentVisitors: any[] = [];
    const seenSessions = new Set();
    for (const visitor of recentVisitorsRaw) {
      if (!seenSessions.has(visitor.sessionId)) {
        seenSessions.add(visitor.sessionId);
        uniqueRecentVisitors.push({
          id: visitor.id,
          sessionId: visitor.sessionId,
          page: visitor.page,
          createdAt: visitor.createdAt.toISOString(),
          ipAddress: visitor.ipAddress || 'N/A',
          userAgent: visitor.userAgent || 'N/A',
        });
        if (uniqueRecentVisitors.length >= 50) break;
      }
    }

    // ============================================================
    // DEVICE STATS
    // ============================================================
    const devices: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    for (const visitor of recentVisitorsRaw) {
      const ua = (visitor.userAgent || '').toLowerCase();
      if (ua.includes('mobile') || ua.includes('android')) {
        devices.Mobile = (devices.Mobile || 0) + 1;
      } else if (ua.includes('ipad') || ua.includes('tablet')) {
        devices.Tablet = (devices.Tablet || 0) + 1;
      } else {
        devices.Desktop = (devices.Desktop || 0) + 1;
      }
    }

    // ============================================================
    // BROWSER STATS
    // ============================================================
    const browsers: Record<string, number> = {};
    for (const visitor of recentVisitorsRaw) {
      const ua = (visitor.userAgent || '').toLowerCase();
      let browser = 'Other';
      if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
      else if (ua.includes('firefox')) browser = 'Firefox';
      else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
      else if (ua.includes('edg')) browser = 'Edge';
      browsers[browser] = (browsers[browser] || 0) + 1;
    }

    // ============================================================
    // OS STATS
    // ============================================================
    const osStats: Record<string, number> = {};
    for (const visitor of recentVisitorsRaw) {
      const ua = (visitor.userAgent || '').toLowerCase();
      let os = 'Other';
      if (ua.includes('windows')) os = 'Windows';
      else if (ua.includes('mac os') || ua.includes('macintosh')) os = 'macOS';
      else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
      else if (ua.includes('android')) os = 'Android';
      else if (ua.includes('linux')) os = 'Linux';
      osStats[os] = (osStats[os] || 0) + 1;
    }

    // ============================================================
    // SCREEN SIZES
    // ============================================================
    const screenSizes: Record<string, number> = {
      'Desktop (>1200px)': Math.round((devices.Desktop || 0) * 0.7),
      'Laptop (992-1200px)': Math.round((devices.Desktop || 0) * 0.2),
      'Tablet (768-991px)': devices.Tablet || 0,
      'Mobile (<768px)': devices.Mobile || 0,
    };

    // ============================================================
    // REFERRERS
    // ============================================================
    const referrersRaw = await prisma.visitor.groupBy({
      by: ['referrer'],
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 15,
    });
    
    const referrers = referrersRaw.map(r => ({
      source: r.referrer || 'direct',
      count: r._count.referrer,
    }));

    // ============================================================
    // BOUNCE RATE
    // ============================================================
    const visitorPageCounts = await prisma.visitor.groupBy({
      by: ['sessionId'],
      _count: { page: true },
    });
    
    const bouncedSessions = visitorPageCounts.filter(v => v._count.page <= 1).length;
    const totalSessions = visitorPageCounts.length || 1;
    const bounceRate = parseFloat(((bouncedSessions / totalSessions) * 100).toFixed(1));

    // ============================================================
    // AVG SESSION DURATION - FIXED with orderBy
    // ============================================================
    let avgSessionDuration = 0;
    try {
      // Fixed: Added orderBy as required by Prisma when using take
      const sessions = await prisma.visitor.groupBy({
        by: ['sessionId'],
        _min: { createdAt: true },
        _max: { createdAt: true },
        orderBy: {
          _min: {
            createdAt: 'asc'
          }
        },
        take: 100,
      });
      
      let totalDuration = 0;
      let sessionsWithDuration = 0;
      
      for (const session of sessions) {
        if (session._min.createdAt && session._max.createdAt) {
          const duration = (session._max.createdAt.getTime() - session._min.createdAt.getTime()) / 1000;
          if (duration > 0 && duration < 3600) {
            totalDuration += duration;
            sessionsWithDuration++;
          }
        }
      }
      
      avgSessionDuration = sessionsWithDuration > 0 
        ? Math.round(totalDuration / sessionsWithDuration) 
        : 0;
    } catch (error) {
      console.log('Session duration calc error:', error);
    }

    // ============================================================
    // RECENT FEEDBACK
    // ============================================================
    const recentFeedback = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true, name: true, email: true, rating: true,
        comment: true, page: true, category: true,
        status: true, device: true, createdAt: true, adminNotes: true,
      }
    });

    // ============================================================
    // MOST VIEWED OPPORTUNITIES
    // ============================================================
    const mostViewedOpportunities = await prisma.opportunity.findMany({
      where: { published: true },
      select: {
        id: true, title: true, company: true, type: true,
        views: true, applyClicks: true,
      },
      orderBy: { views: 'desc' },
      take: 10
    });

    // ============================================================
    // TOP OPPORTUNITIES BY CLICKS
    // ============================================================
    const topOpportunitiesByClicks = await prisma.opportunity.findMany({
      where: { published: true },
      select: {
        id: true, title: true, company: true, type: true,
        views: true, applyClicks: true,
      },
      orderBy: { applyClicks: 'desc' },
      take: 10
    });

    // ============================================================
    // CONVERSION RATE
    // ============================================================
    const totalOppViews = mostViewedOpportunities.reduce((sum, o) => sum + o.views, 0);
    const totalOppClicks = mostViewedOpportunities.reduce((sum, o) => sum + o.applyClicks, 0);
    const conversionRate = totalOppViews > 0 
      ? parseFloat(((totalOppClicks / totalOppViews) * 100).toFixed(1)) 
      : 0;

    // ============================================================
    // BLOG ANALYTICS (CareerResource based)
    // ============================================================
    let blogAnalytics: any = {
      totalViews: 0, totalClicks: 0, ctr: 0, avgReadTime: 0,
      viewsLast7Days: 0, clicksLast7Days: 0,
      viewsLast30Days: 0, clicksLast30Days: 0,
      stats: [], categoryStats: [], dailyViews: [],
      recentReaders: [], referrers: [], topBlogs: [],
    };
    
    // Blog stats list for content tab
    const blogStatsList: any[] = [];
    
    try {
      // Get career resources (blogs)
      const careerResources = await prisma.careerResource.findMany({
        where: { published: true },
        select: {
          id: true, title: true, slug: true, category: true, createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }).catch(() => []);

      if (careerResources.length > 0) {
        // Total blog views & clicks
        const totalBlogViews = await prisma.blogView.count().catch(() => 0);
        const totalBlogClicks = await prisma.blogClick.count().catch(() => 0);
        const blogCTR = totalBlogViews > 0 
          ? parseFloat(((totalBlogClicks / totalBlogViews) * 100).toFixed(1)) 
          : 0;

        // Last 7 days
        const blogViewsLast7Days = await prisma.blogView.count({
          where: { viewedAt: { gte: sevenDaysAgo } }
        }).catch(() => 0);
        const blogClicksLast7Days = await prisma.blogClick.count({
          where: { clickedAt: { gte: sevenDaysAgo } }
        }).catch(() => 0);

        // Last 30 days
        const blogViewsLast30Days = await prisma.blogView.count({
          where: { viewedAt: { gte: thirtyDaysAgo } }
        }).catch(() => 0);
        const blogClicksLast30Days = await prisma.blogClick.count({
          where: { clickedAt: { gte: thirtyDaysAgo } }
        }).catch(() => 0);

        // Average read time
        const avgReadTimeResult = await prisma.blogView.aggregate({
          _avg: { readTime: true },
          where: { readTime: { not: null } }
        }).catch(() => ({ _avg: { readTime: 0 } }));
        const avgReadTime = avgReadTimeResult._avg.readTime || 0;

        // Build stats for each resource
        const blogsWithStats = await Promise.all(
          careerResources.slice(0, 15).map(async (resource: any) => {
            const views = await prisma.blogView.count({
              where: { blogId: resource.id }
            }).catch(() => 0);
            
            const clicks = await prisma.blogClick.count({
              where: { blogId: resource.id }
            }).catch(() => 0);
            
            // Average read time per blog
            const blogAvgRead = await prisma.blogView.aggregate({
              _avg: { readTime: true },
              where: { blogId: resource.id, readTime: { not: null } }
            }).catch(() => ({ _avg: { readTime: 0 } }));
            
            return {
              id: resource.id,
              title: resource.title,
              slug: resource.slug,
              category: resource.category || 'General',
              totalViews: views,
              totalClicks: clicks,
              ctr: views > 0 ? parseFloat(((clicks / views) * 100).toFixed(1)) : 0,
              avgReadTime: blogAvgRead._avg.readTime || null,
              publishedAt: resource.createdAt?.toISOString() || '',
            };
          })
        );
        blogsWithStats.sort((a: any, b: any) => b.totalViews - a.totalViews);

        // Category stats
        const categoryMap: Record<string, { views: number; clicks: number; count: number }> = {};
        for (const blog of blogsWithStats) {
          const cat = blog.category || 'Uncategorized';
          if (!categoryMap[cat]) categoryMap[cat] = { views: 0, clicks: 0, count: 0 };
          categoryMap[cat].views += blog.totalViews;
          categoryMap[cat].clicks += blog.totalClicks;
          categoryMap[cat].count += 1;
        }

        // Daily blog views (last 7 days)
        const blogDailyViews = await prisma.blogView.groupBy({
          by: ['viewedAt'],
          _count: { id: true },
          where: { viewedAt: { gte: sevenDaysAgo } },
          orderBy: { viewedAt: 'asc' },
        }).catch(() => []);

        // Recent readers
        const recentBlogReaders = await prisma.blogView.findMany({
          orderBy: { viewedAt: 'desc' },
          take: 20,
          select: {
            id: true, blogId: true, sessionId: true,
            ipAddress: true, readTime: true, viewedAt: true,
          }
        }).catch(() => []);

        // Map readers to blog titles
        const readersWithTitles = recentBlogReaders.map((reader: any) => {
          const resource = careerResources.find((r: any) => r.id === reader.blogId);
          return {
            id: reader.id,
            blogTitle: resource?.title || 'Unknown Blog',
            blogSlug: resource?.slug || '',
            sessionId: reader.sessionId,
            ipAddress: reader.ipAddress,
            readTime: reader.readTime,
            viewedAt: reader.viewedAt?.toISOString() || '',
          };
        });

        // Blog referrers
        const blogReferrers = await prisma.blogView.groupBy({
          by: ['referrer'],
          _count: { id: true },
          orderBy: { _count: { id: 'desc' } },
          take: 10,
        }).catch(() => []);

        // Top performing blogs (by CTR)
        const topBlogsByCTR = [...blogsWithStats]
          .filter(b => b.totalViews > 5)
          .sort((a: any, b: any) => b.ctr - a.ctr)
          .slice(0, 5);

        // Build blogStatsList for content tab
        for (const resource of careerResources.slice(0, 15)) {
          const stat = blogsWithStats.find(s => s.id === resource.id);
          blogStatsList.push({
            id: resource.id,
            title: resource.title,
            slug: resource.slug,
            views: stat?.totalViews || 0,
            clicks: stat?.totalClicks || 0,
            avgReadTime: stat?.avgReadTime || null,
            ctr: stat?.ctr || 0,
            category: resource.category,
          });
        }
        blogStatsList.sort((a, b) => b.views - a.views);

        blogAnalytics = {
          totalViews: totalBlogViews,
          totalClicks: totalBlogClicks,
          ctr: blogCTR,
          avgReadTime: Math.round(avgReadTime),
          viewsLast7Days: blogViewsLast7Days,
          clicksLast7Days: blogClicksLast7Days,
          viewsLast30Days: blogViewsLast30Days,
          clicksLast30Days: blogClicksLast30Days,
          stats: blogsWithStats,
          categoryStats: Object.entries(categoryMap).map(([category, data]) => ({
            category, views: data.views, clicks: data.clicks, count: data.count,
          })),
          dailyViews: blogDailyViews.map((d: any) => ({
            date: d.viewedAt?.toISOString().split('T')[0] || '',
            views: d._count?.id || 0,
          })),
          recentReaders: readersWithTitles.filter((r: any) => r.blogTitle !== 'Unknown Blog'),
          referrers: blogReferrers.map((r: any) => ({
            source: r.referrer || 'Direct',
            count: r._count?.id || 0,
          })),
          topBlogs: topBlogsByCTR,
        };
      }
    } catch (error) {
      console.log('Blog analytics error:', error);
    }

    // ============================================================
    // RETURN ALL DATA
    // ============================================================
    return NextResponse.json({
      stats: {
        totalVisitors: totalVisitors || 0,
        totalPageViews: totalPageViews || 0,
        totalClicks: totalOpportunityClicks || 0,
        totalApplications: 0,
        totalSubscribers: totalSubscribers || 0,
        uniqueVisitors: uniqueSessions || 0,
        todayVisitors: todayVisitors || 0,
        yesterdayVisitors: yesterdayVisitors || 0,
        weekVisitors: weekVisitors || 0,
        monthVisitors: monthVisitors || 0,
        todayViews: todayVisitors || 0,
        todayClicks: todayStats?.totalClicks || 0,
        todayApplications: todayStats?.applications || 0,
        uniqueSessions: uniqueSessions || 0,
        totalBlogViews: blogAnalytics.totalViews || 0,
        totalBlogClicks: blogAnalytics.totalClicks || 0,
        todayFeedback: todayFeedback || 0,
        weekFeedback: weekFeedback || 0,
        totalFeedback: totalFeedback || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        newFeedback: statusCounts['NEW'] || 0,
        reviewedFeedback: statusCounts['REVIEWED'] || 0,
        bounceRate: bounceRate || 0,
        avgSessionDuration: avgSessionDuration || 0,
        conversionRate: conversionRate || 0,
        newSubscribersToday: newSubscribersToday || 0,
        newSubscribersWeek: newSubscribersWeek || 0,
      },
      pageViews: {
        today: todayVisitors,
        total: totalPageViews,
        uniqueSessions,
        pageStats,
        hourlyViews,
      },
      feedback: {
        today: todayFeedback,
        week: weekFeedback,
        total: totalFeedback,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
        statusCounts,
        byCategory: feedbackByCategory.map(c => ({
          category: c.category || 'general',
          count: c._count.category,
          avgRating: Math.round((c._avg.rating || 0) * 10) / 10
        })),
        byPage: feedbackByPage.map(p => ({
          page: p.page,
          count: p._count.page,
          avgRating: Math.round((p._avg.rating || 0) * 10) / 10,
        })),
        recent: recentFeedback,
      },
      dailyStats: last7Days,
      recentVisitors: uniqueRecentVisitors,
      mostViewed: mostViewedOpportunities.map(opp => ({
        id: opp.id, title: opp.title, company: opp.company,
        type: opp.type === 'job' ? 'Job' : 'Internship',
        views: opp.views, applyClicks: opp.applyClicks,
      })),
      topByClicks: topOpportunitiesByClicks.map(opp => ({
        id: opp.id, title: opp.title, company: opp.company,
        type: opp.type === 'job' ? 'Job' : 'Internship',
        views: opp.views, applyClicks: opp.applyClicks,
      })),
      blogStats: blogStatsList,
      topPages,
      referrers,
      devices,
      browsers,
      osStats,
      screenSizes,
      countries: {},
      cities: {},
      hourlyTraffic: hourlyViews,
      blogAnalytics,
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats: ' + (error as Error).message },
      { status: 500 }
    );
  }
}