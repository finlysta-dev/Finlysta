// app/interview-prep/finance/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finance Interview Excel Questions & Answers | Finlysta",
  description:
    "Prepare for your finance interview with 25 essential Excel questions covering financial modeling, valuation, investment analysis, budgeting, and accounting scenarios.",
  keywords: [
    "finance interview Excel",
    "Excel finance interview questions",
    "financial analyst Excel interview",
    "investment banking Excel test",
    "corporate finance Excel",
    "financial modeling Excel",
    "finance interview preparation",
    "Excel for finance professionals",
    "investment banking Excel",
    "financial analyst interview questions",
  ],
  alternates: {
    canonical: "/interview-prep/finance",
  },
  openGraph: {
    title: "Finance Interview Excel Questions & Answers | Finlysta",
    description:
      "Prepare for your finance interview with 25 essential Excel questions covering financial modeling, valuation, investment analysis, budgeting, and accounting scenarios.",
    url: "https://finlysta.com/interview-prep/finance",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finance Interview Excel Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Interview Excel Questions & Answers",
    description:
      "25 essential Excel questions for finance interviews.",
    images: ["/og-image.png"],
  },
};

const interviewQuestions = [
  {
    question: "What Excel functions are most important for finance professionals?",
    answer:
      "Finance professionals rely on: lookup functions (VLOOKUP, XLOOKUP, INDEX MATCH), financial functions (NPV, IRR, PMT, FV), conditional functions (SUMIFS, IF), Pivot Tables for reporting, and data cleaning functions. Mastering these covers 90% of finance tasks.",
  },
  {
    question: "How do you calculate Net Present Value (NPV) in Excel?",
    answer:
      "Use the NPV function: =NPV(rate, value1, value2, ...). For example: =NPV(10%, B2:B10). The rate is the discount rate, and the values are future cash flows. Remember to include the initial investment separately.",
  },
  {
    question: "How do you calculate Internal Rate of Return (IRR) in Excel?",
    answer:
      "Use the IRR function: =IRR(values, [guess]). For example: =IRR(B2:B10). The values should include the initial investment (negative) and all future cash flows (positive). IRR returns the rate at which NPV equals zero.",
  },
  {
    question: "How would you calculate loan payments in Excel?",
    answer:
      "Use the PMT function: =PMT(rate, nper, pv, [fv], [type]). For example: =PMT(5%/12, 60, 100000) calculates monthly payments for a 5-year $100,000 loan at 5% interest.",
  },
  {
    question: "What is the difference between NPV and IRR?",
    answer:
      "NPV calculates the present value of future cash flows in dollars. IRR calculates the rate of return where NPV equals zero. NPV is used to determine if an investment adds value; IRR is used to compare investment returns.",
  },
  {
    question: "How do you build a financial model in Excel?",
    answer:
      "Start with historical data, build assumptions, create income statement, balance sheet, and cash flow statement projections. Use proper formatting, color coding, and sensitivity analysis. Always make assumptions explicit and include error checks.",
  },
  {
    question: "What is a sensitivity analysis in Excel?",
    answer:
      "A sensitivity analysis shows how changes in assumptions affect outcomes. Use Data Tables or Scenario Manager to test different variables. For example, analyze how changes in revenue growth or interest rates affect NPV.",
  },
  {
    question: "How do you use Pivot Tables for finance reporting?",
    answer:
      "Pivot Tables summarize large datasets quickly. Use them to: group financial data by month or quarter, calculate totals by department, analyze revenue by product, and create executive dashboards with slicers.",
  },
  {
    question: "What is the difference between SUMIF and SUMIFS in finance?",
    answer:
      "SUMIF adds values with one condition (e.g., sum revenue for a specific region). SUMIFS adds with multiple conditions (e.g., sum revenue for a region AND product). Use SUMIFS for all finance reporting—it's more flexible.",
  },
  {
    question: "How would you handle missing data in financial analysis?",
    answer:
      "Fill with averages, interpolate between values, use industry benchmarks, or flag as missing. Document your approach. For valuation, consider the impact of missing data on your conclusions.",
  },
  {
    question: "What is XIRR and when would you use it?",
    answer:
      "XIRR calculates IRR for non-periodic cash flows. Use =XIRR(values, dates, [guess]). It's essential for real estate, private equity, or project finance with irregular timing.",
  },
  {
    question: "How do you calculate depreciation in Excel?",
    answer:
      "Use SLN for straight-line: =SLN(cost, salvage, life). Use SYD for sum-of-years digits: =SYD(cost, salvage, life, period). Use DDB for double-declining balance: =DDB(cost, salvage, life, period, factor).",
  },
  {
    question: "What is the PMT function used for?",
    answer:
      "PMT calculates constant loan payments. It's used for mortgages, car loans, and bond valuations. Formula: =PMT(rate, nper, pv, [fv], [type]). The rate is per period (e.g., monthly).",
  },
  {
    question: "How do you calculate the future value of an investment?",
    answer:
      "Use the FV function: =FV(rate, nper, pmt, [pv], [type]). For example: =FV(5%, 10, -1000) calculates the future value of annual $1,000 payments at 5% interest over 10 years.",
  },
  {
    question: "What is a break-even analysis in Excel?",
    answer:
      "Break-even analysis finds the point where revenue equals costs. Use Goal Seek to find the break-even point. For example, determine units needed to cover fixed costs: =Fixed Costs / (Price per unit - Variable cost per unit).",
  },
  {
    question: "How would you perform a scenario analysis in Excel?",
    answer:
      "Use Scenario Manager (Data → What-If Analysis → Scenario Manager). Define best-case, base-case, worst-case scenarios. Summarize results in a summary table. Also use Data Tables for more comprehensive analysis.",
  },
  {
    question: "What is the difference between absolute and relative references in finance?",
    answer:
      "Absolute references ($A$1) stay fixed when copying formulas—useful for constant assumptions like tax rates or discount rates. Relative references (A1) change—useful for per-period values like revenue or expenses.",
  },
  {
    question: "How do you calculate a company's weighted average cost of capital (WACC)?",
    answer:
      "WACC = (E/V × Re) + (D/V × Rd × (1-T)). Use Excel to calculate: = (Market_Equity / (Market_Equity + Debt) * Cost_of_Equity) + (Debt / (Market_Equity + Debt) * Cost_of_Debt * (1 - Tax_Rate)).",
  },
  {
    question: "What is the difference between NPV and XNPV?",
    answer:
      "NPV assumes regular periodic cash flows. XNPV handles irregular cash flows with specific dates. Formula: =XNPV(rate, values, dates). Use XNPV for project finance, real estate, and private equity.",
  },
  {
    question: "How would you calculate a company's free cash flow?",
    answer:
      "Free Cash Flow = Operating Cash Flow - Capital Expenditures. In Excel: = Operating_Cash_Flow - CapEx. Free cash flow is essential for DCF valuation and investment analysis.",
  },
  {
    question: "What is a DCF analysis in Excel?",
    answer:
      "DCF analysis discounts future cash flows to present value using a discount rate. Steps: 1) Project free cash flows, 2) Calculate terminal value, 3) Discount all cash flows to present value, 4) Sum to get enterprise value.",
  },
  {
    question: "How do you create an amortization schedule in Excel?",
    answer:
      "Use PMT for monthly payments, then calculate interest and principal portions. For each period: Interest = Beginning Balance × Rate, Principal = PMT - Interest, Ending Balance = Beginning Balance - Principal.",
  },
  {
    question: "What are the most common financial ratios and how are they calculated?",
    answer:
      "Common ratios: Liquidity (Current Ratio = Current Assets / Current Liabilities), Profitability (Gross Margin = Gross Profit / Revenue), Efficiency (Inventory Turnover = COGS / Average Inventory), and Leverage (Debt-to-Equity = Total Debt / Total Equity).",
  },
  {
    question: "How would you use conditional formatting in finance reports?",
    answer:
      "Use conditional formatting to: highlight budget variances in red/green, flag negative cash flows, show data bars for performance metrics, and color-code profitability margins.",
  },
  {
    question: "What is the difference between a financial model and a budget?",
    answer:
      "A financial model projects future financial performance using assumptions and historical data. A budget is a specific financial plan for a defined period. Models are more flexible and used for valuation; budgets are used for planning and control.",
  },
];

