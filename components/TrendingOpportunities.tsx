"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Clock, Building2,
  ChevronRight, Calendar, Briefcase, CheckCircle
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
const getCompanyInitials = (company: string) => {
  if (!company) return "IN";
  const words = company.split(" ");
  if (words.length === 1) {
    return company.substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getCompanyColor = (company: string) => {
  const colors = [
    "from-blue-600 to-blue-800",
    "from-emerald-600 to-teal-600",
    "from-purple-600 to-indigo-600",
    "from-red-600 to-rose-600",
    "from-orange-600 to-amber-600",
    "from-cyan-600 to-sky-600",
  ];
  const index = company.length % colors.length;
  return colors[index];
};

const getLocationDisplay = (location: string, workMode: string) => {
  const cleanLocation = location?.replace(/, India$/, '').replace(/ India$/, '').trim();
  if (workMode === "Remote") return "Remote";
  if (workMode === "Hybrid") return `${cleanLocation} (Hybrid)`;
  return `${cleanLocation} (On-site)`;
};

// Proper salary formatting
const formatSalary = (salary: string | null | undefined) => {
  if (!salary || salary === "Not Disclosed" || salary === "Not disclosed" || salary === "") {
    return null;
  }
  let cleanAmount = salary.replace(/₹/g, '').trim();
  
  if (cleanAmount.includes("LPA")) {
    let value = cleanAmount.replace(/LPA/g, '').trim();
    return `${value} LPA`;
  }
  
  if (cleanAmount.includes('-') && cleanAmount.length > 10) {
    let parts = cleanAmount.split('-');
    let min = parseInt(parts[0].replace(/[^0-9]/g, ''));
    let max = parseInt(parts[1].replace(/[^0-9]/g, ''));
    if (!isNaN(min) && !isNaN(max)) {
      return `₹${(min/100000).toFixed(0)}-${(max/100000).toFixed(0)} LPA`;
    }
  }
  
  let numValue = parseInt(cleanAmount.replace(/[^0-9]/g, ''));
  if (!isNaN(numValue) && numValue > 0) {
    if (numValue >= 100000) {
      return `₹${(numValue/100000).toFixed(1)} LPA`;
    }
    return `₹${numValue.toLocaleString()}`;
  }
  
  return `₹${cleanAmount}`;
};

// Fixed: Proper stipend formatting - shows /month ONLY if specified in database
const formatStipend = (stipendAmount: string | null | undefined) => {
  if (!stipendAmount || stipendAmount === "Not Disclosed" || stipendAmount === "Not disclosed" || stipendAmount === "") {
    return null;
  }
  
  let originalValue = stipendAmount.toString();
  let hasMonthSuffix = false;
  
  if (originalValue.toLowerCase().includes('/month') || originalValue.toLowerCase().includes('per month')) {
    hasMonthSuffix = true;
  }
  
  let cleanAmount = originalValue;
  cleanAmount = cleanAmount.replace(/₹/g, '');
  cleanAmount = cleanAmount.replace(/\/month/g, '').replace(/per month/g, '').trim();
  
  if (cleanAmount.toLowerCase().includes('monthly stipend')) {
    return 'Monthly stipend';
  }
  
  const rangeMatch = cleanAmount.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1]);
    const max = parseInt(rangeMatch[2]);
    if (!isNaN(min) && !isNaN(max)) {
      let formattedStipend = '';
      if (min >= 1000 && max >= 1000) {
        formattedStipend = `₹${min/1000}k - ${max/1000}k`;
      } else {
        formattedStipend = `₹${min.toLocaleString()} - ${max.toLocaleString()}`;
      }
      if (hasMonthSuffix) {
        formattedStipend += '/month';
      }
      return formattedStipend;
    }
  }
  
  const singleMatch = cleanAmount.match(/(\d+)/);
  if (singleMatch) {
    const amount = parseInt(singleMatch[1]);
    if (!isNaN(amount)) {
      let formattedStipend = '';
      if (amount >= 1000) {
        formattedStipend = `₹${amount/1000}k`;
      } else {
        formattedStipend = `₹${amount.toLocaleString()}`;
      }
      if (hasMonthSuffix) {
        formattedStipend += '/month';
      }
      return formattedStipend;
    }
  }
  
  let result = cleanAmount;
  if (!result.startsWith('₹')) {
    result = `₹${result}`;
  }
  return result;
};

