import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const resource = await prisma.careerResource.findUnique({
      where: { slug: params.slug }
    });

    if (!resource) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Ensure shortDescription is always present
    // If shortDescription is null/empty, use excerpt or generate from content
    let shortDesc = resource.shortDescription || resource.excerpt || '';
    
    // If still empty and content exists, generate from content
    if (!shortDesc && resource.content) {
      const plainText = resource.content.replace(/<[^>]*>/g, '');
      shortDesc = plainText.substring(0, 150);
      if (shortDesc.length > 120) {
        shortDesc = shortDesc.substring(0, 120) + '...';
      }
    }

    const responseData = {
      ...resource,
      shortDescription: shortDesc || 'Read more about this topic...',
      // Also ensure excerpt is set
      excerpt: resource.excerpt || shortDesc || 'Read more about this topic...'
    };

    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}