// app/learning-hub/advanced-excel/excel-interface-navigation/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, ChevronLeft, ArrowRight,
  Clock, BookOpen, Star, FileSpreadsheet, Layers,
  Copy, Clipboard, Save, Undo2, Briefcase, TrendingUp, BarChart3, LineChart,
  Zap, CheckCircle, Target, Keyboard, Eye, Table2, Redo2
} from "lucide-react";

// ============================================
// BREADCRUMB
// ============================================
const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <Link href="/learning-hub" className="text-slate-500 hover:text-blue-600 transition">
        Learning Hub
      </Link>
      <ChevronRight size={14} className="text-slate-400" />
      <Link href="/learning-hub/advanced-excel" className="text-slate-500 hover:text-blue-600 transition">
        Advanced Excel
      </Link>
      <ChevronRight size={14} className="text-slate-400" />
      <span className="text-[#2563EB] font-semibold">Excel Interface & Navigation</span>
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
            Topic 1 of 12
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#081B4B] mt-6 leading-tight">
            Excel Interface &
            <br />
            Navigation
          </h1>

          <p className="mt-6 text-xl text-slate-700 leading-relaxed">
            Learn the Excel workspace, ribbon menus,
            <br />
            quick access toolbar, worksheets and shortcuts used in
            <br />
            finance roles.
          </p>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-green-600" />
              <span className="text-black font-medium">15 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-green-600" />
              <span className="text-black font-medium">Advanced Excel</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-green-600" />
              <span className="text-black font-medium">Beginner Friendly</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-start -ml-24 lg:-ml-48">
          <div className="relative w-full max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-green-100/20 rounded-full opacity-30 blur-2xl"></div>
            <div className="relative">
              <Image
                src="/excel-interface-hero.png"
                alt="Excel Interface"
                width={1400}
                height={1000}
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
// WHAT IS EXCEL? - 3 Column Layout
// ============================================
const WhatIsExcel = () => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Image
                src="/excel-office.png"
                alt="Microsoft Excel"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">What is Excel?</h2>
              <p className="text-[28px] text-black leading-10">
                Microsoft Excel is a spreadsheet program
                <br />
                used for organizing, analyzing and reporting data.
                <br />
                It is widely used in finance, accounting, banking,
                <br />
                auditing and business analysis tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4">
          <h2 className="text-lg font-bold text-black mb-2">Workbook vs Worksheet</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <FileSpreadsheet size={32} className="text-slate-700" />
              </div>
              <div>
                <h4 className="font-bold text-black text-base">Workbook</h4>
                <p className="text-sm text-slate-600 leading-relaxed">An Excel file that contains one or more worksheets.</p>
                <div className="inline-flex px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 mt-1">
                  Financial_Model.xlsx
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4">
          <h2 className="text-lg font-bold text-black mb-2">&nbsp;</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl border border-green-200 bg-green-50 flex items-center justify-center shadow-sm flex-shrink-0">
                <Table2 size={32} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-black text-base">Worksheet</h4>
                <p className="text-sm text-slate-600 leading-relaxed">A single spreadsheet page inside a workbook.</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium">Sheet1</span>
                  <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium">Sheet2</span>
                  <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium">Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// EXCEL INTERFACE ELEMENTS - Built with Tailwind (no images)
