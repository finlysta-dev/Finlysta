'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTracking } from '@/hooks/useTracking';
import { 
  FileText, ChevronDown, Mail,
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
  Sparkles,
  Bookmark,
  Send,
  LayoutGrid,
  BriefcaseBusiness,
  MessagesSquare,
  ChartNoAxesCombined,
  ShieldCheck,
  Bell,
  ChevronLeft,
  ChevronRight,
  Heart
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
  shortDescription?: string;
}

const popularArticles = [
  { title: "Top 10 Excel Functions for Finance Professionals", read: "7 min read" },
  { title: "How to Prepare for Finance Internships", read: "6 min read" },
  { title: "Difference Between FP&A and Financial Analysis", read: "5 min read" },
  { title: "Best Courses to Learn Finance in 2024", read: "6 min read" },
  { title: 'How to Answer "Tell Me About Yourself"', read: "4 min read" },
];

// label + the category id it maps to (used to compute counts dynamically)
const sidebarCategories = [
  { label: "Career Guide", id: "career" },
  { label: "Resume & Cover Letter", id: "resume-tips" },
  { label: "Interview Tips", id: "jobs" },
  { label: "Excel & Analytics", id: "roadmap" },
  { label: "Finance Basics", id: "profile-tips" },
  { label: "Industry Insights", id: "insights" },
];

// --- Header nav config ---
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/internships", label: "Internships" },
  { href: "/learning-hub", label: "Learning Hub" },
  { href: "/career-paths", label: "Career Paths" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/blogs", label: "Blogs" },
];

const noPrefetch = ["/blogs", "/learning-hub", "/interview-prep", "/career-paths"];

const SAVED_BLOGS_KEY = "finlysta_saved_blogs";

