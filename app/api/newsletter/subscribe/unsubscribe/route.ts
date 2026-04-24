import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    const subscriber = await prisma.subscriber.findUnique({
      where: { email }
    });
    
    if (!subscriber) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
    
    await prisma.subscriber.update({
      where: { email },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ message: 'Successfully unsubscribed.' });
    
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
