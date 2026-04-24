import { NextRequest, NextResponse } from 'next/server';

// This is your dynamic data source - it will fetch from your database
// For now, it reads from your existing data source
// When you add new opportunities to your database, they will appear automatically

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters for filtering
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const type = url.searchParams.get('type');
    
    // Fetch opportunities from your database
    // Option 1: If you have a database API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/opportunities/data`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch opportunities');
    }
    
    let opportunities = await response.json();
    
    // Apply filters
    if (type && type !== 'all') {
      opportunities = opportunities.filter((opp: any) => opp.type === type);
    }
    
    if (limit) {
      opportunities = opportunities.slice(0, parseInt(limit));
    }
    
    // Get current view counts from tracking API
    let viewsMap: Record<string, number> = {};
    try {
      const viewsResponse = await fetch(`${baseUrl}/api/track-opportunity-view`);
      if (viewsResponse.ok) {
        viewsMap = await viewsResponse.json();
      }
    } catch (error) {
      console.error('Failed to fetch view counts:', error);
    }
    
    // Merge view counts with opportunities
    const opportunitiesWithViews = opportunities.map((opp: any) => ({
      ...opp,
      views: viewsMap[opp.id] || opp.views || 0
    }));
    
    return NextResponse.json(opportunitiesWithViews);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Add new opportunity (dynamic)
export async function POST(request: NextRequest) {
  try {
    const newOpportunity = await request.json();
    
    // Here you would save to your database
    // For now, it will be added to your data source
    // When you implement your database, this will save automatically
    
    // Generate ID if not provided
    if (!newOpportunity.id) {
      newOpportunity.id = Date.now().toString();
    }
    
    // Set defaults
    newOpportunity.isNew = newOpportunity.isNew ?? true;
    newOpportunity.isVerified = newOpportunity.isVerified ?? false;
    newOpportunity.isTrending = newOpportunity.isTrending ?? false;
    newOpportunity.isActivelyHiring = newOpportunity.isActivelyHiring ?? true;
    newOpportunity.published = newOpportunity.published ?? true;
    newOpportunity.postedAt = newOpportunity.postedAt || new Date().toISOString();
    newOpportunity.views = 0;
    newOpportunity.applyClicks = 0;
    
    // TODO: Save to your database here
    // await saveToDatabase(newOpportunity);
    
    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}
