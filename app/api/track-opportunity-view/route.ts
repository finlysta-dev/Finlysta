import { NextRequest, NextResponse } from 'next/server';

// Store opportunity views (in production, use a database)
let opportunityViews: Record<string, number> = {};

export async function POST(req: NextRequest) {
  try {
    const { opportunityId } = await req.json();
    
    if (!opportunityId) {
      return NextResponse.json({ error: 'Opportunity ID required' }, { status: 400 });
    }
    
    // Increment view count
    if (!opportunityViews[opportunityId]) {
      opportunityViews[opportunityId] = 0;
    }
    opportunityViews[opportunityId]++;
    
    console.log(`View tracked for ${opportunityId}: ${opportunityViews[opportunityId]} views`);
    
    return NextResponse.json({ 
      success: true, 
      opportunityId, 
      views: opportunityViews[opportunityId] 
    });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(opportunityViews);
}
