"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTrackView } from "@/hooks/useTrackView";
import {
  ArrowLeft, MapPin, Clock, Building2, Calendar,
  CheckCircle, Bookmark, Share2, Zap,
  ExternalLink, Award, DollarSign, GraduationCap,
  Briefcase, TrendingUp
} from "lucide-react";

interface Opportunity {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  aboutCompany?: string;
  type: string;
  workMode: string;
  location: string;
  experience?: string;
  salary?: string;
  skills: string[];
  overview?: string;
  responsibilities?: string;
  qualifications?: string;
  benefits?: string;
  applyLink: string;
  isVerified: boolean;
  isActivelyHiring: boolean;
  postedAt: string;
  deadline?: string;
}

export default function JobDetailClient({ initialOpportunity }: { initialOpportunity: Opportunity }) {
  const router = useRouter();
  const slug = initialOpportunity.slug;
  
  // Track view for this job
  useTrackView(slug, 'job');
  
  const [opportunity, setOpportunity] = useState<Opportunity>(initialOpportunity);
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState<Opportunity[]>([]);

  // Check if job is saved
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("saved_opportunities") || "[]");
    setSaved(savedItems.includes(opportunity.id));
  }, [opportunity.id]);

  // Fetch related jobs
  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        const response = await fetch(`/api/opportunities/related?jobId=${opportunity.id}&type=${opportunity.type}`);
        if (response.ok) {
          const data = await response.json();
          setRelatedJobs(data);
        }
      } catch (error) {
        console.error("Error fetching related jobs:", error);
      }
    };
    fetchRelatedJobs();
  }, [opportunity.id, opportunity.type]);

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem("saved_opportunities") || "[]");
    if (!saved) {
      savedItems.push(opportunity.id);
      localStorage.setItem("saved_opportunities", JSON.stringify(savedItems));
      setSaved(true);
    } else {
      const filtered = savedItems.filter((item: string) => item !== opportunity.id);
      localStorage.setItem("saved_opportunities", JSON.stringify(filtered));
      setSaved(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleApply = async () => {
    if (opportunity?.applyLink) {
      // Track apply click
      try {
        let sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitor_session_id', sessionId);
        }
        
        await fetch('/api/analytics/opportunity-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            opportunityId: opportunity.id,
            sessionId 
          }),
        });
      } catch (error) {
        console.error("Failed to track click:", error);
      }
      
      window.open(opportunity.applyLink, "_blank");
    }
  };

  const getTimeAgo = (date: string) => {
    const posted = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getLocationDisplay = () => {
    const { workMode, location } = opportunity;
    if (workMode === "remote") return "Remote";
    if (workMode === "hybrid") return `${location} (Hybrid)`;
    return `${location} (On-site)`;
  };

  const getCompanyInitials = (company: string) => {
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

  const formatPoints = (text?: string) => {
    if (!text) return [];
    return text.split("\n").filter(line => line.trim().length > 0);
  };

  const responsibilitiesPoints = formatPoints(opportunity.responsibilities);
  const qualificationsPoints = formatPoints(opportunity.qualifications);
  const benefitsPoints = formatPoints(opportunity.benefits);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back to Jobs</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Save job"
              >
                <Bookmark size={18} className={saved ? "text-blue-600 fill-blue-600" : "text-gray-500"} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Share job"
              >
                <Share2 size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-12 mb-4">
              <div className="w-24 h-24 rounded-xl bg-white border-4 border-white shadow-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                {!logoError && opportunity.companyLogo ? (
                  <img
                    src={opportunity.companyLogo}
                    alt={opportunity.company}
                    className="max-w-full max-h-full object-contain p-2"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getCompanyColor(opportunity.company)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">
                      {getCompanyInitials(opportunity.company)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{opportunity.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-600">{opportunity.company}</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Posted {getTimeAgo(opportunity.postedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {opportunity.isVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                )}
                {opportunity.isActivelyHiring && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-medium rounded-full">
                    <Zap size={14} />
                    Actively Hiring
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Location</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{getLocationDisplay()}</p>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={16} className="text-blue-500" />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Experience</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{opportunity.experience || "Entry Level (0-2 years)"}</p>
              </div>
              
              {opportunity.salary && (
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign size={16} className="text-green-500" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Salary</span>
                  </div>
                  <p className="text-sm font-bold text-green-600">{opportunity.salary}</p>
                </div>
              )}
            </div>

            {/* About Company */}
            {opportunity.aboutCompany && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={18} className="text-blue-500" />
                  <h2 className="text-lg font-bold text-gray-900">About {opportunity.company}</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {opportunity.aboutCompany}
                </p>
              </div>
            )}

            {/* Role Overview */}
            {opportunity.overview && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Role Overview</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {opportunity.overview}
                </p>
              </div>
            )}

            {/* Required Skills */}
            {opportunity.skills && opportunity.skills.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Responsibilities */}
            {responsibilitiesPoints.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-2">
                  {responsibilitiesPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {qualificationsPoints.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={18} className="text-purple-500" />
                  <h2 className="text-lg font-bold text-gray-900">Qualifications & Requirements</h2>
                </div>
                <ul className="space-y-2">
                  {qualificationsPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perks & Benefits */}
            {benefitsPoints.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-yellow-500" />
                  <h2 className="text-lg font-bold text-gray-900">Perks & Benefits</h2>
                </div>
                <ul className="space-y-2">
                  {benefitsPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-yellow-500 mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply Card - Sticky */}
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="text-lg font-bold text-gray-900">Ready to apply?</h3>
                  <p className="text-xs text-gray-500 mt-1">Don't miss this opportunity</p>
                </div>
                
                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-[1.02] text-center flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  Apply Now
                </button>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center">
                    {opportunity.deadline 
                      ? `Deadline: ${new Date(opportunity.deadline).toLocaleDateString("en-IN")}`
                      : "No deadline specified"}
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="mt-4 bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Posted:</span>
                  <span className="font-medium text-gray-700">{getTimeAgo(opportunity.postedAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium text-gray-700 capitalize">{opportunity.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Similar Jobs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedJobs.slice(0, 3).map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.slug}`}
                  className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-200 transition group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <MapPin size={12} />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <p className="text-xs font-medium text-green-600 mt-2">{job.salary}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}