"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, Clock, Building2,
  ChevronRight, Calendar, Briefcase, CheckCircle, ChevronLeft,
  Award, Zap, Bookmark, TrendingUp, BarChart3, LineChart, DollarSign,
  Shield, Target, Activity, BriefcaseIcon, GraduationCap, Star,
  Eye, ExternalLink, CreditCard, Users, Globe, Wifi, Sparkles,
  Rocket, BadgeCheck, Trophy, Flame, Timer, Hash, IndianRupee
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

// IMPROVED: Format stipend/salary with proper Indian currency formatting
const formatStipend = (stipendAmount: string | null | undefined, type?: string) => {
  if (!stipendAmount || stipendAmount === "Not Disclosed" || stipendAmount === "Not disclosed" || stipendAmount === "" || stipendAmount === "null") {
    return null;
  }
  
  let originalValue = stipendAmount.toString();
  
  if (originalValue.toLowerCase().includes('unpaid')) {
    return null;
  }
  
  // Determine period suffix based on type
  const isJob = type === "job";
  
  // Check if already has month/year suffix
  let hasMonthSuffix = false;
  let hasYearSuffix = false;
  if (originalValue.toLowerCase().includes('/month') || originalValue.toLowerCase().includes('per month') || originalValue.toLowerCase().includes('/mo')) {
    hasMonthSuffix = true;
  }
  if (originalValue.toLowerCase().includes('/year') || originalValue.toLowerCase().includes('per year') || originalValue.toLowerCase().includes('/yr') || originalValue.toLowerCase().includes('/annum')) {
    hasYearSuffix = true;
  }
  
  // Clean the amount string
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
  
  // Handle Lakh/Crore format like "5 Lakh" or "5 LPA"
  const lakhMatch = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[Ll]akh/i);
  const croreMatch = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[Cc]rore/i);
  const lpaMatch = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[Ll][Pp][Aa]/i);
  
  if (lakhMatch) {
    const amount = parseFloat(lakhMatch[1]) * 100000;
    if (!isNaN(amount) && amount > 0) {
      if (isJob || hasYearSuffix || lpaMatch) {
        return `₹${(amount/100000).toFixed(1)}L/yr`;
      }
      return `₹${(amount/100000).toFixed(1)}L/mo`;
    }
  }
  
  if (croreMatch) {
    const amount = parseFloat(croreMatch[1]) * 10000000;
    if (!isNaN(amount) && amount > 0) {
      if (isJob || hasYearSuffix) {
        return `₹${(amount/10000000).toFixed(1)}Cr/yr`;
      }
      return `₹${(amount/10000000).toFixed(1)}Cr/mo`;
    }
  }
  
  // Handle range like "50000 - 70000" or "5,00,000 - 7,00,000"
  const rangeMatch = cleanAmount.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) {
    let min = parseFloat(rangeMatch[1]);
    let max = parseFloat(rangeMatch[2]);
    
    if (!isNaN(min) && !isNaN(max) && min > 0 && max > 0) {
      let formattedStipend = '';
      
      if (min >= 10000000) { // Crore
        formattedStipend = `₹${(min/10000000).toFixed(1)}Cr-${(max/10000000).toFixed(1)}Cr`;
      } else if (min >= 100000) { // Lakh
        formattedStipend = `₹${(min/100000).toFixed(1)}L-${(max/100000).toFixed(1)}L`;
      } else if (min >= 1000) {
        formattedStipend = `₹${(min/1000).toFixed(0)}k-${(max/1000).toFixed(0)}k`;
      } else {
        formattedStipend = `₹${min.toLocaleString()}-${max.toLocaleString()}`;
      }
      
      // Add period suffix
      if (hasYearSuffix || (isJob && !hasMonthSuffix)) {
        formattedStipend += '/yr';
      } else if (hasMonthSuffix) {
        formattedStipend += '/mo';
      }
      
      return formattedStipend;
    }
  }
  
  // Handle single amount like "50000" or "5,00,000"
  const singleMatch = cleanAmount.match(/(\d+(?:\.\d+)?)/);
  if (singleMatch) {
    const amount = parseFloat(singleMatch[1]);
    if (!isNaN(amount) && amount > 0) {
      let formattedStipend = '';
      
      if (amount >= 10000000) {
        formattedStipend = `₹${(amount/10000000).toFixed(1)}Cr`;
      } else if (amount >= 100000) {
        formattedStipend = `₹${(amount/100000).toFixed(1)}L`;
      } else if (amount >= 1000) {
        formattedStipend = `₹${(amount/1000).toFixed(0)}k`;
      } else {
        formattedStipend = `₹${amount.toLocaleString()}`;
      }
      
      // Add period suffix
      if (hasYearSuffix || (isJob && !hasMonthSuffix)) {
        formattedStipend += '/yr';
      } else if (hasMonthSuffix) {
        formattedStipend += '/mo';
      }
      
      return formattedStipend;
    }
  }
  
  // Handle "Paid" case
  if (cleanAmount.toLowerCase().includes('paid')) {
    return 'Paid';
  }
  
  // Return original if nothing matches
  return originalValue.length > 20 ? originalValue.substring(0, 20) + '...' : originalValue;
};

