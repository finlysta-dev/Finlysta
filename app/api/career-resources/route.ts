// app/api/career-resources/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch from Blog table instead of CareerResource
    const blogs = await prisma.blog.findMany({
      where: {
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        category: true,
        coverImage: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        views: true,
        clicks: true,
        shortDescription: true, // This exists in Blog table
        author: true,
        tags: true,
        avgReadTime: true,
      }
    });
    
    // Format the response
    const formattedBlogs = blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'career',
      coverImage: blog.coverImage,
      published: blog.published,
      createdAt: blog.publishedAt || blog.createdAt,
      updatedAt: blog.updatedAt,
      views: blog.views || 0,
      clicks: blog.clicks || 0,
      shortDescription: blog.shortDescription || blog.excerpt || 'Read more about this topic...',
      author: blog.author || 'Finlysta Team',
      readTime: blog.avgReadTime || calculateReadTime(blog.content || ''),
      type: 'blog',
      downloadCount: 0,
    }));
    
    return NextResponse.json(formattedBlogs);
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blogs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function calculateReadTime(content: string): number {
  if (!content) return 5;
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}