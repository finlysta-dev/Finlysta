"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search, MapPin, ChevronRight, TrendingUp, Shield, Clock,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram,
  Twitter, Mail, ArrowRight, BookOpen, DollarSign, PieChart,
  Activity, CheckCircle, ChevronDown, Rocket, Briefcase, Sparkles,
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

// Try for Free Section Component - Simplified (No Stats Table)
const TryForFree = () => {
  return (
    <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
          Skip the clutter.
        </h2>
        <p className="text-xl md:text-2xl text-black/90 mb-10">
          Find financial analyst internships and entry-level jobs faster.
        </p>
        
        <div className="flex justify-center">
          <Link href="/internships">
            <button 
              className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                color: "#0A2540",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
              }}
            >
              Try Finlysta for free →
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
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    router.push(`/internships?${params.toString()}`);
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
        <section className="relative bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] py-16 md:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              
              {/* Left Side - Text Content */}
              <div className="flex-1 text-left">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#0A2540] mb-6 leading-tight">
                    The Biggest Job Board
                    <br />
                    Dedicated to Financial Analyst Jobs & Internships
                  </h1>
                  
                  <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
                    Find your perfect financial analyst position from the largest collection of opportunities requiring skills in Excel, SQL, Python, Tableau, Power BI, financial modeling, forecasting, and data visualization.
                  </p>
                  
                  <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
                    Browse remote, hybrid, and on-site roles with transparent salary ranges - every single listing is a financial analyst position, nothing else.
                  </p>
                  
                  <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed italic">
                    So enjoy your search journey and apply one day the day will be yours.
                  </p>

                  {/* Search Form */}
                  <form onSubmit={handleSearch} className="bg-white shadow-xl overflow-hidden rounded-lg">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Search className="w-5 h-5 text-[#FFD700]" />
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Job title, skill, or company"
                          className="w-full pl-12 pr-4 py-4 outline-none text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                      <div className="flex-1 relative border-t md:border-t-0 md:border-l border-slate-200">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <MapPin className="w-5 h-5 text-[#FFD700]" />
                        </div>
                        <input
                          type="text"
                          value={locationQuery}
                          onChange={(e) => setLocationQuery(e.target.value)}
                          placeholder="City, state, or remote"
                          className="w-full pl-12 pr-4 py-4 outline-none text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2540] font-bold px-8 py-4 transition-all duration-300"
                      >
                        Find Job →
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Side - Image with Floating Animation */}
              <div className="flex-1 flex justify-start lg:justify-start">
                <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl animate-float">
                  <Image
                    src="/team.png"
                    alt="Financial Analyst professional at work"
                    width={700}
                    height={700}
                    className="object-cover w-full h-auto"
                    priority
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING OPPORTUNITIES SECTION */}
        <TrendingInternships />

        {/* FINANCE TOPICS SECTION */}
        <FinanceTopics />

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
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs">Finlysta is the biggest job board dedicated exclusively to Financial Analyst positions. Find your perfect role requiring skills in Excel, SQL, Python, financial modeling, and more.</p>
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Follow us on</p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/finlysta/ " 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Finlysta on LinkedIn" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a 
                    href="https://www.instagram.com/Finlysta.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Finlysta on Instagram" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#E4405F] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href="https://x.com/Finlysta83656" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Finlysta on Twitter" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Twitter size={16} />
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
                <li><Link href="/resources" className="hover:text-[#0A2540] transition-colors">Career Resources</Link></li>
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
              <a href="mailto:Finlystahelp@gmail.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0A2540] transition-colors">
                <Mail size={13} /> Finlystahelp@gmail.com
              </a>
              <p className="text-xs text-slate-400 mt-3">Response within 24 hours</p>
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
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
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