// Format posted date with week/month formatting
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
    if (typeof window !== 'undefined') {
      window.open(applyLink, '_blank');
    }
  } catch (error) {
    console.error('Failed to track apply click:', error);
    if (typeof window !== 'undefined') {
      window.open(applyLink, '_blank');
    }
  }
};

// Save to localStorage functions (safe)
const getSavedJobs = (): string[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('savedOpportunities');
  return saved ? JSON.parse(saved) : [];
};

const saveJob = (id: string) => {
  if (typeof window === 'undefined') return;
  const saved = getSavedJobs();
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem('savedOpportunities', JSON.stringify(saved));
  }
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

// Popular Roles Component - Clickable with icons
const PopularRolesSection = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const popularRoles = [
    { name: "Financial Analyst", icon: TrendingUp, search: "Financial Analyst", color: "#FF6B6B" },
    { name: "Investment Banking", icon: BarChart3, search: "Investment Banking", color: "#4ECDC4" },
    { name: "FP&A Analyst", icon: IndianRupee, search: "FP&A Analyst", color: "#96CEB4" },
    { name: "Credit Analyst", icon: Shield, search: "Credit Analyst", color: "#FFEAA7" },
    { name: "Risk Analyst", icon: Target, search: "Risk Analyst", color: "#DDA0DD" },
    { name: "Article Trainee", icon: Award, search: "Article Trainee", color: "#98D8C8" },
    { name: "Article Assistant", icon: Activity, search: "Article Assistant", color: "#F7DC6F" }
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
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-[#A1A1A1] font-medium">🔥 Popular Entry-Level Roles:</p>
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
              router.push(`/jobs?search=${encodeURIComponent(role.search)}`);
            }}
            className="group px-3 py-1.5 bg-white border border-[#ECECEC] rounded-full text-sm font-medium text-[#555] hover:shadow-md transition-all duration-300 flex-shrink-0 cursor-pointer flex items-center gap-1.5 hover:scale-105"
            style={{
              borderLeftColor: role.color,
              borderLeftWidth: '2px'
            }}
          >
            <role.icon size={14} className="text-[#FFD700] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[#0A2540]">{role.name}</span>
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

