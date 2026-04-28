import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const subscriber = await prisma.subscriber.update({
      where: { email },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter.'
    });
    
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return new Response('Email is required', { status: 400 });
  }
  
  try {
    await prisma.subscriber.update({
      where: { email },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
      },
    });
    
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribed - Finlysta</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9fafb; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #1e40af; }
          .button { display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Unsubscribed Successfully</h1>
          <p>You have been unsubscribed from the Finlysta newsletter.</p>
          <a href="https://finlysta.com" class="button">Back to Finlysta</a>
        </div>
      </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    return new Response('Error unsubscribing', { status: 500 });
  }
}