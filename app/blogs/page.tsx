'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTracking } from '@/hooks/useTracking';
import { 
  FileText, 
  Briefcase, 
  Map,
  ExternalLink,
  BookOpen,
  Search,
  Calendar,
  X,
  UserCheck,
  ArrowLeft,
  Eye,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage?: string;
  type: string;
  link?: string;
  fileUrl?: string;
  createdAt: string;
  downloadCount: number;
  views?: number;
  readTime?: number;
}

export default function BlogsPage() {
  const { track } = useTracking();
  const [resources, setResources] = useState<Resource[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", label: "All Blogs", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { id: "career", label: "Career Guide", icon: Briefcase, color: "from-purple-500 to-purple-600" },
    { id: "resume-tips", label: "Resume Tips", icon: FileText, color: "from-green-500 to-green-600" },
    { id: "jobs", label: "Job Search", icon: Briefcase, color: "from-orange-500 to-orange-600" },
    { id: "roadmap", label: "Career Roadmaps", icon: Map, color: "from-red-500 to-red-600" },
    { id: "profile-tips", label: "Profile Tips", icon: UserCheck, color: "from-teal-500 to-teal-600" },
  ];

  useEffect(() => {
    track('Blogs Page Viewed', {
      page: 'blogs',
      timestamp: new Date().toISOString(),
    });
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch("/api/career-resources");
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      let blogData: Resource[] = [];
      
      if (Array.isArray(data)) {
        blogData = data;
      } else if (data.resources && Array.isArray(data.resources)) {
        blogData = data.resources;
      } else if (data.data && Array.isArray(data.data)) {
        blogData = data.data;
      } else if (data.blogs && Array.isArray(data.blogs)) {
        blogData = data.blogs;
      } else {
        const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          blogData = possibleArrays[0] as Resource[];
        } else {
          blogData = [];
        }
      }
      
      // Calculate read time for each blog
      blogData = blogData.map(blog => ({
        ...blog,
        readTime: calculateReadTime(blog.content || '')
      }));
      
      setResources(blogData);
      
      track('Blogs Loaded', {
        totalBlogs: blogData.length,
        timestamp: new Date().toISOString(),
      });
      
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content: string): number => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredResources = resources.filter(resource => {
    if (!resource || !resource.id) return false;
    
    if (category !== "all" && resource.category !== category) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const title = (resource.title || '').toLowerCase();
      const excerpt = (resource.excerpt || '').toLowerCase();
      return title.includes(query) || excerpt.includes(query);
    }
    
    return true;
  });

  const formatDate = (date: string) => {
    if (!date) return 'No date';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getGoogleDriveImageUrl = (url: string) => {
    if (!url) return null;
    
    const driveMatch = url.match(/\/d\/([^\/]+)/);
    if (driveMatch) {
      const fileId = driveMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    
    if (url.includes('uc?export=view') || url.includes('usercontent')) {
      return url;
    }
    
    return url;
  };

  const handleImageError = (resourceId: string) => {
    setImageErrors(prev => ({ ...prev, [resourceId]: true }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategory("all");
  };

  const BlogSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative w-full h-52 bg-gray-200"></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-7 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchBlogs} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm font-medium text-gray-700">Blogs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Financial Analyst Career Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Career Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">
              Free guides, templates, and resources to help you land your dream financial analyst job
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search articles, guides, and resources..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-gray-900 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none text-base"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <div className="mt-2 text-sm text-blue-200">
                  Showing results for: <span className="font-semibold">"{searchQuery}"</span>
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="ml-2 underline hover:text-white transition"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex flex-nowrap gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.id;
              const resourceCount = resources.filter(r => {
                if (cat.id === "all") return true;
                return r.category === cat.id;
              }).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`
                    flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                    transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-blue-500/25` 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.label}</span>
                  <span className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                    ({resourceCount})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Stats */}
        {!loading && (
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredResources.length}</span> blogs
                {category !== "all" && (
                  <span className="ml-1">
                    in <span className="font-medium text-gray-700">
                      {categories.find(c => c.id === category)?.label}
                    </span>
                  </span>
                )}
              </p>
              {resources.length > 0 && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  {resources.length} total
                </span>
              )}
            </div>
            
            {(searchQuery || category !== "all") && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center bg-white rounded-2xl p-16 border-2 border-dashed border-gray-300">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {category === "all" ? "No blogs found" : `No ${categories.find(c => c.id === category)?.label} blogs yet`}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery 
                ? `No results found for "${searchQuery}". Try adjusting your search.`
                : category === "all" 
                  ? "Blogs will appear here once added." 
                  : `Check back soon for ${categories.find(c => c.id === category)?.label} content.`
              }
            </p>
            {category !== "all" && (
              <button
                onClick={() => setCategory("all")}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                View all blogs <ArrowRight size={16} />
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 ml-3 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                Clear search <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const categoryInfo = categories.find(c => c.id === resource.category) || categories[0];
              const coverImageUrl = resource.coverImage ? getGoogleDriveImageUrl(resource.coverImage) : null;
              const hasImageError = imageErrors[resource.id];
              
              return (
                <Link
                  key={resource.id}
                  href={`/blogs/${resource.slug}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1 block"
                >
                  {/* Cover Image Section */}
                  {coverImageUrl && !hasImageError ? (
                    <div className="relative w-full bg-gray-100 overflow-hidden">
                      <img
                        src={coverImageUrl}
                        alt={resource.title}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(resource.id)}
                      />
                      {/* Category Badge on Image */}
                      <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${categoryInfo.color} text-white shadow-lg`}>
                        <categoryInfo.icon className="h-3.5 w-3.5" />
                        {categoryInfo.label}
                      </div>
                      {/* Views Badge */}
                      {resource.views && resource.views > 0 && (
                        <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs">
                          <Eye className="h-3.5 w-3.5" />
                          {resource.views}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`relative w-full h-52 overflow-hidden bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center`}>
                      <BookOpen className="w-16 h-16 text-white/30" />
                      <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${categoryInfo.color} text-white shadow-lg`}>
                        <categoryInfo.icon className="h-3.5 w-3.5" />
                        {categoryInfo.label}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2 min-h-[56px]">
                      {resource.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                      {resource.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{formatDate(resource.createdAt)}</span>
                        </div>
                        {resource.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{resource.readTime} min</span>
                          </div>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium group-hover:gap-2.5 transition-all text-sm">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}