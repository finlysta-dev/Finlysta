'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostClient({ params }: BlogPageProps) {
  const [resource, setResource] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(null);
  
  const slug = params.slug;
  
  const viewTracked = useRef(false);
  const startTime = useRef(Date.now());
  const readTimeTracked = useRef(false);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  useEffect(() => {
    if (resource && slug && !viewTracked.current) {
      viewTracked.current = true;
      trackBlogView();
    }
  }, [resource, slug]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!readTimeTracked.current && slug) {
        readTimeTracked.current = true;
        const totalTime = Math.round((Date.now() - startTime.current) / 1000);
        const sessionId = localStorage.getItem('visitor_session_id') || 
          `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        navigator.sendBeacon('/api/analytics/blog-view', JSON.stringify({
          blogSlug: slug,
          sessionId,
          readTime: totalTime,
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [slug]);

  useEffect(() => {
    if (!resource?.content) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim() || 'link';
        
        if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
          e.preventDefault();
          trackBlogClick(href, text);
          
          if (href.startsWith('http')) {
            window.open(href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = href;
          }
        }
      }
    };

    const contentDiv = document.getElementById('blog-content');
    if (contentDiv) {
      contentDiv.addEventListener('click', handleClick);
    }

    return () => {
      if (contentDiv) {
        contentDiv.removeEventListener('click', handleClick);
      }
    };
  }, [resource?.content, slug]);

  // Process content when resource loads - FIXED
  useEffect(() => {
    if (resource?.content) {
      const content = resource.content;
      
      // Check if content is HTML (contains HTML tags)
      const isHtml = /<[a-z][\s\S]*>/i.test(content);
      
      // Check if content is Markdown (contains markdown syntax)
      const isMarkdown = /^#+\s|^[-*+]\s|^>\s|\[.+\]\(.+\)/m.test(content);
      
      // If content is empty or just whitespace, show a message
      if (!content.trim()) {
        setRenderedContent(<p className="text-gray-500">No content available for this blog post.</p>);
        return;
      }
      
      // Check if content is pure HTML with proper structure
      const hasHtmlWrapper = /<div[^>]*>/.test(content) && /<\/div>/.test(content);
      const hasHtmlTags = /<h[1-6]|<p>|<ul>|<ol>|<li>|<table>|<blockquote>/.test(content);
      
      // If content has HTML tags and is properly structured, render as HTML
      if (hasHtmlTags || hasHtmlWrapper) {
        // Clean any broken HTML
        let cleanContent = content;
        
        // Remove any empty div wrappers that might break layout
        cleanContent = cleanContent.replace(/<div[^>]*>\s*<\/div>/g, '');
        
        // Fix any unclosed tags (basic fix)
        if (cleanContent.includes('<div') && !cleanContent.includes('</div>')) {
          cleanContent = cleanContent + '</div>';
        }
        
        setRenderedContent(
          <div 
            className="blog-html-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        );
      } else if (isMarkdown) {
        // Render as Markdown
        setRenderedContent(
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {content}
          </ReactMarkdown>
        );
      } else {
        // Plain text - wrap in paragraphs
        const paragraphs = content.split('\n\n').filter(p => p.trim());
        setRenderedContent(
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-gray-700 leading-relaxed">{p}</p>
            ))}
          </div>
        );
      }
    }
  }, [resource?.content]);

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
      
      if (!response.ok) throw new Error('Failed to fetch blog');
      
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
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
    } catch (error) {
      console.error('Failed to track blog view:', error);
    }
  };

  const trackBlogClick = async (targetUrl: string, linkText: string) => {
    if (!slug) return;
    
    try {
      let sessionId = localStorage.getItem('visitor_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

  const getDirectImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.includes('googleusercontent.com')) return url;
    if (url.includes('uc?export=view')) return url;
    
    const patterns = [/\/d\/([^\/]+)/, /id=([^&]+)/, /uc\?id=([^&]+)/, /file\/d\/([^\/]+)/];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('Link copied to clipboard!');
    }
  };

  // Custom markdown components
  const markdownComponents = {
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 text-gray-900" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-900" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-900" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="mb-1" {...props}>{children}</li>
    ),
    a: ({ href, children, ...props }: any) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline transition-colors" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} {...props}>
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-[#FFD700] bg-gray-50 pl-4 py-2 my-4 italic text-gray-600" {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: any) => (
      <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }: any) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono" {...props}>
        {children}
      </pre>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-900" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-gray-200 px-4 py-2 text-gray-700" {...props}>
        {children}
      </td>
    ),
    hr: () => <hr className="my-8 border-gray-200" />,
    img: ({ src, alt, ...props }: any) => (
      <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" loading="lazy" {...props} />
    ),
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
      'resume-tips': 'Resume Tips', 'jobs': 'Job Search', 'roadmap': 'Career Roadmaps',
      'profile-tips': 'Profile Tips', 'interview': 'Interview Prep', 'skills': 'Skill Development',
      'career': 'Career Guide', 'Career Advice': 'Career Advice',
    };
    return categories[category] || category.replace(/-/g, ' ');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'resume-tips': 'bg-blue-100 text-blue-700', 'jobs': 'bg-indigo-100 text-indigo-700',
      'roadmap': 'bg-purple-100 text-purple-700', 'profile-tips': 'bg-emerald-100 text-emerald-700',
      'interview': 'bg-green-100 text-green-700', 'skills': 'bg-pink-100 text-pink-700',
      'career': 'bg-amber-100 text-amber-700', 'Career Advice': 'bg-amber-100 text-amber-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button - Black bar with left-aligned content */}
      <div className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors group"
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
              <img
                src={directImageUrl}
                alt={resource.title}
                className="w-full h-auto object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          )}

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
                <span>{new Date(resource.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
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
              <p className="text-gray-700 text-base leading-relaxed">{resource.excerpt}</p>
            </div>

            {/* Blog Content - Fixed rendering */}
            <div id="blog-content" className="blog-content">
              {renderedContent || (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-500">Content is being loaded...</p>
                </div>
              )}
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
                <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm">
                  <Bookmark size={14} className={saved ? 'fill-[#FFD700] text-[#FFD700]' : ''} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button onClick={handleShare} className="flex items-center gap-1.5 px-4 py-2 bg-[#FFD700] text-[#0A2540] font-semibold rounded-lg hover:bg-[#FFA500] transition text-sm">
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8 text-left">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[#0A2540] hover:text-[#FFD700] font-medium transition-colors">
            ← Browse all blog posts
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-[#0A2540] hover:text-[#FFD700] font-medium transition-colors">
            ← Return to Finlysta Home
          </Link>
        </div>
      </div>
    </div>
  );
}