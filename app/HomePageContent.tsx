"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ChevronRight, TrendingUp, Shield, Calculator, MessageCircle,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram, GraduationCap,
  Twitter, Mail, ArrowRight, BookOpen, Sparkles, Briefcase, Users,
  FileSpreadsheet, FileText, ClipboardList, MessageSquare, Gift,
  ChevronDown, Sigma, Eye, BadgeCheck
} from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import { useTracking } from "@/hooks/useTracking";
import { trackPageView } from "@/lib/analytics/tracking";

// FIXED: Safer dynamic import with error handling
const TrendingInternships = dynamic(
  () => import("@/components/TrendingOpportunities").then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => (
      <div className="py-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
);

// ============================================
// SKILLS SECTION
// ============================================
const SkillsSection = () => {
  const { track } = useTracking();
  const skills = [
    { icon: FileSpreadsheet, title: "Advanced Excel", subtitle: "Pivot Tables, VLOOKUP, Excel Functions", color: "text-green-600", bg: "bg-green-50" },
    { icon: FileText, title: "Financial Statements", subtitle: "Balance Sheet, P&L, Cash Flow", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Calculator, title: "Accounting Fundamentals", subtitle: "Journal Entries, Debit & Credit", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: ClipboardList, title: "Financial Reporting", subtitle: "Financial Reports, GAAP, IFRS", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: BarChart3, title: "Financial Analysis", subtitle: "Ratio Analysis, Variance Analysis", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: MessageSquare, title: "Business Communication", subtitle: "Presentations, Client Communication", color: "text-blue-600", bg: "bg-blue-50" },
  ];
  const handleSkillClick = (skillTitle: string) => {
    track("Skill Clicked", {
      skillName: skillTitle,
      location: "homepage_skills_section",
      timestamp: new Date().toISOString(),
    });
  };
  return (
    <section className="py-8 bg-[#F8FAFC]" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="text-left mb-6">
              <p className="text-sm font-semibold text-[#2563EB] mb-2">Skills That Get You Hired</p>
              <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold text-[#081B4B]">
                Master In-Demand Finance Skills
              </h2>
              <p className="mt-2 text-md text-slate-700">
                Top skills recruiters look for in entry-level finance roles
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="text-center px-1 pb-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSkillClick(skill.title)}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${skill.bg}`}>
                        <Icon className={`w-4 h-4 ${skill.color}`} />
                      </div>
                      <span className="text-[12px] font-bold text-[#081B4B] leading-tight">{skill.title}</span>
                      <span className="text-[11px] text-slate-500 leading-tight">{skill.subtitle}</span>
                    </div>
                  </div>
                );
              })}
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
  const { track } = useTracking();
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalOpportunities: 0,
    isLoading: true,
  });
  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const result = await response.json();
          if (result.success && active) {
            setStats({
              totalVisitors: result.data.totalVisitors || 0,
              totalOpportunities: result.data.totalOpportunities || 0,
              isLoading: false,
            });
            return;
          }
        }
        if (active) setStats((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error("Error fetching stats:", error);
        if (active) setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetchStats();
    return () => {
      active = false;
    };
  }, []);
  const formatNumber = (num: number): string => {
    const safe = Math.max(num, 0);
    if (safe < 1) return "—";
    if (safe >= 10000000) return `${(safe / 10000000).toFixed(1)}Cr+`;
    if (safe >= 1000000) return `${(safe / 1000000).toFixed(1)}M+`;
    if (safe >= 100000) return `${(safe / 100000).toFixed(1)}L+`;
    if (safe >= 1000) return `${(safe / 1000).toFixed(1)}K+`;
    return `${safe}+`;
  };
  const statsData = [
    { value: stats.isLoading ? "…" : formatNumber(stats.totalVisitors), label: "Visitors", description: "Students exploring finance careers with us", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { value: stats.isLoading ? "…" : formatNumber(stats.totalOpportunities), label: "Opportunities", description: "Jobs & internships available", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
    { value: "Free", label: "Learning Hub", description: "Essential finance knowledge to build your career", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { value: "100%", label: "Free Access", description: "Everything on Finlysta is completely free", icon: Gift, color: "text-orange-500", bg: "bg-orange-50" },
  ];
  const handleStatClick = (statLabel: string) => {
    track("Statistic Viewed", {
      statName: statLabel,
      location: "homepage_stats_section",
      timestamp: new Date().toISOString(),
    });
  };
  return (
    <section className="py-10" aria-label="Platform statistics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-slate-200 rounded-xl px-8 py-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 px-4 py-4 md:py-0 ${
                    index > 0 ? "md:border-l border-slate-200" : ""
                  } cursor-pointer hover:bg-slate-50 transition-colors rounded-lg`}
                  onClick={() => handleStatClick(stat.label)}
                >
                  <div className={`w-16 h-16 rounded-full ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={30} className={stat.color} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#081B4B]">{stat.value}</p>
                    <p className="font-semibold text-black text-lg">{stat.label}</p>
                    <p className="text-md text-slate-700 mt-0.5">{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// EXCEL FUNCTIONS SECTION
// ============================================
const ExcelFunctionsSection = () => {
  const { track } = useTracking();

  const topFunctions = [
    { 
      name: "VLOOKUP", 
      icon: "🔍",
      fullDefinition: "Searches for a value in the first column of a table and returns a value from a specified column in the same row."
    },
    { 
      name: "XLOOKUP", 
      icon: "🎯",
      fullDefinition: "Searches a range or array and returns a corresponding value from another range. Works in any direction, unlike traditional lookups."
    },
    { 
      name: "SUMIFS", 
      icon: "📊",
      fullDefinition: "Adds up cells that meet multiple conditions. For example, sum sales for a specific product in a specific region."
    },
    { 
      name: "INDEX+MATCH", 
      icon: "📌",
      fullDefinition: "INDEX returns a value from a table based on row and column numbers. MATCH finds the position of a value. Together they create a flexible two-way lookup."
    },
    { 
      name: "IF", 
      icon: "⚡",
      fullDefinition: "Performs a logical test and returns one value if TRUE and another if FALSE. Used to create decision logic in spreadsheets."
    },
    { 
      name: "NPV", 
      icon: "💰",
      fullDefinition: "Calculates the net present value of a series of future cash flows. Determines if an investment is worth pursuing."
    },
    { 
      name: "PMT", 
      icon: "🏦",
      fullDefinition: "Calculates the fixed periodic payment for a loan or annuity. Used to calculate monthly mortgage or loan payments."
    },
    { 
      name: "ROUND", 
      icon: "🔄",
      fullDefinition: "Rounds a number to a specified number of decimal places. Used to format currency and percentages consistently."
    },
  ];

  const handleExploreClick = () => {
    track("Excel Functions Clicked", {
      location: "homepage_excel_functions",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section className="py-12 bg-[#F8FAFC]" aria-labelledby="excel-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sigma size={20} className="text-white" />
              </div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">Excel Mastery</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <h2 id="excel-heading" className="text-2xl md:text-3xl font-bold text-[#081B4B]">
                  Top 50 Advanced Excel Functions <br className="hidden sm:block" />
                  <span className="text-blue-600">for Finance</span>
                </h2>
                <p className="mt-3 text-md text-slate-600 max-w-2xl">
                  Master the most-used Excel functions in finance jobs and interviews —
                  each with a clear definition, syntax, real dataset, practice question, and example.
                </p>
              </div>
              <Link
                href="/guides/excel-functions-guide"
                className="flex-shrink-0 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={handleExploreClick}
              >
                Explore All Functions
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {topFunctions.map((func, index) => (
                <Link
                  key={index}
                  href="/guides/excel-functions-guide"
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group block"
                  onClick={handleExploreClick}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{func.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#081B4B] text-sm group-hover:text-blue-600 transition-colors">
                        {func.name}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                        {func.fullDefinition}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-slate-700 border-t border-blue-100 pt-4">
              <Eye size={20} className="text-slate-700" />
              <span className="font-medium">50+ functions • Real datasets • Practice questions • Finance-focused</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FINANCE CAREER PATHS
// ============================================
const FinanceCareerPaths = () => {
  const { track } = useTracking();
  const categories = [
    { title: "Finance & Analysis", subtitle: "Most popular modern finance careers", roles: ["Financial Analyst", "FP&A Analyst", "MIS Analyst", "Investment Finance Analyst"], extraRoles: 1, icon: BarChart3, iconBg: "bg-blue-50", iconColor: "text-blue-600", link: "Explore Finance Roles", bgGradient: "from-blue-50/50 to-white", path: "/jobs?search=Finance" },
    { title: "Accounting, Audit & Tax", subtitle: "Huge fresher demand in India", roles: ["Article Trainee", "Audit Associate", "Tax Analyst", "Accounting Executive"], extraRoles: 2, icon: Calculator, iconBg: "bg-green-50", iconColor: "text-green-600", link: "Explore Accounting Roles", bgGradient: "from-green-50/50 to-white", path: "/jobs?search=Accounting" },
    { title: "Banking, Investment & Risk", subtitle: "High aspirational careers", roles: ["Investment Banking Analyst", "Equity Research Analyst", "Credit Analyst", "Risk Analyst"], extraRoles: 1, icon: Landmark, iconBg: "bg-purple-50", iconColor: "text-purple-600", link: "Explore Banking Roles", bgGradient: "from-purple-50/50 to-white", path: "/jobs?search=Banking" },
  ];
  const handleCareerPathClick = (categoryTitle: string, path: string) => {
    track("Career Path Clicked", {
      category: categoryTitle,
      location: "homepage_career_paths",
      timestamp: new Date().toISOString(),
    });
  };
  const handleBrowseAllClick = () => {
    track("Browse All Roles Clicked", {
      location: "homepage_career_paths",
      timestamp: new Date().toISOString(),
    });
  };
  return (
    <section className="py-12 bg-[#F8FAFC]" aria-labelledby="career-paths-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[280px] flex-shrink-0">
            <h2 id="career-paths-heading" className="text-2xl font-bold text-[#081B4B] leading-tight">
              Finance Careers Beyond <span className="text-[#2563EB]">Financial Analyst</span>
            </h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Discover entry-level roles across financial analysis, accounting, banking, and more.
            </p>
          </div>
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className={`bg-gradient-to-b ${item.bgGradient} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer block`}
                    onClick={() => handleCareerPathClick(item.title, item.path)}
                  >
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
                        <span className="mt-4 text-[#2563EB] font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2 transition-all group">
                          {item.link}
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="w-full flex justify-center lg:justify-start mt-6">
              <Link
                href="/jobs"
                className="px-6 py-2.5 bg-white border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-semibold text-sm hover:bg-blue-50 transition inline-block"
                onClick={handleBrowseAllClick}
              >
                Browse All Entry-Level Finance Roles →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ROADMAP + LEARNING + BLOGS
// ============================================
const RoadmapLearningSection = () => {
  const { track } = useTracking();
  const learningTags = [
    { name: "Finance Fundamentals", icon: GraduationCap },
    { name: "Advanced Excel", icon: FileSpreadsheet },
    { name: "Financial Analysis", icon: TrendingUp },
    { name: "Power BI", icon: BarChart3 },
    { name: "Business Communication", icon: MessageCircle },
  ];
  const blogPosts = [
    { title: "Stop Sending Cold DMs That Get Ignored", readTime: "8 min read", category: "Career Advice", slug: "stop-sending-cold-dms", image: "/blog-cold-dms.png" },
    { title: "How to Become a Financial Analyst in India", readTime: "8 min read", category: "Career Guide", slug: "how-to-become-a-financial-analyst", image: "/blog-financial-analyst.png" },
  ];
  const go = (event: string, path: string, extra: Record<string, unknown> = {}) => {
    track(event, { location: "homepage_learning_section", timestamp: new Date().toISOString(), ...extra });
  };
  return (
    <section className="py-12 bg-[#F8FAFC]" aria-labelledby="learning-heading">
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="learning-heading" className="sr-only">Learning resources and career blogs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <GraduationCap size={16} className="text-blue-600" />
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Proven Path</p>
            </div>
            <h3 className="text-xl font-bold text-[#081B4B]">Your Roadmap to Becoming a Financial Analyst</h3>
            <p className="text-[11px] text-slate-500 mt-1 relative z-10 leading-relaxed">
              Follow this step-by-step guide — from learning fundamentals to landing your first role.
            </p>
            <div className="relative z-10 mt-1 w-full flex justify-start">
              <Image src="/steps.png" alt="Step-by-step financial analyst career roadmap" width={220} height={120} quality={100} className="object-contain" />
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="/learning-hub"
                className="px-3 py-2 bg-blue-600 text-white rounded-xl font-medium text-[11px] hover:bg-blue-700 transition-all inline-flex items-center"
                onClick={() => go("Learning Hub Clicked", "/learning-hub", { source: "get_resources_button" })}
              >
                Get Free Learning Resources →
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
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
                  <Link
                    key={item.name}
                    href={`/learning-hub?topic=${encodeURIComponent(item.name)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => go("Learning Tag Clicked", `/learning-hub?topic=${encodeURIComponent(item.name)}`, { tagName: item.name })}
                  >
                    <Icon size={12} className="text-blue-500" />{item.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold text-[#081B4B] uppercase tracking-wide">Career-Focused Learning Path</p>
              <h4 className="text-xl font-bold text-[#081B4B] mt-1">Ready to Start Your Journey?</h4>
              <div className="flex items-end justify-between mt-4">
                <div className="flex flex-col gap-6">
                  <Link
                    href="/learning-hub"
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all inline-block text-center"
                    onClick={() => go("Start Learning Clicked", "/learning-hub", { source: "start_learning_button" })}
                  >
                    Start Learning Now →
                  </Link>
                  <Link
                    href="/learning-hub"
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all inline-block text-center"
                    onClick={() => go("Explore All Topics Clicked", "/learning-hub")}
                  >
                    Explore All Topics →
                  </Link>
                </div>
                <Image src="/learning-books.png" alt="Free finance learning resources" width={140} height={100} className="object-contain" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Fresh Insights</p>
              <Sparkles size={16} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-[#081B4B]">Insights, stories, and tools for building your finance career</h3>
            <p className="text-sm text-slate-500 mt-2">Expert career advice, interview tips, and practical finance guides.</p>
            <div className="space-y-4 mt-4 flex-1">
              {blogPosts.map((blog, index) => (
                <Link
                  key={index}
                  href={`/blogs/${blog.slug}`}
                  className="flex gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors block"
                  onClick={() => go("Blog Clicked", `/blogs/${blog.slug}`, { blogTitle: blog.title, blogSlug: blog.slug })}
                >
                  <div className="w-32 h-24 rounded-xl bg-white border border-slate-100 flex-shrink-0 overflow-hidden p-1">
                    <Image src={blog.image} alt={blog.title} width={160} height={128} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#081B4B] text-sm leading-tight">{blog.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{blog.category} • {blog.readTime}</p>
                    <span className="text-blue-600 text-xs font-medium mt-1 hover:underline inline-block">Read full article →</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/blogs"
              className="w-full mt-4 border border-blue-600 text-blue-600 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all inline-block text-center"
              onClick={() => go("Explore All Blogs Clicked", "/blogs")}
            >
              Explore All Blogs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIAL
// ============================================
const TestimonialSection = () => {
  const { track } = useTracking();
  
  const handleTestimonialClick = (name: string) => {
    track("Testimonial Viewed", {
      user: name,
      location: "homepage_testimonials",
      timestamp: new Date().toISOString(),
    });
  };

  const testimonials = [
    {
      name: "Sneha Suresh",
      role: "B.Com Student",
      testimonial: "Finlysta exceeded my expectations with their professional resume and LinkedIn profile updates. They didn't just make changes—they provided valuable guidance that helped me understand what recruiters actually look for. The personalized support and attention to detail throughout the process gave me confidence in my job search. I'm truly grateful for their help in enhancing my professional presence.",
      linkedin: "https://www.linkedin.com/in/sneha-suresh-70a537411",
      image: "/Userprofile1.png",
      verified: true
    },
    {
      name: "Khushi",
      role: "BBA Student",
      testimonial: "Finlysta helped me build an ATS-friendly resume, improve my LinkedIn profile, and guided me through a structured learning roadmap that made my career journey much clearer.",
      linkedin: null,
      image: "/Userprofile.png",
      verified: true
    }
  ];

  return (
    <section className="py-12 bg-[#F8FAFC]" aria-label="Student testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <p className="text-sm font-bold text-[#081B4B] bg-blue-50 px-4 py-1.5 rounded-full">Loved by Finance Freshers</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-100 rounded-xl px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" 
              onClick={() => handleTestimonialClick(testimonial.name)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image 
                    src={testimonial.image} 
                    alt={`${testimonial.name}, ${testimonial.role}`} 
                    width={48} 
                    height={48} 
                    className="rounded-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-1 mb-1">
                    <span className="text-amber-400 text-lg">⭐</span>
                    <span className="text-amber-400 text-lg">⭐</span>
                    <span className="text-amber-400 text-lg">⭐</span>
                    <span className="text-amber-400 text-lg">⭐</span>
                    <span className="text-amber-400 text-lg">⭐</span>
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed">
                    {testimonial.testimonial}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[12px] font-semibold text-[#081B4B]">— {testimonial.name}</p>
                        {testimonial.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <BadgeCheck size={10} className="text-green-500" />
                            Verified Student
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{testimonial.role}</p>
                    </div>
                    {testimonial.linkedin && (
                      <a 
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          track("LinkedIn Profile Clicked", {
                            user: testimonial.name,
                            location: "homepage_testimonials"
                          });
                        }}
                        className="flex items-center gap-1.5 text-[11px] text-[#0A66C2] hover:text-[#0A66C2]/80 font-medium transition-colors flex-shrink-0"
                        aria-label={`View ${testimonial.name}'s LinkedIn profile`}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                          className="text-[#0A66C2]"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>View Profile</span>
                        <ArrowRight size={12} className="text-[#0A66C2] ml-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ
// ============================================
const FAQCTASection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { track } = useTracking();
  const faqs = [
    { q: "How is Finlysta different from traditional job portals?", a: "Unlike traditional portals, Finlysta focuses only on entry-level finance roles. Every listing is manually reviewed — no ghost jobs, no spam, no irrelevant senior positions." },
    { q: "Are the jobs on Finlysta verified?", a: "Yes. Every job and internship listed on Finlysta is manually reviewed to help students avoid fake listings." },
    { q: "What kind of finance jobs are available on Finlysta?", a: "Finlysta features entry-level finance roles including Finance Executive, Finance Associate, Accounts Executive, MIS Executive, Audit Associate, Tax Associate, and Accounting roles." },
    { q: "Who can use Finlysta?", a: "Finlysta is designed for finance students, graduates, and career-switchers looking for entry-level positions." },
    { q: "Can freshers apply for jobs on Finlysta?", a: "Absolutely. Finlysta is built specifically for students, graduates, and first-time job seekers." },
    { q: "Is Finlysta really free?", a: "Yes — 100% free for job seekers. Always." },
  ];
  const handleFAQToggle = (question: string, isOpen: boolean) => {
    track("FAQ Toggled", {
      question,
      action: isOpen ? "opened" : "closed",
      location: "homepage_faq_section",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section className="py-16 bg-[#F8FAFC]" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <p className="text-sm font-bold text-[#2563EB] mb-2">Frequently Asked Questions</p>
            <h2 id="faq-heading" className="text-3xl font-bold text-[#081B4B] mb-6">
              Everything You Need to Know About Finlysta
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const questionId = `faq-question-${idx}`;
                const answerId = `faq-answer-${idx}`;
                return (
                  <div key={idx} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => {
                        const opening = !isOpen;
                        setOpenIndex(opening ? idx : null);
                        handleFAQToggle(faq.q, opening);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-[#081B4B]">{faq.q}</span>
                      <span className="text-[#2563EB] text-lg font-bold ml-4 flex-shrink-0">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div id={answerId} role="region" aria-labelledby={questionId} className="px-4 pb-3">
                        <p className="text-xs text-[#081B4B] leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-8 lg:mt-16">
            <div className="w-full max-w-2xl">
              <Image src="/faq.png" alt="Frequently asked questions about Finlysta finance jobs and internships" width={640} height={480} className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SCHEMA DEFINITIONS
// ============================================
const popularRoles = [
  { name: "Financial Analyst" },
  { name: "Investment Banking" },
  { name: "Credit Analyst" },
  { name: "Risk Analyst" },
  { name: "Article Trainee" },
  { name: "Article Assistant" },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Finlysta",
  url: "https://finlysta.com",
  logo: "https://finlysta.com/Finlysta.png",
  description: "The job board built exclusively for entry-level financial roles and internships in India.",
  sameAs: [
    "https://www.linkedin.com/company/finlysta",
    "https://twitter.com/Finlysta",
    "https://instagram.com/finlysta.in",
    "https://facebook.com/finlysta",
    "https://youtube.com/@finlysta",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@finlysta.com",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Finance Jobs & Internships for Freshers in India | Finlysta",
  description: "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
  url: "https://finlysta.com",
  about: {
    "@type": "Thing",
    name: "Entry-Level Finance Careers in India",
  },
  audience: {
    "@type": "Audience",
    name: "Finance students and fresh graduates in India",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Finlysta",
    url: "https://finlysta.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Finlysta",
  url: "https://finlysta.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://finlysta.com/jobs?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://finlysta.com/",
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Popular Entry-Level Finance Roles",
  description: "Most popular entry-level finance roles for freshers in India",
  itemListElement: popularRoles.map((role, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: role.name,
    url: `https://finlysta.com/jobs?search=${encodeURIComponent(role.name)}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Finlysta different from traditional job portals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike traditional portals, Finlysta focuses only on entry-level finance roles. Every listing is manually reviewed — no ghost jobs, no spam, no irrelevant senior positions."
      }
    },
    {
      "@type": "Question",
      name: "Are the jobs on Finlysta verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every job and internship listed on Finlysta is manually reviewed to help students avoid fake listings."
      }
    },
    {
      "@type": "Question",
      name: "What kind of finance jobs are available on Finlysta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finlysta features entry-level finance roles including Finance Executive, Finance Associate, Accounts Executive, MIS Executive, Audit Associate, Tax Associate, and Accounting roles."
      }
    },
    {
      "@type": "Question",
      name: "Who can use Finlysta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finlysta is designed for finance students, graduates, and career-switchers looking for entry-level positions."
      }
    },
    {
      "@type": "Question",
      name: "Can freshers apply for jobs on Finlysta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Finlysta is built specifically for students, graduates, and first-time job seekers."
      }
    },
    {
      "@type": "Question",
      name: "Is Finlysta really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 100% free for job seekers. Always."
      }
    }
  ]
};

// All schemas combined into a single array
const allSchemas = [
  organizationSchema,
  webpageSchema,
  websiteSchema,
  breadcrumbSchema,
  itemListSchema,
  faqSchema,
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function HomePageContent() {
  const { track } = useTracking();

  useEffect(() => {
    track("Homepage Viewed", {
      page: "home",
      timestamp: new Date().toISOString(),
      userType: "visitor",
      url: window.location.pathname,
    });
    trackPageView("/");
  }, [track]);

  const handleHeroCTA = useCallback((buttonType: string) => {
    track("Hero CTA Clicked", {
      buttonType,
      location: "hero_section",
      timestamp: new Date().toISOString(),
    });
  }, [track]);

  const handlePopularRoleClick = (roleName: string) => {
    track("Popular Role Clicked", {
      roleName,
      location: "homepage_popular_roles",
      timestamp: new Date().toISOString(),
    });
  };

  const handleFooterLinkClick = (linkType: string, linkName: string) => {
    track("Footer Link Clicked", {
      linkType,
      linkName,
      location: "footer",
      timestamp: new Date().toISOString(),
    });
  };

  const handleSocialClick = (platform: string) => {
    track("Social Media Clicked", {
      platform,
      location: "footer",
      timestamp: new Date().toISOString(),
    });
  };

  const popularRolesList = [
    { name: "Financial Analyst", icon: Briefcase },
    { name: "Investment Banking", icon: Building2 },
    { name: "Credit Analyst", icon: Shield },
    { name: "Risk Analyst", icon: TrendingUp },
    { name: "Article Trainee", icon: FileText },
    { name: "Article Assistant", icon: GraduationCap },
  ];

  const socials = [
    { platform: "linkedin", href: "https://www.linkedin.com/company/finlysta", label: "Finlysta on LinkedIn", hover: "hover:bg-[#0077B5]", node: <Linkedin size={16} /> },
    { platform: "twitter", href: "https://twitter.com/Finlysta", label: "Finlysta on Twitter", hover: "hover:bg-[#1DA1F2]", node: <Twitter size={16} /> },
    { platform: "instagram", href: "https://instagram.com/finlysta.in", label: "Finlysta on Instagram", hover: "hover:bg-[#E4405F]", node: <Instagram size={16} /> },
    { platform: "facebook", href: "https://facebook.com/finlysta", label: "Finlysta on Facebook", hover: "hover:bg-[#1877F2]", node: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
    { platform: "youtube", href: "https://youtube.com/@finlysta", label: "Finlysta on YouTube", hover: "hover:bg-[#FF0000]", node: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
  ];

  return (
    <div className="min-h-screen font-sans" suppressHydrationWarning>
      {/* JSON-LD structured data */}
      {allSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-white border-b border-slate-200 pt-10 pb-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">
              <div className="flex-1 z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 mb-6">
                  <BadgeCheck size={14} className="text-blue-600" aria-hidden="true" />
                  <span className="font-semibold text-blue-700 text-xs uppercase tracking-wide">Built for Finance Freshers</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold leading-[1.15] tracking-tight text-[#081B4B]">
                  Finance Jobs &amp; Internships <span className="text-blue-600">for Freshers in India</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-[500px]">
                  Entry-level finance jobs, internships, career roadmaps, and learning resources — built exclusively for finance students and fresh graduates.{" "}
                  <span className="font-semibold text-[#081B4B]">100% free.</span>
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link
                    href="/jobs"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-7 py-3 font-semibold text-base transition-colors inline-flex items-center gap-2"
                    onClick={() => handleHeroCTA("find_job")}
                  >
                    Find My First Job <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/internships"
                    className="bg-white hover:bg-slate-50 text-[#081B4B] rounded-lg px-7 py-3 font-semibold text-base border border-slate-300 transition-colors inline-flex items-center gap-2"
                    onClick={() => handleHeroCTA("explore_internships")}
                  >
                    Explore Internships
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end">
                <Image
                  src="/herostudent.png"
                  alt="Finance student and fresh graduate ready to start their career in India"
                  width={820}
                  height={820}
                  priority
                  className="w-full max-w-[420px] lg:max-w-[520px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Roles */}
        <nav aria-label="Popular entry-level roles" className="w-full border-t border-b border-gray-100 bg-white py-4 mt-8">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <span className="text-[15px] font-semibold text-[#0F172A]">Popular Entry-Level Roles:</span>
            {popularRolesList.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href={`/jobs?search=${encodeURIComponent(name)}`}
                className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => handlePopularRoleClick(name)}
              >
                <Icon className="w-5 h-5 text-[#2563EB]" />
                <span className="text-[15px] font-medium">{name}</span>
              </Link>
            ))}
            <Link href="/jobs" aria-label="View more popular roles" className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center flex-shrink-0 hover:bg-blue-100 transition-colors">
              <ChevronRight className="w-4 h-4 text-[#2563EB]" />
            </Link>
          </div>
        </nav>

        <StatsSection />
        <TestimonialSection />
        <TrendingInternships />
        <SkillsSection />
        <ExcelFunctionsSection />
        <FinanceCareerPaths />
        <RoadmapLearningSection />
        <FAQCTASection />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-12 pb-8">
            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between gap-8">
              {/* Brand */}
              <div className="min-w-[260px] flex-shrink-0 space-y-4">
                <Link href="/" className="flex items-center" onClick={() => handleFooterLinkClick("internal", "logo")}>
                  <Image 
                    src="/Finlysta.png" 
                    alt="Finlysta logo" 
                    width={180} 
                    height={40} 
                    priority 
                    className="object-contain" 
                  />
                </Link>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                  The job board built exclusively for entry-level financial roles and internships in India.
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} onClick={() => handleSocialClick(s.platform)} className={`w-9 h-9 bg-slate-100 text-slate-600 ${s.hover} hover:text-white rounded-lg flex items-center justify-center transition-all`}>
                      {s.node}
                    </a>
                  ))}
                </div>
              </div>

              {/* Jobs */}
              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Jobs</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/jobs" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "all_jobs")}>All Jobs</Link></li>
                  <li><Link href="/internships" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "internships")}>Internships</Link></li>
                  <li><Link href="/blogs" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "career_blogs")}>Career Blogs</Link></li>
                </ul>
              </div>

              {/* Employers */}
              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Employers</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/employers/post-job" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "post_job")}>Post a Job Free</Link></li>
                  <li><Link href="/employers/how-it-works" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "how_it_works")}>How It Works</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Resources</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/learning-hub" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "learning_hub")}>Learning Hub</Link></li>
                  <li><Link href="/interview-prep" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "interview_prep")}>Interview Prep</Link></li>
                  <li><Link href="/guides" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "guides")}>Guides</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Company</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/about" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "about")}>About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "contact")}>Contact Us</Link></li>
                  <li><Link href="/privacy" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "privacy")}>Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("internal", "terms")}>Terms</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Contact</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <a href="mailto:support@finlysta.com" className="flex items-center gap-2 hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick("external", "support_email")}>
                    <Mail size={13} /> support@finlysta.com
                  </a>
                  <p className="text-xs text-slate-500">Reply within 24 hours</p>
                  <address className="not-italic text-xs text-slate-500 leading-relaxed mt-2">
                    Finlysta<br />
                    Near Smart Bazzar, Barbil<br />
                    Odisha 758035<br />
                    India
                  </address>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-200 pt-6 pb-8 mt-8">
              <div className="flex flex-col items-center justify-center gap-2 text-sm text-slate-700 text-center">
                <span>© {new Date().getFullYear()} Finlysta. All rights reserved.</span>
                <div className="flex items-center gap-1.5">
                  <span>Made with</span>
                  <Heart size={12} className="text-red-500 fill-red-500" />
                  <span>in India 🇮🇳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}