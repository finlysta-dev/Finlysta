"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp, Landmark, Wallet, Calculator, LineChart,
  BarChart3, Database, FileSpreadsheet, Code, Clock,
  ChevronRight, ChevronLeft, ArrowRight, Table, Filter, GitBranch, Cpu
} from "lucide-react";

const FinanceTopics = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { 
      name: "Finance", 
      icon: BarChart3, 
      color: "emerald",
      link: "/learn/finance",
      topics: [
        { name: "Profit & Loss", slug: "profit-loss", desc: "Revenue, expenses & profit", duration: "15 min", icon: TrendingUp, level: "Beginner" },
        { name: "Balance Sheet", slug: "balance-sheet", desc: "Assets, liabilities & equity", duration: "20 min", icon: Landmark, level: "Beginner" },
        { name: "Budgeting", slug: "budgeting", desc: "Plan & control finances", duration: "16 min", icon: Calculator, level: "Beginner" },
        { name: "Cash Flow", slug: "cash-flow", desc: "Track money in & out", duration: "22 min", icon: Wallet, level: "Intermediate" },
        { name: "Financial Ratios", slug: "financial-ratios", desc: "Liquidity & profitability", duration: "18 min", icon: TrendingUp, level: "Intermediate" },
        { name: "Forecasting", slug: "forecasting", desc: "Predict future trends", duration: "14 min", icon: LineChart, level: "Advanced" }
      ]
    },
    { 
      name: "Excel", 
      icon: FileSpreadsheet, 
      color: "blue",
      link: "/learn/excel",
      topics: [
        { name: "Data Validation", slug: "data-validation", desc: "Control data entry", duration: "12 min", icon: Table, level: "Beginner" },
        { name: "Conditional Formatting", slug: "conditional-formatting", desc: "Highlight trends", duration: "10 min", icon: Filter, level: "Beginner" },
        { name: "Charts & Graphs", slug: "charts-graphs", desc: "Visualize data", duration: "14 min", icon: LineChart, level: "Beginner" },
        { name: "Pivot Tables", slug: "pivot-tables", desc: "Summarize & analyze", duration: "18 min", icon: Table, level: "Intermediate" },
        { name: "VLOOKUP", slug: "vlookup", desc: "Find & match data", duration: "15 min", icon: FileSpreadsheet, level: "Intermediate" },
        { name: "Macros", slug: "macros", desc: "Automate tasks", duration: "20 min", icon: Code, level: "Advanced" }
      ]
    },
    { 
      name: "SQL", 
      icon: Database, 
      color: "cyan",
      link: "/learn/sql",
      topics: [
        { name: "SELECT Queries", slug: "select-queries", desc: "Retrieve data", duration: "12 min", icon: Database, level: "Beginner" },
        { name: "SQL Joins", slug: "sql-joins", desc: "Combine tables", duration: "16 min", icon: Database, level: "Intermediate" },
        { name: "Group By", slug: "group-by", desc: "Summarize data", duration: "14 min", icon: Table, level: "Intermediate" },
        { name: "Indexes", slug: "indexes", desc: "Optimize performance", duration: "15 min", icon: Cpu, level: "Intermediate" },
        { name: "Subqueries", slug: "subqueries", desc: "Nested queries", duration: "18 min", icon: GitBranch, level: "Advanced" },
        { name: "Window Functions", slug: "window-functions", desc: "Advanced analytics", duration: "20 min", icon: LineChart, level: "Advanced" }
      ]
    },
    { 
      name: "Power BI", 
      icon: BarChart3, 
      color: "orange",
      link: "/learn/powerbi",
      topics: [
        { name: "Visualizations", slug: "visualizations", desc: "Create dashboards", duration: "15 min", icon: BarChart3, level: "Beginner" },
        { name: "Filters & Slicers", slug: "filters-slicers", desc: "Interactive reports", duration: "12 min", icon: Filter, level: "Beginner" },
        { name: "Data Modeling", slug: "data-modeling", desc: "Relationships & schemas", duration: "18 min", icon: Database, level: "Intermediate" },
        { name: "Power Query", slug: "power-query", desc: "Transform data", duration: "16 min", icon: FileSpreadsheet, level: "Intermediate" },
        { name: "DAX Functions", slug: "dax-functions", desc: "Calculate & analyze", duration: "22 min", icon: Calculator, level: "Advanced" },
        { name: "Row-Level Security", slug: "row-level-security", desc: "Control access", duration: "14 min", icon: Lock, level: "Advanced" }
      ]
    },
    { 
      name: "Python", 
      icon: Code, 
      color: "purple",
      link: "/learn/python",
      topics: [
        { name: "Python Basics", slug: "python-basics", desc: "Variables, loops & functions", duration: "14 min", icon: Code, level: "Beginner" },
        { name: "Functions", slug: "functions", desc: "Reusable code", duration: "12 min", icon: GitBranch, level: "Beginner" },
        { name: "Lists & Dicts", slug: "lists-dicts", desc: "Data structures", duration: "10 min", icon: Database, level: "Beginner" },
        { name: "Pandas", slug: "pandas", desc: "Data manipulation", duration: "20 min", icon: Table, level: "Intermediate" },
        { name: "NumPy", slug: "numpy", desc: "Numerical computing", duration: "16 min", icon: Calculator, level: "Intermediate" },
        { name: "Data Visualization", slug: "data-viz", desc: "Matplotlib & seaborn", duration: "18 min", icon: LineChart, level: "Advanced" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentCategory = categories[currentIndex];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "text-emerald-600" },
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: "text-blue-600" },
      cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", icon: "text-cyan-600" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", icon: "text-orange-600" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", icon: "text-purple-600" }
    };
    return colors[color] || colors.emerald;
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const colorClasses = getColorClasses(currentCategory.color);
  const CurrentIcon = currentCategory.icon;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HEADER - Added the text in middle */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Hub - Skills You Need to Get Hired</h1>
          <p className="text-gray-600 text-lg">Bite-sized lessons to build your financial analyst knowledge</p>
        </div>

        {/* CATEGORY TABS - Removed gap */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 justify-center">
          {categories.map((cat, idx) => {
            const colors = getColorClasses(cat.color);
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  idx === currentIndex
                    ? `${colors.bg} ${colors.text} border border-current`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <cat.icon size={18} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentCategory.topics.map((topic, idx) => {
            const Icon = topic.icon;
            const levelColor = getLevelColor(topic.level);

            return (
              <Link
                key={idx}
                href={`${currentCategory.link}/${topic.slug}`}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition-all">
                  
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                      <Icon size={20} className={colorClasses.icon} />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${levelColor}`}>
                      {topic.level}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{topic.desc}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={14} />
                      {topic.duration}
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to start learning?</h2>
          <p className="text-gray-600 mb-6">Step-by-step path to master core finance analyst skills</p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Explore All Topics
            <ArrowRight size={18} />
          </Link>
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