// app/learning-hub/financial-analysis/ratios/page.tsx
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
  Plane,
  Gauge,
  ChartBar,
  ChartLine,
  ChartPie,
  Hexagon,
  BadgeDollarSign,
  BarChart,
  CircleDollarSign,
  ArrowLeftRight,
  Sparkles,
  GanttChart,
  Sigma,
  Table,
  TrendingUpDown,
  CandlestickChart,
  Radar,
  Compass
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
  goodRange?: string;
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
// STYLES - Analytical theme (Blue/Purple)
// ============================================================================
const styles = {
  container: "max-w-[1280px] mx-auto px-6 md:px-8 py-8 md:py-12",
  bgPrimary: "bg-[#F7F8FC]",
  textPrimary: "text-[#111827]",
  textSecondary: "text-[#6B7280]",
  textAccent: "text-[#7C3AED]",
  borderAccent: "border-[#7C3AED]",
  bgAccent: "bg-gradient-to-r from-[#2563EB] to-[#7C3AED]",
  bgAccentLight: "bg-[#F5F3FF]",
  card: "bg-white rounded-[28px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
  cardHover: "hover:shadow-[0_25px_55px_rgba(0,0,0,0.08)] transition-shadow duration-300",
  tag: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3FF] text-[#7C3AED] text-sm font-semibold",
  sectionHeading: "text-3xl md:text-4xl font-bold text-[#111827] mb-5",
  bodyText: "text-lg text-[#111827] leading-relaxed",
  grid2Col: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3Col: "grid grid-cols-1 md:grid-cols-3 gap-6",
  grid4Col: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
  buttonDark: "inline-flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-2xl font-semibold hover:bg-[#1f2937] transition-colors",
  insightBox: "bg-[#F5F3FF] border-l-4 border-[#7C3AED] p-6 rounded-r-2xl",
  breadcrumb: "flex items-center gap-2 text-sm text-[#6B7280] mb-6 flex-wrap",
  breadcrumbLink: "hover:text-[#7C3AED] transition-colors",
  formulaCard: "bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-5 text-center border border-gray-100 hover:border-[#7C3AED]/20 transition-all hover:shadow-md",
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
    <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#7C3AED]" />
    </div>
    <h3 className="text-2xl font-bold text-[#111827] mb-2">{title}</h3>
    <p className="text-[#6B7280] leading-relaxed mb-3 flex-1">{definition}</p>
    <div className="pt-3 border-t border-gray-100">
      <span className="text-sm font-medium text-[#7C3AED]">📌 Example:</span>
      <p className="text-sm text-[#6B7280] mt-1">{example}</p>
    </div>
  </div>
);

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, explanation, goodRange }) => (
  <div className={styles.formulaCard}>
    <div className="text-3xl mb-2">📐</div>
    <p className="text-base md:text-lg font-mono font-bold text-[#111827] mb-2">{formula}</p>
    <p className="text-[#6B7280] text-xs mb-2">{explanation}</p>
    {goodRange && (
      <div className="mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs font-semibold text-[#7C3AED]">Ideal Range:</span>
        <span className="text-xs text-[#6B7280] ml-1">{goodRange}</span>
      </div>
    )}
  </div>
);

