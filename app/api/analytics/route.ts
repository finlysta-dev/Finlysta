import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEBUG = true;

function log(message: string, data?: any) {
  if (DEBUG) {
    console.log(`📊 [Analytics API] ${message}`, data || '');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, visitorId, path, opportunityId } = body;

    log(`📥 Received ${type} request`, { visitorId, path, opportunityId });

    if (!visitorId) {
      log('❌ Missing visitor ID');
      return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 });
    }

    // Get or create analytics visitor
    let visitor = await prisma.analyticsVisitor.findUnique({
      where: { visitorId },
    });

    if (!visitor) {
      log('🆕 Creating new visitor:', visitorId);
      try {
        visitor = await prisma.analyticsVisitor.create({
          data: {
            visitorId,
            userAgent: request.headers.get('user-agent') || undefined,
            ipAddress: request.headers.get('x-forwarded-for') || undefined,
          },
        });
        log('✅ Visitor created:', visitor.id);
      } catch (createError) {
        log('❌ Failed to create visitor:', createError);
        return NextResponse.json({ 
          error: 'Failed to create visitor', 
          details: createError instanceof Error ? createError.message : 'Unknown error' 
        }, { status: 500 });
      }
    } else {
      log('👤 Existing visitor found:', visitor.id);
      try {
        visitor = await prisma.analyticsVisitor.update({
          where: { id: visitor.id },
          data: { lastSeen: new Date() },
        });
      } catch (updateError) {
        log('⚠️ Failed to update visitor:', updateError);
      }
    }

    // Record the event based on type
    let result;
    try {
      switch (type) {
        case 'pageView':
          if (!path) {
            return NextResponse.json({ error: 'Path is required for page view' }, { status: 400 });
          }
          result = await prisma.analyticsPageView.create({
            data: {
              visitorId: visitor.id,
              path,
              referrer: request.headers.get('referer') || undefined,
            },
          });
          log('✅ Page view recorded:', { path, id: result.id });
          break;
        
        case 'opportunityView':
          if (!opportunityId) {
            return NextResponse.json({ error: 'Opportunity ID is required' }, { status: 400 });
          }
          
          // Check if opportunity exists
          const oppExists = await prisma.opportunity.findUnique({
            where: { id: opportunityId },
            select: { id: true, title: true },
          });

          if (!oppExists) {
            log('❌ Opportunity not found:', opportunityId);
            return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
          }

          log(`👁️ Recording view for: ${oppExists.title}`);

          result = await prisma.analyticsOpportunityView.create({
            data: {
              opportunityId,
              visitorId: visitor.id,
            },
          });
          log('✅ Opportunity view recorded:', { opportunityId, id: result.id });
          
          // Update Opportunity table
          try {
            await prisma.opportunity.update({
              where: { id: opportunityId },
              data: { views: { increment: 1 } },
            });
            log('✅ Updated opportunity view count:', opportunityId);
          } catch (oppError) {
            log('⚠️ Could not update opportunity views:', oppError);
          }
          break;
        
        case 'opportunityClick':
          if (!opportunityId) {
            return NextResponse.json({ error: 'Opportunity ID is required' }, { status: 400 });
          }

          // Check if opportunity exists
          const oppExists2 = await prisma.opportunity.findUnique({
            where: { id: opportunityId },
            select: { id: true, title: true },
          });

          if (!oppExists2) {
            log('❌ Opportunity not found:', opportunityId);
            return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
          }

          log(`🖱️ Recording click for: ${oppExists2.title}`);

          result = await prisma.analyticsOpportunityClick.create({
            data: {
              opportunityId,
              visitorId: visitor.id,
            },
          });
          log('✅ Apply click recorded:', { opportunityId, id: result.id });
          
          // Update Opportunity table
          try {
            await prisma.opportunity.update({
              where: { id: opportunityId },
              data: { applyClicks: { increment: 1 } },
            });
            log('✅ Updated opportunity apply clicks:', opportunityId);
          } catch (oppError) {
            log('⚠️ Could not update opportunity apply clicks:', oppError);
          }
          break;
        
        default:
          return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
      }
    } catch (recordError) {
      log('❌ Failed to record event:', recordError);
      return NextResponse.json({ 
        error: 'Failed to record event', 
        details: recordError instanceof Error ? recordError.message : 'Unknown error' 
      }, { status: 500 });
    }

    // Update daily metrics synchronously
    try {
      await updateDailyMetrics();
      log('✅ Daily metrics updated after event');
    } catch (updateError) {
      log('⚠️ Failed to update daily metrics:', updateError);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    log('❌ Internal server error:', error);
    console.error('Analytics API error:', error);
    return NextResponse.json({ 
      error: 'Failed to record analytics', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    log('📊 Fetching analytics data...');
    
    const url = new URL(request.url);
    const startDateParam = url.searchParams.get('startDate');
    const endDateParam = url.searchParams.get('endDate');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Build date filter for daily metrics
    const dateFilter: any = {};
    if (startDateParam) {
      const start = new Date(startDateParam);
      start.setHours(0, 0, 0, 0);
      dateFilter.gte = start;
    }
    if (endDateParam) {
      const end = new Date(endDateParam);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    // Get daily metrics
    let dailyMetrics = await prisma.analyticsDailyMetric.findMany({
      where: Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {},
      orderBy: { date: 'desc' },
      take: 30,
    });

    // If no daily metrics for today, create them
    const todayExists = dailyMetrics.some(m => 
      new Date(m.date).toDateString() === today.toDateString()
    );

    if (!todayExists) {
      log('📊 No daily metrics for today, creating...');
      await updateDailyMetrics();
      dailyMetrics = await prisma.analyticsDailyMetric.findMany({
        where: Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {},
        orderBy: { date: 'desc' },
        take: 30,
      });
    }

    // Get TOTAL counts
    const [
      totalVisitors,
      uniqueVisitors,
      opportunityViews,
      opportunityClicks,
      activeJobs,
      activeInternships,
      totalOpportunities,
      addedToday,
      addedThisWeek,
      topViewedOpportunities,
      topAppliedOpportunities,
    ] = await Promise.all([
      prisma.analyticsPageView.count(),
      prisma.analyticsVisitor.count({ where: { isInternal: false } }),
      prisma.analyticsOpportunityView.count(),
      prisma.analyticsOpportunityClick.count(),
      prisma.opportunity.count({
        where: { published: true, isVerified: true, type: 'job' },
      }),
      prisma.opportunity.count({
        where: { published: true, isVerified: true, type: 'internship' },
      }),
      prisma.opportunity.count({
        where: { published: true, isVerified: true },
      }),
      prisma.opportunity.count({
        where: { createdAt: { gte: today }, published: true, isVerified: true },
      }),
      prisma.opportunity.count({
        where: { createdAt: { gte: weekAgo }, published: true, isVerified: true },
      }),
      prisma.opportunity.findMany({
        take: 10,
        orderBy: { views: 'desc' },
        where: { published: true, isVerified: true },
        select: { id: true, title: true, company: true, views: true, applyClicks: true },
      }),
      prisma.opportunity.findMany({
        take: 10,
        orderBy: { applyClicks: 'desc' },
        where: { published: true, isVerified: true },
        select: { id: true, title: true, company: true, views: true, applyClicks: true },
      }),
    ]);

    log('📊 Job Views (TOTAL):', opportunityViews);
    log('📊 Apply Clicks (TOTAL):', opportunityClicks);

    const response = {
      metrics: {
        totalVisitors,
        uniqueVisitors,
        jobViews: opportunityViews,
        applyClicks: opportunityClicks,
        activeJobs,
        activeInternships,
        totalOpportunities,
        addedToday,
        addedThisWeek,
      },
      topViewedJobs: topViewedOpportunities.map(opp => ({
        id: opp.id,
        title: opp.title,
        company: opp.company,
        views: opp.views || 0,
        applyClicks: opp.applyClicks || 0,
      })),
      topAppliedJobs: topAppliedOpportunities.map(opp => ({
        id: opp.id,
        title: opp.title,
        company: opp.company,
        views: opp.views || 0,
        applyClicks: opp.applyClicks || 0,
      })),
      dailyMetrics: dailyMetrics.map(metric => ({
        date: metric.date,
        totalVisitors: metric.totalVisitors,
        uniqueVisitors: metric.uniqueVisitors,
        jobViews: metric.opportunityViews || 0,
        applyClicks: metric.opportunityClicks || 0,
        activeJobs: metric.activeJobs,
        activeInternships: metric.activeInternships,
        totalOpportunities: metric.totalOpportunities,
        addedToday: metric.addedToday,
        addedThisWeek: metric.addedThisWeek,
      })),
    };

    log('✅ Analytics data fetched successfully');
    return NextResponse.json(response);
  } catch (error) {
    log('❌ Error fetching dashboard data:', error);
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

// FIXED: Update daily metrics with correct data using the correct schema columns
async function updateDailyMetrics() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Get TODAY's counts
    const [
      totalVisitors,
      uniqueVisitors,
      opportunityViews,
      opportunityClicks,
      activeJobs,
      activeInternships,
      totalOpportunities,
      addedToday,
      addedThisWeek,
    ] = await Promise.all([
      prisma.analyticsPageView.count({
        where: { 
          timestamp: { 
            gte: today,
            lt: tomorrow 
          } 
        },
      }),
      prisma.analyticsVisitor.count({
        where: {
          isInternal: false,
          firstSeen: { 
            gte: today,
            lt: tomorrow 
          },
        },
      }),
      prisma.analyticsOpportunityView.count({
        where: { 
          timestamp: { 
            gte: today,
            lt: tomorrow 
          } 
        },
      }),
      prisma.analyticsOpportunityClick.count({
        where: { 
          timestamp: { 
            gte: today,
            lt: tomorrow 
          } 
        },
      }),
      prisma.opportunity.count({
        where: {
          published: true,
          isVerified: true,
          type: 'job',
        },
      }),
      prisma.opportunity.count({
        where: {
          published: true,
          isVerified: true,
          type: 'internship',
        },
      }),
      prisma.opportunity.count({
        where: {
          published: true,
          isVerified: true,
        },
      }),
      prisma.opportunity.count({
        where: {
          createdAt: { 
            gte: today,
            lt: tomorrow 
          },
          published: true,
          isVerified: true,
        },
      }),
      prisma.opportunity.count({
        where: {
          createdAt: { gte: weekAgo },
          published: true,
          isVerified: true,
        },
      }),
    ]);

    log('📊 [Daily Metrics Update]', {
      date: today.toDateString(),
      totalVisitors,
      uniqueVisitors,
      opportunityViews,
      opportunityClicks,
      activeJobs,
      activeInternships,
      totalOpportunities,
      addedToday,
      addedThisWeek,
    });

    // UPSERT using the correct schema field names
    await prisma.analyticsDailyMetric.upsert({
      where: { date: today },
      update: {
        totalVisitors,
        uniqueVisitors,
        opportunityViews,
        opportunityClicks,
        activeJobs,
        activeInternships,
        totalOpportunities,
        addedToday,
        addedThisWeek,
      },
      create: {
        date: today,
        totalVisitors,
        uniqueVisitors,
        opportunityViews,
        opportunityClicks,
        activeJobs,
        activeInternships,
        totalOpportunities,
        addedToday,
        addedThisWeek,
      },
    });
    
    log('✅ Daily metrics updated for:', today.toDateString());
  } catch (error) {
    log('⚠️ Failed to update daily metrics:', error);
    console.error('Daily metrics update error:', error);
  }
}