import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/sendWelcomeEmail'; // Import from your lib file

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: email and name are required' 
        },
        { status: 400 }
      );
    }

    // Send the welcome email
    const result = await sendWelcomeEmail(email, name);

    if (result) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Welcome email sent successfully' 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send welcome email' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}