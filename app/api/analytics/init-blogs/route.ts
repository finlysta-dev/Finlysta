import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get all career resources
    const blogs = await prisma.careerResource.findMany({
      where: { published: true }
    });
    
    let initialized = 0;
    
    for (const blog of blogs) {
      // Check if any views exist
      const viewCount = await prisma.blogView.count({
        where: { blogId: blog.id }
      });
      
      if (viewCount === 0) {
        // Create an initialization record
        await prisma.blogView.create({
          data: {
            blogId: blog.id,
            sessionId: 'system-init',
            viewedAt: new Date(),
          }
        });
        initialized++;
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Initialized ${initialized} blogs for tracking`,
      totalBlogs: blogs.length
    });
  } catch (error) {
    console.error('Error initializing blog views:', error);
    return NextResponse.json({ 
      error: (error as Error).message 
    }, { status: 500 });
  }
}