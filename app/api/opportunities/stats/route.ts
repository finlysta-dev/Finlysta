import { NextResponse } from 'next/server';

// This should come from your database
const opportunities = [
  {
    id: '1',
    title: 'Financial Analyst Intern',
    company: 'Goldman Sachs',
    type: 'internship',
  }
];

// Import view counts
let opportunityViews: Record<string, number> = {};

export async function GET() {
  try {
    // Get current view counts
    const viewsRes = await fetch('http://localhost:3000/api/track-opportunity-view');
    const views = await viewsRes.json();
    
    const opportunitiesWithStats = opportunities.map(opp => ({
      ...opp,
      views: views[opp.id] || 0,
      applyClicks: 0 // You can track this similarly
    }));
    
    return NextResponse.json({ opportunities: opportunitiesWithStats });
  } catch (error) {
    console.error('Error fetching opportunity stats:', error);
    return NextResponse.json({ opportunities: [] }, { status: 500 });
  }
}
