"use client";

import Image from "next/image";
import { TrendingUp, BarChart3, PieChart, LineChart, Database, Calculator } from "lucide-react";

export default function FinancialAnalystSkills() {
  const skillsData = [
    { icon: BarChart3, name: "Financial Modeling", color: "from-blue-500 to-blue-600" },
    { icon: TrendingUp, name: "Investment Analysis", color: "from-green-500 to-green-600" },
    { icon: PieChart, name: "Risk Management", color: "from-purple-500 to-purple-600" },
    { icon: LineChart, name: "Market Research", color: "from-orange-500 to-orange-600" },
    { icon: Database, name: "Data Analytics", color: "from-cyan-500 to-cyan-600" },
    { icon: Calculator, name: "Financial Reporting", color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section with Image - Mobile Optimized */}
      <div className="relative bg-[#0A2540] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/financial-analyst-bg.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image - Prominent on Mobile */}
            <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#FFD700] shadow-2xl mb-4">
              <Image
                src="/financial-analyst.jpg"
                alt="Financial Analyst"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <h1 className="text-2xl md:text-4xl font-bold mb-3">
              Senior Financial Analyst
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl">
              8+ years of experience in investment banking and financial analysis
            </p>
            
            {/* Stats Cards - Mobile Friendly */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 mt-8 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-xl md:text-2xl font-bold text-[#FFD700]">$50M+</div>
                <div className="text-xs md:text-sm">Portfolio Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-xl md:text-2xl font-bold text-[#FFD700]">98%</div>
                <div className="text-xs md:text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section - Better UI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-2">
            Core Competencies
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Specialized skills in financial analysis and data-driven decision making
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#FFD700]/30"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 text-base md:text-lg mb-2">
                  {skill.name}
                </h3>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    style={{ width: `${85 - index * 5}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Expert level proficiency
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Badges */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-600 mb-3 text-center">
            ADDITIONAL SKILLS
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Excel VBA", "SQL", "Python", "Tableau", "Power BI", "QuickBooks", "SAP", "Bloomberg Terminal"].map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-[#FFD700] hover:text-[#0A2540] transition-colors cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
