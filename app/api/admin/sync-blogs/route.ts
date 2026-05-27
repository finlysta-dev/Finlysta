import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const resources = await prisma.careerResource.findMany({
      where: { published: true }
    });

    const results = [];
    
    for (const resource of resources) {
      // Check if blog entry exists
      const existingBlog = await prisma.blog.findFirst({
        where: { slug: resource.slug }
      });

      if (!existingBlog) {
        const blog = await prisma.blog.create({
          data: {
            title: resource.title,
            slug: resource.slug,
            content: resource.content || '',
            excerpt: resource.excerpt || '',
            category: resource.category || 'General',
            coverImage: resource.coverImage,
            published: resource.published,
            publishedAt: resource.createdAt,
            author: 'Admin',
            tags: [],
            views: 0,
            clicks: 0,
          }
        });
        results.push({ slug: blog.slug, status: 'created', id: blog.id });
      } else {
        results.push({ slug: existingBlog.slug, status: 'exists', id: existingBlog.id });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
