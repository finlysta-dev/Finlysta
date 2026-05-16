"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp, Landmark, Wallet, Calculator, LineChart,
  BarChart3, Database, FileSpreadsheet, Code, Clock,
  ChevronRight, ArrowRight, Table, Filter, GitBranch, Cpu,
  GraduationCap, BookOpen, Sparkles, Zap, Users, Target,
  Play
} from "lucide-react";

const FinanceTopics = () => {
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    { 
      name: "Finance", 
      icon: BarChart3, 
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-200",
      link: "/learn/finance",
      description: "Master financial statements, ratios & forecasting",
      topicCount: "6 topics",
      topics: [
        { name: "Profit & Loss", slug: "profit-loss", desc: "Revenue, expenses & profit analysis", duration: "15 min", icon: TrendingUp, level: "Beginner", popular: true },
        { name: "Balance Sheet", slug: "balance-sheet", desc: "Assets, liabilities & equity", duration: "20 min", icon: Landmark, level: "Beginner", popular: false },
        { name: "Budgeting", slug: "budgeting", desc: "Plan & control finances effectively", duration: "16 min", icon: Calculator, level: "Beginner", popular: false },
        { name: "Cash Flow", slug: "cash-flow", desc: "Track money movement", duration: "22 min", icon: Wallet, level: "Intermediate", popular: true },
        { name: "Financial Ratios", slug: "financial-ratios", desc: "Liquidity & profitability metrics", duration: "18 min", icon: TrendingUp, level: "Intermediate", popular: false },
        { name: "Forecasting", slug: "forecasting", desc: "Predict future financial trends", duration: "14 min", icon: LineChart, level: "Advanced", popular: false }
      ]
    },
    { 
      name: "Advanced Excel", 
      icon: FileSpreadsheet, 
      gradient: "from-red-400 to-pink-400",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-200",
      link: "/learn/excel",
      description: "Master spreadsheets for financial analysis",
      topicCount: "6 topics",
      topics: [
        { name: "Data Validation", slug: "data-validation", desc: "Control & restrict data entry", duration: "12 min", icon: Table, level: "Beginner", popular: true },
        { name: "Conditional Formatting", slug: "conditional-formatting", desc: "Highlight trends visually", duration: "10 min", icon: Filter, level: "Beginner", popular: false },
        { name: "Charts & Graphs", slug: "charts-graphs", desc: "Visualize financial data", duration: "14 min", icon: LineChart, level: "Beginner", popular: false },
        { name: "Pivot Tables", slug: "pivot-tables", desc: "Summarize & analyze datasets", duration: "18 min", icon: Table, level: "Intermediate", popular: true },
        { name: "VLOOKUP", slug: "vlookup", desc: "Find & match data across sheets", duration: "15 min", icon: FileSpreadsheet, level: "Intermediate", popular: false },
        { name: "Macros", slug: "macros", desc: "Automate repetitive tasks", duration: "20 min", icon: Code, level: "Advanced", popular: false }
      ]
    },
    { 
      name: "SQL", 
      icon: Database, 
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-200",
      link: "/learn/sql",
      description: "Query databases like a pro",
      topicCount: "6 topics",
      topics: [
        { name: "SELECT Queries", slug: "select-queries", desc: "Retrieve data efficiently", duration: "12 min", icon: Database, level: "Beginner", popular: true },
        { name: "SQL Joins", slug: "sql-joins", desc: "Combine multiple tables", duration: "16 min", icon: Database, level: "Intermediate", popular: true },
        { name: "Group By", slug: "group-by", desc: "Summarize & aggregate data", duration: "14 min", icon: Table, level: "Intermediate", popular: false },
        { name: "Indexes", slug: "indexes", desc: "Optimize query performance", duration: "15 min", icon: Cpu, level: "Intermediate", popular: false },
        { name: "Subqueries", slug: "subqueries", desc: "Nested queries for complex data", duration: "18 min", icon: GitBranch, level: "Advanced", popular: false },
        { name: "Window Functions", slug: "window-functions", desc: "Advanced analytics", duration: "20 min", icon: LineChart, level: "Advanced", popular: false }
      ]
    },
    { 
      name: "Power BI", 
      icon: BarChart3, 
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-200",
      link: "/learn/powerbi",
      description: "Create stunning dashboards",
      topicCount: "6 topics",
      topics: [
        { name: "Visualizations", slug: "visualizations", desc: "Create interactive dashboards", duration: "15 min", icon: BarChart3, level: "Beginner", popular: true },
        { name: "Filters & Slicers", slug: "filters-slicers", desc: "Interactive report controls", duration: "12 min", icon: Filter, level: "Beginner", popular: false },
        { name: "Data Modeling", slug: "data-modeling", desc: "Relationships & schemas", duration: "18 min", icon: Database, level: "Intermediate", popular: false },
        { name: "Power Query", slug: "power-query", desc: "Transform & clean data", duration: "16 min", icon: FileSpreadsheet, level: "Intermediate", popular: true },
        { name: "DAX Functions", slug: "dax-functions", desc: "Calculate & analyze", duration: "22 min", icon: Calculator, level: "Advanced", popular: false },
        { name: "Row-Level Security", slug: "row-level-security", desc: "Control data access", duration: "14 min", icon: Lock, level: "Advanced", popular: false }
      ]
    },
    { 
      name: "Python", 
      icon: Code, 
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-200",
      link: "/learn/python",
      description: "Automate & analyze with Python",
      topicCount: "6 topics",
      topics: [
        { name: "Python Basics", slug: "python-basics", desc: "Variables, loops & functions", duration: "14 min", icon: Code, level: "Beginner", popular: true },
        { name: "Functions", slug: "functions", desc: "Reusable code blocks", duration: "12 min", icon: GitBranch, level: "Beginner", popular: false },
        { name: "Lists & Dicts", slug: "lists-dicts", desc: "Data structures", duration: "10 min", icon: Database, level: "Beginner", popular: false },
        { name: "Pandas", slug: "pandas", desc: "Data manipulation library", duration: "20 min", icon: Table, level: "Intermediate", popular: true },
        { name: "NumPy", slug: "numpy", desc: "Numerical computing", duration: "16 min", icon: Calculator, level: "Intermediate", popular: false },
        { name: "Data Visualization", slug: "data-viz", desc: "Matplotlib & seaborn", duration: "18 min", icon: LineChart, level: "Advanced", popular: false }
      ]
    }
  ];

  const currentCategory = categories[selectedCategory];

  const getLevelBadge = (level: string) => {
    switch(level) {
      case "Beginner": return { color: "bg-emerald-100 text-emerald-700", icon: "🌱" };
      case "Intermediate": return { color: "bg-amber-100 text-amber-700", icon: "📈" };
      case "Advanced": return { color: "bg-rose-100 text-rose-700", icon: "🚀" };
      default: return { color: "bg-gray-100 text-gray-700", icon: "📚" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">Start Learning for Free</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Master the Skills
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text">
              Recruiters Are Looking For
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Bite-sized lessons designed to help you build a successful finance career
          </p>
        </div>

        {/* CATEGORY TABS - Modern Design with Changed Background */}
        <div className="mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 justify-center min-w-max">
            {categories.map((cat, idx) => {
              const isActive = idx === selectedCategory;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(idx)}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <cat.icon size={20} className={isActive ? "text-white" : "text-slate-500"} />
                  <span>{cat.name}</span>
                  <span className={`text-xs rounded-full px-2 py-0.5 ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                    {cat.topics.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COURSE GRID - Modern Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.topics.map((topic, idx) => {
            const Icon = topic.icon;
            const levelBadge = getLevelBadge(topic.level);
            const isHovered = hoveredTopic === idx;

            return (
              <Link
                key={idx}
                href={`${currentCategory.link}/${topic.slug}`}
                onMouseEnter={() => setHoveredTopic(idx)}
                onMouseLeave={() => setHoveredTopic(null)}
                className="group"
              >
                <div className={`bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${
                  isHovered ? 'shadow-xl -translate-y-1' : 'shadow-sm hover:shadow-lg'
                }`}>
                  
                  {/* Card Header with Gradient Line */}
                  <div className={`h-1 bg-gradient-to-r ${currentCategory.gradient}`}></div>
                  
                  <div className="p-6">
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentCategory.bgGradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={22} className="text-slate-700" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${levelBadge.color}`}>
                          <span>{levelBadge.icon}</span>
                          <span>{topic.level}</span>
                        </span>
                        {topic.popular && (
                          <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <Zap size={10} />
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">
                      {topic.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {topic.desc}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                      <Clock size={14} />
                      <span>{topic.duration}</span>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Play size={14} className="text-emerald-500" />
                        <span>Start Learning</span>
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isHovered ? `bg-gradient-to-r ${currentCategory.gradient} text-white` : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        <ArrowRight size={16} className={isHovered ? "text-white" : ""} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* STATS SECTION */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, label: "Free Lessons", value: "30+", gradient: "from-emerald-500 to-teal-500", description: "Bite-sized tutorials" },
            { icon: Clock, label: "Learning Hours", value: "15+", gradient: "from-blue-500 to-indigo-500", description: "Self-paced learning" },
            { icon: Users, label: "Active Learners", value: "5,000+", gradient: "from-purple-500 to-pink-500", description: "Growing community" },
          ].map((stat, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-700 mb-1">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA - Modern */}
        <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-10 text-center">
          <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
              <Target size={14} className="text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">Career-Focused Learning Path</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-300 mb-8 max-w-md mx-auto">
              Join thousands of learners mastering finance skills for their dream careers
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              Explore All Topics
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

// Lock icon component
const Lock = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default FinanceTopics;