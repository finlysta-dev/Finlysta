import { NextRequest, NextResponse } from 'next/server';
import { addVisitor, getVisitors } from '../daily-stats/route';

// In-memory storage
let visitors: any[] = [];
let dailyStats: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, sessionId, ipAddress, userAgent, timestamp } = body;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Create visit record
    const visit = {
      id: Date.now(),
      page,
      sessionId,
      ipAddress,
      userAgent,
      createdAt: timestamp || now.toISOString(),
      date: today
    };
    
    visitors.push(visit);
    
    // Also add to daily-stats visitors
    addVisitor(visit);
    
    // Update or create daily stats
    let todayStat = dailyStats.find(stat => stat.date === today);
    if (!todayStat) {
      todayStat = {
        id: today,
        date: today,
        totalVisitors: 0,
        totalViews: 0,
        totalClicks: 0,
        newSubscribers: 0
      };
      dailyStats.push(todayStat);
    }
    
    // Calculate unique visitors for today
    const uniqueVisitorsToday = new Set(
      visitors.filter(v => v.date === today).map(v => v.sessionId)
    ).size;
    
    todayStat.totalVisitors = uniqueVisitorsToday;
    todayStat.totalViews = visitors.filter(v => v.date === today).length;
    
    console.log(`Tracked visit: ${page} - Session: ${sessionId}`); // Debug log
    console.log(`Total visitors: ${visitors.length}`); // Debug log
    
    return NextResponse.json({ success: true, visit });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const uniqueSessions = new Set(visitors.map(v => v.sessionId)).size;
    const today = new Date().toISOString().split('T')[0];
    const todayVisitors = new Set(
      visitors.filter(v => v.date === today).map(v => v.sessionId)
    ).size;
    const todayViews = visitors.filter(v => v.date === today).length;
    
    return NextResponse.json({
      totalVisitors: uniqueSessions,
      totalViews: visitors.length,
      todayVisitors,
      todayViews,
      uniqueSessions: uniqueSessions
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}
