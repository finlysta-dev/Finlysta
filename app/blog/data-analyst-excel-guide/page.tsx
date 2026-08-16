// app/blog/data-analyst-excel-guide/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Analyst Excel: Complete Guide for 2026 | Finlysta",
  description:
    "Master Excel for data analysis with this complete guide. Learn essential functions, Pivot Tables, Power Query, data cleaning, dashboard design, and interview preparation.",
  keywords: [
    "data analyst Excel",
    "Excel for data analysis",
    "Excel data analyst",
    "best way to learn Excel for data analysis",
    "business analysis using Excel",
    "data analyst Excel test",
    "data analyst using Excel",
    "Excel analyst",
    "Excel for data analytics",
  ],
  alternates: {
    canonical: "/blog/data-analyst-excel-guide",
  },
  openGraph: {
    title: "Data Analyst Excel: Complete Guide for 2026 | Finlysta",
    description:
      "Master Excel for data analysis with this complete guide. Learn essential functions, Pivot Tables, Power Query, data cleaning, dashboard design, and interview preparation.",
    url: "https://finlysta.com/blog/data-analyst-excel-guide",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Data Analyst Excel - Complete Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Excel: Complete Guide for 2026",
    description:
      "Master Excel for data analysis with this complete guide.",
    images: ["/og-image.png"],
  },
};

