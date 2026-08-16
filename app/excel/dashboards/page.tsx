// app/excel/dashboards/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Excel Dashboards & Consulting Case Studies | Finlysta",
  description:
    "Learn to build professional Excel dashboards and solve real consulting case studies. Practice data analysis, business problem-solving, and presentation skills.",
  keywords: [
    "Excel dashboards",
    "consulting case study Excel",
    "business case study Excel",
    "Excel dashboard tutorial",
    "consulting Excel skills",
    "business analysis Excel",
    "Excel reporting",
    "interactive dashboards Excel",
    "consulting interview Excel",
  ],
  alternates: {
    canonical: "/excel/dashboards",
  },
  openGraph: {
    title: "Excel Dashboards & Consulting Case Studies",
    description:
      "Learn to build professional Excel dashboards and solve real consulting case studies. Practice data analysis, business problem-solving, and presentation skills.",
    url: "https://finlysta.com/excel/dashboards",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Excel Dashboards & Consulting Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Dashboards & Consulting Case Studies",
    description:
      "Learn to build professional Excel dashboards and solve real consulting case studies.",
    images: ["/og-image.png"],
  },
};

const caseStudies = [
  {
    id: 1,
    title: "Revenue Growth Strategy for a Retail Chain",
    difficulty: "Intermediate",
    industry: "Retail",
    time: "45 min",
    description:
      "A retail chain with 50 stores is experiencing declining revenue. Analyze sales data, identify underperforming stores, and recommend a growth strategy.",
    tags: ["Data Analysis", "Financial Modeling", "Strategy"],
  },
  {
    id: 2,
    title: "Cost Optimization for a Manufacturing Company",
    difficulty: "Advanced",
    industry: "Manufacturing",
    time: "60 min",
    description:
      "A manufacturing company needs to reduce costs by 15% while maintaining quality. Analyze cost structure, identify savings opportunities, and build a cost optimization model.",
    tags: ["Cost Analysis", "Optimization", "Financial Modeling"],
  },
  {
    id: 3,
    title: "Market Entry Strategy for a Tech Startup",
    difficulty: "Intermediate",
    industry: "Technology",
    time: "50 min",
    description:
      "A tech startup wants to enter a new market. Analyze market size, competition, and build a financial model to determine viability and investment needed.",
    tags: ["Market Analysis", "Financial Modeling", "Strategy"],
  },
  {
    id: 4,
    title: "Customer Retention Analysis for a Subscription Business",
    difficulty: "Beginner",
    industry: "SaaS",
    time: "35 min",
    description:
      "A subscription business is experiencing high churn. Analyze customer data, identify churn patterns, and build a dashboard to track retention metrics.",
    tags: ["Data Analysis", "Dashboard", "Customer Analytics"],
  },
  {
    id: 5,
    title: "M&A Target Valuation & Synergy Analysis",
    difficulty: "Advanced",
    industry: "Finance",
    time: "75 min",
    description:
      "A private equity firm is considering an acquisition. Build a valuation model, analyze synergies, and create a dashboard for investment committee review.",
    tags: ["Valuation", "M&A", "Financial Modeling"],
  },
  {
    id: 6,
    title: "Supply Chain Optimization for a Logistics Company",
    difficulty: "Intermediate",
    industry: "Logistics",
    time: "55 min",
    description:
      "A logistics company needs to optimize its supply chain network. Analyze transportation costs, route efficiency, and build an optimization model.",
    tags: ["Optimization", "Data Analysis", "Supply Chain"],
  },
];

const dashboardComponents = [
  {
    title: "KPIs & Metrics",
    description:
      "Identify and display key performance indicators that drive business decisions.",
    icon: "📊",
  },
  {
    title: "Pivot Tables",
    description:
      "Summarize and analyze large datasets with interactive Pivot Tables.",
    icon: "📈",
  },
  {
    title: "Charts & Visualizations",
    description:
      "Create professional charts (bar, line, pie, waterfall) for clear communication.",
    icon: "📉",
  },
  {
    title: "Slicers & Timelines",
    description: "Add interactive filters for dynamic data exploration.",
    icon: "🔍",
  },
  {
    title: "Conditional Formatting",
    description:
      "Highlight key insights with color-coded indicators and data bars.",
    icon: "🎨",
  },
  {
    title: "Dynamic Formulas",
    description:
      "Use INDEX MATCH, SUMIFS, and other formulas for dynamic calculations.",
    icon: "🧮",
  },
];

