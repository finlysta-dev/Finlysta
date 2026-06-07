'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Search, MapPin, ChevronRight, X, Briefcase, Building2, Clock, Award, Shield, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface Job {
  id: string;
  slug: string;
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
  isActivelyHiring?: boolean;
  isTrending?: boolean;
  experience?: string;
}

// Skill filters
const skillFilters = [
  'Advanced Excel', 'Financial Analysis', 'Accounting', 'Financial Modeling',
  'Power BI', 'Financial Reporting', 'Data Analysis', 'MIS Reporting',
  'Budgeting & Forecasting', 'Financial Statement Analysis'
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      
      if (Array.isArray(data)) {
        const allJobs = data.filter((item: any) => item.type === 'job' || item.type === 'Full-time');
        
        const formattedJobs = allJobs.map((job: any) => ({
          id: job.id,
          slug: job.slug,
          title: job.title,
          company: job.company || 'Company',
          location: job.location || 'India',
          workMode: job.workMode || 'On-site',
          salary: job.salary || job.stipendAmount,
          skills: job.skills || [],
          isVerified: job.isVerified || false,
          createdAt: job.createdAt || new Date().toISOString(),
          companyLogo: job.companyLogo,
          description: job.overview || job.description || job.shortDescription || '',
          isActivelyHiring: job.isActivelyHiring || false,
          isTrending: job.isTrending || false,
          experience: job.experience || 'Fresher'
        }));
        
        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
      } else {
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
      'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 
      'bg-red-600', 'bg-orange-600', 'bg-cyan-600'
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
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
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

  const faqs = [
    {
      q: "What are the best finance jobs for freshers?",
      a: "The best entry-level finance jobs include Financial Analyst, Junior Accountant, Finance Executive, Credit Analyst, Risk Analyst, and FP&A Associate. These roles offer strong career growth and learning opportunities for recent graduates."
    },
    {
      q: "Can B.Com graduates apply for finance jobs?",
      a: "Yes. Many entry-level finance roles are designed for B.Com graduates, MBA students, M.Com graduates, and CA aspirants. Employers value B.Com candidates for their strong foundation in accounting and financial principles."
    },
    {
      q: "What skills are required for finance jobs?",
      a: "Employers prioritize Advanced Excel, Financial Analysis, Accounting fundamentals, Data Analysis, and attention to detail. Power BI, Financial Modeling, and SQL are valuable differentiators that can help you stand out."
    },
    {
      q: "Do finance jobs require prior experience?",
      a: "No. Many companies hire freshers for entry-level finance roles. Internships, projects, and relevant skills are valued more than years of experience. Focus on building practical Excel and analytical skills."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const uniqueCompanies = [...new Set(jobs.map(job => job.company))].length;

  // JobPosting Schema for each job
  const getJobSchemas = () => {
    return filteredJobs.slice(0, 10).map(job => ({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description,
      "datePosted": job.createdAt,
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": job.location,
          "addressCountry": "IN"
        }
      },
      "skills": job.skills.join(", "),
      "workHours": "40 hours per week"
    }));
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Finance Jobs for Freshers in India | Entry Level Finance Jobs | Finlysta</title>
          <meta name="description" content="Find finance jobs for freshers in India. Entry level Financial Analyst, Accounting, and Finance Executive opportunities from verified employers." />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://finlysta.com/jobs" />
        </Head>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading finance jobs...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 max-w-md mx-4 shadow-lg border border-gray-100">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button onClick={fetchJobs} className="mt-6 px-6 py-2.5 bg-[#FFD700] text-gray-900 font-semibold rounded-lg hover:bg-[#FFA500] transition">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Finance Jobs for Freshers in India | Entry Level Finance Jobs | Finlysta</title>
        <meta name="description" content="Find finance jobs for freshers in India. Entry level Financial Analyst, Accounting, Finance Executive, Credit Analyst, and Risk Management opportunities from verified employers." />
        <meta name="keywords" content="finance jobs for freshers, entry level finance jobs, financial analyst jobs, accounting jobs, finance executive jobs, BCom jobs, MBA finance jobs" />
        <meta name="author" content="Finlysta" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Finance Jobs for Freshers in India | Entry Level Finance Jobs" />
        <meta property="og:description" content="Discover verified finance jobs from top employers. Find entry-level opportunities in Financial Analysis, Accounting, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finlysta.com/jobs" />
        <meta property="og:image" content="https://finlysta.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Finance Jobs for Freshers in India | Entry Level Finance Jobs" />
        <meta name="twitter:description" content="Find verified finance jobs for freshers. Start your career today!" />
        <link rel="canonical" href="https://finlysta.com/jobs" />
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finlysta.com" },
              { "@type": "ListItem", "position": 2, "name": "Finance Jobs for Freshers", "item": "https://finlysta.com/jobs" }
            ]
          })}
        </script>
        
        {/* JobPosting Schemas */}
        {getJobSchemas().map((schema, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-800">Finance Jobs for Freshers</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
                Finance Jobs for Freshers in India
              </h1>
              <p className="text-black-600 text-base md:text-lg mb-8">
                Discover entry-level finance jobs, accounting roles, and financial analyst opportunities from verified employers across India.
              </p>
              
              {/* Search Form */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Search size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Job title, skill, or company"
                        className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder="City or Remote"
                        className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => fetchJobs()}
                    className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 font-semibold px-6 py-4 transition-all duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* Popular Skills Section */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-800 mb-3">Popular Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillFilters.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addFilter(skill)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                    activeFilters.includes(skill)
                      ? 'bg-[#FFD700] text-gray-900 font-medium'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-[#FFD700] hover:bg-[#FFD700]/10'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500">Active filters:</span>
                    {activeFilters.map((filter) => (
                      <div key={filter} className="flex items-center gap-1 px-2 py-1 bg-[#FFD700]/20 text-gray-800 text-xs rounded-full">
                        {filter}
                        <button onClick={() => removeFilter(filter)} className="ml-1 hover:text-red-600">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={clearAllFilters} className="text-xs text-red-500 hover:text-red-600">Clear all</button>
                </div>
              </div>
            )}
          </div>

          {/* Jobs Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Latest Finance Jobs</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredJobs.length} verified {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} for freshers
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Eye size={14} />
                <span>Updated daily</span>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find more opportunities</p>
              <button onClick={clearAllFilters} className="mt-6 text-[#FFD700] hover:text-[#FFA500] font-medium">Clear all filters</button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const hasLogoError = imageErrors[job.id];
                const description = truncateDescription(job.description || '');
                const postedDate = formatDate(job.createdAt);
                const isNew = new Date(job.createdAt).getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000;
                
                return (
                  <div key={job.id} className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="p-5">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          {!hasLogoError && job.companyLogo ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                              <img src={job.companyLogo} alt={`${job.company} logo`} className="w-10 h-10 object-contain" loading="lazy" onError={() => handleImageError(job.id)} />
                            </div>
                          ) : (
                            <div className={`w-14 h-14 rounded-xl ${getCompanyColor(job.company)} flex items-center justify-center text-white font-bold text-lg`}>
                              {getCompanyInitials(job.company)}
                            </div>
                          )}
                        </div>
                        
                        {/* Job Details */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            {isNew && (
                              <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">New</span>
                            )}
                            {job.isActivelyHiring && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                                Actively Hiring
                              </span>
                            )}
                          </div>
                          
                          <Link href={`/jobs/${job.slug}`}>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors mb-1">
                              {job.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-sm text-gray-700">{job.company}</span>
                            {job.isVerified && (
                              <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">
                                <Shield size={10} />
                                Verified
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" />{job.location}</span>
                            <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">{job.workMode}</span>
                            <span className="flex items-center gap-1"><Clock size={14} className="text-gray-400" />{postedDate}</span>
                          </div>
                          
                          {description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
                          )}
                          
                          {/* Skills Tags */}
                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {job.skills.slice(0, 5).map((skill) => (
                                <button
                                  key={skill}
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); addFilter(skill); }}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition"
                                >
                                  {skill}
                                </button>
                              ))}
                              {job.skills.length > 5 && (
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-md">+{job.skills.length - 5} more</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Right Column - Salary & Action */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 min-w-[130px]">
                          {job.salary && (
                            <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full whitespace-nowrap">
                              {job.salary}
                            </span>
                          )}
                          <Link 
                            href={`/jobs/${job.slug}`}
                            className="flex items-center gap-1 text-gray-700 font-medium text-sm hover:text-gray-900 transition-all duration-300 whitespace-nowrap"
                          >
                            View Details
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Why Choose Finlysta Section - SEO Optimized */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">Why Choose Finlysta</h2>
              <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
                Finlysta helps students and recent graduates discover <strong className="text-gray-900">finance jobs for freshers across India</strong>. 
                Explore opportunities in <strong className="text-gray-900">Financial Analysis</strong>, <strong className="text-gray-900">Accounting</strong>, 
                <strong className="text-gray-900"> Financial Reporting</strong>, <strong className="text-gray-900">FP&A</strong>, 
                <strong className="text-gray-900"> Auditing</strong>, <strong className="text-gray-900">Taxation</strong>, 
                <strong className="text-gray-900"> Credit Analysis</strong>, and <strong className="text-gray-900">Risk Management</strong>. 
                Whether you're a <strong className="text-gray-900">B.Com graduate</strong>, <strong className="text-gray-900">MBA fresher</strong>, 
                <strong className="text-gray-900"> M.Com student</strong>, or <strong className="text-gray-900">CA aspirant</strong>, you can browse 
                verified finance opportunities from top employers and apply directly to start your finance career. 
                <strong className="text-gray-900"> Entry-level finance jobs</strong> are updated daily with new positions from trusted companies.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-700"><Award size={16} className="text-[#FFD700]" /><span>Verified Employers</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Briefcase size={16} className="text-[#FFD700]" /><span>Fresher Friendly</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><MapPin size={16} className="text-[#FFD700]" /><span>India Wide</span></div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-800">{faq.q}</span>
                    {openFaq === index ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Explore More Finance Career Resources - Black text only, no yellow */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 text-center mb-4">Explore More Finance Career Resources</h3>
            <div className="flex flex-wrap justify-center gap-5 text-sm">
              <Link href="/internships" className="text-gray-600 hover:text-gray-800 transition">Finance Internships</Link>
              <Link href="/learning-hub" className="text-gray-600 hover:text-gray-800 transition">Learning Hub</Link>
              <Link href="/interview-prep" className="text-gray-600 hover:text-gray-800 transition">Excel Interview Questions</Link>
              {/* <Link href="/learn/career-paths" className="text-gray-600 hover:text-gray-800 transition">Finance Career Paths</Link> */}
              <Link href="/interview-prep" className="text-gray-600 hover:text-gray-800 transition">Interview Questions</Link>
            </div>
          </div>

          {/* Back to Home - Black text */}
          <div className="text-center mt-6 pb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}