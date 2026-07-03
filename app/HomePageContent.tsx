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
  FileSpreadsheet, FileText, ClipboardList, MessageSquare, Eye, BarChart4, Gift,
  User, Phone, MapPin as MapPinIcon, Mail as MailIcon
} from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import TrendingInternships from "@/components/TrendingOpportunities";
import { useTracking } from "@/hooks/useTracking";
import { trackPageView, trackJobView } from "@/lib/analytics/tracking";

const HelpCircle = ({ size, className }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const SkillsSection = () => {
  const { track } = useTracking();
  
  const skills = [
    { icon: FileSpreadsheet, title: "Advanced Excel", subtitle: "Pivot Tables, VLOOKUP,\nExcel Functions", color: "text-green-600", bg: "bg-green-50" },
    { icon: FileText, title: "Financial Statements", subtitle: "Balance Sheet, P&L,\nCash Flow", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Calculator, title: "Accounting Fundamentals", subtitle: "Journal Entries,\nDebit & Credit", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: ClipboardList, title: "Financial Reporting", subtitle: "Financial Reports,\nGAAP, IFRS", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: BarChart3, title: "Financial Analysis", subtitle: "Ratio Analysis,\nVariance Analysis", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: MessageSquare, title: "Business Communication", subtitle: "Presentations,\nClient Communication", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  const handleSkillClick = (skillTitle: string) => {
    track('Skill Clicked', {
      skillName: skillTitle,
      location: 'homepage_skills_section',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section className="py-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="text-left mb-6">
              <p className="text-sm font-semibold text-[#2563EB] mb-2">Skills That Get You Hired</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Master In-Demand Finance Skills</h2>
              <p className="mt-2 text-md text-slate-700">Top skills recruiters look for in entry-level finance roles</p>
            </div>
           <div className="overflow-hidden">
            <div className="w-full">
                <div className="flex">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div 
                        key={index} 
                        className="flex-1 text-center px-1 pb-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleSkillClick(skill.title)}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${skill.bg}`}>
                            <Icon className={`w-4 h-4 ${skill.color}`} />
                          </div>
                          <span className="text-[12px] font-bold text-[#081B4B] leading-tight whitespace-nowrap">{skill.title}</span>
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
// STATS SECTION - With Opportunities (replacing Sessions)
// ============================================
const StatsSection = () => {
  const { track } = useTracking();
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalOpportunities: 0,
    isLoading: true,
  });

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setStats({
            totalVisitors: result.data.totalVisitors || 0,
            totalOpportunities: result.data.totalOpportunities || 0,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr+`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L+`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return `${num}+`;
  };

  const statsData = [
    { 
      value: stats.isLoading ? '...' : formatNumber(stats.totalVisitors),
      label: "Visitors", 
      description: "Students exploring finance careers with us",
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      value: stats.isLoading ? '...' : formatNumber(stats.totalOpportunities),
      label: "Opportunities", 
      description: "Jobs & internships available",
      icon: Briefcase, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50" 
    },
    { 
      value: "Learning", 
      label: "Hub", 
      description: "Essential finance knowledge to build your career",
      icon: BookOpen, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
    { 
      value: "100%", 
      label: "Free Access", 
      description: "Everything on Finlysta is completely free",
      icon: Gift, 
      color: "text-orange-500", 
      bg: "bg-orange-50" 
    },
  ];

  const handleStatClick = (statLabel: string) => {
    track('Statistic Viewed', {
      statName: statLabel,
      location: 'homepage_stats_section',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 px-4 py-4 md:py-0 ${
                    index > 0 ? "border-l border-slate-200" : ""
                  } cursor-pointer hover:bg-slate-50 transition-colors rounded-lg`}
                  onClick={() => handleStatClick(stat.label)}
                >
                  <div className={`w-16 h-16 rounded-full ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={30} className={stat.color} />
                  </div>

                  <div>
                    <h3 className="text-4xl font-bold text-[#081B4B]">
                      {stat.value}
                    </h3>
                    <p className="font-semibold text-black text-lg">
                      {stat.label}
                    </p>
                    <p className="text-md text-slate-700 mt-0.5">
                      {stat.description}
                    </p>
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
// FINANCE CAREER PATHS
// ============================================
const FinanceCareerPaths = () => {
  const { track } = useTracking();
  const router = useRouter();

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
      bgGradient: "from-blue-50/50 to-white",
      path: "/jobs?search=Finance"
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
      bgGradient: "from-green-50/50 to-white",
      path: "/jobs?search=Accounting"
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
      bgGradient: "from-purple-50/50 to-white",
      path: "/jobs?search=Banking"
    },
  ];

  const handleCareerPathClick = (categoryTitle: string, path: string) => {
    track('Career Path Clicked', {
      category: categoryTitle,
      location: 'homepage_career_paths',
      timestamp: new Date().toISOString(),
    });
    router.push(path);
  };

  const handleBrowseAllClick = () => {
    track('Browse All Roles Clicked', {
      location: 'homepage_career_paths',
      timestamp: new Date().toISOString(),
    });
    router.push('/jobs');
  };

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
                  <div 
                    key={index} 
                    className={`bg-gradient-to-b ${item.bgGradient} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
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
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCareerPathClick(item.title, item.path);
                          }}
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
                <button 
                  onClick={handleBrowseAllClick}
                  className="px-6 py-2.5 bg-white border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-semibold text-sm hover:bg-blue-50 transition"
                >
                  Browse All Entry-Level Finance Roles →
                </button>
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
  const { track } = useTracking();

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

  const handleLearningHubClick = () => {
    track('Learning Hub Clicked', {
      location: 'homepage_learning_section',
      source: 'get_resources_button',
      timestamp: new Date().toISOString(),
    });
    router.push('/learning-hub');
  };

  const handleExploreAllTopicsClick = () => {
    track('Explore All Topics Clicked', {
      location: 'homepage_learning_section',
      timestamp: new Date().toISOString(),
    });
    router.push('/learning-hub');
  };

  const handleStartLearningClick = () => {
    track('Start Learning Clicked', {
      location: 'homepage_learning_section',
      source: 'start_learning_button',
      timestamp: new Date().toISOString(),
    });
    router.push('/learning-hub');
  };

  const handleBlogClick = (blogTitle: string, blogSlug: string) => {
    track('Blog Clicked', {
      blogTitle: blogTitle,
      blogSlug: blogSlug,
      location: 'homepage_blogs_section',
      timestamp: new Date().toISOString(),
    });
    router.push(`/blogs/${blogSlug}`);
  };

  const handleExploreAllBlogsClick = () => {
    track('Explore All Blogs Clicked', {
      location: 'homepage_blogs_section',
      timestamp: new Date().toISOString(),
    });
    router.push('/blogs');
  };

  const handleLearningTagClick = (tagName: string) => {
    track('Learning Tag Clicked', {
      tagName: tagName,
      location: 'homepage_learning_section',
      timestamp: new Date().toISOString(),
    });
    router.push(`/learning-hub?topic=${encodeURIComponent(tagName)}`);
  };

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
              <button 
                onClick={handleLearningHubClick}
                className="px-3 py-2 bg-blue-600 text-white rounded-xl font-medium text-[11px] hover:bg-blue-700 transition-all inline-flex"
              >
                Get Free Learning Resources →
              </button>
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
                  <span 
                    key={item.name} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleLearningTagClick(item.name)}
                  >
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
                  <button 
                    onClick={handleStartLearningClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all"
                  >
                    Start Learning Now →
                  </button>
                  <button 
                    onClick={handleExploreAllTopicsClick}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all"
                  >
                    Explore All Topics →
                  </button>
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
                <div 
                  key={index} 
                  className="flex gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors"
                  onClick={() => handleBlogClick(blog.title, blog.slug)}
                >
                  <div className="w-32 h-24 rounded-xl bg-white border border-slate-100 flex-shrink-0 overflow-hidden p-1">
                    <Image src={blog.image} alt={blog.title} width={160} height={128} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#081B4B] text-sm leading-tight">{blog.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{blog.category} • {blog.readTime}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlogClick(blog.title, blog.slug);
                      }}
                      className="text-blue-600 text-xs font-medium mt-1 hover:underline"
                    >
                      Read full article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={handleExploreAllBlogsClick}
              className="w-full mt-4 border border-blue-600 text-blue-600 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all"
            >
              Explore All Blogs →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const { track } = useTracking();

  const handleTestimonialClick = () => {
    track('Testimonial Viewed', {
      user: 'Khushi',
      role: 'BBA Student',
      location: 'homepage_testimonials',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <p className="text-sm font-bold text-[#081B4B] bg-blue-50 px-4 py-1.5 rounded-full">
            Loved by Finance Freshers
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div 
            className="bg-white border border-slate-100 rounded-xl px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={handleTestimonialClick}
          >
            <div className="flex items-start gap-4">
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
    track('FAQ Toggled', {
      question: question,
      action: isOpen ? 'opened' : 'closed',
      location: 'homepage_faq_section',
      timestamp: new Date().toISOString(),
    });
  };

  const handleFAQClick = (question: string, answer: string) => {
    track('FAQ Viewed', {
      question: question,
      location: 'homepage_faq_section',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <section className="py-16 bg-[#F8FAFC]">
      {/* FAQPage structured data helps FAQ answers surface directly in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="flex flex-col">
            <p className="text-sm font-bold text-[#2563EB] mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl font-bold text-[#081B4B] mb-6">Everything You Need to Know About Finlysta</h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const questionId = `faq-question-${idx}`;
                const answerId = `faq-answer-${idx}`;
                return (
                  <div key={idx} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                    <button
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => {
                        const newState = isOpen ? null : idx;
                        setOpenIndex(newState);
                        handleFAQToggle(faq.q, !isOpen);
                        if (!isOpen) {
                          handleFAQClick(faq.q, faq.a);
                        }
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-[#081B4B]">{faq.q}</span>
                      <span className="text-[#2563EB] text-lg font-bold ml-4 flex-shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
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
  const { track } = useTracking();

  // Track homepage view with both systems
  useEffect(() => {
    // Track with existing tracking system
    track('Homepage Viewed', {
      page: 'home',
      timestamp: new Date().toISOString(),
      userType: 'visitor',
      url: window.location.pathname,
    });

    // Track with new analytics system
    trackPageView('/');
  }, []);

  // Track hero section interactions
  const handleHeroCTA = (buttonType: string) => {
    track('Hero CTA Clicked', {
      buttonType: buttonType,
      location: 'hero_section',
      timestamp: new Date().toISOString(),
    });
    
    if (buttonType === 'find_job') {
      router.push('/jobs');
    } else if (buttonType === 'explore_internships') {
      router.push('/internships');
    }
  };

  // Track popular role clicks
  const handlePopularRoleClick = (roleName: string) => {
    track('Popular Role Clicked', {
      roleName: roleName,
      location: 'homepage_popular_roles',
      timestamp: new Date().toISOString(),
    });
    
    router.push(`/jobs?search=${encodeURIComponent(roleName)}`);
  };

  // Track footer interactions
  const handleFooterLinkClick = (linkType: string, linkName: string) => {
    track('Footer Link Clicked', {
      linkType: linkType,
      linkName: linkName,
      location: 'footer',
      timestamp: new Date().toISOString(),
    });
  };

  // Track social media clicks
  const handleSocialClick = (platform: string) => {
    track('Social Media Clicked', {
      platform: platform,
      location: 'footer',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Finlysta",
            url: "https://www.finlysta.com",
            logo: "https://www.finlysta.com/Finlysta.png",
            description:
              "The job board built exclusively for entry-level financial roles and internships in India.",
            sameAs: [
              "https://www.linkedin.com/company/finlysta",
              "https://twitter.com/Finlysta",
              "https://instagram.com/finlysta.in",
              "https://facebook.com/finlysta",
              "https://youtube.com/@finlysta"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              email: "support@finlysta.com",
              contactType: "customer service",
              availableLanguage: ["English", "Hindi"]
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Finance District",
              addressLocality: "Bhubaneswar",
              addressRegion: "Odisha",
              postalCode: "751001",
              addressCountry: "IN"
            }
          }),
        }}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Finlysta",
            "image": "https://www.finlysta.com/Finlysta.png",
            "description": "The job board built exclusively for entry-level financial roles and internships in India.",
            "url": "https://www.finlysta.com",
            "email": "support@finlysta.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Finance District",
              "addressLocality": "Bhubaneswar",
              "addressRegion": "Odisha",
              "postalCode": "751001",
              "addressCountry": "IN"
            },
            "priceRange": "₹",
            "openingHours": "Mo-Fr 09:00-18:00",
            "sameAs": [
              "https://www.linkedin.com/company/finlysta",
              "https://twitter.com/Finlysta",
              "https://instagram.com/finlysta.in",
              "https://facebook.com/finlysta",
              "https://youtube.com/@finlysta"
            ],
            "areaServed": "IN"
          }),
        }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Finlysta",
            "url": "https://www.finlysta.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.finlysta.com/jobs?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      <Header />

      <main>
        {/* 1. HERO SECTION */}
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
                  <button 
                    onClick={() => handleHeroCTA('find_job')}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 py-3.5 font-semibold text-base transition-all shadow-lg shadow-blue-200"
                  >
                    Find My First Job →
                  </button>
                  <button 
                    onClick={() => handleHeroCTA('explore_internships')}
                    className="bg-white hover:bg-blue-50 text-blue-600 rounded-2xl px-8 py-3.5 font-semibold text-base border-2 border-blue-600 transition-all"
                  >
                    Explore Internships →
                  </button>
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

        {/* 2. POPULAR ENTRY-LEVEL ROLES */}
        <div className="w-full border-t border-b border-gray-100 bg-white py-4 mt-8">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <span className="text-[15px] font-semibold text-[#0F172A]">Popular Entry-Level Roles:</span>
            <div 
              className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handlePopularRoleClick('Financial Analyst')}
            >
              <Briefcase className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] font-medium">Financial Analyst</span>
            </div>
            <div 
              className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handlePopularRoleClick('Investment Banking')}
            >
              <Building2 className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] font-medium">Investment Banking</span>
            </div>
            <div 
              className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handlePopularRoleClick('Credit Analyst')}
            >
              <Shield className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] font-medium">Credit Analyst</span>
            </div>
            <div 
              className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handlePopularRoleClick('Risk Analyst')}
            >
              <TrendingUp className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] font-medium">Risk Analyst</span>
            </div>
            <div 
              className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handlePopularRoleClick('Article Trainee')}
            >
              <FileText className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] font-medium">Article Trainee</span>
            </div>
            <div 
              className="flex items-center gap-2 text-[#0F172A] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handlePopularRoleClick('Article Assistant')}
            >
              <GraduationCap className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] font-medium">Article Assistant</span>
            </div>
            <button 
              className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center flex-shrink-0 hover:bg-blue-100 transition-colors"
              aria-label="View more popular roles"
              onClick={() => {
                track('Popular Roles Scroll Clicked', {
                  location: 'homepage_popular_roles',
                  timestamp: new Date().toISOString(),
                });
              }}
            >
              <ChevronRight className="w-4 h-4 text-[#2563EB]" />
            </button>
          </div>
        </div>

        {/* 3. STATS SECTION */}
        <StatsSection />

        {/* 4. LATEST OPPORTUNITIES */}
        <TrendingInternships />
        
        {/* 5. LEARNING HUB */}
        <SkillsSection />
        
        {/* 6. CAREER PATHS */}
        <FinanceCareerPaths />
        
        {/* 7. BLOGS */}
        <RoadmapLearningSection />
        
        {/* 8. TESTIMONIAL */}
        <TestimonialSection />
        
        {/* 9. FAQ */}
        <FAQCTASection />
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-12 pb-8">
            <div className="flex flex-nowrap justify-between gap-6">

              <div className="min-w-[260px] flex-shrink-0 space-y-4">
                <Link 
                  href="/" 
                  className="flex items-center"
                  onClick={() => handleFooterLinkClick('internal', 'logo')}
                >
                  <Image src="/Finlysta.png" alt="Finlysta Logo" width={180} height={40} priority className="object-contain" />
                </Link>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                  The job board built exclusively for entry-level financial roles and internships in India.
                </p>
                {/* REMOVED: Business Contact Information - email, address, reply time removed from here */}
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-black rounded-lg flex items-center justify-center transition-all"
                    aria-label="Finlysta on LinkedIn"
                    onClick={() => handleSocialClick('linkedin')}
                  >
                    <Linkedin size={16} />
                  </a>
                  <a 
                    href="https://twitter.com/Finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-black rounded-lg flex items-center justify-center transition-all"
                    aria-label="Finlysta on Twitter"
                    onClick={() => handleSocialClick('twitter')}
                  >
                    <Twitter size={16} />
                  </a>
                  <a 
                    href="https://instagram.com/finlysta.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#E4405F] hover:text-black rounded-lg flex items-center justify-center transition-all"
                    aria-label="Finlysta on Instagram"
                    onClick={() => handleSocialClick('instagram')}
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href="https://facebook.com/finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#1877F2] hover:text-black rounded-lg flex items-center justify-center transition-all"
                    aria-label="Finlysta on Facebook"
                    onClick={() => handleSocialClick('facebook')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a 
                    href="https://youtube.com/@finlysta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#FF0000] hover:text-black rounded-lg flex items-center justify-center transition-all"
                    aria-label="Finlysta on YouTube"
                    onClick={() => handleSocialClick('youtube')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>

              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Jobs</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/jobs" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'all_jobs')}>
                      All Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/internships" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'internships')}>
                      Internships
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs?type=remote" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'remote_jobs')}>
                      Remote Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'career_blogs')}>
                      Career Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Employers</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/employers/post-job" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'post_job')}>
                      Post a Job Free
                    </Link>
                  </li>
                  <li>
                    <Link href="/employers/how-it-works" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'how_it_works')}>
                      How It Works
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Resources</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/learning-hub" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'learning_hub')}>
                      Learning Hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/interview-prep" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'interview_prep')}>
                      Interview Prep
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Company</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/about" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'about')}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'contact')}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'privacy')}>
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-[#2563EB] transition" onClick={() => handleFooterLinkClick('internal', 'terms')}>
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex-shrink-0">
                <h4 className="font-bold text-sm mb-4 text-[#081B4B]">Support</h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:support@finlysta.com" 
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#2563EB] transition whitespace-nowrap"
                    onClick={() => handleFooterLinkClick('external', 'support_email')}
                  >
                    <Mail size={13} /> support@finlysta.com
                  </a>
                  {/* KEPT: Reply within 24 hours in Support section */}
                  <p className="text-xs text-slate-500 whitespace-nowrap">Reply within 24 hours</p>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-200 pt-6 pb-8 mt-8">
              <div className="flex flex-col items-center justify-center gap-2 text-sm text-slate-700 text-center">
                <span>© {new Date().getFullYear()} Finlysta Pvt. Ltd. All rights reserved.</span>
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
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}