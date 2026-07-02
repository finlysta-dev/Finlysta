'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Briefcase, DollarSign, Building2, Share2, Heart, Linkedin, Twitter, MessageCircle, Mail, Link as LinkIcon, ChevronRight, Bell, Bookmark, ArrowUpRight, X, Hourglass, Send, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: string;
  workMode: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  experience?: string;
  duration?: string;
  salary?: string;
  skills: string[];
  overview?: string;
  shortDescription?: string;
  isNew: boolean;
  isVerified: boolean;
  isTrending: boolean;
  isActivelyHiring: boolean;
  postedAt: string;
  postedTime?: string;
  views: number;
  applyClicks: number;
  logoBg?: string;
  timeAgo?: string;
  description?: string;
  aboutCompany?: string;
  responsibilities?: string;
  qualifications?: string;
  benefits?: string;
  applyLink?: string;
}

interface JobDetailClientProps {
  opportunity: any;
  relatedJobs: any[];
}

// Helper functions
const getCompanyColor = (company: string) => {
  const colors = [
    'bg-black', 'bg-blue-900', 'bg-blue-600', 
    'bg-orange-500', 'bg-red-600', 'bg-green-600',
    'bg-purple-600', 'bg-teal-600', 'bg-pink-600',
    'bg-indigo-600', 'bg-rose-600', 'bg-amber-600'
  ];
  const index = company.length % colors.length;
  return colors[index];
};

