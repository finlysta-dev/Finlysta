'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Clock, Building2, Calendar,
  CheckCircle, Bookmark, Share2, Briefcase, Zap,
  TrendingUp, ExternalLink, Award, DollarSign, GraduationCap
} from 'lucide-react';

interface Opportunity {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  aboutCompany?: string;
  type: 'job' | 'internship';
  workMode: 'remote' | 'hybrid' | 'onsite';
  location: string;
  experience?: string;
  duration?: string;
  salary?: string;
  skills: string[];
  overview?: string;
  responsibilities?: string;
  qualifications?: string;
  benefits?: string;
  applyLink: string;
  isNew: boolean;
  isVerified: boolean;
  isTrending: boolean;
  isActivelyHiring: boolean;
  postedAt: string;
  deadline?: string;
  views: number;
  applyClicks: number;
}

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;
  
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [viewTracked, setViewTracked] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [relatedLogosError, setRelatedLogosError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (id) {
      fetchOpportunity();
    }
  }, [id]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('saved_opportunities') || '[]');
    setSaved(savedItems.includes(id));
  }, [id]);

  useEffect(() => {
    if (opportunity && id && !viewTracked) {
      trackView();
    }
  }, [opportunity, id, viewTracked]);

  const trackView = async () => {
    try {
      let sessionId = localStorage.getItem('visitor_session_id');
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_session_id', sessionId);
      }

      await fetch('/api/analytics/opportunity-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          slug: opportunity?.slug,
          sessionId 
        })
      });
      setViewTracked(true);
      if (opportunity) {
        setOpportunity({
          ...opportunity,
          views: (opportunity.views || 0) + 1
        });
      }
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  const fetchOpportunity = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/opportunities');
      
      if (!response.ok) {
        throw new Error('Failed to fetch opportunities');
      }
      
      const opportunities = await response.json();
      setAllOpportunities(opportunities);
      
      const found = opportunities.find((opp: any) => opp.id === id);
      
      if (found) {
        setOpportunity(found);
        setLogoError(false);
      } else {
        setError('Opportunity not found');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load opportunity');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem('saved_opportunities') || '[]');
    if (!saved) {
      savedItems.push(id);
      localStorage.setItem('saved_opportunities', JSON.stringify(savedItems));
      setSaved(true);
    } else {
      const filtered = savedItems.filter((item: string) => item !== id);
      localStorage.setItem('saved_opportunities', JSON.stringify(filtered));
      setSaved(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleApply = async () => {
    try {
      let sessionId = localStorage.getItem('visitor_session_id');
      if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_session_id', sessionId);
      }
      
      // Track the click using the analytics API
      await fetch('/api/analytics/opportunity-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          opportunityId: opportunity?.id,
          sessionId 
        })
      });
      
      // Update local state
      if (opportunity) {
        setOpportunity({
          ...opportunity,
          applyClicks: (opportunity.applyClicks || 0) + 1
        });
      }
      
      // Open the apply link in a new tab
      if (opportunity?.applyLink) {
        window.open(opportunity.applyLink, '_blank');
      }
    } catch (error) {
      console.error('Failed to track click:', error);
      // Still open the link even if tracking fails
      if (opportunity?.applyLink) {
        window.open(opportunity.applyLink, '_blank');
      }
    }
  };

  const formatDate = (date: string) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTimeAgo = (date: string) => {
    const posted = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays === 2) return '2 days ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const formatStipend = (salary: string): string | null => {
    if (!salary) return null;
    
    if (salary.includes('₹') && !salary.includes('/month')) {
      return salary;
    }
    
    const rangeMatch = salary.match(/(\d+)\s*-\s*(\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1]);
      const max = parseInt(rangeMatch[2]);
      if (min >= 1000 && max >= 1000) {
        return `₹${min/1000}k - ${max/1000}k`;
      }
      return `₹${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    
    const singleMatch = salary.match(/(\d+)/);
    if (singleMatch) {
      const amount = parseInt(singleMatch[1]);
      if (amount >= 1000) {
        return `₹${amount/1000}k`;
      }
      return `₹${amount.toLocaleString()}`;
    }
    
    if (salary.includes('/month')) {
      const cleanSalary = salary.replace('/month', '');
      return formatStipend(cleanSalary);
    }
    
    return salary;
  };

  const getLocationDisplay = () => {
    if (!opportunity) return '';
    const location = opportunity.location;
    const workMode = opportunity.workMode;
    if (workMode === 'remote') return 'Remote';
    if (workMode === 'hybrid') return `${location} (Hybrid)`;
    return `${location} (On-site)`;
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

  const handleRelatedLogoError = (id: string) => {
    setRelatedLogosError(prev => ({ ...prev, [id]: true }));
  };

  const formatPoints = (text: string) => {
    if (!text) return [];
    const points = text.split(/\.\s+/).filter(p => p.trim().length > 0);
    return points.map(point => point.trim());
  };

  const getRelatedOpportunities = () => {
    if (!allOpportunities.length || !opportunity) return [];
    return allOpportunities
      .filter(opp => opp.type === opportunity.type && opp.id !== opportunity.id)
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Opportunity Not Found</h1>
          <p className="text-gray-600 mb-6">
            The {type === 'jobs' ? 'job' : 'internship'} you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const relatedOpportunities = getRelatedOpportunities();
  const responsibilitiesPoints = formatPoints(opportunity.responsibilities || '');
  const qualificationsPoints = formatPoints(opportunity.qualifications || '');
  const benefitsPoints = formatPoints(opportunity.benefits || '');

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
              >
                <Bookmark size={18} className={saved ? 'text-blue-600 fill-blue-600' : 'text-gray-500'} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Share2 size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Hero Section with Company Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-12 mb-4">
              {/* Company Logo */}
              <div className="w-24 h-24 rounded-xl bg-white border-4 border-white shadow-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                {!logoError && opportunity.companyLogo ? (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <img
                      src={opportunity.companyLogo}
                      alt={opportunity.company}
                      className="max-w-full max-h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  </div>
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
          {/* Main Content - Left Column */}
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
                  <Clock size={16} className="text-blue-500" />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Duration / Type</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {opportunity.duration || opportunity.experience || 'Full Time'}
                </p>
              </div>
              
              {opportunity.salary && (
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign size={16} className="text-green-500" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {opportunity.type === 'job' ? 'Salary' : 'Stipend'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-green-600">
                    {opportunity.type === 'job' ? opportunity.salary : formatStipend(opportunity.salary)}
                  </p>
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

            {/* Overview */}
            {opportunity.overview && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Role Overview</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {opportunity.overview}
                </p>
              </div>
            )}

            {/* Skills */}
            {opportunity.skills && opportunity.skills.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
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
                  <h2 className="text-lg font-bold text-gray-900">Qualifications</h2>
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

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Apply Card */}
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
                
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400">Application deadline: {opportunity.deadline ? formatDate(opportunity.deadline) : 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Opportunities Section */}
        {relatedOpportunities.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={20} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Similar {opportunity.type === 'job' ? 'Jobs' : 'Internships'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedOpportunities.map((related) => {
                const hasLogoError = relatedLogosError[related.id];
                return (
                  <Link
                    key={related.id}
                    href={`/opportunities/${related.type === 'job' ? 'jobs' : 'internships'}/${related.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-200 hover:shadow-md transition-all h-full">
                      <div className="flex items-start gap-3">
                        {/* Related Company Logo */}
                        <div className="flex-shrink-0">
                          {!hasLogoError && related.companyLogo ? (
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5">
                              <img
                                src={related.companyLogo}
                                alt={related.company}
                                className="max-w-full max-h-full object-contain"
                                onError={() => handleRelatedLogoError(related.id)}
                              />
                            </div>
                          ) : (
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCompanyColor(related.company)} flex items-center justify-center text-white font-bold text-xs`}>
                              {getCompanyInitials(related.company)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1">
                            {related.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">{related.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <MapPin size={10} className="text-gray-400" />
                              <span className="text-xs text-gray-500 truncate">{related.location.split(',')[0]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}