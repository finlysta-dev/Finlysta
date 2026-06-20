// app/blogs/vlookup-in-excel-complete-guide/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, CheckCircle, Clock, User, ArrowRight, Users, Package,
  ChevronLeft, Mail, BookOpen, Target, AlertCircle,
  Table, FileSpreadsheet, Calculator, BarChart3,
  TrendingUp, PieChart, DollarSign, Briefcase, Building2,
  Zap, Shield, XCircle, CheckCheck, Copy, Calendar,
  Home, FolderOpen, Files, List, Menu, Search, Command,
  Navigation, Eye, Layers, Clipboard, Save, Undo2, Redo2,
  HelpCircle, Award, ThumbsUp, Sparkles
} from "lucide-react";

// ============================================
// BREADCRUMB
// ============================================
const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <Link href="/" className="text-slate-500 hover:text-blue-600 transition">
        Learning Hub
      </Link>
      <ChevronRight size={14} className="text-slate-400" />
      <Link href="/blogs/excel" className="text-slate-500 hover:text-blue-600 transition">
        Advanced Excel
      </Link>
      <ChevronRight size={14} className="text-slate-400" />
      <span className="text-[#2563EB] font-semibold">VLOOKUP in Excel - Complete Guide</span>
    </div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="mb-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            Topic 4 of 12
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#081B4B] mt-6 leading-tight">
            VLOOKUP in Excel -
            <br />
            <span className="text-black">Complete Guide</span>
          </h1>

          <p className="mt-6 text-xl text-slate-700 leading-relaxed">
            Learn VLOOKUP with examples and practical use cases. 
            <br />
            Master one of Excel's most powerful functions for finance
            <br />
            and data analysis.
          </p>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-blue-600" />
              <span className="text-black font-medium">10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" />
              <span className="text-black font-medium">Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={18} className="text-blue-600" />
              <span className="text-black font-medium">Intermediate</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-start -ml-24 lg:-ml-48">
          <div className="relative w-full max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-green-100/20 rounded-full opacity-30 blur-2xl"></div>
            <div className="relative">
              <Image
                src="/vlookups.png"
                alt="VLOOKUP in Excel"
                width={600}
                height={400}
                className="relative object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHAT YOU'LL LEARN & ON THIS PAGE - Side by Side
// ============================================
const LearnAndContents = () => {
  const learnItems = [
    "What is VLOOKUP and how it works",
    "VLOOKUP syntax explained",
    "Example with step-by-step explanations",
    "Practical use cases in finance and analysis",
    "Common errors and how to fix them",
  ];

  const sections = [
    { number: "1.", title: "What is VLOOKUP?" },
    { number: "2.", title: "VLOOKUP Example" },
    { number: "3.", title: "Practical Use Cases" },
    { number: "4.", title: "Common Errors & Fixes" },
    { number: "5.", title: "Tips & Best Practices" },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - What You'll Learn */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#081B4B] mb-4 flex items-center gap-3">
            <BookOpen size={24} className="text-green-600" />
            What You'll Learn
          </h2>
          <div className="space-y-3">
            {learnItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-[16px] text-slate-700"
              >
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - On This Page */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-[#081B4B] text-lg mb-4 flex items-center gap-2">
            <List size={20} className="text-blue-600" />
            Table of Contents
          </h3>
          <div className="space-y-1">
            {sections.map((section, idx) => (
              <a
                key={idx}
                href={`#section-${idx + 1}`}
                className="flex items-center gap-2 text-[15px] text-slate-700 hover:text-blue-600 transition hover:bg-blue-50 px-3 py-2 rounded-lg"
              >
                <span className="text-blue-600 font-semibold min-w-[28px]">
                  {section.number}
                </span>
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 1: WHAT IS VLOOKUP? - WITH SIDEBAR
// ============================================
const WhatIsVlookup = () => {
  return (
    <section id="section-1" className="mb-12 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content - 2 columns */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-[#081B4B] mb-4">1. What is VLOOKUP?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            VLOOKUP stands for Vertical Lookup. It is an Excel function used to search for a value
            <br/>
            in the first column of a table and return a value from the same row in a specified column.
          </p>

          {/* Syntax Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* Formula */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 overflow-x-auto">
              <code className="text-[20px] font-bold whitespace-nowrap">
                <span className="text-green-700">=VLOOKUP</span>
                <span className="text-slate-700">(</span>

                <span className="text-blue-600">lookup_value</span>
                <span className="text-slate-700">, </span>

                <span className="text-blue-600">table_array</span>
                <span className="text-slate-700">, </span>

                <span className="text-orange-500">col_index_num</span>
                <span className="text-slate-700">, </span>

                <span className="text-purple-600">[range_lookup]</span>

                <span className="text-slate-700">)</span>
              </code>
            </div>

            {/* Breakdown - 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="text-green-700 font-bold text-base mb-1">lookup_value</h4>
                <p className="text-black text-sm leading-5">The value to search for</p>
              </div>
              <div>
                <h4 className="text-blue-600 font-bold text-base mb-1">table_array</h4>
                <p className="text-black text-sm leading-5">The table or range where to search</p>
              </div>
              <div>
                <h4 className="text-orange-500 font-bold text-base mb-1">col_index_num</h4>
                <p className="text-black text-sm leading-5">Column number to return the value</p>
              </div>
              <div>
                <h4 className="text-purple-600 font-bold text-base mb-1">[range_lookup]</h4>
                <p className="text-black text-sm leading-5">FALSE for exact, TRUE for approximate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Master Excel CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-blue-200" />
              <span className="text-xs font-semibold text-blue-200">CAREER RESOURCE</span>
            </div>
            <h3 className="text-xl font-bold">Master Excel for Finance Careers</h3>
            <p className="text-sm text-blue-100 mt-2">Learn the Excel skills that top finance professionals use daily.</p>
            <button className="w-full mt-4 px-4 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition text-sm">
              Get Started →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: VLOOKUP EXAMPLE - FIXED ALIGNMENT
// ============================================
const VlookupExample = () => {
  return (
    <section id="section-2" className="mb-12 scroll-mt-20">
      <h2 className="text-3xl font-bold text-[#081B4B] mb-4">2. VLOOKUP Example</h2>
      <p className="text-[18px] text-slate-600 mb-6">
        Let's understand VLOOKUP with a simple example.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Employee Table */}
        <div className="flex-1">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#138A4A] text-white">
                  <th className="px-4 py-3 text-left text-[15px] font-semibold">Employee ID</th>
                  <th className="px-4 py-3 text-left text-[15px] font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-[15px] font-semibold">Department</th>
                  <th className="px-4 py-3 text-left text-[15px] font-semibold">Salary</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["101","Aarav Sharma","Finance","55000"],
                  ["102","Neha Verma","HR","48000"],
                  ["103","Rohan Mehta","Marketing","52000"],
                  ["104","Priya Singh","Finance","56000"],
                  ["105","Karan Patel","IT","60000"],
                ].map((row,index)=>(
                  <tr key={index} className="border-t border-slate-100">
                    {row.map((cell,i)=>(
                      <td
                        key={i}
                        className="px-4 py-3 text-[15px] text-black"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Result + Formula */}
        <div className="w-full lg:w-[380px] flex-shrink-0 space-y-5">
          {/* Result Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-4 py-3 text-left font-semibold text-black text-[15px]">
                    Employee ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-black text-[15px]">
                    Salary
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-4 border-2 border-green-500 text-center text-black font-medium text-[15px]">
                    103
                  </td>
                  <td className="px-4 py-4 border-2 border-green-500 text-center text-black font-medium text-[15px]">
                    52000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Formula Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-black mb-2 text-[15px]">
              Formula used:
            </p>
            <p className="text-[18px] font-bold text-[#081B4B] mb-4">
              =VLOOKUP(F5, A2:D6, 4, FALSE)
            </p>
            <p className="font-bold text-black mb-2 text-[15px]">
              Explanation:
            </p>
            <ul className="space-y-2 text-[15px] text-slate-700">
              <li>• F5 → Lookup value (103)</li>
              <li>• A2:D6 → Table array</li>
              <li>• 4 → Return value from 4th column (Salary)</li>
              <li>• FALSE → Exact match</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: PRACTICAL USE CASES
// ============================================
const UseCases = () => {
  const cases = [
    {
      title: "Salary Lookup",
      description: "Find employee salary by Employee ID",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Product Price Lookup",
      description: "Look up product prices by product code",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Client Information",
      description: "Retrieve client details from database",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-100"
    },
    {
      title: "Financial Reports",
      description: "Pull financial data from multiple sheets",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section id="section-3" className="mb-12 scroll-mt-20">
      <h2 className="text-3xl font-bold text-[#081B4B] mb-4">3. Practical Use Cases in Finance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cases.map((useCase, idx) => {
          const Icon = useCase.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:shadow-lg transition">
              <div className={`w-14 h-14 rounded-full ${useCase.bgColor} flex items-center justify-center mx-auto mb-3`}>
                <Icon size={28} className={useCase.color} />
              </div>
              <h3 className="text-lg font-bold text-black mb-1.5">{useCase.title}</h3>
              <p className="text-sm text-slate-600 leading-5">{useCase.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: COMMON ERRORS
// ============================================
const ErrorsTable = () => {
  const errors = [
    {
      error: "#N/A",
      cause: "Value not found",
      fix: "Check lookup value or use IFNA()"
    },
    {
      error: "#VALUE!",
      cause: "Incorrect table_array or column index",
      fix: "Ensure range and column number are correct"
    },
    {
      error: "Wrong Result",
      cause: "Approximate match used",
      fix: "Use FALSE for exact match"
    }
  ];

  return (
    <section id="section-4" className="mb-12 scroll-mt-20">
      <h2 className="text-3xl font-bold text-[#081B4B] mb-4">
        4. Common Errors and How to Fix Them
      </h2>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-md">
          <thead>
            <tr className="bg-slate-100 text-black font-bold">
              <th className="px-4 py-2.5 text-left">Error</th>
              <th className="px-4 py-2.5 text-left">Cause</th>
              <th className="px-4 py-2.5 text-left">Solution</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {errors.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-100">
                <td className="px-4 py-2.5 font-mono text-red-600 font-bold">{item.error}</td>
                <td className="px-4 py-2.5 text-slate-600">{item.cause}</td>
                <td className="px-4 py-2.5 text-slate-600">{item.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: TIPS & BEST PRACTICES
// ============================================
const TipsSection = () => {
  const tips = [
    "Always use FALSE for exact match unless you need approximate matching",
    "Use absolute references ($A$1:$D$100) for table_array to avoid errors",
    "Sort data ascending if using TRUE for approximate match",
    "Use VLOOKUP with IFERROR for cleaner error handling",
    "Consider XLOOKUP for more flexibility (if available)"
  ];

  return (
    <section id="section-5" className="mb-12 scroll-mt-20">
      <h2 className="text-[34px] font-bold text-[#081B4B] mb-6">5. Tips & Best Practices</h2>
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <ul className="space-y-2.5">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
              <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap size={12} className="text-blue-600" />
              </div>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: VLOOKUP VS XLOOKUP
// ============================================
const VlookupVsXlookup = () => {
  return (
    <section id="section-6" className="mb-12 scroll-mt-20">
      <h2 className="text-[34px] font-bold text-[#081B4B] mb-6">6. VLOOKUP vs XLOOKUP</h2>
      <p className="text-[18px] text-slate-700 mb-6">
        XLOOKUP is the modern replacement for VLOOKUP with more flexibility.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileSpreadsheet size={20} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-[#081B4B] text-xl">VLOOKUP</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">• Only looks right (vertical)</li>
            <li className="flex items-start gap-2">• Requires column index number</li>
            <li className="flex items-start gap-2">• Limited to exact or approximate</li>
            <li className="flex items-start gap-2">• Older function</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-[#081B4B] text-xl">XLOOKUP</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">✓ Looks both left and right</li>
            <li className="flex items-start gap-2">✓ No column index needed</li>
            <li className="flex items-start gap-2">✓ More flexible matching</li>
            <li className="flex items-start gap-2">✓ Modern replacement</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function VlookupBlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <Breadcrumb />
      <HeroSection />
      <LearnAndContents />
      <WhatIsVlookup />
      <VlookupExample />
      <UseCases />
      <ErrorsTable />
      <TipsSection />
      <VlookupVsXlookup />
    </main>
  );
}