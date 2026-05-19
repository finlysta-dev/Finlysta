"use client";

import Link from 'next/link';
import { useState } from 'react';
import { 
  Clock, ChevronRight, ChevronLeft, CheckCircle, Target, Activity,
  Lightbulb, BookOpen, Zap, ArrowRight, Star, 
  GraduationCap, Award, Sparkles, Users,
  Briefcase, Brain, ChartLine, Calculator,
  HelpCircle, AlertCircle, TrendingUp, TrendingDown,
  DollarSign, Percent, PieChart, BarChart3, Shield
} from 'lucide-react';

export default function ProfitLossPage() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showQuizAnswers, setShowQuizAnswers] = useState(false);
  
  const content = {
    title: 'Profit & Loss Statement Explained for Beginners',
    seoTitle: 'Profit & Loss Statement Explained for Beginners',
    seoDescription: 'Learn how companies track revenue, expenses, and profitability using real-world financial statement examples. Complete guide with formulas, examples, and practice exercises.',
    level: 'Beginner',
    duration: '12 min',
    category: 'Finance Fundamentals',
    definition: 'A Profit & Loss (P&L) Statement, also known as an Income Statement, is one of the three core financial statements that shows a company\'s financial performance over a specific period. It tracks all revenues (income) and expenses to calculate whether the business generated a profit or suffered a loss during that time. This statement is crucial for investors, managers, and stakeholders to understand operational efficiency and profitability trends.',
    whatYouWillLearn: [
      'Understand revenue and expenses',
      'Calculate gross profit and net profit',
      'Analyze profit margins',
      'Read real P&L statements',
      'Identify business profitability trends'
    ],
    whoShouldLearn: [
      'Finance students', 'BCom students', 'MBA aspirants',
      'Financial analysts', 'Accounting beginners', 'Startup founders'
    ],
    whyItMatters: [
      { use: 'Measure Profitability', description: 'Know if your business is making money' },
      { use: 'Track Trends', description: 'Compare performance over different periods' },
      { use: 'Identify Cost Drivers', description: 'See where money is being spent' },
      { use: 'Make Decisions', description: 'Guide business strategy and investments' }
    ],
    careers: ['Financial Analyst', 'FP&A Analyst', 'Investment Banking', 'Equity Research', 'Business Analyst', 'Accountant'],
    tools: ['Excel', 'Power BI', 'QuickBooks', 'SAP', 'Tableau', 'Xero'],
    updatedDate: '2026-01-15'
  };

  const getLevelBadge = () => {
    return 'bg-green-100 text-green-700';
  };

  const getLevelIcon = () => {
    return '🌱';
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/learn" className="text-gray-500 hover:text-gray-700">Learn</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/learn/finance-fundamentals" className="text-gray-500 hover:text-gray-700">Finance Fundamentals</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-medium">Profit & Loss Statement</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            
            {/* Hero Section - Premium Design */}
            <div className="relative mb-12 rounded-3xl overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                        <TrendingUp size={24} className="text-[#FFD700]" />
                      </div>
                      <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">{content.title}</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700`}>
                        <span className="text-base">{getLevelIcon()}</span>
                        <span>Beginner</span>
                      </span>
                      <span className="flex items-center gap-2 text-gray-300 text-sm"><Clock size={16} />12 min</span>
                      <span className="flex items-center gap-2 text-gray-300 text-sm"><GraduationCap size={16} />Lesson</span>
                      <span className="flex items-center gap-2 text-gray-300 text-sm">Updated {content.updatedDate}</span>
                    </div>
                    <p className="text-gray-300 text-base max-w-2xl leading-relaxed">{content.seoDescription}</p>
                  </div>
                  
                  {/* Floating Stats Cards */}
                  <div className="flex gap-3">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center min-w-[100px]">
                      <DollarSign size={24} className="text-[#FFD700] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">30%</div>
                      <div className="text-xs text-gray-300">Avg. Net Margin</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center min-w-[100px]">
                      <TrendingUp size={24} className="text-[#FFD700] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">15%</div>
                      <div className="text-xs text-gray-300">Revenue Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* P&L Flow Diagram - Premium Horizontal Cards */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <ChartLine size={20} className="text-orange-600" />
                </div>
                Visual Guide: P&L Flow
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border-l-4 border-blue-500">
                  <DollarSign size={28} className="text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-800">Revenue</div>
                  <div className="text-xs text-blue-600">Total Income</div>
                  <div className="mt-2 text-2xl font-bold text-blue-800">↓</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border-l-4 border-red-500">
                  <TrendingDown size={28} className="text-red-600 mx-auto mb-2" />
                  <div className="font-bold text-red-800">COGS</div>
                  <div className="text-xs text-red-600">Direct Costs</div>
                  <div className="mt-2 text-2xl font-bold text-red-800">↓</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border-l-4 border-emerald-500 shadow-md">
                  <PieChart size={28} className="text-emerald-600 mx-auto mb-2" />
                  <div className="font-bold text-emerald-800">Gross Profit</div>
                  <div className="text-xs text-emerald-600">Revenue - COGS</div>
                  <div className="mt-2 text-2xl font-bold text-emerald-800">↓</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border-l-4 border-amber-500">
                  <AlertCircle size={28} className="text-amber-600 mx-auto mb-2" />
                  <div className="font-bold text-amber-800">Expenses</div>
                  <div className="text-xs text-amber-600">Operating Costs</div>
                  <div className="mt-2 text-2xl font-bold text-amber-800">↓</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border-l-4 border-purple-500 shadow-lg">
                  <Award size={28} className="text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-purple-800">Net Profit</div>
                  <div className="text-xs text-purple-600">Bottom Line</div>
                </div>
              </div>
            </section>

            {/* Apple Dashboard Card - Premium */}
            <section className="mb-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Briefcase size={20} className="text-[#FFD700]" />
                </div>
                <h3 className="text-white font-semibold text-lg">🍎 Apple Inc. Financial Snapshot (2023)</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-gray-400 text-xs">Revenue</div>
                  <div className="text-white font-bold text-xl">$383.3B</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-gray-400 text-xs">COGS</div>
                  <div className="text-white font-bold text-xl">$214.1B</div>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-3 text-center border border-emerald-500/30">
                  <div className="text-emerald-300 text-xs">Gross Profit</div>
                  <div className="text-emerald-400 font-bold text-xl">$169.2B</div>
                  <div className="text-emerald-300 text-xs">44.1% margin</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-gray-400 text-xs">Operating Exp.</div>
                  <div className="text-white font-bold text-xl">$54.8B</div>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-3 text-center border border-purple-500/30">
                  <div className="text-purple-300 text-xs">Net Profit</div>
                  <div className="text-purple-400 font-bold text-xl">$97.0B</div>
                  <div className="text-purple-300 text-xs">25.3% margin</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Apple's high gross margin (44.1%) shows strong pricing power and efficient production. The company generates significant profit even after operating expenses.</p>
            </section>

            {/* What You'll Learn - With Icons */}
            <section className="mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Brain size={20} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">What You'll Learn</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {content.whatYouWillLearn.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white/60 rounded-xl hover:bg-white transition">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Who Should Learn - Pills */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Users size={20} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Who Should Learn This</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {content.whoShouldLearn.map((item: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition">{item}</span>
                ))}
              </div>
            </section>

            {/* What is it - Expanded Definition */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">What is a Profit & Loss Statement?</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-5">
                <p className="text-gray-800 leading-relaxed text-base">{content.definition}</p>
              </div>
            </section>

            {/* Key Formulas - Formula Cards */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Calculator size={20} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Key Formulas</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-gray-900 mb-2">Gross Profit Formula</h3>
                  <div className="bg-gray-100 rounded-xl p-4 mb-3 text-center">
                    <code className="text-xl font-mono text-gray-800">Gross Profit = Revenue - COGS</code>
                  </div>
                  <p className="text-gray-600 text-sm">Measures core business profitability before operating expenses. Example: If revenue is ₹10L and COGS is ₹4L, Gross Profit = ₹6L.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-gray-900 mb-2">Net Profit Formula</h3>
                  <div className="bg-gray-100 rounded-xl p-4 mb-3 text-center">
                    <code className="text-xl font-mono text-gray-800">Net Profit = Revenue - Total Expenses</code>
                  </div>
                  <p className="text-gray-600 text-sm">Final earnings after all costs including operating expenses, interest, and taxes. This is the "bottom line".</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-gray-900 mb-2">Gross Profit Margin</h3>
                  <div className="bg-gray-100 rounded-xl p-4 mb-3 text-center">
                    <code className="text-xl font-mono text-gray-800">Gross Margin = (Gross Profit / Revenue) × 100</code>
                  </div>
                  <p className="text-gray-600 text-sm">Shows percentage of revenue remaining after COGS. Higher margins indicate strong pricing power or efficient production.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-gray-900 mb-2">Net Profit Margin</h3>
                  <div className="bg-gray-100 rounded-xl p-4 mb-3 text-center">
                    <code className="text-xl font-mono text-gray-800">Net Margin = (Net Profit / Revenue) × 100</code>
                  </div>
                  <p className="text-gray-600 text-sm">Shows overall profitability after all expenses. Software companies often have 20-30% net margins.</p>
                </div>
              </div>
            </section>

            {/* Why It Matters - Icon Cards */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Target size={20} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Why It Matters</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition">
                      <DollarSign size={18} className="text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Measure Profitability</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-14">Know if your business is making money and where profits come from.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition">
                      <TrendingUp size={18} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Track Trends</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-14">Compare performance over different periods to identify growth or decline.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition">
                      <AlertCircle size={18} className="text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Identify Cost Drivers</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-14">See exactly where money is being spent and find opportunities to reduce costs.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition">
                      <Briefcase size={18} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Make Decisions</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-14">Guide business strategy, investments, and operational improvements.</p>
                </div>
              </div>
            </section>

            {/* Careers Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Briefcase size={20} className="text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Careers That Use This Skill</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {content.careers.map((career: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition">{career}</span>
                ))}
              </div>
            </section>

            {/* Tools Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <BarChart3 size={20} className="text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Tools Used by Analysts</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {content.tools.map((tool: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium hover:bg-cyan-200 transition">{tool}</span>
                ))}
              </div>
            </section>

            {/* Try It Yourself - Interactive Quiz */}
            <section className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-l-4 border-amber-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <HelpCircle size={20} className="text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Quick Quiz</h2>
              </div>
              <p className="text-gray-700 mb-4">Test your understanding:</p>
              <div className="bg-white rounded-xl p-5 mb-4">
                <p className="font-medium text-gray-800 mb-3">If revenue increases while expenses remain constant, what happens to net profit?</p>
                <button
                  onClick={() => setShowQuizAnswers(!showQuizAnswers)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition"
                >
                  {showQuizAnswers ? 'Hide Answer' : 'Show Answer'}
                </button>
                {showQuizAnswers && (
                  <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                    <p className="text-emerald-800 text-sm">✓ Net profit increases. Revenue growth with fixed costs leads to higher profitability.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Practice Exercise */}
            <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Practice Exercise</h2>
              </div>
              <p className="text-gray-700 mb-4">A company has the following financial data:</p>
              <div className="bg-white rounded-xl p-5 mb-4 font-mono text-gray-800">
                <p>Revenue = ₹10,00,000</p>
                <p>COGS = ₹4,00,000</p>
                <p>Operating Expenses = ₹2,00,000</p>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700">📌 Calculate Gross Profit</p>
                <p className="text-gray-700">📌 Calculate Net Profit</p>
                <p className="text-gray-700">📌 Calculate Gross Margin</p>
                <p className="text-gray-700">📌 Calculate Net Margin</p>
              </div>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              {showAnswers && (
                <div className="mt-4 bg-emerald-50 rounded-lg p-4 space-y-1">
                  <p className="text-emerald-800 text-sm">✓ Gross Profit = ₹10,00,000 - ₹4,00,000 = ₹6,00,000</p>
                  <p className="text-emerald-800 text-sm">✓ Net Profit = ₹10,00,000 - ₹4,00,000 - ₹2,00,000 = ₹4,00,000</p>
                  <p className="text-emerald-800 text-sm">✓ Gross Margin = (₹6,00,000 / ₹10,00,000) × 100 = 60%</p>
                  <p className="text-emerald-800 text-sm">✓ Net Margin = (₹4,00,000 / ₹10,00,000) × 100 = 40%</p>
                </div>
              )}
            </section>

            {/* Key Takeaways */}
            <section className="mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Award size={20} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Key Takeaways</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Revenue is total income from sales and services</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Gross profit shows core business profitability after direct costs</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Net profit is the final bottom line after all expenses</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Profit margins help compare efficiency across companies and industries</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>P&L statements help investors, managers, and creditors evaluate business performance</span>
                </li>
              </ul>
            </section>

            {/* Internal Links Section */}
            <section className="mb-12 bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Continue Learning</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/learn/finance-fundamentals/balance-sheet" className="text-blue-600 hover:text-blue-800 text-sm font-medium">← Balance Sheet</Link>
                <Link href="/learn/finance-fundamentals/cash-flow-statement" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Cash Flow Statement →</Link>
                <Link href="/learn/finance-fundamentals/financial-ratios" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Financial Ratios →</Link>
              </div>
            </section>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <Link href="/learn/finance-fundamentals" className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition text-sm font-medium">
                <ChevronLeft size={16} />
                All Topics
              </Link>
              <Link href="/learn/finance-fundamentals/balance-sheet" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-xl transition hover:shadow-lg text-sm font-medium group">
                Next Lesson: Balance Sheet
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">On This Page</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#what-is" className="text-gray-600 hover:text-[#FFD700] transition">What is a P&L?</a></li>
                  <li><a href="#formulas" className="text-gray-600 hover:text-[#FFD700] transition">Key Formulas</a></li>
                  <li><a href="#why-matters" className="text-gray-600 hover:text-[#FFD700] transition">Why It Matters</a></li>
                  <li><a href="#key-concepts" className="text-gray-600 hover:text-[#FFD700] transition">Key Concepts</a></li>
                  <li><a href="#examples" className="text-gray-600 hover:text-[#FFD700] transition">Examples</a></li>
                  <li><a href="#faq" className="text-gray-600 hover:text-[#FFD700] transition">FAQs</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}