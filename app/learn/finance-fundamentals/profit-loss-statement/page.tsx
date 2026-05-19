// app/learn/financial-statements/profit-loss-statement/page.tsx
import React from 'react';
import {
  BookOpen,
  Clock,
  TrendingUp,
  CheckCircle,
  Award,
  Target,
  Zap,
  Briefcase,
  BarChart3,
  DollarSign,
  Percent,
  Calculator,
  FileText,
  GraduationCap,
  ArrowRight,
  Eye,
  Lightbulb,
  HelpCircle,
  ChevronRight,
  Home,
  Layers,
  PieChart,
  Activity,
  Users,
  Server,
  Link2,
  Star,
  Shield,
  AlertCircle,
  UserCheck,
  Brain,
  Globe,
  TrendingDown,
  Wallet,
  ShoppingBag,
  Building2,
  LucideIcon
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================
interface TagProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

interface ConceptCardProps {
  icon: LucideIcon;
  title: string;
  definition: string;
  example: string;
}

interface FormulaCardProps {
  formula: string;
  explanation: string;
}

interface WhyItMattersCardProps {
  icon: LucideIcon;
  title: string;
  explanation: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

interface RelatedLessonProps {
  title: string;
  duration: string;
  icon: LucideIcon;
  href: string;
}

interface KeyTermProps {
  term: string;
  definition: string;
}

interface CommonMistakeProps {
  mistake: string;
  correction: string;
}

// ============================================================================
// STYLES - Reduced line spacing
// ============================================================================
const styles = {
  container: "max-w-[1280px] mx-auto px-6 md:px-8 py-8 md:py-12",
  bgPrimary: "bg-[#F7F8FC]",
  textPrimary: "text-[#111827]",
  textSecondary: "text-[#6B7280]",
  textAccent: "text-[#2563EB]",
  borderAccent: "border-[#2563EB]",
  bgAccent: "bg-[#2563EB]",
  bgAccentLight: "bg-[#EFF6FF]",
  card: "bg-white rounded-[28px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
  cardHover: "hover:shadow-[0_25px_55px_rgba(0,0,0,0.08)] transition-shadow duration-300",
  tag: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFF6FF] text-[#2563EB] text-sm font-semibold",
  sectionHeading: "text-3xl md:text-4xl font-bold text-[#111827] mb-5",
  bodyText: "text-lg text-[#111827] leading-relaxed",
  grid2Col: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3Col: "grid grid-cols-1 md:grid-cols-3 gap-6",
  grid4Col: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
  buttonDark: "inline-flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-2xl font-semibold hover:bg-[#1f2937] transition-colors",
  insightBox: "bg-[#EFF6FF] border-l-4 border-[#2563EB] p-6 rounded-r-2xl",
  breadcrumb: "flex items-center gap-2 text-sm text-[#6B7280] mb-6 flex-wrap",
  breadcrumbLink: "hover:text-[#2563EB] transition-colors",
  formulaCard: "bg-[#F8FAFC] rounded-2xl p-5 text-center border border-gray-100 hover:border-[#2563EB]/20 transition-all",
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================
const Tag: React.FC<TagProps> = ({ children, icon: Icon }) => (
  <span className={styles.tag}>
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </span>
);

const ConceptCard: React.FC<ConceptCardProps> = ({ icon: Icon, title, definition, example }) => (
  <div className={`${styles.card} ${styles.cardHover} h-full flex flex-col`}>
    <div className="w-12 h-12 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#2563EB]" />
    </div>
    <h3 className="text-2xl font-bold text-[#111827] mb-2">{title}</h3>
    <p className="text-[#6B7280] leading-relaxed mb-3 flex-1">{definition}</p>
    <div className="pt-3 border-t border-gray-100">
      <span className="text-sm font-medium text-[#2563EB]">📌 Example:</span>
      <p className="text-sm text-[#6B7280] mt-1">{example}</p>
    </div>
  </div>
);

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, explanation }) => (
  <div className={styles.formulaCard}>
    <p className="text-xl md:text-2xl font-mono font-bold text-[#111827] mb-2">{formula}</p>
    <p className="text-[#6B7280] text-sm">{explanation}</p>
  </div>
);

const WhyItMattersCard: React.FC<WhyItMattersCardProps> = ({ icon: Icon, title, explanation }) => (
  <div className={`${styles.card} ${styles.cardHover} text-center h-full`}>
    <div className="w-12 h-12 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-[#2563EB]" />
    </div>
    <h3 className="text-xl font-bold text-[#111827] mb-1">{title}</h3>
    <p className="text-[#6B7280] text-sm leading-relaxed">{explanation}</p>
  </div>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
    <h3 className="text-xl font-semibold text-[#111827] mb-2 flex items-start gap-3">
      <HelpCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
      {question}
    </h3>
    <p className="text-[#6B7280] leading-relaxed pl-8">{answer}</p>
  </div>
);

const RelatedLesson: React.FC<RelatedLessonProps> = ({ title, duration, icon: Icon, href }) => (
  <a href={href} className={`${styles.card} ${styles.cardHover} h-[150px] flex flex-col justify-between group`}>
    <div>
      <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-[#2563EB]" />
      </div>
      <h3 className="font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">{title}</h3>
    </div>
    <div className="flex items-center justify-between mt-2">
      <span className="text-sm text-[#6B7280]">{duration}</span>
      <ArrowRight className="w-4 h-4 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </a>
);

const KeyTerm: React.FC<KeyTermProps> = ({ term, definition }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <h4 className="font-bold text-[#111827] mb-1">{term}</h4>
    <p className="text-sm text-[#6B7280] leading-relaxed">{definition}</p>
  </div>
);

const CommonMistake: React.FC<CommonMistakeProps> = ({ mistake, correction }) => (
  <div className="flex gap-3 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#FF8A00]">
    <AlertCircle className="w-5 h-5 text-[#FF8A00] flex-shrink-0" />
    <div>
      <p className="font-semibold text-[#111827] mb-1">❌ {mistake}</p>
      <p className="text-sm text-[#6B7280] leading-relaxed">✅ {correction}</p>
    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ProfitLossStatementPage() {
  const conceptsData: ConceptCardProps[] = [
    { icon: DollarSign, title: "Revenue", definition: "Total income generated from primary business operations before any deductions.", example: "Amazon earned $574B from product sales in 2023." },
    { icon: ShoppingBag, title: "COGS", definition: "Direct costs attributable to the production of goods sold by a company.", example: "Apple's COGS includes component costs for iPhones." },
    { icon: Building2, title: "Operating Expenses", definition: "Costs required to run the business that aren't directly tied to production.", example: "Sales & marketing, R&D, and administrative costs." },
    { icon: Percent, title: "Net Profit Margin", definition: "Percentage of revenue that remains as profit after all expenses.", example: "A 15% margin means $0.15 profit per $1 revenue." }
  ];

  const formulasData: FormulaCardProps[] = [
    { formula: "Gross Profit = Revenue - COGS", explanation: "Shows profitability of core products before overhead costs." },
    { formula: "Operating Income = Gross Profit - Operating Expenses", explanation: "Profit from core business operations." },
    { formula: "Net Income = Revenue - All Expenses", explanation: "Bottom line — total profit after everything." },
    { formula: "Gross Margin = (Gross Profit / Revenue) × 100", explanation: "Percentage of revenue after production costs." },
    { formula: "Net Margin = (Net Income / Revenue) × 100", explanation: "Final profitability percentage." }
  ];

  const whyItMattersData: WhyItMattersCardProps[] = [
    { icon: TrendingUp, title: "Investor Confidence", explanation: "Investors use P&L to assess growth potential and profitability trends." },
    { icon: Briefcase, title: "Strategic Planning", explanation: "Identifies cost-saving opportunities and revenue drivers." },
    { icon: Shield, title: "Loan Approval", explanation: "Banks analyze P&L statements before approving business loans." },
    { icon: Users, title: "Stakeholder Communication", explanation: "Transparent reporting builds trust with partners and employees." }
  ];

  const interviewQuestionsData: { question: string; answer: string }[] = [
    { question: "What's the difference between gross profit and net profit?", answer: "Gross profit is revenue minus COGS, showing efficiency in production. Net profit subtracts ALL expenses (operating, interest, taxes) from revenue. A company can have healthy gross profit but low net profit due to high operating costs or debt payments. For example, a retailer might have 50% gross margins but only 5% net margins after rent and salaries." },
    { question: "How do you analyze a P&L statement for investment decisions?", answer: "Focus on three key areas: revenue growth trends (consistent 10-20% YoY is healthy), margin expansion (gross vs net margins widening), and expense control (operating expenses as % of revenue should stabilize or decrease). Also check for one-time charges that distort true operational performance. Compare with industry peers for context." },
    { question: "What are red flags in a P&L statement?", answer: "Key red flags include: declining gross margins (pricing pressure or rising costs), revenue growing faster than cash flow (aggressive accounting), frequent 'one-time' restructuring charges, inconsistent expense patterns, and net income disconnected from operational cash flow. Also watch for unexplained fluctuations in COGS or SG&A relative to revenue changes." }
  ];

  const faqsData: FAQItemProps[] = [
    { question: "What is a Profit & Loss Statement vs a Balance Sheet?", answer: "A P&L statement shows financial performance over a period (quarter/year) — revenue, expenses, and profit. A Balance Sheet is a snapshot at a specific date — assets, liabilities, and equity. Think of P&L as a video of performance, Balance Sheet as a photo of financial position. Both are essential for complete financial analysis." },
    { question: "How often should companies prepare P&L statements?", answer: "Public companies file quarterly (10-Q) and annually (10-K). Private companies typically prepare monthly for management review, quarterly for board reports, and annually for taxes. For startups, monthly P&L helps track burn rate and unit economics. Even freelancers benefit from quarterly P&L to manage taxes and profitability." },
    { question: "What's EBITDA and why does it matter?", answer: "EBITDA = Earnings Before Interest, Taxes, Depreciation, Amortization. It measures operational profitability by removing financing and accounting decisions. Investors use it to compare companies across different capital structures and tax situations. However, critics note it ignores real costs like asset maintenance. Always review both EBITDA and net income." },
    { question: "How does COGS differ from operating expenses?", answer: "COGS (Cost of Goods Sold) are direct costs tied to production — materials, direct labor, manufacturing overhead. Operating expenses (OpEx) are indirect costs — rent for HQ, marketing, R&D, admin salaries. For a bakery: flour (COGS) vs. advertising (OpEx). This distinction affects gross margin calculation and tax treatment." },
    { question: "Why do investors care about net margin?", answer: "Net margin shows how much profit a company keeps from each dollar of revenue after ALL costs. A company with 20% net margin keeps $0.20 per $1 revenue. Higher net margins suggest better pricing power, cost control, and operational efficiency. Investors compare net margins across competitors to identify which company runs more efficiently." },
    { question: "Can startups have negative net income?", answer: "Yes, many early-stage startups operate at a loss intentionally. They prioritize growth over profitability — spending heavily on R&D, marketing, and hiring to capture market share. Amazon operated at a loss for years before becoming profitable. Investors evaluate burn rate, unit economics, and path to profitability, not just current net income." }
  ];

  const keyTermsData: KeyTermProps[] = [
    { term: "Revenue", definition: "Total sales or income generated from normal business operations." },
    { term: "COGS", definition: "Direct costs of producing goods sold, including materials and labor." },
    { term: "Gross Margin", definition: "Revenue minus COGS, shown as percentage of revenue." },
    { term: "Operating Expenses", definition: "Indirect costs like rent, marketing, and R&D." },
    { term: "EBITDA", definition: "Earnings before interest, taxes, depreciation, amortization." },
    { term: "Net Income", definition: "Bottom-line profit after ALL expenses and taxes." }
  ];

  const commonMistakesData: CommonMistakeProps[] = [
    { mistake: "Confusing Revenue with Profit", correction: "Revenue is total sales. Profit is what remains after costs. A company can have high revenue but zero profit." },
    { mistake: "Ignoring Margin Trends", correction: "Always analyze margins (gross, operating, net) not just absolute numbers. Declining margins signal problems." },
    { mistake: "Not Comparing Periods", correction: "Always compare YoY or QoQ. One quarter alone doesn't show the full trend or seasonality." },
    { mistake: "Overlooking One-Time Items", correction: "Adjust for unusual gains/losses to see true operational performance." }
  ];

  const relatedLessonsData: RelatedLessonProps[] = [
    { title: "Balance Sheet Explained", duration: "15 min", icon: Layers, href: "/learn/financial-statements/balance-sheet" },
    { title: "Cash Flow Statement", duration: "18 min", icon: Activity, href: "/learn/financial-statements/cash-flow-statement" },
    { title: "Financial Ratios Masterclass", duration: "25 min", icon: Percent, href: "/learn/financial-analysis/ratios" },
    { title: "Income Statement Analysis", duration: "20 min", icon: TrendingUp, href: "/learn/financial-analysis/income-statement" },
    { title: "EBITDA Deep Dive", duration: "12 min", icon: Calculator, href: "/learn/financial-analysis/ebitda" },
    { title: "Financial Modeling Basics", duration: "30 min", icon: PieChart, href: "/learn/modeling/basics" }
  ];

  return (
    <div className={`${styles.bgPrimary} min-h-screen`}>
      <div className={styles.container}>
        
        {/* ===== 1. BREADCRUMB ===== */}
        <div className={styles.breadcrumb}>
          <a href="/" className={styles.breadcrumbLink}>Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/learn" className={styles.breadcrumbLink}>Learn</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/learn/financial-statements" className={styles.breadcrumbLink}>Financial Statements</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111827] font-medium">Profit & Loss Statement</span>
        </div>

        {/* ===== 2. HERO SECTION - Premium Gradient Background ===== */}
        <div className="relative overflow-hidden rounded-[32px] mb-12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Left side - Content */}
            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                <Tag>📘 Beginner</Tag>
                <Tag icon={Clock}>12 min read</Tag>
                <Tag icon={BookOpen}>Finance Basics</Tag>
              </div>
              
  <h1 className="text-4xl md:text-6xl font-black text-[#111827] leading-[1.1] max-w-[700px] mb-5 relative z-10 tracking-[-0.02em]">
  Profit & Loss Statement Explained for Beginners
</h1>
              
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-[620px] mb-6">
                Learn how companies track revenue, expenses, and profitability using real-world financial statement examples and practical analysis techniques.
              </p>
              
              {/* Learning stats - more meaningful than fake user counts */}
              <div className="flex flex-wrap gap-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    <p className="text-lg font-bold text-black">6</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">Key Concepts</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#2563EB]" />
                    <p className="text-lg font-bold text-black">5</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">Formulas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#FF8A00]" />
                    <p className="text-lg font-bold text-black">6</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">FAQs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#10B981]" />
                    <p className="text-lg font-bold text-black">3</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">Interview Qs</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Premium Visual Flow Diagram */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="space-y-2">
                  {/* Revenue Box */}
                  <div className="bg-[#DBEAFE] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <DollarSign className="w-5 h-5 text-[#1E40AF]" />
                      <span className="font-bold text-[#1E40AF] text-sm">REVENUE</span>
                    </div>
                    <p className="text-xl font-bold text-[#1E40AF]">$1,000,000</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* COGS Box */}
                  <div className="bg-[#FEE2E2] rounded-xl p-3 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <ShoppingBag className="w-5 h-5 text-[#991B1B]" />
                      <span className="font-bold text-[#991B1B] text-sm">COGS</span>
                    </div>
                    <p className="text-xl font-bold text-[#991B1B]">($400,000)</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* Gross Profit Box */}
                  <div className="bg-[#DCFCE7] rounded-xl p-3 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <TrendingUp className="w-5 h-5 text-[#166534]" />
                      <span className="font-bold text-[#166534] text-sm">GROSS PROFIT</span>
                    </div>
                    <p className="text-xl font-bold text-[#166534]">$600,000</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* OpEx Box */}
                  <div className="bg-[#FEF3C7] rounded-xl p-3 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <Building2 className="w-5 h-5 text-[#92400E]" />
                      <span className="font-bold text-[#92400E] text-sm">OPERATING EXPENSES</span>
                    </div>
                    <p className="text-xl font-bold text-[#92400E]">($350,000)</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* Net Profit Box */}
                  <div className="bg-[#EDE9FE] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <Award className="w-5 h-5 text-[#5B21B6]" />
                      <span className="font-bold text-[#5B21B6] text-sm">NET PROFIT</span>
                    </div>
                    <p className="text-xl font-bold text-[#5B21B6]">$250,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 3. WHAT YOU'LL LEARN ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Read and interpret any P&L statement confidently",
              "Calculate gross profit, operating income, and net profit",
              "Identify red flags and opportunities in financial reports",
              "Compare companies using profitability ratios",
              "Build a basic P&L from transaction data",
              "Use P&L insights for investment decisions"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                <span className="text-[#111827]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 4. TOPIC DEFINITION ===== */}
        <section className="mb-12">
          <div className={styles.card}>
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-7 h-7 text-[#2563EB]" />
              <h2 className="text-2xl font-bold text-[#111827]">What Is a Profit & Loss Statement?</h2>
            </div>
            <p className="text-[#111827] leading-relaxed">
              A <strong className="text-[#111827]">Profit & Loss (P&L) Statement</strong>, also known as an Income Statement, 
              is a financial report that summarizes a company's revenues, costs, and expenses over a specific period 
              (quarter, year). It shows whether a company can generate profit by increasing revenue, reducing costs, 
              or both. Unlike a balance sheet, which is a snapshot at one point in time, the P&L tells the story of 
              business performance over time — <strong className="text-[#2563EB]">think of P&L as a video of performance, Balance Sheet as a photo</strong>.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock className="w-4 h-4" />
              <span>Updated May 2026</span>
              <span className="w-1 h-1 bg-[#6B7280] rounded-full"></span>
              <UserCheck className="w-4 h-4" />
              <span>Reviewed by Finance Professionals</span>
            </div>
          </div>
        </section>

        {/* ===== 5. KEY CONCEPTS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>📊 Key Concepts You Must Know</h2>
          <div className={styles.grid2Col}>
            {conceptsData.map((concept, idx) => (
              <ConceptCard key={idx} {...concept} />
            ))}
          </div>
        </section>

        {/* ===== 6. IMPORTANT FORMULAS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>📐 Important Formulas</h2>
          <div className={styles.grid3Col}>
            {formulasData.map((formula, idx) => (
              <FormulaCard key={idx} {...formula} />
            ))}
          </div>
        </section>

        {/* ===== 7. WHY IT MATTERS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>🎯 Why It Matters</h2>
          <div className={styles.grid4Col}>
            {whyItMattersData.map((item, idx) => (
              <WhyItMattersCard key={idx} {...item} />
            ))}
          </div>
        </section>

        {/* ===== 8. STEP-BY-STEP EXPLANATION ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>📋 How to Analyze a P&L Statement</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#EFF6FF] hidden md:block"></div>
            <div className="space-y-6">
              {[
                { step: "1", title: "Start with Revenue", desc: "Check year-over-year growth rate. Is it consistent? Above industry average?" },
                { step: "2", title: "Calculate Gross Profit Margin", desc: "Gross Profit / Revenue. Compare to competitors and historical trends." },
                { step: "3", title: "Analyze Operating Expenses", desc: "Are costs growing slower than revenue? Look for efficiency improvements." },
                { step: "4", title: "Review Operating Income", desc: "Profit from core business. Ignore one-time items for true performance." },
                { step: "5", title: "Check Net Income", desc: "Bottom line after everything. Watch for unusual tax events or interest costs." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className="w-10 h-10 bg-[#2563EB] text-white rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 z-10">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] mb-1">{item.title}</h3>
                    <p className="text-[#6B7280]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 9. REAL-WORLD EXAMPLE ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>🏢 Real-World Example</h2>
          <div className={`${styles.card} bg-gradient-to-r from-white to-[#F8FAFC]`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center">
                    <span className="text-black font-bold text-lg">A</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl">Apple Inc.</span>
                    <p className="text-sm text-[#6B7280]">Fiscal Year 2023</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Revenue</span>
                    <span className="font-semibold text-[#111827]">$383.3B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">COGS</span>
                    <span className="font-semibold text-[#111827]">($214.1B)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 font-medium">
                    <span className="text-[#111827]">Gross Profit</span>
                    <span className="text-[#10B981] font-bold">$169.2B (44.1%)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Operating Expenses</span>
                    <span className="font-semibold text-[#111827]">($54.9B)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 font-medium">
                    <span className="text-[#111827]">Operating Income</span>
                    <span className="text-[#10B981] font-bold">$114.3B</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#111827] font-bold">Net Income</span>
                    <span className="text-[#10B981] font-bold text-xl">$97.0B</span>
                  </div>
                </div>
              </div>
              <div className={styles.insightBox}>
                <Lightbulb className="w-6 h-6 text-[#2563EB] mb-2" />
                <h3 className="font-bold text-[#111827] mb-1">Key Insight</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  Apple's 44.1% gross margin shows strong pricing power and supply chain efficiency. 
                  The gap between gross and net margin (44.1% → 25.3%) reflects significant R&D and 
                  marketing investments — $30B annually.
                </p>
                <div className="mt-3 pt-2 border-t border-[#2563EB]/20">
                  <a href="/learn/financial-analysis/apple-case-study" className="text-sm text-[#2563EB] font-semibold hover:underline inline-flex items-center gap-1">
                    Deep dive into Apple's financials <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 10. COMMON MISTAKES ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>⚠️ Common Mistakes to Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonMistakesData.map((mistake, idx) => (
              <CommonMistake key={idx} {...mistake} />
            ))}
          </div>
        </section>

        {/* ===== 11. INTERVIEW QUESTIONS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>🎯 Common Interview Questions</h2>
          <div className="space-y-5">
            {interviewQuestionsData.map((item, idx) => (
              <div key={idx} className={`${styles.card} ${styles.cardHover}`}>
                <h3 className="text-xl font-bold text-[#111827] mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#2563EB]" />
                  {item.question}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 12. KEY TERMS GLOSSARY ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>📖 Key Terms Glossary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {keyTermsData.map((term, idx) => (
              <KeyTerm key={idx} {...term} />
            ))}
          </div>
        </section>

        {/* ===== 13. PRACTICE EXERCISE ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>✏️ Practice Exercise</h2>
          <div className={styles.card}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-[#EFF6FF] rounded-2xl">
                <Calculator className="w-7 h-7 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827] mb-1">Build a P&L from Scratch</h3>
                <p className="text-[#6B7280]">Use the data below to calculate Gross Profit, Operating Income, and Net Profit.</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-5">
              <h4 className="font-semibold text-[#111827] mb-3">Company Data (Q1 2025)</h4>
              <div className="space-y-1.5 font-mono text-sm">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Revenue</span>
                  <span className="font-semibold text-[#111827]">$2,500,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">COGS</span>
                  <span className="font-semibold text-[#111827]">$1,200,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Operating Expenses</span>
                  <span className="font-semibold text-[#111827]">$850,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Interest Expense</span>
                  <span className="font-semibold text-[#111827]">$50,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6B7280]">Tax Rate</span>
                  <span className="font-semibold text-[#111827]">25%</span>
                </div>
              </div>
            </div>
            
            <details className="group">
              <summary className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-black rounded-xl font-semibold cursor-pointer hover:bg-[#1f2937] transition-colors">
                <Eye className="w-4 h-4" />
                Show Answer
              </summary>
              <div className="mt-5 p-5 bg-[#EFF6FF] rounded-xl">
                <div className="space-y-1.5 font-mono text-[#111827]">
                  <p>Gross Profit = $2,500,000 - $1,200,000 = <strong className="text-[#10B981] text-lg">$1,300,000</strong></p>
                  <p>Operating Income = $1,300,000 - $850,000 = <strong className="text-[#10B981] text-lg">$450,000</strong></p>
                  <p>Pre-Tax Income = $450,000 - $50,000 = <strong className="text-[#10B981] text-lg">$400,000</strong></p>
                  <p>Net Profit = $400,000 × (1 - 0.25) = <strong className="text-[#10B981] text-lg">$300,000</strong></p>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* ===== 14. KEY TAKEAWAYS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>💡 Key Takeaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "P&L shows profitability over time, not just cash position",
              "Gross margin reveals pricing power and production efficiency",
              "Operating expenses should grow slower than revenue for scaling",
              "Always compare margins to industry peers, not absolute numbers",
              "Watch for one-time charges that distort true performance",
              "Combine P&L analysis with balance sheet for full picture"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                <span className="text-[#111827]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 15. FAQ SECTION ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>❓ Frequently Asked Questions</h2>
          <div className={`${styles.card} space-y-5`}>
            {faqsData.map((faq, idx) => (
              <FAQItem key={idx} {...faq} />
            ))}
          </div>
        </section>

        {/* ===== 16. RELATED LESSONS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>📚 Continue Your Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedLessonsData.map((lesson, idx) => (
              <RelatedLesson key={idx} {...lesson} />
            ))}
          </div>
        </section>

        {/* ===== 17. NEXT LESSON CTA ===== */}
        <div className="mb-10 flex justify-between items-center flex-wrap gap-4">
          <a href="/learn/financial-statements/balance-sheet" className="inline-flex items-center gap-3 px-6 py-3 bg-[#111827] text-black rounded-xl font-semibold hover:bg-[#1f2937] transition-colors group">
            Continue to Balance Sheet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-4">
            <a href="/learn/financial-statements/cash-flow-statement" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">Cash Flow →</a>
            <a href="/learn/financial-analysis/ratios" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">Financial Ratios →</a>
          </div>
        </div>
      </div>
      
      {/* ===== 18. FOOTER CTA ===== */}
      <div className="bg-[#0F172A] mt-10">
        <div className="max-w-[1280px] mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Start Your Financial Analyst Roadmap</h2>
          <p className="text-[#94A3B8] mb-6 max-w-2xl mx-auto">
            Master financial statements, valuation, and modeling with our structured learning path.
          </p>
          <a href="/roadmap" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-black rounded-xl font-semibold hover:bg-[#1D4ED8] transition-colors">
            View Full Curriculum
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}