"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  TrendingUp,
  BarChart3,
  Calculator,
  Database,
  PieChart,
  Target,
  Award,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Users,
  FileSpreadsheet,
  Code,
  Presentation,
  BookOpen,
  Brain,
  Rocket,
  CircleCheckBig,
  Flag,
  LineChart,
  GraduationCap,
  Globe,
  MessageSquare,
  LayoutDashboard,
  Network,
  Rocket as RocketIcon,
  Star,
} from "lucide-react";

const FinancialAnalystRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Full detailed roadmap with all 15 steps
  const roadmapSteps = [
    {
      number: 1,
      title: "Math & Statistics",
      icon: Calculator,
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      iconBg: "bg-blue-100",
      description: "Foundation of quantitative analysis",
      longDescription: "Master the mathematical concepts that drive financial models and statistical analysis. Understanding these fundamentals is crucial for accurate data interpretation.",
      skills: ["Linear Algebra", "Calculus", "Descriptive Statistics", "Probability Theory", "Inferential Statistics", "Regression Analysis", "Time Series Analysis"],
      resources: ["Khan Academy: Statistics & Probability", "MIT OpenCourseWare: Calculus", "Book: 'Naked Statistics'"],
      timeEstimate: "2-3 months",
      difficulty: "Intermediate",
    },
    {
      number: 2,
      title: "Financial Foundations",
      icon: TrendingUp,
      color: "#10b981",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      iconBg: "bg-emerald-100",
      description: "Core finance principles",
      longDescription: "Learn the language of business. Understand financial statements, valuation methods, and corporate finance fundamentals that every analyst must know.",
      skills: ["Financial Statements", "Ratio Analysis", "Time Value of Money", "DCF Valuation", "Risk & Return", "Cost of Capital", "Financial Markets"],
      resources: ["Course: Financial Markets by Yale", "Book: 'The Intelligent Investor'", "CFA Level 1 Materials"],
      timeEstimate: "2-3 months",
      difficulty: "Beginner",
    },
    {
      number: 3,
      title: "Excel Mastery",
      icon: FileSpreadsheet,
      color: "#22c55e",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      iconBg: "bg-green-100",
      description: "Spreadsheet expertise",
      longDescription: "Excel is the most essential tool for financial analysts. Master advanced functions, shortcuts, and automation techniques to become highly efficient.",
      skills: ["Advanced Formulas", "Pivot Tables", "Data Validation", "Financial Functions", "What-If Analysis", "Macros & VBA", "Power Query"],
      resources: ["ExcelIsFun YouTube Channel", "Course: Excel for Financial Analysis", "Practice: Financial Modeling"],
      timeEstimate: "1-2 months",
      difficulty: "Beginner to Intermediate",
    },
    {
      number: 4,
      title: "Financial Analysis",
      icon: BarChart3,
      color: "#eab308",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      iconBg: "bg-yellow-100",
      description: "Practical financial analysis",
      longDescription: "Apply your knowledge to real-world financial analysis. Learn to evaluate company performance, identify trends, and make data-driven recommendations.",
      skills: ["Horizontal & Vertical Analysis", "Common-Size Statements", "Trend Analysis", "Industry Benchmarking", "DuPont Analysis", "Credit Analysis", "Investment Analysis"],
      resources: ["Financial Statement Analysis Books", "SEC Filings (10-K, 10-Q)", "Wall Street Prep Courses"],
      timeEstimate: "1-2 months",
      difficulty: "Intermediate",
    },
    {
      number: 5,
      title: "SQL",
      icon: Database,
      color: "#6366f1",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      iconBg: "bg-indigo-100",
      description: "Database querying",
      longDescription: "Extract and manipulate data from large databases. SQL is essential for accessing financial data stored in company databases.",
      skills: ["SELECT Statements", "JOINS", "GROUP BY & Aggregations", "Subqueries & CTEs", "Window Functions", "Query Optimization", "Stored Procedures"],
      resources: ["Mode Analytics SQL Tutorial", "SQLZoo Practice", "LeetCode SQL Problems"],
      timeEstimate: "1-2 months",
      difficulty: "Intermediate",
    },
    {
      number: 6,
      title: "Data Visualization",
      icon: PieChart,
      color: "#f97316",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      iconBg: "bg-orange-100",
      description: "Storytelling with data",
      longDescription: "Transform complex data into clear, actionable insights. Master visualization tools to communicate findings effectively.",
      skills: ["Data Storytelling", "Dashboard Design", "Chart Selection", "Color Theory", "Interactive Dashboards", "Report Automation"],
      resources: ["Book: 'Storytelling with Data'", "Tableau Public Gallery", "Power BI Learning Path"],
      timeEstimate: "1 month",
      difficulty: "Intermediate",
    },
    {
      number: 7,
      title: "BI Tools",
      icon: LayoutDashboard,
      color: "#ec4899",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
      iconBg: "bg-pink-100",
      description: "Business intelligence",
      longDescription: "Build professional dashboards and reports that drive business decisions. BI tools are industry standards for financial reporting.",
      skills: ["Power BI (DAX)", "Tableau (Calculations)", "Data Modeling", "Row-Level Security", "Mobile Dashboards", "Performance Optimization"],
      resources: ["Microsoft Power BI Learning", "Tableau Training Videos", "Enterprise DNA"],
      timeEstimate: "1-2 months",
      difficulty: "Intermediate",
    },
    {
      number: 8,
      title: "Python",
      icon: Code,
      color: "#a855f7",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      iconBg: "bg-purple-100",
      description: "Advanced data analysis",
      longDescription: "Automate repetitive tasks and perform complex analysis at scale. Python is increasingly essential for modern financial analysts.",
      skills: ["Python Fundamentals", "NumPy", "Pandas", "Matplotlib/Seaborn", "Financial Libraries", "Web Scraping", "API Integration"],
      resources: ["DataCamp: Python for Finance", "Book: 'Python for Data Analysis'", "QuantConnect Tutorials"],
      timeEstimate: "2-3 months",
      difficulty: "Advanced",
    },
    {
      number: 9,
      title: "Financial Modeling",
      icon: LineChart,
      color: "#ef4444",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      iconBg: "bg-red-100",
      description: "Build financial models",
      longDescription: "Create comprehensive financial models for valuation, budgeting, and forecasting. This is the core skill that separates analysts from senior analysts.",
      skills: ["3-Statement Models", "Discounted Cash Flow (DCF)", "Comparable Analysis", "LBO Models", "Merger Models", "Scenario Analysis", "Monte Carlo Simulations"],
      resources: ["Breaking Into Wall Street", "Corporate Finance Institute", "Wall Street Prep"],
      timeEstimate: "2-3 months",
      difficulty: "Advanced",
    },
    {
      number: 10,
      title: "Business Knowledge",
      icon: Globe,
      color: "#8b5cf6",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      textColor: "text-violet-700",
      iconBg: "bg-violet-100",
      description: "Industry expertise",
      longDescription: "Develop deep understanding of the industry you want to work in. Different sectors have unique metrics, drivers, and business models.",
      skills: ["Industry KPIs", "Regulatory Environment", "Competitive Landscape", "Business Models", "Economic Indicators", "Macroeconomic Factors"],
      resources: ["Wall Street Journal", "Industry Trade Journals", "Bloomberg Terminal"],
      timeEstimate: "Ongoing",
      difficulty: "Contextual",
    },
    {
      number: 11,
      title: "Communication",
      icon: MessageSquare,
      color: "#14b8a6",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      textColor: "text-teal-700",
      iconBg: "bg-teal-100",
      description: "Storytelling & presenting",
      longDescription: "Translate technical findings into compelling presentations. Your insights only matter if you can communicate them effectively.",
      skills: ["Executive Summaries", "Visual Storytelling", "Deck Creation", "Data-Driven Narratives", "Public Speaking", "Report Writing"],
      resources: ["Presentation Skills Courses", "Toastmasters", "Book: 'Slide:ology'"],
      timeEstimate: "1 month",
      difficulty: "Soft Skill",
    },
    {
      number: 12,
      title: "Real-World Projects",
      icon: Target,
      color: "#06b6d4",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-700",
      iconBg: "bg-cyan-100",
      description: "Build portfolio projects",
      longDescription: "Apply your skills to real-world scenarios. Build a portfolio that demonstrates your ability to solve actual business problems.",
      skills: ["Company Analysis", "Investment Reports", "Industry Research", "Financial Dashboards", "Forecasting Models", "Risk Analysis"],
      resources: ["Kaggle Finance Datasets", "SEC EDGAR Database", "Yahoo Finance API"],
      timeEstimate: "2-3 months",
      difficulty: "Applied",
    },
    {
      number: 13,
      title: "Resume & LinkedIn",
      icon: GraduationCap,
      color: "#d946ef",
      bgColor: "bg-fuchsia-50",
      borderColor: "border-fuchsia-200",
      textColor: "text-fuchsia-700",
      iconBg: "bg-fuchsia-100",
      description: "Professional branding",
      longDescription: "Position yourself as a serious candidate. Optimize your professional profiles to attract recruiters and showcase your skills.",
      skills: ["ATS-Friendly Resume", "Portfolio Website", "GitHub Profile", "LinkedIn Optimization", "Personal Branding", "Cover Letters"],
      resources: ["LinkedIn Learning", "Professional Resume Writers", "Portfolio Templates"],
      timeEstimate: "2-4 weeks",
      difficulty: "Essential",
    },
    {
      number: 14,
      title: "Networking",
      icon: Users,
      color: "#f43f5e",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      textColor: "text-rose-700",
      iconBg: "bg-rose-100",
      description: "Build connections",
      longDescription: "Connect with industry professionals. Most finance jobs come through referrals and relationships, not cold applications.",
      skills: ["Informational Interviews", "LinkedIn Outreach", "Industry Events", "Professional Orgs", "Mentorship", "Follow-up Strategies"],
      resources: ["LinkedIn Finance Groups", "CFA Society Events", "Corporate Networking"],
      timeEstimate: "Ongoing",
      difficulty: "Soft Skill",
    },
    {
      number: 15,
      title: "Interview Prep",
      icon: Star,
      color: "#000000",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      textColor: "text-slate-800",
      iconBg: "bg-slate-100",
      description: "Ace the interviews",
      longDescription: "Master the financial analyst interview process. Be prepared for technical questions, case studies, and behavioral interviews.",
      skills: ["Technical Questions", "Case Study Frameworks", "Behavioral Prep (STAR)", "Brainteasers", "Take-Home Assignments", "Negotiation"],
      resources: ["Book: 'Breaking into Finance'", "Glassdoor Interviews", "Mock Interview Services"],
      timeEstimate: "1-2 months",
      difficulty: "Critical",
    },
  ];

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % roadmapSteps.length);
      setAnimationKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [roadmapSteps.length]);

  const currentStep = roadmapSteps[activeStep];
  const progressPercentage = ((activeStep + 1) / roadmapSteps.length) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-[#0A2540] to-[#1A3A5A] px-6 py-8 md:py-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFD700] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFA500] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-white/20">
            <Flag size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold tracking-wide">Your Career Journey</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Roadmap to Become a
            <span className="block bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              Financial Analyst
            </span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
            A comprehensive, step-by-step guide to launching your career in financial analysis.
            Master the skills, build your portfolio, and land your dream role.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 bg-white border-b border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#0A2540]">{roadmapSteps.length}</div>
          <div className="text-xs text-gray-500">Roadmap Steps</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#0A2540]">12-18</div>
          <div className="text-xs text-gray-500">Months to Complete</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#0A2540]">$65k-95k</div>
          <div className="text-xs text-gray-500">Entry-Level Salary</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#0A2540]">🏆 #1</div>
          <div className="text-xs text-gray-500">Most Requested Role</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        {/* Desktop Timeline */}
        <div className="hidden lg:block relative mb-12">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-8 h-1 bg-gray-200 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="relative flex justify-between">
            {roadmapSteps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              const isHovered = hoveredStep === idx;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? "scale-110 ring-4 ring-[#FFD700]/30 shadow-xl" : ""}
                      ${isCompleted ? "shadow-md" : ""}
                      ${isHovered ? "scale-105" : ""}
                    `}
                    style={{
                      backgroundColor: isCompleted || isActive ? step.color : "#f3f4f6",
                      border: `2px solid ${isActive || isCompleted ? step.color : "#e5e7eb"}`,
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-white" />
                    ) : (
                      <step.icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                    )}
                  </div>
                  <div className="mt-2 text-center max-w-[80px]">
                    <p className={`text-[10px] font-bold ${isActive ? "text-[#0A2540]" : "text-gray-500"}`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-[#0A2540]" : "text-gray-600"}`}>
                      {step.title}
                    </p>
                  </div>
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 z-20 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap pointer-events-none">
                      {step.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto pb-6 mb-8 -mx-2 px-2">
          <div className="flex gap-3 min-w-max">
            {roadmapSteps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`
                    flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-[90px]
                    ${isActive ? "bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 border-2 border-[#FFD700] shadow-lg" : "bg-gray-50 border border-gray-200"}
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all
                      ${isActive ? "scale-110" : ""}
                    `}
                    style={{
                      backgroundColor: isCompleted || isActive ? step.color : "#e5e7eb",
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-white" />
                    ) : (
                      <step.icon size={16} className={isActive ? "text-white" : "text-gray-500"} />
                    )}
                  </div>
                  <p className={`text-[10px] font-bold ${isActive ? "text-[#0A2540]" : "text-gray-500"}`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs font-semibold ${isActive ? "text-[#0A2540]" : "text-gray-600"}`}>
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details Card */}
        <div
          key={animationKey}
          className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-500"
        >
          <div className={`bg-gradient-to-r ${currentStep.bgColor} px-4 md:px-6 py-4 border-b ${currentStep.borderColor}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${currentStep.iconBg} flex items-center justify-center flex-shrink-0`} style={{ color: currentStep.color }}>
                  <currentStep.icon size={24} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${currentStep.iconBg}`} style={{ color: currentStep.color }}>
                      Step {currentStep.number} of {roadmapSteps.length}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{currentStep.timeEstimate}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{currentStep.difficulty}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#0A2540] mt-1">
                    {currentStep.title}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FFD700]" />
                <span className="text-xs md:text-sm text-gray-600">{currentStep.description}</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="font-semibold text-[#0A2540] mb-2 flex items-center gap-2">
                  <Target size={16} className="text-[#FFD700]" />
                  Overview
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                  {currentStep.longDescription}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h4 className="text-sm font-semibold text-[#0A2540] mb-2 flex items-center gap-2">
                    <BookOpen size={14} className="text-[#FFD700]" />
                    Recommended Resources
                  </h4>
                  <ul className="space-y-1">
                    {currentStep.resources.map((resource, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                        <ChevronRight size={12} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#0A2540] mb-3 flex items-center gap-2">
                  <Brain size={16} className="text-[#FFD700]" />
                  Key Skills You'll Learn
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentStep.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-[#FFD700] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                activeStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#0A2540] border border-gray-300 hover:border-[#FFD700] hover:shadow-sm"
              }`}
            >
              ← Previous
            </button>
            <div className="text-xs md:text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </div>
            <button
              onClick={() => setActiveStep((prev) => Math.min(roadmapSteps.length - 1, prev + 1))}
              disabled={activeStep === roadmapSteps.length - 1}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                activeStep === roadmapSteps.length - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A2540] hover:shadow-lg"
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Overall Journey Progress</span>
            <span className="font-semibold text-[#0A2540]">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500 relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFD700] rounded-full shadow-md" />
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-6 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
              <Rocket size={14} className="text-[#FFD700]" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-[#0A2540] mb-1">
                Pro Tip from Industry Experts
              </p>
              <p className="text-[11px] md:text-xs text-gray-700 leading-relaxed">
                Focus on building a portfolio of 2-3 strong projects that demonstrate your skills. 
                Start with Excel and SQL — they're the most requested skills in 80% of entry-level 
                financial analyst positions.
              </p>
            </div>
          </div>
        </div>

        {/* Completion CTA */}
        {activeStep === roadmapSteps.length - 1 && (
          <div className="mt-6 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 text-center">
            <CircleCheckBig size={36} className="text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg md:text-xl font-bold text-[#0A2540] mb-2">
              You're Ready to Launch Your Career! 🚀
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              You've completed all the steps. Now it's time to apply, network, and land your dream role.
            </p>
            <button className="px-4 md:px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A2540] font-semibold rounded-lg hover:shadow-lg transition-all text-sm md:text-base">
              Start Your Job Search →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAnalystRoadmap;