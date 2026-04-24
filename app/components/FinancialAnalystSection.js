"use client";

import { useState } from "react";
import Image from "next/image";
import { BarChart3, TrendingUp, PieChart, LineChart, Award, Clock, Users, Briefcase } from "lucide-react";

export default function FinancialAnalystSection() {
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "Financial Modeling", level: "Advanced", icon: BarChart3 },
    { name: "Data Analysis", level: "Expert", icon: TrendingUp },
    { name: "Risk Assessment", level: "Advanced", icon: PieChart },
    { name: "Market Research", level: "Intermediate", icon: LineChart },
    { name: "Excel & VBA", level: "Expert", icon: Award },
    { name: "Financial Reporting", level: "Advanced", icon: Briefcase },
  ];

  const certifications = [
    "CFA Level 2 Candidate",
    "Financial Risk Manager (FRM)",
    "Data Analytics Professional",
  ];

  const experience = [
    { company: "Goldman Sachs", role: "Junior Analyst", period: "2022-Present" },
    { company: "JPMorgan Chase", role: "Finance Intern", period: "2021-2022" },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Image - Mobile Optimized */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-8 md:mb-12">
          {/* Profile Image - Better visibility on mobile */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#FFD700] shadow-xl flex-shrink-0">
            <Image
              src="/financial-analyst.jpg"
              alt="Financial Analyst"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Title and Info */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-[#0A2540] mb-2">
              Financial Analyst
            </h1>
            <p className="text-sm md:text-base text-slate-600 mb-3">
              Data-driven financial professional with expertise in investment analysis
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-1 text-xs md:text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>5+ years experience</span>
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm text-slate-600">
                <Users className="w-4 h-4" />
                <span>15+ projects completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Mobile */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-2 text-sm font-semibold transition-all ${
              activeTab === "skills"
                ? "text-[#0A2540] border-b-2 border-[#FFD700]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex-1 py-2 text-sm font-semibold transition-all ${
              activeTab === "experience"
                ? "text-[#0A2540] border-b-2 border-[#FFD700]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`flex-1 py-2 text-sm font-semibold transition-all ${
              activeTab === "certifications"
                ? "text-[#0A2540] border-b-2 border-[#FFD700]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Certifications
          </button>
        </div>

        {/* Skills Grid - Better UI for Mobile */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const levelColor = 
                skill.level === "Expert" ? "bg-green-100 text-green-700" :
                skill.level === "Advanced" ? "bg-blue-100 text-blue-700" :
                "bg-yellow-100 text-yellow-700";
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                        <Icon className="w-5 h-5 text-[#0A2540]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{skill.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor} mt-1 inline-block`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill Level Bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FFD700] rounded-full transition-all"
                        style={{ 
                          width: skill.level === "Expert" ? "100%" : 
                                 skill.level === "Advanced" ? "75%" : "50%" 
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Experience Section */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-800">{exp.role}</h3>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {exp.role === "Junior Analyst" 
                    ? "Conducted financial analysis, built valuation models, and prepared client presentations."
                    : "Assisted in market research, data analysis, and financial reporting tasks."}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {activeTab === "certifications" && (
          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3"
              >
                <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                  <Award className="w-5 h-5 text-[#0A2540]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{cert}</h3>
                  <p className="text-xs text-slate-500">Professional Certification</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action - Better for Mobile */}
        <div className="mt-8 md:mt-12 text-center">
          <button className="w-full md:w-auto bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2540] font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg">
            Connect with this Analyst
          </button>
        </div>
      </div>
    </section>
  );
}