const formatPostedTime = (date: string): string => {
  if (!date) return 'Recently';
  const postedDate = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - postedDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

// Format responsibilities into bullet points with proper punctuation
const formatResponsibilities = (text: string | undefined): string[] => {
  if (!text) return [];
  const sentences = text.split(/[.!?]\s*|\n/).filter(s => s.trim().length > 0);
  return sentences.map(s => s.trim() + '.');
};

// Format qualifications into bullet points with proper punctuation
const formatQualifications = (text: string | undefined): string[] => {
  if (!text) return [];
  const sentences = text.split(/[.!?]\s*|\n/).filter(s => s.trim().length > 0);
  return sentences.map(s => s.trim() + '.');
};

export default function JobDetailClient({ opportunity, relatedJobs = [] }: JobDetailClientProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved_blogs') || '[]');
    setSavedJobs(saved);
    // Check if current job is saved
    if (opportunity && saved.some((job: any) => job.id === opportunity.id)) {
      setIsSaved(true);
    }
  }, [opportunity]);

  const toggleSaveJob = () => {
    let updatedSavedJobs: any[];
    if (isSaved) {
      updatedSavedJobs = savedJobs.filter((job: any) => job.id !== opportunity.id);
      setIsSaved(false);
    } else {
      const jobToSave = {
        id: opportunity.id,
        slug: opportunity.slug,
        title: opportunity.title,
        company: opportunity.company,
        companyLogo: opportunity.companyLogo,
        location: opportunity.city && opportunity.country ? `${opportunity.city}, ${opportunity.country}` : opportunity.location || 'India',
        type: opportunity.type === 'job' ? 'Full-time' : 'Internship',
        experience: opportunity.experience || '0 - 1 Yrs',
        applyLink: opportunity.applyLink || '#',
      };
      updatedSavedJobs = [...savedJobs, jobToSave];
      setIsSaved(true);
    }
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('saved_blogs', JSON.stringify(updatedSavedJobs));
  };

  const removeSavedJob = (jobId: string) => {
    const updatedSavedJobs = savedJobs.filter((job: any) => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('saved_blogs', JSON.stringify(updatedSavedJobs));
    if (jobId === opportunity.id) {
      setIsSaved(false);
    }
  };

  const clearAllSavedJobs = () => {
    setSavedJobs([]);
    localStorage.setItem('saved_blogs', JSON.stringify([]));
    setIsSaved(false);
  };

  const shareJob = (platform: string) => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = `${opportunity?.title || 'Job'} at ${opportunity?.company || 'Company'}`;
    const text = `Check out this job: ${title}`;
    
    const shareUrls: { [key: string]: string } = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`,
      copy: '',
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      });
      return;
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=500');
    }
  };

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">Job not found</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-6 py-2 bg-[#0052FF] text-white rounded-lg hover:bg-[#0041CC] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setEmailStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xvzjrzao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setEmailStatus('success');
        setEmail('');
        setTimeout(() => setEmailStatus('idle'), 3000);
      } else {
        setEmailStatus('error');
        setTimeout(() => setEmailStatus('idle'), 3000);
      }
    } catch (error) {
      setEmailStatus('error');
      setTimeout(() => setEmailStatus('idle'), 3000);
    }
  };

  const job: Job = {
    id: opportunity.id,
    slug: opportunity.slug,
    title: opportunity.title || 'Financial Analyst',
    company: opportunity.company || 'Company',
    companyLogo: opportunity.companyLogo,
    type: opportunity.type === 'job' ? 'Full-time' : 'Internship',
    workMode: opportunity.workMode || 'On-site',
    location: opportunity.city && opportunity.country ? `${opportunity.city}, ${opportunity.country}` : opportunity.location || 'India',
    city: opportunity.city || opportunity.location?.split(',')[0]?.trim() || 'India',
    state: opportunity.state,
    country: opportunity.country || 'India',
    experience: opportunity.experience || '0 - 1 Yrs',
    duration: opportunity.duration,
    salary: opportunity.salary || 'Not Disclosed',
    skills: opportunity.skills || ['Excel', 'Financial Analysis', 'Reporting', 'PowerPoint'],
    overview: opportunity.overview || '',
    shortDescription: opportunity.shortDescription || opportunity.overview?.substring(0, 200) || 'No description available',
    isNew: opportunity.isNew || false,
    isVerified: opportunity.isVerified || false,
    isTrending: opportunity.isTrending || false,
    isActivelyHiring: opportunity.isActivelyHiring || true,
    postedAt: opportunity.postedAt || new Date().toISOString(),
    postedTime: opportunity.postedTime || formatPostedTime(opportunity.postedAt || new Date().toISOString()),
    views: opportunity.views || 0,
    applyClicks: opportunity.applyClicks || 0,
    logoBg: getCompanyColor(opportunity.company || ''),
    timeAgo: formatPostedTime(opportunity.postedAt || new Date().toISOString()),
    description: opportunity.shortDescription || opportunity.overview?.substring(0, 200) || 'No description available',
    aboutCompany: opportunity.aboutCompany || '',
    responsibilities: opportunity.responsibilities || '',
    qualifications: opportunity.qualifications || '',
    benefits: opportunity.benefits || '',
    applyLink: opportunity.applyLink || '#',
  };

  const responsibilitiesList = formatResponsibilities(job.responsibilities || '');
  const qualificationsList = formatQualifications(job.qualifications || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <img src="/Finlysta.png" alt="Finlysta" className="h-10 w-auto" />
              </div>
              <nav className="hidden md:flex gap-8">
                <a href="#" className="text-gray-900 font-bold hover:text-blue-600">Home</a>
                <a href="#" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">Jobs</a>
                <a href="#" className="text-gray-900 font-bold hover:text-blue-600">Internships</a>
                <a href="#" className="text-gray-900 font-bold hover:text-blue-600">Learning Hub</a>
                <a href="#" className="text-gray-900 font-bold hover:text-blue-600">Interview Prep</a>
                <a href="#" className="text-gray-900 font-bold hover:text-blue-600">Blogs</a>
                <a href="#" className="text-gray-900 font-bold hover:text-blue-600">Roadmap</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {/* Saved Jobs Button */}
              <button
                onClick={() => setShowSavedJobs(!showSavedJobs)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors relative"
              >
                <Bookmark className="w-5 h-5" />
                <span className="text-sm font-medium">Saved Jobs</span>
                {savedJobs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {savedJobs.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Saved Jobs Slide-in Panel */}
      {showSavedJobs && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setShowSavedJobs(false)}
          />
          
          {/* Panel - slides in from right */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-900">Saved Jobs</h3>
                <div className="flex items-center gap-3">
                  {savedJobs.length > 0 && (
                    <button
                      onClick={clearAllSavedJobs}
                      className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowSavedJobs(false)}
                    className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {savedJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Bookmark className="w-20 h-20 text-gray-300 mb-4" />
                    <p className="text-xl font-medium text-gray-700">No saved jobs yet</p>
                    <p className="text-gray-500 mt-2">Start saving jobs you're interested in!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedJobs.map((savedJob: any) => (
                      <div key={savedJob.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <Link 
                              href={`/jobs/${savedJob.slug}`}
                              onClick={() => setShowSavedJobs(false)}
                              className="font-semibold text-gray-900 hover:text-blue-600 text-base block truncate"
                            >
                              {savedJob.title}
                            </Link>
                            <p className="text-sm text-gray-600 truncate font-medium">{savedJob.company}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{savedJob.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <Briefcase className="w-4 h-4 flex-shrink-0" />
                              <span>{savedJob.type}</span>
                              <span className="text-gray-300">|</span>
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>{savedJob.experience}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeSavedJob(savedJob.id)}
                            className="text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mt-4 flex gap-3">
                          <Link 
                            href={`/jobs/${savedJob.slug}`}
                            onClick={() => setShowSavedJobs(false)}
                            className="flex-1 text-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded-lg transition"
                          >
                            View Details
                          </Link>
                          <a 
                            href={savedJob.applyLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 text-center text-sm bg-green-50 text-green-600 hover:bg-green-100 font-medium px-4 py-2 rounded-lg transition"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {savedJobs.length > 0 && (
                <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                  <p className="text-sm text-gray-500 text-center">
                    {savedJobs.length} job{savedJobs.length > 1 ? 's' : ''} saved
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/" className="text-blue-600 font-bold hover:underline text-sm">Home</a>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <a href="/jobs" className="text-blue-600 font-bold hover:underline text-sm">Jobs</a>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600 font-bold text-sm">{job.title}</span>
            </div>
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* MAIN JOB INFO BOX */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6 flex-1">
              <div className={`w-24 h-24 ${job.logoBg || 'bg-blue-600'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.company} className="w-16 h-16 object-contain" />
                ) : (
                  <span className="text-white font-bold text-3xl">{job.company?.substring(0, 2).toUpperCase() || 'CO'}</span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
                  {job.isNew && <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">New</span>}
                </div>
                
                <p className="text-blue-600 text-lg font-bold mb-4">{job.company}</p>

                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{job.experience}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 font-medium">Posted {job.timeAgo || 'Recently'} • {job.views || 0} views</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px] ml-6">
              <button
                onClick={toggleSaveJob}
                className={`w-full py-3 px-4 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 border-2 ${
                  isSaved
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save Job'}
              </button>
              <a href={job.applyLink || '#'} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-medium">
                <Hourglass className="w-4 h-4" />
                <span>Applications closing soon</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 my-6" />

          <div className="flex flex-wrap gap-2">
            {job.skills?.slice(0, 10).map((skill) => (
              <span key={skill} className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                Job Description
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                {job.overview || job.shortDescription || 'No description available'}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
              {responsibilitiesList.length > 0 ? (
                <ul className="space-y-3 text-gray-700 mb-8">
                  {responsibilitiesList.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-blue-600 font-bold text-2xl leading-none mt-0.5">•</span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold text-2xl leading-none mt-0.5">•</span>
                    <span className="text-base leading-relaxed">No specific responsibilities listed for this role.</span>
                  </li>
                </ul>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
              {qualificationsList.length > 0 ? (
                <ul className="space-y-3 text-gray-700 whitespace-normal">
                  {qualificationsList.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-blue-600 font-bold text-2xl leading-none mt-0.5">•</span>
                      <span className="text-base leading-relaxed break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold text-2xl leading-none mt-0.5">•</span>
                    <span className="text-base leading-relaxed">No specific qualifications listed for this role.</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Skills Required */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-600" />
                Skills Required
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill) => (
                  <span key={skill} className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full border border-blue-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-600" />
                About {job.company}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {job.aboutCompany || 'No company information available.'}
              </p>
              <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold">
                View Company Profile
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Overview */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Posted On</p>
                  <p className="text-gray-900 font-bold text-sm">{job.timeAgo || 'Recently'}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Job Type</p>
                  <p className="text-gray-900 font-bold text-sm">{job.type}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Experience</p>
                  <p className="text-gray-900 font-bold text-sm">{job.experience}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Location</p>
                  <p className="text-gray-900 font-bold text-sm">{job.location}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Salary</p>
                  <p className="text-green-600 font-bold text-sm">{job.salary || 'Not Disclosed'}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Work Mode</p>
                  <p className="text-gray-900 font-bold text-sm">{job.workMode}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Views</p>
                  <p className="text-gray-900 font-bold text-sm">{job.views || 0}</p>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Share this job</h3>
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => shareJob('linkedin')}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => shareJob('twitter')}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => shareJob('whatsapp')}
                  className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => shareJob('email')}
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Mail className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => shareJob('copy')}
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Similar Jobs */}
            {relatedJobs && relatedJobs.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Similar Jobs
                  </h3>
                  <a href="/jobs" className="text-blue-600 hover:text-blue-700 font-bold text-sm">View All</a>
                </div>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => {
                    const relatedLogoBg = getCompanyColor(relatedJob.company || '');
                    return (
                      <Link 
                        key={relatedJob.id} 
                        href={`/jobs/${relatedJob.slug}`}
                        className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:border-blue-400"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 ${relatedLogoBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            {relatedJob.companyLogo ? (
                              <img src={relatedJob.companyLogo} alt={relatedJob.company} className="w-8 h-8 object-contain" />
                            ) : (
                              <span className="text-white font-bold text-base">{relatedJob.company?.substring(0, 2).toUpperCase() || 'CO'}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-base hover:text-blue-600 transition-colors">{relatedJob.title}</h4>
                            <p className="text-blue-600 text-sm font-medium">{relatedJob.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-900 text-sm font-medium mt-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{relatedJob.city && relatedJob.country ? `${relatedJob.city}, ${relatedJob.country}` : relatedJob.location || 'India'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-900 text-sm font-medium mt-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{relatedJob.experience || '0 - 1 Yrs'}</span>
                        </div>
                        {relatedJob.skills && relatedJob.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {relatedJob.skills.slice(0, 3).map((skill: string) => (
                              <span key={skill} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <section style={{ background: 'linear-gradient(to right, #f0f8ff, #f3f0ff)', paddingTop: '40px', paddingBottom: '40px', borderTop: '1px solid #e5e7eb', borderRadius: '12px', marginTop: '32px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: '#0052FF', color: 'white', borderRadius: '12px' }}>
                  <Bell style={{ width: '26px', height: '26px' }} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '2px' }}>Don't miss new opportunities!</h3>
                <p style={{ color: '#000000', fontSize: '16px' }}>Get daily alerts for the latest entry-level finance jobs.</p>
              </div>
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', flexShrink: 0, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '240px',
                      paddingLeft: '14px',
                      paddingRight: '14px',
                      paddingTop: '9px',
                      paddingBottom: '9px',
                      background: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '17px',
                      color: '#000000',
                      outline: 'none',
                    }}
                  />
                  {emailStatus === 'success' && (
                    <p style={{ marginTop: '8px', fontSize: '16px', color: '#16a34a' }}>✓ Subscribed successfully!</p>
                  )}
                  {emailStatus === 'error' && (
                    <p style={{ marginTop: '8px', fontSize: '16px', color: '#dc2626' }}>✗ Failed to subscribe. Please try again.</p>
                  )}
                  {emailStatus === 'idle' && (
                    <p style={{ marginTop: '8px', fontSize: '16px', color: '#000000' }}>No spam. Unsubscribe anytime.</p>
                  )}
                  {emailStatus === 'sending' && (
                    <p style={{ marginTop: '8px', fontSize: '16px', color: '#666' }}>Sending...</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={emailStatus === 'sending'}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '10px 24px',
                    background: '#0052FF',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '15px',
                    border: 'none',
                    cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: emailStatus === 'sending' ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '44px',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    if (emailStatus !== 'sending') {
                      e.currentTarget.style.background = '#0041CC';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (emailStatus !== 'sending') {
                      e.currentTarget.style.background = '#0052FF';
                    }
                  }}
                >
                  <Send style={{ width: '16px', height: '16px' }} />
                  Get Job Alerts
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}