const topFunctions = [
  {
    title: "Financial Functions",
    functions: "NPV, IRR, PMT, FV, XIRR, XNPV",
    description: "Essential for valuation, investment analysis, and loan calculations.",
  },
  {
    title: "Lookup Functions",
    functions: "VLOOKUP, XLOOKUP, INDEX MATCH",
    description: "Critical for merging financial data, retrieving assumptions, and cross-referencing.",
  },
  {
    title: "Conditional Functions",
    functions: "SUMIFS, IF, IFERROR",
    description: "Used for financial reporting, variance analysis, and error handling.",
  },
  {
    title: "Data Analysis",
    functions: "Pivot Tables, Data Tables, Scenario Manager",
    description: "Essential for financial reporting, sensitivity analysis, and scenario planning.",
  },
  {
    title: "Financial Modeling",
    functions: "DCF, Sensitivity Analysis, Break-Even",
    description: "Core skills for investment banking, corporate finance, and FP&A roles.",
  },
];

export default function FinancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Finance Interview Excel Questions & Answers",
    description:
      "Prepare for your finance interview with 25 essential Excel questions covering financial modeling, valuation, investment analysis, budgeting, and accounting scenarios.",
    author: {
      "@type": "Organization",
      name: "Finlysta",
    },
    publisher: {
      "@type": "Organization",
      name: "Finlysta",
    },
    datePublished: "2026-08-16",
    dateModified: "2026-08-16",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://finlysta.com/interview-prep/finance",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: interviewQuestions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* Pivot Announcement Banner */}
      <div className="border-b border-blue-200 bg-blue-50">
        <div className="mx-auto max-w-7xl px-5 py-3 text-center text-sm sm:px-6 lg:px-8">
          <span className="font-semibold text-blue-700">🚀 New:</span>
          <span className="text-slate-700">
            {" "}
            Finlysta is now a dedicated Excel practice platform — built for
            students and freshers to master interview-ready skills.
          </span>
        </div>
      </div>

      {/* Header with navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-3"
            aria-label="Finlysta home"
          >
            <img
              src="/Finlysta.png"
              alt="Finlysta Logo"
              className="h-16 w-30 rounded-lg object-contain md:h-10 md:w-30"
            />
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 text-sm font-semibold md:flex"
          >
            <a
              href="/#practice"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Practice
            </a>
            <a
              href="/#topics"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Interview Questions
            </a>
            <a
              href="/#how-it-works"
              className="text-slate-700 transition hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="/blog"
              className="text-blue-600 transition hover:text-blue-700"
            >
              Blog
            </a>
          </nav>

          <a
            href="/assessment"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 sm:px-5"
          >
            Start Assessment
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Finance Interview Preparation
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Finance Interview Excel Questions & Answers
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Prepare for your finance interview with 25 essential Excel questions
            covering financial modeling, valuation, investment analysis,
            budgeting, and accounting scenarios.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Finance
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Investment Banking
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Valuation
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Financial Modeling
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/assessment"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-bold text-white transition hover:bg-blue-700"
            >
              Take Free Excel Assessment →
            </a>
            <a
              href="/excel-functions/vlookup"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Learn VLOOKUP
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* Introduction */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Excel Skills Every Finance Professional Needs
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Finance professionals rely heavily on Excel. From investment banking
            to corporate finance, Excel skills are essential. Here are the core
            skills you need to master for a finance role.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topFunctions.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300"
              >
                <h3 className="font-bold text-slate-900">{skill.title}</h3>
                <p className="mt-1 text-sm text-blue-600 font-semibold">
                  {skill.functions}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Finance interviews often include practical Excel tests. Employers
              want to see that you can build models, calculate financial metrics,
              and solve problems efficiently.
            </p>
          </div>
        </section>

        {/* All Questions */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            All 25 Finance Excel Interview Questions
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Review each question and answer to prepare for your finance
            interview.
          </p>

          <div className="mt-8 space-y-4">
            {interviewQuestions.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200"
              >
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      {item.question}
                    </h3>
                    <div className="mt-3 border-t border-slate-100 pt-3">
                      <p className="text-sm leading-7 text-slate-600 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Assessment CTA */}
        <section className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-7 text-center text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
            Free Assessment
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            How interview-ready is your Excel?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Take our free Excel assessment to identify your strengths and
            weaknesses across the skills commonly tested in finance interviews.
          </p>
          <a
            href="/assessment"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 transition hover:bg-slate-100"
          >
            Take Free Assessment →
          </a>
        </section>

        {/* Practice CTA */}
        <section className="mt-16 rounded-3xl bg-slate-50 p-7 text-center sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Practice
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Ready to practice finance Excel skills?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Practice realistic finance scenarios and build confidence using
            Excel in interviews and real-world work.
          </p>
          <a
            href="/practice"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-700"
          >
            Start Excel Practice →
          </a>
        </section>

        {/* Related Topics */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold">Related Excel Topics</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="/excel-functions/vlookup"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">VLOOKUP & XLOOKUP</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice lookup formulas with realistic data and business scenarios.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn VLOOKUP →
              </span>
            </a>
            <a
              href="/excel-functions/sumifs"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">SUMIFS & COUNTIFS</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice conditional calculations used in reporting and analysis.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn SUMIFS →
              </span>
            </a>
            <a
              href="/excel-functions/pivot-tables"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Pivot Tables</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Analyze and summarize business data with practical Excel exercises.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn Pivot Tables →
              </span>
            </a>
            <a
              href="/interview-prep/data-analyst"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Data Analyst Questions</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice data analyst Excel interview questions and scenarios.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn More →
              </span>
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center gap-3">
                <img
                  src="/Finlysta.png"
                  alt="Finlysta Logo"
                  className="h-16 w-30 rounded-lg object-contain md:h-10 md:w-30"
                />
              </a>
              <p className="mt-3 text-sm text-slate-600">
                Practice skills. Get interview ready.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Practice
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/practice"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Excel Practice
                  </a>
                </li>
                <li>
                  <a
                    href="/assessment"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Excel Assessment
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Resources
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/blog"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/interview-prep"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Interview Prep
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-center text-sm text-slate-400">
              © 2026 Finlysta. Practice skills. Get interview ready.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}