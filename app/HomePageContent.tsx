"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search, MapPin, ChevronRight, TrendingUp, Shield, Clock, Calculator, MessageCircle,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram, GraduationCap,
  Twitter, Mail, ArrowRight, BookOpen, DollarSign, PieChart,
  Activity, CheckCircle, ChevronDown, Rocket, Briefcase, Sparkles,
  Target, Award, Users, Star, Zap, Globe, Code2, Layers, LineChart,
  Radio, Filter, BriefcaseIcon, ExternalLink, Calendar, Laptop,
  Building, Award as AwardIcon, FolderOpen, GitBranch, BookMarked, AlertCircle,
  TrendingUp as TrendingUpIcon, BadgeCheck, ChartLine, Plus, Minus
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
      q: "Are the jobs on Finlysta verified?", 
      a: "Yes. Every job and internship listed on Finlysta is manually reviewed to help students avoid fake listings, spam, and irrelevant senior-level roles."
    },
    { 
      q: "What kind of finance jobs are available on Finlysta?", 
      a: "Finlysta features entry-level finance roles including Financial Analyst, FP&A, Investment Banking, Equity Research, Audit, Tax, MIS, Accounting, and Article Trainee opportunities."
    },
    { 
      q: "Who can use Finlysta?", 
      a: "Finlysta is designed for finance students, graduates, and career-switchers looking for internships and entry-level positions in financial analysis, investment banking, equity research, accounting, and related fields."
    },
    { 
      q: "Can freshers apply for jobs on Finlysta?", 
      a: "Absolutely. Finlysta is built specifically for students, graduates, and first-time job seekers looking for fresher-friendly finance opportunities."
    },
    { 
      q: "Is Finlysta really free?", 
      a: "Yes — 100% free for job seekers. Always. Companies pay to post, but you'll never pay anything to find your first finance role."
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 rounded-full px-4 py-1.5 mb-4">
            <HelpCircle size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mb-3">
            Everything You Need to Know About <span className="text-[#FFD700]">Finlysta</span>
          </h2>
          <p className="text-sm text-[#64748B] max-w-2xl mx-auto">
            Find answers to common questions about finance jobs, internships, and how Finlysta works
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={idx} 
                className={`bg-white border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#FFD700]/40 shadow-md' 
                    : 'border-gray-100 hover:border-[#FFD700]/30 hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex justify-between items-center w-full py-4 px-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0A2540] pr-4">
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-[#F8FAFC] flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#FFD700]/10' : ''
                  }`}>
                    {isOpen ? (
                      <Minus size={14} className="text-[#FFD700]" />
                    ) : (
                      <Plus size={14} className="text-[#0A2540]" />
                    )}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${
                    isOpen ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 pt-4">
          <p className="text-sm text-[#64748B] mb-3">
            Still have questions?
          </p>
          <a 
            href="mailto:support@finlysta.com" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[#FFD700] hover:text-[#FFA500] transition-colors"
          >
            Contact our support team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

// Call to Action Section
// Call to Action Section - Improved Version with Better Text Visibility
const CTASection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] to-[#133B5C] py-20 md:py-24">
      {/* Background Blur Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFA500]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl mx-auto bg-[#FFD700]/[0.03] rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge - Improved with text */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <Sparkles size={13} className="text-[#FFD700]" />
          <span className="text-xs font-semibold text-black">
            Built for Finance Freshers
          </span>
        </div>
        
        {/* Heading - More confident */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
          Start Your Finance Career <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text">
            with Confidence
          </span>
        </h2>
        
        {/* Subheading - More specific & benefit-driven */}
        <p className="text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Verified finance jobs, internships, and learning resources 
          <br className="hidden sm:block" />
          designed for students and freshers.
        </p>
        
        {/* Buttons - Better hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs">
            <button 
              className="group px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base font-bold rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center gap-2 min-w-[200px]"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                color: "#0A2540",
                boxShadow: "0 8px 20px -6px rgba(255, 215, 0, 0.3)"
              }}
            >
              <Briefcase size={18} />
              <span>Browse Jobs</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <Link href="/learn">
            <button 
              className="px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-black border border-white/20 hover:bg-white-20 min-w-[200px]"
            >
              <BookOpen size={18} />
              <span>Start Learning</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Skills in Demand Component
const SkillsSection = () => {
  const skills = [
    { name: "Advanced Excel", icon: LineChart, description: "Pivot Tables, VLOOKUP, Excel Functions" },
    { name: "Financial Statements", icon: FileText, description: "Balance Sheet, P&L, Cash Flow" },
    { name: "Accounting Fundamentals", icon: Calculator, description: "Journal Entries, Debit & Credit"},
    { name: "Financial Reporting", icon: BarChart3, description: "Financial Reports, GAAP, IFRS"},
    { name: "Financial Analysis", icon: TrendingUpIcon, description: "Ratio Analysis, Variance Analysis"},
    { name: "Business Communication", icon: MessageCircle, description: "Presentations, Client Communication"},
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
            Master In-Demand <span className="text-[#FFD700]">Finance Skills</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Top skills recruiters look for in entry-level finance roles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <skill.icon size={22} className="text-[#FFD700]" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-1 group-hover:text-[#FFD700] transition-colors">
                {skill.name}
              </h3>
              {skill.description && (
                <p className="text-xs text-slate-500">
                  {skill.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Role Categories Section - 3 Modern Categories
const RoleCategoriesSection = () => {
  const roleCategories = [
    {
      title: "Finance & Analysis",
      icon: TrendingUpIcon,
      bgColor: "bg-[#dbeaf5]",
      tagBgColor: "bg-[#c8e2f4]",
      description: "Most popular modern finance careers",
      roles: ["Financial Analyst", "FP&A Analyst", "MIS Analyst", "Business Finance Analyst", "Revenue Analyst"]
    },
    {
      title: "Accounting, Audit & Tax",
      icon: Calculator,
      bgColor: "bg-[#f8dfcf]",
      tagBgColor: "bg-[#f5cdb4]",
      description: "Huge fresher demand in India",
      roles: ["Article Trainee", "Audit Associate", "Tax Analyst", "Accounts Executive", "Accounts Payable Analyst", "Finance Executive"]
    },
    {
      title: "Banking, Investment & Risk",
      icon: Landmark,
      bgColor: "bg-[#d5f2ea]",
      tagBgColor: "bg-[#afe7d8]",
      description: "High aspirational careers",
      roles: ["Investment Banking Analyst", "Equity Research Analyst", "Credit Analyst", "Risk Analyst", "KYC Analyst"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-4">
            <Briefcase size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">✨ Curated roles for Freshers</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-3">
            Finance Careers Beyond <span className="text-[#FFD700]">Financial Analyst</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Discover entry-level roles across financial analysis, accounting, banking, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[28px] p-3 shadow-sm border border-white/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Colored Content Area */}
              <div className={`${category.bgColor} rounded-[22px] p-6 min-h-[240px]`}>
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center">
                    <category.icon size={22} className="text-[#0A2540]" />
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-black leading-tight mb-2">
                  {category.title}
                </h2>

                <p className="text-sm text-black/70 leading-snug mb-4">
                  {category.description}
                </p>

                {/* Role Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.roles.map((role, roleIdx) => (
                    <button
                      key={roleIdx}
                      onClick={() => {
                        window.location.href = `/jobs?search=${encodeURIComponent(role)}`;
                      }}
                      className={`px-3 py-1.5 rounded-full ${category.tagBgColor} text-xs font-medium text-black/80 hover:scale-105 transition-transform duration-200`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Explore Section */}
              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-base font-semibold text-black">Explore {category.title.split(' ')[0]} Roles</p>
                <button 
                  onClick={() => {
                    window.location.href = `/jobs?search=${encodeURIComponent(category.title.split(' &')[0])}`;
                  }}
                  className="w-10 h-10 rounded-xl bg-[#f3f3f3] flex items-center justify-center text-xl hover:bg-[#FFD700] hover:text-black transition-all duration-200"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/jobs">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#FFD700] text-[#0A2540] font-semibold rounded-xl hover:bg-[#FFD700] hover:border-[#FFD700] transition-all duration-300 text-sm">
              Browse All Entry-Level Finance Roles
              <ArrowRight size={14} />
            </button>
          </Link>
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
        <section className="relative bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-white py-16 md:py-20 lg:py-24 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFA500]/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <AlertCircle size={14} className="text-[#FFD700]" />
                <span className="text-xs font-semibold text-[#0A2540]">Entry-Level Finance Jobs & Internships.</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-5xl xl:text-7xl font-black text-[#0A2540] mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Find Your Dream Finance Job & Internship
                <span className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text">
                  {" "}That Match Your Skills & Interests
                </span>
              </h1>
              
              <div className="max-w-2xl mx-auto mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-semibold tracking-tight">
                  🚫 Tired of entry-level jobs asking for 2–5 years of experience?
                </p>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Most job portals are built for experienced professionals.
                  <br />
                  Finlysta helps finance freshers discover verified internships and entry-level jobs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
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

        {/* TRENDING OPPORTUNITIES - Live jobs section */}
        <TrendingInternships />

        {/* SKILLS SECTION */}
        <SkillsSection />

        {/* ROLE CATEGORIES SECTION - 3 Modern Cards */}
        <RoleCategoriesSection />

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
                  <button className="text-sm text-black font-semibold hover:text-gray-700 transition-colors inline-flex items-center gap-1">
                  Get Free Learning Resources <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* LEARNING SECTION */}
        <FinanceTopics />

        {/* NEWSLETTER SECTION */}

        {/* FAQ SECTION */}
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
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs">The job board built exclusively for entry-level financial roles and internships in India.</p>
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