export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Data Analyst Excel: Complete Guide for 2026",
    description:
      "Master Excel for data analysis with this complete guide. Learn essential functions, Pivot Tables, Power Query, data cleaning, dashboard design, and interview preparation.",
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
      "@id": "https://finlysta.com/blog/data-analyst-excel-guide",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What Excel skills does a data analyst need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Data analysts need lookup functions (VLOOKUP, XLOOKUP, INDEX MATCH), conditional functions (SUMIFS, COUNTIFS), Pivot Tables, Power Query for data transformation, data cleaning skills, and dashboard creation.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to learn Excel for data analysis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It typically takes 2-4 weeks to learn the basics and 2-3 months to become proficient in Excel for data analysis with consistent practice.",
        },
      },
      {
        "@type": "Question",
        name: "Is Excel enough for data analysis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Excel is sufficient for many data analysis tasks, especially for small to medium datasets. For large datasets, tools like SQL, Python, or Power BI are often combined with Excel.",
        },
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

      {/* Blog Content */}
      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <Link
          href="/blog"
          className="inline-block text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          ← Back to Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            Data Analysis
          </span>
          <span>•</span>
          <span>7 min read</span>
          <span>•</span>
          <span>August 16, 2026</span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          Data Analyst Excel: Complete Guide for 2026
        </h1>

        <div className="mt-8 space-y-6 text-slate-600">
          {/* Introduction */}
          <p className="text-lg leading-8 text-slate-700">
            Excel is one of the most powerful tools for a data analyst. It's
            versatile, accessible, and used in almost every industry. Whether
            you're analyzing sales data, building reports, or creating
            dashboards, Excel is your go-to tool.
          </p>

          <p className="leading-8">
            In this complete guide, we'll cover everything you need to know
            about using Excel as a data analyst—from essential functions to
            advanced techniques, data cleaning, visualization, and interview
            preparation.
          </p>

          {/* What is a Data Analyst? */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              What is a Data Analyst?
            </h2>
            <p className="mt-3 leading-8">
              A data analyst collects, processes, and analyzes data to help
              businesses make informed decisions. They use tools like Excel,
              SQL, and visualization tools to find patterns, trends, and insights
              in data.
            </p>
            <p className="mt-4 leading-8">
              Data analysts are in high demand. Companies rely on them to
              understand customer behavior, optimize operations, and drive
              growth. Excel is often the first tool they master.
            </p>
          </div>

          {/* Core Excel Skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Core Excel Skills Every Data Analyst Needs
            </h2>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <h3 className="font-bold text-blue-900">
                  1. Lookup Functions
                </h3>
                <p className="mt-1 text-sm text-blue-800">
                  <strong>VLOOKUP, XLOOKUP, INDEX MATCH</strong>
                </p>
                <p className="mt-2 text-sm text-blue-700">
                  Used to merge datasets, find matching values, and retrieve
                  information from large tables. Essential for joining data from
                  different sources.
                </p>
                <a
                  href="/excel-functions/vlookup"
                  className="mt-2 inline-block text-sm font-bold text-blue-600 transition hover:text-blue-800"
                >
                  Learn Lookup Functions →
                </a>
              </div>

              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <h3 className="font-bold text-green-900">
                  2. Conditional Functions
                </h3>
                <p className="mt-1 text-sm text-green-800">
                  <strong>SUMIFS, COUNTIFS, AVERAGEIFS</strong>
                </p>
                <p className="mt-2 text-sm text-green-700">
                  Calculate values based on multiple conditions. Used for
                  reporting, analysis, and data summarization.
                </p>
                <a
                  href="/excel-functions/sumifs"
                  className="mt-2 inline-block text-sm font-bold text-green-600 transition hover:text-green-800"
                >
                  Learn SUMIFS →
                </a>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                <h3 className="font-bold text-purple-900">3. Pivot Tables</h3>
                <p className="mt-1 text-sm text-purple-800">
                  <strong>Data Summarization, Grouping, Calculated Fields</strong>
                </p>
                <p className="mt-2 text-sm text-purple-700">
                  Quickly summarize and analyze large datasets without writing
                  formulas. Essential for exploratory data analysis.
                </p>
                <a
                  href="/excel-functions/pivot-tables"
                  className="mt-2 inline-block text-sm font-bold text-purple-600 transition hover:text-purple-800"
                >
                  Learn Pivot Tables →
                </a>
              </div>

              <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                <h3 className="font-bold text-orange-900">4. Power Query</h3>
                <p className="mt-1 text-sm text-orange-800">
                  <strong>Data Import, Transformation, Automation</strong>
                </p>
                <p className="mt-2 text-sm text-orange-700">
                  Automate data cleaning and preparation. Import data from
                  multiple sources and transform it with repeatable steps.
                </p>
                <a
                  href="/excel-functions/power-query"
                  className="mt-2 inline-block text-sm font-bold text-orange-600 transition hover:text-orange-800"
                >
                  Learn Power Query →
                </a>
              </div>

              <div className="rounded-xl border border-pink-200 bg-pink-50 p-4">
                <h3 className="font-bold text-pink-900">5. Data Cleaning</h3>
                <p className="mt-1 text-sm text-pink-800">
                  <strong>TRIM, CLEAN, Remove Duplicates, Flash Fill</strong>
                </p>
                <p className="mt-2 text-sm text-pink-700">
                  Prepare messy data for analysis. Fix formatting issues,
                  remove duplicates, and standardize your data.
                </p>
                <a
                  href="/excel-functions/data-cleaning"
                  className="mt-2 inline-block text-sm font-bold text-pink-600 transition hover:text-pink-800"
                >
                  Learn Data Cleaning →
                </a>
              </div>

              <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
                <h3 className="font-bold text-teal-900">6. Dashboards</h3>
                <p className="mt-1 text-sm text-teal-800">
                  <strong>KPIs, Charts, Slicers, Interactive Reports</strong>
                </p>
                <p className="mt-2 text-sm text-teal-700">
                  Turn raw data into meaningful insights. Create interactive
                  reports that help stakeholders make decisions.
                </p>
                <a
                  href="/excel/dashboards"
                  className="mt-2 inline-block text-sm font-bold text-teal-600 transition hover:text-teal-800"
                >
                  Learn Dashboards →
                </a>
              </div>
            </div>
          </div>

          {/* Data Cleaning Process */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Step-by-Step Data Cleaning Process
            </h2>
            <p className="mt-3 leading-8">
              Data cleaning is often 80% of a data analyst's work. Here's a
              systematic process:
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Remove Duplicates
                  </p>
                  <p className="text-sm text-slate-600">
                    Use Data → Remove Duplicates or the UNIQUE function.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Handle Missing Values
                  </p>
                  <p className="text-sm text-slate-600">
                    Use Go To Special → Blanks, then fill with N/A, 0, or
                    average using IF(ISBLANK()).
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  3
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Clean Text Data
                  </p>
                  <p className="text-sm text-slate-600">
                    Use TRIM for spaces, CLEAN for hidden characters, and
                    PROPER, UPPER, or LOWER for consistent capitalization.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  4
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Fix Data Types
                  </p>
                  <p className="text-sm text-slate-600">
                    Ensure numbers are stored as numbers, dates as dates. Use
                    VALUE or Text to Columns to fix formatting issues.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  5
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Standardize Formats
                  </p>
                  <p className="text-sm text-slate-600">
                    Apply consistent date, number, and text formats across your
                    dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Essential Functions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Top 10 Excel Functions for Data Analysts
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "VLOOKUP/XLOOKUP", desc: "Find and retrieve data" },
                { name: "INDEX MATCH", desc: "Flexible lookups" },
                { name: "SUMIFS", desc: "Sum with multiple criteria" },
                { name: "COUNTIFS", desc: "Count with multiple criteria" },
                { name: "IF & Nested IF", desc: "Conditional logic" },
                { name: "TRIM", desc: "Remove extra spaces" },
                { name: "CLEAN", desc: "Remove hidden characters" },
                { name: "FILTER", desc: "Filter data dynamically" },
                { name: "SORT", desc: "Sort data dynamically" },
                { name: "UNIQUE", desc: "List unique values" },
              ].map((func) => (
                <div
                  key={func.name}
                  className="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <p className="font-bold text-slate-900">{func.name}</p>
                  <p className="text-sm text-slate-500">{func.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Best Way to Learn */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-xl font-bold text-green-900">
              Best Way to Learn Excel for Data Analysis
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-6 text-green-800">
              <li className="leading-7">
                <span className="font-bold">Start with the basics:</span> Learn
                formulas, cell references, and data entry first.
              </li>
              <li className="leading-7">
                <span className="font-bold">Practice with real data:</span>{" "}
                Download free datasets from Kaggle or use sample sales data.
              </li>
              <li className="leading-7">
                <span className="font-bold">Focus on the 80/20 rule:</span>{" "}
                Master the 20% of functions you'll use 80% of the time (lookups,
                SUMIFS, Pivot Tables).
              </li>
              <li className="leading-7">
                <span className="font-bold">Take a practice assessment:</span>{" "}
                Use our free Excel assessment to identify your strengths and
                weaknesses.
              </li>
              <li className="leading-7">
                <span className="font-bold">Build projects:</span> Create a
                sales dashboard, analyze customer data, or build a budget
                tracker.
              </li>
            </ul>
            <a
              href="/assessment"
              className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
            >
              Take Free Excel Assessment →
            </a>
          </div>

          {/* Interview Preparation */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-blue-900">
              Data Analyst Excel Interview Preparation
            </h2>
            <p className="mt-3 leading-8 text-blue-800">
              Data analyst interviews often include practical Excel tests. Here's
              how to prepare:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6 text-blue-800">
              <li>Practice with real datasets and common scenarios</li>
              <li>Master keyboard shortcuts for efficiency</li>
              <li>Learn to explain your thought process</li>
              <li>Understand the "why" behind formulas, not just the syntax</li>
              <li>Take our Data Analyst Excel Interview Questions practice test</li>
            </ul>
            <a
              href="/interview-prep/data-analyst"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              View Data Analyst Interview Questions →
            </a>
          </div>

          {/* Conclusion */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Conclusion</h2>
            <p className="mt-3 leading-8 text-slate-600">
              Excel is an essential tool for any data analyst. By mastering
              lookup functions, conditional formulas, Pivot Tables, Power Query,
              and data cleaning, you'll be well-equipped to handle any data
              analysis task.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Remember: the best way to learn is to practice with real data.
              Start building projects, take practice assessments, and keep
              learning.
            </p>
          </div>
        </div>

        {/* Author bio */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
              F
            </div>
            <div>
              <p className="font-bold text-slate-900">Finlysta Team</p>
              <p className="text-sm text-slate-500">
                Helping students and professionals master Excel for interviews
                and real-world work.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-7 text-center text-white sm:p-10">
          <h2 className="text-2xl font-extrabold">Ready to test your skills?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Take our free Excel assessment to identify your strengths and
            weaknesses before your interview.
          </p>
          <a
            href="/assessment"
            className="mt-5 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 transition hover:bg-slate-100"
          >
            Take Free Assessment →
          </a>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900">You might also like</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/blog/top-excel-interview-questions"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h4 className="font-bold text-slate-900">
                Top 10 Excel Interview Questions for Finance Roles
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Essential questions to prepare for your finance interview.
              </p>
            </Link>
            <Link
              href="/blog/excel-assessment-tips"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h4 className="font-bold text-slate-900">
                5 Tips to Ace Your Excel Interview
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Proven strategies for Excel tests.
              </p>
            </Link>
          </div>
        </div>
      </article>

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