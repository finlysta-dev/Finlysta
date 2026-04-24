"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp, Landmark, BookOpen, Calculator, PenTool,
  Wallet, GraduationCap, ArrowRight, Clock, ChevronRight,
  BarChart3, Database, FileSpreadsheet, Code, ChevronLeft,
  Table, Filter, LineChart, GitBranch, Cpu, Sparkles,
  Target, Award, Zap, Eye, Star, Rocket
} from "lucide-react";

const FinanceTopics = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    { 
      name: "Finance", 
      icon: BarChart3, 
      color: "emerald", 
      gradient: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      borderColor: "border-emerald-200",
      text: "text-emerald-600",
      textDark: "text-emerald-700",
      link: "/learn/finance",
      badge: "Popular",
      description: "Financial statements, ratios & analysis",
      topics: [
        { name: "Profit & Loss", slug: "profit-loss", desc: "Revenue, expenses & profit", duration: "15 min", icon: TrendingUp, level: "Beginner" },
        { name: "Balance Sheet", slug: "balance-sheet", desc: "Assets, liabilities & equity", duration: "20 min", icon: Landmark, level: "Beginner" },
        { name: "Cash Flow", slug: "cash-flow", desc: "Track money in & out", duration: "22 min", icon: Wallet, level: "Intermediate" },
        { name: "Financial Ratios", slug: "financial-ratios", desc: "Liquidity & profitability", duration: "18 min", icon: TrendingUp, level: "Intermediate" },
        { name: "Budgeting", slug: "budgeting", desc: "Plan & control finances", duration: "16 min", icon: Calculator, level: "Beginner" },
        { name: "Forecasting", slug: "forecasting", desc: "Predict future trends", duration: "14 min", icon: LineChart, level: "Advanced" }
      ]
    },
    { 
      name: "Excel", 
      icon: FileSpreadsheet, 
      color: "blue", 
      gradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      borderColor: "border-blue-200",
      text: "text-blue-600",
      textDark: "text-blue-700",
      link: "/learn/excel",
      badge: "Essential",
      description: "Formulas, pivot tables & automation",
      topics: [
        { name: "Data Validation", slug: "data-validation", desc: "Control data entry", duration: "12 min", icon: Table, level: "Beginner" },
        { name: "Pivot Tables", slug: "pivot-tables", desc: "Summarize & analyze", duration: "18 min", icon: Table, level: "Intermediate" },
        { name: "VLOOKUP", slug: "vlookup", desc: "Find & match data", duration: "15 min", icon: FileSpreadsheet, level: "Intermediate" },
        { name: "Conditional Formatting", slug: "conditional-formatting", desc: "Highlight trends", duration: "10 min", icon: Filter, level: "Beginner" },
        { name: "Charts & Graphs", slug: "charts-graphs", desc: "Visualize data", duration: "14 min", icon: LineChart, level: "Beginner" },
        { name: "Macros", slug: "macros", desc: "Automate tasks", duration: "20 min", icon: Code, level: "Advanced" }
      ]
    },
    { 
      name: "SQL", 
      icon: Database, 
      color: "cyan", 
      gradient: "from-cyan-500 to-cyan-600",
      lightBg: "bg-cyan-50",
      borderColor: "border-cyan-200",
      text: "text-cyan-600",
      textDark: "text-cyan-700",
      link: "/learn/sql",
      badge: "Core",
      description: "Queries, joins & optimization",
      topics: [
        { name: "SQL Joins", slug: "sql-joins", desc: "Combine tables", duration: "16 min", icon: Database, level: "Intermediate" },
        { name: "SELECT Queries", slug: "select-queries", desc: "Retrieve data", duration: "12 min", icon: Database, level: "Beginner" },
        { name: "Group By", slug: "group-by", desc: "Summarize data", duration: "14 min", icon: Table, level: "Intermediate" },
        { name: "Subqueries", slug: "subqueries", desc: "Nested queries", duration: "18 min", icon: GitBranch, level: "Advanced" },
        { name: "Window Functions", slug: "window-functions", desc: "Advanced analytics", duration: "20 min", icon: LineChart, level: "Advanced" },
        { name: "Indexes", slug: "indexes", desc: "Optimize performance", duration: "15 min", icon: Cpu, level: "Intermediate" }
      ]
    },
    { 
      name: "Power BI", 
      icon: BarChart3, 
      color: "orange", 
      gradient: "from-orange-500 to-orange-600",
      lightBg: "bg-orange-50",
      borderColor: "border-orange-200",
      text: "text-orange-600",
      textDark: "text-orange-700",
      link: "/learn/powerbi",
      badge: "Trending",
      description: "Data modeling, DAX & dashboards",
      topics: [
        { name: "Data Modeling", slug: "data-modeling", desc: "Relationships & schemas", duration: "18 min", icon: Database, level: "Intermediate" },
        { name: "DAX Functions", slug: "dax-functions", desc: "Calculate & analyze", duration: "22 min", icon: Calculator, level: "Advanced" },
        { name: "Visualizations", slug: "visualizations", desc: "Create dashboards", duration: "15 min", icon: BarChart3, level: "Beginner" },
        { name: "Power Query", slug: "power-query", desc: "Transform data", duration: "16 min", icon: FileSpreadsheet, level: "Intermediate" },
        { name: "Filters & Slicers", slug: "filters-slicers", desc: "Interactive reports", duration: "12 min", icon: Filter, level: "Beginner" },
        { name: "Row-Level Security", slug: "row-level-security", desc: "Control access", duration: "14 min", icon: Lock, level: "Advanced" }
      ]
    },
    { 
      name: "Python", 
      icon: Code, 
      color: "purple", 
      gradient: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      borderColor: "border-purple-200",
      text: "text-purple-600",
      textDark: "text-purple-700",
      link: "/learn/python",
      badge: "Advanced",
      description: "Loops, pandas & visualization",
      topics: [
        { name: "Python Basics", slug: "python-basics", desc: "Variables, loops & functions", duration: "14 min", icon: Code, level: "Beginner" },
        { name: "Pandas", slug: "pandas", desc: "Data manipulation", duration: "20 min", icon: Table, level: "Intermediate" },
        { name: "Functions", slug: "functions", desc: "Reusable code", duration: "12 min", icon: GitBranch, level: "Beginner" },
        { name: "Lists & Dicts", slug: "lists-dicts", desc: "Data structures", duration: "10 min", icon: Database, level: "Beginner" },
        { name: "NumPy", slug: "numpy", desc: "Numerical computing", duration: "16 min", icon: Calculator, level: "Intermediate" },
        { name: "Data Visualization", slug: "data-viz", desc: "Matplotlib & seaborn", duration: "18 min", icon: LineChart, level: "Advanced" }
      ]
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isHovered, categories.length]);

  const nextCategory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  const currentCategory = categories[currentIndex];
  const CurrentIcon = currentCategory.icon;

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Beginner": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Intermediate": return "bg-amber-50 text-amber-600 border-amber-200";
      case "Advanced": return "bg-rose-50 text-rose-600 border-rose-200";
      default: return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-slate-50">
      
      {/* Hero Section */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-md mb-5">
          <Rocket size={14} className="text-white" />
          <span className="text-black text-xs font-bold uppercase tracking-wider">Learning Hub</span>
          <Sparkles size={12} className="text-white" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-2">
          Master Financial Analyst
        </h2>
        
        <p className="text-slate-500 text-md max-w-md mx-auto leading-relaxed">
          Bite-sized lessons to build your financial analyst knowledge
        </p>
        
        {/* LINE BREAK ADDED HERE */}
        <div className="h-4"></div>
        
        {/* Simple Category Row - No Big Box */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevCategory}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm flex-shrink-0"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>

            <div className="flex-1 flex items-center justify-center gap-3">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 px-4 py-2 rounded-full ${
                    idx === currentIndex 
                      ? `${cat.lightBg} shadow-sm border ${cat.borderColor}` 
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${idx === currentIndex ? cat.lightBg : "bg-slate-50"} flex items-center justify-center`}>
                      <cat.icon className={`w-4 h-4 ${idx === currentIndex ? cat.text : "text-slate-500"}`} strokeWidth={1.8} />
                    </div>
                    <span className={`text-sm font-medium ${idx === currentIndex ? cat.text : "text-slate-600"}`}>
                      {cat.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={nextCategory}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm flex-shrink-0"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Category Description Below - No Box */}
          <div className="text-center mt-4">
            <p className="text-slate-500 text-sm">{currentCategory.description}</p>
            <Link 
              href={currentCategory.link} 
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 mt-1 transition-colors"
            >
              <span>Explore {currentCategory.name}</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-emerald-500" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentCategory.topics.map((topic, idx) => {
            const Icon = topic.icon;
            const levelColor = getLevelColor(topic.level);
            
            return (
              <Link
                key={idx}
                href={`${currentCategory.link}/${topic.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
                  
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${currentCategory.lightBg} border ${currentCategory.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${currentCategory.text}`} strokeWidth={1.8} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={11} />
                        {topic.duration}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${levelColor}`}>
                        {topic.level}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {topic.name}
                  </h4>
                  
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                    {topic.desc}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">Learn now</span>
                    <div className={`flex items-center gap-2 text-sm font-semibold ${currentCategory.textDark} group-hover:gap-3 transition-all`}>
                      <span>Start Learning</span>
                      <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Explore Section - Text color changed to black */}
        <div className="text-center mb-10">
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Target size={18} className="text-white" />
            <span className="text-black">Explore All Topics</span>
            <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-slate-400 mt-3 flex items-center justify-center gap-2">
            <Zap size={12} />
            More topics will be added soon
          </p>
        </div>

        {/* Learning Path Card - Fixed visibility */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Award size={24} className="text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl font-bold text-black">Your Financial Analyst Journey</h4>
                </div>
                <p className="text-slate-300 text-md">Step-by-step path to master core finance analyst skills</p>
              </div>
            </div>
            <Link 
              href="/learning-path" 
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-all shadow-md group"
            >
              <span>Start Learning</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Lock icon component
const Lock = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default FinanceTopics;
