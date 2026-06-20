// app/learning-hub/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ArrowRight, CheckCircle, Clock, BookOpen, Briefcase, FileText, GraduationCap, Shield, TrendingUp, Calculator, BarChart3, PieChart, Landmark, IndianRupee, MessageSquare, FileSpreadsheet, ChevronDown, X, ChevronRight } from "lucide-react";

// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (resourcesDropdownOpen && !target.closest(".resources-dropdown")) {
        setResourcesDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [resourcesDropdownOpen]);

  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchModalOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchModalOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/internships", label: "Internships" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/career-paths", label: "Career Paths" },
    { href: "/interview-prep", label: "Interview Prep" },
  ];

  const resourcesItems = [
    { href: "/blogs", label: "Blogs" },
    { href: "/guides", label: "Guides" },
    { href: "/templates", label: "Templates" },
    { href: "/webinars", label: "Webinars" },
    { href: "/case-studies", label: "Case Studies" },
  ];

  const noPrefetch = ["/blogs", "/learning-hub", "/interview-prep", "/career-paths"];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 font-sans antialiased ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
              aria-label="Finlysta - Finance Jobs and Internships for Freshers"
            >
              <Image
                src="/Finlysta.png"
                alt="Finlysta Logo"
                width={160}
                height={36}
                priority
                className="object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Navigation - Centered */}
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-center gap-10 lg:gap-12 absolute left-1/2 transform -translate-x-1/2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    prefetch={!noPrefetch.includes(link.href)}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive && link.label === "Learning Hub"
                        ? "text-blue-600"
                        : "text-black hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {isActive && link.label === "Learning Hub" && (
                    <div className="absolute top-full mt-1 left-0 right-0">
                     <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Resources Dropdown */}
            <div className="relative resources-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setResourcesDropdownOpen(!resourcesDropdownOpen);
                }}
                className={`flex items-center gap-1 text-base transition-colors duration-200 font-medium ${
                  resourcesDropdownOpen || pathname.startsWith("/resources")
                    ? "text-black"
                    : "text-black hover:text-blue-600"
                }`}
              >
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${resourcesDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setResourcesDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            >
              <Search size={18} className="text-gray-600" />
            </button>

            <Link
              href="/topics"
              className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Explore Topics
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black">Search</h3>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 rounded-lg"
              >
                <X size={22} className="text-black" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="p-5">
              <div className="flex items-center gap-4 bg-white border border-gray-300 rounded-2xl px-5 py-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <Search size={24} className="text-black flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for topics, skills or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-black placeholder:text-gray-500 text-lg font-medium"
                />
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#2563EB] text-white rounded-xl font-semibold text-base"
                >
                  Search
                </button>
              </div>
            </form>

            {searchQuery && (
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-600">
                  Press Enter or click Search to see results for "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// HERO SECTION COMPONENT
// ============================================
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="rounded-[28px] overflow-hidden">
      <div className="grid lg:grid-cols-2 items-center gap-6 px-6 lg:px-10 py-8 lg:py-10">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#081B4B] leading-tight">
            Learning Hub
          </h1>

          <h2 className="mt-2 md:mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
            Learn. Practice. Get Hired.
          </h2>

          <p className="mt-4 md:mt-5 text-base md:text-lg lg:text-xl text-[#081B4B] max-w-[520px] leading-relaxed">
            Explore finance topics, build practical knowledge and
            <br />
            strengthen your skills for real-world finance roles.
          </p>

          <form onSubmit={handleSearch} className="mt-6 md:mt-8 max-w-[560px]">
            <div className="flex w-full rounded-xl border-2 border-slate-300 overflow-hidden bg-white">
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for topics, skills or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-3 md:py-4 outline-none ring-0 border-0 focus:outline-none focus:ring-0 text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
              </div>
<button
  type="submit"
  className="px-6 md:px-10 py-4 bg-blue-600 text-white font-bold rounded-md"
>
  Search
</button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-gray-700 whitespace-nowrap">
              <BookOpen size={14} className="text-blue-600" /> 100% Free
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-gray-700 whitespace-nowrap">
              <TrendingUp size={14} className="text-blue-600" /> Just Topics
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-gray-700 whitespace-nowrap">
              <CheckCircle size={14} className="text-blue-600" /> Practical Learning
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-gray-700 whitespace-nowrap">
              <Clock size={14} className="text-blue-600" /> Learn at Your Pace
            </div>
          </div>
        </div>

        <div className="flex justify-start lg:justify-center mt-8 lg:mt-0 lg:-ml-8">
          <div className="relative w-full max-w-xl lg:max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 blur-3xl"></div>
            <Image
              src="/learning-hub.png"
              alt="Learning Hub Illustration"
              width={700}
              height={580}
              className="relative object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// EXPLORE BY TOPIC COMPONENT
// ============================================
const exploreTopics = [
  {
    title: "Advanced Excel",
    image: "/advanced-excel.png",
    description: "Learn formulas, functions, pivot tables, shortcuts and data analysis.",
    slug: "advanced-excel",
    isExplore: true
  },
  {
    title: "Accounting Fundamentals",
    image: "/accounting-fundamentals.png",
    description: "Understand accounting basics, journal entries, ledgers and trial balance.",
    slug: "accounting-basics",
    isExplore: false
  },
  {
    title: "Financial Analysis",
    image: "/financial-analysis.png",
    description: "Learn ratio analysis, trend analysis and financial modeling.",
    slug: "financial-analysis",
    isExplore: false
  },
  {
    title: "Financial Statements",
    image: "/financial-statements.png",
    description: "Understand Balance Sheet, P&L Statement, Cash Flow Statement and more.",
    slug: "financial-statements",
    isExplore: false
  },
  {
    title: "Banking & Finance",
    image: "/banking-finance.png",
    description: "Explore banking products, types of accounts, loans and interest concepts.",
    slug: "banking-finance",
    isExplore: false
  },
  {
    title: "Taxation Basics",
    image: "/taxation-basics.png",
    description: "Learn Income Tax, GST basics and TDS in a simple way.",
    slug: "taxation-basics",
    isExplore: false
  },
  {
    title: "Power BI",
    image: "/power-bi.png",
    description: "Build dashboards and visualize data using Power BI tools.",
    slug: "power-bi",
    isExplore: false
  },
  {
    title: "Business Communication",
    image: "/business-communication.png",
    description: "Improve email writing, presentation skills and workplace communication.",
    slug: "business-communication",
    isExplore: false
  },
];

const ExploreByTopic = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Explore by Topic</h2>
          <p className="text-slate-500 mt-1">Browse finance topics and build in-demand skills</p>
        </div>
        <Link href="/topics" className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
          View all topics <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
        {exploreTopics.map((topic) => (
          <div
            key={topic.slug}
            className="group bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer flex flex-col"
          >
            <div className="w-24 h-24 mb-3 flex items-center justify-center flex-shrink-0 mx-auto bg-white rounded-xl">
              <Image
                src={topic.image}
                alt={topic.title}
                width={96}
                height={96}
                className="object-contain w-full h-full"
              />
            </div>

            <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight text-center line-clamp-2 min-h-[44px]">
              {topic.title}
            </h3>

            <p className="text-sm text-slate-500 mb-3 leading-relaxed text-center line-clamp-3 min-h-[60px]">
              {topic.description}
            </p>

            {topic.isExplore ? (
              <Link
                href={`/learning-hub/topics/${topic.slug}`}
                className="text-[#2563EB] text-sm font-semibold flex items-center justify-center gap-1 mt-auto group-hover:gap-2 transition-all"
              >
                Explore <ArrowRight size={14} />
              </Link>
            ) : (
              <span className="text-slate-400 text-sm font-medium flex items-center justify-center gap-1 mt-auto">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// POPULAR TOPICS COMPONENT
// ============================================
const allPopularTopics = [
  { 
    title: "VLOOKUP in Excel - Complete Guide", 
    description: "Learn VLOOKUP with examples and practical use cases.", 
    icon: FileSpreadsheet,
    image: "/vlookup.png"
  },
  { 
    title: "How to Read Balance Sheet", 
    description: "Step-by-step guide to understand balance sheet.", 
    icon: Landmark,
    image: "/balance-sheet.png"
  },
  { 
    title: "Journal Entries - Explained", 
    description: "Understand different types of journal entries.", 
    icon: Calculator,
    image: "/journal-entries.png"
  },
  { 
    title: "Cash Flow Statement - Simplified", 
    description: "Understand cash flow from operating, investing and financing activities.", 
    icon: TrendingUp,
    image: "/cash-flow.png"
  },
  { 
    title: "Ratio Analysis - Complete Guide", 
    description: "Learn liquidity, solvency, activity and profitability ratios.", 
    icon: PieChart,
    image: "/ratio-analysis.png"
  },
  { 
    title: "Pivot Tables in Excel", 
    description: "Summarize data and extract insights easily.", 
    icon: BarChart3,
    image: "/pivot-tables.png"
  },
  { 
    title: "GST Basics for Beginners", 
    description: "Understand GST, types, rates and filing basics.", 
    icon: FileText,
    image: "/gst-basics.png"
  },
  { 
    title: "Power BI Dashboards", 
    description: "Create interactive dashboards step-by-step.", 
    icon: BarChart3,
    image: "/powerbi-dashboards.png"
  },
  { 
    title: "Business Communication Essentials", 
    description: "Master email etiquette, report writing, presentation skills and professional communication.", 
    icon: MessageSquare,
    image: "/business-communication.png"
  },
  { 
    title: "Financial Modeling", 
    description: "Learn financial modeling, forecasting and valuation techniques.", 
    icon: TrendingUp,
    image: "/financial-modeling.png"
  },
];

const PopularTopics = () => {
  const leftTopics = allPopularTopics.slice(0, 5);
  const rightTopics = allPopularTopics.slice(5, 10);

  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC] rounded-2xl px-6 md:px-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Popular Topics</h2>
          <p className="text-slate-500 mt-1">Most loved by finance students</p>
        </div>
        <Link href="/topics/popular" className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
          View all topics <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {leftTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-xl bg-gray-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      {topic.image ? (
                        <Image
                          src={topic.image}
                          alt={topic.title}
                          width={70}
                          height={70}
                          className="object-contain w-16 h-16"
                        />
                      ) : (
                        <Icon size={36} className="text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-base">{topic.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{topic.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#2563EB] flex-shrink-0 ml-2" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          {rightTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-xl bg-gray-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      {topic.image ? (
                        <Image
                          src={topic.image}
                          alt={topic.title}
                          width={70}
                          height={70}
                          className="object-contain w-16 h-16"
                        />
                      ) : (
                        <Icon size={36} className="text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-base">{topic.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{topic.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#2563EB] flex-shrink-0 ml-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// LEARNING PATHS DATA
// ============================================
const learningPaths = [
  {
    title: "Finance Analyst Path",
    skills: [
      { name: "Advanced Excel", image: "/financial_analyst_excel.png" },
      { name: "Financial\nStatements", image: "/financial_analyst_statements.png" },
      { name: "Financial\nAnalysis", image: "/financial-analysis.png" },
      { name: "Power BI", image: "/financial_analyst_powerbi.png" },
      { name: "Interview\nPreparation", image: "/financial_analyst_interview-prep.png" },
    ],
    description: "Master skills required for a Financial Analyst role",
  },
  {
    title: "Accounting Professional Path",
    skills: [
      { name: "Accounting\nBasics", image: "/financial_analyst_accounting_basics.png" },
      { name: "Journal\nEntries", image: "/financial_analyst_journal_entries.png" },
      { name: "Tally\nBasics", image: "/financial_analyst_tally_basics.png" },
      { name: "GST\nBasics", image: "/financial_analyst_gst_basics.png" },
      { name: "Interview\nPreparation", image: "/financial_analyst_interview-prep.png" },
    ],
    description: "Learn accounting from basics to advanced level",
  },
];

// ============================================
// LEARNING PATHS COMPONENT - ALL 5 SKILLS IN ONE ROW
// ============================================
const LearningPathsComponent = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Learning Paths</h2>
          <p className="text-slate-500 mt-1">Follow step-by-step paths to build strong finance skills</p>
        </div>
        <Link href="/learning-paths" className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
          View all paths <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {learningPaths.map((path, pathIdx) => (
          <div key={pathIdx} className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{path.title}</h3>
            <p className="text-xs text-slate-500 mb-5">{path.description}</p>

            {/* All 5 skills in one row - using flex with no wrap */}
            <div className="flex flex-nowrap justify-between items-start gap-2 mb-5">
              {path.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex flex-col items-center flex-shrink-0 w-[70px]">
                  <div className="w-[70px] h-[70px] rounded-xl bg-gray-50 border border-slate-200 flex items-center justify-center">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      width={76}
                      height={76}
                      className="object-contain w-14 h-14"
                    />
                  </div>
                  <span className="text-[12px] font-semibold text-gray-700 text-center mt-2 leading-tight whitespace-pre-line">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <button
              style={{ color: "#2563EB" }}
              className="w-full px-4 py-3 bg-white font-bold rounded-xl border border-[#93C5FD] text-sm hover:bg-blue-50 transition"
            >
              Start Learning →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// FREE RESOURCES DATA
// ============================================
const freeResources = [
  { 
    name: "Excel Cheat Sheet", 
    subtitle: "Quick reference guide\nfor Excel formulas",
    image: "/excel-resource.png"
  },
  { 
    name: "Accounting Notes", 
    subtitle: "Beginner-friendly\naccounting notes",
    image: "/accounting-notes.png"
  },
  { 
    name: "Finance Interview Questions", 
    subtitle: "Top questions with\nsample answers",
    image: "/finance-interview.png"
  },
  { 
    name: "Resume Template", 
    subtitle: "ATS-friendly resume\ntemplate for Finance",
    image: "/resume-template.png"
  },
  { 
    name: "Career Roadmap", 
    subtitle: "Step-by-step guide to\nbuild your finance career",
    image: "/career-roadmap.png"
  },
  {
  name: "Business Communication",
  subtitle: "Improve workplace\ncommunication skills",
  image: "/business-communication.png"
}
];

// ============================================
// FREE RESOURCES COMPONENT
// ============================================
const FreeResources = () => {
  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC] rounded-2xl px-6 md:px-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Free Resources</h2>
          <p className="text-slate-500 mt-1">Helpful materials to support your learning</p>
        </div>
        <Link href="/resources" className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
          View all resources <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {freeResources.map((resource) => (
          <div
            key={resource.name}
            className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Logo Left */}
            <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={resource.image}
                  alt={resource.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>

              {/* Text Right */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm leading-tight">
                  {resource.name}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line mt-1">
                  {resource.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// CTA BANNER COMPONENT
// ============================================
const CTABanner = () => {
  return (
    <section className="py-12 md:py-16">
      <div
        style={{ backgroundColor: "#2563EB" }}
        className="rounded-3xl p-8 md:p-12"
      >
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Image
                src="/light-bulb.png"
                alt="Light Bulb"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Keep Learning. Keep Growing.
              </h2>

              <p className="text-white text-lg md:text-xl font-medium">
                Consistent learning today, career success tomorrow.
              </p>
            </div>
          </div>

          <Link
            href="/topics"
            className="inline-flex items-center px-5 py-2 bg-white text-[#2563EB] rounded-lg font-medium"
          >
            Explore All Topics
            <ArrowRight size={18} className="ml-2" />
          </Link>

        </div>
      </div>
    </section>
  );
};

// ============================================
// BOTTOM FEATURES COMPONENT
// ============================================
const bottomFeatures = [
  { title: "100% Free", description: "All topics are free to learn", icon: Shield, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Practical & Easy", description: "Learn with real examples", icon: CheckCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Learn at Your Pace", description: "Study anytime, anywhere", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50" },
  { title: "Build Career-Ready Skills", description: "Get job-ready with in-demand skills", icon: Briefcase, color: "text-purple-600", bgColor: "bg-purple-50" },
];

const BottomFeatures = () => {
  return (
    <section className="py-8 md:py-10 border-t border-slate-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bottomFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={feature.color} />
              </div>
              <div>
                <div className="font-semibold text-gray-800">{feature.title}</div>
                <div className="text-xs text-slate-500">{feature.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function LearningHubPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-4 md:space-y-6">
        <HeroSection />
        <ExploreByTopic />
        <PopularTopics />
        <LearningPathsComponent />
        <FreeResources />
        <CTABanner />
        <BottomFeatures />
      </main>
    </>
  );
}