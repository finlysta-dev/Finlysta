import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Test API received:', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'API is working!',
      receivedData: body 
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}