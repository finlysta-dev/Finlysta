import { NextResponse } from 'next/server';
import { getVisitors } from '../daily-stats/route';

export async function GET() {
  try {
    // Get visitors from the shared data
    const allVisitors = getVisitors();
    
    // Return last 50 visitors, most recent first
    const recentVisitors = [...allVisitors]
      .reverse()
      .slice(0, 50)
      .map(visit => ({
        id: visit.id,
        createdAt: visit.createdAt,
        page: visit.page,
        ipAddress: visit.ipAddress,
        sessionId: visit.sessionId
      }));
    
    console.log(`Returning ${recentVisitors.length} recent visitors`); // Debug log
    
    return NextResponse.json(recentVisitors);
  } catch (error) {
    console.error('Error fetching recent visitors:', error);
    return NextResponse.json([], { status: 500 });
  }
}