const getDescription = (item: Opportunity) => {
  const text = item.shortDescription || item.description || "";
  if (!text) return "";
  let cleanText = text;
  if (item.company) {
    const patterns = [
      new RegExp(`^${item.company}\\s+(is\\s+)?(hiring|offering|looking for)\\s+`, 'i'),
      new RegExp(`^${item.company}\\s+`, 'i'),
    ];
    for (const pattern of patterns) {
      cleanText = cleanText.replace(pattern, '');
    }
  }
  cleanText = cleanText.replace(/^(A|An)\s+/i, '');
  cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
  if (cleanText.length > 100) {
    return cleanText.substring(0, 100) + "...";
  }
  return cleanText;
};

const formatPostedDate = (date: string) => {
  if (!date) return "Recently";
  const postedDate = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`;
  return `${Math.floor(diffDays / 30)}mo`;
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

// Job Card Component
const JobCard = ({ job, imageErrors, handleImageError }: { 
  job: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
}) => {
  const formattedSalary = formatSalary(job.salary);
  const description = getDescription(job);
  const displaySkills = job.skills?.slice(0, 4) || [];
  const remainingSkills = job.skills?.length > 4 ? job.skills.length - 4 : 0;
  const hasLogoError = imageErrors[job.id];
  
  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            {!hasLogoError && job.companyLogo ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-14 h-14 object-contain"
                  loading="lazy"
                  onError={() => handleImageError(job.id)}
                />
              </div>
            ) : (
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCompanyColor(job.company)} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                <span className="text-white font-bold text-xl">
                  {getCompanyInitials(job.company)}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Link href={`/opportunities/jobs/${job.id}`}>
              <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 hover:underline transition-colors line-clamp-1 mb-1 cursor-pointer">
                {job.title}
              </h3>
            </Link>
            <div className="w-12 h-0.5 bg-blue-500 rounded-full mb-2"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <Building2 size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">{job.company}</span>
              {job.isVerified && (
                <span className="inline-flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle size={10} className="text-green-600" />
                  <span className="text-[10px] font-medium text-green-700">Verified</span>
                </span>
              )}
              {job.isActivelyHiring && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  Hiring
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <MapPin size={14} className="text-emerald-500" />
            <span className="text-xs text-gray-700 font-medium truncate">{getLocationDisplay(job.location, job.workMode)}</span>
          </div>

          {job.experience && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <Briefcase size={14} className="text-blue-500" />
              <span className="text-xs text-gray-700 font-medium">{job.experience}</span>
            </div>
          )}

          {formattedSalary && (
            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
              <span className="text-xs text-gray-500 font-medium">Salary:</span>
              <span className="text-xs font-semibold text-green-700">{formattedSalary}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displaySkills.map((skill: string, i: number) => (
              <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-md">
                +{remainingSkills}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={12} />
            <span>Posted {formatPostedDate(job.createdAt)}</span>
          </div>
          {job.applyLink ? (
            <button
              onClick={() => trackApplyClick(job.id, 'job', job.applyLink!)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors flex items-center gap-1"
            >
              <span>Apply Now</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <Link
              href={`/opportunities/jobs/${job.id}`}
              onClick={() => trackOpportunityClick(job.id, 'job')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors flex items-center gap-1"
            >
              <span>Apply Now</span>
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Internship Card Component
const InternshipCard = ({ internship, imageErrors, handleImageError }: { 
  internship: Opportunity; 
  imageErrors: { [key: string]: boolean }; 
  handleImageError: (id: string) => void;
}) => {
  const stipend = formatStipend(internship.stipendAmount || internship.salary);
  const description = getDescription(internship);
  const displaySkills = internship.skills?.slice(0, 4) || [];
  const remainingSkills = internship.skills?.length > 4 ? internship.skills.length - 4 : 0;
  const hasLogoError = imageErrors[internship.id];
  
  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            {!hasLogoError && internship.companyLogo ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <img
                  src={internship.companyLogo}
                  alt={`${internship.company} logo`}
                  className="w-14 h-14 object-contain"
                  loading="lazy"
                  onError={() => handleImageError(internship.id)}
                />
              </div>
            ) : (
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCompanyColor(internship.company)} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                <span className="text-white font-bold text-xl">
                  {getCompanyInitials(internship.company)}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Link href={`/opportunities/internships/${internship.id}`}>
              <h3 className="text-lg font-bold text-gray-900 hover:text-emerald-600 hover:underline transition-colors line-clamp-1 mb-1 cursor-pointer">
                {internship.title}
              </h3>
            </Link>
            <div className="w-12 h-0.5 bg-emerald-500 rounded-full mb-2"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <Building2 size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">{internship.company}</span>
              {internship.isVerified && (
                <span className="inline-flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle size={10} className="text-green-600" />
                  <span className="text-[10px] font-medium text-green-700">Verified</span>
                </span>
              )}
              {internship.isActivelyHiring && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  Hiring
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <MapPin size={14} className="text-emerald-500" />
            <span className="text-xs text-gray-700 font-medium truncate">{getLocationDisplay(internship.location, internship.workMode)}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <Clock size={14} className="text-blue-500" />
            <span className="text-xs text-gray-700 font-medium">{internship.duration || "Flexible"}</span>
          </div>

          {stipend && (
            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
              <span className="text-xs text-gray-500 font-medium">Stipend:</span>
              <span className="text-xs font-semibold text-green-700">{stipend}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displaySkills.map((skill: string, i: number) => (
              <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-md">
                +{remainingSkills}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={12} />
            <span>Posted {formatPostedDate(internship.createdAt)}</span>
          </div>
          {internship.applyLink ? (
            <button
              onClick={() => trackApplyClick(internship.id, 'internship', internship.applyLink!)}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors flex items-center gap-1"
            >
              <span>Apply Now</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <Link
              href={`/opportunities/internships/${internship.id}`}
              onClick={() => trackOpportunityClick(internship.id, 'internship')}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors flex items-center gap-1"
            >
              <span>Apply Now</span>
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component with View More functionality
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

  const handleRefresh = () => {
    setVisibleCount(6);
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Latest Entry-Level Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-white rounded-xl border border-gray-100 animate-pulse">
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-600">{error}</p>
          <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (allOpportunities.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Latest Entry-Level Opportunities</h2>
        <p className="text-gray-500 text-sm mt-1">Discover the best opportunities matching your skills</p>
      </div>
      
      {/* Filter Tabs - WITHOUT COUNTS */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => {
            setActiveFilter("all");
            setVisibleCount(6);
          }}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeFilter === "all" ? "bg-[#0A2540] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => {
            setActiveFilter("jobs");
            setVisibleCount(6);
          }}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeFilter === "jobs" ? "bg-[#0A2540] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => {
            setActiveFilter("internships");
            setVisibleCount(6);
          }}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeFilter === "internships" ? "bg-[#0A2540] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Internships
        </button>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedOpportunities.map((opportunity) => (
          opportunity.type === "job" ? (
            <JobCard key={opportunity.id} job={opportunity} imageErrors={imageErrors} handleImageError={handleImageError} />
          ) : (
            <InternshipCard key={opportunity.id} internship={opportunity} imageErrors={imageErrors} handleImageError={handleImageError} />
          )
        ))}
      </div>

      {/* View More Button - Stays visible until all opportunities are loaded */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#FFD700] text-[#0A2540] font-semibold rounded-lg hover:bg-[#FFD700]/10 transition-all duration-300"
          >
            View More Opportunities
            <ChevronRight size={16} />
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Showing {displayedOpportunities.length} of {filteredOpportunities.length} opportunities
          </p>
        </div>
      )}
    </div>
  );
}