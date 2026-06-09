'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Linkedin, MessageCircle } from "lucide-react";
import Image from 'next/image';
import {
  PartyPopper, Briefcase, Clock3, BadgeCheck, MapPin, Shield,
  User, IndianRupee, Eye, Send, Users, Mail, Link2,
  ShieldCheck, ThumbsUp, UserRound, Laptop,
  HelpCircle, Check, Edit2, RefreshCw, X
} from 'lucide-react';

interface JobData {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  workMode?: string;
  experience: string;
  salary?: string;
  skills: string[];
  posterEmail?: string;
  posterName?: string;
  status?: string;
}

function JobPostedContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [usingMock, setUsingMock] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>('pending');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Show toast notification
  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved ✓',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: <Check className="w-5 h-5 text-green-600" />,
          heroBg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          badgeBg: 'bg-green-100 text-green-700',
          message: '✅ Your job has been approved and is now live! Candidates can now see and apply to your job posting.',
          buttonIcon: 'text-green-500'
        };
      case 'review':
        return {
          label: 'In Review 🔍',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: <Clock3 className="w-5 h-5 text-blue-600" />,
          heroBg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          badgeBg: 'bg-blue-100 text-blue-700',
          message: '🔍 Our team is currently reviewing your job posting. We will update you shortly.',
          buttonIcon: 'text-blue-500'
        };
      case 'pending':
        return {
          label: 'Pending Review ⏳',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: <Clock3 className="w-5 h-5 text-yellow-600" />,
          heroBg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
          badgeBg: 'bg-yellow-100 text-yellow-700',
          message: '⏳ Your job has been submitted and is pending review. Our team will review it within 5 minutes.',
          buttonIcon: 'text-yellow-500'
        };
      case 'waiting':
        return {
          label: 'Waiting Queue 📋',
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          icon: <Clock3 className="w-5 h-5 text-orange-600" />,
          heroBg: 'bg-gradient-to-r from-orange-50 to-amber-50',
          badgeBg: 'bg-orange-100 text-orange-700',
          message: '📋 Your job is in the waiting queue. Our team needs more time to review your posting.',
          buttonIcon: 'text-orange-500'
        };
      case 'cancelled':
        return {
          label: 'Cancelled ❌',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: <ShieldCheck className="w-5 h-5 text-red-600" />,
          heroBg: 'bg-gradient-to-r from-red-50 to-rose-50',
          badgeBg: 'bg-red-100 text-red-700',
          message: '❌ Your job posting has been cancelled. Please contact support for more information.',
          buttonIcon: 'text-red-500'
        };
      case 'failure':
        return {
          label: 'Failed ⚠️',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: <ShieldCheck className="w-5 h-5 text-red-600" />,
          heroBg: 'bg-gradient-to-r from-red-50 to-rose-50',
          badgeBg: 'bg-red-100 text-red-700',
          message: '⚠️ Something went wrong with your job posting. Please contact support for assistance.',
          buttonIcon: 'text-red-500'
        };
      default:
        return {
          label: 'Pending Review',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: <Clock3 className="w-5 h-5 text-yellow-600" />,
          heroBg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
          badgeBg: 'bg-yellow-100 text-yellow-700',
          message: 'Your job has been submitted and is pending review.',
          buttonIcon: 'text-yellow-500'
        };
    }
  };

  const fetchJobStatus = useCallback(async () => {
    if (!token) return;
    
    try {
      console.log('🔄 Fetching job status for token:', token);
      const response = await fetch(`/api/job-posted?token=${token}&_=${Date.now()}`);
      const data = await response.json();
      
      console.log('📦 API Response:', data);
      
      if (data.success && data.job) {
        const newStatus = data.job.status || 'pending';
        const oldStatus = currentStatus;
        
        console.log(`📊 Status: Old=${oldStatus}, New=${newStatus}`);
        
        // Only show toast if status actually changed and not initial load
        if (oldStatus !== 'pending' && oldStatus !== newStatus && oldStatus !== '') {
          const statusConfig = getStatusConfig(newStatus);
          showToast(`Status updated to: ${statusConfig.label}`, 'info');
        }
        
        setJobData(data.job);
        setCurrentStatus(newStatus);
        setUsingMock(false);
        // Save to localStorage as backup
        localStorage.setItem('lastPostedJob', JSON.stringify(data.job));
        localStorage.setItem('lastPostedJobId', data.job.id);
      } else {
        console.error('API returned error:', data.error);
        
        // Try to get from localStorage as fallback
        const savedJobId = localStorage.getItem('lastPostedJobId');
        const savedJob = localStorage.getItem('lastPostedJob');
        
        if (savedJobId === token && savedJob) {
          const parsedJob = JSON.parse(savedJob);
          setJobData(parsedJob);
          setCurrentStatus(parsedJob.status || 'pending');
          setUsingMock(true);
          console.log('Using cached job data from localStorage');
          showToast('Using cached data - API temporarily unavailable', 'warning');
        } else {
          setError(data.error || 'Failed to fetch job status');
        }
      }
    } catch (error) {
      console.error('Error fetching job status:', error);
      
      // Fallback to localStorage
      const savedJobId = localStorage.getItem('lastPostedJobId');
      const savedJob = localStorage.getItem('lastPostedJob');
      if (savedJobId === token && savedJob) {
        const parsedJob = JSON.parse(savedJob);
        setJobData(parsedJob);
        setCurrentStatus(parsedJob.status || 'pending');
        setUsingMock(true);
        showToast('Using cached data - Network issue detected', 'warning');
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  }, [token, currentStatus]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    showToast('Refreshing job status...', 'info');
    await fetchJobStatus();
    setIsRefreshing(false);
  };

  // Initial fetch
  useEffect(() => {
    if (!token) {
      setError('No token provided. Please use the link from your email.');
      setLoading(false);
      return;
    }

    console.log('🚀 Initial fetch for token:', token);
    fetchJobStatus().finally(() => setLoading(false));
  }, [token, fetchJobStatus]);

  // Auto-poll every 3 seconds for status changes
  useEffect(() => {
    if (!token || loading) return;
    
    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    console.log('⏰ Starting polling every 3 seconds');
    
    // Start polling every 3 seconds
    pollingIntervalRef.current = setInterval(() => {
      fetchJobStatus();
    }, 3000);
    
    return () => {
      console.log('🛑 Stopping polling');
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [token, loading, fetchJobStatus]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this job opportunity: ${window.location.href}`)}`, '_blank');
  };

  const shareOnEmail = () => {
    window.location.href = `mailto:?subject=Job Opportunity&body=${encodeURIComponent(`Check out this job opportunity: ${window.location.href}`)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your job posting...</p>
        </div>
      </div>
    );
  }

  if (error && !jobData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="text-blue-600 hover:underline">← Return to Homepage</Link>
        </div>
      </div>
    );
  }

  const displayData = jobData || {
    id: token || 'JOB-001',
    title: 'Financial Analyst',
    company: 'Demo Company',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: 'Fresher',
    salary: '₹4-6 LPA',
    skills: ['Excel', 'Financial Analysis', 'Accounting'],
    posterEmail: 'demo@example.com',
    status: 'pending',
  };

  const statusConfig = getStatusConfig(currentStatus);
  const isApproved = currentStatus === 'approved';

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "Inter, -apple-system, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/Finlysta.png"
                alt="Finlysta Logo"
                width={140}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-600">
              <span className="text-sm font-semibold text-blue-600">For Employers</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#2563EB]" />
            <span className="text-base font-medium text-[#081B4B]">100% Free • No Signup Required</span>
          </div>
        </div>
      </header>

      {/* Toast Notification - Moved higher, right below header */}
      {toastMessage && (
        <div className="fixed top-[72px] right-6 z-50 animate-slide-in">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
            toastMessage.type === 'success' ? 'bg-green-600' :
            toastMessage.type === 'warning' ? 'bg-orange-600' :
            'bg-gray-900'
          } text-white min-w-[280px] max-w-md`}>
            <span className="flex-1 text-sm">{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="hover:opacity-80">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Manual Refresh Button and Live Status Indicator */}
        <div className="flex justify-between items-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700 font-medium">Live updates active (every 3 seconds)</span>
          </div>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Now
          </button>
        </div>

        {usingMock && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-center">
            <p className="text-yellow-700 text-sm">
              ⚠️ Preview Mode - Your job is being reviewed. This is a preview of how your success page will look.
            </p>
          </div>
        )}

        {/* Section 1: Success Hero with Status-based styling */}
        <div className={`rounded-3xl p-8 mb-8 ${statusConfig.heroBg}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${statusConfig.badgeBg}`}>
                <PartyPopper className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {isApproved ? 'Job Live!' : 'Job Status'}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                  isApproved ? 'bg-green-500' : 
                  currentStatus === 'review' ? 'bg-blue-500' :
                  currentStatus === 'waiting' ? 'bg-orange-500' :
                  currentStatus === 'cancelled' || currentStatus === 'failure' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}>
                  {isApproved ? (
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  ) : (
                    <Clock3 className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#081B4B]">
                    {isApproved ? 'Your Job Has Been Approved!' : 
                     currentStatus === 'review' ? 'Your Job Is Being Reviewed' :
                     currentStatus === 'waiting' ? 'Job in Waiting Queue' :
                     currentStatus === 'cancelled' ? 'Job Cancelled' :
                     currentStatus === 'failure' ? 'Action Required' :
                     'Your Job Has Been Submitted!'}
                  </h1>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {statusConfig.message}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Job ID</p>
                    <p className="font-semibold text-gray-900 font-mono text-sm">{displayData.id}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig.bgColor}`}>
                    {statusConfig.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className={`font-semibold ${statusConfig.color}`}>
                      {statusConfig.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[280px]">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="flex justify-center gap-4 mb-4">
                  <BadgeCheck className={`w-12 h-12 ${statusConfig.buttonIcon}`} />
                  <Send className={`w-12 h-12 ${statusConfig.buttonIcon}`} />
                  <Users className={`w-12 h-12 ${statusConfig.buttonIcon}`} />
                </div>
                <p className="text-gray-600 text-sm">
                  {isApproved ? 'Your job is now live!' : 'Status updates every 3 seconds'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Job Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Job Summary</h2>
            <button 
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit Job
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 overflow-hidden">
              {displayData.companyLogo && displayData.companyLogo.trim() !== '' ? (
                <img
                  src={displayData.companyLogo}
                  alt={displayData.company}
                  width={80}
                  height={80}
                  className="rounded-2xl object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-3xl font-bold text-white">${displayData.company.charAt(0).toUpperCase()}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-3xl font-bold text-white">{displayData.company.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{displayData.title}</h3>
              <p className="text-gray-600 mb-4">{displayData.company}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{displayData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{displayData.type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{displayData.experience}</span>
                </div>
                {displayData.salary && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-sm">{displayData.salary}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {displayData.skills && displayData.skills.slice(0, 6).map((skill, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end justify-start">
              <Link 
                href={`/jobs/${displayData.id}`} 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <Eye className="w-5 h-5" />
                View Job Details
              </Link>
            </div>
          </div>
        </div>

        {/* Section 3: What Happens Next */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-left mb-8">What Happens Next?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-gray-900 mb-2">Submit Job</p>
                <p className="text-sm text-gray-500">You have successfully submitted your job posting.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-gray-900 mb-2">Team Review</p>
                <p className="text-sm text-gray-500">Our team reviews your job posting for quality and compliance.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-gray-900 mb-2">Job Goes Live</p>
                <p className="text-sm text-gray-500">Once approved, your job is published on Finlysta.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-gray-900 mb-2">Receive Applications</p>
                <p className="text-sm text-gray-500">Candidates apply and you get notified via email.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Share Your Opportunity */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Share this Opportunity</h2>
              <p className="text-gray-600 mb-6">Get more visibility by sharing your job with your network!</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={copyToClipboard} 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Link2 className="w-4 h-4 text-white" />
                Copy Link
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-lg hover:bg-[#004182] transition-colors font-medium"
              >
                <Linkedin className="w-5 h-5 text-black" />
                LinkedIn
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] text-black px-6 py-3 rounded-lg hover:bg-[#128C7E] transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5 text-black" />
                WhatsApp
              </button>
              <button 
                onClick={shareOnEmail}
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-white" />
                Email
              </button>
            </div>
            
            <div className="flex items-center border rounded-lg overflow-hidden mt-4">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? window.location.href : ''} 
                className="flex-1 px-4 py-3 bg-gray-50 text-sm outline-none text-gray-600"
              />
              <button 
                onClick={copyToClipboard} 
                className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Email Notification */}
        <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-medium">Applications will be sent directly to</p>
              <p className="text-green-700 font-mono text-sm break-all">{displayData.posterEmail || 'your registered email'}</p>
            </div>
          </div>
        </div>

        {/* Section 6: Help Section */}
        <div className="bg-blue-50 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Need Help?</h3>
                <p className="text-gray-600">Have questions about your job posting?</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <a 
                href="mailto:support@finlysta.com" 
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                <Mail className="w-5 h-5" />
                support@finlysta.com
              </a>
              <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Section 7: CTA Banner */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Hiring for another role?</h3>
              <p className="text-gray-600">Post another job in less than 2 minutes.</p>
            </div>
            <Link 
              href="/employers/post-job" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              Post Another Job for Free
            </Link>
          </div>
        </div>

        {/* Section 8: Bottom Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BadgeCheck className="w-5 h-5 text-green-600" />
            </div>
            <p className="font-semibold text-sm text-gray-900">100% Free</p>
            <p className="text-xs text-gray-500">During Launch Phase</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <UserRound className="w-5 h-5 text-blue-600" />
            </div>
            <p className="font-semibold text-sm text-gray-900">No Signup Required</p>
            <p className="text-xs text-gray-500">Post instantly</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="font-semibold text-sm text-gray-900">Finance-Focused Audience</p>
            <p className="text-xs text-gray-500">Targeted reach</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock3 className="w-5 h-5 text-orange-600" />
            </div>
            <p className="font-semibold text-sm text-gray-900">Reviewed Within 5 Minutes</p>
            <p className="text-xs text-gray-500">Quick turnaround</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
            </div>
            <p className="font-semibold text-sm text-gray-900">Secure & Private</p>
            <p className="text-xs text-gray-500">Your job, your visibility</p>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Edit Job</h3>
              <p className="text-gray-600 mb-4">To edit your job posting, please contact support.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
                <a
                  href="mailto:support@finlysta.com"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}

export default function JobPostedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <JobPostedContent />
    </Suspense>
  );
}