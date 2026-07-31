// app/learning-hub/finance-fundamentals/cash-flow-statement/page.tsx
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
  LucideIcon,
  Scale,
  Landmark,
  Building,
  CreditCard,
  PiggyBank,
  BriefcaseIcon,
  LineChart,
  Factory,
  HandCoins,
  Banknote,
  RefreshCw,
  Ship,
  Plane
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
// STYLES - Same as other pages (Cash flow uses green/blue theme)
// ============================================================================
const styles = {
  container: "max-w-[1280px] mx-auto px-6 md:px-8 py-8 md:py-12",
  bgPrimary: "bg-[#F7F8FC]",
  textPrimary: "text-[#111827]",
  textSecondary: "text-[#6B7280]",
  textAccent: "text-[#10B981]",
  borderAccent: "border-[#10B981]",
  bgAccent: "bg-[#10B981]",
  bgAccentLight: "bg-[#ECFDF5]",
  card: "bg-white rounded-[28px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
  cardHover: "hover:shadow-[0_25px_55px_rgba(0,0,0,0.08)] transition-shadow duration-300",
  tag: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] text-[#10B981] text-sm font-semibold",
  sectionHeading: "text-3xl md:text-4xl font-bold text-[#111827] mb-5",
  bodyText: "text-lg text-[#111827] leading-relaxed",
  grid2Col: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3Col: "grid grid-cols-1 md:grid-cols-3 gap-6",
  grid4Col: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
  buttonDark: "inline-flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-2xl font-semibold hover:bg-[#1f2937] transition-colors",
  insightBox: "bg-[#ECFDF5] border-l-4 border-[#10B981] p-6 rounded-r-2xl",
  breadcrumb: "flex items-center gap-2 text-sm text-[#6B7280] mb-6 flex-wrap",
  breadcrumbLink: "hover:text-[#10B981] transition-colors",
  formulaCard: "bg-[#F8FAFC] rounded-2xl p-5 text-center border border-gray-100 hover:border-[#10B981]/20 transition-all",
};

// ============================================================================
// REUSABLE COMPONENTS - Same as other pages
// ============================================================================
const Tag: React.FC<TagProps> = ({ children, icon: Icon }) => (
  <span className={styles.tag}>
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </span>
);

const ConceptCard: React.FC<ConceptCardProps> = ({ icon: Icon, title, definition, example }) => (
  <div className={`${styles.card} ${styles.cardHover} h-full flex flex-col`}>
    <div className="w-12 h-12 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#10B981]" />
    </div>
    <h3 className="text-2xl font-bold text-[#111827] mb-2">{title}</h3>
    <p className="text-[#6B7280] leading-relaxed mb-3 flex-1">{definition}</p>
    <div className="pt-3 border-t border-gray-100">
      <span className="text-sm font-medium text-[#10B981]">📌 Example:</span>
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
    <div className="w-12 h-12 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-[#10B981]" />
    </div>
    <h3 className="text-xl font-bold text-[#111827] mb-1">{title}</h3>
    <p className="text-[#6B7280] text-sm leading-relaxed">{explanation}</p>
  </div>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
    <h3 className="text-xl font-semibold text-[#111827] mb-2 flex items-start gap-3">
      <HelpCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
      {question}
    </h3>
    <p className="text-[#6B7280] leading-relaxed pl-8">{answer}</p>
  </div>
);

