// app/learning-hub/advanced-excel/excel-interface-navigation/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, ChevronLeft, ArrowRight,
  Clock, BookOpen, Star, FileSpreadsheet, Layers,
  Copy, Clipboard, Save, Undo2, Briefcase, TrendingUp, BarChart3, LineChart,
  Zap, CheckCircle, Target, Keyboard, Eye, Table2, Redo2,
  Minimize2, Maximize2, X, Search, Navigation, Command,
  ClipboardCheck, Calculator, Wallet, PieChart, CheckSquare
} from "lucide-react";

// ============================================
// HEADER WITH FINLYSTA LOGO
// ============================================
const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group">
          <Image
            src="/Finlysta.png"
            alt="Finlysta Logo"
            width={160}
            height={36}
            priority
            className="object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Home</Link>
          <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Jobs</Link>
          <Link href="/internships" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Internships</Link>
          <Link href="/learning-hub" className="text-sm font-medium text-blue-600 transition">Learning Hub</Link>
          <Link href="/career-paths" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Career Paths</Link>
          <Link href="/interview-prep" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Interview Prep</Link>
        </nav>

        {/* Right side - empty for spacing */}
        <div className="w-[160px] hidden md:block"></div>
      </div>
    </header>
  );
};

// ============================================
// BREADCRUMB
// ============================================
const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-md mb-6">
      <Link href="/learning-hub" className="text-Black-500 hover:text-blue-600 transition">
        Learning Hub
      </Link>
      <ChevronRight size={18} className="text-Black-500" />
      <Link href="/learning-hub/advanced-excel" className="text-black-500 hover:text-blue-600 transition">
        Advanced Excel
      </Link>
      <ChevronRight size={18} className="text-Black-500" />
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
        {/* Column 1 - What is Excel? */}
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
              <p className="text-md text-black leading-relaxed">
                Microsoft Excel is a spreadsheet program used for organizing, analyzing and reporting data. It is widely used in finance, accounting, banking, auditing and business analysis tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2 & 3 - Workbook vs Worksheet with heading outside */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-black mb-3">Workbook vs Worksheet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Workbook */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <FileSpreadsheet size={32} className="text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-base">Workbook</h4>
                  <p className="text-md text-black leading-relaxed">An Excel file that contains one or more worksheets.</p>
                  <div className="inline-flex px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-black mt-1">
                    Financial_Model.xlsx
                  </div>
                </div>
              </div>
            </div>

            {/* Worksheet */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl border border-green-200 bg-green-50 flex items-center justify-center shadow-sm flex-shrink-0">
                  <Table2 size={32} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-base">Worksheet</h4>
                  <p className="text-md text-black leading-relaxed">A single spreadsheet page inside a workbook is called Worksheet.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium text-black">Sheet1</span>
                    <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium text-black">Sheet2</span>
                    <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm font-medium text-black">Dashboard</span>
                  </div>
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
// EXCEL INTERFACE ELEMENTS - 15 Cards
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
            <div className="flex items-center gap-4 px-2 py-1 border-b bg-slate-50">
              <span className="text-[10px] font-medium text-black">File</span>
              <span className="text-[10px] font-medium text-black">Home</span>
              <span className="text-[10px] font-medium text-black">Insert</span>
              <span className="text-[10px] font-medium text-black">Draw</span>
              <span className="text-[10px] font-medium text-black">Review</span>
              <span className="text-[10px] font-medium text-black">View</span>
            </div>
          </div>
          <p className="text-md text-black leading-relaxed">The Ribbon is the primary visual command bar located at the very top of the Excel window. Contains tabs like Home, Insert, Formulas and Data used to perform tasks.</p>
        </div>

        {/* 2. Name Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">2. Name Box</h3>
          <div className="border rounded px-3 py-1 text-sm w-20 bg-white mb-2 text-black">A1</div>
          <p className="text-md text-black leading-relaxed">The Name Box is located on the left side of the Excel window. It shows the address of the active cell. Use it to name ranges or navigate quickly.</p>
        </div>

        {/* 3. Formula Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">3. Formula Bar</h3>
          <div className="border rounded px-3 py-1 text-sm bg-white flex items-center gap-2 mb-2">
            <span className="text-black">fx</span>
            <span className="text-black">=SUM(A1:A10)</span>
          </div>
          <p className="text-md text-black leading-relaxed">It is a designated area where you can view and edit the content of a cell.</p>
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
          <p className="text-md text-black leading-relaxed">Vertical sections in a worksheet used to organize and store data. Columns are identified by letters (A, B, C, D...). They extend from top to bottom.</p>
        </div>
      </div>

      {/* Row 2 - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* 5. Row Headings */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">5. Row Headings</h3>
          <div className="border rounded overflow-hidden mb-2 w-12">
            <div className="border-b text-center text-xs py-0.5 text-black">1</div>
            <div className="border-b text-center text-xs py-0.5 text-black">2</div>
            <div className="text-center text-xs py-0.5 text-black">3</div>
          </div>
          <p className="text-md text-black leading-relaxed">Horizontal sections in a worksheet used to organize and store data. Identified by numbers such as 1, 2, 3.</p>
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
          <p className="text-md text-black leading-relaxed">A cell is the rectangular box formed by the intersection of a row and column. Each cell has a unique address.</p>
        </div>

        {/* 7. Active Cell */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">7. Active Cell</h3>
          <div 
            className="w-20 h-10 rounded mb-2"
            style={{
              border: "3px solid #21A366",
              backgroundColor: "#F0FDF4"
            }}
          ></div>
          <p className="text-md text-black leading-relaxed">The currently selected cell in a worksheet is called Active Cell. It is highlighted with a border and ready for data entry.</p>
        </div>

        {/* 8. Select All Button */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">8. Select All Button</h3>
          <div className="w-12 h-12 border border-slate-300 bg-slate-50 rounded relative mb-3">
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 4,
                width: 0,
                height: 0,
                borderTop: "18px solid #94A3B8",
                borderRight: "18px solid transparent",
              }}
            />
          </div>
          <p className="text-md text-black leading-relaxed">The Select All button in Excel is a small gray triangle located in the top-left corner of the worksheet, exactly where the row numbers (1, 2, 3) and column letters (A, B, C) intersect.</p>
        </div>
      </div>

      {/* Row 3 - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* 9. Sheet Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">9. Sheet Tabs</h3>
          <div className="flex border rounded overflow-hidden mb-2">
            <div className="px-3 py-1 bg-white border-r text-sm text-black">Sheet1</div>
            <div className="px-3 py-1 bg-slate-100 text-sm text-black">Sheet2</div>
            <div className="px-3 py-1 bg-white text-sm text-black">Sheet3</div>
          </div>
          <p className="text-md text-black leading-relaxed">Located at the bottom of the window. Click to switch between sheets. Use + to insert a new sheet. Right-click for more options (Rename, Delete, Move, etc.)</p>
        </div>

        {/* 10. Status Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">10. Status Bar</h3>
          <div className="border rounded px-3 py-1 text-sm bg-slate-50 mb-2 text-black">Ready</div>
          <p className="text-md text-black leading-relaxed">The Status Bar is a horizontal bar at the bottom of the worksheet that displays real-time information such as quick data calculations, current edit modes, viewing options, and toggle states.</p>
        </div>

        {/* 11. Quick Access Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">11. Quick Access Toolbar</h3>
          <div className="flex gap-3 mb-2">
            <Save size={20} className="text-black" />
            <Undo2 size={20} className="text-black" />
            <Redo2 size={20} className="text-black" />
          </div>
          <p className="text-md text-black leading-relaxed">The Quick Access Toolbar (QAT) is a customizable toolbar that provides quick access to frequently used commands like Save, Undo, and Redo.</p>
        </div>

        {/* 12. Title Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">12. Title Bar</h3>
          <div className="border rounded bg-slate-50 p-2 mb-2">
            <div className="flex items-center justify-between bg-white border rounded px-2 py-1">
              <span className="text-xs font-medium text-black">Financial_Model.xlsx - Excel</span>
              <div className="flex gap-1">
                <Minimize2 size={12} className="text-black" />
                <Maximize2 size={12} className="text-black" />
                <X size={12} className="text-black" />
              </div>
            </div>
          </div>
          <p className="text-md text-black leading-relaxed">The Title Bar is the topmost bar in Excel that displays the workbook name and window controls.</p>
        </div>
      </div>

      {/* Row 4 - 3 Cards (centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* 13. Worksheet Area - Excel Grid */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">13. Worksheet Area</h3>
          <div className="border border-slate-300 rounded bg-white p-1 mb-2 w-full max-w-xs">
            <div className="grid grid-cols-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-slate-200 h-5"></div>
              ))}
            </div>
          </div>
          <p className="text-md text-black leading-relaxed">The main working area where data is entered, edited and analyzed.</p>
        </div>

        {/* 14. Range of Cells - Blue Highlighted Selection */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">14. Range of Cells</h3>
          <div className="border border-slate-300 rounded bg-white p-1 mb-2 w-full max-w-xs">
            <div className="grid grid-cols-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`border border-slate-200 h-5 ${
                    i >= 5 && i <= 10 ? "bg-blue-100 border-blue-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-md text-black leading-relaxed">A group of selected cells treated as a single unit. Used for calculations and formatting.</p>
          <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs mt-1">Example: C3:E6</span>
        </div>

        {/* 15. Scroll Bars */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-black text-base mb-2">15. Scroll Bars</h3>
          <div className="border border-slate-300 rounded bg-white p-2 mb-2 w-full max-w-xs">
            <div className="flex flex-col gap-1">
              {/* Horizontal Scroll Bar */}
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 border border-slate-300 bg-slate-100 rounded flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-slate-500"></div>
                </div>
                <div className="flex-1 h-4 border border-slate-300 bg-slate-100 rounded relative">
                  <div className="absolute left-1/4 top-0.5 w-1/3 h-3 bg-slate-300 rounded"></div>
                </div>
                <div className="w-4 h-4 border border-slate-300 bg-slate-100 rounded flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-500"></div>
                </div>
              </div>
              {/* Vertical Scroll Bar */}
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 border border-slate-300 bg-slate-100 rounded flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-r-[6px] border-b-[4px] border-l-transparent border-b-transparent border-r-slate-500"></div>
                </div>
                <div className="w-4 h-12 border border-slate-300 bg-slate-100 rounded relative">
                  <div className="absolute top-1/4 left-0.5 w-3 h-1/3 bg-slate-300 rounded"></div>
                </div>
                <div className="w-4 h-4 border border-slate-300 bg-slate-100 rounded flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[6px] border-r-transparent border-t-[4px] border-t-slate-500"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-md text-black leading-relaxed">Scroll Bars are used to move horizontally and vertically across the worksheet to view different areas of data.</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SHORTCUTS & FINANCE SECTION - 3 Column Layout
// ============================================
const ShortcutsAndFinanceSection = () => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 - Basic Navigation Shortcuts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Navigation size={20} className="text-blue-600" />
            <h3 className="text-lg font-bold text-[#081B4B]">Basic Navigation Shortcuts</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Ctrl + Home</span>
              <span className="text-sm text-slate-600">Go to cell A1</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Ctrl + End</span>
              <span className="text-sm text-slate-600">Go to last used cell</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Ctrl + Arrow</span>
              <span className="text-sm text-slate-600">Jump to edge of data</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Tab</span>
              <span className="text-sm text-slate-600">Move one cell right</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Enter</span>
              <span className="text-sm text-slate-600">Move one cell down</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Shift + Tab</span>
              <span className="text-sm text-slate-600">Move one cell left</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Shift + Enter</span>
              <span className="text-sm text-slate-600">Move one cell up</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-medium text-black">Ctrl + Space</span>
              <span className="text-sm text-slate-600">Select entire column</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-black">Shift + Space</span>
              <span className="text-sm text-slate-600">Select entire row</span>
            </div>
          </div>
        </div>

        {/* Column 2 - Common Excel Shortcuts with Icons */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Command size={20} className="text-purple-600" />
            <h3 className="text-lg font-bold text-[#081B4B]">Common Excel Shortcuts</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Copy size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black text-sm">Ctrl + C</p>
                <p className="text-sm text-slate-600">Copy selected data or cells.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clipboard size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black text-sm">Ctrl + V</p>
                <p className="text-sm text-slate-600">Paste copied data.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Save size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black text-sm">Ctrl + S</p>
                <p className="text-sm text-slate-600">Save the workbook instantly.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Undo2 size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black text-sm">Ctrl + Z</p>
                <p className="text-sm text-slate-600">Undo the last action.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Redo2 size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black text-sm">Ctrl + Y</p>
                <p className="text-sm text-slate-600">Redo the last action.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Search size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black text-sm">Ctrl + F</p>
                <p className="text-sm text-slate-600">Find specific data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 - Finance Example */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-green-600" />
            <h3 className="text-lg font-bold text-[#081B4B]">Finance Example</h3>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-2 text-left text-black">Month</th>
                  <th className="p-2 text-right text-black">Revenue</th>
                  <th className="p-2 text-right text-black">Expenses</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-black">January</td>
                  <td className="p-2 text-right text-black">50,000</td>
                  <td className="p-2 text-right text-black">30,000</td>
                </tr>
                <tr>
                  <td className="p-2 text-black">February</td>
                  <td className="p-2 text-right text-black">55,000</td>
                  <td className="p-2 text-right text-black">32,000</td>
                </tr>
                <tr>
                  <td className="p-2 text-black">March</td>
                  <td className="p-2 text-right text-black">60,000</td>
                  <td className="p-2 text-right text-black">35,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 text-sm text-black">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Rows contain records
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Columns contain categories
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Cells contain values
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FINANCE USE CASES - 6 Cards
// ============================================
const financeUseCases = [
  {
    title: "Budget Tracking",
    description: "Track expenses and compare actual vs budgeted spending.",
    icon: Wallet,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Financial Reporting",
    description: "Prepare MIS reports and management reports.",
    icon: FileSpreadsheet,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Data Analysis",
    description: "Analyze business and financial data efficiently.",
    icon: PieChart,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Forecasting",
    description: "Predict future sales, revenue and expenses.",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    title: "Financial Modeling",
    description: "Build valuation and financial projection models.",
    icon: Calculator,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    title: "Investment Analysis",
    description: "Evaluate investment opportunities and returns.",
    icon: BarChart3,
    color: "text-rose-600",
    bgColor: "bg-rose-50"
  }
];

const FinanceUseCases = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-6">
        Finance Use Cases of Excel
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
// FOOTER SECTION - Improved UI with better styling
// ============================================
const FooterSection = () => {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Practice Exercise - 4 columns */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <ClipboardCheck size={18} className="text-green-600" />
            </div>
            <h3 className="font-bold text-[15px] text-green-800">Practice Exercise</h3>
          </div>

          <p className="text-[12px] text-slate-500 mb-3">
            Identify the following Excel interface elements:
          </p>

          <div className="grid grid-cols-3 gap-y-1.5 text-[13px] text-slate-700">
            <span>• Ribbon</span>
            <span>• Select All Button</span>
            <span>• Cells</span>
            <span>• Name Box</span>
            <span>• Columns</span>
            <span>• Active Cell</span>
            <span>• Formula Bar</span>
            <span>• Rows</span>
            <span>• Sheet Tabs</span>
          </div>
        </div>

        {/* Chapter Summary - 6 columns */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <CheckSquare size={18} className="text-purple-600" />
            </div>
            <h3 className="font-bold text-[15px] text-purple-800">Chapter Summary</h3>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-1.5 text-[13px] text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Workbook vs Worksheet
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Ribbon
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Name Box
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Columns
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Active Cell
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Title Bar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Status Bar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Quick Access Toolbar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Rows
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Scroll Bars
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Navigation Shortcuts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Formula Bar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Worksheet Area
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Range of Cells
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              Key Concepts
            </span>
          </div>
        </div>

        {/* Next Topic - 2 columns */}
        <Link
          href="/learning-hub/advanced-excel/formulas-functions"
          className="lg:col-span-2 bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl p-5 flex flex-col hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <span className="text-[13px] font-semibold">Next Topic</span>
              <ArrowRight size={16} className="text-green-600 group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-[22px] font-bold text-green-900 leading-tight">
              Formulas &<br />Functions
            </h3>
            <p className="text-[12px] text-green-600 mt-2">Master basic to advanced formulas</p>
          </div>

          <div className="flex justify-end mt-4">
            <div className="w-14 h-14 rounded-full border-2 border-green-400 bg-white/80 flex items-center justify-center group-hover:bg-green-50 transition shadow-sm">
              <Calculator size={28} className="text-green-700" />
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Excel Interface & Navigation - Beginner Guide",
  description: "Learn the Excel interface and navigation basics — ribbon, cells, shortcuts, and more. A beginner-friendly Excel guide for finance freshers.",
  alternates: { canonical: "https://finlysta.com/learning-hub/advanced-excel/excel-interface-navigation" },
  openGraph: {
    title: "Excel Interface & Navigation - Beginner Guide | Finlysta",
    description: "Learn the Excel interface and navigation basics — ribbon, cells, shortcuts, and more. A beginner-friendly Excel guide for finance freshers.",
    url: "https://finlysta.com/learning-hub/advanced-excel/excel-interface-navigation",
    images: [{ url: 'https://finlysta.com/og-image.png', width: 1200, height: 630, alt: "Excel Interface & Navigation - Beginner Guide" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Excel Interface & Navigation - Beginner Guide | Finlysta",
    description: "Learn the Excel interface and navigation basics — ribbon, cells, shortcuts, and more. A beginner-friendly Excel guide for finance freshers.",
    images: ['https://finlysta.com/og-image.png'],
  },
};


export default function ExcelInterfaceNavigationPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Breadcrumb />
        <HeroSection />
        <WhatIsExcel />
        <ExcelInterfaceElements />
        <ShortcutsAndFinanceSection />
        <FinanceUseCases />
        <FooterSection />
      </main>
    </>
  );
}