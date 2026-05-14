"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search, MapPin, ChevronRight, TrendingUp, Shield, Clock,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram, GraduationCap,
  Twitter, Mail, ArrowRight, BookOpen, DollarSign, PieChart,
  Activity, CheckCircle, ChevronDown, Rocket, Briefcase, Sparkles,
  Target, Award, Users, Star, Zap, Globe, Code2, Layers, LineChart,
  Radio, Filter, BriefcaseIcon, ExternalLink, Calendar, Laptop,
  Building, Award as AwardIcon, FolderOpen, GitBranch, BookMarked, AlertCircle,
  TrendingUp as TrendingUpIcon, CheckBadge, ChartLine
} from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import TrendingInternships from "@/components/TrendingOpportunities";
import FinanceTopics from "@/components/FinanceTopics";
import Newsletter from "@/components/Newsletter";

// Simplified FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: "How is Finlysta different from traditional job portals?", 
      a: "Unlike traditional portals, Finlysta focuses only on entry-level finance roles. Every listing is manually reviewed — no ghost jobs, no spam, no irrelevant senior positions."
    },
    { 
      q: "Who can use Finlysta?", 
      a: "Finlysta is designed for finance students, graduates, and career-switchers looking for internships and entry-level positions in financial analysis, investment banking, equity research, accounting, and related fields."
    },
    { 
      q: "Is Finlysta really free?", 
      a: "Yes — 100% free for job seekers. Always. Companies pay to post, but you'll never pay anything to find your first finance role."
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-3">
          <HelpCircle size={14} className="text-[#FFD700]" />
          <span className="text-xs font-semibold text-[#0A2540]">Quick Answers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="border border-gray-200 transition-all duration-300 ease-in-out bg-white rounded-xl hover:shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="flex justify-between items-center w-full py-3.5 px-5 text-left"
              aria-expanded={openIndex === idx}
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
                openIndex === idx ? 'max-h-32 opacity-100 pb-4' : 'max-h-0 opacity-0'
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

// Call to Action Section
const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-[#0A2540] via-[#0f2d4a] to-[#1a3a5c] py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFA500]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
          <Sparkles size={14} className="text-[#FFD700]" />
          <span className="text-xs font-semibold text-[#FFD700]">No Credit Card Required · Forever Free</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Launch Your Finance Career?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Get started today — no payment, no spam, just real opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs">
            <button 
              className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                color: "#0A2540",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
              }}
            >
              Browse Jobs Now <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/learn">
            <button 
              className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white/10 backdrop-blur-sm text-white border border-white/20 flex items-center gap-2 mx-auto"
            >
              <BookOpen size={18} /> Free Career Resources
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Trust Indicators with REAL metrics

