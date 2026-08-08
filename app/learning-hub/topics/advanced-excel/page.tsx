// app/learning-hub/advanced-excel/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, BookOpen, TrendingUp, FileSpreadsheet,
  LayoutGrid, Database, Calculator, BarChart3,
  Download, Lightbulb, Briefcase,
  MessageSquare, Shield, Clock, ArrowRight,
  Search, Circle, ArrowDown,
  Sigma, TableProperties, Table2, Workflow, ChartColumnBig, CircleHelp, ScanSearch
} from "lucide-react";

// ============================================
// BREADCRUMB COMPONENT
// ============================================
const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <Link href="/learning-hub" className="text-slate-500 hover:text-blue-600 transition">
        Learning Hub
      </Link>
      <ChevronRight size={14} className="text-slate-400" />
      <span className="text-[#2563EB] font-semibold">Advanced Excel</span>
    </div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="mb-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#081B4B] leading-tight mb-4">
            Advanced Excel
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Master Excel skills required for finance internships,
            <br />
            financial analysis, MIS reporting and entry-level
            <br />
            finance roles.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-sm font-medium text-blue-700 rounded-full">
              <BookOpen size={16} /> 12 Topics
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-sm font-medium text-green-700 rounded-full">
              <Clock size={16} /> Self-Paced Learning
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-sm font-medium text-purple-700 rounded-full">
              <TrendingUp size={16} /> Finance Focused
            </div>
          </div>
        </div>

        {/* Right Illustration - Image */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 blur-3xl"></div>
            <Image
              src="/advanced-excel-image.png"
              alt="Advanced Excel"
              width={400}
              height={400}
              className="relative object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// OVERVIEW CARDS - ALL SAME HEIGHT WITH INCREASED TEXT SIZE
// ============================================
const WhyLearnExcel = () => {
  const roles = [
    "Financial Analyst",
    "FP&A Analyst",
    "MIS Analyst",
    "Credit Analyst",
    "Investment Banking Analyst",
    "Audit Associate",
    "Data Analyst"
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition h-full">
      <h2 className="text-2xl font-bold text-black mb-3">
        Why Learn Excel?
      </h2>
      <p className="text-lg text-slate-900 mb-4 leading-relaxed">
        Excel remains one of the most requested
        <br />
        skills for:
      </p>
      <ul className="space-y-3">
        {roles.map((role, idx) => (
          <li key={idx} className="flex items-center gap-4 text-base font-medium text-[#000000]">
            <Circle size={15} className="text-green-500 fill-green-500" />
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LearningRoadmap = () => {
  const steps = [
    "Excel Basics",
    "Formulas & Functions",
    "VLOOKUP",
    "XLOOKUP",
    "Pivot Tables",
    "Excel Dashboards",
    "Excel Interview Questions"
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition h-full">
      <h2 className="text-2xl font-bold text-black mb-3">Learning Roadmap</h2>
      <div className="space-y-1">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <ArrowDown size={14} className="text-green-500 mt-1" />
              )}
            </div>
            <span className="text-base font-medium text-black">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProTip = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 hover:shadow-lg transition h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
          <Lightbulb size={24} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-black">
          Pro Tip
        </h2>
      </div>
      <p className="text-lg text-slate-900 mb-4 leading-relaxed">
        Follow the roadmap from top
        <br />
        to bottom.{" "}
        <span className="font-bold text-black">
          Each topic builds your skills step-by-step.
        </span>
      </p>
      <div className="flex justify-center mt-4">
        <Image
          src="/pro-tip-image.png"
          alt="Pro Tip"
          width={180}
          height={90}
          className="object-contain"
        />
      </div>
    </div>
  );
};

// ============================================
// TOPICS INCLUDED (12 TOPICS) - ICON FIRST, THEN NUMBER
// ============================================
const topicsData = [
  { id: 1, title: "Excel Interface & Navigation", description: "Learn the Excel layout, menus,\nshortcuts and basic navigations.", icon: FileSpreadsheet, iconColor: "text-green-600", iconBg: "bg-green-50" },
  { id: 2, title: "Formulas & Functions", description: "Understand essential formulas\nand functions in Excel.", icon: Calculator, iconColor: "text-purple-600", iconBg: "bg-purple-50" },
  { id: 3, title: "SUMIF & COUNTIF", description: "Use SUMIF and COUNTIF to\nanalyze financial data.", icon: Sigma, iconColor: "text-orange-600", iconBg: "bg-orange-50" },
  { id: 4, title: "VLOOKUP", description: "Retrieve and match data from\nlarge datasets easily.", icon: Search, iconColor: "text-indigo-600", iconBg: "bg-indigo-50" },
  { id: 5, title: "XLOOKUP", description: "Modern replacement for VLOOKUP\nwith more flexibility.", icon: ScanSearch, iconColor: "text-green-600", iconBg: "bg-green-50" },
  { id: 6, title: "INDEX + MATCH", description: "Advanced lookup combination for\ncomplex data retrieval.", icon: TableProperties, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
  { id: 7, title: "Pivot Tables", description: "Summarize and analyze large\ndatasets interactively.", icon: Table2, iconColor: "text-green-700", iconBg: "bg-green-100" },
  { id: 8, title: "Conditional Formatting", description: "Highlight important trends and\npatterns in your data.", icon: Workflow, iconColor: "text-orange-600", iconBg: "bg-orange-50" },
  { id: 9, title: "Data Validation", description: "Ensure accurate and consistent\ndata entry.", icon: Shield, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
  { id: 10, title: "Excel Dashboards", description: "Build dashboards and KPI\ntrackers in Excel.", icon: ChartColumnBig, iconColor: "text-green-700", iconBg: "bg-green-100" },
  { id: 11, title: "Finance Excel Case Studies", description: "Real-world finance scenarios\nand problem-solving.", icon: Briefcase, iconColor: "text-purple-600", iconBg: "bg-purple-50" },
  { id: 12, title: "Excel Interview Questions", description: "Common Excel questions asked\nin finance interviews.", icon: CircleHelp, iconColor: "text-red-600", iconBg: "bg-red-50" },
];

const TopicsIncluded = () => {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">
          Topics Included <span className="text-base font-normal text-slate-500">(12)</span>
        </h2>
        <Link
          href="/topics"
          style={{ color: "#2563EB" }}
          className="font-semibold flex items-center gap-1"
        >
          View all topics
          <ArrowRight size={16} style={{ color: "#2563EB" }} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {topicsData.map((topic) => {
          const Icon = topic.icon;
          return (
            <div key={topic.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              {/* Icon first, then number - side by side */}
              <div className="flex items-center gap-3 mb-3">
                {/* Icon with colored background */}
                <div className={`w-12 h-12 rounded-lg ${topic.iconBg} flex items-center justify-center`}>
                  <Icon size={24} className={topic.iconColor} />
                </div>
                {/* Green circle with number */}
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-semibold">
                  {topic.id}
                </div>
              </div>
            <h3 className="font-bold text-xl text-[#081B4B] mb-2 leading-7 min-h-[56px]">
                {topic.title}
              </h3>
          <p className="text-base text-slate-600 leading-6 min-h-[60px] whitespace-pre-line">
                {topic.description}
              </p>
              <Link
                href={`/learning-hub/advanced-excel/${topic.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/\+/g, 'plus')}`}
                className="mt-auto pt-2 text-blue-600 text-md font-bold flex items-center gap-1 hover:text-blue-700"
              >
                Read Topic <ArrowRight size={15} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// FINANCE USE CASES - Using image instead of icon
// ============================================
const FinanceUseCases = () => {
  return (
    <section className="py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Finance Use Cases */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#081B4B] mb-4">Finance Use Cases</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Budget Tracking */}
            <Link href="/learning-hub/advanced-excel/budget-tracking" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-md transition group cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center">
                <Image src="/budget-tracking.png" alt="Budget Tracking" width={50} height={50} className="object-contain" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Budget Tracking</h3>
              <p className="text-md text-slate-900 mt-1">Create and monitor budgets effectively</p>
            </Link>

            {/* Financial Reporting */}
            <Link href="/learning-hub/advanced-excel/financial-reporting" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-md transition group cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center">
                <Image src="/financial-reporting.png" alt="Financial Reporting" width={50} height={50} className="object-contain" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Financial Reporting</h3>
              <p className="text-md text-slate-900 mt-1">Generate professional financial reports</p>
            </Link>

            {/* MIS Reporting */}
            <Link href="/learning-hub/advanced-excel/mis-reporting" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-md transition group cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center">
                <Image src="/mis-reporting.png" alt="MIS Reporting" width={50} height={50} className="object-contain" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">MIS Reporting</h3>
              <p className="text-md text-slate-900 mt-1">Management information system dashboards</p>
            </Link>

            {/* Data Analysis */}
            <Link href="/learning-hub/advanced-excel/data-analysis" className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:shadow-md transition group cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center">
                <Image src="/data-analysis.png" alt="Data Analysis" width={50} height={50} className="object-contain" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">Data Analysis</h3>
              <p className="text-md text-slate-900 mt-1">Analyze trends and patterns in data</p>
            </Link>
          </div>
        </div>

        {/* Right Side - Free Resources */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-[#081B4B] mb-4">Free Resources</h2>
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <FileSpreadsheet size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Excel Cheat Sheet</h3>
                  <p className="text-sm text-slate-600">Quick reference for essential formulas</p>
                </div>
                <Download size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Calculator size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Finance Formulas</h3>
                  <p className="text-sm text-slate-600">Key finance formulas in Excel</p>
                </div>
                <Download size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Database size={20} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Practice Dataset</h3>
                  <p className="text-sm text-slate-600">Sample data for hands-on practice</p>
                </div>
                <Download size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <MessageSquare size={20} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Excel Interview Questions</h3>
                  <p className="text-sm text-slate-600">Top 50 Excel interview questions</p>
                </div>
                <Download size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// RELATED SKILLS - Using image with logo left, text right layout (matching Free Resources)
// Description line removed - only title and Learn More
// ============================================
const relatedSkills = [
  { name: "Financial Analysis", image: "/financial-analysis-1.png", link: "financial-analysis" },
  { name: "Financial Modeling", image: "/financial-modelling-1.png", link: "financial-modeling" },
  { name: "Power BI", image: "/power-bi.png", link: "power-bi" },
  { name: "Accounting Basics", image: "/accounting-basics.png", link: "accounting-basics" },
];

const RelatedSkills = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">Related Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {relatedSkills.map((skill, idx) => (
          <Link
            key={idx}
            href={`/learning-hub/${skill.link}`}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer"
          >
            <div className="flex items-start gap-5">
              {/* Logo Left - Larger size */}
              <div className="w-24 h-24 flex-shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-2 group-hover:bg-gray-100 transition">
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>

              {/* Text Right - Only title and Learn More */}
              <div className="flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-xl leading-tight">
                  {skill.name}
                </h3>

                <span className="mt-3 text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More → 
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ============================================
// CTA BANNER - Blue background rectangle box
// ============================================
const CTABanner = () => {
  return (
    <section className="py-8">
      <div className="bg-blue-600 rounded-2xl px-8 py-8 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left Side */}
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Image
                src="/rocket.png"
                alt="Rocket"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            <div>
              <h2 className="text-[52px] md:text-[64px] font-bold text-white leading-tight">
                Ready to build your Excel skills?
              </h2>

              <p className="text-[22px] md:text-[24px] text-blue-100 mt-4">
                Start your learning journey with Advanced Excel.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center text-center">
            <span className="text-[18px] md:text-[20px] font-medium text-white mb-4">
              Begin with Topic 1:
            </span>

            <Link
              href="/learning-hub/advanced-excel/excel-interface-navigation"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-xl hover:bg-gray-100 transition shadow-md"
            >
              Excel Interface & Navigation
              <ArrowRight size={20} className="text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function AdvancedExcelPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <Breadcrumb />
      <HeroSection />

      {/* Overview Cards - 3 Columns with equal height */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <WhyLearnExcel />
        <LearningRoadmap />
        <ProTip />
      </div>

      {/* Topics Included */}
      <TopicsIncluded />

      {/* Finance Use Cases & Free Resources */}
      <FinanceUseCases />

      {/* Related Skills */}
      <RelatedSkills />

      {/* CTA Banner */}
      <CTABanner />
    </main>
  );
}