function Header({
  savedCount,
  onOpenSaved,
}: {
  savedCount: number;
  onOpenSaved: () => void;
}) {
  return (
    <div className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/Finlysta.png"
              alt="Finlysta Logo"
              width={160}
              height={36}
              priority
              className="object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.label === "Blogs";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={!noPrefetch.includes(link.href)}
                  className={`text-sm font-bold transition-colors ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                      : "text-black hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Bell className="h-3.5 w-3.5" />
              Job Alerts
            </button>
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Heart className="h-3.5 w-3.5" fill="currentColor" />
              Saved Blogs{savedCount > 0 ? ` (${savedCount})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ resources }: { resources: Resource[] }) {
  return (
    <aside className="w-[280px] flex-shrink-0 space-y-4">
      {/* Popular Articles */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2.5 text-base font-bold text-gray-900">
          <TrendingUp className="h-6 w-6 text-blue-600" /> Popular Articles
        </h3>
        <ul className="space-y-4">
          {popularArticles.map((a, i) => (
            <li key={i} className="flex gap-3 items-start group">
              <div className="h-16 w-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
                <span className="text-gray-400 text-sm font-bold">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0 -mt-0.5">
                <p className="text-[14px] font-semibold leading-snug text-gray-900 group-hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                  {a.title}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {a.read}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2.5 text-base font-bold text-gray-900">
          <Bookmark className="h-5 w-5 text-blue-600" /> Categories
        </h3>
        <ul className="space-y-4">
          {sidebarCategories.map((c) => {
            const count = resources.filter((r) => r.category === c.id).length;
            return (
              <li
                key={c.label}
                className="flex items-center justify-between text-black hover:text-blue-600 cursor-pointer transition-colors text-[15px] font-medium"
              >
                <span className="text-black">{c.label}</span>
                <span className="text-gray-500 font-semibold">{count}</span>
              </li>
            );
          })}
        </ul>
        <button className="mt-6 w-full rounded-lg border border-blue-600 py-2.5 text-[14px] font-medium text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          View All Articles <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Newsletter */}
      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-blue-600" />
          <h3 className="text-[14px] font-bold text-gray-900">Never Miss an Update</h3>
        </div>
        <p className="mt-1 text-[12px] text-gray-600 leading-relaxed">
          Get the latest finance career tips, job search strategies, and insider insights delivered to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] outline-none placeholder:text-gray-400 focus:border-blue-500 transition-colors text-gray-900"
        />
        <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-[13px] font-medium text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
          Subscribe <Send className="h-3.5 w-3.5" />
        </button>
        <p className="mt-3 text-center text-[11px] text-gray-500">No spam. Unsubscribe anytime.</p>
      </div>
    </aside>
  );
}

function SavedBlogsModal({
  isOpen,
  onClose,
  savedResources,
  onRemove,
}: {
  isOpen: boolean;
  onClose: () => void;
  savedResources: Resource[];
  onRemove: (id: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Heart className="h-5 w-5 text-blue-600" fill="currentColor" />
            Saved Blogs
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 space-y-3">
          {savedResources.length === 0 ? (
            <div className="text-center py-10">
              <Heart className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                No saved blogs yet. Tap the heart icon on any blog to save it here.
              </p>
            </div>
          ) : (
            savedResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 p-3 hover:border-blue-200 transition-colors"
              >
                <Link
                  href={`/blogs/${resource.slug}`}
                  onClick={onClose}
                  className="min-w-0 flex-1"
                >
                  <p className="text-[14px] font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {resource.title}
                  </p>
                  <p className="mt-1 text-[12px] text-gray-500">
                    {resource.readTime || 5} min read
                  </p>
                </Link>
                <button
                  onClick={() => onRemove(resource.id)}
                  className="flex-shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Remove from saved"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const { track } = useTracking();
  const [resources, setResources] = useState<Resource[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const postsPerPage = 6;

  const categories = [
    { id: "all", label: "All", icon: LayoutGrid, color: "from-blue-500 to-blue-600" },
    { id: "career", label: "Career Guide", icon: BriefcaseBusiness, color: "from-purple-500 to-purple-600" },
    { id: "resume-tips", label: "Resume & Cover Letter", icon: FileText, color: "from-green-500 to-green-600" },
    { id: "jobs", label: "Interview Tips", icon: MessagesSquare, color: "from-orange-500 to-orange-600" },
    { id: "roadmap", label: "Excel & Analytics", icon: ChartNoAxesCombined, color: "from-red-500 to-red-600" },
    { id: "profile-tips", label: "Finance Basics", icon: BookOpen, color: "from-teal-500 to-teal-600" },
    { id: "insights", label: "Industry Insights", icon: ShieldCheck, color: "from-indigo-500 to-indigo-600" },
  ];

  useEffect(() => {
    track('Blogs Page Viewed', {
      page: 'blogs',
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Load saved blogs from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SAVED_BLOGS_KEY);
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // ignore malformed / unavailable storage
    }
  }, []);

  const persistSavedIds = (ids: string[]) => {
    setSavedIds(ids);
    try {
      window.localStorage.setItem(SAVED_BLOGS_KEY, JSON.stringify(ids));
    } catch {
      // ignore storage errors
    }
  };

  const toggleSaved = (id: string) => {
    if (savedIds.includes(id)) {
      persistSavedIds(savedIds.filter((sid) => sid !== id));
    } else {
      persistSavedIds([...savedIds, id]);
    }
  };

  const removeSaved = (id: string) => {
    persistSavedIds(savedIds.filter((sid) => sid !== id));
  };

  const calculateReadTime = (content: string): number => {
    if (!content) return 5;
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

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
      } else {
        blogData = [];
      }
      
      blogData = blogData.map((blog: any) => ({
        ...blog,
        readTime: blog.readTime || calculateReadTime(blog.content || ''),
        shortDescription: blog.shortDescription || blog.excerpt || 'Read more about this topic...'
      }));
      
      setResources(blogData);
      
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
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
      const shortDesc = (resource.shortDescription || '').toLowerCase();
      const excerpt = (resource.excerpt || '').toLowerCase();
      return title.includes(query) || shortDesc.includes(query) || excerpt.includes(query);
    }
    
    return true;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredResources.slice(indexOfFirstPost, indexOfLastPost);
  const totalFilteredCount = filteredResources.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / postsPerPage));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    setCurrentPage(1);
  };

  const savedResources = resources.filter((r) => savedIds.includes(r.id));

  const BlogSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative w-full h-40 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-3 bg-gray-200 rounded mb-3 w-2/3"></div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
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
      <Header savedCount={savedIds.length} onOpenSaved={() => setIsSavedOpen(true)} />

      <SavedBlogsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedResources={savedResources}
        onRemove={removeSaved}
      />

      {/* Hero Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-4 inline-block rounded-md border border-blue-600 bg-white px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-600">
            BLOGS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
            Insights to Build Your <br />
            <span className="mt-2 inline-block text-blue-600">
              Finance Career
            </span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base text-black leading-relaxed sm:text-lg">
            Career guidance, skills, interview tips, and industry insights to
            <br />
            help you land your dream role in finance.
          </p>
          <div className="mt-6 mx-auto flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
            <Search className="h-5 w-5 text-black" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent text-base text-black outline-none"
              style={{ color: "#000" }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Tabs */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2">
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
                    inline-flex items-center justify-center
                    gap-1.5
                    px-4
                    h-10
                    rounded-lg
                    text-[13px]
                    font-medium
                    whitespace-nowrap
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-900 hover:border-blue-300 hover:bg-blue-50"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={isActive ? "text-white" : "text-black"}
                  />
                  <span>{cat.label}</span>
                  {resourceCount > 0 && (
                    <span className={`ml-1 text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      ({resourceCount})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content: Blogs Grid + Right Sidebar */}
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <BlogSkeleton key={index} />
                ))}
              </div>
            ) : currentPosts.length === 0 ? (
              <div className="text-center bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {category === "all" ? "No blogs found" : `No ${categories.find(c => c.id === category)?.label} blogs yet`}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
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
                    className="mt-3 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 text-sm"
                  >
                    View all blogs <ArrowRight size={14} />
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 ml-2 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 text-sm"
                  >
                    Clear search <X size={14} />
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Header: Latest Articles + Sort By - Removed extra arrow */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-black">Latest Articles</h2>
                  <div className="flex items-center gap-3 pr-1">
                    <span className="text-[14px] font-medium text-black">Sort by:</span>
                    <div className="relative">
                      <select
                        className="
                          min-w-[160px]
                          h-11
                          rounded-xl
                          border
                          border-gray-300
                          bg-white
                          pl-3
                          pr-9
                          text-[14px]
                          font-medium
                          text-black
                          shadow-sm
                          appearance-none
                          focus:outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:border-blue-500
                        "
                      >
                        <option>Newest First</option>
                        <option>Oldest First</option>
                        <option>Most Popular</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentPosts.map((resource) => {
                    const categoryInfo = categories.find(c => c.id === resource.category) || categories[0];
                    const coverImageUrl = resource.coverImage ? getGoogleDriveImageUrl(resource.coverImage) : null;
                    const hasImageError = imageErrors[resource.id];
                    const isSaved = savedIds.includes(resource.id);
                    
                    const getCategoryDisplay = (cat: string) => {
                      switch(cat) {
                        case 'career': return 'Career Guide';
                        case 'resume-tips': return 'Resume Tips';
                        case 'jobs': return 'Interview Tips';
                        case 'roadmap': return 'Excel & Analytics';
                        case 'profile-tips': return 'Finance Basics';
                        case 'insights': return 'Industry Insights';
                        default: return cat;
                      }
                    };
                    
                    const description = resource.shortDescription || resource.excerpt || 'Read more about this topic...';
                    
                    return (
                      <div
                        key={resource.id}
                        className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5"
                      >
                        <Link href={`/blogs/${resource.slug}`} className="block">
                          <div className="relative w-full bg-gray-100 overflow-hidden rounded-t-xl">
                            {coverImageUrl && !hasImageError ? (
                              <img
                                src={coverImageUrl}
                                alt={resource.title}
                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={() => handleImageError(resource.id)}
                              />
                            ) : (
                              <div className={`w-full h-36 bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center`}>
                                <BookOpen className="w-12 h-12 text-white/30" />
                              </div>
                            )}
                            {resource.views && resource.views > 0 && (
                              <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px]">
                                <Eye className="h-3 w-3" />
                                {resource.views}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full mb-2 uppercase">
                              {getCategoryDisplay(resource.category)}
                            </span>
                            
                            <h3 className="text-[15px] font-bold text-black group-hover:text-blue-600 transition line-clamp-2 min-h-[40px]">
                              {resource.title}
                            </h3>
                            
                            <p className="text-[13px] text-black leading-relaxed mt-2 line-clamp-2 min-h-[36px]">
                              {description}
                            </p>
                            
                            <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                              <div className="flex items-center gap-1.5">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 overflow-hidden flex-shrink-0">
                                  <Image
                                    src="/Finlysta_team.png"
                                    alt="Finlysta Team"
                                    width={24}
                                    height={24}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-[13px] font-medium text-gray-700">Finlysta Team</span>
                                {/* Heart icon next to Finlysta Team */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleSaved(resource.id);
                                  }}
                                  className="flex items-center justify-center transition-colors ml-9"
                                  aria-label={isSaved ? "Remove from saved" : "Save blog"}
                                >
                                  <Heart
                                    className="h-4 w-4 transition-colors"
                                    fill={isSaved ? "#ef4444" : "none"}
                                    stroke={isSaved ? "#ef4444" : "#9ca3af"}
                                  />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-[13px] text-black">
                                <span className="text-black">{formatDate(resource.createdAt)}</span>
                                <span className="text-black">·</span>
                                <span className="text-black">{resource.readTime || 5} min read</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Pagination: blue bg / white text, numbered 1 2 3 + Prev/Next */}
            {!loading && totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "40px",
                  marginBottom: "8px",
                }}
              >
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid #2563eb",
                    background: currentPage === 1 ? "#eff6ff" : "#ffffff",
                    color: "#2563eb",
                    fontWeight: 500,
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                  const isActive = currentPage === pageNumber;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        width: "40px",
                        height: "40px",
                        fontSize: "14px",
                        borderRadius: "8px",
                        border: isActive ? "none" : "1px solid #2563eb",
                        background: isActive ? "#2563eb" : "#ffffff",
                        color: isActive ? "#ffffff" : "#2563eb",
                        fontWeight: isActive ? 700 : 500,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: isActive ? "0 4px 12px rgba(37, 99, 235, 0.3)" : "none",
                      }}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid #2563eb",
                    background: currentPage === totalPages ? "#eff6ff" : "#ffffff",
                    color: "#2563eb",
                    fontWeight: 500,
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <Sidebar resources={resources} />
        </div>
      </div>
    </div>
  );
}