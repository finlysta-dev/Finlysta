'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ChevronRight, X, Loader2, Briefcase, Building2, Calendar, Award, Zap, CheckCircle } from 'lucide-react';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  stipend?: string;
  duration?: string;
  skills: string[];
  isVerified: boolean;
  isActivelyHiring: boolean;
  createdAt: string;
  companyLogo?: string;
  description?: string;
  responsibilities?: string;
  qualifications?: string;
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const popularTags = [
    'Excel', 'Python', 'Power BI', 'SQL', 'Financial Modeling',
    'Tableau', 'Data Analysis', 'VBA', 'SAP', 'QuickBooks',
    'Tally', 'Risk Management', 'Auditing', 'Communication', 'Teamwork'
  ];

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/opportunities?type=internship');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const formattedInternships = data.map((internship: any) => ({
          id: internship.id,
          title: internship.title,
          company: internship.company,
          location: internship.location,
          workMode: internship.workMode,
          stipend: internship.stipendAmount || internship.salary,
          duration: internship.duration,
          skills: internship.skills || [],
          isVerified: internship.isVerified,
          isActivelyHiring: internship.isActivelyHiring,
          createdAt: internship.createdAt,
          companyLogo: internship.companyLogo,
          description: internship.overview || internship.description || internship.shortDescription || '',
          responsibilities: internship.responsibilities || '',
          qualifications: internship.qualifications || ''
        }));
        setInternships(formattedInternships);
        setFilteredInternships(formattedInternships);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...internships];
    
    if (searchQuery) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (locationQuery) {
      filtered = filtered.filter(internship =>
        internship.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    
    if (activeFilters.length > 0) {
      filtered = filtered.filter(internship =>
        activeFilters.some(filter => 
          internship.skills.some(skill => skill.toLowerCase() === filter.toLowerCase())
        )
      );
    }
    
    setFilteredInternships(filtered);
  }, [searchQuery, locationQuery, activeFilters, internships]);

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
      'from-emerald-500 to-emerald-600',
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-cyan-500 to-cyan-600',
      'from-rose-500 to-rose-600',
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

  const formatStipend = (stipend: string | undefined | null) => {
    if (!stipend || stipend === 'Not Disclosed') return null;
    return stipend;
  };

  const getFirstResponsibility = (responsibilities: string, maxLength: number = 100) => {
    if (!responsibilities) return '';
    // Remove HTML tags
    const cleanText = responsibilities.replace(/<[^>]*>/g, '');
    // Get first sentence or first line
    const firstLine = cleanText.split('\n')[0];
    const firstSentence = firstLine.split('.')[0];
    if (firstSentence.length <= maxLength) return firstSentence;
    return firstSentence.substring(0, maxLength) + '...';
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-emerald-600" />
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
            <span className="text-gray-900 font-medium">Find Entry Level Financial Analyst Internships</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Entry Level Financial Analyst Internships</h1>
          <p className="text-gray-500 mb-6">Start your finance career with paid internships at top companies</p>
          
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
                  placeholder="Internship title, skill, or company"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            <button 
              onClick={() => fetchInternships()} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition whitespace-nowrap"
            >
              Find Internship →
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Skills:</h3>
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
        
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {activeFilters.map((filter) => (
                  <div key={filter} className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full">
                    {filter}
                    <button onClick={() => removeFilter(filter)} className="ml-1 hover:text-emerald-900">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={clearAllFilters} className="text-sm text-red-500 hover:text-red-600">
                Clear all
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Latest Internships</h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredInternships.length} entry level internship positions
          </p>
        </div>

        {filteredInternships.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No internships found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button onClick={clearAllFilters} className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => {
              const hasLogoError = imageErrors[internship.id];
              const responsibility = getFirstResponsibility(internship.responsibilities || '');
              
              return (
                <Link
                  key={internship.id}
                  href={`/opportunities/internships/${internship.id}`}
                  className="group block bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-5">
                    {/* Header with Logo */}
                    <div className="flex items-start gap-3 mb-3">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {!hasLogoError && internship.companyLogo ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                            <img
                              src={internship.companyLogo}
                              alt={`${internship.company} logo`}
                              className="w-10 h-10 object-contain"
                              loading="lazy"
                              onError={() => handleImageError(internship.id)}
                            />
                          </div>
                        ) : (
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCompanyColor(internship.company)} flex items-center justify-center shadow-sm`}>
                            <span className="text-white font-bold text-sm">
                              {getCompanyInitials(internship.company)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition line-clamp-1">
                          {internship.title}
                        </h3>
                        <p className="text-sm text-gray-500">{internship.company}</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                        {formatDate(internship.createdAt)}
                      </span>
                    </div>

                    {/* Responsibility - MAIN CONTENT (removed description/overview) */}
                    {responsibility && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {responsibility}
                        </p>
                      </div>
                    )}

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span>{internship.location}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="capitalize">{internship.workMode}</span>
                      </div>
                      {internship.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{internship.duration}</span>
                        </div>
                      )}
                      {internship.stipend && formatStipend(internship.stipend) && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                          <span>💰</span>
                          <span>{formatStipend(internship.stipend)}</span>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {internship.skills && internship.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {internship.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {internship.skills.length > 3 && (
                          <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                            +{internship.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        {internship.isVerified && (
                          <span className="flex items-center gap-0.5 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <Award size={10} />
                            Verified
                          </span>
                        )}
                        {internship.isActivelyHiring && (
                          <span className="flex items-center gap-0.5 text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                            <Zap size={10} />
                            Actively Hiring
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
                        <span>Apply Now</span>
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
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