import { NextResponse } from 'next/server';

// This needs to access the SAME data as your track API
// Since we can't share memory between routes easily, let's create a shared module

// For now, let's read from a temporary file or use a global variable
// In production, use a database

let globalVisitors: any[] = [];

// Export functions to share data
export function addVisitor(visitor: any) {
  globalVisitors.push(visitor);
}

export function getVisitors() {
  return globalVisitors;
}

export async function GET() {
  try {
    // Calculate daily stats from visitors
    const statsByDate = new Map();
    
    globalVisitors.forEach(visit => {
      const date = visit.date;
      if (!statsByDate.has(date)) {
        statsByDate.set(date, {
          date: date,
          totalVisitors: new Set(),
          totalViews: 0,
          totalClicks: 0,
          newSubscribers: 0
        });
      }
      
      const stat = statsByDate.get(date);
      stat.totalVisitors.add(visit.sessionId);
      stat.totalViews++;
    });
    
    // Convert to array format
    const dailyStatsArray = Array.from(statsByDate.entries()).map(([date, stat]) => ({
      id: date,
      date: date,
      totalVisitors: stat.totalVisitors.size,
      totalViews: stat.totalViews,
      totalClicks: stat.totalClicks,
      newSubscribers: stat.newSubscribers
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    console.log('Daily stats calculated:', dailyStatsArray); // Debug log
    
    return NextResponse.json(dailyStatsArray);
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    return NextResponse.json([], { status: 500 });
  }
}
