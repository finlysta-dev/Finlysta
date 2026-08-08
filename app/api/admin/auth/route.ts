import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;
    
    // Simple check - change 'admin123' to your desired password
    if (password === 'admin123' || password === 'finlysta2025') {
      const token = 'admin_token_' + Date.now();
      return NextResponse.json({ 
        success: true, 
        token: token 
      });
    }
    
    return NextResponse.json({ 
      error: 'Invalid password' 
    }, { status: 401 });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error' 
    }, { status: 500 });
  }
}
