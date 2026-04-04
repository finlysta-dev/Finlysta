"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Link as LinkIcon, 
  Briefcase, 
  Code, 
  Map,
  Users,
  Award,
  ExternalLink,
  BookOpen,
  Search
} from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [category, setCategory] = useState("resume-tips");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  // Category configuration with display names and icons
  const categories = [
    { id: "resume-tips", label: "Resume Tips", icon: FileText, color: "bg-blue-100 text-blue-800" },
    { id: "interview", label: "Interview Prep", icon: Users, color: "bg-green-100 text-green-800" },
    { id: "roadmap", label: "Career Roadmaps", icon: Map, color: "bg-purple-100 text-purple-800" },
    { id: "projects", label: "Project Ideas", icon: Code, color: "bg-orange-100 text-orange-800" },
    { id: "skills", label: "Skill Development", icon: Award, color: "bg-pink-100 text-pink-800" },
    { id: "jobs", label: "Job Search", icon: Briefcase, color: "bg-indigo-100 text-indigo-800" },
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      setLoading(true);
      const res = await fetch("/api/resources");
      const data = await res.json();
      
      console.log("API Response:", data);
      
      if (Array.isArray(data)) {
        setResources(data);
      } else if (data.resources && Array.isArray(data.resources)) {
        setResources(data.resources);
      } else if (data.data && Array.isArray(data.data)) {
        setResources(data.data);
      } else {
        console.error("Unexpected API response format:", data);
        setResources([]);
        setError("Invalid data format received");
      }
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  }

  // Filter by category and search query - FIXED VERSION
  const filtered = resources.filter(resource => {
    // First filter by category
    const matchesCategory = resource.category === category;
    if (!matchesCategory) return false;
    
    // If no search query, include all resources in this category
    if (!searchQuery.trim()) return true;
    
    // Otherwise, search in title and excerpt (case-insensitive)
    const query = searchQuery.toLowerCase().trim();
    const titleMatch = resource.title?.toLowerCase().includes(query);
    const excerptMatch = resource.excerpt?.toLowerCase().includes(query);
    const contentMatch = resource.content?.toLowerCase().includes(query);
    
    return titleMatch || excerptMatch || contentMatch;
  });

  // Get icon for resource type - FIXED: changed Filetext to FileText
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'pdf': return FileText;  // Fixed: was Filetext
      case 'link': return LinkIcon;
      default: return BookOpen;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchResources}
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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career Resources
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover curated resources to accelerate your career growth, from resume tips to interview preparation.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources by title, description, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-gray-900 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
            </div>
            
            {/* Search active indicator */}
            {searchQuery && (
              <div className="mt-2 text-sm text-blue-200">
                Searching for: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery("")}
                  className="ml-2 underline hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                  }}
                  className={`
                    inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium
                    transition-all duration-200 transform hover:scale-105
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filtered.length}</span> resources in{' '}
            <span className="font-semibold text-blue-600">
              {categories.find(c => c.id === category)?.label}
            </span>
            {searchQuery && (
              <> matching "<span className="font-semibold">{searchQuery}</span>"</>
            )}
          </p>
          
          {/* Clear filters button */}
          {(searchQuery || category !== "resume-tips") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("resume-tips");
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Resources Grid */}
        {filtered.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-12 border-2 border-dashed">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `We couldn't find any resources matching "${searchQuery}" in this category.`
                : "We couldn't find any resources in this category."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("resume-tips");
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View all resources
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => {
              const TypeIcon = getTypeIcon(r.type);
              const categoryInfo = categories.find(c => c.id === r.category) || categories[0];
              
              return (
                <div
                  key={r.id}
                  onClick={() => {
                    if (r.type === "text") {
                      router.push(`/resources/${r.slug}`);
                    } else if (r.type === "pdf") {
                      window.open(r.fileUrl || r.fileurl, '_blank');
                    } else if (r.type === "link") {
                      window.open(r.link, '_blank');
                    }
                  }}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                >
                  {/* Card Header with Category Color */}
                  <div className={`h-2 ${categoryInfo.color.split(' ')[0]}`} />
                  
                  <div className="p-6">
                    {/* Category and Type Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                        <categoryInfo.icon className="h-3 w-3" />
                        {categoryInfo.label}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">
                        <TypeIcon className="h-3 w-3" />
                        {r.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                      {r.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {r.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                        {r.type === 'text' ? 'Read More' : 'Open Resource'}
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}