"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapPin, Clock, Building2,
  ChevronRight, Calendar, Briefcase, CheckCircle, ChevronLeft,
  Award, Zap, Bookmark
} from "lucide-react";

// Types
interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string | null;
  stipendAmount?: string | null;
  duration: string;
  skills: string[];
  isActivelyHiring: boolean;
  isVerified: boolean;
  isTrending: boolean;
  companyLogo?: string | null;
  description: string;
  shortDescription?: string | null;
  workMode: string;
  createdAt: string;
  applyLink?: string;
  type: string;
  experience?: string | null;
  views?: number;
  slug: string;
}

// Helper functions
const getLocationDisplay = (location: string, workMode: string) => {
  const cleanLocation = location?.replace(/, India$/, '').replace(/ India$/, '').trim();
  if (workMode === "Remote") return "Remote";
  if (workMode === "Hybrid") return `${cleanLocation} (Hybrid)`;
  return cleanLocation;
};

// Shorten job title aggressively for homepage
const shortenTitle = (title: string): string => {
  let shortTitle = title
    .replace(/^Internship\s*[-–]\s*/i, '')
    .replace(/^Job\s*[-–]\s*/i, '')
    .replace(/^Opportunity\s*[-–]\s*/i, '')
    .replace(/\([^)]*CA[^)]*\)/i, '')
    .replace(/\([^)]*CFA[^)]*\)/i, '')
    .replace(/\([^)]*FRM[^)]*\)/i, '')
    .replace(/\([^)]*ACCA[^)]*\)/i, '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim();
  
  if (shortTitle.length > 50) {
    shortTitle = shortTitle.substring(0, 47) + '...';
  }
  
  return shortTitle || title;
};

const formatStipend = (stipendAmount: string | null | undefined) => {
  if (!stipendAmount || stipendAmount === "Not Disclosed" || stipendAmount === "Not disclosed" || stipendAmount === "") {
    return null;
  }
  
  let originalValue = stipendAmount.toString();
  
  if (originalValue.toLowerCase().includes('unpaid')) {
    return 'Unpaid';
  }
  
  let hasMonthSuffix = false;
  if (originalValue.toLowerCase().includes('/month') || originalValue.toLowerCase().includes('per month')) {
    hasMonthSuffix = true;
  }
  
  let cleanAmount = originalValue.replace(/₹/g, '').replace(/\/month/g, '').replace(/per month/g, '').trim();
  
  const rangeMatch = cleanAmount.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1]);
    const max = parseInt(rangeMatch[2]);
    if (!isNaN(min) && !isNaN(max)) {
      let formattedStipend = '';
      if (min >= 1000 && max >= 1000) {
        formattedStipend = `₹${min/1000}k-${max/1000}k`;
      } else {
        formattedStipend = `₹${min.toLocaleString()}-${max.toLocaleString()}`;
      }
      if (hasMonthSuffix) {
        formattedStipend += '/mo';
      }
      return formattedStipend;
    }
  }
  
  const singleMatch = cleanAmount.match(/(\d+)/);
  if (singleMatch) {
    const amount = parseInt(singleMatch[1]);
    if (!isNaN(amount) && amount > 0) {
      let formattedStipend = '';
      if (amount >= 1000) {
        formattedStipend = `₹${amount/1000}k`;
      } else {
        formattedStipend = `₹${amount.toLocaleString()}`;
      }
      if (hasMonthSuffix) {
        formattedStipend += '/mo';
      }
      return formattedStipend;
    }
  }
  
  if (cleanAmount.toLowerCase().includes('paid')) {
    return 'Paid';
  }
  
  return cleanAmount.length > 15 ? cleanAmount.substring(0, 15) : cleanAmount;
};

const formatPostedDate = (date: string) => {
  if (!date) return "Recently";
  const postedDate = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

const trackOpportunityClick = async (id: string, type: string) => {
  try {
    await fetch('/api/track-opportunity-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunityId: id, type })
    });
  } catch (error) {
    console.error('Failed to track click:', error);
  }
};

const trackApplyClick = async (id: string, type: string, applyLink: string) => {
  try {
    await fetch('/api/track-opportunity-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunityId: id, type })
    });
    window.open(applyLink, '_blank');
  } catch (error) {
    console.error('Failed to track apply click:', error);
    window.open(applyLink, '_blank');
  }
};

