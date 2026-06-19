// app/learning-hub/advanced-excel/excel-interface-navigation/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, ChevronLeft, ArrowRight,
  Clock, BookOpen, Star, FileSpreadsheet, Layers,
  Copy, Clipboard, Save, Undo2, Briefcase, TrendingUp, BarChart3, LineChart,
  Zap, CheckCircle, Target, Keyboard, Eye, Table2, Redo2,
  Home, ArrowDown, ArrowUp, ArrowRight as ArrowRightIcon, Tab, CornerDownLeft
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
// WHAT IS EXCEL? - Clean 3 Column Layout
// ============================================
const WhatIsExcel = () => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/excel-office.png"
                alt="Microsoft Excel"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black mb-1">What is Excel?</h2>
              <p className="text-sm text-black leading-relaxed">
                Microsoft Excel is a spreadsheet program used for organizing, analyzing and reporting data. It is widely used in finance, accounting, banking, auditing and business analysis tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-xl font-bold text-black mb-3">Workbook vs Worksheet</h2>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <FileSpreadsheet size={32} className="text-black" />
            </div>
            <div>
              <h4 className="font-bold text-black text-base">Workbook</h4>
              <p className="text-sm text-black leading-relaxed">An Excel file that contains one or more worksheets.</p>
              <div className="inline-flex px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-black mt-1">
                Financial_Model.xlsx
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-xl font-bold text-black mb-3">&nbsp;</h2>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl border border-green-200 bg-green-50 flex items-center justify-center shadow-sm flex-shrink-0">
              <Table2 size={32} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-black text-base">Worksheet</h4>
              <p className="text-sm text-black leading-relaxed">A single spreadsheet page inside a workbook.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium text-black">Sheet1</span>
                <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium text-black">Sheet2</span>
                <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium text-black">Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// EXCEL INTERFACE ELEMENTS - 11 Cards
