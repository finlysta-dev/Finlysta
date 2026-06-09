import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  console.log('🔍 API called with token:', token);

  if (!token) {
    console.log('❌ No token provided');
    return NextResponse.json(
      { success: false, error: 'No token provided' },
      { status: 401 }
    );
  }

  try {
    // Simplified query - find opportunity by token
    const opportunity = await prisma.opportunity.findFirst({
      where: {
        posterToken: token
      }
    });

    console.log('📊 Found opportunity:', opportunity ? 'YES - ' + opportunity.title : 'NO');

    if (!opportunity) {
      return NextResponse.json(
        { success: false, error: 'Invalid token - no job found' },
        { status: 404 }
      );
    }

    // Return the job data
    return NextResponse.json({
      success: true,
      job: {
        id: opportunity.id,
        title: opportunity.title,
        company: opportunity.company,
        location: opportunity.location,
        type: opportunity.type,
        workMode: opportunity.workMode || 'On-site',
        experience: opportunity.experience || 'Not specified',
        salary: opportunity.salary,
        skills: opportunity.skills || [],
        posterEmail: opportunity.posterEmail,
        posterName: opportunity.posterName,
      }
    });

  } catch (error: any) {
    console.error('❌ Error in API:', error);
    console.error('❌ Error message:', error?.message);
    console.error('❌ Error stack:', error?.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error', 
        details: error?.message 
      },
      { status: 500 }
    );
  }
}