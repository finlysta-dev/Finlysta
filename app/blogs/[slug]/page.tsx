'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react';

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
  
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  useEffect(() => {
    if (resource && !viewTracked && slug) {
      trackBlogView();
    }
  }, [resource, viewTracked, slug]);

  const fetchBlog = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/blogs/${slug}`);
      
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
    if (!slug) return;
    
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
          blogSlug: slug,
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
    if (!slug) return;
    
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
          blogSlug: slug,
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
    
    if (url.includes('googleusercontent.com')) return url;
    if (url.includes('uc?export=view')) return url;
    
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
    if (!slug) return;
    
    const savedItems = JSON.parse(localStorage.getItem('saved_blogs') || '[]');
    if (!saved) {
      savedItems.push(slug);
      localStorage.setItem('saved_blogs', JSON.stringify(savedItems));
      setSaved(true);
    } else {
      const filtered = savedItems.filter((item: string) => item !== slug);
      localStorage.setItem('saved_blogs', JSON.stringify(filtered));
      setSaved(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  // Process HTML content to handle external links for tracking
  const processHtmlContent = (html: string) => {
    if (!html) return '';
    
    // Create a temporary div to parse HTML (only runs on client)
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Find all anchor tags and add click tracking attributes
      const links = tempDiv.querySelectorAll('a');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
          link.setAttribute('data-track-url', href);
          link.setAttribute('data-track-text', link.textContent || 'link');
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          link.addEventListener('click', (e) => {
            e.preventDefault();
            trackBlogClick(href, link.textContent || 'link');
            window.open(href, '_blank');
          });
        }
      });
      
      return tempDiv.innerHTML;
    }
    return html;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-[#0A2540] font-semibold rounded-lg hover:bg-[#FFA500] transition"
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
      'Career Advice': 'Career Advice',
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
      'Career Advice': 'bg-amber-100 text-amber-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Custom CSS for HTML content
  const htmlStyles = `
    .blog-html-content {
      font-size: 1.125rem;
      line-height: 1.75;
      color: #374151;
    }
    .blog-html-content h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-top: 2rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e7eb;
      color: #111827;
    }
    .blog-html-content h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 1.75rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
      color: #111827;
    }
    .blog-html-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: #111827;
    }
    .blog-html-content p {
      margin-bottom: 1rem;
    }
    .blog-html-content ul, .blog-html-content ol {
      padding-left: 1.5rem;
      margin-bottom: 1rem;
    }
    .blog-html-content li {
      margin-bottom: 0.25rem;
    }
    .blog-html-content a {
      color: #2563eb;
      text-decoration: underline;
    }
    .blog-html-content a:hover {
      color: #1d4ed8;
    }
    .blog-html-content hr {
      margin: 1.5rem 0;
      border-color: #e5e7eb;
    }
    .blog-html-content blockquote {
      border-left: 4px solid #3b82f6;
      background-color: #eff6ff;
      padding: 1rem;
      margin: 1rem 0;
      font-style: italic;
    }
    .blog-html-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    .blog-html-content th {
      background-color: #2563eb;
      color: white;
      padding: 0.75rem;
      text-align: left;
    }
    .blog-html-content td {
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .blog-html-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
    .blog-html-content .summary-box {
      background: #f0f7ff;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 1px solid #0056b3;
    }
    .blog-html-content .key-insight {
      background: #e8f4f8;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      font-size: 1.1rem;
      font-weight: bold;
      margin: 30px 0;
    }
    .blog-html-content .recruiter-card {
      background: #fafafa;
      padding: 20px;
      border-radius: 12px;
      margin: 15px 0;
      border-left: 4px solid #0056b3;
    }
    .blog-html-content .template-card {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
    }
    .blog-html-content .code-block {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 15px;
      border-radius: 8px;
      font-family: "Courier New", monospace;
      margin: 10px 0;
      overflow-x: auto;
      font-size: 0.85rem;
    }
    .blog-html-content .cta-box {
      background: linear-gradient(135deg, #0056b3, #0a2540);
      color: white;
      padding: 30px;
      border-radius: 16px;
      margin: 40px 0;
      text-align: center;
    }
    .blog-html-content .faq-item {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .blog-html-content .bad-message {
      background: #fff2f0;
      border-left: 4px solid #ff4d4f;
      padding: 15px;
      border-radius: 12px;
      margin: 15px 0;
    }
    .blog-html-content .good-message {
      background: #f6ffed;
      border-left: 4px solid #52c41a;
      padding: 15px;
      border-radius: 12px;
      margin: 15px 0;
    }
    .blog-html-content .example-box {
      background: #e6f7ff;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 1px solid #91d5ff;
    }
    .blog-html-content .footer-note {
      text-align: center;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 12px;
      margin-top: 40px;
    }
    @media (max-width: 600px) {
      .blog-html-content h1 { font-size: 1.6rem; }
      .blog-html-content h2 { font-size: 1.3rem; }
      .blog-html-content table { font-size: 0.75rem; }
      .blog-html-content th, .blog-html-content td { padding: 6px; }
    }
  `;

  const processedContent = processHtmlContent(resource.content || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Styles */}
      <style>{htmlStyles}</style>

      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A2540] transition-colors group"
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
          {directImageUrl && !imageError && (
            <div className="relative w-full bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <div className="relative w-full h-64 md:h-96 overflow-hidden bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] flex items-center justify-center">
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
            <div className="bg-blue-50 rounded-lg p-5 mb-8 border-l-4 border-[#FFD700]">
              <p className="text-gray-700 text-base leading-relaxed">
                {resource.excerpt}
              </p>
            </div>

            {/* HTML CONTENT - Using dangerouslySetInnerHTML for HTML content */}
            <div 
              className="blog-html-content"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
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
                  <Bookmark size={14} className={saved ? 'fill-[#FFD700] text-[#FFD700]' : ''} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#FFD700] text-[#0A2540] font-semibold rounded-lg hover:bg-[#FFA500] transition text-sm"
                >
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Browse all blogs link */}
        <div className="mt-8 text-center">
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#0A2540] hover:text-[#FFD700] font-medium transition-colors"
          >
            ← Browse all blog posts
          </Link>
        </div>

        {/* ✅ ADDED: Return to Home link */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#0A2540] hover:text-[#FFD700] font-medium transition-colors"
          >
            ← Return to Finlysta Home
          </Link>
        </div>
      </div>
    </div>
  );
}