const RelatedLesson: React.FC<RelatedLessonProps> = ({ title, duration, icon: Icon, href }) => (
  <a href={href} className={`${styles.card} ${styles.cardHover} h-[150px] flex flex-col justify-between group`}>
    <div>
      <div className="w-10 h-10 bg-[#ECFDF5] rounded-xl flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-[#10B981]" />
      </div>
      <h3 className="font-semibold text-[#111827] group-hover:text-[#10B981] transition-colors">{title}</h3>
    </div>
    <div className="flex items-center justify-between mt-2">
      <span className="text-sm text-[#6B7280]">{duration}</span>
      <ArrowRight className="w-4 h-4 text-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />
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
// MAIN PAGE COMPONENT - Cash Flow Statement
// ============================================================================
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cash Flow Statement Explained - Format & Analysis",
  description: "Learn how to read and analyze a cash flow statement — operating, investing, and financing activities explained with examples.",
  alternates: { canonical: "https://finlysta.com/learning-hub/finance-fundamentals/cash-flow-statement" },
  openGraph: {
    title: "Cash Flow Statement Explained - Format & Analysis | Finlysta",
    description: "Learn how to read and analyze a cash flow statement — operating, investing, and financing activities explained with examples.",
    url: "https://finlysta.com/learning-hub/finance-fundamentals/cash-flow-statement",
    images: [{ url: 'https://finlysta.com/og-image.png', width: 1200, height: 630, alt: "Cash Flow Statement Explained - Format & Analysis" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cash Flow Statement Explained - Format & Analysis | Finlysta",
    description: "Learn how to read and analyze a cash flow statement — operating, investing, and financing activities explained with examples.",
    images: ['https://finlysta.com/og-image.png'],
  },
};


export default function CashFlowStatementPage() {
  // Cash Flow Statement specific data
  const conceptsData: ConceptCardProps[] = [
    { icon: Factory, title: "Operating Activities", definition: "Cash generated from core business operations — selling products, paying suppliers, collecting payments.", example: "Cash received from customers, payments to suppliers, salaries, and taxes." },
    { icon: Building2, title: "Investing Activities", definition: "Cash used for long-term investments — buying/selling assets, equipment, or securities.", example: "Purchase of machinery, sale of property, acquisition of another company." },
    { icon: HandCoins, title: "Financing Activities", definition: "Cash from investors, banks, or paid to shareholders — debt and equity transactions.", example: "Bank loans, issuing shares, paying dividends, stock buybacks." },
    { icon: TrendingUp, title: "Free Cash Flow", definition: "Cash remaining after capital expenditures — available for expansion, debt, or dividends.", example: "Operating cash flow of $10M minus $3M in CapEx = $7M Free Cash Flow." }
  ];

  const formulasData: FormulaCardProps[] = [
    { formula: "Net Cash Flow = Cash Inflows - Cash Outflows", explanation: "The net increase or decrease in cash over a period." },
    { formula: "Free Cash Flow = Operating Cash Flow - CapEx", explanation: "Cash available for expansion, debt repayment, or dividends." },
    { formula: "Operating Cash Flow Ratio = OCF / Current Liabilities", explanation: "Measures ability to pay short-term obligations with operating cash." },
    { formula: "Cash Flow Margin = OCF / Revenue × 100", explanation: "Percentage of revenue converted to operating cash flow." },
    { formula: "CapEx Ratio = CapEx / Operating Cash Flow", explanation: "Shows what portion of OCF is reinvested in the business." }
  ];

  const whyItMattersData: WhyItMattersCardProps[] = [
    { icon: Banknote, title: "Measures Liquidity", explanation: "Shows if a company has enough cash to pay bills and operate daily." },
    { icon: TrendingUp, title: "Tracks Real Cash", explanation: "Unlike profit, cash flow can't be manipulated by accounting rules." },
    { icon: Shield, title: "Business Sustainability", explanation: "Negative operating cash flow signals potential business failure risk." },
    { icon: Users, title: "Investment Decisions", explanation: "Investors prefer companies with strong, consistent free cash flow." }
  ];

  const interviewQuestionsData: { question: string; answer: string }[] = [
    { question: "What's the difference between profit and cash flow?", answer: "Profit is an accounting concept (revenue minus expenses) that includes non-cash items like depreciation. Cash flow tracks actual money moving in and out. A company can show profit but have negative cash flow due to unpaid customer invoices or heavy inventory purchases. This is why cash flow is often called the 'real' measure of business health." },
    { question: "What is free cash flow and why is it important?", answer: "Free Cash Flow = Operating Cash Flow - Capital Expenditures. It's the cash left after maintaining and expanding the asset base. Companies with strong FCF can pay dividends, reduce debt, buy back shares, or fund acquisitions without external financing. Consistent positive FCF indicates financial strength and operational efficiency." },
    { question: "Why can profitable companies run out of cash?", answer: "Profitable companies fail due to poor cash flow management — causes include: slow customer payments (high receivables), excessive inventory, rapid growth requiring upfront costs, or paying suppliers faster than collecting from customers. Growing companies often need working capital that exceeds operating cash flow, leading to cash shortages despite profitability." }
  ];

  const faqsData: FAQItemProps[] = [
    { question: "What is a Cash Flow Statement vs a P&L Statement?", answer: "The P&L shows profitability using accounting rules (accrual accounting), while the Cash Flow Statement shows actual cash movement. A profitable company can still fail if customers don't pay on time. The cash flow statement reveals liquidity problems that profit reports hide. Both are essential for complete financial analysis." },
    { question: "What are the three sections of a cash flow statement?", answer: "Operating Activities: Core business cash flow (selling products, paying suppliers). Investing Activities: Buying/selling long-term assets (equipment, property). Financing Activities: Debt/equity transactions (loans, dividends, stock issuance). Together, they explain the total change in cash during a period." },
    { question: "Why is operating cash flow the most important section?", answer: "Operating cash flow comes from core business activities — sustainable, repeatable cash generation. Investing and financing activities are often one-time events. A company can survive with negative investing/financing cash flow but NOT with negative operating cash flow. Consistent positive OCF indicates a healthy, self-funding business." },
    { question: "What is a good free cash flow margin?", answer: "Free cash flow margin = Free Cash Flow / Revenue. 'Good' varies by industry: software companies often have 20-40% FCF margins due to low CapEx. Retailers might have 5-10%. Manufacturers typically have 10-15%. Compare to industry peers rather than absolute numbers. Positive and growing FCF margins signal improving efficiency." },
    { question: "Can negative cash flow be good?", answer: "Yes, in certain contexts. Growing companies often have negative investing cash flow (buying equipment for expansion). Startups have negative operating cash flow as they build market share. But negative operating cash flow in mature companies is dangerous. Always analyze the cause — growth investments vs operational problems." },
    { question: "What's the difference between direct and indirect cash flow methods?", answer: "Direct method lists actual cash receipts and payments (customer payments, supplier payments). Indirect method starts with net income and adjusts for non-cash items (depreciation, working capital changes). Most public companies use the indirect method because it reconciles with the P&L statement. Both methods produce the same final cash flow number." }
  ];

  const keyTermsData: KeyTermProps[] = [
    { term: "Operating Cash Flow", definition: "Cash from core business operations — selling products, paying bills." },
    { term: "Free Cash Flow", definition: "Operating cash flow minus capital expenditures — available cash." },
    { term: "CapEx", definition: "Capital Expenditures — money spent on long-term assets like equipment." },
    { term: "Liquidity", definition: "Ability to pay short-term obligations with available cash." },
    { term: "Cash Equivalents", definition: "Short-term, highly liquid investments easily converted to cash." },
    { term: "Working Capital", definition: "Current assets minus current liabilities — operational liquidity measure." },
    { term: "Burn Rate", definition: "Rate at which a company spends cash before generating positive flow." },
    { term: "Runway", definition: "How long a company can operate before running out of cash." }
  ];

  const commonMistakesData: CommonMistakeProps[] = [
    { mistake: "Confusing profit with cash flow", correction: "Profit includes non-cash items like depreciation. Cash flow shows actual money available to pay bills." },
    { mistake: "Ignoring negative operating cash flow", correction: "Persistent negative OCF signals business failure risk, regardless of reported profits." },
    { mistake: "Overlooking capital expenditures", correction: "CapEx reduces free cash flow — essential for maintenance and growth sustainability." },
    { mistake: "Ignoring financing dependency", correction: "Companies needing constant financing may be unsustainable. Focus on operating cash flow." }
  ];

  const relatedLessonsData: RelatedLessonProps[] = [
    { title: "Profit & Loss Statement", duration: "12 min", icon: TrendingUp, href: "/learning-hub/finance-fundamentals/profit-loss-statement" },
    { title: "Balance Sheet", duration: "14 min", icon: Scale, href: "/learning-hub/finance-fundamentals/balance-sheet" },
    { title: "Financial Ratios Masterclass", duration: "25 min", icon: Percent, href: "/learning-hub/financial-analysis/ratios" },
    { title: "Free Cash Flow Deep Dive", duration: "18 min", icon: Banknote, href: "/learning-hub/financial-analysis/free-cash-flow" },
    { title: "Working Capital Management", duration: "20 min", icon: RefreshCw, href: "/learning-hub/financial-analysis/working-capital" },
    { title: "Financial Modeling Basics", duration: "30 min", icon: PieChart, href: "/learning-hub/modeling/basics" }
  ];

  return (
    <div className={`${styles.bgPrimary} min-h-screen`}>
      <div className={styles.container}>
        
        {/* ===== 1. BREADCRUMB ===== */}
        <div className={styles.breadcrumb}>
          <a href="/" className={styles.breadcrumbLink}>Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/learning-hub" className={styles.breadcrumbLink}>Learn</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/learning-hub/finance-fundamentals" className={styles.breadcrumbLink}>Financial Statements</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111827] font-medium">Cash Flow Statement</span>
        </div>

        {/* ===== 2. HERO SECTION - Premium Gradient Background (Green/Blue theme) ===== */}
        <div className="relative overflow-hidden rounded-[32px] mb-12 bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#0F172A]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Left side - Content */}
            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                <Tag>📘 Beginner</Tag>
                <Tag icon={Clock}>16 min read</Tag>
                <Tag icon={BookOpen}>Cash Management</Tag>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-black leading-[1.1] max-w-[700px] mb-5 relative z-10 tracking-[-0.02em]">
                Cash Flow Statement Explained for Beginners
              </h1>
              
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-[620px] mb-6">
                Learn how businesses track cash inflows and outflows using operating, investing, and financing activities with real-world examples.
              </p>
              
              {/* Learning stats */}
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
                    <Calculator className="w-5 h-5 text-[#10B981]" />
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
            
            {/* Right side - Cash Flow Visual Diagram */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="space-y-2">
                  {/* Operating Activities Box */}
                  <div className="bg-[#DBEAFE] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <Factory className="w-5 h-5 text-[#1E40AF]" />
                      <span className="font-bold text-[#1E40AF] text-sm">OPERATING ACTIVITIES</span>
                    </div>
                    <p className="text-xl font-bold text-[#1E40AF]">+$850,000</p>
                    <p className="text-xs text-[#1E40AF] mt-0.5">Core business cash flow</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* Investing Activities Box */}
                  <div className="bg-[#FEE2E2] rounded-xl p-3 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <Building2 className="w-5 h-5 text-[#991B1B]" />
                      <span className="font-bold text-[#991B1B] text-sm">INVESTING ACTIVITIES</span>
                    </div>
                    <p className="text-xl font-bold text-[#991B1B]">($300,000)</p>
                    <p className="text-xs text-[#991B1B] mt-0.5">Equipment purchases</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* Financing Activities Box */}
                  <div className="bg-[#FEF3C7] rounded-xl p-3 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <HandCoins className="w-5 h-5 text-[#92400E]" />
                      <span className="font-bold text-[#92400E] text-sm">FINANCING ACTIVITIES</span>
                    </div>
                    <p className="text-xl font-bold text-[#92400E]">+$100,000</p>
                    <p className="text-xs text-[#92400E] mt-0.5">Bank loan</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  {/* Net Cash Flow Box */}
                  <div className="bg-[#DCFCE7] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <Banknote className="w-5 h-5 text-[#166534]" />
                      <span className="font-bold text-[#166534] text-sm">NET CASH FLOW</span>
                    </div>
                    <p className="text-xl font-bold text-[#166534]">+$650,000</p>
                    <p className="text-xs text-[#166534] mt-0.5">Overall increase</p>
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
              "Understand cash inflows and outflows from business activities",
              "Read and interpret any company's cash flow statement",
              "Analyze business liquidity and cash generation ability",
              "Differentiate between profit vs actual cash flow",
              "Identify healthy cash-generating businesses",
              "Evaluate operational efficiency through cash metrics"
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
              <FileText className="w-7 h-7 text-[#10B981]" />
              <h2 className="text-2xl font-bold text-[#111827]">What Is a Cash Flow Statement?</h2>
            </div>
            <p className="text-[#111827] leading-relaxed">
              A <strong className="text-[#111827]">Cash Flow Statement</strong> is a financial report that tracks how 
              <strong className="text-[#10B981]"> cash enters and leaves a business</strong> during a specific period. 
              Unlike the P&L statement (which uses accrual accounting), the cash flow statement shows actual money movement 
              — critical for understanding liquidity and survival. It's divided into three sections: 
              <strong className="text-[#10B981]"> Operating, Investing, and Financing Activities</strong>. 
              Think of it as the business's checkbook register.
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
          <h2 className={styles.sectionHeading}>📋 How to Analyze a Cash Flow Statement</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#ECFDF5] hidden md:block"></div>
            <div className="space-y-6">
              {[
                { step: "1", title: "Start with Operating Cash Flow", desc: "Is OCF positive and growing? This is the most important section — core business health." },
                { step: "2", title: "Review Investing Activities", desc: "Is the company investing in future growth (CapEx) or selling assets to fund operations?" },
                { step: "3", title: "Check Financing Activities", desc: "Is the company raising debt/equity or paying down obligations? Dividend trends?" },
                { step: "4", title: "Compare Cash Flow vs Net Income", desc: "Large gaps suggest aggressive accounting or working capital issues." },
                { step: "5", title: "Evaluate Free Cash Flow Trends", desc: "Consistent positive FCF indicates financial strength and dividend potential." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className="w-10 h-10 bg-[#10B981] text-white rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 z-10">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl">Apple Inc.</span>
                    <p className="text-sm text-[#6B7280]">Fiscal Year 2023</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Operating Cash Flow</span>
                    <span className="font-semibold text-[#111827]">$110.5B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Capital Expenditures (CapEx)</span>
                    <span className="font-semibold text-[#111827]">($10.9B)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 font-medium">
                    <span className="text-[#111827]">Free Cash Flow</span>
                    <span className="text-[#10B981] font-bold">$99.6B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Net Income</span>
                    <span className="font-semibold text-[#111827]">$97.0B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Investing Cash Flow</span>
                    <span className="font-semibold text-[#111827]">($12.5B)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#6B7280]">Financing Cash Flow</span>
                    <span className="font-semibold text-[#111827]">($108.0B)</span>
                  </div>
                </div>
              </div>
              <div className={styles.insightBox}>
                <Lightbulb className="w-6 h-6 text-[#10B981] mb-2" />
                <h3 className="font-bold text-[#111827] mb-1">Key Insight</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  Apple generates massive operating cash flow ($110.5B) and free cash flow ($99.6B). 
                  Note the large negative financing cash flow ($108B) — Apple returns most cash to 
                  shareholders through dividends and buybacks. Operating cash flow exceeds net income 
                  ($110.5B vs $97B), showing conservative accounting and strong cash conversion.
                </p>
                <div className="mt-3 pt-2 border-t border-[#10B981]/20">
                  <a href="/learning-hub/financial-analysis/apple-cash-flow" className="text-sm text-[#10B981] font-semibold hover:underline inline-flex items-center gap-1">
                    Deep dive into Apple's cash flow <ArrowRight className="w-3 h-3" />
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
                  <Briefcase className="w-5 h-5 text-[#10B981]" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
              <div className="p-3 bg-[#ECFDF5] rounded-2xl">
                <Calculator className="w-7 h-7 text-[#10B981]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827] mb-1">Cash Flow Analysis</h3>
                <p className="text-[#6B7280]">Use the data below to calculate Free Cash Flow and Operating Cash Flow Ratio.</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-5">
              <h4 className="font-semibold text-[#111827] mb-3">Company Data (Q1 2025)</h4>
              <div className="space-y-1.5 font-mono text-sm">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Operating Cash Flow</span>
                  <span className="font-semibold text-[#111827]">$12,000,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Capital Expenditures (CapEx)</span>
                  <span className="font-semibold text-[#111827]">$4,000,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6B7280]">Current Liabilities</span>
                  <span className="font-semibold text-[#111827]">$6,000,000</span>
                </div>
              </div>
            </div>
            
            <details className="group">
              <summary className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-black rounded-xl font-semibold cursor-pointer hover:bg-[#1f2937] transition-colors">
                <Eye className="w-4 h-4" />
                Show Answer
              </summary>
              <div className="mt-5 p-5 bg-[#ECFDF5] rounded-xl">
                <div className="space-y-1.5 font-mono text-[#111827]">
                  <p>Free Cash Flow = $12,000,000 - $4,000,000 = <strong className="text-[#10B981] text-lg">$8,000,000</strong></p>
                  <p>Operating Cash Flow Ratio = $12,000,000 / $6,000,000 = <strong className="text-[#10B981] text-lg">2.0</strong></p>
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
              "Cash flow measures actual money movement — more reliable than profit",
              "Positive operating cash flow is critical for business survival",
              "Free cash flow indicates financial strength and dividend potential",
              "Profit does not always equal cash generation — understand the differences",
              "Compare cash flow to net income — large gaps suggest aggressive accounting",
              "Cash flow statements reveal liquidity problems that P&L statements hide"
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
          <a href="/learning-hub/finance-fundamentals/financial-ratios" className="inline-flex items-center gap-3 px-6 py-3 bg-[#111827] text-black rounded-xl font-semibold hover:bg-[#1f2937] transition-colors group">
            Continue to Financial Ratios
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-4">
            <a href="/learning-hub/finance-fundamentals/profit-loss-statement" className="text-sm text-[#6B7280] hover:text-[#10B981] transition-colors">P&L Statement →</a>
            <a href="/learning-hub/finance-fundamentals/balance-sheet" className="text-sm text-[#6B7280] hover:text-[#10B981] transition-colors">Balance Sheet →</a>
          </div>
        </div>
      </div>
      
      {/* ===== 18. FOOTER CTA ===== */}
      <div className="bg-gradient-to-br from-[#064E3B] to-[#0F172A] mt-10">
        <div className="max-w-[1280px] mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Start Your Financial Analyst Roadmap</h2>
          <p className="text-[#94A3B8] mb-6 max-w-2xl mx-auto">
            Master financial statements, valuation, and modeling with our structured learning path.
          </p>
          <a href="/roadmap" className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-colors">
            View Full Curriculum
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
