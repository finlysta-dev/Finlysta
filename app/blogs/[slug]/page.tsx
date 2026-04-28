import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import prisma from '@/lib/prisma';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const resource = await prisma.careerResource.findUnique({
      where: { slug: params.slug }
    });

    if (!resource) {
      return {
        title: 'Blog Post Not Found | Finlysta',
        description: 'The blog post you are looking for does not exist.',
      };
    }

    const plainText = resource.content?.replace(/<[^>]*>/g, '') || '';
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return {
      title: `${resource.title} | Finlysta Blog`,
      description: resource.excerpt,
      keywords: `${resource.category}, financial analyst career, finance jobs, entry level finance, career tips, ${resource.title}`,
      authors: [{ name: 'Finlysta Team' }],
      openGraph: {
        title: resource.title,
        description: resource.excerpt,
        type: 'article',
        publishedTime: resource.createdAt.toISOString(),
        modifiedTime: resource.updatedAt.toISOString(),
        url: `https://finlysta.com/blogs/${resource.slug}`,
        siteName: 'Finlysta',
        images: [
          {
            url: resource.coverImage || 'https://finlysta.com/og-image.png',
            width: 1200,
            height: 630,
            alt: resource.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: resource.title,
        description: resource.excerpt,
        images: [resource.coverImage || 'https://finlysta.com/og-image.png'],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://finlysta.com/blogs/${resource.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Finlysta',
      description: 'Read our latest blog posts about financial analyst careers.',
    };
  }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  try {
    const resource = await prisma.careerResource.findUnique({
      where: { slug: params.slug }
    });

    if (!resource) {
      notFound();
    }

    const plainText = resource.content?.replace(/<[^>]*>/g, '') || '';
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const getCategoryLabel = (category: string) => {
      const categories: Record<string, string> = {
        'resume-tips': 'Resume Tips',
        'jobs': 'Job Search',
        'roadmap': 'Career Roadmaps',
        'profile-tips': 'Profile Tips',
        'interview': 'Interview Prep',
        'skills': 'Skill Development',
        'career': 'Career Guide',
      };
      return categories[category] || category.replace('-', ' ');
    };

    const getCategoryColor = (category: string) => {
      const colors: Record<string, string> = {
        'resume-tips': 'bg-blue-100 text-blue-700',
        'jobs': 'bg-indigo-100 text-indigo-700',
        'roadmap': 'bg-purple-100 text-purple-700',
        'profile-tips': 'bg-emerald-100 text-emerald-700',
        'interview': 'bg-green-100 text-green-700',
        'skills': 'bg-pink-100 text-pink-700',
        'career': 'bg-amber-100 text-amber-700',
      };
      return colors[category] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back to Blogs</span>
            </Link>
          </div>
        </div>

        {/* Article Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            
            {/* Cover Image */}
            {resource.coverImage && (
              <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-100">
                <Image
                  src={resource.coverImage}
                  alt={resource.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            )}
            
            {/* Header Section */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                  {getCategoryLabel(resource.category)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {resource.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>
                    {new Date(resource.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{readTime} min read</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag size={14} />
                  <span className="capitalize">{resource.type}</span>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-blue-50 rounded-lg p-5 mb-8 border-l-4 border-blue-500">
                <p className="text-gray-700 text-base leading-relaxed">
                  {resource.excerpt}
                </p>
              </div>

              {/* Markdown Content with custom styling */}
              <div className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-200">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    hr: () => <hr className="my-6 border-gray-200" />,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 my-4 italic text-gray-700">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-gray-900">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-200 px-4 py-2 text-gray-700">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {resource.content || ''}
                </ReactMarkdown>
              </div>
            </div>

            {/* Footer Section */}
            <div className="border-t border-gray-100 p-6 sm:p-8 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-500 mb-1">Was this article helpful?</p>
                  <p className="text-xs text-gray-400">Share it with others who might benefit</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm">
                    <Bookmark size={14} />
                    Save
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </article>

          <div className="mt-8 text-center">
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Browse all blog posts
            </Link>
          </div>
        </div>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": resource.title,
              "description": resource.excerpt,
              "author": {
                "@type": "Organization",
                "name": "Finlysta"
              },
              "datePublished": resource.createdAt.toISOString(),
              "dateModified": resource.updatedAt.toISOString(),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://finlysta.com/blogs/${resource.slug}`
              },
              "publisher": {
                "@type": "Organization",
                "name": "Finlysta",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://finlysta.com/Finlysta.png"
                }
              }
            })
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
}