const consultingSkills = [
  {
    title: "Data Analysis",
    description:
      "Analyze large datasets to identify trends, patterns, and insights.",
    examples: "Sales analysis, customer segmentation, market research",
  },
  {
    title: "Financial Modeling",
    description:
      "Build financial models for valuation, forecasting, and investment analysis.",
    examples: "DCF analysis, M&A models, budgeting, and forecasting",
  },
  {
    title: "Business Strategy",
    description:
      "Use data to recommend strategic decisions and business solutions.",
    examples: "Market entry, cost optimization, revenue growth strategies",
  },
  {
    title: "Dashboard Design",
    description:
      "Create professional, interactive dashboards for executive reporting.",
    examples: "KPI dashboards, performance tracking, management reporting",
  },
  {
    title: "Problem-Solving",
    description:
      "Break down complex business problems into structured, solvable components.",
    examples: "Root cause analysis, hypothesis-driven problem solving",
  },
  {
    title: "Presentation Skills",
    description:
      "Communicate insights clearly with well-structured presentations and charts.",
    examples: "Executive summaries, data storytelling, recommendations",
  },
];

const faqs = [
  {
    question: "What is an Excel dashboard?",
    answer:
      "An Excel dashboard is a visual display of key performance indicators (KPIs) and metrics that helps users monitor business performance and make data-driven decisions.",
  },
  {
    question: "What are consulting case studies in Excel?",
    answer:
      "Consulting case studies in Excel are realistic business problems that require data analysis, financial modeling, and strategic recommendations. They help develop consulting skills.",
  },
  {
    question: "What skills do I need for Excel consulting case studies?",
    answer:
      "You need data analysis (Pivot Tables, SUMIFS), financial modeling (financial functions), dashboard design, and problem-solving skills. Basic Excel knowledge is a prerequisite.",
  },
  {
    question: "How do I build a dashboard in Excel?",
    answer:
      "Start with clean data, use Pivot Tables for summaries, add charts for visualization, include slicers for interactivity, and organize everything into a clean, professional layout.",
  },
  {
    question: "What are the best charts for dashboards?",
    answer:
      "Bar charts for comparisons, line charts for trends, pie charts for proportions, and waterfall charts for financial analysis. Choose based on what story you want to tell.",
  },
  {
    question: "How can I practice consulting case studies?",
    answer:
      "Practice with real datasets, solve business problems, build financial models, and create dashboards. Use our case study examples to get started.",
  },
];

