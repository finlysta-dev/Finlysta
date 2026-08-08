import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ArrowRight,
  Briefcase,
  Target,
  Zap,
  ChevronRight,
  BarChart3,
  Calculator,
  PieChart,
  LineChart,
  Wallet,
  DollarSign,
  Users,
  Lightbulb,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Star,
  Award,
  Clock,
  Building2,
  Globe,
  Scale,
  FileText,
  Database,
  Presentation,
  Mail,
  Phone,
  MapPin,
  Award as Trophy,
  Rocket,
  Shield,
  PenTool,
  Calculator as Calc,
  Brain,
  Laptop,
  Handshake,
  BarChart,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Financial Analyst Career Path | Skills, Salary & Growth | Finlysta",
  description:
    "Complete guide to becoming a Financial Analyst in India. Learn required skills, responsibilities, certifications, salary expectations, and career progression. Start your journey today.",
  keywords: [
    "financial analyst career path",
    "how to become financial analyst",
    "financial analyst skills",
    "financial analyst responsibilities",
    "financial analyst salary India",
    "financial analyst certifications",
    "financial analyst fresher jobs",
    "financial modeling skills",
    "career as financial analyst",
  ],
  alternates: { canonical: "https://finlysta.com/career-paths/financial-analyst" },
  openGraph: {
    title:
      "Financial Analyst Career Path | Skills, Salary & Growth | Finlysta",
    description:
      "Complete guide to becoming a Financial Analyst in India. Learn required skills, responsibilities, certifications, and career progression.",
    url: "https://finlysta.com/career-paths/financial-analyst",
    siteName: "Finlysta",
    images: [
      {
        url: "/Finlysta.png",
        width: 1200,
        height: 630,
        alt: "Financial Analyst Career Path - Finlysta",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const skills = {
  technical: [
    { name: "Excel Advanced", level: "Essential", description: "VLOOKUP, INDEX-MATCH, Pivot Tables, Macros, VBA" },
    { name: "Financial Modeling", level: "Essential", description: "DCF, Valuation, M&A models, LBO models" },
    { name: "SQL & Databases", level: "Important", description: "Query optimization, data extraction, database management" },
    { name: "Power BI / Tableau", level: "Important", description: "Data visualization and dashboard creation" },
    { name: "Python / R", level: "Nice to Have", description: "Data analysis, automation, statistical modeling" },
    { name: "Accounting Principles", level: "Essential", description: "GAAP, IFRS, financial statements analysis" },
  ],
  soft: [
    { name: "Analytical Thinking", level: "Essential", description: "Problem-solving and data interpretation" },
    { name: "Communication", level: "Essential", description: "Presenting findings to stakeholders" },
    { name: "Attention to Detail", level: "Essential", description: "Accuracy in financial calculations" },
    { name: "Time Management", level: "Important", description: "Managing multiple projects and deadlines" },
    { name: "Business Acumen", level: "Important", description: "Understanding industry dynamics" },
    { name: "Critical Thinking", level: "Important", description: "Evaluating financial information objectively" },
  ],
};

const responsibilities = [
  {
    category: "Financial Analysis",
    icon: BarChart3,
    tasks: [
      "Analyze financial data and performance metrics",
      "Create financial models and forecasts",
      "Compare actual results vs budgeted targets",
      "Identify trends, risks, and opportunities",
      "Prepare variance analysis reports",
    ],
  },
  {
    category: "Reporting & Documentation",
    icon: FileText,
    tasks: [
      "Prepare monthly, quarterly, and annual reports",
      "Create executive summaries and presentations",
      "Document analysis methodologies",
      "Maintain financial databases and records",
      "Ensure compliance with reporting standards",
    ],
  },
  {
    category: "Budgeting & Forecasting",
    icon: Calculator,
    tasks: [
      "Assist in annual budget preparation",
      "Develop revenue and expense forecasts",
      "Monitor budget utilization",
      "Recommend corrective actions",
      "Support strategic planning initiatives",
    ],
  },
  {
    category: "Business Support",
    icon: Briefcase,
    tasks: [
      "Provide financial insights for decision-making",
      "Support pricing and cost analysis",
      "Evaluate investment opportunities",
      "Collaborate with cross-functional teams",
      "Assist in resource allocation decisions",
    ],
  },
];

const learningPath = [
  {
    step: 1,
    title: "Build Foundation",
    duration: "1-3 months",
    topics: [
      "Accounting fundamentals (Balance Sheet, P&L, Cash Flow)",
      "Financial mathematics and time value of money",
      "Introduction to financial markets",
      "Basic Excel skills",
      "Economics basics",
    ],
  },
  {
    step: 2,
    title: "Develop Technical Skills",
    duration: "3-6 months",
    topics: [
      "Advanced Excel (Pivot Tables, VLOOKUP, Macros)",
      "Financial modeling fundamentals",
      "Valuation methods (DCF, Comparable analysis)",
      "SQL for data analysis",
      "Introduction to Power BI/Tableau",
    ],
  },
  {
    step: 3,
    title: "Gain Practical Experience",
    duration: "Ongoing",
    topics: [
      "Work on real-world projects",
      "Create a portfolio of analysis work",
      "Internships or entry-level positions",
      "Build network in finance community",
      "Stay updated with industry trends",
    ],
  },
  {
    step: 4,
    title: "Get Certified",
    duration: "6-18 months",
    topics: [
      "CFA Level 1 (Chartered Financial Analyst)",
      "FRM (Financial Risk Manager)",
      "Excel certifications",
      "Business analytics certifications",
      "MBA (optional, for career advancement)",
    ],
  },
];

const certifications = [
  {
    name: "CFA Level 1",
    provider: "CFA Institute",
    duration: "6-12 months",
    cost: "₹50,000 - ₹80,000",
    value: "High",
    description: "Gold standard for investment analysis. Highly valued by asset management and equity research firms.",
  },
  {
    name: "Financial Modeling & Valuation",
    provider: "Various",
    duration: "2-3 months",
    cost: "₹15,000 - ₹40,000",
    value: "High",
    description: "Practical skills in building financial models. Essential for investment banking and corporate finance roles.",
  },
  {
    name: "FRM Part 1",
    provider: "GARP",
    duration: "6-9 months",
    cost: "₹40,000 - ₹60,000",
    value: "High",
    description: "Focuses on risk management. Valuable for risk analyst and treasury roles.",
  },
  {
    name: "Excel Expert Certification",
    provider: "Microsoft",
    duration: "1-2 months",
    cost: "₹5,000 - ₹10,000",
    value: "Medium",
    description: "Validates advanced Excel skills. Most finance roles require strong Excel proficiency.",
  },
  {
    name: "Data Analytics with Python",
    provider: "Various",
    duration: "2-4 months",
    cost: "₹20,000 - ₹50,000",
    value: "Growing",
    description: "Increasingly important for data-driven financial analysis roles.",
  },
];

const careerProgression = [
  {
    role: "Junior Financial Analyst",
    experience: "0-2 years",
    salary: "₹3-6 LPA",
    focus: "Learning fundamentals, data collection, basic analysis",
    skills: "Excel, basic financial analysis, reporting",
  },
  {
    role: "Financial Analyst",
    experience: "2-4 years",
    salary: "₹6-12 LPA",
    focus: "Independent analysis, modeling, business partnering",
    skills: "Financial modeling, SQL, presentation, business acumen",
  },
  {
    role: "Senior Financial Analyst",
    experience: "4-7 years",
    salary: "₹12-20 LPA",
    focus: "Complex analysis, team guidance, strategic input",
    skills: "Strategic thinking, leadership, advanced modeling",
  },
  {
    role: "Finance Manager / Lead",
    experience: "7-10 years",
    salary: "₹20-35 LPA",
    focus: "Team management, strategic planning, stakeholder management",
    skills: "Leadership, strategy, cross-functional collaboration",
  },
  {
    role: "Senior Finance Manager / Director",
    experience: "10+ years",
    salary: "₹35-75+ LPA",
    focus: "Overall finance function, C-suite communication, business strategy",
    skills: "Executive presence, P&L management, board presentations",
  },
];

const tools = [
  { name: "Microsoft Excel", category: "Spreadsheet", icon: Calculator, usage: "Data analysis, financial modeling, reporting" },
  { name: "Power BI", category: "Visualization", icon: BarChart, usage: "Interactive dashboards, data visualization" },
  { name: "Tableau", category: "Visualization", icon: PieChart, usage: "Business intelligence, visual analytics" },
  { name: "SQL", category: "Database", icon: Database, usage: "Data extraction, database queries" },
  { name: "Python", category: "Programming", icon: Laptop, usage: "Data analysis, automation, statistical modeling" },
  { name: "SAP / Oracle", category: "ERP", icon: Building2, usage: "Enterprise resource planning, financial systems" },
  { name: "Bloomberg Terminal", category: "Market Data", icon: TrendingUp, usage: "Real-time market data, financial research" },
  { name: "FactSet", category: "Research", icon: FileText, usage: "Financial data, equity research, portfolio analysis" },
];

const industries = [
  { name: "Investment Banking", roles: "IBD Analyst, M&A Analyst", growth: "Very High", salary: "₹8-20 LPA" },
  { name: "Equity Research", roles: "Research Analyst, Associate", growth: "High", salary: "₹6-15 LPA" },
  { name: "Corporate Finance", roles: "FP&A Analyst, Corporate Analyst", growth: "High", salary: "₹5-12 LPA" },
  { name: "Consulting", roles: "Financial Consultant, Analyst", growth: "High", salary: "₹6-14 LPA" },
  { name: "Asset Management", roles: "Portfolio Analyst, Research Associate", growth: "High", salary: "₹5-12 LPA" },
  { name: "Banking", roles: "Credit Analyst, Relationship Manager", growth: "Medium", salary: "₹4-10 LPA" },
  { name: "Fintech", roles: "Data Analyst, Product Analyst", growth: "Very High", salary: "₹6-15 LPA" },
  { name: "E-Commerce/Retail", roles: "Financial Analyst, Business Analyst", growth: "High", salary: "₹5-12 LPA" },
];

const interviewQuestions = [
  { type: "Technical", question: "Walk me through a DCF valuation model", tips: "Explain assumptions, discount rate, terminal value, and sensitivity analysis" },
  { type: "Technical", question: "How do you value a company using multiples?", tips: "Discuss EV/EBITDA, P/E ratios, and when to use each method" },
  { type: "Technical", question: "What is the difference between ROI and ROE?", tips: "Define each metric, explain formulas and their use cases" },
  { type: "Analytical", question: "How would you analyze a company's liquidity?", tips: "Discuss current ratio, quick ratio, working capital analysis" },
  { type: "Analytical", question: "What factors would you consider before investing in a company?", tips: "Cover financial health, market position, management, growth prospects" },
  { type: "Situational", question: "How do you handle tight deadlines with multiple projects?", tips: "Discuss prioritization, time management, and communication" },
  { type: "Behavioral", question: "Tell me about a time you identified a financial discrepancy", tips: "Use STAR method, focus on analytical process and resolution" },
  { type: "Behavioral", question: "Why do you want to be a Financial Analyst?", tips: "Show passion for analysis, problem-solving, and business impact" },
];

export default function FinancialAnalystPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link href="/career-paths" className="hover:text-white transition-colors">
                Career Paths
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Financial Analyst</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold border border-green-500/30">
                  <TrendingUp className="w-3 h-3" />
                  High Demand
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Financial Analyst
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Analyze financial data, build models, and provide insights to help businesses make
              informed decisions. One of the most sought-after entry-level finance roles.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white/60 text-xs">Avg. Salary</p>
                  <p className="text-white font-bold">₹5-12 LPA</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white/60 text-xs">Experience</p>
                  <p className="text-white font-bold">0-3 Years</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Rocket className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white/60 text-xs">Growth</p>
                  <p className="text-white font-bold">High</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Globe className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white/60 text-xs">Remote</p>
                  <p className="text-white font-bold">Available</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Find Financial Analyst Jobs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#skills"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
              >
                View Required Skills
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* What is a Financial Analyst */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              What Does a Financial Analyst Do?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              A Financial Analyst is a professional who analyzes financial data and creates reports
              to help companies make better business decisions. They are often called "business
              translators" who convert complex financial numbers into actionable insights.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Financial Analysts work across all industries - from investment banks and consulting
              firms to corporate finance departments and fintech companies. They play a crucial role
              in budgeting, forecasting, valuation, and strategic planning.
            </p>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-600 font-semibold">Role Type</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">Entry-Level</p>
                <p className="text-slate-600 text-sm">Perfect for freshers</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-purple-600 font-semibold">Team Size</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">3-10 People</p>
                <p className="text-slate-600 text-sm">Usually reports to Finance Manager</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-green-600 font-semibold">Work Hours</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">40-50 Hours</p>
                <p className="text-slate-600 text-sm">Standard with occasional OT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Required */}
      <section id="skills" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              <Brain className="w-4 h-4" />
              Skills Required
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Skills Do You Need?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Financial Analysts need a combination of technical and soft skills to succeed in this role.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.technical.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900">{skill.name}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        skill.level === "Essential"
                          ? "bg-red-100 text-red-700"
                          : skill.level === "Important"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.soft.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900">{skill.name}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        skill.level === "Essential"
                          ? "bg-red-100 text-red-700"
                          : skill.level === "Important"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Software */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              <Laptop className="w-4 h-4" />
              Tools & Software
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tools You Should Know
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Proficiency in these tools will make you a more valuable financial analyst.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{tool.name}</h4>
                      <span className="text-xs text-slate-500">{tool.category}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{tool.usage}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              Key Responsibilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Will You Do Daily?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Financial Analysts have diverse responsibilities across analysis, reporting, and business support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsibilities.map((resp, index) => {
              const Icon = resp.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{resp.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {resp.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              Learning Path
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to Become a Financial Analyst
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Follow this step-by-step roadmap to launch your career as a Financial Analyst.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 -translate-x-1/2"></div>

            <div className="space-y-8 lg:space-y-0">
              {learningPath.map((step, index) => (
                <div
                  key={index}
                  className={`relative lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:ml-auto"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute top-6 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg items-center justify-center z-10" style={{ [index % 2 === 0 ? "right" : "left"]: "-0.75rem" }}>
                    <span className="text-white text-xs font-bold">{step.step}</span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex lg:hidden items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{step.step}</span>
                      </div>
                      <span className="text-blue-600 font-semibold">{step.duration}</span>
                    </div>
                    <div className="hidden lg:flex items-center justify-end gap-3 mb-3">
                      <span className="text-blue-600 font-semibold">{step.duration}</span>
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                          {index % 2 === 0 ? (
                            <>
                              <span className="text-slate-400">•</span>
                              {topic}
                            </>
                          ) : (
                            <>
                              {topic}
                              <span className="text-slate-400">•</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Certifications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Certifications That Boost Your Career
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              While not always mandatory, certifications can significantly improve your job prospects and salary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{cert.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      cert.value === "High"
                        ? "bg-green-100 text-green-700"
                        : cert.value === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {cert.value} Value
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4">{cert.description}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                    <Clock className="w-3 h-3" />
                    {cert.duration}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                    <DollarSign className="w-3 h-3" />
                    {cert.cost}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              <Rocket className="w-4 h-4" />
              Career Progression
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Growth Trajectory
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Financial Analysts have clear progression paths with significant salary growth.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Role</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Experience</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Salary Range</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Focus Area</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Key Skills</th>
                </tr>
              </thead>
              <tbody>
                {careerProgression.map((level, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : index === 2 ? "bg-purple-500" : index === 3 ? "bg-orange-500" : "bg-red-500"
                        }`}>
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="font-semibold text-slate-900">{level.role}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-sm">{level.experience}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-green-600">{level.salary}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-sm">{level.focus}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm">{level.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4" />
              Industries
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Where Can You Work?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Financial Analysts are needed across virtually every industry. Here are the top sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">{industry.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{industry.roles}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full font-medium ${
                    industry.growth === "Very High" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {industry.growth} Growth
                  </span>
                  <span className="font-semibold text-slate-700">{industry.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Preparation */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" />
              Interview Prep
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Common Interview Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Prepare for these frequently asked questions in Financial Analyst interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewQuestions.map((q, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    q.type === "Technical" ? "bg-blue-100 text-blue-700" :
                    q.type === "Analytical" ? "bg-purple-100 text-purple-700" :
                    q.type === "Situational" ? "bg-orange-100 text-orange-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {q.type}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{q.question}</h3>
                <p className="text-slate-600 text-sm">
                  <span className="font-semibold text-blue-600">Tip: </span>
                  {q.tips}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/interview-prep"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View Full Interview Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Financial Analyst Career?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Find entry-level Financial Analyst jobs, get interview tips, and access career resources to land your dream role.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jobs?role=financial-analyst"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Find Financial Analyst Jobs
            </Link>
            <Link
              href="/interview-prep"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors duration-200 border border-blue-500"
            >
              Interview Preparation
            </Link>
            <Link
              href="/blogs"
              className="px-6 py-3 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200 border border-white/30"
            >
              Read Career Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is the starting salary for a Financial Analyst in India?",
                a: "The average starting salary for a Financial Analyst in India ranges from ₹3-8 LPA (Lakhs Per Annum), depending on the company, location, and your skills. Top companies in investment banking or consulting can offer ₹8-15 LPA for freshers.",
              },
              {
                q: "Do I need an MBA to become a Financial Analyst?",
                a: "No, an MBA is not mandatory for entry-level Financial Analyst positions. A bachelor's degree in Finance, Commerce, Economics, or related fields is typically sufficient. However, an MBA can accelerate career growth and unlock senior positions.",
              },
              {
                q: "Which certification is best for Financial Analysts?",
                a: "CFA Level 1 is highly valued for investment-related roles. For corporate finance, financial modeling certifications are equally valuable. Excel certifications and FRM are also beneficial depending on your career path.",
              },
              {
                q: "What is the difference between Financial Analyst and Business Analyst?",
                a: "Financial Analysts focus on financial data, metrics, and numerical analysis. Business Analysts work more broadly on process improvement, requirements gathering, and business strategy. There's overlap, but Finance is more numbers-focused.",
              },
              {
                q: "Is coding required for Financial Analysts?",
                a: "While not always required, basic coding skills (especially Python, SQL) are increasingly valuable. Advanced Excel remains the most critical technical skill. Learning VBA for automation can also be very helpful.",
              },
              {
                q: "What companies hire Financial Analysts in India?",
                a: "Top employers include investment banks (Goldman Sachs, JP Morgan), consulting firms (Deloitte, PwC), corporate finance departments (Reliance, Tata), fintech companies (Paytm, Razorpay), and asset management firms.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
