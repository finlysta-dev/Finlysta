// app/learn/financial-statements/balance-sheet/page.tsx
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
  LineChart
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
// STYLES - Same as P&L page
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
// REUSABLE COMPONENTS - Same as P&L page
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
// MAIN PAGE COMPONENT - Balance Sheet
// ============================================================================
export default function BalanceSheetPage() {
  // Balance Sheet specific data
  const conceptsData: ConceptCardProps[] = [
    { icon: Wallet, title: "Assets", definition: "Resources owned by a company that have economic value and can be converted to cash.", example: "Cash, inventory, buildings, patents, and accounts receivable." },
    { icon: CreditCard, title: "Liabilities", definition: "Obligations and debts owed by a company to others, settled over time.", example: "Bank loans, accounts payable, mortgages, and bonds payable." },
    { icon: Users, title: "Shareholder Equity", definition: "Residual interest in assets after deducting liabilities; owners' claim.", example: "Common stock, retained earnings, and additional paid-in capital." },
    { icon: TrendingUp, title: "Working Capital", definition: "Difference between current assets and current liabilities.", example: "Positive working capital ($500k assets - $300k liabilities = $200k)." }
  ];

  const formulasData: FormulaCardProps[] = [
    { formula: "Assets = Liabilities + Shareholder Equity", explanation: "The fundamental accounting equation that must always balance." },
    { formula: "Working Capital = Current Assets - Current Liabilities", explanation: "Measures short-term financial health and liquidity." },
    { formula: "Current Ratio = Current Assets / Current Liabilities", explanation: "Liquidity ratio measuring ability to pay short-term obligations." },
    { formula: "Debt to Equity Ratio = Total Liabilities / Shareholder Equity", explanation: "Shows financial leverage and risk level." },
    { formula: "Book Value = Total Assets - Total Liabilities", explanation: "Net asset value of a company if liquidated today." }
  ];

  const whyItMattersData: WhyItMattersCardProps[] = [
    { icon: Shield, title: "Financial Stability", explanation: "Shows if a company can survive economic downturns and unexpected expenses." },
    { icon: TrendingUp, title: "Liquidity Analysis", explanation: "Indicates ability to pay short-term bills and manage cash flow." },
    { icon: Scale, title: "Debt Evaluation", explanation: "Reveals how much debt a company uses to finance operations." },
    { icon: Users, title: "Investment Decisions", explanation: "Helps investors assess risk and potential returns before investing." }
  ];

  const interviewQuestionsData: { question: string; answer: string }[] = [
    { question: "What's the difference between assets and liabilities?", answer: "Assets are what a company OWNS (cash, inventory, property) that provide future economic benefit. Liabilities are what a company OWES (loans, accounts payable, debt) to others. The difference between them is shareholder equity. A healthy company typically has more assets than liabilities, creating positive equity for owners." },
    { question: "What is working capital and why does it matter?", answer: "Working capital = Current Assets - Current Liabilities. It measures a company's operational efficiency and short-term financial health. Positive working capital means a company can pay its upcoming bills and invest in growth. Negative working capital might indicate cash flow problems or potential bankruptcy risk in severe cases." },
    { question: "What does negative shareholder equity mean?", answer: "Negative shareholder equity occurs when total liabilities exceed total assets. This means the company owes more than it owns. Often caused by sustained losses, excessive debt, or large dividend payments. It's a serious red flag for investors, suggesting potential insolvency or bankruptcy risk if not addressed quickly." }
  ];

  const faqsData: FAQItemProps[] = [
    { question: "What is a Balance Sheet vs a P&L Statement?", answer: "A Balance Sheet shows financial position at a SPECIFIC point in time — assets, liabilities, and equity. Think of it as a financial photo. A P&L Statement shows performance OVER a period — revenue, expenses, and profit. Think of it as a financial video. Both are essential for complete financial analysis." },
    { question: "How often should companies prepare balance sheets?", answer: "Public companies file balance sheets quarterly (10-Q) and annually (10-K). Private companies typically prepare monthly for management, quarterly for board reporting, and annually for taxes. Startups often review weekly to monitor cash burn and runway. Even small businesses benefit from quarterly balance sheets." },
    { question: "What are current vs non-current assets?", answer: "Current assets convert to cash within ONE YEAR — cash, inventory, accounts receivable. Non-current assets are long-term — property, equipment, patents, goodwill. The distinction matters for liquidity analysis. A company with mostly non-current assets might struggle to pay immediate bills despite high total assets." },
    { question: "What is a good current ratio?", answer: "A current ratio above 1.0 means current assets exceed current liabilities. Industry standards vary: 1.5-3.0 is generally healthy. Below 1.0 signals potential liquidity problems. Above 5.0 might indicate inefficient use of cash. Compare to industry peers rather than absolute numbers." },
    { question: "What does a high debt-to-equity ratio indicate?", answer: "Debt-to-equity above 2.0 (200%) suggests aggressive leverage. This can amplify returns in good times but increases bankruptcy risk during downturns. Capital-intensive industries (utilities, manufacturing) typically have higher ratios. Tech companies often have lower ratios. Compare within the same industry." },
    { question: "What is retained earnings?", answer: "Retained earnings are cumulative profits reinvested in the business rather than paid as dividends. It's part of shareholder equity. Growing retained earnings usually signal profitable operations. Companies with negative retained earnings have accumulated losses over time, which concerns investors about long-term viability." }
  ];

  const keyTermsData: KeyTermProps[] = [
    { term: "Assets", definition: "Resources owned with economic value — cash, inventory, property." },
    { term: "Liabilities", definition: "Obligations and debts owed to others — loans, payables." },
    { term: "Shareholder Equity", definition: "Owners' claim after liabilities — common stock, retained earnings." },
    { term: "Current Assets", definition: "Assets convertible to cash within one year." },
    { term: "Current Liabilities", definition: "Obligations due within one year." },
    { term: "Working Capital", definition: "Current assets minus current liabilities — liquidity measure." },
    { term: "Liquidity", definition: "Ability to pay short-term obligations quickly." },
    { term: "Solvency", definition: "Ability to meet long-term debt obligations." }
  ];

  const commonMistakesData: CommonMistakeProps[] = [
    { mistake: "Ignoring debt levels", correction: "Always analyze total debt and debt-to-equity ratio, not just assets." },
    { mistake: "Looking only at revenue", correction: "Revenue doesn't show financial health — balance sheet reveals true stability." },
    { mistake: "Confusing assets with profit", correction: "High assets don't equal profit — companies can be asset-rich but cash-poor." },
    { mistake: "Ignoring liquidity", correction: "Current ratio and working capital matter more than total asset value for survival." }
  ];

  const relatedLessonsData: RelatedLessonProps[] = [
    { title: "Profit & Loss Statement", duration: "12 min", icon: TrendingUp, href: "/learn/financial-statements/profit-loss-statement" },
    { title: "Cash Flow Statement", duration: "18 min", icon: Activity, href: "/learn/financial-statements/cash-flow-statement" },
    { title: "Financial Ratios Masterclass", duration: "25 min", icon: Percent, href: "/learn/financial-analysis/ratios" },
    { title: "Working Capital Management", duration: "20 min", icon: Wallet, href: "/learn/financial-analysis/working-capital" },
    { title: "Debt-to-Equity Deep Dive", duration: "15 min", icon: Scale, href: "/learn/financial-analysis/debt-to-equity" },
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
          <span className="text-[#111827] font-medium">Balance Sheet</span>
        </div>

        {/* ===== 2. HERO SECTION - Premium Gradient Background ===== */}
        <div className="relative overflow-hidden rounded-[32px] mb-12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Left side - Content */}
            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                <Tag>📘 Beginner</Tag>
                <Tag icon={Clock}>14 min read</Tag>
                <Tag icon={BookOpen}>Finance Basics</Tag>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] max-w-[700px] mb-5 relative z-10 tracking-[-0.02em]">
                Balance Sheet Explained for Beginners
              </h1>
              
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-[620px] mb-6">
                Learn how businesses track assets, liabilities, and shareholder equity using real-world balance sheet examples and practical financial analysis.
              </p>
              
              {/* Learning stats */}
              <div className="flex flex-wrap gap-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    <p className="text-lg font-bold text-white">4</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">Key Concepts</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#2563EB]" />
                    <p className="text-lg font-bold text-white">5</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">Formulas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#FF8A00]" />
                    <p className="text-lg font-bold text-white">6</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">FAQs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#10B981]" />
                    <p className="text-lg font-bold text-white">3</p>
                  </div>
                  <p className="text-xs text-[#94A3B8]">Interview Qs</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Balance Sheet Visual Diagram */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="space-y-2">
                  {/* Assets Box */}
                  <div className="bg-[#DBEAFE] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <Wallet className="w-5 h-5 text-[#1E40AF]" />
                      <span className="font-bold text-[#1E40AF] text-sm">ASSETS</span>
                    </div>
                    <p className="text-xl font-bold text-[#1E40AF]">$1,000,000</p>
                    <p className="text-xs text-[#1E40AF] mt-0.5">What company OWNS</p>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-[#94A3B8] text-sm font-bold">=</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Liabilities Box */}
                    <div className="bg-[#FEE2E2] rounded-xl p-3 text-center shadow-lg">
                      <div className="flex items-center justify-center gap-2 mb-0.5">
                        <CreditCard className="w-5 h-5 text-[#991B1B]" />
                        <span className="font-bold text-[#991B1B] text-sm">LIABILITIES</span>
                      </div>
                      <p className="text-xl font-bold text-[#991B1B]">$600,000</p>
                      <p className="text-xs text-[#991B1B] mt-0.5">What company OWES</p>
                    </div>
                    {/* Equity Box */}
                    <div className="bg-[#DCFCE7] rounded-xl p-3 text-center shadow-lg">
                      <div className="flex items-center justify-center gap-2 mb-0.5">
                        <Users className="w-5 h-5 text-[#166534]" />
                        <span className="font-bold text-[#166534] text-sm">EQUITY</span>
                      </div>
                      <p className="text-xl font-bold text-[#166534]">$400,000</p>
                      <p className="text-xs text-[#166534] mt-0.5">Owners' claim</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-[#94A3B8] text-xs">Assets = Liabilities + Equity</span>
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
              "Understand assets, liabilities, and shareholder equity",
              "Read and interpret any company balance sheet",
              "Calculate working capital and liquidity ratios",
              "Analyze financial health and debt levels",
              "Use balance sheets for investment decisions",
              "Spot red flags in company financial statements"
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
              <h2 className="text-2xl font-bold text-[#111827]">What Is a Balance Sheet?</h2>
            </div>
            <p className="text-[#111827] leading-relaxed">
              A <strong className="text-[#111827]">Balance Sheet</strong> is a financial statement that shows a company's 
              <strong className="text-[#2563EB]"> assets, liabilities, and shareholder equity</strong> at a specific point in time — 
              like a financial snapshot or photo. Unlike a P&L statement that shows performance over time, the balance sheet 
              reveals what a company OWNS and OWES on a single day. The fundamental equation always balances: 
              <strong className="text-[#10B981]"> Assets = Liabilities + Equity</strong>. This equality is why it's called a "balance" sheet.
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
          <h2 className={styles.sectionHeading}>📋 How to Analyze a Balance Sheet</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#EFF6FF] hidden md:block"></div>
            <div className="space-y-6">
              {[
                { step: "1", title: "Check Total Assets", desc: "Are assets growing year-over-year? What types of assets dominate (cash vs property)?" },
                { step: "2", title: "Review Liabilities", desc: "How much debt? Is it short-term or long-term? Compare debt to equity ratio." },
                { step: "3", title: "Analyze Shareholder Equity", desc: "Is equity growing? Check retained earnings trends over multiple years." },
                { step: "4", title: "Calculate Liquidity Ratios", desc: "Current ratio and working capital show ability to pay short-term bills." },
                { step: "5", title: "Compare Industry Benchmarks", desc: "A 2.0 current ratio might be excellent or poor depending on industry." }
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
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl">Apple Inc.</span>
                    <p className="text-sm text-[#6B7280]">Fiscal Year 2023</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Total Assets</span>
                    <span className="font-semibold text-[#111827]">$352.6B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Total Liabilities</span>
                    <span className="font-semibold text-[#111827]">$290.4B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 font-medium">
                    <span className="text-[#111827]">Shareholder Equity</span>
                    <span className="text-[#10B981] font-bold">$62.2B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Cash Reserves</span>
                    <span className="font-semibold text-[#111827]">$61.6B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#6B7280]">Long-term Debt</span>
                    <span className="font-semibold text-[#111827]">$98.2B</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#111827] font-bold">Current Ratio</span>
                    <span className="text-[#10B981] font-bold">0.99</span>
                  </div>
                </div>
              </div>
              <div className={styles.insightBox}>
                <Lightbulb className="w-6 h-6 text-[#2563EB] mb-2" />
                <h3 className="font-bold text-[#111827] mb-1">Key Insight</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  Apple's balance sheet shows massive cash reserves ($61.6B) but also high long-term debt ($98.2B). 
                  The current ratio of 0.99 suggests potential short-term pressure, but their brand strength and 
                  cash flow generation mitigate this risk. Shareholder equity of $62.2B represents owner value.
                </p>
                <div className="mt-3 pt-2 border-t border-[#2563EB]/20">
                  <a href="/learn/financial-analysis/apple-balance-sheet" className="text-sm text-[#2563EB] font-semibold hover:underline inline-flex items-center gap-1">
                    Deep dive into Apple's balance sheet <ArrowRight className="w-3 h-3" />
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
              <div className="p-3 bg-[#EFF6FF] rounded-2xl">
                <Calculator className="w-7 h-7 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827] mb-1">Balance Sheet Analysis</h3>
                <p className="text-[#6B7280]">Use the data below to calculate Shareholder Equity, Working Capital, and Current Ratio.</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-5">
              <h4 className="font-semibold text-[#111827] mb-3">Company Data (Dec 31, 2025)</h4>
              <div className="space-y-1.5 font-mono text-sm">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Total Assets</span>
                  <span className="font-semibold text-[#111827]">$5,000,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Total Liabilities</span>
                  <span className="font-semibold text-[#111827]">$2,500,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Current Assets</span>
                  <span className="font-semibold text-[#111827]">$1,200,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6B7280]">Current Liabilities</span>
                  <span className="font-semibold text-[#111827]">$800,000</span>
                </div>
              </div>
            </div>
            
            <details className="group">
              <summary className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white rounded-xl font-semibold cursor-pointer hover:bg-[#1f2937] transition-colors">
                <Eye className="w-4 h-4" />
                Show Answer
              </summary>
              <div className="mt-5 p-5 bg-[#EFF6FF] rounded-xl">
                <div className="space-y-1.5 font-mono text-[#111827]">
                  <p>Shareholder Equity = $5,000,000 - $2,500,000 = <strong className="text-[#10B981] text-lg">$2,500,000</strong></p>
                  <p>Working Capital = $1,200,000 - $800,000 = <strong className="text-[#10B981] text-lg">$400,000</strong></p>
                  <p>Current Ratio = $1,200,000 / $800,000 = <strong className="text-[#10B981] text-lg">1.5</strong></p>
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
              "Balance sheet shows financial position at a specific point in time (a photo)",
              "Assets must always equal liabilities plus shareholder equity",
              "Liquidity ratios measure ability to pay short-term obligations",
              "High debt levels increase financial risk and bankruptcy probability",
              "Compare balance sheet metrics to industry peers for context",
              "Track balance sheet trends over multiple years for meaningful insights"
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
          <a href="/learn/financial-statements/cash-flow-statement" className="inline-flex items-center gap-3 px-6 py-3 bg-[#111827] text-white rounded-xl font-semibold hover:bg-[#1f2937] transition-colors group">
            Continue to Cash Flow Statement
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-4">
            <a href="/learn/financial-statements/profit-loss-statement" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">P&L Statement →</a>
            <a href="/learn/financial-analysis/ratios" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">Financial Ratios →</a>
          </div>
        </div>
      </div>
      
      {/* ===== 18. FOOTER CTA ===== */}
      <div className="bg-[#0F172A] mt-10">
        <div className="max-w-[1280px] mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Start Your Financial Analyst Roadmap</h2>
          <p className="text-[#94A3B8] mb-6 max-w-2xl mx-auto">
            Master financial statements, valuation, and modeling with our structured learning path.
          </p>
          <a href="/roadmap" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition-colors">
            View Full Curriculum
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}