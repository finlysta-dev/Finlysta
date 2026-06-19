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
  TrendingUp as TrendingUpIcon, BadgeCheck, ChartLine, Plus, Minus, Check,
  FileSpreadsheet, FileText, ClipboardList, MessageSquare, Eye, BarChart4
} from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import TrendingInternships from "@/components/TrendingOpportunities";

const HelpCircle = ({ size, className }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const SkillsSection = () => {
  const skills = [
    { icon: FileSpreadsheet, title: "Advanced Excel", subtitle: "Pivot Tables, VLOOKUP,\nExcel Functions", color: "text-green-600", bg: "bg-green-50" },
    { icon: FileText, title: "Financial Statements", subtitle: "Balance Sheet, P&L,\nCash Flow", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Calculator, title: "Accounting Fundamentals", subtitle: "Journal Entries,\nDebit & Credit", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: ClipboardList, title: "Financial Reporting", subtitle: "Financial Reports,\nGAAP, IFRS", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: BarChart3, title: "Financial Analysis", subtitle: "Ratio Analysis,\nVariance Analysis", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: MessageSquare, title: "Business Communication", subtitle: "Presentations,\nClient Communication", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <section className="py-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="text-left mb-6">
              <p className="text-sm font-semibold text-[#2563EB] mb-2">Skills That Get You Hired</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Master In-Demand Finance Skills</h2>
              <p className="mt-2 text-sm text-slate-600">Top skills recruiters look for in entry-level finance roles</p>
            </div>
           <div className="overflow-hidden">
            <div className="w-full">
                <div className="flex">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div key={index} className="flex-1 text-center px-1 pb-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${skill.bg}`}>
                            <Icon className={`w-4 h-4 ${skill.color}`} />
                          </div>
                          <span className="text-[11px] font-bold text-[#081B4B] leading-tight whitespace-nowrap">{skill.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex-1 text-center px-1 pt-1">
                      <span className="text-[11px] text-slate-500 leading-tight whitespace-pre-line block">{skill.subtitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
const StatsSection = () => {
  const stats = [
    { value: "4,000+", label: "Visitors", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { value: "875+", label: "Sessions", icon: Eye, color: "text-green-600", bg: "bg-green-50" },
    { value: "Learning Hub", label: "Resources", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { value: "100%", label: "Free Access", icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-[#F8FAFC] rounded-2xl p-5 text-center border border-slate-100 hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={24} className={stat.color} />
                </div>
                <p className="text-2xl font-extrabold text-[#081B4B]">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FINANCE CAREER PATHS - Same structure for all 3 cards
// ============================================
const FinanceCareerPaths = () => {
  const categories = [
    { 
      title: "Finance & Analysis", 
      subtitle: "Most popular modern finance careers", 
      roles: ["Financial Analyst", "FP&A Analyst", "MIS Analyst", "Investment Finance Analyst"], 
      extraRoles: 1, 
      icon: BarChart3, 
      iconBg: "bg-blue-50", 
      iconColor: "text-blue-600", 
      link: "Explore Finance Roles",
      bgGradient: "from-blue-50/50 to-white"
    },
    { 
      title: "Accounting, Audit & Tax", 
      subtitle: "Huge fresher demand in India", 
      roles: ["Article Trainee", "Audit Associate", "Tax Analyst", "Accounting Executive"], 
      extraRoles: 2, 
      icon: Calculator, 
      iconBg: "bg-green-50", 
      iconColor: "text-green-600", 
      link: "Explore Accounting Roles",
      bgGradient: "from-green-50/50 to-white"
    },
    { 
      title: "Banking, Investment & Risk", 
      subtitle: "High aspirational careers", 
      roles: ["Investment Banking Analyst", "Equity Research Analyst", "Credit Analyst", "Risk Analyst"], 
      extraRoles: 1, 
      icon: Landmark, 
      iconBg: "bg-purple-50", 
      iconColor: "text-purple-600", 
      link: "Explore Banking Roles",
      bgGradient: "from-purple-50/50 to-white"
    },
  ];

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[280px] flex-shrink-0">
            <h2 className="text-2xl font-bold text-[#081B4B] leading-tight">Finance Careers Beyond<br /><span className="text-[#2563EB]">Financial Analyst</span></h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Discover entry-level roles across financial<br />analysis, accounting, banking, and more.</p>
          </div>
          <div className="flex-1">
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className={`bg-gradient-to-b ${item.bgGradient} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={16} className={item.iconColor} />
                          </div>
                          <h3 className="font-bold text-[#081B4B] text-base">{item.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">{item.subtitle}</p>
                        <ul className="mt-3 space-y-1.5">
                          {item.roles.map((role) => (
                            <li key={role} className="text-sm text-[#081B4B] flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                              {role}
                            </li>
                          ))}
                          {item.extraRoles > 0 && (
                            <li className="text-sm text-blue-500 font-medium">+{item.extraRoles} more roles</li>
                          )}
                        </ul>
                        <button 
                          onClick={() => window.location.href = `/jobs?search=${encodeURIComponent(item.title.split(' &')[0])}`} 
                          className="mt-4 text-[#2563EB] font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2 transition-all group"
                        >
                          {item.link} 
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex mt-6">
              <div style={{ marginLeft: "180px" }}>
                <Link href="/jobs">
                  <button className="px-6 py-2.5 bg-white border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-semibold text-sm hover:bg-blue-50 transition">Browse All Entry-Level Finance Roles →</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RoadmapLearningSection = () => {
  const router = useRouter();

  const learningTags = [
    { name: "Finance Fundamentals", icon: GraduationCap },
    { name: "Advanced Excel", icon: FileSpreadsheet },
    { name: "Financial Analysis", icon: TrendingUpIcon },
    { name: "Power BI", icon: BarChart3 },
    { name: "Business Communication", icon: MessageCircle },
  ];

  const blogPosts = [
    { title: "Stop Sending Cold DMs That Get Ignored", readTime: "8 min read", category: "Career Advice", slug: "stop-sending-cold-dms", image: "/blog-cold-dms.png" },
    { title: "How to Become a Financial Analyst in India", readTime: "8 min read", category: "Career Guide", slug: "how-to-become-a-financial-analyst", image: "/blog-financial-analyst.png" },
  ];

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-blue-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <GraduationCap size={16} className="text-blue-600" />
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Proven Path</p>
            </div>
            <h3 className="text-xl font-bold text-[#081B4B]">Your Roadmap to Becoming<br />a Financial Analyst</h3>
            <p className="text-[11px] text-slate-500 mt-1 relative z-10 leading-relaxed whitespace-pre-line">{`Follow this step-by-step guide\n— from learning fundamentals to\nlanding your first role.`}</p>
            <div className="relative z-10 mt-1 w-full flex justify-start">
              <Image src="/steps.png" alt="Career Roadmap Steps" width={220} height={120} quality={100} className="object-contain" />
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <button onClick={() => router.push('/learning-hub')} className="px-3 py-2 bg-blue-600 text-white rounded-xl font-medium text-[11px] hover:bg-blue-700 transition-all inline-flex">Get Free Learning Resources →</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Best Learning Hub Categories</p>
              <BookOpen size={16} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-[#081B4B]">Master the Skills Recruiters Are Looking For</h3>
            <p className="text-sm text-slate-500 mt-2">Bite-sized lessons designed to help you build a successful finance career.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {learningTags.map((item) => {
                const Icon = item.icon;
                return (
                  <span key={item.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-blue-50 text-blue-700">
                    <Icon size={12} className="text-blue-500" />{item.name}
                  </span>
                );
              })}
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold text-[#081B4B] uppercase tracking-wide">Career-Focused Learning Path</p>
              <h4 className="text-xl font-bold text-[#081B4B] mt-1">Ready to Start Your Journey?</h4>
              <div className="flex items-end justify-between mt-4">
                <div className="flex flex-col gap-6">
                  <button onClick={() => router.push('/learning-hub')} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all">Start Learning Now →</button>
                  <button onClick={() => router.push('/learning-hub')} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Explore All Topics →</button>
                </div>
                <Image src="/learning-books.png" alt="Learning Resources" width={140} height={100} className="object-contain" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Fresh Insights</p>
              <Sparkles size={16} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-[#081B4B]">Insights, stories, and tools for building your finance career</h3>
            <p className="text-sm text-slate-500 mt-2">Expert career advice, interview tips, and practical finance guides.</p>
            <div className="space-y-4 mt-4 flex-1">
              {blogPosts.map((blog, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-32 h-24 rounded-xl bg-white border border-slate-100 flex-shrink-0 overflow-hidden p-1">
                    <Image src={blog.image} alt={blog.title} width={160} height={128} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#081B4B] text-sm leading-tight">{blog.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{blog.category} • {blog.readTime}</p>
                    <button onClick={() => router.push(`/blogs/${blog.slug}`)} className="text-blue-600 text-xs font-medium mt-1 hover:underline">Read full article →</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/blogs')} className="w-full mt-4 border border-blue-600 text-blue-600 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Explore All Blogs →</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <p className="text-sm font-bold text-[#081B4B] bg-blue-50 px-4 py-1.5 rounded-full">
            Loved by Finance Freshers
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-xl px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              {/* Random icon from public folder - icon.png */}
              <div className="flex-shrink-0">
                <Image
                  src="/Userprofile.png"
                  alt="User Icon"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex-1">
                {/* 3-line testimonial text with line breaks */}
                <p className="text-[13px] text-slate-700 leading-relaxed">
                  Finlysta helped me build an ATS-friendly resume, improve
                  <br />
                  my LinkedIn profile, and guided me through a structured
                  <br />
                  learning roadmap that made my career journey much clearer.
                </p>

                <div className="mt-4">
                  <p className="text-[12px] font-semibold text-[#081B4B]">
                    — Khushi
                  </p>
                  <p className="text-[11px] text-slate-500">
                    BBA Student
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="text-[#2563EB] mt-1 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQCTASection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "How is Finlysta different from traditional job portals?", a: "Unlike traditional portals, Finlysta focuses only on entry-level finance roles. Every listing is manually reviewed — no ghost jobs, no spam, no irrelevant senior positions." },
    { q: "Are the jobs on Finlysta verified?", a: "Yes. Every job and internship listed on Finlysta is manually reviewed to help students avoid fake listings." },
    { q: "What kind of finance jobs are available on Finlysta?", a: "Finlysta features entry-level finance roles including Finance Executive, Finance Associate, Accounts Executive, MIS Executive, Audit Associate, Tax Associate, and Accounting roles." },
    { q: "Who can use Finlysta?", a: "Finlysta is designed for finance students, graduates, and career-switchers looking for entry-level positions." },
    { q: "Can freshers apply for jobs on Finlysta?", a: "Absolutely. Finlysta is built specifically for students, graduates, and first-time job seekers." },
    { q: "Is Finlysta really free?", a: "Yes — 100% free for job seekers. Always." },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="flex flex-col">
            <p className="text-sm font-bold text-[#2563EB] mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl font-bold text-[#081B4B] mb-6">Everything You Need to Know About Finlysta</h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-[#081B4B]">{faq.q}</span>
                      <span className="text-[#2563EB] text-lg font-bold ml-4 flex-shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3">
                        <p className="text-xs text-[#081B4B] leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-full max-w-2xl">
              <img
                src="/faq.png"
                alt="FAQ Illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function HomePageContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#F8FAFC] pt-6 pb-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-30"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex-1 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-6">
                  <span className="text-blue-600 text-base">⭐</span>
                  <span className="font-semibold text-blue-700 text-sm">Built for Finance Freshers</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight text-[#081B4B]">
                  Empowering Future<br /><span className="text-blue-600">Finance Professionals.</span>
                </h1>
                <p className="mt-6 text-xl md:text-2xl leading-relaxed text-slate-600 max-w-[540px]">
                  Opportunities, skills, and guidance to<br />help finance students and fresh<br />graduates <span className="text-blue-600">grow and stand out.</span>
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button onClick={() => router.push('/jobs')} style={{ backgroundColor: '#2563EB', color: '#ffffff', borderRadius: '16px', padding: '14px 32px', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.25)' }}>Find My First Job →</button>
                  <button onClick={() => router.push('/internships')} style={{ backgroundColor: '#ffffff', color: '#2563EB', borderRadius: '16px', padding: '14px 32px', fontWeight: 600, fontSize: '1rem', border: '2px solid #2563EB', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.10)' }}>Explore Internships →</button>
                </div>
              </div>
              <div className="flex-1 flex justify-start -ml-40 lg:-ml-52">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-40 rounded-full"></div>
                  <Image src="/herostudent.png" alt="Finance Student" width={820} height={820} priority className="relative z-20 w-full max-w-[820px] drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full border-t border-b border-gray-100 bg-white py-4 mt-8">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <span className="text-[15px] font-semibold text-[#0F172A]">Popular Entry-Level Roles:</span>
            <div className="flex items-center gap-2 text-[#0F172A]"><Briefcase className="w-5 h-5 text-[#2563EB]" /><span className="text-[15px] font-medium">Financial Analyst</span></div>
            <div className="flex items-center gap-2 text-[#0F172A]"><Building2 className="w-5 h-5 text-[#2563EB]" /><span className="text-[15px] font-medium">Investment Banking</span></div>
            <div className="flex items-center gap-2 text-[#0F172A]"><Shield className="w-5 h-5 text-[#2563EB]" /><span className="text-[15px] font-medium">Credit Analyst</span></div>
            <div className="flex items-center gap-2 text-[#0F172A]"><TrendingUp className="w-5 h-5 text-[#2563EB]" /><span className="text-[15px] font-medium">Risk Analyst</span></div>
            <div className="flex items-center gap-2 text-[#0F172A]"><FileText className="w-5 h-5 text-[#2563EB]" /><span className="text-[15px] font-medium">Article Trainee</span></div>
            <div className="flex items-center gap-2 text-[#0F172A]"><GraduationCap className="w-5 h-5 text-[#2563EB]" /><span className="text-[15px] font-medium">Article Assistant</span></div>
            <button className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center flex-shrink-0"><ChevronRight className="w-4 h-4 text-[#2563EB]" /></button>
          </div>
        </div>

        <TrendingInternships />
        
        {/* Stats Section */}
        <StatsSection />
        
        <SkillsSection />
        <FinanceCareerPaths />
        <RoadmapLearningSection />
        <TestimonialSection />
        <FAQCTASection />
      </main>

<footer className="bg-white border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="pt-12 pb-8">
      <div className="flex flex-nowrap justify-between gap-6">

        {/* Logo Section */}
        <div className="min-w-[260px] flex-shrink-0 space-y-4">
          <Link href="/" className="flex items-center">
            <Image src="/Finlysta.png" alt="Finlysta Logo" width={180} height={40} priority className="object-contain" />
          </Link>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
            The job board built exclusively for entry-level financial roles and internships in India.
          </p>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/company/finlysta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-white rounded-lg flex items-center justify-center transition-all"><Linkedin size={16} /></a>
            <a href="https://twitter.com/Finlysta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-white rounded-lg flex items-center justify-center transition-all"><Twitter size={16} /></a>
            <a href="https://instagram.com/finlysta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#E4405F] hover:text-white rounded-lg flex items-center justify-center transition-all"><Instagram size={16} /></a>
          </div>
        </div>

        {/* Jobs Column */}
        <div className="flex-shrink-0">
          <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Jobs</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/jobs" className="hover:text-[#2563EB] transition">All Jobs</Link></li>
            <li><Link href="/internships" className="hover:text-[#2563EB] transition">Internships</Link></li>
            <li><Link href="/jobs?type=remote" className="hover:text-[#2563EB] transition">Remote Jobs</Link></li>
            <li><Link href="/blogs" className="hover:text-[#2563EB] transition">Career Blogs</Link></li>
          </ul>
        </div>

        {/* Employers Column */}
        <div className="flex-shrink-0">
          <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Employers</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/employers/post-job" className="hover:text-[#2563EB] transition">Post a Job Free</Link></li>
            <li><Link href="/employers/how-it-works" className="hover:text-[#2563EB] transition">How It Works</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="flex-shrink-0">
          <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/learning-hub" className="hover:text-[#2563EB] transition">Learning Hub</Link></li>
            <li><Link href="/interview-prep" className="hover:text-[#2563EB] transition">Interview Prep</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="flex-shrink-0">
          <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Company</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/about" className="hover:text-[#2563EB] transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-[#2563EB] transition">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-[#2563EB] transition">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-[#2563EB] transition">Terms</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="flex-shrink-0">
          <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Support</h4>
          <div className="space-y-2">
            <a href="mailto:support@finlysta.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#2563EB] transition whitespace-nowrap">
              <Mail size={13} /> support@finlysta.com
            </a>
            <p className="text-xs text-slate-500 whitespace-nowrap">Reply within 24 hours</p>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-200 pt-6 pb-8 mt-8">
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-600 text-center">
          <span>© {new Date().getFullYear()} Finlysta Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

      <style jsx global>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}