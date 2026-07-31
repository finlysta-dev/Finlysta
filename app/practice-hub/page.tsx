"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  FileSpreadsheet,
  BarChart3,
  Target,
  Download,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock3,
  Rocket,
  Award,
  Bolt,
  Eye,
  EyeOff,
  Lightbulb,
} from "lucide-react";
import { salesData, priorYearH1Sales, type SalesRecord } from "@/app/data/sales-data";

// ---------------------------------------------------------------------------
// Header Component (unchanged)
// ---------------------------------------------------------------------------
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/internships", label: "Internships" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/blogs", label: "Blogs" },
    { href: "/practice-hub", label: "Practice Hub" },
  ];

  const noPrefetch = ["/blogs", "/learning-hub", "/interview-prep"];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 font-sans antialiased ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
            aria-label="Finlysta - Finance Jobs and Internships for Freshers"
          >
            <Image
              src="/Finlysta.png"
              alt="Finlysta Logo"
              width={160}
              height={36}
              priority
              className="object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>
        </div>

        <nav aria-label="Main navigation" className="hidden md:flex items-center justify-center gap-8 lg:gap-10 mx-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.href} className="relative">
                <Link
                  href={link.href}
                  prefetch={!noPrefetch.includes(link.href)}
                  className={`text-base font-bold transition-colors duration-200 whitespace-nowrap ${
                    isActive ? "text-blue-600" : "text-black hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full shadow-sm"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0" />

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-black hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
          aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="py-2">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-base font-bold px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? "text-blue-600" : "text-black hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <div className="px-4 mt-1">
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full shadow-sm"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------
const fmtINR = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtPct = (n: number) => `${n.toFixed(2)}%`;

function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/[₹,%\s]/g, "").trim();
  if (cleaned === "" || cleaned === "-") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function normalizeText(raw: string): string {
  return raw.trim().toLowerCase();
}

// ---------------------------------------------------------------------------
// Answer field + question types
// ---------------------------------------------------------------------------
type FieldType = "number" | "text" | "list";

interface AnswerField {
  key: string;
  label: string;
  type: FieldType;
  correct: number | string | string[];
  tolerance?: number; // for "number" fields, absolute allowed difference
  suffix?: string; // e.g. "%", "₹"
}

interface Question {
  id: number;
  question: string;
  marks: number;
  formula: string; // shown in the "Reveal Solution" panel
  fields: AnswerField[];
  getPreviewRows: () => SalesRecord[]; // raw rows relevant to this question
  previewNote: string;
  aggregatedPreview?: { label: string; value: string }[]; // used instead of raw rows for pivot-style questions
}

// ---------------------------------------------------------------------------
// Build the 10 questions, each with its own slice of the dataset
// ---------------------------------------------------------------------------
const monthOf = (dateStr: string) => Number(dateStr.slice(5, 7));
const monthName = (m: number) =>
  ["January", "February", "March", "April", "May", "June"][m - 1] ?? String(m);

function buildQuestions(): Question[] {
  const q1Rows = salesData.filter((r) => r.region === "East" && monthOf(r.date) <= 3);
  const q1Total = q1Rows.reduce((s, r) => s + r.sales, 0);

  const q2Rows = salesData.filter((r) => r.category === "Electronics");
  const q2Avg = q2Rows.reduce((s, r) => s + r.marginPct, 0) / q2Rows.length;

  const q3Rows = salesData.filter((r) => r.region === "West");
  const q3ByMonth = [1, 2, 3, 4, 5, 6].map((m) => ({
    month: monthName(m),
    total: q3Rows.filter((r) => monthOf(r.date) === m).reduce((s, r) => s + r.sales, 0),
  }));
  const q3Peak = q3ByMonth.reduce((a, b) => (b.total > a.total ? b : a));

  const q4Rows = salesData.filter((r) => monthOf(r.date) >= 4 && monthOf(r.date) <= 6);
  const q4ByProduct = Object.entries(
    q4Rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.product] = (acc[r.product] ?? 0) + r.sales;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const grossTotal = salesData.reduce((s, r) => s + r.sales / (1 - r.discountPct / 100), 0);
  const salesTotal = salesData.reduce((s, r) => s + r.sales, 0);
  const q5Discount = ((grossTotal - salesTotal) / grossTotal) * 100;

  const q6Rows = salesData.filter((r) => r.category === "Furniture" && monthOf(r.date) === 3);
  const q6Total = q6Rows.reduce((s, r) => s + r.sales, 0);

  const q7ByMonth = [1, 2, 3, 4, 5, 6].map((m) => ({
    month: monthName(m),
    units: salesData.filter((r) => monthOf(r.date) === m).reduce((s, r) => s + r.units, 0),
  }));
  const q7Peak = q7ByMonth.reduce((a, b) => (b.units > a.units ? b : a));

  const regions = ["East", "West", "North", "South"];
  const q8ByRegion = regions.map((reg) => {
    const rows = salesData.filter((r) => r.region === reg);
    return { region: reg, avg: rows.reduce((s, r) => s + r.sales, 0) / rows.length };
  });

  const q9Rows = salesData.filter((r) => r.category === "Electronics" && r.region === "North");
  const q9Total = q9Rows.reduce((s, r) => s + r.sales, 0);

  const q10Current = salesData.reduce((s, r) => s + r.sales, 0);
  const q10Yoy = ((q10Current - priorYearH1Sales) / priorYearH1Sales) * 100;

  return [
    {
      id: 1,
      question: "Calculate total sales amount for the East region in Q1 2024.",
      marks: 2,
      formula: '=SUMIFS(Sales, Region, "East", Date, ">="&DATE(2024,1,1), Date, "<="&DATE(2024,3,31))',
      fields: [{ key: "total", label: "Total Sales (₹)", type: "number", correct: Math.round(q1Total * 100) / 100, tolerance: 1500 }],
      getPreviewRows: () => q1Rows,
      previewNote: "Rows filtered to Region = East and Date within Jan\u2013Mar 2024.",
    },
    {
      id: 2,
      question: "What is the average profit margin for the Electronics category?",
      marks: 2,
      formula: '=AVERAGEIF(Category, "Electronics", ProfitMargin%)',
      fields: [{ key: "margin", label: "Average Profit Margin", type: "number", correct: Math.round(q2Avg * 100) / 100, tolerance: 0.6, suffix: "%" }],
      getPreviewRows: () => q2Rows,
      previewNote: "Rows filtered to Category = Electronics.",
    },
    {
      id: 3,
      question: "Create a chart showing monthly sales trends for the West region \u2014 then tell us the peak month and its value.",
      marks: 3,
      formula: 'PivotTable/PivotChart: Filter Region = "West", Rows = Month, Values = Sum of Sales.',
      fields: [
        { key: "month", label: "Peak month", type: "text", correct: q3Peak.month },
        { key: "value", label: "Peak month sales (₹)", type: "number", correct: Math.round(q3Peak.total * 100) / 100, tolerance: 2000 },
      ],
      getPreviewRows: () => [],
      previewNote: "Aggregated monthly totals for West region, built from the raw dataset.",
      aggregatedPreview: q3ByMonth.map((m) => ({ label: m.month, value: fmtINR(m.total) })),
    },
    {
      id: 4,
      question: "Identify the top 5 products by revenue generated in Q2 2024 (Apr\u2013Jun).",
      marks: 2,
      formula: "PivotTable: Rows = Product, Filter Date to Q2, Values = Sum of Sales, sort descending, keep top 5.",
      fields: [{ key: "top5", label: "Top 5 products (comma-separated)", type: "list", correct: q4ByProduct.map(([p]) => p) }],
      getPreviewRows: () => q4Rows,
      previewNote: "Rows filtered to Q2 2024 (April\u2013June).",
    },
    {
      id: 5,
      question: "Calculate the total discount percentage given on all transactions.",
      marks: 2,
      formula: "Total Discount % = (\u03a3 Gross \u2212 \u03a3 Sales) \u00f7 \u03a3 Gross \u00d7 100, where Gross = Sales \u00f7 (1 \u2212 Discount%).",
      fields: [{ key: "discount", label: "Total Discount", type: "number", correct: Math.round(q5Discount * 100) / 100, tolerance: 0.6, suffix: "%" }],
      getPreviewRows: () => salesData.slice(0, 8),
      previewNote: "Uses every row in the dataset (preview shows the first 8).",
    },
    {
      id: 6,
      question: "What is the total sales value for the Furniture category in March 2024?",
      marks: 2,
      formula: '=SUMIFS(Sales, Category, "Furniture", Date, ">="&DATE(2024,3,1), Date, "<="&DATE(2024,3,31))',
      fields: [{ key: "total", label: "Total Sales (₹)", type: "number", correct: Math.round(q6Total * 100) / 100, tolerance: 1500 }],
      getPreviewRows: () => q6Rows,
      previewNote: "Rows filtered to Category = Furniture and Date within March 2024.",
    },
    {
      id: 7,
      question: "Determine the month with the highest sales volume (units sold).",
      marks: 3,
      formula: "PivotTable: Rows = Month, Values = Sum of Units. Find the maximum.",
      fields: [{ key: "month", label: "Month", type: "text", correct: q7Peak.month }],
      getPreviewRows: () => [],
      previewNote: "Aggregated monthly unit totals, built from the raw dataset.",
      aggregatedPreview: q7ByMonth.map((m) => ({ label: m.month, value: `${m.units} units` })),
    },
    {
      id: 8,
      question: "Calculate the average order value for each region.",
      marks: 2,
      formula: '=AVERAGEIF(Region, "<region>", Sales)',
      fields: regions.map((reg) => ({
        key: reg,
        label: `${reg} avg order value (₹)`,
        type: "number" as const,
        correct: Math.round((q8ByRegion.find((r) => r.region === reg)!.avg) * 100) / 100,
        tolerance: 1500,
      })),
      getPreviewRows: () => salesData.slice(0, 8),
      previewNote: "Uses every row, grouped by Region (preview shows the first 8 rows).",
    },
    {
      id: 9,
      question: "Create a PivotTable summarizing sales by category and region \u2014 then report the Electronics \u00d7 North cell.",
      marks: 3,
      formula: "PivotTable: Rows = Category, Columns = Region, Values = Sum of Sales.",
      fields: [{ key: "cell", label: "Electronics \u00d7 North total sales (₹)", type: "number", correct: Math.round(q9Total * 100) / 100, tolerance: 1500 }],
      getPreviewRows: () => q9Rows,
      previewNote: 'Preview filtered to Category = Electronics, Region = North (one cell of the full pivot).',
    },
    {
      id: 10,
      question: "Calculate the year-over-year growth rate for total sales (H1 2024 vs H1 2023).",
      marks: 3,
      formula: "=(SUM(2024 Sales) \u2212 SUM(2023 Sales)) / SUM(2023 Sales) \u00d7 100",
      fields: [{ key: "yoy", label: "YoY Growth Rate", type: "number", correct: Math.round(q10Yoy * 100) / 100, tolerance: 0.6, suffix: "%" }],
      getPreviewRows: () => salesData.slice(0, 8),
      previewNote: `Jan\u2013Jun 2023 total sales is given as ${fmtINR(priorYearH1Sales)}. Compare it against the full 2024 dataset (preview shows the first 8 rows).`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Small dataset preview table, reused inside every question
// ---------------------------------------------------------------------------
function DatasetPreviewTable({ rows }: { rows: SalesRecord[] }) {
  if (rows.length === 0) return null;
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-xs">
        <thead style={{ backgroundColor: "#F3F4F6" }}>
          <tr>
            {["Date", "Region", "Category", "Product", "Units", "Unit Price", "Discount %", "Sales", "Profit", "Margin %"].map((h) => (
              <th key={h} className="px-2.5 py-2 text-left font-semibold whitespace-nowrap" style={{ color: "#374151" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 8).map((r, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="px-2.5 py-1.5 whitespace-nowrap">{r.date}</td>
              <td className="px-2.5 py-1.5 whitespace-nowrap">{r.region}</td>
              <td className="px-2.5 py-1.5 whitespace-nowrap">{r.category}</td>
              <td className="px-2.5 py-1.5 whitespace-nowrap">{r.product}</td>
              <td className="px-2.5 py-1.5 text-right">{r.units}</td>
              <td className="px-2.5 py-1.5 text-right whitespace-nowrap">{r.unitPrice.toLocaleString("en-IN")}</td>
              <td className="px-2.5 py-1.5 text-right">{r.discountPct}%</td>
              <td className="px-2.5 py-1.5 text-right whitespace-nowrap">{r.sales.toLocaleString("en-IN")}</td>
              <td className="px-2.5 py-1.5 text-right whitespace-nowrap">{r.profit.toLocaleString("en-IN")}</td>
              <td className="px-2.5 py-1.5 text-right">{r.marginPct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 8 && (
        <div className="px-2.5 py-1.5 text-[11px] border-t border-gray-100" style={{ color: "#6B7280", backgroundColor: "#FAFAFA" }}>
          Showing 8 of {rows.length} matching rows \u2014 download the full workbook to see the rest.
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Practice Hub Component
// ---------------------------------------------------------------------------
export default function PracticeHub() {
  const questions = useMemo(buildQuestions, []);

  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
  const [inputs, setInputs] = useState<Record<number, Record<string, string>>>({});
  const [results, setResults] = useState<Record<number, "correct" | "incorrect" | null>>({});
  const [revealed, setRevealed] = useState<number[]>([]);

  const progress = Math.round((solvedQuestions.length / questions.length) * 100);

  const avatarPalette = [
    { bg: "#EEF4FF", text: "#2563EB" },
    { bg: "#FEF3C7", text: "#D97706" },
    { bg: "#DCFCE7", text: "#16A34A" },
    { bg: "#FCE7F3", text: "#DB2777" },
    { bg: "#EDE9FE", text: "#7C3AED" },
    { bg: "#FFE4E6", text: "#E11D48" },
  ];

  const recentActivities = [
    { name: "Akshay Kumar", score: 92, time: "Just now" },
    { name: "Sneha Patel", score: 85, time: "5 min ago" },
    { name: "Rahul Singh", score: 78, time: "12 min ago" },
  ];

  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const updateInput = (qId: number, fieldKey: string, value: string) => {
    setInputs((prev) => ({ ...prev, [qId]: { ...prev[qId], [fieldKey]: value } }));
  };

  const checkAnswer = (q: Question) => {
    const userAnswers = inputs[q.id] ?? {};
    const allCorrect = q.fields.every((field) => {
      const raw = userAnswers[field.key] ?? "";
      if (field.type === "number") {
        const val = parseNumber(raw);
        if (val === null) return false;
        return Math.abs(val - (field.correct as number)) <= (field.tolerance ?? 0);
      }
      if (field.type === "text") {
        return normalizeText(raw) === normalizeText(field.correct as string);
      }
      // list: compare as sets, order-insensitive, case-insensitive
      const userSet = raw.split(",").map((s) => normalizeText(s)).filter(Boolean);
      const correctSet = (field.correct as string[]).map((s) => normalizeText(s));
      return userSet.length === correctSet.length && correctSet.every((c) => userSet.includes(c));
    });

    setResults((prev) => ({ ...prev, [q.id]: allCorrect ? "correct" : "incorrect" }));
    if (allCorrect) {
      setSolvedQuestions((prev) => (prev.includes(q.id) ? prev : [...prev, q.id]));
    }
  };

  const toggleReveal = (id: number) => {
    setRevealed((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  const markSolvedManually = (id: number) => {
    setSolvedQuestions((prev) => (prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]));
  };

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const solvedMarks = questions.filter((q) => solvedQuestions.includes(q.id)).reduce((sum, q) => sum + q.marks, 0);
  const bestScore = solvedMarks;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="border-b border-gray-100" style={{ background: "linear-gradient(90deg, #F5F9FF 0%, #FFFFFF 60%, #F8FBFF 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DBEAFE]" style={{ backgroundColor: "#EEF4FF" }}>
                  <Bolt size={14} style={{ color: "#2563EB" }} />
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#2563EB" }}>
                    Practice Hub
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mt-4" style={{ color: "#111827" }}>
                  Advanced <span style={{ color: "#2563EB" }}>Excel</span>
                </h1>
                <p className="text-lg mt-3 max-w-md leading-relaxed" style={{ color: "#374151" }}>
                  Sharpen your Excel skills with real-world datasets and <br />
                  challenge yourself with practical questions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <div className="flex flex-col items-start">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#F0FDF4" }}>
                      <FileSpreadsheet size={28} style={{ color: "#16A34A" }} />
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#111827]">Real-world Datasets</h3>
                    <p className="mt-1 text-[14px] leading-6 text-[#6B7280]">
                      A dataset for every <br />
                      question, not just one file
                    </p>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#F5F3FF" }}>
                      <BarChart3 size={28} style={{ color: "#7C3AED" }} />
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#111827]">Instant Answer Check</h3>
                    <p className="mt-1 text-[14px] leading-6 text-[#6B7280]">
                      Type your answer and <br />
                      get graded instantly
                    </p>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#FFF7ED" }}>
                      <Target size={28} style={{ color: "#F97316" }} />
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#111827]">Track Progress</h3>
                    <p className="mt-1 text-[14px] leading-6 text-[#6B7280]">
                      Monitor your performance<br />
                      and improve
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  <Image src="/advanced-excel.png" alt="Advanced Excel Illustration" width={500} height={400} className="object-contain" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header with right-aligned stats */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "#EEF4FF" }}>
                        <FileSpreadsheet size={20} style={{ color: "#2563EB" }} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold" style={{ color: "#111827" }}>Advanced Excel \u2013 Beginner</h2>
                        <p className="text-sm mt-0.5" style={{ color: "#000000" }}>
                          Perfect for beginners who want to build a strong foundation in Advanced Excel.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}>
                      Beginner
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-6 mt-3 text-sm font-medium" style={{ color: "#000000" }}>
                    <span className="flex items-center gap-1">
                      <FileSpreadsheet size={14} /> {questions.length} Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={14} /> {totalMarks} Marks
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 size={14} /> 25 Min
                    </span>
                  </div>
                </div>

                {/* Dataset Section */}
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-sm font-bold mb-3" style={{ color: "#000000" }}>Full Dataset</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <Image src="/advanced-excel.png" alt="Excel" width={64} height={64} className="object-contain" />
                      </div>
                      <div>
                        <p className="text-base font-medium" style={{ color: "#000000" }}>Sales_Analysis_Beginner.xlsx</p>
                        <p className="text-sm" style={{ color: "#000000" }}>243 rows \u00b7 Jan\u2013Jun 2024</p>
                      </div>
                    </div>
                    <a
                      href="/Sales_Analysis_Beginner.xlsx"
                      download
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border"
                      style={{ backgroundColor: "#FFFFFF", color: "#2563EB", borderColor: "#2563EB" }}
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                </div>

                {/* About this Dataset */}
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-base font-bold mb-2" style={{ color: "#000000" }}>About this Dataset</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#000000" }}>
                    This dataset contains transaction-level sales data for a company across 4 regions and 4 product categories.
                  </p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: "#000000" }}>
                    Every question below shows the exact slice of the data you need to solve it \u2014 you can also download the
                    full workbook above and work in Excel directly. Type your answer and click <strong>Check Answer</strong> to
                    get graded instantly, or click <strong>Reveal Solution</strong> to see the correct value and formula.
                  </p>
                </div>

                {/* Questions */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold" style={{ color: "#000000" }}>Questions</h3>
                    <span className="text-sm font-medium" style={{ color: "#000000" }}>
                      {solvedQuestions.length}/{questions.length} solved
                    </span>
                  </div>
                  <div className="space-y-2">
                    {questions.map((q) => {
                      const isSolved = solvedQuestions.includes(q.id);
                      const isRevealed = revealed.includes(q.id);
                      const result = results[q.id];
                      const previewRows = q.getPreviewRows();

                      return (
                        <div
                          key={q.id}
                          className={`border rounded-lg overflow-hidden transition-colors ${
                            isSolved ? "border-green-200 bg-green-50/30" : "border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-5 h-5 text-xs font-medium rounded-full flex items-center justify-center flex-shrink-0 ${
                                  isSolved ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {isSolved ? <CheckCircle size={12} /> : q.id}
                              </span>
                              <span className={`text-sm truncate font-medium ${isSolved ? "text-gray-600" : "text-gray-900"}`}>
                                {q.question}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color: "#16A34A" }}>
                                {q.marks} Marks
                              </span>
                              <ChevronDown size={14} className="transition-transform duration-200" style={{ color: "#000000" }} />
                            </div>
                          </button>

                          {expandedQuestion === q.id && (
                            <div className="px-3 py-3 bg-gray-50 border-t border-gray-100 space-y-4">
                              {/* Per-question dataset */}
                              <div>
                                <p className="text-xs font-semibold mb-1.5" style={{ color: "#000000" }}>
                                  Dataset for this question
                                </p>
                                <p className="text-[11px] mb-2" style={{ color: "#6B7280" }}>
                                  {q.previewNote}
                                </p>
                                {q.aggregatedPreview ? (
                                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                                    {q.aggregatedPreview.map((row, i) => (
                                      <div
                                        key={row.label}
                                        className={`flex items-center justify-between px-3 py-1.5 text-xs ${
                                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                      >
                                        <span style={{ color: "#374151" }}>{row.label}</span>
                                        <span className="font-medium" style={{ color: "#111827" }}>{row.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <DatasetPreviewTable rows={previewRows} />
                                )}
                              </div>

                              {/* Answer inputs */}
                              <div>
                                <p className="text-xs font-semibold mb-1.5" style={{ color: "#000000" }}>Your Answer</p>
                                <div className="space-y-2">
                                  {q.fields.map((field) => (
                                    <div key={field.key} className="flex items-center gap-2">
                                      <label className="text-xs w-56 flex-shrink-0" style={{ color: "#374151" }}>
                                        {field.label}
                                      </label>
                                      <input
                                        type="text"
                                        value={inputs[q.id]?.[field.key] ?? ""}
                                        onChange={(e) => updateInput(q.id, field.key, e.target.value)}
                                        placeholder={field.type === "list" ? "Product A, Product B, ..." : "Type your answer"}
                                        className="flex-1 text-sm rounded-lg border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{ color: "#000000" }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Result feedback */}
                              {result && (
                                <div
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                                    result === "correct" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {result === "correct" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                  {result === "correct"
                                    ? "Correct! This question is now marked as solved."
                                    : "Not quite \u2014 check your filters/formula and try again, or reveal the solution below."}
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => checkAnswer(q)}
                                  className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  Check Answer
                                </button>
                                <button
                                  onClick={() => toggleReveal(q.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border border-gray-300 hover:bg-gray-100"
                                  style={{ color: "#374151" }}
                                >
                                  {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                                  {isRevealed ? "Hide Solution" : "Reveal Solution"}
                                </button>
                                <button
                                  onClick={() => markSolvedManually(q.id)}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                    isSolved ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  {isSolved ? "\u2713 Solved" : "Mark as Solved"}
                                </button>
                              </div>

                              {/* Solution panel */}
                              {isRevealed && (
                                <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3 space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Lightbulb size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#2563EB" }} />
                                    <div className="text-xs" style={{ color: "#1E3A8A" }}>
                                      <p className="font-semibold mb-1">Approach</p>
                                      <code className="block px-2 py-1 rounded bg-white border border-blue-100 text-[11px] break-words" style={{ color: "#111827" }}>
                                        {q.formula}
                                      </code>
                                    </div>
                                  </div>
                                  <div className="text-xs" style={{ color: "#1E3A8A" }}>
                                    <p className="font-semibold mb-1">Correct Answer{q.fields.length > 1 ? "s" : ""}</p>
                                    <ul className="space-y-0.5">
                                      {q.fields.map((field) => (
                                        <li key={field.key}>
                                          {field.label}:{" "}
                                          <span className="font-semibold" style={{ color: "#111827" }}>
                                            {field.type === "number"
                                              ? field.suffix === "%"
                                                ? fmtPct(field.correct as number)
                                                : fmtINR(field.correct as number)
                                              : field.type === "list"
                                              ? (field.correct as string[]).join(", ")
                                              : (field.correct as string)}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button className="w-full mt-4 px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2" style={{ backgroundColor: "#2563EB" }}>
                    <Rocket size={16} />
                    Submit Answers
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-base font-bold mb-4" style={{ color: "#111827" }}>Your Progress</h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-36 h-36 mx-auto">
                    <svg viewBox="0 0 144 144" className="w-36 h-36 transform -rotate-90 block" preserveAspectRatio="xMidYMid meet">
                      <circle cx="72" cy="72" r="58" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                      <circle
                        cx="72"
                        cy="72"
                        r="58"
                        stroke="#2563EB"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(progress / 100) * 364.4} 364.4`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-2xl font-bold" style={{ color: "#111827" }}>{progress}%</span>
                        <p className="text-xs" style={{ color: "#6B7280" }}>Complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-5 space-y-3 text-base">
                    <div className="flex items-center justify-between">
                      <span className="font-medium" style={{ color: "#000000" }}>Questions Solved</span>
                      <span className="font-bold" style={{ color: "#000000" }}>{solvedQuestions.length} / {questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium" style={{ color: "#000000" }}>Best Score</span>
                      <span className="font-bold" style={{ color: "#000000" }}>{bestScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold" style={{ color: "#111827" }}>Recent Activity</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}>
                    Beginner
                  </span>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const avatar = avatarPalette[index % avatarPalette.length];
                    return (
                      <div key={index} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold" style={{ backgroundColor: avatar.bg, color: avatar.text }}>
                            {activity.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-base font-semibold" style={{ color: "#111827" }}>{activity.name}</p>
                            <p className="text-sm" style={{ color: "#6B7280" }}>{activity.time}</p>
                          </div>
                        </div>
                        <span className="text-base font-bold text-green-600">{activity.score}%</span>
                      </div>
                    );
                  })}
                </div>
                <button className="w-full mt-4 text-sm font-semibold transition-colors" style={{ color: "#2563EB" }}>
                  View All \u2192
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} style={{ color: "#2563EB" }} />
                  <h3 className="text-base font-bold" style={{ color: "#111827" }}>Why Practice?</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Improve Excel skills with real practice",
                    "Build confidence for interviews",
                    "Track your progress",
                    "Practice anytime, anywhere",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                      <span className="text-sm font-medium" style={{ color: "#000000" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Rocket className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#111827" }}>Keep Practicing, Keep Growing!</h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>Practice daily and become an Excel expert.</p>
              </div>
            </div>
            <Link
              href="/learning-hub"
              className="px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors border-2 flex items-center gap-2 whitespace-nowrap"
              style={{ backgroundColor: "#FFFFFF", color: "#2563EB", borderColor: "#2563EB" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563EB";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = "#2563EB";
              }}
            >
              Explore Learning Hub
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}