// ============================================
const ExcelInterfaceElements = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Excel Interface Elements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* 1. Ribbon */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">1. Ribbon</h3>
          <div className="border rounded p-2 bg-slate-50 mb-2">
            <div className="flex gap-1 mb-1">
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center text-black">Home</div>
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center text-black">Insert</div>
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center text-black">Data</div>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center text-black">Review</div>
              <div className="w-8 h-5 bg-white border rounded text-[8px] flex items-center justify-center text-black">View</div>
            </div>
          </div>
          <p className="text-sm text-black leading-relaxed">Contains tabs like Home, Insert, Formulas and Data used to perform tasks.</p>
        </div>

        {/* 2. Name Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">2. Name Box</h3>
          <div className="border rounded px-3 py-1 text-sm w-20 bg-white mb-2 text-black">A1</div>
          <p className="text-sm text-black leading-relaxed">Shows the address of the active cell. Use it to name ranges or navigate quickly.</p>
        </div>

        {/* 3. Formula Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">3. Formula Bar</h3>
          <div className="border rounded px-3 py-1 text-sm bg-white flex items-center gap-2 mb-2">
            <span className="text-black">fx</span>
            <span className="text-black">=SUM(A1:A10)</span>
          </div>
          <p className="text-sm text-black leading-relaxed">Displays or lets you edit the contents of the active cell.</p>
        </div>

        {/* 4. Column Headings */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">4. Column Headings</h3>
          <div className="grid grid-cols-4 border rounded overflow-hidden mb-2 w-32">
            <div className="border p-1 text-center text-xs text-black">A</div>
            <div className="border p-1 text-center text-xs text-black">B</div>
            <div className="border p-1 text-center text-xs text-black">C</div>
            <div className="border p-1 text-center text-xs text-black">D</div>
          </div>
          <p className="text-sm text-black leading-relaxed">Vertical sections identified by letters (A, B, C...).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* 5. Row Headings */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">5. Row Headings</h3>
          <div className="border rounded overflow-hidden mb-2 w-12">
            <div className="border-b text-center text-xs py-0.5 text-black">1</div>
            <div className="border-b text-center text-xs py-0.5 text-black">2</div>
            <div className="text-center text-xs py-0.5 text-black">3</div>
          </div>
          <p className="text-sm text-black leading-relaxed">Horizontal lines identified by numbers (1, 2, 3...).</p>
        </div>

        {/* 6. Cells */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">6. Cells</h3>
          <div className="grid grid-cols-2 border rounded overflow-hidden mb-2 w-24">
            <div className="border p-1 text-center text-xs text-black">A1</div>
            <div className="border p-1 text-center text-xs text-black">B1</div>
            <div className="border p-1 text-center text-xs text-black">A2</div>
            <div className="border p-1 text-center text-xs text-black">B2</div>
          </div>
          <p className="text-sm text-black leading-relaxed">Intersection of a row and column. Each has a unique address.</p>
        </div>

        {/* 7. Active Cell */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">7. Active Cell</h3>
          <div className="w-16 h-8 border-2 border-green-500 bg-white rounded mb-2"></div>
          <p className="text-sm text-black leading-relaxed">Currently selected cell with a green border.</p>
        </div>

        {/* 8. Select All Button */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">8. Select All Button</h3>
          <div className="w-8 h-8 border bg-slate-100 relative rounded mb-2">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[16px] border-b-[16px] border-l-slate-400 border-b-transparent"></div>
          </div>
          <p className="text-sm text-black leading-relaxed">Located at top-left corner. Click to select entire worksheet.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* 9. Sheet Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">9. Sheet Tabs</h3>
          <div className="flex border rounded overflow-hidden mb-2">
            <div className="px-3 py-1 bg-white border-r text-sm text-black">Sheet1</div>
            <div className="px-3 py-1 bg-slate-100 text-sm text-black">Sheet2</div>
            <div className="px-3 py-1 bg-white text-sm text-black">Sheet3</div>
          </div>
          <p className="text-sm text-black leading-relaxed">Located at the bottom. Used to switch between sheets.</p>
        </div>

        {/* 10. Status Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">10. Status Bar</h3>
          <div className="border rounded px-3 py-1 text-sm bg-slate-50 mb-2 text-black">Ready</div>
          <p className="text-sm text-black leading-relaxed">Shows Ready, Average, Count and Sum information.</p>
        </div>

        {/* 11. Quick Access Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">11. Quick Access Toolbar</h3>
          <div className="flex gap-3 mb-2">
            <Save size={20} className="text-black" />
            <Undo2 size={20} className="text-black" />
            <Redo2 size={20} className="text-black" />
          </div>
          <p className="text-sm text-black leading-relaxed">Contains Save, Undo and Redo buttons. Can be customized.</p>
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
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Cell</h3>
          <div className="grid grid-cols-2 border rounded overflow-hidden mb-2 w-24">
            <div className="border h-6"></div>
            <div className="border h-6"></div>
            <div className="border h-6"></div>
            <div className="border h-6 bg-green-100"></div>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm mb-1">Example: B3</span>
          <p className="text-sm text-black leading-relaxed">A single box where data is entered.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Row</h3>
          <div className="border rounded overflow-hidden mb-2 w-32">
            <div className="flex">
              <div className="w-6 border-r text-center text-xs text-black">1</div>
              <div className="flex-1 h-5"></div>
            </div>
            <div className="flex">
              <div className="w-6 border-r text-center text-xs text-black">2</div>
              <div className="flex-1 h-5 bg-green-50"></div>
            </div>
            <div className="flex">
              <div className="w-6 border-r text-center text-xs text-black">3</div>
              <div className="flex-1 h-5"></div>
            </div>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm mb-1">Example: Row 5</span>
          <p className="text-sm text-black leading-relaxed">Horizontal line of cells identified by numbers.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">Column</h3>
          <div className="grid grid-cols-3 border rounded overflow-hidden mb-2 w-32">
            <div className="border text-center bg-green-50 text-sm text-black">A</div>
            <div className="border text-center text-sm text-black">B</div>
            <div className="border text-center text-sm text-black">C</div>
          </div>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm mb-1">Example: Column C</span>
          <p className="text-sm text-black leading-relaxed">Vertical section of cells identified by letters.</p>
        </div>

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
          <p className="text-sm text-black leading-relaxed">A group of selected cells.</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// NAVIGATION SHORTCUTS - 6 Shortcuts
// ============================================
const navigationShortcuts = [
  {
    shortcut: "Ctrl + Home",
    action: "Go to A1"
  },
  {
    shortcut: "Ctrl + End",
    action: "Last used cell"
  },
  {
    shortcut: "Ctrl + Arrow",
    action: "Jump data"
  },
  {
    shortcut: "Tab",
    action: "Move right"
  },
  {
    shortcut: "Enter",
    action: "Move down"
  },
  {
    shortcut: "Shift + Tab",
    action: "Move left"
  }
];

const NavigationShortcuts = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Navigation Shortcuts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {navigationShortcuts.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition flex items-center justify-between">
            <div>
              <span className="font-bold text-black text-sm">{item.shortcut}</span>
              <p className="text-sm text-black mt-1">{item.action}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Keyboard size={16} className="text-blue-600" />
            </div>
          </div>
        ))}
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
              <p className="text-sm text-black">{shortcut.description}</p>
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
              <p className="text-sm text-black">{useCase.description}</p>
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
            <li key={idx} className="flex items-center gap-2 text-black">
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
    "Rows",
    "Columns",
    "Cells",
    "Active Cell",
    "Sheet Tabs",
    "Status Bar"
  ];

  return (
    <section className="mb-12">
      <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200">
        <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-4">
          Practice Exercise
        </h2>
        <p className="text-black mb-4">
          Open Excel and identify the following components:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 text-center hover:shadow-md transition">
              <Target size={18} className="text-blue-600 mx-auto mb-1" />
              <span className="text-sm font-medium text-black">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// NEXT TOPIC CARD
// ============================================
const NextTopicCard = () => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-blue-200 text-sm font-medium">Next Topic →</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Formulas & Functions
            </h3>
            <p className="text-blue-100 mt-2">
              Master basic to advanced formulas and functions in Excel.
            </p>
          </div>
          <Link
            href="/learning-hub/advanced-excel/formulas-functions"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-md"
          >
            Start Learning
            <ArrowRight size={18} />
          </Link>
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
      <NavigationShortcuts />
      <CommonShortcuts />
      <FinanceUseCases />
      <QuickTips />
      <PracticeExercise />
      <NextTopicCard />
      <BottomNavigation />
    </main>
  );
}