// Job Card Component - Professional Design
const JobCard = ({ job, imageErrors, handleImageError, onSaveToggle }: { 
  job: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
  onSaveToggle: () => void;
}) => {
  const router = useRouter();
  const hasLogoError = imageErrors[job.id];
  const shortTitle = shortenTitle(job.title);
  const postedText = formatPostedDate(job.createdAt);
  const salary = formatStipend(job.stipendAmount || job.salary, 'job');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isJobSaved(job.id));
  }, [job.id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsaveJob(job.id);
      setIsSaved(false);
    } else {
      saveJob(job.id);
      setIsSaved(true);
    }
    onSaveToggle();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('a')) {
      router.push(`/jobs/${job.slug}`);
    }
  };

  const experienceText = job.experience === "Fresher" || !job.experience ? "Fresher" : `${job.experience} Years`;
  const isPaid = salary !== null && salary !== "Paid";

  return (
    <div 
      onClick={handleCardClick}
      className="group rounded-xl border border-[#ECECEC] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
    >
      {/* Actively Hiring Badge - Top (Smaller text) */}
      {job.isActivelyHiring && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-[9px] font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
            <Zap size={8} className="text-green-600" />
            Actively Hiring
          </span>
        </div>
      )}

      {/* Top Row: Logo + Company + Verified Badge + Save Button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Logo - Larger Square Box */}
          <div className="w-14 h-14 rounded-xl bg-gray-50 border border-[#ECECEC] flex items-center justify-center overflow-hidden flex-shrink-0">
            {!hasLogoError && job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-9 h-9 object-contain"
                loading="lazy"
                onError={() => handleImageError(job.id)}
              />
            ) : (
              <span className="text-xl font-bold text-[#111]">
                {job.company.charAt(0)}
              </span>
            )}
          </div>
          
          {/* Company + Badges */}
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-sm font-semibold text-[#555]">
                {job.company}
              </p>
              {job.isVerified && (
                <BadgeCheck size={15} className="text-blue-500" />
              )}
              {job.isTrending && (
                <span className="flex items-center gap-0.5 text-[9px] font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
                  <Flame size={9} /> Trending
                </span>
              )}
            </div>
            {/* Clock and Posted Date - Fixed alignment */}
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={11} className="text-[#A1A1A1] -mt-px" />
              <p className="text-[10px] text-[#A1A1A1] font-medium leading-none">
                {postedText}
              </p>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            isSaved 
              ? "bg-[#FFD700] text-black" 
              : "bg-gray-50 text-[#777] hover:bg-gray-100"
          }`}
        >
          <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Role Title - Bold & Prominent */}
      <Link href={`/jobs/${job.slug}`}>
        <h3 className="mt-3 text-base font-bold text-[#111] leading-tight hover:text-[#FFD700] transition-colors line-clamp-2">
          {shortTitle}
        </h3>
      </Link>

      {/* Key Details - 2 columns - Increased text size */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="flex items-center gap-1.5">
          {job.workMode === "Remote" ? (
            <Wifi size={15} className="text-[#FFD700]" />
          ) : job.workMode === "Hybrid" ? (
            <Globe size={15} className="text-[#FFD700]" />
          ) : (
            <MapPin size={15} className="text-[#FFD700]" />
          )}
          <span className="text-xs text-[#555] truncate">{getLocationDisplay(job.location, job.workMode)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <BriefcaseIcon size={15} className="text-[#FFD700]" />
          <span className="text-xs text-[#555]">{experienceText}</span>
        </div>

        {isPaid && salary && (
          <div className="flex items-center gap-1.5">
            <IndianRupee size={15} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#111]">{salary}</span>
          </div>
        )}

        {!isPaid && salary === "Paid" && (
          <div className="flex items-center gap-1.5">
            <IndianRupee size={15} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-green-600">Paid</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Briefcase size={15} className="text-[#FFD700]" />
          <span className="text-xs text-[#555]">Full Time</span>
        </div>
      </div>

      {/* Skills Tags - Max 4 */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.skills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="text-[10px] font-medium text-[#555] bg-gray-100 rounded-full px-2 py-0.5">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[10px] font-medium text-[#555] bg-gray-100 rounded-full px-2 py-0.5">
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Badge Row */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {job.workMode === "Remote" && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-purple-700 bg-purple-50 rounded-full px-1.5 py-0.5">
            <Wifi size={10} className="text-purple-600" />
            Remote
          </span>
        )}
      </div>

      {/* Apply Button */}
      <div className="mt-4 pt-3 border-t border-[#ECECEC]">
        {job.applyLink ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              trackApplyClick(job.id, 'job', job.applyLink!);
            }}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-bold rounded-lg px-4 py-2.5 hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            Apply Now <ExternalLink size={13} />
          </button>
        ) : (
          <Link
            href={`/jobs/${job.slug}`}
            onClick={() => trackOpportunityClick(job.id, 'job')}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-bold rounded-lg px-4 py-2.5 hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            View Details <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
};

// Internship Card Component - Same Box Style
const InternshipCard = ({ internship, imageErrors, handleImageError, onSaveToggle }: { 
  internship: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
  onSaveToggle: () => void;
}) => {
  const router = useRouter();
  const stipend = formatStipend(internship.stipendAmount || internship.salary, 'internship');
  const hasLogoError = imageErrors[internship.id];
  const shortTitle = shortenTitle(internship.title);
  const postedText = formatPostedDate(internship.createdAt);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isJobSaved(internship.id));
  }, [internship.id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsaveJob(internship.id);
      setIsSaved(false);
    } else {
      saveJob(internship.id);
      setIsSaved(true);
    }
    onSaveToggle();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('a')) {
      router.push(`/internships/${internship.slug}`);
    }
  };

  const showStipend = stipend !== null;
  const isPaid = showStipend && stipend === "Paid";

  return (
    <div 
      onClick={handleCardClick}
      className="group rounded-xl border border-[#ECECEC] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
    >
      {/* Actively Hiring Badge - Top (Smaller text) */}
      {internship.isActivelyHiring && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-[9px] font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
            <Zap size={8} className="text-green-600" />
            Actively Hiring
          </span>
        </div>
      )}

      {/* Top Row: Logo + Company + Verified Badge + Save Button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Logo - Larger Square Box */}
          <div className="w-14 h-14 rounded-xl bg-gray-50 border border-[#ECECEC] flex items-center justify-center overflow-hidden flex-shrink-0">
            {!hasLogoError && internship.companyLogo ? (
              <img
                src={internship.companyLogo}
                alt={internship.company}
                className="w-9 h-9 object-contain"
                loading="lazy"
                onError={() => handleImageError(internship.id)}
              />
            ) : (
              <span className="text-xl font-bold text-[#111]">
                {internship.company.charAt(0)}
              </span>
            )}
          </div>
          
          {/* Company + Badges */}
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-sm font-semibold text-[#555]">
                {internship.company}
              </p>
              {internship.isVerified && (
                <BadgeCheck size={15} className="text-blue-500" />
              )}
              {internship.isTrending && (
                <span className="flex items-center gap-0.5 text-[9px] font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
                  <Flame size={9} /> Trending
                </span>
              )}
            </div>
            {/* Clock and Posted Date - Fixed alignment */}
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={11} className="text-[#A1A1A1] -mt-px" />
              <p className="text-[10px] text-[#A1A1A1] font-medium leading-none">
                {postedText}
              </p>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            isSaved 
              ? "bg-[#FFD700] text-black" 
              : "bg-gray-50 text-[#777] hover:bg-gray-100"
          }`}
        >
          <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Role Title - Bold & Prominent */}
      <Link href={`/internships/${internship.slug}`}>
        <h3 className="mt-3 text-base font-bold text-[#111] leading-tight hover:text-[#FFD700] transition-colors line-clamp-2">
          {shortTitle}
        </h3>
      </Link>

      {/* Key Details - 2 columns - Increased text size */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="flex items-center gap-1.5">
          {internship.workMode === "Remote" ? (
            <Wifi size={15} className="text-[#FFD700]" />
          ) : internship.workMode === "Hybrid" ? (
            <Globe size={15} className="text-[#FFD700]" />
          ) : (
            <MapPin size={15} className="text-[#FFD700]" />
          )}
          <span className="text-xs text-[#555] truncate">{getLocationDisplay(internship.location, internship.workMode)}</span>
        </div>

        {internship.duration && (
          <div className="flex items-center gap-1.5">
            <Calendar size={15} className="text-[#FFD700]" />
            <span className="text-xs text-[#555]">{internship.duration}</span>
          </div>
        )}

        {showStipend && !isPaid && (
          <div className="flex items-center gap-1.5">
            <IndianRupee size={15} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#111]">{stipend}</span>
          </div>
        )}

        {isPaid && (
          <div className="flex items-center gap-1.5">
            <IndianRupee size={15} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-green-600">Paid</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <GraduationCap size={15} className="text-[#FFD700]" />
          <span className="text-xs text-[#555]">Internship</span>
        </div>
      </div>

      {/* Skills Tags - Max 4 */}
      {internship.skills && internship.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {internship.skills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="text-[10px] font-medium text-[#555] bg-gray-100 rounded-full px-2 py-0.5">
              {skill}
            </span>
          ))}
          {internship.skills.length > 4 && (
            <span className="text-[10px] font-medium text-[#555] bg-gray-100 rounded-full px-2 py-0.5">
              +{internship.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Badge Row */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {internship.workMode === "Remote" && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-purple-700 bg-purple-50 rounded-full px-1.5 py-0.5">
            <Wifi size={10} className="text-purple-600" />
            Remote
          </span>
        )}
      </div>

      {/* Apply Button - Same Color as Jobs */}
      <div className="mt-4 pt-3 border-t border-[#ECECEC]">
        {internship.applyLink ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              trackApplyClick(internship.id, 'internship', internship.applyLink!);
            }}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-bold rounded-lg px-4 py-2.5 hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            Apply Now <ExternalLink size={13} />
          </button>
        ) : (
          <Link
            href={`/internships/${internship.slug}`}
            onClick={() => trackOpportunityClick(internship.id, 'internship')}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-bold rounded-lg px-4 py-2.5 hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            View Details <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function TrendingOpportunities() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "jobs" | "internships">("all");
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [saveToggle, setSaveToggle] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchData();
    }
  }, [isMounted, fetchData]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleSaveToggle = () => {
    setSaveToggle(prev => !prev);
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

  const handleFilterChange = (filter: "all" | "jobs" | "internships") => {
    setActiveFilter(filter);
    setVisibleCount(6);
  };

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#111]">✨ Curated roles for Freshers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border border-[#ECECEC] bg-white p-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-200"></div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-12 mt-1"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="mt-4 pt-3">
                <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#111]">✨ Curated roles for Freshers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border border-[#ECECEC] bg-white p-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-200"></div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-12 mt-1"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="mt-4 pt-3">
                <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
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

  const jobsCount = allOpportunities.filter(opp => opp.type === "job").length;
  const internshipsCount = allOpportunities.filter(opp => opp.type === "internship").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111]">✨ Curated for Freshers</h2>
        <p className="text-xs text-[#A1A1A1] mt-1">Hand-picked entry-level finance opportunities just for you</p>
      </div>
      
      <PopularRolesSection />
      
      <div className="w-full flex justify-center mb-6 overflow-x-auto">
        <div className="flex items-center gap-2 bg-[#F7F7F7] p-1 rounded-xl border border-[#EAEAEA]">
          <button
            onClick={() => handleFilterChange("all")}
            className={`min-w-[160px] px-4 py-2 rounded-lg transition-all duration-200 border ${
              activeFilter === "all"
                ? "bg-black border-black shadow-sm"
                : "bg-white border-[#E5E5E5] hover:bg-[#FAFAFA]"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`text-xs font-semibold ${activeFilter === "all" ? "text-white" : "text-black"}`}>
                All Opportunities
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${activeFilter === "all" ? "bg-white/20 text-white" : "bg-[#F1F1F1] text-black"}`}>
                {allOpportunities.length}
              </span>
            </div>
          </button>

          <button
            onClick={() => handleFilterChange("jobs")}
            className={`min-w-[160px] px-4 py-2 rounded-lg transition-all duration-200 border ${
              activeFilter === "jobs"
                ? "bg-black border-black shadow-sm"
                : "bg-white border-[#E5E5E5] hover:bg-[#FAFAFA]"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`text-xs font-semibold ${activeFilter === "jobs" ? "text-white" : "text-black"}`}>
                Full-Time Jobs
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${activeFilter === "jobs" ? "bg-white/20 text-white" : "bg-[#F1F1F1] text-black"}`}>
                {jobsCount}
              </span>
            </div>
          </button>

          <button
            onClick={() => handleFilterChange("internships")}
            className={`min-w-[160px] px-4 py-2 rounded-lg transition-all duration-200 border ${
              activeFilter === "internships"
                ? "bg-black border-black shadow-sm"
                : "bg-white border-[#E5E5E5] hover:bg-[#FAFAFA]"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`text-xs font-semibold ${activeFilter === "internships" ? "text-white" : "text-black"}`}>
                Internships
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${activeFilter === "internships" ? "bg-white/20 text-white" : "bg-[#F1F1F1] text-black"}`}>
                {internshipsCount}
              </span>
            </div>
          </button>
        </div>
      </div>
      
      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No {activeFilter === "jobs" ? "full-time jobs" : activeFilter === "internships" ? "internships" : "opportunities"} available right now.</p>
          <p className="text-gray-400 text-xs mt-1">Check back soon for new opportunities!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayedOpportunities.map((opportunity) => (
          opportunity.type === "job" ? (
            <JobCard key={opportunity.id} job={opportunity} imageErrors={imageErrors} handleImageError={handleImageError} onSaveToggle={handleSaveToggle} />
          ) : (
            <InternshipCard key={opportunity.id} internship={opportunity} imageErrors={imageErrors} handleImageError={handleImageError} onSaveToggle={handleSaveToggle} />
          )
        ))}
      </div>

      {hasMore && filteredOpportunities.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#ECECEC] text-[#111] font-medium rounded-lg hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all duration-300 text-xs cursor-pointer"
          >
            Load more opportunities
            <ChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
}