const WhyItMattersCard: React.FC<WhyItMattersCardProps> = ({ icon: Icon, title, explanation }) => (
  <div className={`${styles.card} ${styles.cardHover} text-center h-full`}>
    <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-[#7C3AED]" />
    </div>
    <h3 className="text-xl font-bold text-[#111827] mb-1">{title}</h3>
    <p className="text-[#6B7280] text-sm leading-relaxed">{explanation}</p>
  </div>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
    <h3 className="text-xl font-semibold text-[#111827] mb-2 flex items-start gap-3">
      <HelpCircle className="w-5 h-5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
      {question}
    </h3>
    <p className="text-[#6B7280] leading-relaxed pl-8">{answer}</p>
  </div>
);

const RelatedLesson: React.FC<RelatedLessonProps> = ({ title, duration, icon: Icon, href }) => (
  <a href={href} className={`${styles.card} ${styles.cardHover} h-[150px] flex flex-col justify-between group`}>
    <div>
      <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-xl flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-[#7C3AED]" />
      </div>
      <h3 className="font-semibold text-[#111827] group-hover:text-[#7C3AED] transition-colors">{title}</h3>
    </div>
    <div className="flex items-center justify-between mt-2">
      <span className="text-sm text-[#6B7280]">{duration}</span>
      <ArrowRight className="w-4 h-4 text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </a>
);

const KeyTerm: React.FC<KeyTermProps> = ({ term, definition }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#7C3AED]/20 transition-all">
    <h4 className="font-bold text-[#111827] mb-1 flex items-center gap-2">
      <BadgeDollarSign className="w-4 h-4 text-[#7C3AED]" />
      {term}
    </h4>
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
// MAIN PAGE COMPONENT - Financial Ratios
// ============================================================================
export default function FinancialRatiosPage() {
  // Financial Ratios specific data
  const conceptsData: ConceptCardProps[] = [
    { icon: TrendingUp, title: "Profitability Ratios", definition: "Measure a company's ability to generate profit relative to revenue, assets, or equity.", example: "Net Profit Margin (20% means $0.20 profit per $1 revenue)." },
    { icon: Gauge, title: "Liquidity Ratios", definition: "Measure short-term financial health and ability to pay immediate obligations.", example: "Current Ratio of 2.0 means $2 of assets for every $1 of liabilities." },
    { icon: GanttChart, title: "Efficiency Ratios", definition: "Measure how effectively a company uses its assets and manages operations.", example: "Inventory Turnover of 6 means inventory sells and replaces 6x per year." },
    { icon: Scale, title: "Leverage Ratios", definition: "Measure the extent of debt financing and financial risk.", example: "Debt-to-Equity of 1.5 means $1.50 debt for every $1 of equity." },
    { icon: CircleDollarSign, title: "Valuation Ratios", definition: "Measure market value relative to earnings, sales, or book value.", example: "P/E Ratio of 20 means investors pay $20 for each $1 of earnings." },
    { icon: Award, title: "Return Ratios", definition: "Measure returns generated on investments, assets, or equity.", example: "ROE of 15% means $0.15 profit per $1 of shareholder equity." }
  ];

  const formulasData: FormulaCardProps[] = [
    { formula: "Current Ratio = Current Assets / Current Liabilities", explanation: "Liquidity ratio measuring ability to pay short-term obligations.", goodRange: "1.5 - 3.0" },
    { formula: "Net Profit Margin = (Net Profit / Revenue) × 100", explanation: "Profitability ratio showing percentage of revenue that becomes profit.", goodRange: "10% - 20% (varies by industry)" },
    { formula: "Debt-to-Equity = Total Debt / Shareholder Equity", explanation: "Leverage ratio showing financial risk and debt reliance.", goodRange: "Below 2.0, ideal <1.0" },
    { formula: "ROE = (Net Income / Shareholder Equity) × 100", explanation: "Return on Equity — profit generated per dollar of equity.", goodRange: "15% - 25%" },
    { formula: "Asset Turnover = Revenue / Total Assets", explanation: "Efficiency ratio measuring how well assets generate revenue.", goodRange: "0.5 - 1.5 (varies by industry)" },
    { formula: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities", explanation: "Stricter liquidity ratio excluding hard-to-sell inventory.", goodRange: "1.0 - 2.0" }
  ];

  const whyItMattersData: WhyItMattersCardProps[] = [
    { icon: ArrowLeftRight, title: "Compare Companies", explanation: "Ratios normalize company size, enabling fair comparison across different businesses." },
    { icon: ChartBar, title: "Measure Financial Health", explanation: "Quickly identify strengths, weaknesses, and potential red flags." },
    { icon: TrendingUp, title: "Analyze Profitability", explanation: "See how efficiently a company generates profit from operations." },
    { icon: Shield, title: "Evaluate Risk", explanation: "Assess bankruptcy risk, liquidity issues, and debt sustainability." }
  ];

  const interviewQuestionsData: { question: string; answer: string }[] = [
    { question: "What's a good current ratio?", answer: "A current ratio between 1.5 and 3.0 is generally healthy. Below 1.0 suggests potential liquidity problems — the company can't pay short-term bills. Above 5.0 might indicate inefficient asset use (too much cash or inventory). However, ideal ranges vary by industry: retail often runs lower (1.2-1.5) due to fast inventory turnover." },
    { question: "What's the difference between ROA and ROE?", answer: "ROA (Return on Assets) measures how efficiently management uses ALL assets to generate profit. ROE (Return on Equity) measures profit generated for shareholders relative to their investment. Companies with high debt often have high ROE but low ROA. For example, a bank might have 1% ROA but 15% ROE due to leverage." },
    { question: "Why are financial ratios important for investors?", answer: "Ratios reveal the complete financial picture that raw numbers hide. A company with $1B profit might seem great, but if ROE is only 5% and debt-to-equity is 4.0, it's actually risky and inefficient. Ratios enable: (1) comparing competitors of different sizes, (2) tracking performance trends, (3) identifying red flags early, and (4) making apples-to-apples industry comparisons." },
    { question: "What does a high debt-to-equity ratio indicate?", answer: "Debt-to-equity above 2.0 (200%) suggests aggressive leverage. This amplifies returns in good times but increases bankruptcy risk during downturns. Industries with stable cash flows (utilities, real estate) can handle higher ratios (3.0-4.0). Cyclical industries (tech, retail) should stay below 1.0. Always compare within the same industry context." }
  ];

  const faqsData: FAQItemProps[] = [
    { question: "What are financial ratios and why are they important?", answer: "Financial ratios are mathematical comparisons between different financial statement numbers. They normalize company size, enabling fair comparisons. Ratios help investors quickly assess profitability, liquidity, efficiency, and risk. Without ratios, comparing a $10B company to a $100M company is nearly impossible. Ratios are the universal language of financial analysis." },
    { question: "What's the difference between profitability and liquidity ratios?", answer: "Profitability ratios (Net Margin, ROE) measure earnings generation — long-term success indicators. Liquidity ratios (Current Ratio, Quick Ratio) measure short-term survival ability — can the company pay bills next month? A company can be profitable but illiquid (e.g., profitable but slow customer payments). Both are essential for complete analysis." },
    { question: "What is a good P/E ratio?", answer: "P/E ratio varies dramatically by industry and growth expectations. High-growth tech often trades at 30-50x earnings. Mature utilities trade at 10-15x. Compare P/E to industry averages and the company's historical range. Also compare to growth rate — the PEG ratio (P/E divided by growth) provides better context. A 30x P/E with 30% growth (PEG=1) is reasonable." },
    { question: "Which ratios do investors use most?", answer: "Most frequently used ratios: (1) P/E Ratio — valuation benchmark, (2) Current Ratio — liquidity health, (3) Debt-to-Equity — financial risk, (4) ROE — management effectiveness, (5) Gross Margin — pricing power. However, investors analyze multiple ratios together — never rely on a single metric for investment decisions." },
    { question: "How do I know if a ratio is 'good'?", answer: "Always compare ratios to: (1) Industry averages — a 10% net margin might be excellent for retail but poor for software, (2) Company's historical trends — improving or deteriorating?, (3) Competitor ratios, (4) Rule-of-thumb benchmarks (e.g., current ratio >1.0 for liquidity). Context is everything in ratio analysis." },
    { question: "Can ratios be manipulated?", answer: "Yes, through accounting choices. Examples: delaying supplier payments improves current ratio, leasing instead of buying reduces reported debt, one-time asset sales boost ROA temporarily. Always analyze cash flow ratios alongside accrual-based ratios. Also review footnotes for unusual transactions. Ratios are tools, not absolute truths — combine with qualitative analysis." }
  ];

  const keyTermsData: KeyTermProps[] = [
    { term: "Liquidity", definition: "Ability to pay short-term obligations — measured by current and quick ratios." },
    { term: "Leverage", definition: "Use of debt to finance operations — higher leverage means higher risk and potential return." },
    { term: "Profitability", definition: "Ability to generate profit relative to revenue, assets, or equity." },
    { term: "Efficiency", definition: "How well a company uses assets to generate revenue — turnover ratios." },
    { term: "ROE (Return on Equity)", definition: "Profit generated per dollar of shareholder equity — key management effectiveness metric." },
    { term: "P/E Ratio", definition: "Price-to-Earnings — valuation metric showing market expectations." },
    { term: "Working Capital", definition: "Current assets minus current liabilities — operational liquidity buffer." },
    { term: "Margin", definition: "Profit as percentage of revenue — gross, operating, and net margin variations." }
  ];

  const commonMistakesData: CommonMistakeProps[] = [
    { mistake: "Using one ratio alone", correction: "Combine multiple ratios (liquidity + profitability + leverage) for complete picture." },
    { mistake: "Ignoring industry benchmarks", correction: "A 10% margin might be excellent or terrible depending on the industry." },
    { mistake: "Comparing different industries", correction: "Always compare companies within the same industry for meaningful insights." },
    { mistake: "Focusing only on profitability", correction: "High profits don't guarantee survival — check liquidity and cash flow too." },
    { mistake: "Ignoring trend analysis", correction: "One ratio snapshot is meaningless — analyze trends over 3-5 years." }
  ];

  const relatedLessonsData: RelatedLessonProps[] = [
    { title: "Profit & Loss Statement", duration: "12 min", icon: TrendingUp, href: "/learning-hub/finance-fundamentals/profit-loss-statement" },
    { title: "Balance Sheet", duration: "14 min", icon: Scale, href: "/learning-hub/finance-fundamentals/balance-sheet" },
    { title: "Cash Flow Statement", duration: "16 min", icon: Activity, href: "/learning-hub/finance-fundamentals/cash-flow-statement" },
    { title: "EBITDA Explained", duration: "15 min", icon: Calculator, href: "/learning-hub/financial-analysis/ebitda" },
    { title: "Financial Modeling Basics", duration: "30 min", icon: PieChart, href: "/learning-hub/modeling/basics" },
    { title: "Valuation Fundamentals", duration: "25 min", icon: BadgeDollarSign, href: "/learning-hub/valuation/intro" }
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
          <a href="/learning-hub/financial-analysis" className={styles.breadcrumbLink}>Financial Analysis</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111827] font-medium">Financial Ratios</span>
        </div>

        {/* ===== 2. HERO SECTION - Premium Gradient Background (Blue to Purple) ===== */}
        <div className="relative overflow-hidden rounded-[32px] mb-12 bg-gradient-to-br from-[#1E3A5F] via-[#312E81] to-[#4C1D95]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl"></div>
          
          {/* Dashboard grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Left side - Content */}
            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                <Tag>📊 Advanced</Tag>
                <Tag icon={Clock}>20 min read</Tag>
                <Tag icon={Calculator}>Data-Driven</Tag>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-black leading-[1.1] max-w-[700px] mb-5 relative z-10 tracking-[-0.02em]">
                Financial Ratios Explained for Beginners
              </h1>
              
              <p className="text-lg text-[#C4B5FD] leading-relaxed max-w-[620px] mb-6">
                Learn how analysts use financial ratios to evaluate profitability, liquidity, efficiency, and business performance using real-world examples.
              </p>
              
              {/* Learning stats */}
              <div className="flex flex-wrap gap-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    <p className="text-lg font-bold text-black">8</p>
                  </div>
                  <p className="text-xs text-[#C4B5FD]">Key Ratios</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#60A5FA]" />
                    <p className="text-lg font-bold text-black">6</p>
                  </div>
                  <p className="text-xs text-[#C4B5FD]">Formulas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#FBBF24]" />
                    <p className="text-lg font-bold text-black">6</p>
                  </div>
                  <p className="text-xs text-[#C4B5FD]">FAQs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#34D399]" />
                    <p className="text-lg font-bold text-black">4</p>
                  </div>
                  <p className="text-xs text-[#C4B5FD]">Interview Qs</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Ratio Categories Visual Diagram */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="grid grid-cols-2 gap-3">
                  {/* Profitability Box */}
                  <div className="bg-gradient-to-br from-[#DBEAFE] to-[#E0E7FF] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-[#1E40AF]" />
                      <span className="font-bold text-[#1E40AF] text-xs">PROFITABILITY</span>
                    </div>
                    <p className="text-lg font-bold text-[#1E40AF]">Net Margin</p>
                    <p className="text-xs text-[#1E40AF]">ROE · ROA</p>
                  </div>
                  
                  {/* Liquidity Box */}
                  <div className="bg-gradient-to-br from-[#DCFCE7] to-[#CCFBF1] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Gauge className="w-5 h-5 text-[#166534]" />
                      <span className="font-bold text-[#166534] text-xs">LIQUIDITY</span>
                    </div>
                    <p className="text-lg font-bold text-[#166534]">Current Ratio</p>
                    <p className="text-xs text-[#166534]">Quick Ratio</p>
                  </div>
                  
                  {/* Efficiency Box */}
                  <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <GanttChart className="w-5 h-5 text-[#92400E]" />
                      <span className="font-bold text-[#92400E] text-xs">EFFICIENCY</span>
                    </div>
                    <p className="text-lg font-bold text-[#92400E]">Asset Turnover</p>
                    <p className="text-xs text-[#92400E]">Inventory Turnover</p>
                  </div>
                  
                  {/* Leverage Box */}
                  <div className="bg-gradient-to-br from-[#EDE9FE] to-[#E9D5FF] rounded-xl p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Scale className="w-5 h-5 text-[#5B21B6]" />
                      <span className="font-bold text-[#5B21B6] text-xs">LEVERAGE</span>
                    </div>
                    <p className="text-lg font-bold text-[#5B21B6]">Debt-to-Equity</p>
                    <p className="text-xs text-[#5B21B6]">Interest Coverage</p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-white text-sm font-semibold">↓ Multiple Ratios = Complete Picture ↓</span>
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
              "Understand major financial ratios (liquidity, profitability, leverage, efficiency)",
              "Analyze company profitability and operational efficiency",
              "Measure liquidity and short-term financial health",
              "Compare companies of different sizes using standardized ratios",
              "Evaluate financial health and identify red flags",
              "Use ratios for investment analysis and valuation"
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
              <FileText className="w-7 h-7 text-[#7C3AED]" />
              <h2 className="text-2xl font-bold text-[#111827]">What Are Financial Ratios?</h2>
            </div>
            <p className="text-[#111827] leading-relaxed">
              <strong className="text-[#111827]">Financial Ratios</strong> are mathematical calculations used to evaluate a company's 
              financial performance, efficiency, liquidity, and profitability. By comparing different line items from financial 
              statements, ratios normalize company size — enabling <strong className="text-[#7C3AED]">apples-to-apples comparisons</strong> 
              between competitors of different scales. Ratios help analysts and investors identify trends, benchmark performance, 
              and make informed investment decisions without getting lost in absolute numbers.
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
          <h2 className={styles.sectionHeading}>📊 Key Ratio Categories You Must Know</h2>
          <div className={styles.grid2Col}>
            {conceptsData.map((concept, idx) => (
              <ConceptCard key={idx} {...concept} />
            ))}
          </div>
        </section>

        {/* ===== 6. IMPORTANT FORMULAS ===== */}
        <section className="mb-12">
          <h2 className={styles.sectionHeading}>📐 Important Formulas with Benchmarks</h2>
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
          <h2 className={styles.sectionHeading}>📋 How to Analyze Financial Ratios</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#F5F3FF] hidden md:block"></div>
            <div className="space-y-6">
              {[
                { step: "1", title: "Choose Relevant Ratios", desc: "Select ratios based on analysis goal — liquidity for short-term health, profitability for earnings quality, leverage for risk assessment." },
                { step: "2", title: "Compare with Industry Averages", desc: "A 10% net margin might be excellent for retail but poor for software. Always benchmark against industry peers." },
                { step: "3", title: "Analyze Trends Over Time", desc: "One ratio snapshot is meaningless. Track 3-5 year trends to identify improving or deteriorating performance." },
                { step: "4", title: "Identify Strengths & Weaknesses", desc: "High profitability but poor liquidity? Strong efficiency but high debt? Understand the complete picture." },
                { step: "5", title: "Combine Multiple Ratios", desc: "Never rely on a single ratio. Use complementary ratios (profitability + liquidity + leverage) for comprehensive analysis." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 z-10">
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
          <h2 className={styles.sectionHeading}>🏢 Real-World Example: Comparing Tech Giants</h2>
          <div className={`${styles.card} bg-gradient-to-r from-white to-[#F8FAFC]`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl">Apple vs Microsoft</span>
                    <p className="text-sm text-[#6B7280]">Fiscal Year 2023 Ratio Comparison</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-sm font-semibold pb-2 border-b border-gray-200">
                    <span>Ratio</span>
                    <span className="text-center">Apple</span>
                    <span className="text-center">Microsoft</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm py-1">
                    <span className="text-[#6B7280]">Net Profit Margin</span>
                    <span className="font-semibold text-center">25.3%</span>
                    <span className="font-semibold text-center">34.1%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm py-1 border-t border-gray-100">
                    <span className="text-[#6B7280]">Current Ratio</span>
                    <span className="font-semibold text-center">0.99</span>
                    <span className="font-semibold text-center">1.87</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm py-1 border-t border-gray-100">
                    <span className="text-[#6B7280]">Debt-to-Equity</span>
                    <span className="font-semibold text-center">1.92</span>
                    <span className="font-semibold text-center">0.45</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm py-1 border-t border-gray-100">
                    <span className="text-[#6B7280]">ROE</span>
                    <span className="font-semibold text-center">156%</span>
                    <span className="font-semibold text-center">35.7%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm py-1 border-t border-gray-100">
                    <span className="text-[#6B7280]">P/E Ratio</span>
                    <span className="font-semibold text-center">29.4x</span>
                    <span className="font-semibold text-center">34.8x</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.insightBox}>
                <Lightbulb className="w-6 h-6 text-[#7C3AED] mb-2" />
                <h3 className="font-bold text-[#111827] mb-1">Key Ratio Insights</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm mb-3">
                  <strong>Apple:</strong> Extremely high ROE (156%) driven by leverage (Debt-to-Equity 1.92). Lower current ratio (0.99) suggests potential liquidity pressure despite strong profitability.<br/><br/>
                  <strong>Microsoft:</strong> Higher net margins (34.1% vs 25.3%) and healthier liquidity (1.87 current ratio). Much lower debt-to-equity (0.45) indicates conservative financial management.<br/><br/>
                  <strong>Takeaway:</strong> Ratio analysis reveals different strategies — Apple uses leverage aggressively, Microsoft prioritizes balance sheet strength.
                </p>
                <div className="mt-3 pt-2 border-t border-[#7C3AED]/20">
                  <a href="/learning-hub/financial-analysis/ratio-case-study" className="text-sm text-[#7C3AED] font-semibold hover:underline inline-flex items-center gap-1">
                    Deep dive into ratio analysis <ArrowRight className="w-3 h-3" />
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
                  <Briefcase className="w-5 h-5 text-[#7C3AED]" />
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
              <div className="p-3 bg-[#F5F3FF] rounded-2xl">
                <Calculator className="w-7 h-7 text-[#7C3AED]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827] mb-1">Calculate Financial Ratios</h3>
                <p className="text-[#6B7280]">Use the data below to calculate Current Ratio, Net Profit Margin, and Debt-to-Equity.</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-5">
              <h4 className="font-semibold text-[#111827] mb-3">Company Financial Data (Dec 31, 2025)</h4>
              <div className="space-y-1.5 font-mono text-sm">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Current Assets</span>
                  <span className="font-semibold text-[#111827]">$1,800,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Current Liabilities</span>
                  <span className="font-semibold text-[#111827]">$900,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Total Debt</span>
                  <span className="font-semibold text-[#111827]">$2,500,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Shareholder Equity</span>
                  <span className="font-semibold text-[#111827]">$1,200,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-[#6B7280]">Revenue</span>
                  <span className="font-semibold text-[#111827]">$5,000,000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6B7280]">Net Profit</span>
                  <span className="font-semibold text-[#111827]">$850,000</span>
                </div>
              </div>
            </div>
            
            <details className="group">
              <summary className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-black rounded-xl font-semibold cursor-pointer hover:opacity-90 transition-all">
                <Eye className="w-4 h-4" />
                Show Answer
              </summary>
              <div className="mt-5 p-5 bg-[#F5F3FF] rounded-xl">
                <div className="space-y-1.5 font-mono text-[#111827]">
                  <p>Current Ratio = $1,800,000 / $900,000 = <strong className="text-[#10B981] text-lg">2.0</strong> (Healthy liquidity)</p>
                  <p>Net Profit Margin = ($850,000 / $5,000,000) × 100 = <strong className="text-[#10B981] text-lg">17%</strong> (Good profitability)</p>
                  <p>Debt-to-Equity = $2,500,000 / $1,200,000 = <strong className="text-[#10B981] text-lg">2.08</strong> (Moderate leverage)</p>
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
              "Ratios normalize company size, enabling fair comparisons across different businesses",
              "Always compare ratios with industry averages, not absolute numbers",
              "Use multiple ratios together — liquidity + profitability + leverage for complete picture",
              "Trend analysis over 3-5 years matters more than single-period ratios",
              "Different industries have different ratio benchmarks — context is everything",
              "Ratios are tools, not answers — combine with qualitative analysis for best decisions"
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
          <a href="/learning-hub/financial-analysis/ebitda" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-black rounded-xl font-semibold hover:opacity-90 transition-all group">
            Continue to EBITDA Deep Dive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-4">
            <a href="/learning-hub/finance-fundamentals/cash-flow-statement" className="text-sm text-[#6B7280] hover:text-[#7C3AED] transition-colors">Cash Flow →</a>
            <a href="/learning-hub/valuation/intro" className="text-sm text-[#6B7280] hover:text-[#7C3AED] transition-colors">Valuation →</a>
          </div>
        </div>
      </div>
      
      {/* ===== 18. FOOTER CTA ===== */}
      <div className="bg-gradient-to-br from-[#1E3A5F] via-[#312E81] to-[#4C1D95] mt-10">
        <div className="max-w-[1280px] mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Master Financial Analysis Step-by-Step</h2>
          <p className="text-[#C4B5FD] mb-6 max-w-2xl mx-auto">
            Build confidence in financial analysis with our complete roadmap from basics to advanced modeling.
          </p>
          <a href="/roadmap" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#7C3AED] rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Start Learning Today
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
