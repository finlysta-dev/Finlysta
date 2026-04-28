"use client";

import React, { useState } from "react";
import {
  ChevronRight, TrendingUp, BarChart3, 
  Calculator, Database, PieChart, Target, Award,
  GraduationCap, Briefcase, Sparkles
} from "lucide-react";
import Link from "next/link";
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
      skills: ["Linear Algebra", "Calculus", "Statistics", "Probability", "Financial Math"]
    },
    { 
      title: "Excel Mastery", 
      icon: BarChart3,
      color: "#22c55e",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      skills: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Financial Functions", "Macros", "Power Query"]
    },
    { 
      title: "SQL", 
      icon: Database,
      color: "#6366f1",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      skills: ["SELECT Queries", "JOINS", "Subqueries", "Window Functions", "Database Design"]
    },
    { 
      title: "Python", 
      icon: ChevronRight,
      color: "#a855f7",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      skills: ["Python Basics", "Pandas", "NumPy", "Matplotlib", "Financial Analysis"]
    },
    { 
      title: "Data Visualization", 
      icon: PieChart,
      color: "#f97316",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      skills: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Dashboard Design"]
    },
    { 
      title: "Financial Modeling", 
      icon: TrendingUp,
      color: "#ec4899",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
      skills: ["DCF Models", "LBO Models", "Merger Models", "Valuation", "Forecasting"]
    },
    { 
      title: "Get Hired", 
      icon: Award,
      color: "#ef4444",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      skills: ["Resume Prep", "Interview Skills", "Case Studies", "Networking", "Offer Negotiation"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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

          {/* Desktop Timeline View - All icons visible in color */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute left-0 right-0 top-12 h-0.5 bg-gray-200 z-0"></div>
            
            <div className="relative z-10 flex justify-between">
              {roadmapSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 cursor-pointer" onClick={() => setActiveStep(idx)}>
                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
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
                      <step.icon size={28} style={{ color: step.color }} />
                    </div>
                    
                    <div className="mt-3 text-center">
                      <p className={`font-bold text-sm ${isActive ? 'text-[#0A2540]' : 'text-gray-600'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">---</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile View - All icons visible in color */}
          <div className="md:hidden overflow-x-auto pb-4 mt-4">
            <div className="flex gap-4 min-w-max px-2">
              {roadmapSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                
                return (
                  <div
                    key={idx}
                    className={`
                      flex flex-col items-center p-4 rounded-xl transition-all duration-300 cursor-pointer min-w-[100px]
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
                        w-12 h-12 rounded-full flex items-center justify-center mb-2
                      `}
                      style={{ backgroundColor: step.color + '20' }}
                    >
                      <step.icon size={20} style={{ color: step.color }} />
                    </div>
                    <p className={`font-semibold text-sm ${isActive ? step.textColor : 'text-gray-600'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">---</p>
                    {isActive && (
                      <p className="text-xs text-gray-500 mt-2 text-center">Click to view skills</p>
                    )}
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