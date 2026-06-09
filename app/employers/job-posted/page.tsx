'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PartyPopper, Briefcase, Clock3, BadgeCheck, CheckCircle2, MapPin,
  User, IndianRupee, Eye, FileSearch, Send, Users, Mail, Link2, Copy,
  MessageCircle, TrendingUp, Heart, ShieldCheck, ThumbsUp, UserRound, Laptop, Megaphone,
  Building2,
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
}

function JobPostedContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('No token provided. Please use the link from your email.');
      setLoading(false);
      return;
    }

    fetch(`/api/job-posted?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.job) {
          setJobData(data.job);
          setUsingMock(false);
          localStorage.setItem('lastPostedJob', JSON.stringify(data.job));
        } else {
          const savedJob = localStorage.getItem('lastPostedJob');
          if (savedJob) {
            setJobData(JSON.parse(savedJob));
            setUsingMock(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        const savedJob = localStorage.getItem('lastPostedJob');
        if (savedJob) {
          setJobData(JSON.parse(savedJob));
          setUsingMock(true);
        }
        setLoading(false);
      });
  }, [token]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your job posting...</p>
      </div>
    );
  }

  if (error && !jobData) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <ShieldCheck className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/" className="text-blue-600 hover:underline">← Return to Homepage</Link>
      </div>
    );
  }

  const displayData = jobData || {
    id: 'JOB-001',
    title: 'Financial Analyst',
    company: 'Demo Company',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: 'Fresher',
    salary: '₹4-6 LPA',
    skills: ['Excel', 'Financial Analysis', 'Accounting'],
    posterEmail: 'demo@example.com',
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {usingMock && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-center">
          <p className="text-yellow-700 text-sm">
            ⚠️ Preview Mode - Your job is being reviewed. This is a preview of how your success page will look.
          </p>
        </div>
      )}

      {/* Section 1: Success Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
              <PartyPopper className="w-5 h-5" />
              <span className="text-sm font-medium">Success!</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#081B4B] mb-4">🎉 Your Job Has Been Submitted Successfully!</h1>
            <p className="text-gray-600 mb-6">Thank you for posting on <span className="font-semibold">Finlysta</span>. Our team will review your job and publish it within <strong>24 hours</strong>.</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Job ID</p>
                  <p className="font-semibold text-gray-900">{displayData.id}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock3 className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-semibold text-orange-600">Under Review</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[450px]">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-center gap-4 mb-4">
                <BadgeCheck className="w-12 h-12 text-green-500" />
                <CheckCircle2 className="w-12 h-12 text-blue-500" />
                <Send className="w-12 h-12 text-indigo-500" />
              </div>
              <p className="text-center text-gray-600 text-sm">Your job is now in our review queue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Job Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Company Logo - Now Visible */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {displayData.companyLogo ? (
              <Image 
                src={displayData.companyLogo} 
                alt={displayData.company} 
                width={80} 
                height={80} 
                className="rounded-2xl object-cover w-full h-full"
              />
            ) : (
              <span className="text-3xl font-bold">{displayData.company.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayData.title}</h2>
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
        <h2 className="text-2xl font-bold text-center mb-8">What Happens Next?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: FileSearch, label: 'We Review', step: 1 },
            { icon: Send, label: 'We Publish', step: 2 },
            { icon: Users, label: 'Students Apply', step: 3 },
            { icon: Mail, label: 'Applications in Your Email', step: 4 },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500">Step {item.step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Share Your Opportunity */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Opportunity</h2>
            <p className="text-gray-600 mb-6">Spread the word and reach more candidates faster!</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <button 
                onClick={copyToClipboard} 
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Link2 className="w-4 h-4" />
                Copy Link
              </button>
              <button className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-lg hover:bg-[#004182] transition-colors">
                <MessageCircle className="w-4 h-4" />
                LinkedIn
              </button>
              <button className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#128C7E] transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? window.location.href : ''} 
                className="flex-1 px-4 py-2 bg-gray-50 text-sm outline-none text-gray-600"
              />
              <button 
                onClick={copyToClipboard} 
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="lg:w-48 flex justify-center items-center gap-3">
            <Megaphone className="w-8 h-8 text-blue-400" />
            <Users className="w-8 h-8 text-indigo-400" />
            <Heart className="w-8 h-8 text-red-400" />
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Section 5: Email Notification */}
      <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-medium">Applications will be sent directly to</p>
              <p className="text-green-700 font-mono text-sm break-all">{displayData.posterEmail || 'your registered email'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Mail className="w-8 h-8 text-green-400" />
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Section 6: CTA Banner */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <UserRound className="w-10 h-10 text-blue-400" />
            <Laptop className="w-10 h-10 text-indigo-400" />
            <ThumbsUp className="w-10 h-10 text-green-400" />
          </div>
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

      {/* Section 7: Bottom Trust Bar */}
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
          <p className="font-semibold text-sm text-gray-900">Reviewed Within 24 Hours</p>
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
    </main>
  );
}

export default function JobPostedPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <JobPostedContent />
    </Suspense>
  );
}