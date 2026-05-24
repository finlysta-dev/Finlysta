"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Briefcase, Target, LineChart, Calculator, FileText, TrendingUp, Zap } from "lucide-react";

export default function FinanceFundamentalsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A2540] transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Learning Hub</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="bg-white rounded-xl shadow-sm p-6 md:p-10">
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
            Finance Fundamentals: A Complete Guide for Beginners
          </h1>
          
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1">
              <BookOpen size={14} />
              15 min read
            </span>
            <span>•</span>
            <span>Beginner Level</span>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Finance fundamentals are the building blocks of any successful career in finance. 
              Whether you want to become a Financial Analyst, Investment Banker, or Accountant, 
              mastering these core concepts is essential.
            </p>

            <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
              1. Understanding Financial Statements
            </h2>
            <p className="text-gray-600 mb-4">
              Financial statements are the language of business. Every finance professional 
              must understand these three key statements:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li><strong>Balance Sheet</strong> - Shows what a company owns (assets) and owes (liabilities)</li>
              <li><strong>Income Statement (P&L)</strong> - Shows revenue, expenses, and profit over time</li>
              <li><strong>Cash Flow Statement</strong> - Shows how cash moves in and out of the business</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
              2. Key Financial Ratios
            </h2>
            <p className="text-gray-600 mb-4">
              Financial ratios help analyze company performance. Essential ratios include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li><strong>Profitability Ratios</strong> - Gross Margin, Net Profit Margin, ROE, ROA</li>
              <li><strong>Liquidity Ratios</strong> - Current Ratio, Quick Ratio</li>
              <li><strong>Leverage Ratios</strong> - Debt-to-Equity, Interest Coverage</li>
              <li><strong>Efficiency Ratios</strong> - Inventory Turnover, Receivables Turnover</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
              3. Time Value of Money (TVM)
            </h2>
            <p className="text-gray-600 mb-4">
              The core principle that money today is worth more than the same amount in the future 
              due to its earning potential.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li><strong>Present Value (PV)</strong> - Current worth of future cash flows</li>
              <li><strong>Future Value (FV)</strong> - Value of current money at a future date</li>
              <li><strong>Net Present Value (NPV)</strong> - Used for investment decisions</li>
              <li><strong>Internal Rate of Return (IRR)</strong> - Expected return on investment</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
              4. Accounting Fundamentals
            </h2>
            <p className="text-gray-600 mb-4">
              Understanding basic accounting principles is crucial:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li><strong>Debits and Credits</strong> - Double-entry bookkeeping</li>
              <li><strong>GAAP vs IFRS</strong> - Accounting standards</li>
              <li><strong>Accrual vs Cash Accounting</strong> - Revenue recognition methods</li>
              <li><strong>Depreciation & Amortization</strong> - Asset value reduction over time</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
              5. Financial Modeling Basics
            </h2>
            <p className="text-gray-600 mb-4">
              Financial models help forecast company performance:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li><strong>Three-Statement Model</strong> - Connects all financial statements</li>
              <li><strong>DCF Analysis</strong> - Discounted Cash Flow valuation</li>
              <li><strong>Comparable Company Analysis</strong> - Peer valuation</li>
              <li><strong>Sensitivity Analysis</strong> - Testing different assumptions</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A2540] mt-8 mb-4">
              Next Steps to Master Finance
            </h2>
            <p className="text-gray-600 mb-4">
              After mastering these fundamentals, focus on:
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-600">
              <li>Advanced Excel for finance</li>
              <li>Industry-specific knowledge (Banking, Corporate Finance, Investment)</li>
              <li>Certifications (CFA, CPA, MBA in Finance)</li>
              <li>Building your own financial models</li>
              <li>Applying for internships in your target field</li>
            </ol>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] text-white p-6 rounded-xl text-center mt-8">
              <h3 className="text-xl font-bold mb-2">Ready to Start Your Finance Career?</h3>
              <p className="text-white/80 mb-4">Explore entry-level finance jobs and internships on Finlysta</p>
              <Link href="/jobs">
                <button className="px-6 py-2 bg-[#FFD700] text-[#0A2540] font-semibold rounded-lg hover:bg-[#FFA500] transition">
                  Browse Finance Jobs
                </button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}