// ============================================
const ExcelInterfaceElements = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Excel Interface Elements
      </h2>

      {/* Row 1 - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* 1. Ribbon */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">1. Ribbon</h3>
          <div className="border rounded p-2 bg-slate-50 mb-2">
            <div className="flex gap-1 mb-1">
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center">Home</div>
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center">Insert</div>
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center">Data</div>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center">Review</div>
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center">View</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Contains tabs like Home, Insert, Formulas and Data used to perform tasks.</p>
        </div>

        {/* 2. Name Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">2. Name Box</h3>
          <div className="border rounded px-3 py-1 text-sm w-20 bg-white mb-2">A1</div>
          <p className="text-sm text-slate-600 leading-relaxed">Shows the address of the active cell. Use it to name ranges or navigate quickly.</p>
        </div>

        {/* 3. Formula Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">3. Formula Bar</h3>
          <div className="border rounded px-3 py-1 text-sm bg-white flex items-center gap-2 mb-2">
            <span className="text-slate-400">fx</span>
            <span className="text-slate-600">=SUM(A1:A10)</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Displays or lets you edit the contents of the active cell.</p>
        </div>

        {/* 4. Column Headings */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">4. Column Headings</h3>
          <div className="grid grid-cols-4 border rounded overflow-hidden mb-2 w-32">
            <div className="border p-1 text-center text-xs">A</div>
            <div className="border p-1 text-center text-xs">B</div>
            <div className="border p-1 text-center text-xs">C</div>
            <div className="border p-1 text-center text-xs">D</div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Vertical sections identified by letters (A, B, C...).</p>
        </div>
      </div>

      {/* Row 2 - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* 5. Row Headings */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">5. Row Headings</h3>
          <div className="border rounded overflow-hidden mb-2 w-12">
            <div className="border-b text-center text-xs py-0.5">1</div>
            <div className="border-b text-center text-xs py-0.5">2</div>
            <div className="text-center text-xs py-0.5">3</div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Horizontal lines identified by numbers (1, 2, 3...).</p>
        </div>

        {/* 6. Cells */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">6. Cells</h3>
          <div className="grid grid-cols-2 border rounded overflow-hidden mb-2 w-24">
            <div className="border p-1 text-center text-xs">A1</div>
            <div className="border p-1 text-center text-xs">B1</div>
            <div className="border p-1 text-center text-xs">A2</div>
            <div className="border p-1 text-center text-xs">B2</div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Intersection of a row and column. Each has a unique address.</p>
        </div>

        {/* 7. Active Cell */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">7. Active Cell</h3>
          <div className="w-16 h-8 border-2 border-green-500 bg-white rounded mb-2"></div>
          <p className="text-sm text-slate-600 leading-relaxed">Currently selected cell with a green border.</p>
        </div>

        {/* 8. Select All Button */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">8. Select All Button</h3>
          <div className="w-8 h-8 border bg-slate-100 relative rounded mb-2">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[16px] border-b-[16px] border-l-slate-400 border-b-transparent"></div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Located at top-left corner. Click to select entire worksheet.</p>
        </div>
      </div>

      {/* Row 3 - 3 Cards (centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* 9. Sheet Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">9. Sheet Tabs</h3>
          <div className="flex border rounded overflow-hidden mb-2">
            <div className="px-3 py-1 bg-white border-r text-sm">Sheet1</div>
            <div className="px-3 py-1 bg-slate-100 text-sm">Sheet2</div>
            <div className="px-3 py-1 bg-white text-sm">Sheet3</div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Located at the bottom. Used to switch between sheets.</p>
        </div>

        {/* 10. Status Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">10. Status Bar</h3>
          <div className="border rounded px-3 py-1 text-sm bg-slate-50 mb-2">Ready</div>
          <p className="text-sm text-slate-600 leading-relaxed">Shows Ready, Average, Count and Sum information.</p>
        </div>

        {/* 11. Quick Access Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">11. Quick Access Toolbar</h3>
          <div className="flex gap-3 mb-2">
            <Save size={20} className="text-slate-600" />
            <Undo2 size={20} className="text-slate-600" />
            <Redo2 size={20} className="text-slate-600" />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">Contains Save, Undo and Redo buttons. Can be customized.</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// KEY CONCEPTS - Cell, Row, Column, Range
// ============================================
const KeyConcepts = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Key Concepts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cell */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Cell</h3>
          <div className="grid grid-cols-2 border rounded overflow-hidden mb-2 w-24">
            <div className="border h-6"></div>
            <div className="border h-6"></div>
            <div className="border h-6"></div>
            <div className="border h-6 bg-green-100"></div>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm mb-1">Example: B3</span>
          <p className="text-sm text-slate-600 leading-relaxed">A single box where data is entered.</p>
        </div>

        {/* Row */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Row</h3>
          <div className="border rounded overflow-hidden mb-2 w-32">
            <div className="flex">
              <div className="w-6 border-r text-center text-xs">1</div>
              <div className="flex-1 h-5"></div>
            </div>
            <div className="flex">
              <div className="w-6 border-r text-center text-xs">2</div>
              <div className="flex-1 h-5 bg-green-50"></div>
            </div>
            <div className="flex">
              <div className="w-6 border-r text-center text-xs">3</div>
              <div className="flex-1 h-5"></div>
            </div>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm mb-1">Example: Row 5</span>
          <p className="text-sm text-slate-600 leading-relaxed">Horizontal line of cells identified by numbers.</p>
        </div>

        {/* Column */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Column</h3>
          <div className="grid grid-cols-3 border rounded overflow-hidden mb-2 w-32">
            <div className="border text-center bg-green-50 text-sm">A</div>
            <div className="border text-center text-sm">B</div>
            <div className="border text-center text-sm">C</div>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm mb-1">Example: Column C</span>
          <p className="text-sm text-slate-600 leading-relaxed">Vertical section of cells identified by letters.</p>
        </div>

        {/* Range */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Range</h3>
          <div className="grid grid-cols-4 border rounded overflow-hidden mb-2 w-32">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`h-5 border ${
                  i >= 5 && i <= 10 ? "bg-blue-100" : ""
                }`}
              />
            ))}
          </div>
          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm mb-1">Example: C3:E6</span>
          <p className="text-sm text-slate-600 leading-relaxed">A group of selected cells.</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMMON EXCEL SHORTCUTS - 4 Cards
// ============================================
const shortcuts = [
  {
    id: 1,
    title: "Ctrl + C",
    description: "Copy selected data or cells.",
    icon: Copy,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    title: "Ctrl + V",
    description: "Paste copied data.",
    icon: Clipboard,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 3,
    title: "Ctrl + S",
    description: "Save the workbook instantly.",
    icon: Save,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: 4,
    title: "Ctrl + Z",
    description: "Undo the last action.",
    icon: Undo2,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  }
];

const CommonShortcuts = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Common Excel Shortcuts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <div key={shortcut.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition text-center">
              <div className={`w-14 h-14 rounded-xl ${shortcut.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={28} className={shortcut.color} />
              </div>
              <h3 className="font-bold text-black text-lg mb-2">{shortcut.title}</h3>
              <p className="text-sm text-slate-600">{shortcut.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// FINANCE USE CASES - 4 Cards
// ============================================
const financeUseCases = [
  {
    title: "Budget Tracking",
    description: "Track expenses and compare actual vs budgeted spending.",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Financial Reporting",
    description: "Prepare MIS reports and management reports.",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Data Analysis",
    description: "Analyze business and financial data efficiently.",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Forecasting",
    description: "Predict future sales, revenue and expenses.",
    icon: LineChart,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  }
];

const FinanceUseCases = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Finance Use Cases of Excel
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {financeUseCases.map((useCase, idx) => {
          const Icon = useCase.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition text-center">
              <div className={`w-14 h-14 rounded-xl ${useCase.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={28} className={useCase.color} />
              </div>
              <h3 className="font-bold text-black text-lg mb-2">{useCase.title}</h3>
              <p className="text-sm text-slate-600">{useCase.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// QUICK TIPS
// ============================================
const QuickTips = () => {
  const tips = [
    "Learn keyboard shortcuts early",
    "Save your workbook frequently",
    "Use multiple sheets for organization",
    "Freeze panes for large datasets"
  ];

  return (
    <section className="mb-12">
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-bold text-xl text-[#081B4B] mb-4 flex items-center gap-2">
          <Zap size={22} className="text-blue-600" />
          Quick Tips
        </h3>
        <ul className="space-y-3">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-center gap-2 text-slate-700">
              <CheckCircle size={18} className="text-blue-600" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ============================================
// PRACTICE EXERCISE
// ============================================
const PracticeExercise = () => {
  const items = [
    "Ribbon",
    "Formula Bar",
    "Name Box",
    "Sheet Tabs",
    "Active Cell",
    "Status Bar"
  ];

  return (
    <section className="mb-12">
      <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200">
        <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-4">
          Practice Exercise
        </h2>
        <p className="text-slate-600 mb-4">
          Open Excel and identify the following components:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 text-center hover:shadow-md transition">
              <Target size={18} className="text-blue-600 mx-auto mb-1" />
              <span className="text-sm font-medium text-[#081B4B]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// BOTTOM NAVIGATION
// ============================================
const BottomNavigation = () => {
  return (
    <div className="grid grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden">
      <Link
        href="/learning-hub/advanced-excel"
        className="p-6 border-r border-slate-200 hover:bg-gray-50 transition text-left"
      >
        <span className="text-sm text-slate-500">Previous</span>
        <p className="font-semibold text-[#081B4B] flex items-center gap-1">
          <ChevronLeft size={16} /> Back to Advanced Excel
        </p>
      </Link>

      <Link
        href="/learning-hub/advanced-excel/formulas-functions"
        className="p-6 text-right hover:bg-gray-50 transition"
      >
        <span className="text-sm text-slate-500">Next Topic</span>
        <p className="font-semibold text-blue-600 flex items-center justify-end gap-1">
          Formulas & Functions <ArrowRight size={16} />
        </p>
      </Link>
    </div>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function ExcelInterfaceNavigationPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <Breadcrumb />
      <HeroSection />
      <WhatIsExcel />
      <ExcelInterfaceElements />
      <KeyConcepts />
      <CommonShortcuts />
      <FinanceUseCases />
      <QuickTips />
      <PracticeExercise />
      <BottomNavigation />
    </main>
  );
}