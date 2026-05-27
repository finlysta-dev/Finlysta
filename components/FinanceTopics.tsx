"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp, Landmark, Wallet, Calculator, LineChart,
  BarChart3, Database, FileSpreadsheet, Code, Clock,
  ChevronRight, ArrowRight, Table, Filter, GitBranch, Cpu,
  GraduationCap, BookOpen, Sparkles, Zap, Users, Target,
  Play, MessageCircle, PieChart
} from "lucide-react";

const FinanceTopics = () => {
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    { 
      name: "Finance Fundamentals", 
      icon: Landmark, 
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-200",
      link: "/learning-hub/finance",
      description: "Master core finance concepts & principles",
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
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-200",
      link: "/learning-hub/excel",
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
      name: "Financial Analysis", 
      icon: TrendingUp, 
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/10 to-orange-500/10",
      borderColor: "border-amber-200",
      link: "/learning-hub/financial-analysis",
      description: "Analyze data & make informed decisions",
      topicCount: "6 topics",
      topics: [
        { name: "Ratio Analysis", slug: "ratio-analysis", desc: "Liquidity, profitability & efficiency ratios", duration: "15 min", icon: TrendingUp, level: "Beginner", popular: true },
        { name: "Variance Analysis", slug: "variance-analysis", desc: "Budget vs actual comparison", duration: "18 min", icon: Calculator, level: "Intermediate", popular: true },
        { name: "Trend Analysis", slug: "trend-analysis", desc: "Identify patterns over time", duration: "12 min", icon: LineChart, level: "Beginner", popular: false },
        { name: "Scenario Analysis", slug: "scenario-analysis", desc: "What-if analysis for decision making", duration: "20 min", icon: Target, level: "Advanced", popular: false },
        { name: "Benchmarking", slug: "benchmarking", desc: "Compare against industry standards", duration: "14 min", icon: BarChart3, level: "Intermediate", popular: false },
        { name: "Sensitivity Analysis", slug: "sensitivity-analysis", desc: "Test key variable impacts", duration: "16 min", icon: LineChart, level: "Advanced", popular: false }
      ]
    },
    { 
      name: "Financial Reporting", 
      icon: FileSpreadsheet, 
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-200",
      link: "/learning-hub/reporting",
      description: "Create professional financial reports",
      topicCount: "6 topics",
      topics: [
        { name: "Annual Reports", slug: "annual-reports", desc: "Understand company performance", duration: "15 min", icon: BookOpen, level: "Beginner", popular: true },
        { name: "Quarterly Reports", slug: "quarterly-reports", desc: "Track periodic performance", duration: "12 min", icon: Calendar, level: "Beginner", popular: false },
        { name: "Management Reports", slug: "management-reports", desc: "Internal decision-making reports", duration: "18 min", icon: Users, level: "Intermediate", popular: true },
        { name: "Regulatory Filing", slug: "regulatory-filing", desc: "Compliance reporting requirements", duration: "20 min", icon: Target, level: "Intermediate", popular: false },
        { name: "Investor Reports", slug: "investor-reports", desc: "Shareholder communication", duration: "14 min", icon: TrendingUp, level: "Advanced", popular: false },
        { name: "Dashboards", slug: "dashboards", desc: "Visual performance tracking", duration: "16 min", icon: PieChart, level: "Advanced", popular: false }
      ]
    },
    { 
      name: "Power BI", 
      icon: BarChart3, 
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-200",
      link: "/learning-hub/powerbi",
      description: "Create stunning dashboards & visualizations",
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
      name: "Business Communication", 
      icon: MessageCircle, 
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-200",
      link: "/learning-hub/communication",
      description: "Master finance communication & presentation",
      topicCount: "6 topics",
      topics: [
        { name: "Report Writing", slug: "report-writing", desc: "Write clear financial reports", duration: "15 min", icon: BookOpen, level: "Beginner", popular: true },
        { name: "Presentation Skills", slug: "presentation-skills", desc: "Present data effectively", duration: "18 min", icon: Users, level: "Intermediate", popular: true },
        { name: "Email Etiquette", slug: "email-etiquette", desc: "Professional email communication", duration: "10 min", icon: MessageCircle, level: "Beginner", popular: false },
        { name: "Client Communication", slug: "client-communication", desc: "Handle client interactions", duration: "16 min", icon: Users, level: "Intermediate", popular: false },
        { name: "Meeting Management", slug: "meeting-management", desc: "Lead finance meetings", duration: "14 min", icon: Calendar, level: "Advanced", popular: false },
        { name: "Negotiation Skills", slug: "negotiation-skills", desc: "Negotiate effectively", duration: "20 min", icon: Target, level: "Advanced", popular: false }
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
    <div className="bg-[#F8FAFC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">Best Learning Hub Categories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-3">
            Master the Skills <span className="text-[#FFD700]">Recruiters Are Looking For</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Bite-sized lessons designed to help you build a successful finance career
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 justify-center min-w-max">
            {categories.map((cat, idx) => {
              const isActive = idx === selectedCategory;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(idx)}
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-[#0A2540] text-white shadow-md`
                      : "bg-white text-[#64748B] hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  <cat.icon size={18} className={isActive ? "text-[#FFD700]" : "text-[#64748B]"} />
                  <span className="text-sm">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COURSE GRID */}
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
                <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  isHovered ? 'shadow-md -translate-y-1' : 'shadow-sm hover:shadow-md'
                }`}>
                  
                  <div className="p-5">
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Icon size={20} className="text-[#FFD700]" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-0.5 ${levelBadge.color}`}>
                          <span>{levelBadge.icon}</span>
                          <span>{topic.level}</span>
                        </span>
                        {topic.popular && (
                          <span className="flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                            <Zap size={9} />
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-[#0A2540] mb-1 group-hover:text-[#FFD700] transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-[#64748B] mb-3 line-clamp-2">
                      {topic.desc}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-1 text-[11px] text-[#64748B] mb-3">
                      <Clock size={12} />
                      <span>{topic.duration}</span>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#0A2540]">
                        <Play size={15} className="text-[#FFD700]" />
                        <span>Start Learning</span>
                      </div>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'bg-[#FFD700] text-[#0A2540]' : 'bg-gray-100 text-[#64748B] group-hover:bg-gray-200'
                      }`}>
                        <ArrowRight size={13} className={isHovered ? "text-[#0A2540]" : ""} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 relative overflow-hidden rounded-xl bg-[#0A2540] p-8 text-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
              <Target size={12} className="text-[#FFD700]" />
              <span className="text-[10px] font-semibold text-[#FFD700]">Career-Focused Learning Path</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 text-sm mb-5 max-w-md mx-auto">
           Start Learning Now
            </p>
            <Link
              href="/learning-hub"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD700] text-[#0A2540] font-semibold rounded-lg hover:bg-[#FFE44D] transition-all text-sm"
            >
              Explore All Topics
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

// Lock icon component
const Lock = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Calendar icon component
const Calendar = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default FinanceTopics;
