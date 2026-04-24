'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Briefcase, Building2, ChevronRight, 
  Filter, X, Loader2, Calendar, Award, Zap, Star 
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  workMode: string;
  salary?: string;
  experience?: string;
  skills: string[];
  isVerified: boolean;
  isActivelyHiring: boolean;
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/opportunities?type=job');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const formattedJobs = data
          .filter((job: any) => {
            const title = job.title.toLowerCase();
            return !title.includes('senior') && 
                   !title.includes('lead') && 
                   !title.includes('manager') && 
                   !title.includes('director');
          })
          .map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            type: 'Full Time',
            workMode: job.workMode,
            salary: job.salary,
            experience: job.experience,
            skills: job.skills || [],
            isVerified: job.isVerified,
            isActivelyHiring: job.isActivelyHiring,
            createdAt: job.createdAt
          }));
        
        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...jobs];
    
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (locationQuery) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'remote') {
        filtered = filtered.filter(job => job.workMode.toLowerCase() === 'remote');
      } else if (selectedCategory === 'hybrid') {
        filtered = filtered.filter(job => job.workMode.toLowerCase() === 'hybrid');
      } else if (selectedCategory === 'onsite') {
        filtered = filtered.filter(job => job.workMode.toLowerCase() === 'onsite');
      }
    }
    
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setFilteredJobs(filtered);
  }, [searchQuery, locationQuery, selectedCategory, jobs]);

  const formatDate = (date: string) => {
    if (!date) return 'Recently';
    const postedDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`;
    return `${Math.floor(diffDays / 30)}mo`;
  };

  const formatSalary = (salary: string) => {
    if (!salary || salary === 'Not Disclosed') return null;
    return salary;
  };

  const categories = [
    { id: 'all', name: 'All Jobs', icon: Briefcase, count: jobs.length },
    { id: 'remote', name: 'Remote', icon: Zap, count: jobs.filter(j => j.workMode === 'remote').length },
    { id: 'hybrid', name: 'Hybrid', icon: Star, count: jobs.filter(j => j.workMode === 'hybrid').length },
    { id: 'onsite', name: 'On-site', icon: Building2, count: jobs.filter(j => j.workMode === 'onsite').length },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Find Your <span className="text-yellow-300">Dream Job</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Discover entry level financial analyst positions at top companies
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job title or company"
                    className="w-full pl-11 pr-4 py-4 outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
                <div className="flex-1 relative border-t md:border-t-0 md:border-l border-slate-200">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <MapPin size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="City or remote"
                    className="w-full pl-11 pr-4 py-4 outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 transition">
                  Search Jobs →
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
                <span className={`text-xs ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
            <p className="text-sm text-slate-500">Latest opportunities for freshers</p>
          </div>
          {(searchQuery || locationQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setLocationQuery('');
                setSelectedCategory('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <X size={14} />
              Clear all filters
            </button>
          )}
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No jobs found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredJobs.map((job, index) => (
              <Link
                key={job.id}
                href={`/opportunities/jobs/${job.id}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Company Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0">
                    {job.company.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Title Row */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition line-clamp-1">
                        {job.title}
                      </h3>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(job.createdAt)}
                      </span>
                    </div>
                    
                    {/* Company */}
                    <p className="text-sm text-slate-500 mb-2">{job.company}</p>
                    
                    {/* Details Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        {job.workMode === 'remote' ? '🌍' : job.workMode === 'hybrid' ? '💻' : '🏢'}
                        <span className="capitalize">{job.workMode}</span>
                      </span>
                      {formatSalary(job.salary) && (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          💰 {formatSalary(job.salary)}
                        </span>
                      )}
                    </div>
                    
                    {/* Skills Tags */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="flex items-center gap-2 mt-3">
                      {job.isVerified && (
                        <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded-full flex items-center gap-0.5">
                          <Award size={10} />
                          Verified
                        </span>
                      )}
                      {job.isActivelyHiring && (
                        <span className="text-[10px] px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full flex items-center gap-0.5">
                          <Zap size={10} />
                          Actively Hiring
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}