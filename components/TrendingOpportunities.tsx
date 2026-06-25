"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPin, Building2, Briefcase, ExternalLink, ArrowRight,
  Sparkles, Eye, Bookmark, Flame, BadgeCheck, Clock,
  IndianRupee, Wifi, Globe, Calendar, GraduationCap, Grid3X3
} from "lucide-react";
import { trackJobView, trackApplyClick } from "@/lib/analytics/tracking";

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
  
  if (shortTitle.length > 55) {
    shortTitle = shortTitle.substring(0, 52) + '...';
  }
  return shortTitle || title;
};

const formatStipend = (stipendAmount: string | null | undefined, type?: string) => {
  if (!stipendAmount || stipendAmount === "Not Disclosed" || stipendAmount === "Not disclosed" || stipendAmount === "" || stipendAmount === "null") {
    return null;
  }
  
  let originalValue = stipendAmount.toString();
  if (originalValue.toLowerCase().includes('unpaid')) return null;
  
  const isJob = type === "job";
  let hasMonthSuffix = false;
  let hasYearSuffix = false;
  if (originalValue.toLowerCase().includes('/month') || originalValue.toLowerCase().includes('per month') || originalValue.toLowerCase().includes('/mo')) hasMonthSuffix = true;
  if (originalValue.toLowerCase().includes('/year') || originalValue.toLowerCase().includes('per year') || originalValue.toLowerCase().includes('/yr') || originalValue.toLowerCase().includes('/annum')) hasYearSuffix = true;
  
  let cleanAmount = originalValue
    .replace(/₹/g, '')
    .replace(/\/month/g, '')
    .replace(/per month/g, '')
    .replace(/\/mo/g, '')
    .replace(/\/year/g, '')
    .replace(/per year/g, '')
    .replace(/\/yr/g, '')
    .replace(/\/annum/g, '')
    .replace(/,/g, '')
    .trim();
  
  const lakhMatch = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[Ll]akh/i);
  if (lakhMatch) {
    const amount = parseFloat(lakhMatch[1]) * 100000;
    if (!isNaN(amount) && amount > 0) {
      if (isJob || hasYearSuffix) return `₹${(amount/100000).toFixed(1)}L/yr`;
      return `₹${(amount/100000).toFixed(1)}L/mo`;
    }
  }
  
  const rangeMatch = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) {
    let min = parseFloat(rangeMatch[1]);
    let max = parseFloat(rangeMatch[2]);
    if (!isNaN(min) && !isNaN(max) && min > 0 && max > 0) {
      let formattedStipend = '';
      if (min >= 100000) formattedStipend = `₹${(min/100000).toFixed(1)}L-${(max/100000).toFixed(1)}L`;
      else if (min >= 1000) formattedStipend = `₹${(min/1000).toFixed(0)}k-${(max/1000).toFixed(0)}k`;
      else formattedStipend = `₹${min.toLocaleString()}-${max.toLocaleString()}`;
      if (hasYearSuffix || (isJob && !hasMonthSuffix)) formattedStipend += '/yr';
      else if (hasMonthSuffix) formattedStipend += '/mo';
      return formattedStipend;
    }
  }
  
  const singleMatch = cleanAmount.match(/(\d+(?:\.\d+)?)/);
  if (singleMatch) {
    const amount = parseFloat(singleMatch[1]);
    if (!isNaN(amount) && amount > 0) {
      let formattedStipend = '';
      if (amount >= 100000) formattedStipend = `₹${(amount/100000).toFixed(1)}L`;
      else if (amount >= 1000) formattedStipend = `₹${(amount/1000).toFixed(0)}k`;
      else formattedStipend = `₹${amount.toLocaleString()}`;
      if (hasYearSuffix || (isJob && !hasMonthSuffix)) formattedStipend += '/yr';
      else if (hasMonthSuffix) formattedStipend += '/mo';
      return formattedStipend;
    }
  }
  
  if (cleanAmount.toLowerCase().includes('paid')) return 'Paid';
  return originalValue.length > 25 ? originalValue.substring(0, 25) + '...' : originalValue;
};