export default function DashboardsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Excel Dashboards & Consulting Case Studies",
    description:
      "Learn to build professional Excel dashboards and solve real consulting case studies. Practice data analysis, business problem-solving, and presentation skills.",
    author: {
      "@type": "Organization",
      name: "Finlysta",
    },
    publisher: {
      "@type": "Organization",
      name: "Finlysta",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://finlysta.com/excel/dashboards",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://finlysta.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Excel Features",
        item: "https://finlysta.com/practice",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dashboards & Case Studies",
        item: "https://finlysta.com/excel/dashboards",
      },
    ],
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
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

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-3 sm:px-6">
          <nav className="flex text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" className="text-slate-500 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <a href="/practice" className="text-slate-500 hover:text-blue-600">
                  Excel Practice
                </a>
              </li>
              <li className="text-slate-300">/</li>
              <li className="font-semibold text-slate-900">
                Dashboards & Consulting Case Studies
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Consulting & Business Analysis
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Excel Dashboards & Consulting Case Studies
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn to build professional Excel dashboards and solve real
            consulting case studies. Practice data analysis, business
            problem-solving, and presentation skills.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Consulting
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Strategy
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Financial Modeling
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Dashboards
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
              href="#case-studies"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-bold text-slate-800 transition hover:bg-slate-50"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* What is Consulting Case Study */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Are Consulting Case Studies in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Consulting case studies are realistic business problems that require
            data analysis, financial modeling, and strategic recommendations.
            They are used in consulting interviews and real-world consulting
            work to solve complex business challenges.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            In consulting, Excel is used for everything from analyzing sales
            data to building valuation models. A strong Excel skill set is
            essential for any consultant.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Consulting case studies test your ability to structure problems,
              analyze data, and make recommendations. Excel is the primary tool
              used to solve these cases.
            </p>
          </div>
        </section>

        {/* Consulting Skills */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Essential Consulting Skills in Excel
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultingSkills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300"
              >
                <h3 className="font-bold text-slate-900">{skill.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {skill.description}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  <span className="font-medium">Examples:</span> {skill.examples}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Components */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Building Excel Dashboards
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            A professional Excel dashboard combines data, analysis, and
            visualization into a single, interactive report. Here are the key
            components:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardComponents.map((component) => (
              <div
                key={component.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{component.icon}</span>
                  <h3 className="font-bold text-slate-900">
                    {component.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Terms Explained */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Key Terms Explained
          </h2>
          <p className="mt-2 text-slate-600">
            Understanding these key terms will help you build better dashboards
            and solve consulting case studies.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="text-lg font-bold text-blue-900">📊 KPI (Key Performance Indicator)</h3>
              <p className="mt-2 text-sm leading-7 text-blue-800">
                A KPI is a measurable value that shows how effectively a company
                is achieving key business objectives. For example, "Revenue
                Growth Rate" or "Customer Acquisition Cost" are common KPIs.
              </p>
              <p className="mt-2 text-sm text-blue-700">
                <span className="font-semibold">Example:</span> A retail chain
                tracks "Sales per Square Foot" as a KPI to measure store
                performance.
              </p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-5">
              <h3 className="text-lg font-bold text-green-900">📈 Pivot Table</h3>
              <p className="mt-2 text-sm leading-7 text-green-800">
                A Pivot Table is an Excel feature that summarizes and analyzes
                large datasets. It allows you to quickly group, count, sum, and
                average data without writing formulas.
              </p>
              <p className="mt-2 text-sm text-green-700">
                <span className="font-semibold">Example:</span> Summarize monthly
                sales by region and product category in seconds.
              </p>
            </div>

            <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">
              <h3 className="text-lg font-bold text-purple-900">🎨 Conditional Formatting</h3>
              <p className="mt-2 text-sm leading-7 text-purple-800">
                Conditional Formatting automatically applies colors, icons, or
                data bars to cells based on their values. It helps highlight
                important data points quickly.
              </p>
              <p className="mt-2 text-sm text-purple-700">
                <span className="font-semibold">Example:</span> Color-code sales
                numbers red if below target and green if above target.
              </p>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
              <h3 className="text-lg font-bold text-orange-900">🔍 Slicer</h3>
              <p className="mt-2 text-sm leading-7 text-orange-800">
                A Slicer is a visual filter that lets you filter Pivot Tables
                and charts by clicking buttons. It makes dashboards interactive
                and user-friendly.
              </p>
              <p className="mt-2 text-sm text-orange-700">
                <span className="font-semibold">Example:</span> Click a region
                button to see sales data for that region only.
              </p>
            </div>

            <div className="rounded-xl border border-pink-100 bg-pink-50 p-5">
              <h3 className="text-lg font-bold text-pink-900">📉 Dashboard</h3>
              <p className="mt-2 text-sm leading-7 text-pink-800">
                A Dashboard is a single-page, interactive report that displays
                key metrics and KPIs in a visual format. It helps decision-makers
                monitor performance at a glance.
              </p>
              <p className="mt-2 text-sm text-pink-700">
                <span className="font-semibold">Example:</span> An executive
                dashboard showing revenue, profit, and customer growth trends.
              </p>
            </div>

            <div className="rounded-xl border border-teal-100 bg-teal-50 p-5">
              <h3 className="text-lg font-bold text-teal-900">💰 Financial Modeling</h3>
              <p className="mt-2 text-sm leading-7 text-teal-800">
                Financial Modeling is the process of creating a mathematical
                model of a company's financial performance. It's used for
                valuation, budgeting, and investment analysis.
              </p>
              <p className="mt-2 text-sm text-teal-700">
                <span className="font-semibold">Example:</span> Build a Discounted
                Cash Flow (DCF) model to value a company for an acquisition.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="mt-16 scroll-mt-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Consulting Case Studies to Practice
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Solve these real-world business problems using Excel. Each case
            study includes data, requirements, and suggested solutions.
          </p>

          <div className="mt-8 space-y-4">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-200 hover:shadow-sm transition"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-blue-600">
                        Case {String(study.id).padStart(2, "0")}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          study.difficulty === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : study.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {study.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">
                        {study.industry}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400">
                        {study.time}
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {study.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {study.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-blue-600">
                      Practice
                    </span>
                    <a
                      href="#"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      View Case →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Case Study Detail */}
        <section className="mt-16 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-extrabold text-blue-900">
            Sample Case Study: Revenue Growth Strategy for a Retail Chain
          </h2>

          <div className="mt-4 space-y-4 text-blue-800">
            <div className="rounded-xl bg-white p-5">
              <h3 className="font-bold text-slate-900">💼 Problem Statement</h3>
              <p className="mt-2 text-sm text-slate-600">
                A retail chain with 50 stores across 3 regions is experiencing
                declining revenue. The CEO wants to understand why revenue is
                falling and develop a strategy to reverse the trend.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5">
              <h3 className="font-bold text-slate-900">📊 Data Provided</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>Store-level sales data (last 2 years, monthly)</li>
                <li>Customer demographics by region</li>
                <li>Store operating costs</li>
                <li>Competitor presence data</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-5">
              <h3 className="font-bold text-slate-900">🔍 Tasks</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>
                  Analyze sales trends by region and identify underperforming
                  stores
                </li>
                <li>Identify factors correlated with sales decline</li>
                <li>
                  Build a financial model to evaluate potential growth
                  strategies
                </li>
                <li>
                  Create a dashboard to present findings to the CEO
                </li>
                <li>Recommend a 12-month growth strategy</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-5">
              <h3 className="font-bold text-slate-900">✅ Skills Used</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Pivot Tables
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  SUMIFS
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Financial Modeling
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Dashboards
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Data Analysis
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-white p-4">
            <p className="text-sm font-medium text-blue-700">
              💡 Need help getting started?
            </p>
            <p className="mt-1 text-sm text-blue-600">
              Review our{" "}
              <a
                href="/excel-functions/pivot-tables"
                className="font-bold underline"
              >
                Pivot Tables
              </a>{" "}
              and{" "}
              <a href="/excel-functions/sumifs" className="font-bold underline">
                SUMIFS
              </a>{" "}
              guides first.
            </p>
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
            weaknesses across the skills commonly tested in consulting
            interviews.
          </p>
          <a
            href="/assessment"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 transition hover:bg-slate-100"
          >
            Take Free Assessment →
          </a>
        </section>

        {/* Related Topics */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold">Related Excel Topics</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="/excel-functions/pivot-tables"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Pivot Tables</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Analyze and summarize business data with practical Excel
                exercises.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn Pivot Tables →
              </span>
            </a>
            <a
              href="/excel-functions/sumifs"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">SUMIFS & COUNTIFS</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice conditional calculations used in reporting and
                analysis.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn SUMIFS →
              </span>
            </a>
            <a
              href="/excel/power-query"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Power Query</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice cleaning, transforming and preparing data for analysis.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn Power Query →
              </span>
            </a>
            <a
              href="/interview-prep"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Interview Prep</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Prepare for Excel interviews with advanced questions and
                scenarios.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                View Interview Prep →
              </span>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-7 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <summary className="cursor-pointer font-bold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
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