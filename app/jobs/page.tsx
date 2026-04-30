'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ChevronRight, X, Loader2, Briefcase, Building2, ExternalLink } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  salary?: string;
  skills: string[];
  isVerified: boolean;
  createdAt: string;
  companyLogo?: string;
  description?: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const popularTags = [
    'Excel', 'Python', 'Power BI', 'SQL', 'Financial Modeling',
    'Tableau', 'Forecasting', 'Budgeting', 'Data Analysis', 'VBA',
    'SAP', 'QuickBooks', 'Tally', 'Risk Management', 'Auditing'
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/opportunities');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (Array.isArray(data)) {
        // Filter jobs (type = 'job' OR 'Full-time')
        const allJobs = data.filter((item: any) => item.type === 'job' || item.type === 'Full-time');
        
        const formattedJobs = allJobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company || 'Company',
          location: job.location || 'India',
          workMode: job.workMode || 'On-site',
          salary: job.salary,
          skills: job.skills || [],
          isVerified: job.isVerified || false,
          createdAt: job.createdAt || new Date().toISOString(),
          companyLogo: job.companyLogo,
          description: job.overview || job.description || job.shortDescription || ''
        }));
        
        console.log('Formatted Jobs:', formattedJobs);
        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
      } else {
        console.error('API did not return array:', data);
        setJobs([]);
        setFilteredJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs. Please try again later.');
      setJobs([]);
      setFilteredJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...jobs];
    
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (locationQuery) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    
    if (activeFilters.length > 0) {
      filtered = filtered.filter(job =>
        activeFilters.some(filter => 
          job.skills.some(skill => skill.toLowerCase() === filter.toLowerCase())
        )
      );
    }
    
    setFilteredJobs(filtered);
  }, [searchQuery, locationQuery, activeFilters, jobs]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getCompanyInitials = (company: string) => {
    if (!company) return 'IN';
    const words = company.split(' ');
    if (words.length === 1) {
      return company.substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getCompanyColor = (company: string) => {
    const colors = [
      'from-blue-600 to-blue-800',
      'from-emerald-600 to-teal-600',
      'from-purple-600 to-indigo-600',
      'from-red-600 to-rose-600',
      'from-orange-600 to-amber-600',
      'from-cyan-600 to-sky-600',
    ];
    const index = company.length % colors.length;
    return colors[index];
  };

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

  const addFilter = (tag: string) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setLocationQuery('');
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchJobs} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-medium">Find Entry Level Financial Analyst Jobs</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Entry Level Financial Analyst Jobs</h1>
          <p className="text-gray-500 mb-6">Discover fresher-friendly opportunities at top companies. Start your finance career today.</p>
          
          {/* Search Form */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skill, or company"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City or remote"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button 
              onClick={() => fetchJobs()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition whitespace-nowrap"
            >
              Find Job →
            </button>
          </div>

          {/* Popular Tags */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-3">Popular Skills:</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addFilter(tag)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {activeFilters.map((filter) => (
                  <div key={filter} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    {filter}
                    <button onClick={() => removeFilter(filter)} className="ml-1 hover:text-blue-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Latest Jobs</h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredJobs.length} entry level position{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find more opportunities</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const hasLogoError = imageErrors[job.id];
              const description = truncateDescription(job.description || '');
              
              return (
                <Link
                  key={job.id}
                  href={`/opportunities/jobs/${job.id}`}
                  className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          {!hasLogoError && job.companyLogo ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                              <img
                                src={job.companyLogo}
                                alt={`${job.company} logo`}
                                className="w-12 h-12 object-contain"
                                loading="lazy"
                                onError={() => handleImageError(job.id)}
                              />
                            </div>
                          ) : (
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getCompanyColor(job.company)} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                              <span className="text-white font-bold text-lg">
                                {getCompanyInitials(job.company)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          {/* Job Title with Underline on Hover */}
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 group-hover:underline transition text-lg">
                            {job.title}
                          </h3>
                          
                          {/* Company Name */}
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{job.company}</span>
                            {job.isVerified && (
                              <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">✓ Verified</span>
                            )}
                          </div>
                          
                          {/* Location and Work Mode */}
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {job.location}
                            </span>
                            <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                              {job.workMode}
                            </span>
                          </div>
                          
                          {/* Description Line */}
                          {description && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                              {description}
                            </p>
                          )}
                          
                          {/* Skills Tags */}
                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.skills.slice(0, 4).map((skill) => (
                                <span key={skill} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                  {skill}
                                </span>
                              ))}
                              {job.skills.length > 4 && (
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                                  +{job.skills.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Meta Info with Bold Arrow */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {formatDate(job.createdAt)}
                      </span>
                      <span className="text-xs text-gray-500">Full Time</span>
                      {job.salary && (
                        <span className="text-xs font-semibold text-green-600">{job.salary}</span>
                      )}
                      {/* Bold Arrow Icon */}
                      <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                        <span>View Job</span>
                        <ChevronRight size={16} className="font-bold" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}