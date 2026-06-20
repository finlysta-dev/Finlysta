'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTracking } from '@/hooks/useTracking';
import { 
  FileText, 
  Link as LinkIcon, 
  Briefcase, 
  Map,
  Award,
  ExternalLink,
  BookOpen,
  Search,
  Calendar,
  X,
  UserCheck,
  ArrowLeft
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
}

export default function BlogsPage() {
  const { track } = useTracking();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Category configuration - ALL WITH BLUE COLOR
  const categories = [
    { id: "all", label: "All Blogs", icon: BookOpen, color: "bg-blue-600 text-white", description: "All Blogs in one place" },
    { id: "career", label: "Career Guide", icon: Briefcase, color: "bg-blue-600 text-white", description: "Career guidance and tips" },
    { id: "resume-tips", label: "Resume Tips", icon: FileText, color: "bg-blue-600 text-white", description: "Create winning resumes that get noticed" },
    { id: "jobs", label: "Job Search", icon: Briefcase, color: "bg-blue-600 text-white", description: "Tips and strategies for job hunting" },
    { id: "roadmap", label: "Career Roadmaps", icon: Map, color: "bg-blue-600 text-white", description: "Step-by-step career progression guides" },
    { id: "profile-tips", label: "Profile Tips", icon: UserCheck, color: "bg-blue-600 text-white", description: "Optimize your professional profile" },
  ];

  // Track page view
  useEffect(() => {
    track('Blogs Page Viewed', {
      page: 'blogs',
      totalResources: resources.length,
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Track category and search changes
  useEffect(() => {
    if (!loading && resources.length > 0) {
      track('Blog Filter Applied', {
        category: category,
        searchQuery: searchQuery || 'none',
        resultsCount: filteredResources.length,
        totalResources: resources.length,
        timestamp: new Date().toISOString(),
      });
    }
  }, [category, searchQuery, loading]);

  const fetchBlogs = async () => {
    track('Blogs Refreshed', {
      source: 'manual_refresh',
      timestamp: new Date().toISOString(),
    });

    try {
      setLoading(true);
      const res = await fetch("/api/career-resources");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setResources(data);
        track('Blogs Loaded', {
          totalBlogs: data.length,
          source: 'api',
          timestamp: new Date().toISOString(),
        });
      } else if (data.resources && Array.isArray(data.resources)) {
        setResources(data.resources);
        track('Blogs Loaded', {
          totalBlogs: data.resources.length,
          source: 'api',
          timestamp: new Date().toISOString(),
        });
      } else if (data.data && Array.isArray(data.data)) {
        setResources(data.data);
        track('Blogs Loaded', {
          totalBlogs: data.data.length,
          source: 'api',
          timestamp: new Date().toISOString(),
        });
      } else {
        setResources([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs");
      track('Blogs Fetch Error', {
        errorMessage: err instanceof Error ? err.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    if (category !== "all" && resource.category !== category) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return resource.title.toLowerCase().includes(query) ||
             resource.excerpt.toLowerCase().includes(query);
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'pdf': return FileText;
      case 'link': return LinkIcon;
      default: return BookOpen;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Function to get Google Drive direct image URL
  const getGoogleDriveImageUrl = (url: string) => {
    if (!url) return null;
    
    // Check if it's a Google Drive link
    const driveMatch = url.match(/\/d\/([^\/]+)/);
    if (driveMatch) {
      const fileId = driveMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    
    // Check if it's already a direct image URL
    if (url.includes('uc?export=view') || url.includes('usercontent')) {
      return url;
    }
    
    return url;
  };

  const handleImageError = (resourceId: string) => {
    setImageErrors(prev => ({ ...prev, [resourceId]: true }));
  };

  const currentCategory = categories.find(c => c.id === category);

  // Handle blog click
  const handleBlogClick = (resource: Resource) => {
    track('Blog Clicked', {
      blogId: resource.id,
      blogTitle: resource.title,
      blogCategory: resource.category,
      blogType: resource.type,
      timestamp: new Date().toISOString(),
    });

    if (resource.type === "text") {
      router.push(`/blogs/${resource.slug}`);
    } else if (resource.type === "pdf" && resource.fileUrl) {
      track('Blog PDF Opened', {
        blogId: resource.id,
        blogTitle: resource.title,
        fileUrl: resource.fileUrl,
        timestamp: new Date().toISOString(),
      });
      window.open(resource.fileUrl, '_blank');
    } else if (resource.type === "link" && resource.link) {
      track('Blog External Link Opened', {
        blogId: resource.id,
        blogTitle: resource.title,
        linkUrl: resource.link,
        timestamp: new Date().toISOString(),
      });
      window.open(resource.link, '_blank');
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    track('Blog Category Selected', {
      category: categoryId,
      categoryLabel: categories.find(c => c.id === categoryId)?.label || categoryId,
      previousCategory: category,
      timestamp: new Date().toISOString(),
    });
    setCategory(categoryId);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0 && query.length % 3 === 0) {
      track('Blog Search Performed', {
        query: query,
        resultsCount: filteredResources.length,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    track('Blog Filters Cleared', {
      previousCategory: category,
      previousSearch: searchQuery,
      timestamp: new Date().toISOString(),
    });
    setSearchQuery("");
    setCategory("all");
  };

  // Handle back to home
  const handleBackToHome = () => {
    track('Back to Home Clicked', {
      location: 'blogs_page',
      timestamp: new Date().toISOString(),
    });
  };

  // Skeleton Loading Component
  const BlogSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative w-full h-48 bg-gray-200"></div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchBlogs} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Home Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            onClick={handleBackToHome}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Blogs</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Free guides and templates to help you land your dream financial analyst job
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-3 pr-12 text-gray-900 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-blue-200">
                Showing results for: "{searchQuery}"
                <button 
                  onClick={() => {
                    track('Blog Search Cleared', {
                      previousQuery: searchQuery,
                      timestamp: new Date().toISOString(),
                    });
                    setSearchQuery("");
                  }} 
                  className="ml-2 underline hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
        
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.id;
              const resourceCount = cat.id === "all" ? resources.length : resources.filter(r => r.category === cat.id).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                    transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
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

        {/* Coming Soon Message */}
        {!loading && category !== "all" && filteredResources.length === 0 && (
          <div className="mb-8 p-6 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <BookOpen className="h-12 w-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Coming Soon!</h3>
            <p className="text-amber-700">
              More {currentCategory?.label} blogs are on their way. Check back soon!
            </p>
          </div>
        )}

        {/* Results Stats */}
        {!loading && filteredResources.length > 0 && (
          <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredResources.length}</span> blogs
            </p>
            
            {(searchQuery || category !== "all") && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Blogs Grid - Loading State with Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : filteredResources.length === 0 && category === "all" ? (
          <div className="text-center bg-white rounded-xl p-12 border-2 border-dashed border-gray-300">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs yet</h3>
            <p className="text-gray-500">
              Blogs will appear here once added.
            </p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              const categoryInfo = categories.find(c => c.id === resource.category) || categories[0];
              const coverImageUrl = resource.coverImage ? getGoogleDriveImageUrl(resource.coverImage) : null;
              const hasImageError = imageErrors[resource.id];
              
              return (
                <div
                  key={resource.id}
                  onClick={() => handleBlogClick(resource)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                >
                  {/* Cover Image Section */}
                  {coverImageUrl && !hasImageError ? (
                    <div className="relative w-full bg-gray-100">
                      <img
                        src={coverImageUrl}
                        alt={resource.title}
                        className="w-full h-auto object-contain"
                        onError={() => handleImageError(resource.id)}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/30" />
                    </div>
                  )}
                  
                  <div className="p-5">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        <categoryInfo.icon className="h-3 w-3" />
                        {categoryInfo.label}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-500 text-xs">
                        <TypeIcon className="h-3 w-3" />
                        {resource.type === 'text' ? 'Article' : resource.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2 min-h-[56px]">
                      {resource.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                      {resource.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar size={12} />
                        <span>{formatDate(resource.createdAt)}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all text-sm">
                        {resource.type === 'text' ? 'Read More' : 'Open'}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}