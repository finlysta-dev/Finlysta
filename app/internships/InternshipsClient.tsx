"use client";

import { useEffect, useState, useRef } from "react";
import { 
  MapPin, Clock, CheckCircle, Building2, ArrowRight, 
  Flame, Briefcase, Calendar, TrendingUp, Sparkles,
  Zap, Award, ChevronRight, AlertCircle
} from "lucide-react";
import Link from "next/link";

type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  paid: boolean;
  stipendAmount?: string | null;
  companyLogo?: string | null;
  duration?: string | null;
  skills?: string[] | null;
  isTrending?: boolean | null;
  verified?: boolean | null;
  applyBy?: string | null;
  postedAt?: string | null;
};

function getWorkType(location: string) {
  const loc = location.toLowerCase();
  if (loc.includes("remote")) return { 
    label: "Remote",  
    bg: "bg-blue-50", 
    text: "text-blue-700", 
    border: "border-blue-200",
    icon: <Zap size={12} className="text-blue-600" />
  };
  if (loc.includes("hybrid")) return { 
    label: "Hybrid",  
    bg: "bg-purple-50", 
    text: "text-purple-700", 
    border: "border-purple-200",
    icon: <Briefcase size={12} className="text-purple-600" />
  };
  return { 
    label: "On-site", 
    bg: "bg-emerald-50", 
    text: "text-emerald-700", 
    border: "border-emerald-200",
    icon: <MapPin size={12} className="text-emerald-600" />
  };
}

function formatStipend(amount: string): string {
  if (!amount) return "Not specified";
  const num = parseInt(amount.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return amount;
  return `₹${num.toLocaleString("en-IN")}/mo`;
}

function getTimeAgo(dateString?: string | null): string {
  if (!dateString) return "New";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  } catch {
    return "New";
  }
}

// Premium Card Design
function InternshipCard({ item }: { item: Internship }) {
  const wt = getWorkType(item.location);
  const timeAgo = getTimeAgo(item.postedAt);

  return (
    <Link href={`/internships/${item.id}`} className="group block h-full no-underline">
      <article className="relative h-full bg-white rounded-2xl border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-blue-200 hover:-translate-y-1">
        
        {/* Top Section */}
        <div className="flex items-start justify-between mb-4">
          {/* Logo with gradient background */}
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden shadow-sm">
              {item.companyLogo ? (
                <img
                  src={item.companyLogo}
                  alt={item.company}
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(item.company)}&background=3B82F6&color=fff&bold=true&size=28`;
                  }}
                />
              ) : (
                <Building2 size={18} className="text-slate-400" />
              )}
            </div>
            {item.verified && (
              <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle size={12} className="text-blue-600" />
              </div>
            )}
          </div>

          {/* Trending Badge */}
          {item.isTrending && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-sm">
              <Flame size={11} className="text-amber-500" />
              <span className="text-[10px] font-semibold tracking-wide">TRENDING</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          {/* Title & Company */}
          <div>
            <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs font-medium text-slate-500">
              {item.company}
            </p>
          </div>

          {/* Meta Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold ${wt.bg} ${wt.text} border ${wt.border}`}>
              {wt.icon}
              {wt.label}
            </div>
            {item.duration && (
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/80">
                <Clock size={11} />
                {item.duration}
              </div>
            )}
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/80">
              <Calendar size={11} />
              {timeAgo}
            </div>
          </div>

          {/* Skills */}
          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {item.skills.slice(0, 3).map((skill, i) => (
                <span 
                  key={i} 
                  className="text-[9px] px-2 py-1 bg-slate-50 text-slate-500 rounded-md border border-slate-200/80"
                >
                  {skill}
                </span>
              ))}
              {item.skills.length > 3 && (
                <span className="text-[9px] px-2 py-1 bg-slate-50 text-slate-400 rounded-md border border-slate-200/80">
                  +{item.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
              Stipend
            </span>
            {item.paid && item.stipendAmount ? (
              <span className="text-sm font-bold text-emerald-600">
                {formatStipend(item.stipendAmount)}
              </span>
            ) : (
              <span className="text-xs font-medium text-slate-400">
                Not specified
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all group-hover:shadow-sm group-hover:gap-1.5">
            <span>Apply</span>
            <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}

// Premium Skeleton
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
      <div className="flex justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-slate-200 to-slate-300 shimmer" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 shimmer" />
        <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2 shimmer" />
      </div>
      <div className="flex gap-1.5 mb-3">
        <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-16 shimmer" />
        <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-16 shimmer" />
      </div>
      <div className="flex gap-1 mb-4">
        <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-14 shimmer" />
        <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-14 shimmer" />
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
        <div className="space-y-1">
          <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-12 shimmer" />
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-16 shimmer" />
        </div>
        <div className="h-7 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-16 shimmer" />
      </div>
    </div>
  );
}

// Error State Component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
        <AlertCircle size={32} className="text-red-500" />
      </div>
      <p className="text-gray-600 mb-2">Failed to load trending internships</p>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

// Main Section
export default function HomeTrendingInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch("/api/internships?limit=8&trending=true");
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        
        setInternships(data.slice(0, 8));
      } catch (e) {
        console.error("Error fetching internships:", e);
        setError(e instanceof Error ? e.message : "Failed to load internships");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Don't show anything if there's no data and not loading
  if (!isLoading && !error && internships.length === 0) {
    return null;
  }

  // Show error state
  if (error && !isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState message={error} />
        </div>
      </section>
    );
  }

  // Create enough cards for smooth infinite scroll (repeat if needed)
  const displayItems = isLoading 
    ? Array(8).fill(null)
    : internships.length < 6 
      ? [...internships, ...internships, ...internships] // Repeat if not enough items
      : [...internships, ...internships]; // Double for smooth scroll

  return (
    <section className="py-12 overflow-hidden bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Handpicked for you
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Trending Now
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Most popular internships this week
            </p>
          </div>
          
          <Link 
            href="/internships" 
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <span>Browse all</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track */}
        <div className="overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 animate-scroll py-2"
            style={{
              animation: internships.length > 0 ? 'scroll 45s linear infinite' : 'none'
            }}
          >
            {displayItems.map((item, i) => (
              <div key={isLoading ? i : `${item.id}-${i}`} className="flex-none w-[280px]">
                {isLoading ? <SkeletonCard /> : <InternshipCard item={item} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      {!isLoading && internships.length > 0 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>✨</span>
            <span>New opportunities added daily</span>
            <span>✨</span>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-280px * ${Math.max(displayItems.length, 8)} - 16px * ${Math.max(displayItems.length, 8)}));
          }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .shimmer {
          background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 40%, #f1f5f9 80%);
          background-size: 200% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
}