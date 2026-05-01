"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search, MapPin, ChevronRight, TrendingUp, Shield, Clock,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram, GraduationCap,
  Twitter, Mail, ArrowRight, BookOpen, DollarSign, PieChart,
  Activity, CheckCircle, ChevronDown, Rocket, Briefcase, Sparkles,
  Target, Award, Users
} from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import TrendingInternships from "@/components/TrendingOpportunities";
import FinanceTopics from "@/components/FinanceTopics";
import Newsletter from "@/components/Newsletter";

// FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: "How is Finlysta different from traditional job portals?", 
      a: "Unlike traditional portals where you're left to scroll endlessly, Finlysta helps you find verified finance internships and jobs quickly. Every listing is manually reviewed — no ghost jobs, no spam."
    },
    { 
      q: "Who can use Finlysta?", 
      a: "Finlysta is designed for finance students, graduates, and professionals looking for internships and full-time positions in financial analysis, investment banking, equity research, accounting, and related fields."
    },
    { 
      q: "Will Finlysta share my personal information?", 
      a: "No, we never share your personal information without your consent. Your data is only used to match you with relevant job opportunities and improve your experience on our platform."
    },
    { 
      q: "How are internships verified?", 
      a: "Every listing is manually reviewed — company confirmed, role checked, links tested. We ensure only genuine opportunities reach you."
    },
    { 
      q: "Is Finlysta free to use?", 
      a: "Yes — and it always will be. Finlysta is 100% free for students and job seekers. Companies pay to post — you apply for free."
    }
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">FAQ</h2>
        <p className="text-slate-500 text-sm mt-2">Everything you need to know about Finlysta</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="border border-gray-200 transition-all duration-300 ease-in-out bg-white rounded-lg hover:shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="flex justify-between items-center w-full py-3 px-5 text-left"
            >
              <span className="text-sm sm:text-base font-medium text-gray-800 pr-4">
                {faq.q}
              </span>
              <span className={`transform transition-transform duration-300 ease-in-out flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}>
                <ChevronDown size={18} className="text-gray-500" />
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out px-5 ${
                openIndex === idx ? 'max-h-32 opacity-100 pb-3' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-sm text-gray-600">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Try for Free Section Component
const TryForFree = () => {
  return (
    <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Skip the clutter.
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-10">
         Get your first finance job or internship faster.
        </p>
        
        <div className="flex justify-center">
          <Link href="/jobs">
            <button 
              className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                color: "#0A2540",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
              }}
            >
              Start Exploring Jobs →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// SEO Schema Component
const SEOSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Finlysta",
          "url": "https://finlysta.com",
          "description": "Find entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://finlysta.com/internships?search={search_term}"
            },
            "query-input": "required name=search_term"
          }
        })
      }}
    />
  );
};

// Main Page Content Component
export default function HomePageContent() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const popularRoles = [
    { name: "Financial Analyst", icon: "📊" },
    { name: "Junior Financial Analyst", icon: "📈" },
    { name: "FP&A Analyst", icon: "💰" },
    { name: "Financial Reporting Analyst", icon: "📋" },
    { name: "Financial Data Analyst", icon: "📉" }
  ];

  useEffect(() => {
    setIsMounted(true);
    
    const jobSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": []
    };
    
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(jobSchema);
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleFindJobs = () => {
    router.push(`/jobs`);
  };

  const handleBrowseInternships = () => {
    router.push(`/internships`);
  };

  if (!isMounted) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A2540] border-t-[#FFD700] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0A2540] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <SEOSchema />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-16 md:py-24 overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Centered Content */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-6">
                <Target size={14} className="text-[#FFD700]" />
                <span className="text-xs font-semibold text-[#0A2540]">India's Only Job Board for Entry-Level Financial Analysts</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#0A2540] mb-4 leading-tight">
                Find Entry-Level Financial Analyst Jobs & Internships
                <span className="block bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"></span>
              </h2>
              
              <div className="max-w-2xl mx-auto space-y-4 mb-8">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  🎯 <span className="font-semibold text-[#0A2540]"></span>Match your skills — From Excel & SQL to Financial Modeling — to real opportunities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button
                  onClick={handleFindJobs}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#e6c200] hover:to-[#e69500] text-[#0A2540] font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base group min-w-[200px]"
                >
                  <Briefcase size={20} />
                  <span>Find My First Job</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={handleBrowseInternships}
                  className="px-8 py-4 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 text-base min-w-[200px]"
                  style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                    color: "#0A2540",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <GraduationCap size={20} />
                  <span>Explore Internships</span>
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-sm text-slate-500 mb-3">🔥 Explore Roles:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularRoles.map((role, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        router.push(`/jobs?search=${encodeURIComponent(role.name)}`);
                      }}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-slate-600 hover:border-[#FFD700] hover:text-black transition-all duration-300 flex items-center gap-1 whitespace-nowrap"
                    >
                      <span className="text-base">{role.icon}</span>
                      <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING OPPORTUNITIES SECTION */}
        <TrendingInternships />

        {/* CAREER PATH - Roadmap Image Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-3">
                <TrendingUp size={14} className="text-[#FFD700]" />
                <span className="text-xs font-semibold text-[#0A2540]">Career Path</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A2540] mb-3">
                How to Become a Financial Analyst <span className="text-[#FFD700]">(Step-by-Step)</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
                From learning basics to landing your first job — follow a clear roadmap.
              </p>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white p-4">
              <div className="relative w-full">
                <Image
                  src="/roadmap.png"
                  alt="How to Become a Financial Analyst - Step by step career roadmap"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg"
                  priority
                  unoptimized
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-slate-500">
                🎯 From mastering fundamentals to getting hired — your complete career roadmap
              </p>
            </div>
          </div>
        </section>

        {/* LEARNING SECTION - FinanceTopics */}
        <FinanceTopics />

        {/* SEO CONTENT SECTION - UPDATED */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
                Entry Level Financial Analyst Jobs & Internships in India
              </h1>
              
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-[#0A2540]">Finlysta</strong> is India's dedicated job board for 
                  <strong> entry level financial analyst jobs and internships</strong>. Whether you're a fresh graduate 
                  or a finance student looking for your first break, we connect you with verified opportunities at 
                  top companies across the country.
                </p>
                
                <p>
                  Unlike traditional job portals filled with senior-level positions, Finlysta focuses exclusively on 
                  <strong> fresher-friendly roles</strong>. Every listing is manually verified by our team — no spam, 
                  no ghost jobs, just real opportunities for aspiring financial analysts.
                </p>
                
                <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
                  Why Choose Finlysta for Your Finance Career?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[#0A2540]">100% Free for Job Seekers</h3>
                      <p className="text-sm text-gray-500">No hidden charges. Ever.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Shield size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[#0A2540]">Manually Verified Listings</h3>
                      <p className="text-sm text-gray-500">Every job is checked before listing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Target size={18} className="text-[#FFD700] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[#0A2540]">Only Entry-Level Roles</h3>
                      <p className="text-sm text-gray-500">No senior positions. Just fresher jobs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[#0A2540]">Updated Daily</h3>
                      <p className="text-sm text-gray-500">Fresh opportunities every day.</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
                  Top Locations for Finance Jobs in India
                </h2>
                
                <p>
                  We feature entry-level financial analyst opportunities across major financial hubs including
                  <strong> Mumbai, Bangalore, Delhi NCR, Pune, Hyderabad, Chennai, Kolkata, and Ahmedabad</strong>.
                  We also list remote and hybrid roles for candidates seeking work-from-home flexibility.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl mt-8">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-3">Quick Links</h3>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/jobs" className="text-blue-600 hover:underline text-sm">Browse All Jobs</Link>
                    <Link href="/internships" className="text-blue-600 hover:underline text-sm">Browse Internships</Link>
                    <Link href="/blogs" className="text-blue-600 hover:underline text-sm">Career Blogs</Link>
                    <Link href="/learn" className="text-blue-600 hover:underline text-sm">Learning Hub</Link>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mt-6 text-center">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <Newsletter />

        {/* FAQ SECTION */}
        <FAQ />

        {/* TRY FOR FREE SECTION */}
        <TryForFree />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-10 pb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="col-span-2 lg:col-span-4 space-y-3">
              <Link href="/" className="flex items-center" aria-label="Finlysta Home">
                <Image 
                  src="/Finlysta.png" 
                  alt="Finlysta Logo - Financial Analyst Job Board"
                  width={180} 
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs">Finlysta is a job board built exclusively for entry-level financial analyst roles and internships.</p>
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Follow us on</p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/finlysta/ " 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Finlysta on LinkedIn" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-black rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">For Job Seekers</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/jobs" className="hover:text-[#0A2540] transition-colors">All Jobs</Link></li>
                <li><Link href="/internships" className="hover:text-[#0A2540] transition-colors">All Internships</Link></li>
                <li><Link href="/jobs/remote" className="hover:text-[#0A2540] transition-colors">Remote Jobs</Link></li>
              <li><Link href="/blogs" className="hover:text-[#0A2540] transition-colors">Career Blogs</Link></li>
              <li><Link href="/learn" className="hover:text-[#0A2540] transition-colors">Learning Hub</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/about" className="hover:text-[#0A2540] transition-colors">About Us</Link></li>
                <li><Link href="/mission" className="hover:text-[#0A2540] transition-colors">Our Mission</Link></li>
                <li><Link href="/contact" className="hover:text-[#0A2540] transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-[#0A2540] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#0A2540] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Get in Touch</h4>
              <a href="mailto:support@finlysta.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0A2540] transition-colors">
                <Mail size={13} /> support@finlysta.com
              </a>
              <p className="text-xs text-slate-400 mt-3">Have a question? We’re here to help — expect a reply within 24 hours.</p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-5 pb-6">
            <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-500 text-center">
              <span>© {new Date().getFullYear()} Finlysta Pvt. Ltd. · All rights reserved.</span>
              <div className="flex items-center gap-1.5">
                <span>Made with</span>
                <Heart size={10} className="text-red-500 fill-red-500" />
                <span>in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}