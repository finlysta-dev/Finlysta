'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  type: string;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  fileUrl: string | null;
  link: string | null;
  downloadCount: number;
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const [resource, setResource] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [viewTracked, setViewTracked] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [params.slug]);

  useEffect(() => {
    if (resource && !viewTracked) {
      trackBlogView();
    }
  }, [resource, viewTracked]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/blogs/${params.slug}`);
      
      if (response.status === 404) {
        setError('Blog post not found');
        setResource(null);
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      
      const data = await response.json();
      setResource(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const trackBlogView = async () => {
    try {
      let sessionId = localStorage.getItem('visitor_session_id');
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_session_id', sessionId);
      }

      await fetch('/api/analytics/blog-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug: params.slug,
          sessionId,
          pageUrl: window.location.pathname,
        }),
      });
      setViewTracked(true);
    } catch (error) {
      console.error('Failed to track blog view:', error);
    }
  };

  const trackBlogClick = async (targetUrl: string, linkText: string) => {
    try {
      let sessionId = localStorage.getItem('visitor_session_id');
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_session_id', sessionId);
      }

      await fetch('/api/analytics/blog-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug: params.slug,
          sessionId,
          targetUrl,
          linkText: linkText || 'link',
          linkType: targetUrl.startsWith(window.location.origin) ? 'internal' : 'external',
        }),
      });
    } catch (error) {
      console.error('Failed to track blog click:', error);
    }
  };

  // Function to convert Google Drive URL to direct image URL
  const getDirectImageUrl = (url: string | null) => {
    if (!url) return null;
    
    // If it's already a direct Google Drive image URL
    if (url.includes('googleusercontent.com')) return url;
    if (url.includes('uc?export=view')) return url;
    
    // Extract file ID from various Google Drive URL formats
    const patterns = [
      /\/d\/([^\/]+)/,           
      /id=([^&]+)/,               
      /uc\?id=([^&]+)/,          
      /file\/d\/([^\/]+)/        
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    
    return url;
  };

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem('saved_blogs') || '[]');
    if (!saved) {
      savedItems.push(params.slug);
      localStorage.setItem('saved_blogs', JSON.stringify(savedItems));
      setSaved(true);
    } else {
      const filtered = savedItems.filter((item: string) => item !== params.slug);
      localStorage.setItem('saved_blogs', JSON.stringify(filtered));
      setSaved(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "The blog post you're looking for doesn't exist or has been moved."}
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Browse All Blogs
          </Link>
        </div>
      </div>
    );
  }

  const plainText = resource.content?.replace(/<[^>]*>/g, '') || '';
  const wordCount = plainText.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  const directImageUrl = getDirectImageUrl(resource.coverImage);

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
          
          {/* Cover Image - FIXED: Using regular img tag for external images */}
          {/* Cover Image - Full visibility fix */}
{directImageUrl && !imageError && (
  <div className="relative w-full bg-gray-100">
    <img
      src={directImageUrl}
      alt={resource.title}
      className="w-full h-auto object-contain"
      onError={() => setImageError(true)}
    />
  </div>
)}

{/* Fallback when no image or image fails */}
{(!directImageUrl || imageError) && (
  <div className="relative w-full h-64 md:h-96 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
    <div className="text-center text-white px-4">
      <Bookmark size={48} className="mx-auto mb-2 opacity-50" />
      <p className="text-lg font-medium line-clamp-2">{resource.title}</p>
    </div>
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

            {/* Markdown Content */}
            <div className="markdown-content prose prose-blue max-w-none">
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
                  a: ({ href, children }) => {
                    const linkText = typeof children === 'string' ? children : '';
                    const isExternal = href && !href.startsWith(window.location.origin);
                    
                    if (isExternal) {
                      return (
                        <a 
                          href={href} 
                          onClick={(e) => {
                            e.preventDefault();
                            trackBlogClick(href || '', linkText);
                            setTimeout(() => {
                              window.open(href, '_blank');
                            }, 100);
                          }}
                          className="text-blue-600 hover:underline cursor-pointer"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children} 🔗
                        </a>
                      );
                    }
                    
                    return (
                      <a 
                        href={href} 
                        className="text-blue-600 hover:underline"
                      >
                        {children}
                      </a>
                    );
                  },
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  hr: () => <hr className="my-6 border-gray-200" />,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 my-4 italic text-gray-700">
                      {children}
                    </blockquote>
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
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm"
                >
                  <Bookmark size={14} className={saved ? 'fill-blue-600 text-blue-600' : ''} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
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
    </div>
  );
}