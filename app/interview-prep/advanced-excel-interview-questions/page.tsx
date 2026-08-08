'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { 
  Search,
  Users,
  ChevronRight, 
  Calculator, 
  CheckCircle, 
  Award, 
  BookOpen, 
  Mic, 
  Share2,
  Copy,
  X,
  Headphones,
  Play,
  Pause,
  Heart,
  FileText,
  ChevronDown,
  ChevronUp,
  Code,
  TrendingUp,
  Filter,
  Briefcase,
  Sparkles,
  GraduationCap,
  DollarSign,
  ArrowRight,
  TrendingDown,
  Percent,
  LineChart,
  PieChart,
  BarChart3,
  Target,
  Lightbulb,
  BarChart,
  Layers,
  Workflow,
  GitBranch,
  Database,
  Shield,
  ClipboardList,
  Zap,
  Star,
  MessageCircle,
  Volume2
} from "lucide-react";

export default function AdvancedExcelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [audioMode, setAudioMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0);
  const [showMockAnswer, setShowMockAnswer] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const audioRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Comprehensive Interview Questions - 28+ Questions
  const interviewQuestions = [
    // Lookup Functions (2 questions)
    {
      id: 1,
      question: "What is the difference between VLOOKUP and XLOOKUP?",
      shortAnswer: "XLOOKUP is newer, more flexible, and can search left or right. VLOOKUP can only search right and requires column index numbers.",
      answer: "VLOOKUP searches for a value in the first column of a table and returns a value from a column to the right. XLOOKUP (Excel 365/2021) solves all these issues: it can search in any direction, uses ranges instead of column numbers, has built-in error handling, and can return multiple values.",
      syntax: "VLOOKUP: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\nXLOOKUP: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
      example: "VLOOKUP: =VLOOKUP(E2, A2:C100, 3, FALSE)\nXLOOKUP: =XLOOKUP(E2, A2:A100, C2:C100, \"Not Found\")",
      useCase: "Finding employee salary by ID, product price by name, or customer details by email.",
      sampleAnswer: "VLOOKUP can only search from left to right and depends on column numbers. XLOOKUP is more flexible because it supports both directions, built-in error handling, and remains stable when columns change.",
      category: "Lookup Functions",
      difficulty: "Advanced",
      frequency: "95%",
      tip: "Always use XLOOKUP if available. For backward compatibility, use INDEX-MATCH.",
      roles: ["Financial Analyst", "FP&A", "Data Analyst"]
    },
    {
      id: 2,
      question: "How do you use INDEX-MATCH instead of VLOOKUP?",
      shortAnswer: "INDEX-MATCH combines INDEX and MATCH functions to create a more flexible lookup that can search left or right.",
      answer: "INDEX returns a value from a specific position in a range. MATCH finds the position of a value in a range. Together, they create a lookup that can search in any direction, doesn't break when columns change, and is faster on large datasets.",
      syntax: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
      example: "=INDEX(B2:B100, MATCH(E2, A2:A100, 0))",
      useCase: "Finding product name by ID, flexible dashboards, large datasets.",
      sampleAnswer: "INDEX-MATCH is more versatile than VLOOKUP because MATCH finds the position and INDEX returns the value. This allows lookups to the left and doesn't break when columns are inserted.",
      category: "Lookup Functions",
      difficulty: "Advanced",
      frequency: "85%",
      tip: "MATCH with 0 for exact match is most common.",
      roles: ["Financial Analyst", "Investment Banking", "Data Analyst"]
    },
    // Financial Functions (6 questions)
    {
      id: 3,
      question: "How do you calculate NPV (Net Present Value) in Excel?",
      shortAnswer: "Use NPV function: =NPV(rate, value1, value2, ...). For irregular cash flows, use XNPV with dates.",
      answer: "NPV calculates the present value of future cash flows given a discount rate. It's used for investment evaluation and capital budgeting.",
      syntax: "NPV: =NPV(discount_rate, cashflow1, cashflow2, ...) + initial_investment\nXNPV: =XNPV(discount_rate, values, dates)",
      example: "=NPV(10%, 10000, 15000, 20000) - 30000",
      useCase: "Project evaluation, investment analysis, capital budgeting decisions.",
      sampleAnswer: "NPV is essential for capital budgeting. A positive NPV indicates the project adds value.",
      category: "Financial Functions",
      difficulty: "Advanced",
      frequency: "75%",
      tip: "Exclude initial investment from NPV function - add separately.",
      roles: ["Financial Analyst", "Investment Banking", "FP&A"]
    },
    {
      id: 4,
      question: "How do you calculate IRR (Internal Rate of Return) in Excel?",
      shortAnswer: "Use IRR function: =IRR(values, [guess]). For irregular cash flows, use XIRR.",
      answer: "IRR finds the discount rate where NPV equals zero. It represents the expected annual return of an investment.",
      syntax: "IRR: =IRR(cashflow_range, [guess])\nXIRR: =XIRR(values, dates, [guess])",
      example: "=IRR(A1:A5) where A1=-30000, A2=10000, A3=15000, A4=20000, A5=5000",
      useCase: "Investment return analysis, project evaluation, comparing investment opportunities.",
      sampleAnswer: "IRR calculates the annual return on an investment. I use it alongside NPV.",
      category: "Financial Functions",
      difficulty: "Advanced",
      frequency: "70%",
      tip: "Provide a guess value (0.1) for unconventional cash flows.",
      roles: ["Financial Analyst", "Investment Banking", "FP&A"]
    },
    {
      id: 5,
      question: "What is the difference between IRR and XIRR?",
      shortAnswer: "IRR assumes regular periodic cash flows. XIRR handles irregular cash flows with specific dates.",
      answer: "IRR assumes cash flows at regular intervals. XIRR allows exact dates, making it more accurate for real-world scenarios.",
      syntax: "IRR: =IRR(values)\nXIRR: =XIRR(values, dates, [guess])",
      example: "IRR assumes Jan 1, Feb 1. XIRR uses actual dates: Jan 15, Feb 20.",
      useCase: "Private equity returns, real estate investments, project finance.",
      sampleAnswer: "IRR assumes equal spacing between cash flows, while XIRR accounts for actual dates.",
      category: "Financial Functions",
      difficulty: "Advanced",
      frequency: "60%",
      tip: "Always use XIRR for real-world data.",
      roles: ["Investment Banking", "Private Equity", "Financial Analyst"]
    },
    {
      id: 6,
      question: "How do you calculate PMT (Loan Payment) in Excel?",
      shortAnswer: "Use PMT function: =PMT(rate, nper, pv, [fv], [type]) to calculate loan payments.",
      answer: "PMT calculates the periodic payment for a loan. Rate must match payment period.",
      syntax: "=PMT(rate, nper, pv, [fv], [type])",
      example: "Mortgage: =PMT(5%/12, 30*12, 500000) returns $2,684 monthly payment",
      useCase: "Mortgage calculations, loan amortization, lease vs buy analysis.",
      sampleAnswer: "For a $500,000 mortgage at 5% over 30 years, =PMT(5%/12, 360, -500000) calculates the monthly payment.",
      category: "Financial Functions",
      difficulty: "Intermediate",
      frequency: "65%",
      tip: "Be consistent with sign convention.",
      roles: ["Financial Analyst", "Banking", "FP&A"]
    },
    {
      id: 7,
      question: "How do you calculate FV (Future Value) in Excel?",
      shortAnswer: "Use FV function: =FV(rate, nper, pmt, [pv], [type]) for investment future value.",
      answer: "FV returns future value of an investment based on periodic constant payments and interest rate.",
      syntax: "=FV(rate, nper, pmt, [pv], [type])",
      example: "=FV(8%, 30, -10000, -100000) calculates retirement savings",
      useCase: "Retirement planning, savings goals, investment growth projections.",
      sampleAnswer: "FV helps answer 'what will my savings be worth?'",
      category: "Financial Functions",
      difficulty: "Intermediate",
      frequency: "60%",
      tip: "Use negative values for payments to get positive results.",
      roles: ["Financial Planner", "Wealth Management", "FP&A"]
    },
    {
      id: 8,
      question: "How do you calculate PV (Present Value) in Excel?",
      shortAnswer: "Use PV function: =PV(rate, nper, pmt, [fv], [type]) for present value.",
      answer: "PV returns the present value of a future sum or series of payments - foundation of DCF analysis.",
      syntax: "=PV(rate, nper, pmt, [fv], [type])",
      example: "=PV(8%, 10, 0, -100000) shows $46,319 today for $100k in 10 years",
      useCase: "Bond valuation, lump sum valuation, comparing payment options.",
      sampleAnswer: "PV tells you what future money is worth today.",
      category: "Financial Functions",
      difficulty: "Intermediate",
      frequency: "55%",
      tip: "PV is the inverse of FV.",
      roles: ["Financial Analyst", "Investment Banking", "Treasury"]
    },
    // What-If Analysis (3 questions)
    {
      id: 9,
      question: "What is Goal Seek and when would you use it?",
      shortAnswer: "Goal Seek finds input value needed to achieve a desired result. Use for break-even analysis.",
      answer: "Goal Seek works backwards - set a target result, Excel finds the input value.",
      syntax: "Data → What-If Analysis → Goal Seek → Set cell → To value → By changing cell",
      example: "What sales volume achieves $100,000 profit? Goal Seek finds the volume.",
      useCase: "Break-even analysis, finding required interest rates, target sales volumes.",
      sampleAnswer: "Goal Seek is great for break-even analysis. For example, I can find how many units we need to sell to hit a specific profit target.",
      category: "What-If Analysis",
      difficulty: "Intermediate",
      frequency: "50%",
      tip: "Works best with simple formulas. For multiple variables, use Solver.",
      roles: ["Financial Analyst", "FP&A"]
    },
    {
      id: 10,
      question: "What is Solver and how is it different from Goal Seek?",
      shortAnswer: "Solver handles multiple variables and constraints. Goal Seek only handles one variable.",
      answer: "Solver is an add-in for complex optimization. It can change multiple cells, apply constraints, and find optimal solutions.",
      syntax: "Data → Solver → Set Objective → To: Max/Min/Value → Changing Cells → Constraints → Solve",
      example: "Maximize profit by changing production quantities with resource constraints",
      useCase: "Resource allocation, portfolio optimization, production planning.",
      sampleAnswer: "While Goal Seek handles one variable, Solver handles multiple variables with constraints.",
      category: "What-If Analysis",
      difficulty: "Advanced",
      frequency: "35%",
      tip: "Enable Solver in File → Options → Add-ins → Solver Add-in.",
      roles: ["Financial Analyst", "Supply Chain", "Operations"]
    },
    {
      id: 11,
      question: "What is Data Table for sensitivity analysis?",
      shortAnswer: "Data Table shows how changing one or two variables affects formula results.",
      answer: "One-variable Data Table varies one input; two-variable varies two inputs simultaneously.",
      syntax: "Set up inputs → Data → What-If Analysis → Data Table",
      example: "Vary discount rate from 5% to 15% to see impact on NPV",
      useCase: "DCF sensitivity analysis, break-even analysis, valuation ranges.",
      sampleAnswer: "Data Tables show how outputs change when inputs vary. For valuations, I show NPV sensitivity to discount rate and growth rate.",
      category: "What-If Analysis",
      difficulty: "Intermediate",
      frequency: "50%",
      tip: "Data Tables are volatile - they recalculate frequently.",
      roles: ["Financial Analyst", "Investment Banking", "FP&A"]
    },
    // Pivot Tables (1 question)
    {
      id: 12,
      question: "Explain Pivot Tables and their most useful features.",
      shortAnswer: "Pivot Tables summarize large datasets without formulas. Key features: slicers, calculated fields, grouping.",
      answer: "Pivot Tables quickly summarize, sort, group, and total large datasets. Features include Slicers for filtering, calculated fields for custom formulas.",
      syntax: "Select data → Insert → PivotTable → Choose fields",
      example: "50,000 sales records → Pivot Table shows totals by region in seconds",
      useCase: "Sales analysis, expense tracking, financial reporting, dashboards.",
      sampleAnswer: "Pivot Tables are essential for financial analysis. I use them to summarize large datasets and create dynamic reports with slicers.",
      category: "Pivot Tables",
      difficulty: "Intermediate",
      frequency: "90%",
      tip: "Convert source data to Table (Ctrl+T) before creating Pivot Tables.",
      roles: ["Financial Analyst", "FP&A", "Accounting", "Business Analyst"]
    },
    // Formulas (3 questions)
    {
      id: 13,
      question: "What is the difference between SUMIF, SUMIFS, and SUMPRODUCT?",
      shortAnswer: "SUMIF: one condition. SUMIFS: multiple AND conditions. SUMPRODUCT: AND/OR conditions and array operations.",
      answer: "SUMIF handles one condition. SUMIFS handles multiple AND conditions. SUMPRODUCT handles AND/OR logic and array operations.",
      syntax: "SUMIFS: =SUMIFS(sum_range, criteria_range1, criteria1, ...)\nSUMPRODUCT: =SUMPRODUCT((condition1)*(condition2), sum_range)",
      example: "=SUMIFS(Transactions[Amount], Transactions[Region], \"North\")",
      useCase: "SUMIFS for most conditional sums. SUMPRODUCT for OR conditions.",
      sampleAnswer: "SUMIFS is my default for conditional summing. For OR logic, I use SUMPRODUCT.",
      category: "Formulas",
      difficulty: "Advanced",
      frequency: "80%",
      tip: "Use SUMPRODUCT for OR conditions.",
      roles: ["Financial Analyst", "FP&A", "Data Analyst"]
    },
    {
      id: 14,
      question: "What are Absolute and Relative Cell References?",
      shortAnswer: "Relative (A1) changes when copied. Absolute ($A$1) stays fixed. Mixed locks row or column. Press F4 to toggle.",
      answer: "Relative references adjust when copied. Absolute references stay constant using $. Mixed lock row or column.",
      syntax: "A1 (relative) - changes\n$A$1 (absolute) - never changes\nA$1 (row locked)\n$A1 (column locked)",
      example: "=B2 dragged down becomes B3. With =$B$2, stays B2.",
      useCase: "Absolute for tax rates. Mixed for multiplication tables.",
      sampleAnswer: "I use absolute references ($A$1) for constants like tax rates, relative for values that change per row.",
      category: "Formulas Basics",
      difficulty: "Beginner",
      frequency: "100%",
      tip: "Select cell reference and press F4 to cycle through types.",
      roles: ["All Finance Roles"]
    },
    {
      id: 15,
      question: "How do you calculate CAGR in Excel?",
      shortAnswer: "CAGR formula: =(End/Start)^(1/Years)-1 or use RRI function.",
      answer: "CAGR measures mean annual growth rate over a period, smoothing volatility.",
      syntax: "=((End/Start)^(1/Years))-1\n=RRI(Years, Start, End)",
      example: "$100M to $200M over 5 years: CAGR = 14.87%",
      useCase: "Revenue growth analysis, investment returns, business performance.",
      sampleAnswer: "CAGR gives smoothed annual growth. For $100M to $200M in 5 years, CAGR is about 14.9%.",
      category: "Financial Analysis",
      difficulty: "Intermediate",
      frequency: "60%",
      tip: "Use RRI for simpler syntax: =RRI(5,100,200)",
      roles: ["Financial Analyst", "FP&A", "Investment Banking"]
    },
    // Power Query (2 questions)
    {
      id: 16,
      question: "What is Power Query and why is it important?",
      shortAnswer: "Power Query is Excel's ETL tool for data cleaning, transformation, and automation.",
      answer: "Power Query connects to data sources, transforms data visually, and loads results. Every transformation is recorded and refreshable.",
      syntax: "Data → Get Data → Launch Power Query Editor",
      example: "Combine 12 monthly sales files with one refresh",
      useCase: "Monthly reporting automation, combining files, cleaning ERP data.",
      sampleAnswer: "Power Query has saved me hundreds of hours. I combine 12 monthly files with one click.",
      category: "Power Query",
      difficulty: "Advanced",
      frequency: "75%",
      tip: "Learning Power Query takes 2-3 hours and saves hundreds of hours.",
      roles: ["Data Analyst", "Financial Analyst", "BI"]
    },
    {
      id: 17,
      question: "What is the difference between Merge and Append in Power Query?",
      shortAnswer: "Append stacks rows vertically. Merge joins columns horizontally based on matching keys.",
      answer: "Append is like UNION in SQL - adds rows. Merge is like JOIN - adds columns based on matching values.",
      syntax: "Append: Home → Append Queries\nMerge: Home → Merge Queries",
      example: "Append: Combine Jan, Feb, Mar sales files. Merge: Add customer names to sales using CustomerID.",
      useCase: "Append for monthly file consolidation; Merge for adding lookup data.",
      sampleAnswer: "Append combines data vertically - adding rows. Merge combines horizontally - adding columns.",
      category: "Power Query",
      difficulty: "Intermediate",
      frequency: "60%",
      tip: "Use Merge with Left Outer join for most lookups.",
      roles: ["Data Analyst", "Financial Analyst"]
    },
    // Data Management (2 questions)
    {
      id: 18,
      question: "What are Excel Tables (Ctrl+T) and their benefits?",
      shortAnswer: "Excel Tables convert ranges into structured tables with automatic expansion and named references.",
      answer: "Benefits: Formulas use column names, tables auto-expand, formulas copy down, consistent formatting.",
      syntax: "Select data → Ctrl+T → Create Table",
      example: "=SUM(SalesData[Amount]) instead of =SUM(C2:C1000)",
      useCase: "Any dataset that grows over time.",
      sampleAnswer: "Excel Tables are essential for dynamic data. When I add new rows, formulas update automatically.",
      category: "Data Management",
      difficulty: "Intermediate",
      frequency: "80%",
      tip: "Always convert to Table before creating Pivot Tables.",
      roles: ["All Finance Roles"]
    },
    {
      id: 19,
      question: "How do you remove duplicates in Excel?",
      shortAnswer: "Four methods: Remove Duplicates, Conditional Formatting, UNIQUE function, or Power Query.",
      answer: "Method 1: Remove Duplicates (fastest). Method 2: Conditional Formatting. Method 3: =UNIQUE(range). Method 4: Power Query.",
      syntax: "=UNIQUE(array, [by_col], [exactly_once])",
      example: '=UNIQUE(A1:C1000) returns unique rows',
      useCase: "Cleaning customer lists, removing duplicate transactions.",
      sampleAnswer: "I use Remove Duplicates for one-time cleanup, UNIQUE for dynamic lists.",
      category: "Data Cleaning",
      difficulty: "Intermediate",
      frequency: "90%",
      tip: "Always make a copy before removing duplicates permanently.",
      roles: ["Financial Analyst", "Data Analyst", "Accounting"]
    },
    // Dynamic Arrays (3 questions)
    {
      id: 20,
      question: "How do you use FILTER function for dynamic arrays?",
      shortAnswer: "FILTER returns multiple results that automatically spill into adjacent cells.",
      answer: "FILTER filters a range based on conditions and returns matching rows. Results spill automatically.",
      syntax: "=FILTER(array, include, [if_empty])",
      example: '=FILTER(A1:C100, B1:B100="Active", "No results")',
      useCase: "Creating live dashboards, extracting data subsets.",
      sampleAnswer: "FILTER is a game-changer for dashboards. I use =FILTER(SalesData, SalesData[Amount]>10000).",
      category: "Dynamic Arrays",
      difficulty: "Advanced",
      frequency: "70%",
      tip: "Combine FILTER with SORT and UNIQUE.",
      roles: ["Data Analyst", "Financial Analyst"]
    },
    {
      id: 21,
      question: "What is the UNIQUE function and how do you use it?",
      shortAnswer: "UNIQUE returns a list of unique values from a range or array.",
      answer: "UNIQUE extracts distinct values from a list. Results are dynamic - updates automatically.",
      syntax: "=UNIQUE(array, [by_col], [exactly_once])",
      example: '=UNIQUE(A1:A100) returns all unique values',
      useCase: "Creating dynamic drop-down lists, getting distinct customer lists.",
      sampleAnswer: "I use UNIQUE with SORT to create dynamic lists: =SORT(UNIQUE(Transactions[Customer])).",
      category: "Dynamic Arrays",
      difficulty: "Intermediate",
      frequency: "65%",
      tip: "Use UNIQUE with SORT: =SORT(UNIQUE(A1:A100))",
      roles: ["Data Analyst", "Financial Analyst"]
    },
    {
      id: 22,
      question: "What are SORT and SORTBY functions?",
      shortAnswer: "SORT sorts by one column. SORTBY sorts by multiple columns or custom orders.",
      answer: "SORT sorts a range by one column. SORTBY sorts by multiple columns or by values not in the array.",
      syntax: "SORT: =SORT(array, [sort_index], [sort_order])\nSORTBY: =SORTBY(array, by_array1, [sort_order1], ...)",
      example: '=SORT(Transactions, 3, -1)\n=SORTBY(Transactions, Transactions[Region], 1, Transactions[Amount], -1)',
      useCase: "Creating sorted reports automatically, sorting dashboards.",
      sampleAnswer: "I use SORT for single-column sorts and SORTBY for multi-level sorting.",
      category: "Dynamic Arrays",
      difficulty: "Intermediate",
      frequency: "60%",
      tip: "Use SORTBY for multiple sort levels.",
      roles: ["Data Analyst", "Financial Analyst"]
    },
    // Dashboards (2 questions)
    {
      id: 23,
      question: "How do you create an interactive dashboard in Excel?",
      shortAnswer: "Combine Pivot Tables, Pivot Charts, slicers, and KPI cards on a single sheet.",
      answer: "Dashboards include Pivot Tables for data, Pivot Charts for visualization, slicers for interactivity.",
      syntax: "Insert → PivotChart → Add Slicers → Arrange → Hide gridlines",
      example: "Sales dashboard with total sales KPI, sales by region chart, and monthly slicer",
      useCase: "Executive reporting, sales tracking, financial KPIs.",
      sampleAnswer: "I build dashboards with Pivot Tables and charts, slicers for interactivity, and KPIs at the top.",
      category: "Dashboards",
      difficulty: "Advanced",
      frequency: "70%",
      tip: "Use Camera Tool for snapshots that update automatically.",
      roles: ["Financial Analyst", "FP&A", "Business Analyst"]
    },
    {
      id: 24,
      question: "What are the best charts for financial data visualization?",
      shortAnswer: "Line for trends, column for comparisons, combo for different units, waterfall for P&L bridge.",
      answer: "Line charts for trends. Column/Bar for comparing categories. Combo for different units. Waterfall for P&L bridge.",
      syntax: "Insert → Charts → Choose type based on data",
      example: "Waterfall shows revenue → minus COGS → gross margin → minus expenses → net profit",
      useCase: "Monthly financial reporting, budget variance, KPI tracking.",
      sampleAnswer: "Line charts for trends, column charts for comparisons, waterfall for P&L bridges.",
      category: "Dashboards",
      difficulty: "Intermediate",
      frequency: "75%",
      tip: "Avoid 3D charts - they distort perception.",
      roles: ["Financial Analyst", "FP&A", "Business Analyst"]
    },
    // Conditional Formatting (1 question)
    {
      id: 25,
      question: "What is Conditional Formatting and its advanced uses?",
      shortAnswer: "Conditional Formatting applies formatting based on cell values. Advanced: color scales, icon sets, formula rules.",
      answer: "Beyond basic highlighting, use formulas to format entire rows, highlight duplicates, create data bars.",
      syntax: "Home → Conditional Formatting → New Rule → Use formula",
      example: '=AND($A1<>"", $B1>1000) highlights entire row when B1>1000',
      useCase: "Financial dashboards (red for negative, green for positive), project tracking.",
      sampleAnswer: "I use formula-based rules to highlight entire rows when variance exceeds thresholds.",
      category: "Data Analysis",
      difficulty: "Intermediate",
      frequency: "85%",
      tip: "Use =ISFORMULA() to identify formula cells.",
      roles: ["Financial Analyst", "FP&A", "Accounting"]
    },
    // Data Validation (1 question)
    {
      id: 26,
      question: "How do you create a Dependent Drop-Down List?",
      shortAnswer: "Use Data Validation with INDIRECT function referencing named ranges.",
      answer: "Step 1: Create named ranges. Step 2: First drop-down using Data Validation → List. Step 3: Second drop-down =INDIRECT(reference).",
      syntax: "=INDIRECT(A1) where A1 contains category name",
      example: "Select 'Fruits' → second list shows Apple, Banana. Select 'Vegetables' → Carrot, Broccoli",
      useCase: "Country-State selection, Category-Subcategory selection.",
      sampleAnswer: "Dependent drop-downs improve data entry accuracy. I create named ranges, then use INDIRECT.",
      category: "Data Validation",
      difficulty: "Advanced",
      frequency: "60%",
      tip: "Named ranges cannot contain spaces. Use underscores.",
      roles: ["Financial Analyst", "Business Analyst"]
    },
    // Financial Modeling (2 questions)
    {
      id: 27,
      question: "How do you build a financial model in Excel?",
      shortAnswer: "Separate inputs, calculations, and outputs. Use color coding and include error checks.",
      answer: "Good model has: Inputs sheet (blue), Calculations sheet (black), Outputs sheet (green). Include error checks.",
      syntax: "Color coding: Blue=Inputs, Black=Formulas, Green=Links, Red=Error checks",
      example: "3-statement model: Income Statement, Balance Sheet, Cash Flow Statement linked",
      useCase: "Business valuation, budgeting, M&A analysis, project finance.",
      sampleAnswer: "I build models with clear separation: Inputs tab (blue), Calculation tabs (black), Output tabs (green).",
      category: "Financial Modeling",
      difficulty: "Advanced",
      frequency: "60%",
      tip: "Start simple and add complexity gradually.",
      roles: ["Financial Analyst", "Investment Banking", "FP&A"]
    },
    {
      id: 28,
      question: "What is scenario analysis and how do you perform it?",
      shortAnswer: "Scenario analysis compares different input sets. Use Scenario Manager or data tables.",
      answer: "Scenario analysis evaluates how input changes affect outputs. Scenario Manager saves different sets.",
      syntax: "Data → What-If Analysis → Scenario Manager → Add scenarios",
      example: "Best Case: Revenue+20%, Cost-10%; Worst Case: Revenue-15%, Cost+15%",
      useCase: "Budgeting with optimistic/pessimistic scenarios, investment analysis.",
      sampleAnswer: "I use Scenario Manager to save different assumption sets - Best, Base, and Worst Case.",
      category: "Financial Modeling",
      difficulty: "Advanced",
      frequency: "55%",
      tip: "Combine Scenario Manager with Pivot Tables for powerful summaries.",
      roles: ["Financial Analyst", "FP&A", "Investment Banking"]
    }
  ];

  // Beginner Excel Concepts (New Questions)
  const beginnerQuestions = [
    {
      id: 29,
      question: "What is Excel and what are its primary uses in finance?",
      shortAnswer: "Excel is a spreadsheet application used for data analysis, financial modeling, reporting, and calculations in finance.",
      answer: "Excel is Microsoft's spreadsheet software. In finance, it's used for budgeting, forecasting, financial modeling, data analysis, reporting, and creating dashboards. It's the most essential tool for finance professionals.",
      syntax: "Basic Excel structure: Workbooks contain Worksheets, which contain Cells organized in Rows and Columns",
      example: "Creating a budget spreadsheet, analyzing financial statements, building investment models",
      useCase: "Financial analysis, accounting, investment banking, FP&A, and corporate finance",
      sampleAnswer: "Excel is the foundation of financial analysis. I use it daily for everything from simple calculations to complex financial models.",
      category: "Excel Basics",
      difficulty: "Beginner",
      frequency: "100%",
      tip: "Master keyboard shortcuts to dramatically increase your speed in Excel.",
      roles: ["All Finance Roles"]
    },
    {
      id: 30,
      question: "What are the key differences between a Worksheet and a Workbook?",
      shortAnswer: "A Workbook is an Excel file containing multiple Worksheets. Worksheets are individual pages within a Workbook.",
      answer: "Workbook = Excel file (.xlsx). Worksheet = individual tab/sheet within that file. One workbook can contain many worksheets for organizing related data.",
      syntax: "Ctrl+Page Up/Page Down to navigate between worksheets\nRight-click tabs to add, rename, or move worksheets",
      example: "Financial model workbook with sheets: Inputs, Calculations, Outputs, Charts, and Summary",
      useCase: "Organizing financial models, separating inputs from calculations, creating multi-sheet reports.",
      sampleAnswer: "A workbook is the entire Excel file, while worksheets are the individual tabs. I organize my models with separate sheets for assumptions, calculations, and outputs.",
      category: "Excel Basics",
      difficulty: "Beginner",
      frequency: "80%",
      tip: "Use consistent naming conventions for worksheets to make navigation easier.",
      roles: ["All Finance Roles"]
    },
    {
      id: 31,
      question: "What is Data Cleaning and why is it important?",
      shortAnswer: "Data cleaning is the process of fixing or removing incorrect, corrupted, or duplicate data before analysis.",
      answer: "Data cleaning ensures data quality and accuracy. Common tasks: removing duplicates, handling missing values, standardizing formats, fixing typos, and validating data types.",
      syntax: "Data cleaning tools: Remove Duplicates, Text to Columns, TRIM, CLEAN, Find & Replace, Power Query",
      example: "Cleaning customer data: remove duplicates, fix inconsistent date formats, trim extra spaces, fill missing values",
      useCase: "Preparing raw data for analysis, ensuring reporting accuracy, improving data quality.",
      sampleAnswer: "Data cleaning is critical because analysis is only as good as the data. I use Power Query and Excel functions like TRIM and CLEAN to prepare data before any financial analysis.",
      category: "Data Cleaning",
      difficulty: "Beginner",
      frequency: "85%",
      tip: "Always make a copy of raw data before cleaning - never work on original files directly.",
      roles: ["All Finance Roles"]
    },
    {
      id: 32,
      question: "What are the benefits of using Excel Tables (Ctrl+T)?",
      shortAnswer: "Excel Tables automatically expand with new data, use named references, and make formulas easier to read.",
      answer: "Benefits: automatic expansion when adding rows/columns, structured references using column names, consistent formatting, built-in filtering, and formulas that copy down automatically.",
      syntax: "Select data → Ctrl+T → Create Table\nReference: =SUM(Table1[Amount])",
      example: "=SUM(SalesData[Revenue]) instead of =SUM(C2:C1000) - much clearer and automatically expands",
      useCase: "Any dataset that grows over time, dynamic ranges for Pivot Tables, collaborative workbooks.",
      sampleAnswer: "Excel Tables are essential for dynamic data. When I add new rows, formulas and Pivot Tables update automatically without manual range adjustments.",
      category: "Data Management",
      difficulty: "Beginner",
      frequency: "80%",
      tip: "Always convert ranges to Tables before creating Pivot Tables - they automatically include new data.",
      roles: ["All Finance Roles"]
    }
  ];

  // Combine all questions
  const allQuestions = [...interviewQuestions, ...beginnerQuestions];

  const categories = ["All", "Excel Basics", "Lookup Functions", "Financial Functions", "What-If Analysis", "Pivot Tables", "Formulas", "Power Query", "Data Management", "Dynamic Arrays", "Dashboards", "Financial Modeling"];
  const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];
  const roleOptions = ["All", "Financial Analyst", "FP&A", "Investment Banking", "Data Analyst", "Accounting", "Business Analyst"];

  const mockQuestionsList = [
    { q: "What's the difference between VLOOKUP and XLOOKUP?", a: "XLOOKUP can search left or right, has built-in error handling, and doesn't require column index numbers." },
    { q: "How do you calculate NPV in Excel?", a: "Use =NPV(rate, future_cashflows) + initial_investment. For irregular timing, use XNPV." },
    { q: "What formula would you use to find total sales for 'Product A'?", a: "Use SUMIFS: =SUMIFS(SalesAmount, ProductRange, 'Product A')" },
    { q: "How do you calculate a loan payment in Excel?", a: "Use PMT: =PMT(rate/12, nper*12, loan_amount)" },
    { q: "What is Goal Seek used for?", a: "Goal Seek finds the input needed to achieve a desired result. Great for break-even analysis." },
    { q: "How do you combine multiple Excel files?", a: "Use Power Query → Get Data → From Folder. It automatically combines all files with the same structure." }
  ];

  // Cheat Sheet with single icon per block
  const cheatSheetCategories = [
    {
      title: "Lookup Functions",
      icon: Search,
      functions: ["XLOOKUP", "INDEX-MATCH", "VLOOKUP", "HLOOKUP", "XMATCH"]
    },
    {
      title: "Financial Functions",
      icon: DollarSign,
      functions: ["NPV", "IRR", "XIRR", "XNPV", "PMT", "FV", "PV", "RRI"]
    },
    {
      title: "Data Analysis",
      icon: BarChart3,
      functions: ["SUMIFS", "COUNTIFS", "AVERAGEIFS", "SUMPRODUCT", "IFS"]
    },
    {
      title: "Dynamic Arrays",
      icon: Sparkles,
      functions: ["FILTER", "UNIQUE", "SORT", "SORTBY", "SEQUENCE"]
    },
    {
      title: "Power Query",
      icon: Database,
      functions: ["Merge", "Append", "Unpivot", "Group By", "Conditional Column"]
    },
    {
      title: "What-If Analysis",
      icon: Target,
      functions: ["Goal Seek", "Data Table", "Scenario Manager", "Solver"]
    }
  ];

  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: number) => {
    if (bookmarkedQuestions.includes(id)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter(i => i !== id));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, id]);
    }
  };

  const toggleComplete = (id: number) => {
    if (completedQuestions.includes(id)) {
      setCompletedQuestions(completedQuestions.filter(i => i !== id));
    } else {
      setCompletedQuestions([...completedQuestions, id]);
    }
  };

  const scrollToQuestion = (id: number) => {
    const element = document.getElementById(`question-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toggleAnswer(id);
    }
  };

  const filteredQuestions = allQuestions.filter(q => {
    if (activeCategory !== "All" && q.category !== activeCategory) return false;
    if (difficultyFilter !== "All" && q.difficulty !== difficultyFilter) return false;
    if (roleFilter !== "All" && !q.roles.includes(roleFilter)) return false;
    if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !q.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sharePage = async (platform: string) => {
    if (platform === "copy") {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
    setShowShareOptions(false);
  };

  const playAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(`Welcome to Advanced Excel Interview Questions. This guide covers ${allQuestions.length} frequently asked questions including lookup functions, financial functions, what-if analysis, Power Query, dynamic arrays, and dashboards.`);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const submitFeedback = () => {
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowFeedback(false);
        setFeedbackText("");
        setFeedbackSubmitted(false);
      }, 2000);
    }
  };

  const progressPercentage = Math.round((completedQuestions.length / allQuestions.length) * 100);
  const topQuestions = allQuestions.slice(0, 10);

  return (
    <>
      <Head>
        <title>Advanced Excel Interview Questions | 30+ Questions with Answers | Finlysta</title>
        <meta name="description" content="Master Excel interviews with 30+ frequently asked questions including VLOOKUP, XLOOKUP, NPV, IRR, PMT, Goal Seek, Solver, Power Query, Pivot Tables, and more. Detailed answers with syntax and examples." />
        <meta name="keywords" content="excel interview questions, vlookup, xlookup, pivot tables, power query, npv, irr, pmt, goal seek, solver, data table, financial functions, excel interview preparation" />
        <meta name="author" content="Finlysta" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://finlysta.com/interview-prep/advanced-excel-interview-questions" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        
        {/* Mock Interview Modal */}
        {showMockInterview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-scaleIn">
              <div className="flex justify-between items-center p-5 border-b border-slate-200 sticky top-0 bg-white">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Mic size={20} className="text-purple-600" />Mock Interview</h3>
                <button onClick={() => setShowMockInterview(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-5">
                {mockQuestionIndex < mockQuestionsList.length ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">Question {mockQuestionIndex + 1} of {mockQuestionsList.length}</span>
                        <button onClick={() => setShowMockAnswer(!showMockAnswer)} className="text-sm text-purple-600 hover:underline">{showMockAnswer ? "Hide Answer" : "Show Answer"}</button>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{mockQuestionsList[mockQuestionIndex].q}</p>
                      {showMockAnswer && <div className="mt-3 p-4 bg-purple-50 rounded-xl"><p className="text-sm text-slate-700 leading-relaxed">{mockQuestionsList[mockQuestionIndex].a}</p></div>}
                    </div>
                    <div className="flex justify-between gap-3 mt-6">
                      <button onClick={() => { setMockQuestionIndex(Math.max(0, mockQuestionIndex - 1)); setShowMockAnswer(false); }} disabled={mockQuestionIndex === 0} className="px-5 py-2.5 border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50">Previous</button>
                      <button onClick={() => { if (mockQuestionIndex + 1 < mockQuestionsList.length) { setMockQuestionIndex(mockQuestionIndex + 1); setShowMockAnswer(false); } }} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105">Next Question</button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><Award size={40} className="text-amber-600" /></div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Complete! 🎉</h4>
                    <p className="text-slate-500 mb-5">Great job practicing! You're ready for the real interview.</p>
                    <button onClick={() => { setMockQuestionIndex(0); setShowMockAnswer(false); }} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105">Start Over</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scaleIn">
              <div className="flex justify-between items-center p-5 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><MessageCircle size={20} className="text-blue-600" />Send Feedback</h3>
                <button onClick={() => setShowFeedback(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-5">
                {feedbackSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                    <p className="text-slate-700">Thank you for your feedback!</p>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Share your feedback, suggestions, or report issues..."
                      className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[120px]"
                    />
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setShowFeedback(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                      <button onClick={submitFeedback} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Submit Feedback</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Top Header Buttons */}
        <div className="border-b border-slate-100 sticky top-0 z-20 bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-slate-500 hover:text-slate-800 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <Link href="/interview-prep" className="text-slate-500 hover:text-slate-800 transition-colors">Interview Prep</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-slate-800 font-medium">Advanced Excel Interview Questions</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={() => setShowShareOptions(!showShareOptions)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
                  <Share2 size={18} className="text-gray-700" />
                </button>
                {showShareOptions && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-1 min-w-[140px] border border-slate-200 animate-fadeIn z-30">
                    <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 mb-1">
                      <span className="text-sm font-semibold text-slate-500">Share via</span>
                      <button onClick={() => setShowShareOptions(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X size={14} className="text-slate-400" /></button>
                    </div>
                    <button onClick={() => sharePage("copy")} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                      {copiedLink ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}
                      <span className="text-sm text-slate-700">{copiedLink ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                )}

                <button onClick={() => setShowFeedback(true)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
                  <MessageCircle size={18} className="text-gray-700" />
                </button>

                <button onClick={() => { if (audioMode) { stopAudio(); setAudioMode(false); } else { setAudioMode(true); playAudio(); } }} className={`p-2 rounded-lg transition-all ${audioMode ? "bg-green-100" : "bg-gray-100"} hover:bg-gray-200`}>
                  <Volume2 size={18} className={audioMode ? "text-green-700" : "text-gray-700"} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Mode Banner */}
        {audioMode && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[99999] bg-white rounded-2xl shadow-2xl p-4 min-w-[300px] border border-slate-100 animate-slideUp">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Volume2 size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Now Playing</p>
                  <p className="text-sm font-semibold text-slate-800">Excel Interview Guide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={playAudio} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition">
                  <Play size={14} className="text-slate-700" />
                </button>
                <button onClick={stopAudio} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition">
                  <Pause size={14} className="text-slate-700" />
                </button>
                <button onClick={() => { stopAudio(); setAudioMode(false); }} className="text-xs text-slate-400 hover:text-slate-600 ml-2">Exit</button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden py-16 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">Most Asked in Finance Interviews</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-5 leading-tight">
              Advanced Excel <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Interview Questions</span>
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Master {allQuestions.length}+ frequently asked Excel interview questions including lookup functions, financial functions (NPV, IRR, PMT), What-If Analysis, Pivot Tables, Power Query, and Dashboards.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search questions... (VLOOKUP, NPV, IRR, PMT, Goal Seek, Power Query)" 
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm" 
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600">{allQuestions.length}+ Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Financial Functions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Sample Answers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Pro Tips</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Covered Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              <BookOpen size={14} /> Topics Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Excel Basics", "Lookup Functions", "Financial Functions", "What-If Analysis", "Pivot Tables", "Power Query", "Dynamic Arrays", "Dashboards", "Financial Modeling"].map(topic => (
                <button
                  key={topic}
                  onClick={() => setActiveCategory(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeCategory === topic
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Excel Interview Cheat Sheet - Single Icon per Block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList size={22} className="text-blue-600" />
              <h3 className="text-xl font-bold text-slate-800">Excel Interview Cheat Sheet</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Memorize these functions before your finance interview — categorized by topic:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cheatSheetCategories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={18} className="text-blue-600" />
                      <h4 className="font-semibold text-slate-800">{category.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.functions.map(func => (
                        <span key={func} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-mono">{func}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Tip Banner */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <Lightbulb size={18} className="text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">💡 Interview Tip</p>
                  <p className="text-sm text-amber-700 mt-1">Recruiters don't just want syntax — they want to know <strong>when</strong> to use each function and <strong>why</strong>. Focus on business use cases and real-world applications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clickable Role Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-lg transition cursor-pointer" onClick={() => setRoleFilter("Financial Analyst")}>
              <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2"><Briefcase size={16} /> Financial Analyst</h4>
              <div className="flex flex-wrap gap-1">
                {["XLOOKUP", "Pivot Tables", "SUMIFS", "NPV/IRR", "Dashboards", "Goal Seek"].map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-white rounded-full text-slate-600">✓ {s}</span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-lg transition cursor-pointer" onClick={() => setRoleFilter("FP&A")}>
              <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2"><TrendingUp size={16} /> FP&A</h4>
              <div className="flex flex-wrap gap-1">
                {["Variance Analysis", "Budget Models", "CAGR", "Power Query", "PMT/FV", "Data Tables"].map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-white rounded-full text-slate-600">✓ {s}</span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition cursor-pointer" onClick={() => setRoleFilter("Investment Banking")}>
              <h4 className="font-bold text-purple-700 mb-2 flex items-center gap-2"><DollarSign size={16} /> Investment Banking</h4>
              <div className="flex flex-wrap gap-1">
                {["INDEX-MATCH", "NPV/IRR", "XIRR", "Financial Modeling", "Data Tables", "Sensitivity Analysis"].map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-white rounded-full text-slate-600">✓ {s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100">
              <div className="text-2xl font-bold text-blue-600">{allQuestions.length}+</div>
              <div className="text-xs text-slate-500">Real Questions</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100">
              <div className="text-2xl font-bold text-green-600">12+</div>
              <div className="text-xs text-slate-500">Categories</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100">
              <div className="text-2xl font-bold text-purple-600">Finance</div>
              <div className="text-xs text-slate-500">Focused Examples</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100">
              <div className="text-2xl font-bold text-amber-600">100%</div>
              <div className="text-xs text-slate-500">Free Access</div>
            </div>
          </div>
        </div>

        {/* Clickable Top 10 Most Asked Questions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Star size={18} className="text-blue-600" /> Top 10 Most Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {topQuestions.map((q, idx) => (
                <div key={q.id} className="flex items-center gap-3 p-2 hover:bg-white/60 rounded-lg transition cursor-pointer group" onClick={() => scrollToQuestion(q.id)}>
                  <span className="text-blue-600 font-bold text-sm">{idx + 1}.</span>
                  <span className="text-sm text-slate-700 group-hover:text-blue-600 flex-1">{q.question}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    q.difficulty === "Beginner" ? "bg-green-100 text-green-700" : 
                    q.difficulty === "Intermediate" ? "bg-amber-100 text-amber-700" : 
                    "bg-red-100 text-red-700"
                  }`}>{q.difficulty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200">
              <Filter size={14} className="text-slate-400" />
              <select 
                value={difficultyFilter} 
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="text-sm bg-transparent focus:outline-none cursor-pointer"
              >
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200">
              <Briefcase size={14} className="text-slate-400" />
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-sm bg-transparent focus:outline-none cursor-pointer"
              >
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="flex-1"></div>
            <div className="text-xs text-slate-500">
              Showing {filteredQuestions.length} of {allQuestions.length} questions
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Learning Roadmap */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-600" /> Excel Learning Roadmap
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-green-700 mb-3">Beginner Level</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> What is Excel? Overview & Finance Uses</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Workbook vs Worksheet Basics</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Cell References (Relative, Absolute, Mixed - F4 Key)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> IF, SUMIF, COUNTIF Functions</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Basic Conditional Formatting</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Data Cleaning Basics (Remove Duplicates, TRIM, Text to Columns)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Excel Tables (Ctrl+T) Benefits</li>
                </ul>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h4 className="font-bold text-amber-700 mb-3">Intermediate Level</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> Pivot Tables & Pivot Charts</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> INDEX-MATCH, XLOOKUP</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> SUMIFS, COUNTIFS, IFS</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> NPV, IRR, PMT Functions</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> Goal Seek & Data Tables</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> Conditional Formatting (Advanced)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-amber-500" /> Dependent Drop-Down Lists</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold text-red-700 mb-3">Advanced Level</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> Power Query (ETL Automation)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> Dynamic Arrays (FILTER, UNIQUE, SORT)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> XNPV, XIRR for Irregular Cash Flows</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> Interactive Dashboards & Solver</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> Financial Modeling (3-Statement)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> Power Pivot & DAX</li>
                  <li className="flex items-center gap-2"><CheckCircle size={12} className="text-red-500" /> VBA Macros (Automation)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-5">
            {filteredQuestions.map((item) => (
              <div key={item.id} id={`question-${item.id}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 scroll-mt-20">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.difficulty === "Beginner" ? "bg-green-100 text-green-700" : 
                          item.difficulty === "Intermediate" ? "bg-amber-100 text-amber-700" : 
                          "bg-red-100 text-red-700"
                        }`}>{item.difficulty}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{item.category}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Asked in {item.frequency} of interviews</span>
                        {item.roles && item.roles.slice(0, 2).map(role => (
                          <span key={role} className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{role}</span>
                        ))}
                        {completedQuestions.includes(item.id) && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Completed</span>}
                      </div>
                      
                      {/* Question */}
                      <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">{item.question}</h3>
                      
                      {/* Short Answer */}
                      <p className="text-slate-600 mb-4">{item.shortAnswer}</p>
                      
                      {/* Syntax Section */}
                      {item.syntax && (
                        <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Code size={14} className="text-blue-600" />
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Syntax</p>
                          </div>
                          <pre className="text-sm font-mono text-blue-700 bg-white p-3 rounded-lg border border-slate-200 overflow-x-auto whitespace-pre-wrap">{item.syntax}</pre>
                        </div>
                      )}
                      
                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => toggleAnswer(item.id)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 mt-2"
                      >
                        {showAnswer[item.id] ? "Hide Details" : "Show Full Answer + Example + Sample Answer"}
                        {showAnswer[item.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      
                      {/* Expanded Content */}
                      {showAnswer[item.id] && (
                        <div className="mt-4 space-y-4">
                          <div className="p-4 bg-blue-50 rounded-xl">
                            <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{item.answer}</p>
                          </div>
                          
                          {item.example && (
                            <div className="p-4 bg-green-50 rounded-xl">
                              <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">📊 Example:</p>
                              <pre className="text-sm font-mono bg-white p-3 rounded-lg border border-green-200 overflow-x-auto whitespace-pre-wrap">{item.example}</pre>
                            </div>
                          )}
                          
                          {item.useCase && (
                            <div className="p-4 bg-purple-50 rounded-xl">
                              <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">🎯 Common Use Cases:</p>
                              <p className="text-sm text-purple-800 leading-relaxed">{item.useCase}</p>
                            </div>
                          )}
                          
                          {/* Sample Interview Answer */}
                          {item.sampleAnswer && (
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                              <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1">💬 Sample Interview Answer:</p>
                              <p className="text-sm text-amber-800 leading-relaxed">"{item.sampleAnswer}"</p>
                            </div>
                          )}
                          
                          {item.tip && (
                            <div className="p-4 bg-indigo-50 rounded-xl">
                              <p className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1">💡 Pro Interview Tip:</p>
                              <p className="text-sm text-indigo-800 leading-relaxed">{item.tip}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button onClick={() => toggleBookmark(item.id)} className="p-2 rounded-lg hover:bg-slate-100 transition">
                        {bookmarkedQuestions.includes(item.id) ? <Heart size={18} className="text-red-500 fill-red-500" /> : <Heart size={18} className="text-slate-400" />}
                      </button>
                      <button onClick={() => toggleComplete(item.id)} className={`p-2 rounded-lg transition ${completedQuestions.includes(item.id) ? "bg-green-100 text-green-600" : "hover:bg-slate-100 text-slate-400"}`}>
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredQuestions.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500">No questions found. Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">❓ Frequently Asked Questions About Excel Interviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-2">What Excel skills are required for finance jobs?</h3>
                  <p className="text-sm text-slate-600">Lookup functions (XLOOKUP, INDEX-MATCH), Pivot Tables, SUMIFS, financial functions (NPV, IRR, PMT), What-If Analysis (Goal Seek, Data Tables), and Power Query for data automation.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-2">What Excel functions should a Financial Analyst know?</h3>
                  <p className="text-sm text-slate-600">XLOOKUP, INDEX-MATCH, SUMIFS, Pivot Tables, NPV, IRR, Goal Seek, Data Tables, and data visualization with charts.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-2">How important is Power Query in interviews?</h3>
                  <p className="text-sm text-slate-600">Increasingly important for roles involving monthly reporting and data consolidation. It's a differentiator for senior analyst positions.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-2">What Excel questions are asked in FP&A interviews?</h3>
                  <p className="text-sm text-slate-600">Budget vs Actual variance analysis, rolling forecasts, Pivot Tables, SUMIFS, scenario modeling, and Data Tables are common FP&A questions.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-2">How do I prepare for an Excel assessment test?</h3>
                  <p className="text-sm text-slate-600">Practice with real datasets, master keyboard shortcuts (F4, Ctrl+D, Ctrl+R), understand formula logic, and practice mock interviews with time limits.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-800 mb-2">What is the most important Excel function for finance?</h3>
                  <p className="text-sm text-slate-600">XLOOKUP/INDEX-MATCH for data retrieval, Pivot Tables for summarization, SUMIFS for conditional summing, and NPV/IRR for investment analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Advanced Excel Interview Questions for Finance Analysts, FP&A, and Accounting Roles</h2>
            <p className="text-slate-700 leading-relaxed text-center max-w-4xl mx-auto">
              Advanced Excel interview questions are commonly asked in <strong>Finance Analyst, FP&A, Investment Banking, Accounting, MIS Executive, and Business Analyst interviews</strong>. 
              Employers test candidates on lookup functions (VLOOKUP, XLOOKUP, INDEX-MATCH), financial functions (NPV, IRR, XIRR, PMT, FV, PV), What-If Analysis (Goal Seek, Solver, Data Tables), 
              Pivot Tables, Power Query, financial modeling, dashboard creation, and data analysis skills. This comprehensive guide covers {allQuestions.length}+ frequently asked questions 
              with detailed answers, syntax examples, sample interview responses, and pro tips from interview experts.
            </p>
          </div>
        </div>

        {/* Related Guides Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Related Interview Guides</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/interview-prep/accounting-basics-fundamentals" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all">
              Accounting Basics
            </Link>
            <Link href="/interview-prep/behavioural-questions" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all">
              Behavioral Questions
            </Link>
            <Link href="/interview-prep" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all">
              Interview Prep Hub
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Ace Your Excel Interview?</h2>
            <p className="text-slate-300 mb-6">Master these {allQuestions.length}+ questions and walk into your interview with confidence.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowMockInterview(true)}
                className="bg-white text-slate-800 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                <Mic size={16} />
                Start Mock Interview
              </button>
              <Link href="/interview-prep/accounting-basics-fundamentals">
                <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105 inline-flex items-center gap-2 backdrop-blur-sm">
                  <FileText size={16} />
                  Accounting Basics
                </button>
              </Link>
              <Link href="/interview-prep/behavioural-questions">
                <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105 inline-flex items-center gap-2 backdrop-blur-sm">
                  <Users size={16} />
                  Behavioral Questions
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Interview Prep */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center">
          <Link href="/interview-prep" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm">
            ← Back to Interview Preparation
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .scroll-mt-20 {
          scroll-margin-top: 80px;
        }
      `}</style>
    </>
  );
}