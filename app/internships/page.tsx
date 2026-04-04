import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from 'next/dynamic';
import { 
  MapPin, Clock, Wallet, Briefcase, Building2, 
  Search, CheckCircle, Calendar,
  Filter, X, Sparkles, Rocket, RefreshCw
} from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

// Dynamically import FilterSidebar
const FilterSidebar = dynamic(
  () => import('./FilterSidebar'),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }
);

// Dynamically import the mobile filter button (Client Component)
const MobileFilterButton = dynamic(
  () => import('./MobileFilterButton'),
  { ssr: false }
);

interface PageProps {
  searchParams: {
    category?: string;
    mode?: string;
    location?: string;
    type?: string;
    search?: string;
  };
}

export default async function InternshipsPage({ searchParams }: PageProps) {
  
  let internships: any[] = [];

  try {
    const where: any = { published: true };
    
    if (searchParams.category) {
      where.category = searchParams.category;
    }
    
    if (searchParams.mode) {
      where.workMode = searchParams.mode;
    }
    
    if (searchParams.location && searchParams.location !== "All Locations") {
      where.location = searchParams.location;
    }
    
    if (searchParams.type) {
      if (searchParams.type === "Paid") {
        where.stipendAmount = { not: null };
      } else if (searchParams.type === "Unpaid") {
        where.stipendAmount = null;
      }
    }
    
    if (searchParams.search) {
      where.OR = [
        { title: { contains: searchParams.search, mode: 'insensitive' } },
        { company: { contains: searchParams.search, mode: 'insensitive' } },
        { description: { contains: searchParams.search, mode: 'insensitive' } },
        { skills: { has: searchParams.search } }
      ];
    }

    internships = await prisma.internship.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database error:", error);
  }

  const activeFilterCount = Object.values(searchParams).filter(v => v && v !== "All Locations" && v !== "").length;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header with Attractive Search */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Internships</h1>
            <p className="text-blue-100 mt-2">
              {internships.length} {internships.length === 1 ? 'opportunity' : 'opportunities'} found
            </p>
          </div>
          
          {/* Attractive Search Bar */}
          <div className="flex justify-center">
            <form action="/internships" method="GET" className="w-full max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchParams.search || ''}
                  placeholder="Search by title, company or skills..."
                  className="w-full pl-12 pr-24 py-4 bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white rounded-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-base shadow-xl group-hover:shadow-2xl transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/20">
              <span className="text-xs text-white/80">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(searchParams).map(([key, value]) => {
                  if (!value || value === "All Locations" || key === "search") return null;
                  return (
                    <Link
                      key={key}
                      href={`/internships?${new URLSearchParams(
                        Object.fromEntries(
                          Object.entries(searchParams).filter(([k]) => k !== key)
                        )
                      ).toString()}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full hover:bg-white/30 transition-colors"
                    >
                      {key}: {value}
                      <X size={12} />
                    </Link>
                  );
                })}
                {activeFilterCount > 0 && (
                  <Link
                    href="/internships"
                    className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                  >
                    Clear all
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar */}
          <div className="lg:w-80">
            <Suspense fallback={
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            }>
              <FilterSidebar />
            </Suspense>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Results Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-blue-600" />
                <span className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{internships.length}</span> {internships.length === 1 ? 'internship' : 'internships'}
                </span>
              </div>
              
              {/* Mobile Filter Button */}
              <MobileFilterButton />
            </div>

            {/* Cards */}
            {internships.length > 0 ? (
              <div className="space-y-4">
                {internships.map((job: any) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          {/* Company Logo - Using CompanyLogo component */}
                          <CompanyLogo 
                            companyName={job.company} 
                            logoUrl={job.companyLogo} 
                            size="md" 
                          />
                          
                          <div>
                            <h2 className="font-semibold text-gray-900">{job.title}</h2>
                            <p className="text-sm text-gray-500">{job.company}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {job.workMode && (
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">
                                  {job.workMode}
                                </span>
                              )}
                              {job.internshipType && (
                                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded">
                                  {job.internshipType}
                                </span>
                              )}
                              {job.category && (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                                  {job.category}
                                </span>
                              )}
                              {job.verified && (
                                <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-0.5">
                                  <CheckCircle size={10} />
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {job.applyLink && (
                            <a
                              href={job.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
                            >
                              Apply
                            </a>
                          )}
                          <Link
                            href={`/internships/${job.id}`}
                            className="px-3 py-1.5 border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs font-medium rounded transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>

                      {/* Description */}
                      {job.description && (
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                          {job.description}
                        </p>
                      )}

                      {/* ✅ FIXED: Meta Info - Removed duplicate ₹ symbol */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {job.location}
                          </span>
                        )}
                        {job.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {job.duration}
                          </span>
                        )}
                        {job.stipendAmount ? (
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            <Wallet size={12} />
                            {job.stipendAmount}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400">
                            <Wallet size={12} />
                            Unpaid
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Posted {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      {/* Skills Section */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold text-gray-700 mb-1.5">Skills Required</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {job.skills.slice(0, 5).map((skill: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No internships found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any internships matching your criteria. Try adjusting your filters or search terms.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {activeFilterCount > 0 ? (
                    <Link
                      href="/internships"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <RefreshCw size={16} />
                      Clear all filters
                    </Link>
                  ) : (
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Sparkles size={16} />
                      Browse featured internships
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}