// Skills in Demand Component
const SkillsSection = () => {
  const skills = [
    { name: "Financial Modeling", icon: LineChart },
    { name: "Excel & VBA", icon: Code2 },
    { name: "SQL", icon: Database },
    { name: "Tableau/Power BI", icon: PieChart },
    { name: "Financial Reporting", icon: FileText },
    { name: "Valuation", icon: DollarSign },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-4">
            <Zap size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">Skills That Get You Hired</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-3">
            Master In-Demand Finance Skills
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Top skills recruiters look for in entry-level financial analysts
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-2">
                <skill.icon size={24} className="text-[#FFD700]" />
              </div>
              <div className="text-sm font-semibold text-gray-800">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Companies Featured Section - Increased logo size
const CompaniesSection = () => {
  const companies = [
    "Goldman Sachs", "J.P. Morgan", "Deloitte", "EY", "KPMG", "PwC", "Morgan Stanley", "ICICI Bank"
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-3">
            <Building2 size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">Companies Featuring Roles</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2540]">
            Opportunities From Leading Financial Firms
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            We surface entry-level roles from India's top finance employers
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {companies.map((company, idx) => (
            <div key={idx} className="bg-gray-50 px-5 py-3 rounded-full text-base font-semibold text-gray-700 border border-gray-100 shadow-sm">
              {company}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Roles are sourced from public listings and verified company career pages
        </p>
      </div>
    </section>
  );
};

// Expanded Role Categories Section - With sparkle emoji and "Curated roles for Freshers"
const RoleCategoriesSection = () => {
  const roleCategories = [
    {
      title: "Investment Banking & Research",
      roles: ["Investment Banking Analyst Intern", "Equity Research Intern", "Valuation Intern", "Investment Research Analyst"]
    },
    {
      title: "Accounting & Operations",
      roles: ["Accounts Executive", "Accounts Payable Analyst", "Audit Associate", "Tax Analyst", "Payroll Analyst"]
    },
    {
      title: "Fintech & Data",
      roles: ["Financial Data Analyst", "FinOps Analyst", "BI Analyst", "Reporting Associate", "Fraud Analyst"]
    },
    {
      title: "Banking & BFSI",
      roles: ["Banking Operations Analyst", "Credit Analyst", "Risk Analyst", "KYC Analyst", "Wealth Management Intern"]
    },
    {
      title: "Corporate Finance",
      roles: ["FP&A Analyst", "Treasury Analyst", "Budget Analyst", "Revenue Analyst", "Commercial Analyst"]
    },
    {
      title: "MIS & Business Finance",
      roles: ["MIS Analyst", "Business Analyst (Finance)", "Revenue Operations Analyst", "Pricing Analyst"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-4">
            <Briefcase size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">✨ Curated roles for Freshers</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-3">
            Finance Careers Beyond Financial Analyst
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Discover entry-level roles across investment banking, accounting, fintech, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                <TrendingUpIcon size={16} className="text-[#FFD700]" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.roles.map((role, roleIdx) => (
                  <button
                    key={roleIdx}
                    onClick={() => {
                      window.location.href = `/jobs?search=${encodeURIComponent(role)}`;
                    }}
                    className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-full hover:bg-[#FFD700]/20 hover:text-[#0A2540] transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/jobs">
            <button className="text-sm font-semibold text-slate-900 hover:text-black transition-colors inline-flex items-center gap-1">
              Browse All Entry-Level Finance Roles <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "Financial Analyst at Deloitte",
      content: "Finlysta helped me land my first job. The listings were actually for freshers — no hidden '2-3 years experience' requirements.",
      rating: 5,
      avatar: "R"
    },
    {
      name: "Priya Sharma",
      role: "Investment Banking Intern",
      content: "Found a legit internship within weeks. The verification gives me confidence that I'm not wasting time on fake posts.",
      rating: 5,
      avatar: "P"
    },
    {
      name: "Amit Kumar",
      role: "FP&A Analyst",
      content: "Finally a job board that understands finance freshers. No senior roles, no spam — just relevant opportunities.",
      rating: 5,
      avatar: "A"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-4">
            <Star size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">Real Results</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-3">
            From Our Community
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Finance aspirants who found their first roles through Finlysta
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center justify-center text-[#0A2540] font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0A2540]">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simplified SEO Section
const SEOSection = () => {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2540]">
            Entry Level Financial Analyst Jobs & Internships in India
          </h2>
        </div>
        <div className="max-w-3xl mx-auto text-sm text-gray-600 space-y-3">
          <p>
            Finlysta is India's dedicated job board for <strong>entry level financial analyst jobs and internships</strong>. 
            We connect finance students and graduates with verified opportunities at top companies.
          </p>
          <p>
            Unlike traditional portals, we focus exclusively on <strong>fresher-friendly roles</strong> — no senior positions, 
            no ghost jobs. Every listing is manually verified.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/jobs" className="text-[#FFD700] hover:text-[#FFA500] text-sm font-medium">Browse All Jobs →</Link>
            <Link href="/internships" className="text-[#FFD700] hover:text-[#FFA500] text-sm font-medium">Browse Internships →</Link>
            <Link href="/blogs" className="text-[#FFD700] hover:text-[#FFA500] text-sm font-medium">Career Blogs →</Link>
          </div>
          <p className="text-xs text-gray-400 text-center pt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </section>
  );
};

// Helper components for missing Lucide icons
const HelpCircle = ({ size, className }: { size?: number; className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
};

const Database = ({ size, className }: { size?: number; className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
};

const FileText = ({ size, className }: { size?: number; className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
};

// Main Page Content Component
export default function HomePageContent() {
  const router = useRouter();

  const handleFindJobs = () => {
    router.push(`/jobs`);
  };

  const handleBrowseInternships = () => {
    router.push(`/internships`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Header />

      <main>
        {/* HERO SECTION - Enhanced with emotional hook */}
        <section className="relative bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-white py-16 md:py-24 lg:py-28 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFA500]/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <AlertCircle size={14} className="text-[#FFD700]" />
                <span className="text-xs font-semibold text-[#0A2540]">Entry-Level Finance Jobs & Internships.</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#0A2540] mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Find Your Dream Job & Internships
                <span className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text">
                  {" "}With Your Interest And Skills
                </span>
              </h1>
              
              <div className="max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-semibold tracking-tight">
                  🚫 Tired of scrolling through jobs that require
                  <span className="text-[#0A2540]">{" "}2–5 years of experience?</span>
                </p>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Most job portals are filled with senior-level roles.
                  <br />
                  Finlysta helps freshers discover verified internships and entry-level jobs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <button
                  onClick={handleFindJobs}
                  className="px-8 py-4 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 text-base min-w-[200px] cursor-pointer hover:scale-105 border-2 border-[#FFD700] bg-transparent hover:bg-[#FFD700]/10 group"
                  style={{ color: "#0A2540" }}
                >
                  <Briefcase size={20} />
                  <span>Find My First Job</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleBrowseInternships}
                  className="px-8 py-4 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 text-base min-w-[200px] cursor-pointer hover:scale-105"
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
            </div>
          </div>
        </section>

        {/* TRUST INDICATORS - Real metrics */}
        {/* <TrustSection /> */}

        {/* TRENDING OPPORTUNITIES - Live jobs section */}
        <TrendingInternships />

        {/* SKILLS SECTION */}
        <SkillsSection />

        {/* EXPANDED ROLE CATEGORIES */}
        <RoleCategoriesSection />

        {/* COMPANIES SECTION */}
        <CompaniesSection />

        {/* CAREER PATH - Roadmap Image Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-4">
                <GitBranch size={14} className="text-[#FFD700]" />
                <span className="text-xs font-semibold text-[#0A2540]">Proven Path</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A2540] mb-3">
                Your Roadmap to Becoming a <span className="text-[#FFD700]">Financial Analyst</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
                Follow this step-by-step guide — from learning fundamentals to landing your first role
              </p>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white p-4">
              <div className="relative w-full">
                <Image
                  src="/roadmap.png"
                  alt="Step-by-step career roadmap to become a financial analyst"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg"
                  priority
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Link href="/learn">
                <button className="text-sm text-[#FFD700] font-semibold hover:text-[#FFA500] transition-colors inline-flex items-center gap-1">
                  Get Free Learning Resources <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* LEARNING SECTION */}
        <FinanceTopics />

        {/* TESTIMONIALS SECTION */}
        <TestimonialsSection />

        {/* SIMPLIFIED SEO SECTION */}
        <SEOSection />

        {/* NEWSLETTER SECTION */}
        <Newsletter />

        {/* SIMPLIFIED FAQ SECTION */}
        <FAQ />

        {/* CTA SECTION */}
        <CTASection />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-10 pb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="col-span-2 lg:col-span-4 space-y-3">
              <Link href="/" className="flex items-center" aria-label="Finlysta Home">
                <Image 
                  src="/Finlysta.png" 
                  alt="Finlysta logo"
                  width={180} 
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs">The job board built exclusively for entry-level financial analyst roles and internships in India.</p>
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Follow us on</p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a 
                    href="https://twitter.com/Finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Twitter"
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Twitter size={16} />
                  </a>
                  <a 
                    href="https://instagram.com/finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#E4405F] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Jobs</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/jobs" className="hover:text-[#0A2540] transition-colors">All Jobs</Link></li>
                <li><Link href="/internships" className="hover:text-[#0A2540] transition-colors">Internships</Link></li>
                <li><Link href="/jobs?type=remote" className="hover:text-[#0A2540] transition-colors">Remote Jobs</Link></li>
                <li><Link href="/blogs" className="hover:text-[#0A2540] transition-colors">Career Blogs</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/learn" className="hover:text-[#0A2540] transition-colors">Learning Hub</Link></li>
                <li><Link href="/blogs/how-to-become-financial-analyst-india-2026" className="hover:text-[#0A2540] transition-colors">Career Guide</Link></li>
                <li><Link href="/blogs/financial-modeling-interview-questions" className="hover:text-[#0A2540] transition-colors">Interview Prep</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/about" className="hover:text-[#0A2540] transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#0A2540] transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[#0A2540] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#0A2540] transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Support</h4>
              <a href="mailto:support@finlysta.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0A2540] transition-colors">
                <Mail size={13} /> support@finlysta.com
              </a>
              <p className="text-xs text-slate-400 mt-3">Reply within 24 hours</p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-5 pb-6">
            <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-500 text-center">
              <span>© {new Date().getFullYear()} Finlysta Pvt. Ltd. All rights reserved.</span>
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom-4 {
          from { transform: translateY(1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-in {
          animation-duration: 0.7s;
          animation-fill-mode: both;
        }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .duration-700 { animation-duration: 0.7s; }
      `}</style>
    </div>
  );
}