// Popular Roles Component - Horizontally Scrollable
const PopularRolesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const popularRoles = [
    "Financial Analyst", "Investment Banking", "Equity Research", 
    "FP&A Analyst", "Credit Analyst", "Risk Analyst", 
    "MIS Analyst", "Financial Data Analyst", "Accounts Executive",
    "Tax Analyst", "Audit Associate", "Wealth Management"
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#A1A1A1] font-medium">🔥 Popular Entry-Level Roles:</p>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-full bg-white border border-[#ECECEC] text-[#777] hover:bg-gray-50 transition-all md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-full bg-white border border-[#ECECEC] text-[#777] hover:bg-gray-50 transition-all md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {popularRoles.map((role, idx) => (
          <button
            key={idx}
            onClick={() => {
              window.location.href = `/jobs?search=${encodeURIComponent(role)}`;
            }}
            className="px-3 py-1.5 bg-white border border-[#ECECEC] rounded-full text-xs text-[#555] hover:border-[#FFD700] hover:bg-[#FFD700]/5 hover:text-[#0A2540] transition-all duration-300 flex-shrink-0 cursor-pointer"
          >
            {role}
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Premium Job Card Component - Smaller, compact size
const JobCard = ({ job, imageErrors, handleImageError }: { 
  job: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
}) => {
  const hasLogoError = imageErrors[job.id];
  const shortTitle = shortenTitle(job.title);
  const postedText = formatPostedDate(job.createdAt);
  const stipend = formatStipend(job.stipendAmount || job.salary);
  const jobType = job.type === "job" ? "Full-Time" : "Internship";
  const isRemote = job.workMode === "Remote";
  
  return (
    <div className="rounded-2xl border border-[#ECECEC] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Top row: Logo + Company + Save button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
            {!hasLogoError && job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-6 h-6 object-contain"
                loading="lazy"
                onError={() => handleImageError(job.id)}
              />
            ) : (
              <span className="text-sm font-semibold text-[#111]">
                {job.company.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-[#111111]">
                {job.company}
              </p>
              {job.isVerified && (
                <CheckCircle size={10} className="text-green-500" />
              )}
            </div>
            <p className="text-[11px] text-[#A1A1A1] mt-0.5">
              {postedText}
            </p>
          </div>
        </div>
        
        <button className="text-[11px] text-[#777] border border-[#ECECEC] bg-white rounded-lg px-2.5 py-1 hover:bg-[#F7F7F7] transition-colors flex items-center gap-0.5">
          <Bookmark size={10} />
          Save
        </button>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-xl leading-tight font-semibold tracking-[-0.02em] text-[#111111] line-clamp-2">
        {shortTitle}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="text-[10px] font-medium text-[#555] bg-[#F1F1F1] rounded-md px-2.5 py-1">
          {jobType}
        </span>
        {isRemote && (
          <span className="text-[10px] font-medium text-[#555] bg-[#F1F1F1] rounded-md px-2.5 py-1">
            Remote
          </span>
        )}
        {job.duration && (
          <span className="text-[10px] font-medium text-[#555] bg-[#F1F1F1] rounded-md px-2.5 py-1">
            {job.duration}
          </span>
        )}
        {job.isActivelyHiring && (
          <span className="text-[10px] font-medium text-orange-600 bg-orange-50 rounded-md px-2.5 py-1">
            Actively Hiring
          </span>
        )}
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#ECECEC] mt-5 pt-4 flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold text-[#111]">
            {stipend || (job.salary ? formatStipend(job.salary) : "Competitive")}
          </p>
          <p className="text-xs text-[#A1A1A1] mt-0.5">
            {getLocationDisplay(job.location, job.workMode)}
          </p>
        </div>
        
        {job.applyLink ? (
          <button
            onClick={() => trackApplyClick(job.id, 'job', job.applyLink!)}
            className="bg-black text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-[#222] transition-colors"
          >
            Apply now
          </button>
        ) : (
          <Link
            href={`/jobs/${job.slug}`}
            onClick={() => trackOpportunityClick(job.id, 'job')}
            className="bg-black text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-[#222] transition-colors inline-block"
          >
            Apply now
          </Link>
        )}
      </div>
    </div>
  );
};

// Premium Internship Card Component - Smaller size
const InternshipCard = ({ internship, imageErrors, handleImageError }: { 
  internship: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
}) => {
  const stipend = formatStipend(internship.stipendAmount || internship.salary);
  const hasLogoError = imageErrors[internship.id];
  const shortTitle = shortenTitle(internship.title);
  const postedText = formatPostedDate(internship.createdAt);
  const isRemote = internship.workMode === "Remote";
  
  return (
    <div className="rounded-2xl border border-[#ECECEC] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Top row: Logo + Company + Save button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
            {!hasLogoError && internship.companyLogo ? (
              <img
                src={internship.companyLogo}
                alt={internship.company}
                className="w-6 h-6 object-contain"
                loading="lazy"
                onError={() => handleImageError(internship.id)}
              />
            ) : (
              <span className="text-sm font-semibold text-[#111]">
                {internship.company.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-[#111111]">
                {internship.company}
              </p>
              {internship.isVerified && (
                <CheckCircle size={10} className="text-green-500" />
              )}
            </div>
            <p className="text-[11px] text-[#A1A1A1] mt-0.5">
              {postedText}
            </p>
          </div>
        </div>
        
        <button className="text-[11px] text-[#777] border border-[#ECECEC] bg-white rounded-lg px-2.5 py-1 hover:bg-[#F7F7F7] transition-colors flex items-center gap-0.5">
          <Bookmark size={10} />
          Save
        </button>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-xl leading-tight font-semibold tracking-[-0.02em] text-[#111111] line-clamp-2">
        {shortTitle}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="text-[10px] font-medium text-[#555] bg-[#F1F1F1] rounded-md px-2.5 py-1">
          Internship
        </span>
        {isRemote && (
          <span className="text-[10px] font-medium text-[#555] bg-[#F1F1F1] rounded-md px-2.5 py-1">
            Remote
          </span>
        )}
        {internship.duration && (
          <span className="text-[10px] font-medium text-[#555] bg-[#F1F1F1] rounded-md px-2.5 py-1">
            {internship.duration}
          </span>
        )}
        {internship.isActivelyHiring && (
          <span className="text-[10px] font-medium text-orange-600 bg-orange-50 rounded-md px-2.5 py-1">
            Actively Hiring
          </span>
        )}
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#ECECEC] mt-5 pt-4 flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold text-[#111]">
            {stipend || "Unpaid"}
          </p>
          <p className="text-xs text-[#A1A1A1] mt-0.5">
            {getLocationDisplay(internship.location, internship.workMode)}
          </p>
        </div>
        
        {internship.applyLink ? (
          <button
            onClick={() => trackApplyClick(internship.id, 'internship', internship.applyLink!)}
            className="bg-black text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-[#222] transition-colors"
          >
            Apply now
          </button>
        ) : (
          <Link
            href={`/internships/${internship.slug}`}
            onClick={() => trackOpportunityClick(internship.id, 'internship')}
            className="bg-black text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-[#222] transition-colors inline-block"
          >
            Apply now
          </Link>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function TrendingOpportunities() {
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "jobs" | "internships">("all");
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/opportunities?limit=50', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await res.json();
      
      if (res.ok && Array.isArray(data)) {
        const sortedData = [...data].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAllOpportunities(sortedData);
      } else {
        setAllOpportunities([]);
      }
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setError("Unable to load opportunities. Please try again later.");
      setAllOpportunities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getFilteredData = () => {
    let filtered = [...allOpportunities];
    if (activeFilter === "jobs") {
      filtered = filtered.filter(opp => opp.type === "job");
    } else if (activeFilter === "internships") {
      filtered = filtered.filter(opp => opp.type === "internship");
    }
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const filteredOpportunities = getFilteredData();
  const displayedOpportunities = filteredOpportunities.slice(0, visibleCount);
  const hasMore = visibleCount < filteredOpportunities.length;

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111]">✨ Curated for Freshers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border border-[#ECECEC] bg-white p-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-12 mt-1"></div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mt-4"></div>
              <div className="flex gap-1.5 mt-3">
                <div className="h-5 bg-gray-200 rounded-md w-16"></div>
                <div className="h-5 bg-gray-200 rounded-md w-12"></div>
              </div>
              <div className="mt-5 pt-4 flex items-end justify-between">
                <div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 mt-1"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={fetchData} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (allOpportunities.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111]">✨ Curated for Freshers</h2>
        <p className="text-xs text-[#A1A1A1] mt-1">Hand-picked entry-level finance opportunities</p>
      </div>
      
      {/* Popular Roles - Horizontally Scrollable */}
      <PopularRolesSection />
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => {
            setActiveFilter("all");
            setVisibleCount(6);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            activeFilter === "all" ? "bg-[#111] text-white" : "bg-[#F1F1F1] text-[#555] hover:bg-[#E5E5E5]"
          }`}
        >
          All Opportunities
        </button>
        <button
          onClick={() => {
            setActiveFilter("jobs");
            setVisibleCount(6);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            activeFilter === "jobs" ? "bg-[#111] text-white" : "bg-[#F1F1F1] text-[#555] hover:bg-[#E5E5E5]"
          }`}
        >
          Full-Time Jobs
        </button>
        <button
          onClick={() => {
            setActiveFilter("internships");
            setVisibleCount(6);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            activeFilter === "internships" ? "bg-[#111] text-white" : "bg-[#F1F1F1] text-[#555] hover:bg-[#E5E5E5]"
          }`}
        >
          Internships
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {displayedOpportunities.map((opportunity) => (
          opportunity.type === "job" ? (
            <JobCard key={opportunity.id} job={opportunity} imageErrors={imageErrors} handleImageError={handleImageError} />
          ) : (
            <InternshipCard key={opportunity.id} internship={opportunity} imageErrors={imageErrors} handleImageError={handleImageError} />
          )
        ))}
      </div>

      {/* View More Button */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleViewMore}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#ECECEC] text-[#111] font-medium rounded-xl hover:bg-[#F7F7F7] transition-all duration-300 text-sm"
          >
            Load more opportunities
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}