const formatPostedDate = (date: string) => {
  if (!date) return "Recently";
  const postedDate = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays === 7) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays === 30) return "1 month ago";
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} year ago`;
};

const getSavedJobs = (): string[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('savedOpportunities');
  return saved ? JSON.parse(saved) : [];
};

const saveJob = (id: string) => {
  if (typeof window === 'undefined') return;
  const saved = getSavedJobs();
  if (!saved.includes(id)) { saved.push(id); localStorage.setItem('savedOpportunities', JSON.stringify(saved)); }
};

const unsaveJob = (id: string) => {
  if (typeof window === 'undefined') return;
  const saved = getSavedJobs();
  const filtered = saved.filter(savedId => savedId !== id);
  localStorage.setItem('savedOpportunities', JSON.stringify(filtered));
};

const isJobSaved = (id: string): boolean => {
  if (typeof window === 'undefined') return false;
  return getSavedJobs().includes(id);
};

// ============================================
// JOB CARD COMPONENT - FULLY FIXED VERSION
// ============================================
const JobCard = ({ job, imageErrors, handleImageError, onSaveToggle }: { 
  job: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
  onSaveToggle: () => void;
}) => {
  const router = useRouter();
  const hasLogoError = imageErrors[job.id];
  const shortTitle = shortenTitle(job.title);
  const [isSaved, setIsSaved] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => { setIsSaved(isJobSaved(job.id)); }, [job.id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) { unsaveJob(job.id); setIsSaved(false); } 
    else { saveJob(job.id); setIsSaved(true); }
    onSaveToggle();
  };

  // ✅ FIXED: Async click handler with tracking completion
  const handleCardClick = async (e: React.MouseEvent) => {
    // Don't track if clicking on button
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    
    // Prevent multiple clicks
    if (isTracking) {
      console.log('⏳ [FIXED] Already tracking, please wait...');
      return;
    }
    
    setIsTracking(true);
    console.log('👁️ [FIXED] Card clicked! Tracking view for:', job.id);
    
    try {
      await trackJobView(job.id);
      console.log('✅ [FIXED] Job view tracked successfully for:', job.id);
    } catch (error) {
      console.error('❌ [FIXED] Failed to track job view:', error);
    } finally {
      setIsTracking(false);
      // Navigate after tracking is complete
      router.push(`/jobs/${job.slug}`);
    }
  };

  const handleApplyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ [Debug] Apply button clicked for:', job.id);
    await trackApplyClick(job.id);
    console.log('✅ [Debug] Apply click tracked for:', job.id);
    if (job.applyLink) {
      window.open(job.applyLink, '_blank');
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col cursor-pointer ${isTracking ? 'opacity-70' : ''}`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Actively Hiring Badge */}
        {job.isActivelyHiring && (
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full w-fit">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Actively Hiring
          </span>
        )}

        {/* Company Info */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            {!hasLogoError && job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-8 h-8 object-contain" loading="lazy" onError={() => handleImageError(job.id)} />
            ) : (
              <span className="text-base font-bold text-slate-700">{job.company.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-[#081B4B] text-sm">{job.company}</p>
              {job.isVerified && <BadgeCheck size={12} className="text-blue-500" />}
            </div>
            <p className="text-xs text-slate-500">{job.type === "job" ? "Full-Time" : "Internship"}</p>
          </div>
        </div>

        {/* Role Title */}
        <h3 className="mt-4 font-semibold text-[#081B4B] text-sm leading-tight line-clamp-2 min-h-[40px]">
          {shortTitle}
        </h3>

        {/* Location */}
        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
          📍 {getLocationDisplay(job.location, job.workMode)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
            {job.type === "job" ? "Full Time" : "Internship"}
          </span>
          {job.workMode === "Remote" && (
            <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full">
              Remote
            </span>
          )}
          {job.isTrending && (
            <span className="bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Flame size={10} /> Trending
            </span>
          )}
        </div>

        {/* Skills List */}
        {job.skills && job.skills.length > 0 && (
          <ul className="mt-4 space-y-2">
            {job.skills.slice(0, 5).map((skill, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                ></span>
                <span className="leading-relaxed">{skill}</span>
              </li>
            ))}
            {job.skills.length > 5 && (
              <li className="text-blue-500 font-medium text-xs mt-1">+{job.skills.length - 5} more skills</li>
            )}
          </ul>
        )}

        {/* Flexible spacer */}
        <div className="flex-1"></div>

        {/* Apply Now */}
        <button
          onClick={handleApplyClick}
          style={{
            marginTop: '20px',
            backgroundColor: '#2563EB',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '10px 16px',
            fontSize: '0.875rem',
            fontWeight: 600,
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            textAlign: 'center',
          }}
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function TrendingOpportunities() {
  const [isMounted, setIsMounted] = useState(false);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "jobs" | "internships">("all");
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [saveToggle, setSaveToggle] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/opportunities?limit=50', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAllOpportunities(sortedData);
      } else { setAllOpportunities([]); }
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setError("Unable to load opportunities. Please try again later.");
      setAllOpportunities([]);
    } finally { setIsLoading(false); }
  };

  useEffect(() => { if (isMounted) fetchData(); }, [isMounted]);

  const handleImageError = (id: string) => setImageErrors(prev => ({ ...prev, [id]: true }));
  const handleSaveToggle = () => setSaveToggle(prev => !prev);

  const getFilteredData = () => {
    let filtered = [...allOpportunities];
    if (activeFilter === "jobs") filtered = filtered.filter(opp => opp.type === "job");
    else if (activeFilter === "internships") filtered = filtered.filter(opp => opp.type === "internship");
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const filteredOpportunities = getFilteredData();
  const displayedOpportunities = filteredOpportunities.slice(0, visibleCount);
  const hasMore = visibleCount < filteredOpportunities.length;

  const handleViewMore = () => setVisibleCount(prev => prev + 8);
  const handleFilterChange = (filter: "all" | "jobs" | "internships") => { setActiveFilter(filter); setVisibleCount(8); };

  const getViewAllLink = () => {
    if (activeFilter === "jobs") return "/jobs";
    if (activeFilter === "internships") return "/internships";
    return "/opportunities";
  };

  const getViewAllText = () => {
    if (activeFilter === "jobs") return "View All Jobs →";
    if (activeFilter === "internships") return "View All Internships →";
    return "View All Opportunities →";
  };

  if (!isMounted || isLoading) {
    return (
      <div className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#081B4B] mt-4">
              Latest Opportunities <span className="text-[#2563EB]">for Freshers</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                <div className="h-32 bg-slate-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchData} className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  if (allOpportunities.length === 0) return null;

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">
            Latest Opportunities <span className="text-[#2563EB]">for Freshers</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">Hand-picked entry-level finance jobs and internships</p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            {(["all", "jobs", "internships"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-[#2563EB] text-Black shadow-lg"
                    : "bg-white text-[#081B4B] border border-slate-200 hover:border-[#2563EB]"
                }`}
              >
                {filter === "all" && <Grid3X3 size={16} />}
                {filter === "jobs" && <Briefcase size={16} />}
                {filter === "internships" && <GraduationCap size={16} />}
                {filter === "all" ? "All" : filter === "jobs" ? "Jobs" : "Internships"}
              </button>
            ))}
          </div>

          <Link href={getViewAllLink()}>
            <button className="text-[#2563EB] font-semibold text-sm hover:underline flex items-center gap-1 whitespace-nowrap">
              {getViewAllText()}
            </button>
          </Link>
        </div>

        {/* Jobs Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <Briefcase size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No opportunities available right now.</p>
            <p className="text-slate-400 text-sm mt-1">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayedOpportunities.map((opportunity) => (
                <JobCard 
                  key={opportunity.id} 
                  job={opportunity} 
                  imageErrors={imageErrors} 
                  handleImageError={handleImageError} 
                  onSaveToggle={handleSaveToggle} 
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleViewMore}
                  style={{
                    padding: '16px 64px',
                    border: '2px solid #2563EB',
                    borderRadius: '16px',
                    backgroundColor: 'transparent',
                    color: '#2563EB',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                  }}
                >
                  Load more opportunities →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}