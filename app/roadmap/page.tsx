"use client";

import React, { useState } from "react";
import {
  ChevronRight, TrendingUp, BarChart3, 
  Calculator, Database, PieChart, Target, Award,
  GraduationCap, Briefcase, Sparkles, BookOpen,
  Code, FileSpreadsheet, Brain, Rocket, Users, Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";

const FinancialAnalystRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const roadmapSteps = [
    { 
      title: "Math & Statistics", 
      icon: Calculator,
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      skills: ["Linear Algebra", "Calculus", "Statistics", "Probability", "Financial Math"],
      resources: ["Khan Academy", "Coursera", "MIT OpenCourseware"]
    },
    { 
      title: "Financial Foundations", 
      icon: BarChart3,
      color: "#22c55e",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      skills: ["Accounting Basics", "Financial Statements", "Ratio Analysis", "Time Value of Money", "Risk Management"],
      resources: ["Investopedia", "CFI", "Corporate Finance"]
    },
    { 
      title: "Excel & Financial Analysis", 
      icon: FileSpreadsheet,
      color: "#22c55e",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      skills: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Financial Functions", "Macros", "Power Query"],
      resources: ["ExcelIsFun", "Coursera Excel", "LinkedIn Learning"]
    },
    { 
      title: "SQL", 
      icon: Database,
      color: "#6366f1",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      skills: ["SELECT Queries", "JOINS", "Subqueries", "Window Functions", "Database Design"],
      resources: ["W3Schools", "Mode Analytics", "LeetCode"]
    },
    { 
      title: "Python", 
      icon: Code,
      color: "#a855f7",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      skills: ["Python Basics", "Pandas", "NumPy", "Matplotlib", "Financial Analysis"],
      resources: ["DataCamp", "Python for Finance", "Real Python"]
    },
    { 
      title: "Data Visualization", 
      icon: PieChart,
      color: "#f97316",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      skills: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Dashboard Design"],
      resources: ["Power BI Docs", "Tableau Public", "DataViz Society"]
    },
    { 
      title: "Financial Modeling", 
      icon: TrendingUp,
      color: "#ec4899",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
      skills: ["DCF Models", "LBO Models", "Merger Models", "Valuation", "Forecasting"],
      resources: ["Wall Street Prep", "CFI", "Breaking Into Wall Street"]
    },
    { 
      title: "Business & Industry Knowledge", 
      icon: Brain,
      color: "#06b6d4",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-700",
      skills: ["Industry Research", "Competitive Analysis", "Market Trends", "Regulations", "Business Strategy"],
      resources: ["Bloomberg", "Reuters", "WSJ"]
    },
    { 
      title: "Projects & Career Preparation", 
      icon: Rocket,
      color: "#8b5cf6",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      textColor: "text-violet-700",
      skills: ["Portfolio Projects", "Resume Building", "LinkedIn Optimization", "GitHub Portfolio", "Case Studies"],
      resources: ["Kaggle", "GitHub", "StrataScratch"]
    },
    { 
      title: "Get Hired", 
      icon: Award,
      color: "#ef4444",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      skills: ["Resume Prep", "Interview Skills", "Case Studies", "Networking", "Offer Negotiation"],
      resources: ["LinkedIn Jobs", "Finlysta", "Industry Events"]
    }
  ];

  // Function to split title into 2 lines max without truncation
  const formatTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 2) {
      return { line1: title, line2: null };
    }
    // Split after 2nd word for "Excel & Financial Analysis" -> "Excel &" + "Financial Analysis"
    if (title === "Excel & Financial Analysis") {
      return { line1: "Excel &", line2: "Financial Analysis" };
    }
    // Split after 2nd word for "Business & Industry Knowledge" -> "Business &" + "Industry Knowledge"
    if (title === "Business & Industry Knowledge") {
      return { line1: "Business &", line2: "Industry Knowledge" };
    }
    // Split after 2nd word for "Projects & Career Preparation" -> "Projects &" + "Career Preparation"
    if (title === "Projects & Career Preparation") {
      return { line1: "Projects &", line2: "Career Preparation" };
    }
    // Generic split after 2nd word
    const line1 = words.slice(0, 2).join(' ');
    const line2 = words.slice(2).join(' ');
    return { line1, line2 };
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0A2540] transition-colors mb-6">
          <ChevronRight className="rotate-180 w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Main Content */}
        <div className="w-full rounded-2xl p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-3">
              <Target size={14} className="text-[#FFD700]" />
              <span className="text-xs font-semibold text-[#0A2540]">Your Journey</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540]">
              Roadmap to Become a
              <span className="block bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text">Financial Analyst</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
              Follow this step-by-step path to master the skills you need and launch your finance career
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-[#FFD700]">10</div>
              <div className="text-xs text-gray-500">Learning Modules</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-[#FFD700]">45+</div>
              <div className="text-xs text-gray-500">Essential Skills</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-[#FFD700]">8-12</div>
              <div className="text-xs text-gray-500">Weeks to Complete</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-[#FFD700]">100%</div>
              <div className="text-xs text-gray-500">Job Ready</div>
            </div>
          </div>

          {/* Desktop Timeline View */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute left-0 right-0 top-12 h-0.5 bg-gray-200 z-0"></div>
            
            <div className="relative z-10 flex justify-between gap-4">
              {roadmapSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                const titleParts = formatTitle(step.title);
                
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 cursor-pointer" onClick={() => setActiveStep(idx)}>
                    <div
                      className={`
                        w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                        ${isActive 
                          ? 'ring-4 ring-[#FFD700] shadow-xl scale-110' 
                          : 'shadow-sm hover:scale-105'
                        }
                      `}
                      style={{
                        backgroundColor: step.color + '20',
                        border: `2px solid ${step.color}`,
                      }}
                    >
                      <step.icon size={24} style={{ color: step.color }} />
                    </div>
                    
                    <div className="mt-2 text-center min-h-[36px]">
                      {titleParts.line2 ? (
                        <>
                          <p className={`font-bold text-[10.5px] leading-tight ${isActive ? 'text-[#0A2540]' : 'text-gray-600'}`}>
                            {titleParts.line1}
                          </p>
                          <p className={`font-bold text-[10.5px] leading-tight ${isActive ? 'text-[#0A2540]' : 'text-gray-600'}`}>
                            {titleParts.line2}
                          </p>
                        </>
                      ) : (
                        <p className={`font-bold text-[10.5px] leading-tight ${isActive ? 'text-[#0A2540]' : 'text-gray-600'}`}>
                          {step.title}
                        </p>
                      )}
                    </div>
                    
                    {/* Gray line after each skill */}
                    <div className="w-6 h-px bg-gray-300 mt-2"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden overflow-x-auto pb-4 mt-4">
            <div className="flex gap-4 min-w-max px-2">
              {roadmapSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                const titleParts = formatTitle(step.title);
                
                return (
                  <div
                    key={idx}
                    className={`
                      flex flex-col items-center p-3 rounded-xl transition-all duration-300 cursor-pointer min-w-[90px]
                      ${isActive ? 'scale-105 shadow-lg' : 'hover:scale-102'}
                    `}
                    style={{
                      backgroundColor: isActive ? step.bgColor : '#f9fafb',
                      border: `1px solid ${step.color}`,
                    }}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center mb-2
                      `}
                      style={{ backgroundColor: step.color + '20' }}
                    >
                      <step.icon size={18} style={{ color: step.color }} />
                    </div>
                    <div className="text-center">
                      {titleParts.line2 ? (
                        <>
                          <p className={`font-semibold text-[10px] leading-tight ${isActive ? step.textColor : 'text-gray-600'}`}>
                            {titleParts.line1}
                          </p>
                          <p className={`font-semibold text-[10px] leading-tight ${isActive ? step.textColor : 'text-gray-600'}`}>
                            {titleParts.line2}
                          </p>
                        </>
                      ) : (
                        <p className={`font-semibold text-[10px] leading-tight ${isActive ? step.textColor : 'text-gray-600'}`}>
                          {step.title}
                        </p>
                      )}
                    </div>
                    <div className="w-5 h-px bg-gray-300 mt-2"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[#FFD700]" />
              <span className="text-sm font-semibold text-[#0A2540]">
                What you'll learn in <span style={{ color: roadmapSteps[activeStep].color }}>{roadmapSteps[activeStep].title}</span>:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {roadmapSteps[activeStep].skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-white rounded-full text-xs text-gray-600 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Resources */}
          <div className="mt-4 p-5 bg-emerald-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-[#0A2540]">Recommended Resources</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {roadmapSteps[activeStep].resources.map((resource, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-white rounded-full text-xs text-emerald-700 border border-emerald-200 shadow-sm"
                >
                  📚 {resource}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span className="font-medium">Your Progress</span>
              <span className="font-bold text-[#FFD700]">Step {activeStep + 1} of {roadmapSteps.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500"
                style={{ width: `${((activeStep + 1) / roadmapSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <button className="px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A2540] font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Briefcase size={18} />
                Browse Entry-Level Jobs
              </button>
            </Link>
            <Link href="/internships">
              <button className="px-6 py-3 bg-white border-2 border-[#FFD700] text-[#0A2540] font-semibold rounded-xl hover:bg-[#FFD700]/10 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center">
                <GraduationCap size={18} />
                Find Internships
              </button>
            </Link>
          </div>

          {/* Pro Tip */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-[#FFD700]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0A2540] mb-1">💡 Pro Tip</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Master <span className="font-semibold text-[#22c55e]">Excel</span> and <span className="font-semibold text-[#3b82f6]">SQL</span> first — these are the most requested skills in entry-level financial analyst roles (80% of job postings require them).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialAnalystRoadmap;