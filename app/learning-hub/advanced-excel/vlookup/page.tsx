// app/blogs/vlookup-in-excel-complete-guide/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, CheckCircle, Clock, User, ArrowRight, Users, Package,CircleCheckBig, Trophy,
  ChevronLeft, Mail, BookOpen, Target, AlertCircle,
  Table, FileSpreadsheet, Calculator, BarChart3,
  TrendingUp, PieChart, DollarSign, Briefcase, Building2,
  Zap, Shield, XCircle, CheckCheck, Copy, Calendar,
  Home, FolderOpen, Files, List, Menu, Search, Command,
  Navigation, Eye, Layers, Clipboard, Save, Undo2, Redo2,
  HelpCircle, Award, ThumbsUp, Sparkles, Download
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
              <span className="text-black font-medium">20 min read</span>
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
    "Limitations & better alternatives",
  ];

  const sections = [
    { number: "1.", title: "What is VLOOKUP?" },
    { number: "2.", title: "Syntax Breakdown" },
    { number: "3.", title: "How VLOOKUP Works" },
    { number: "4.", title: "Exact vs Approximate Match" },
    { number: "5.", title: "Practical Example" },
    { number: "6.", title: "Real Finance Use Cases" },
    { number: "7.", title: "Common Errors" },
    { number: "8.", title: "Limitations of VLOOKUP" },
    { number: "9.", title: "VLOOKUP vs INDEX MATCH" },
    { number: "10.", title: "VLOOKUP vs XLOOKUP" },
    { number: "11.", title: "Practice Exercises" },
    { number: "12.", title: "Key Takeaways" },
  ];

  return (
    <section className="mb-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left - What You'll Learn - INCREASED SIZE */}
        <div className="lg:max-w-[500px]">
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#081B4B] mb-3 flex items-center gap-2">
              <BookOpen size={20} className="text-green-600" />
              What You'll Learn
            </h2>
            <div className="space-y-2.5">
              {learnItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[15px] text-black font-medium">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* Right - On This Page - SHIFTED TO RIGHT */}
<div className="flex flex-col lg:flex-row gap-6 items-end justify-end w-full">
  <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:max-w-[280px] lg:ml-auto">
    <h3 className="font-bold text-[#081B4B] text-base mb-2.5 flex items-center gap-2">
      <List size={16} className="text-blue-600" />
      On this page
    </h3>
    <div className="space-y-1">
      {sections.map((section, idx) => (
        <a
          key={idx}
          href={`#section-${idx + 1}`}
          className="flex items-center gap-2 text-[12px] text-black font-medium hover:text-blue-600 transition hover:bg-blue-50 px-2 py-1 rounded"
        >
          <span className="text-blue-600 font-semibold text-[9px] min-w-[20px]">
            {section.number}
          </span>
          <span>{section.title}</span>
        </a>
      ))}
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 1: WHAT IS VLOOKUP?
// ============================================
const WhatIsVlookup = () => {
  return (
    <section id="section-1" className="mb-10 scroll-mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-[#081B4B] mb-4">1. What is VLOOKUP?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            VLOOKUP stands for Vertical Lookup. It is an Excel function used to search for a value
            in the first column of a table and return a value from the same row in a specified column.
          </p>

          <h2 className="text-3xl font-bold text-[#081B4B] mb-4">2. Syntax Breakdown</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-6 overflow-x-auto">
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

          <div className="rounded-2xl overflow-hidden border border-[#138A4A]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#138A4A]">
                  <th className="border border-[#138A4A] px-4 py-2 text-left text-[13px] font-bold text-white">Parameter</th>
                  <th className="border border-[#138A4A] px-4 py-2 text-left text-[13px] font-bold text-white">Meaning</th>
                  <th className="border border-[#138A4A] px-4 py-2 text-left text-[13px] font-bold text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black font-medium">lookup_value</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">The value to search for</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">Can be cell reference, value or text</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black font-medium">table_array</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">The table or range to search in</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">The first column must contain lookup value</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black font-medium">col_index_num</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">The column number to return</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">1 = first column, 2 = second, etc.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black font-medium">[range_lookup]</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">Match type (optional)</td>
                  <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">FALSE = Exact match, TRUE = Approximate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Download size={16} className="text-green-200" />
              <span className="text-[10px] font-semibold text-green-200">PRACTICE WORKSHEET</span>
            </div>
            <h3 className="text-lg font-bold">Practice Workbook</h3>
            <p className="text-sm text-green-100 mt-1">Download the practice file used in examples on this page.</p>
            <button className="w-full mt-3 px-4 py-2 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition text-sm flex items-center justify-center gap-2">
              <Download size={14} />
              Download Excel File →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: HOW VLOOKUP WORKS (Step-by-Step)
// ============================================
const HowVlookupWorks = () => {
  const data = [
    { id: "101", name: "Aarav", salary: "52000" },
    { id: "102", name: "Neha", salary: "48000" },
    { id: "103", name: "Rohan", salary: "52000" },
    { id: "104", name: "Priya", salary: "56000" },
  ];

  return (
    <section id="section-3" className="mb-10 scroll-mt-20">
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">3. How VLOOKUP Works (Step-by-Step)</h2>
        <p className="text-slate-600 text-sm mb-4">Let's see how VLOOKUP finds and returns the result.</p>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <div className="min-w-[160px] border border-slate-200 rounded-2xl p-3 bg-white shadow-sm">
                <h3 className="font-bold text-sm text-slate-900">Step 1</h3>
                <p className="font-bold mt-0.5 text-slate-800 text-sm">Lookup Value</p>
                <p className="text-xs text-black-500 mt-2">
                  Search for the value<br/>in the first column<br/>of the table.
                </p>
                <div className="mt-2 border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-[#16A34A] text-white text-[9px] px-2 py-1 grid grid-cols-2">
                    <span>ID</span><span>Name</span>
                  </div>
                  {data.map((row) => (
                    <div key={row.id} className={`grid grid-cols-2 px-2 py-1 text-[10px] border-t border-slate-100 ${row.id === "103" ? "bg-green-50 border-2 border-[#16A34A]" : ""}`}>
                      <span className={row.id === "103" ? "font-semibold text-[#16A34A]" : "text-black"}>{row.id}</span>
                      <span className="text-black">{row.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-slate-300 text-xl flex-shrink-0">→</div>

              <div className="min-w-[160px] border border-slate-200 rounded-2xl p-3 bg-white shadow-sm">
                <h3 className="font-bold text-sm text-slate-900">Step 2</h3>
                <p className="font-bold mt-0.5 text-slate-800 text-sm">Find the Row</p>
                <p className="text-xs text-black-500 mt-2">
                  Find the row that<br/>contains the<br/>lookup value.
                </p>
                <div className="mt-2 border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-[#16A34A] text-white text-[9px] px-2 py-1 grid grid-cols-2">
                    <span>ID</span><span>Name</span>
                  </div>
                  {data.map((row) => (
                    <div key={row.id} className={`grid grid-cols-2 px-2 py-1 text-[10px] border-t border-slate-100 ${row.id === "103" ? "bg-green-50 border-2 border-[#16A34A]" : ""}`}>
                      <span className={row.id === "103" ? "font-semibold text-[#16A34A]" : "text-black"}>{row.id}</span>
                      <span className="text-black">{row.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-slate-300 text-xl flex-shrink-0">→</div>

              <div className="min-w-[160px] border border-slate-200 rounded-2xl p-3 bg-white shadow-sm">
                <h3 className="font-bold text-sm text-slate-900">Step 3</h3>
                <p className="font-bold mt-0.5 text-slate-800 text-sm">Move to Column</p>
                <p className="text-xs text-black-500 mt-2">
                  Move to the<br/>specified column<br/>number.
                </p>
                <div className="mt-2 border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-[#16A34A] text-white text-[9px] px-2 py-1 grid grid-cols-2">
                    <span>ID</span><span>Salary</span>
                  </div>
                  {data.map((row) => (
                    <div key={row.id} className={`grid grid-cols-2 px-2 py-1 text-[10px] border-t border-slate-100 ${row.id === "103" ? "bg-green-50 border-2 border-[#16A34A]" : ""}`}>
                      <span className={row.id === "103" ? "font-semibold text-[#16A34A]" : "text-black"}>{row.id}</span>
                      <span className={row.id === "103" ? "font-semibold text-[#16A34A]" : "text-black"}>
                        {row.id === "103" ? row.salary : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-slate-300 text-xl flex-shrink-0">→</div>

              <div className="min-w-[160px] border border-slate-200 rounded-2xl p-3 bg-white shadow-s">
                <h3 className="font-bold text-sm text-slate-900">Step 4</h3>
                <p className="font-bold mt-0.5 text-slate-800 text-sm">Return Result</p>
                <p className="text-xs text-black-500 mt-2">
                  Return the value<br/>from that cell.
                </p>
                <div className="mt-3 text-center">
                  <div className="text-3xl font-bold text-[#16A34A]">52000</div>
                  <p className="text-xs text-black-500 mt-0.5">Salary found!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[320px] flex-shrink-0">
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Exact vs Approximate Match</h2>

            <div className="space-y-3">
              <div className="border border-green-200 bg-green-50 rounded-2xl p-3">
                <h3 className="font-bold text-green-700 text-base">Exact Match (Recommended)</h3>
                <div className="bg-white rounded-lg p-1.5 mt-2 font-mono text-xs text-slate-800 border border-slate-200">
                  =VLOOKUP(A2,D:F,2,FALSE)
                </div>
                <p className="mt-2 text-slate-600 text-xs">
                  Returns exact match only.<br />If not found, returns #N/A.
                </p>
              </div>

              <div className="border border-orange-200 bg-orange-50 rounded-2xl p-3">
                <h3 className="font-bold text-orange-600 text-base">Approximate Match</h3>
                <div className="bg-white rounded-lg p-1.5 mt-2 font-mono text-xs text-slate-800 border border-slate-200">
                  =VLOOKUP(A2,D:F,2,TRUE)
                </div>
                <p className="mt-2 text-slate-600 text-xs">
                  Returns the closest match<br />less than or equal to lookup value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: PRACTICAL EXAMPLE
// ============================================
const PracticalExample = () => {
  const employeeRows = [
    ["101", "Aarav Sharma", "Finance", "55000"],
    ["102", "Neha Verma", "HR", "48000"],
    ["103", "Rohan Mehta", "Marketing", "52000"],
    ["104", "Priya Singh", "Finance", "56000"],
    ["105", "Karan Patel", "IT", "60000"],
  ];

  return (
    <section id="section-5" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-3">5. Practical Example</h2>
      <p className="text-[14px] text-slate-600 mb-4">Let's understand VLOOKUP with a simple example.</p>

      <div className="border border-slate-300 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#138A4A]">
              <th className="border border-slate-300 px-3 py-1.5 text-center text-[12px] font-semibold text-white">Employee ID</th>
              <th className="border border-slate-300 px-3 py-1.5 text-center text-[12px] font-semibold text-white">Name</th>
              <th className="border border-slate-300 px-3 py-1.5 text-center text-[12px] font-semibold text-white">Department</th>
              <th className="border border-slate-300 px-3 py-1.5 text-center text-[12px] font-semibold text-white">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employeeRows.map((row, index) => (
              <tr key={index} className={row[0] === "103" ? "bg-green-50/60" : ""}>
                {row.map((cell, i) => (
                  <td key={i} className="border border-slate-300 px-3 py-1.5 text-[12px] text-black text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-1.5 text-center font-semibold text-black text-[12px]">Employee ID</th>
                <th className="border border-slate-300 px-3 py-1.5 text-center font-semibold text-black text-[12px]">Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-3 py-1.5 text-center text-black font-medium text-[12px]">103</td>
                <td className="border-2 border-green-500 px-3 py-1.5 text-center text-black font-medium text-[12px] bg-green-50">52000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <p className="font-bold text-black mb-1 text-[12px]">Formula used:</p>
          <p className="text-[13px] font-bold text-[#081B4B] mb-2">=VLOOKUP(F5, A2:D6, 4, FALSE)</p>
          <p className="font-bold text-black mb-1 text-[12px]">Explanation:</p>
          <ul className="space-y-0.5 text-[12px] text-black">
            <li>• F5 → Lookup value (103)</li>
            <li>• A2:D6 → Table array</li>
            <li>• 4 → Return value from 4th column (Salary)</li>
            <li>• FALSE → Exact match</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: REAL FINANCE USE CASES
// ============================================
const FinanceUseCases = () => {
  const cases = [
    { title: "Salary Lookup", description: "Find employee salary by Employee ID", icon: DollarSign, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Product Price Lookup", description: "Look up product prices by product code", icon: Package, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Client Information", description: "Retrieve client details from database", icon: Users, color: "text-orange-500", bgColor: "bg-orange-100" },
    { title: "Financial Reports", description: "Pull financial data from multiple sheets", icon: BarChart3, color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  return (
    <section id="section-6" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-4">6. Real Finance Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((useCase, idx) => {
          const Icon = useCase.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-lg transition">
              <div className={`w-12 h-12 rounded-full ${useCase.bgColor} flex items-center justify-center mx-auto mb-2`}>
                <Icon size={24} className={useCase.color} />
              </div>
              <h3 className="text-base font-bold text-black mb-1">{useCase.title}</h3>
              <p className="text-xs text-slate-600 leading-4">{useCase.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: COMMON ERRORS
// ============================================
const ErrorsTable = () => {
  const errors = [
    { error: "#N/A", cause: "Value not found", fix: "Check lookup value or use IFNA()" },
    { error: "#VALUE!", cause: "Incorrect table_array or column index", fix: "Ensure range and column number are correct" },
    { error: "Wrong Result", cause: "Approximate match used", fix: "Use FALSE for exact match" }
  ];

  return (
    <section id="section-7" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-4">7. Common Errors and How to Fix Them</h2>
      <div className="border border-slate-300 rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-1.5 text-left font-semibold text-black text-[12px]">Error</th>
              <th className="border border-slate-300 px-3 py-1.5 text-left font-semibold text-black text-[12px]">Cause</th>
              <th className="border border-slate-300 px-3 py-1.5 text-left font-semibold text-black text-[12px]">Solution</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-slate-300 px-3 py-1.5 text-[12px] font-mono text-red-600 font-bold">{item.error}</td>
                <td className="border border-slate-300 px-3 py-1.5 text-[12px] text-black">{item.cause}</td>
                <td className="border border-slate-300 px-3 py-1.5 text-[12px] text-black">{item.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: LIMITATIONS OF VLOOKUP
// ============================================
const Limitations = () => {
  return (
    <section id="section-8" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-4">8. Limitations of VLOOKUP</h2>
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <ul className="space-y-2 text-[14px] text-black">
          <li className="flex items-start gap-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <span><strong>Only looks right:</strong> VLOOKUP can only search in the first column and return values to the right.</span>
          </li>
          <li className="flex items-start gap-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <span><strong>Column index number:</strong> Adding or removing columns breaks the formula.</span>
          </li>
          <li className="flex items-start gap-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <span><strong>Exact match is not default:</strong> Forgetting FALSE returns approximate match.</span>
          </li>
          <li className="flex items-start gap-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <span><strong>Performance:</strong> Slower with large datasets.</span>
          </li>
          <li className="flex items-start gap-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <span><strong>No dynamic column reference:</strong> Column index is static and doesn't update automatically when columns are inserted or deleted.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: VLOOKUP vs INDEX MATCH
// ============================================
const VlookupVsIndexMatch = () => {
  const comparisons = [
    { feature: "Ease of use", vlookup: "Simple to write", indexMatch: "More complex to write" },
    { feature: "Lookup direction", vlookup: "Only looks right", indexMatch: "Looks both left and right" },
    { feature: "Column insert impact", vlookup: "Breaks when columns change", indexMatch: "No column index issues" },
    { feature: "Performance", vlookup: "Slower with large data", indexMatch: "Faster with large data" },
    { feature: "Best for", vlookup: "Simple lookups", indexMatch: "Complex & dynamic lookups" },
  ];

  return (
    <section id="section-9" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-4">9. VLOOKUP vs INDEX MATCH</h2>
      <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#138A4A]">
              <th className="border border-[#138A4A] px-4 py-2 text-left text-[13px] font-semibold text-black">Feature</th>
              <th className="border border-[#138A4A] px-4 py-2 text-left text-[13px] font-semibold text-black">VLOOKUP</th>
              <th className="border border-[#138A4A] px-4 py-2 text-left text-[13px] font-semibold text-black">INDEX MATCH</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/80"}>
                <td className="border border-slate-300 px-4 py-2 text-[13px] font-semibold text-green-600">{item.feature}</td>
                <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    {item.vlookup}
                  </span>
                </td>
                <td className="border border-slate-300 px-4 py-2 text-[13px] text-black">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {item.indexMatch}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/// ============================================
// SECTION 10: VLOOKUP vs XLOOKUP
// ============================================
const VlookupVsXlookup = () => {
  const comparisons = [
    { feature: "Availability", vlookup: "Older Excel", xlookup: "Excel 365 & 2021+" },
    { feature: "Lookup Direction", vlookup: "Left to Right only", xlookup: "Left or Right" },
    { feature: "Syntax", vlookup: "Complex", xlookup: "Simpler" },
    { feature: "Returns", vlookup: "Single value", xlookup: "Single or Multiple values" },
    { feature: "Error Handling", vlookup: "Harder", xlookup: "Built-in error handling" },
    { feature: "Best for", vlookup: "Legacy workbooks", xlookup: "Modern Excel (2020+) & dynamic lookups" },
  ];

  return (
    <section id="section-10" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-4">10. VLOOKUP vs XLOOKUP</h2>
      <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
           <tr className="bg-[#138A4A]">
  <th className="border border-slate-300 px-4 py-2.5 text-left text-[13px] text-black-600 font-medium">
    Feature
  </th>

  <th className="border border-slate-300 px-4 py-2.5 text-left text-[13px] text-green-600 font-medium">
    VLOOKUP
  </th>

  <th className="border border-slate-300 px-4 py-2.5 text-left text-[13px] text-green-600 font-medium">
    XLOOKUP
  </th>
</tr>
          </thead>
          <tbody>
            {comparisons.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/80"}>
                <td className="border border-slate-300 px-4 py-2.5 text-[13px] font-semibold text-green-600">
                  {item.feature}
                </td>
                <td className="border border-slate-300 px-4 py-2.5 text-[13px] text-black">
                  {item.vlookup}
                </td>
               <td className="border border-slate-300 px-4 py-2.5 text-[13px] text-black">
                  {item.xlookup}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ============================================
// SECTION 11: PRACTICE EXERCISES
// ============================================
const PracticeExercises = () => {
  return (
    <section id="section-11" className="mb-12 scroll-mt-20">
      <h2 className="text-[32px] font-bold text-[#081B4B] mb-6">
        11. Practice Exercises
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* EASY */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          
         <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CircleCheckBig size={24} className="text-green-600" />
            </div>

            <h3 className="font-bold text-green-600 text-[24px]">
              Easy
            </h3>
          </div>

          <p className="text-[22px] font-bold text-black leading-9 mb-5">
            Find the salary of employee with ID 104 using VLOOKUP.
          </p>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-[15px] text-black">
              <span className="font-bold">Hint:</span>
              {" "}
              Use exact match.
            </p>
          </div>

        </div>

        {/* MEDIUM */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Target size={24} className="text-orange-500" />
            </div>

            <h3 className="font-bold text-orange-500 text-[24px]">
              Medium
            </h3>
          </div>

        <p className="text-[22px] font-bold text-black leading-9 mb-5">
            Find the department name of employee with ID 102.
          </p>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-[15px] text-black">
              <span className="font-bold">Hint:</span>
              {" "}
              Return text value.
            </p>
          </div>

        </div>

        {/* HARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Trophy size={24} className="text-red-500" />
            </div>

            <h3 className="font-bold text-red-500 text-[24px]">
              Hard
            </h3>
          </div>

         <p className="text-[22px] font-bold text-black leading-9 mb-5">
            Create a product price lookup from a master price list sheet.
          </p>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-[15px] text-black">
              <span className="font-bold">Hint:</span>
              {" "}
              Use a different sheet.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

// ============================================
// SECTION 12: KEY TAKEAWAYS - 5 Blocks in One Row
// ============================================
const takeaways = [
  "VLOOKUP searches for a value in the first column and returns a value from another column.",
  "Use FALSE for exact match in most cases.",
  "Understand the order of arguments in the syntax.",
  "Great for quick lookups but has some limitations.",
  "For more flexibility, use INDEX MATCH or XLOOKUP.",
];

const KeyTakeaways = () => {
  return (
    <section id="section-12" className="mb-10 scroll-mt-20">
      <h2 className="text-2xl font-bold text-[#081B4B] mb-4">12. Key Takeaways</h2>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
        {/* 5 Blocks in One Row - Checkmark Left */}
        <div className="flex flex-wrap">
          {takeaways.map((item, index) => (
            <div
              key={index}
              className={`flex-1 min-w-[10px] px-6 py-5 ${
        index !== takeaways.length - 1
                  ? "border-r border-slate-200"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-5" />
                <p className="text-[14px] leading-6 text-[#1E293B] mt-4">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "VLOOKUP in Excel - Complete Guide with Examples",
  description: "Master VLOOKUP in Excel with step-by-step examples. A practical guide for finance freshers who need Excel skills for the workplace.",
  alternates: { canonical: "https://finlysta.com/learning-hub/advanced-excel/vlookup" },
  openGraph: {
    title: "VLOOKUP in Excel - Complete Guide with Examples | Finlysta",
    description: "Master VLOOKUP in Excel with step-by-step examples. A practical guide for finance freshers who need Excel skills for the workplace.",
    url: "https://finlysta.com/learning-hub/advanced-excel/vlookup",
    images: [{ url: 'https://finlysta.com/og-image.png', width: 1200, height: 630, alt: "VLOOKUP in Excel - Complete Guide with Examples" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VLOOKUP in Excel - Complete Guide with Examples | Finlysta",
    description: "Master VLOOKUP in Excel with step-by-step examples. A practical guide for finance freshers who need Excel skills for the workplace.",
    images: ['https://finlysta.com/og-image.png'],
  },
};


export default function VlookupBlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <Breadcrumb />
      <HeroSection />
      <LearnAndContents />
      <WhatIsVlookup />
      <HowVlookupWorks />
      <PracticalExample />
      <FinanceUseCases />
      <ErrorsTable />
      <Limitations />
      <VlookupVsIndexMatch />
      <VlookupVsXlookup />
      <PracticeExercises />
      <KeyTakeaways />
    </main>
  );
}