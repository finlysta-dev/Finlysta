// app/interview-prep/data-analyst/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Analyst Excel Interview Questions & Answers | Finlysta",
  description:
    "Prepare for your data analyst interview with 20 essential Excel questions covering lookups, Pivot Tables, data cleaning, Power Query, and real-world data analysis scenarios.",
  keywords: [
    "data analyst Excel",
    "data analyst interview questions",
    "Excel data analyst",
    "data analyst Excel test",
    "Excel for data analysis",
    "best way to learn Excel for data analysis",
    "Excel data analyst interview",
    "business analysis using Excel",
    "Excel interview questions for data analyst",
    "data analyst using Excel",
    "Excel analyst",
  ],
  alternates: {
    canonical: "/interview-prep/data-analyst",
  },
  openGraph: {
    title: "Data Analyst Excel Interview Questions & Answers | Finlysta",
    description:
      "Prepare for your data analyst interview with 20 essential Excel questions covering lookups, Pivot Tables, data cleaning, Power Query, and real-world data analysis scenarios.",
    url: "https://finlysta.com/interview-prep/data-analyst",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Data Analyst Excel Interview Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Excel Interview Questions & Answers",
    description:
      "20 essential Excel questions for data analyst interviews.",
    images: ["/og-image.png"],
  },
};

const interviewQuestions = [
  {
    question: "What Excel functions are most important for a data analyst?",
    answer:
      "Data analysts rely on: VLOOKUP/XLOOKUP for data retrieval, SUMIFS/COUNTIFS for conditional calculations, Pivot Tables for data summarization, Power Query for data transformation, and text functions like TRIM and CLEAN for data cleaning. Master these to handle 80% of data analysis tasks.",
  },
  {
    question: "How do you clean messy data in Excel?",
    answer:
      "Start with TRIM to remove extra spaces, CLEAN for non-printable characters, and Remove Duplicates for duplicate records. Use Text to Columns for splitting data, and IF/ISBLANK for handling missing values. For repeatable cleaning, use Power Query to automate the entire process.",
  },
  {
    question: "What is the difference between SUMIF and SUMIFS?",
    answer:
      "SUMIF handles one condition (e.g., sum sales where region is 'North'). SUMIFS handles multiple conditions (e.g., sum sales where region is 'North' AND month is 'January'). Use SUMIFS for consistency—it works with one condition too.",
  },
  {
    question: "How do you use VLOOKUP in data analysis?",
    answer:
      "VLOOKUP searches for a value in the first column of a table and returns a value from another column. For example: =VLOOKUP(lookup_value, table_array, col_index_num, FALSE). Use FALSE for exact matches. VLOOKUP is essential for merging datasets in data analysis.",
  },
  {
    question: "What is INDEX MATCH and why is it useful?",
    answer:
      "INDEX MATCH is a flexible lookup combination. MATCH finds the position of a value, and INDEX returns the value at that position. It's more flexible than VLOOKUP because it can look left or right, is not affected by column insertions, and is more efficient with large datasets.",
  },
  {
    question: "How do you create a Pivot Table for data analysis?",
    answer:
      "Select your data, go to Insert → PivotTable, choose where to place it, then drag fields to Rows, Columns, and Values areas. Pivot Tables are essential for quickly summarizing and analyzing large datasets without writing formulas. They're a core tool for any data analyst.",
  },
  {
    question: "What is Power Query and how do you use it?",
    answer:
      "Power Query is Excel's data transformation tool. It allows you to import, clean, and combine data from multiple sources with repeatable steps. It's essential for automating data preparation tasks, especially when working with the same data sources regularly.",
  },
  {
    question: "How do you handle missing values in a dataset?",
    answer:
      "Use Go To Special → Blanks to find them. Then either: 1) Fill with a specific value like 'N/A' or 0, 2) Use IF(ISBLANK(cell), value, cell), 3) Fill with AVERAGE or MEDIAN for numeric data, or 4) Remove rows with excessive missing data.",
  },
  {
    question: "How do you remove duplicates in Excel?",
    answer:
      "Go to Data → Remove Duplicates. Select the columns to check for duplicates. Excel keeps the first occurrence and removes all others. For more control, use Conditional Formatting to highlight duplicates first, then manually review.",
  },
  {
    question: "What is data validation and when would you use it?",
    answer:
      "Data validation restricts what users can enter into a cell. Use it to create dropdown lists, set number limits, or add custom error messages. It's essential for maintaining data quality and preventing incorrect data entry.",
  },
  {
    question: "How do you calculate percentage change in Excel?",
    answer:
      "Percentage change = (New Value - Old Value) / Old Value. For example, if old revenue is in B2 and new revenue in C2, use =(C2-B2)/B2. Format as percentage. This is a fundamental calculation for data analysis and reporting.",
  },
  {
    question: "What is conditional formatting and how is it useful?",
    answer:
      "Conditional formatting highlights cells based on conditions. Use it to: 1) Highlight duplicates, 2) Color-code values above/below thresholds, 3) Show data bars or color scales, 4) Flag errors or outliers. It's invaluable for quickly identifying patterns in data.",
  },
  {
    question: "How do you use the IF function in Excel?",
    answer:
      "IF performs a logical test and returns one value if TRUE and another if FALSE. Syntax: =IF(logical_test, value_if_true, value_if_false). For example: =IF(A2>100, 'High', 'Low'). Nest multiple IFs for complex logic.",
  },
  {
    question: "What are slicers in Pivot Tables?",
    answer:
      "Slicers are visual filters that let you quickly filter Pivot Tables. They look like buttons and make filtering interactive and user-friendly, especially in dashboards. They show all available options visually, making it easier for users to understand their data.",
  },
  {
    question: "How do you create an Excel dashboard?",
    answer:
      "Start with clean data, create Pivot Tables for summaries, add charts for visual insights, and use slicers for filtering. Focus on key metrics that help decision-making. The goal is to create interactive reports where users can click filters and see data update instantly.",
  },
  {
    question: "What is the difference between relative and absolute cell references?",
    answer:
      "Relative references (A1) change when you copy a formula. Absolute references ($A$1) stay fixed. Use F4 key to toggle between them. Absolute is useful for fixed values like tax rates or conversion factors.",
  },
  {
    question: "What is the FILTER function in Excel?",
    answer:
      "FILTER is a dynamic array function that returns all rows that meet specified criteria. For example: =FILTER(A2:C100, B2:B100='North', 'No data'). It's modern, powerful, and replaces complex array formulas. Available in Excel 365.",
  },
  {
    question: "How do you use the SORT function in Excel?",
    answer:
      "SORT is a dynamic array function that sorts values in a range. Syntax: =SORT(array, [sort_index], [sort_order], [by_col]). For example: =SORT(A2:C100, 2, 1) sorts by the second column in ascending order. Available in Excel 365.",
  },
  {
    question: "What is the UNIQUE function in Excel?",
    answer:
      "UNIQUE returns a list of unique values from a range. For example: =UNIQUE(A2:A100) lists all unique values in column A. It's excellent for quickly identifying distinct values in a dataset. Available in Excel 365.",
  },
  {
    question: "What skills should a data analyst have in Excel?",
    answer:
      "Data analysts should master: 1) Lookup functions (VLOOKUP, XLOOKUP, INDEX MATCH), 2) Conditional functions (SUMIFS, COUNTIFS), 3) Pivot Tables and Pivot Charts, 4) Power Query for data transformation, 5) Data cleaning techniques, 6) Dashboard creation, 7) Dynamic array functions (FILTER, SORT, UNIQUE).",
  },
];

const keySkills = [
  {
    title: "Lookup Functions",
    skills: "VLOOKUP, XLOOKUP, INDEX MATCH, HLOOKUP",
    description: "Essential for merging datasets and retrieving data from tables.",
  },
  {
    title: "Conditional Functions",
    skills: "SUMIFS, COUNTIFS, AVERAGEIFS",
    description: "Calculate values based on multiple conditions across datasets.",
  },
  {
    title: "Pivot Tables",
    skills: "Summarization, Grouping, Calculated Fields, Slicers",
    description: "Quickly summarize and analyze large datasets without formulas.",
  },
  {
    title: "Power Query",
    skills: "Data Import, Transformation, Automation",
    description: "Automate data cleaning and preparation with repeatable steps.",
  },
  {
    title: "Data Cleaning",
    skills: "TRIM, CLEAN, Remove Duplicates, Flash Fill",
    description: "Fix inconsistent, messy, or incomplete data efficiently.",
  },
  {
    title: "Dynamic Arrays",
    skills: "FILTER, SORT, UNIQUE, SEQUENCE",
    description: "Modern Excel functions for dynamic and flexible data analysis.",
  },
];

const bestPractices = [
  {
    title: "Clean Your Data First",
    text: "Always start with data cleaning. Use TRIM, CLEAN, and Remove Duplicates before any analysis.",
  },
  {
    title: "Use Tables",
    text: "Convert your data to Excel Tables (Ctrl+T). This makes formulas dynamic and easier to maintain.",
  },
  {
    title: "Name Your Ranges",
    text: "Use named ranges to make formulas more readable and easier to debug.",
  },
  {
    title: "Document Your Work",
    text: "Add comments to complex formulas and document your data sources.",
  },
  {
    title: "Practice with Real Data",
    text: "Download free datasets from Kaggle or use sample data to practice real-world scenarios.",
  },
];

export default function DataAnalystPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Data Analyst Excel Interview Questions & Answers",
    description:
      "Prepare for your data analyst interview with 20 essential Excel questions covering lookups, Pivot Tables, data cleaning, Power Query, and real-world data analysis scenarios.",
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
      "@id": "https://finlysta.com/interview-prep/data-analyst",
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
            Data Analyst Interview Preparation
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Data Analyst Excel Interview Questions & Answers
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Prepare for your data analyst interview with 20 essential Excel
            questions covering lookups, Pivot Tables, data cleaning, Power Query,
            and real-world data analysis scenarios.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Data Analysis
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Interview Prep
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Excel Skills
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200">
              Data Cleaning
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
            Excel Skills Every Data Analyst Should Master
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Data analysts rely on Excel for data cleaning, transformation,
            summarization, and visualization. Here are the core skills you need
            to master for a data analyst role.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keySkills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300"
              >
                <h3 className="font-bold text-slate-900">{skill.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{skill.skills}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Data analyst interviews often include practical Excel tests.
              Employers want to see that you can clean data, build reports,
              and solve problems efficiently. These questions cover the most
              common scenarios you'll face.
            </p>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Best Way to Learn Excel for Data Analysis
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {bestPractices.map((practice) => (
              <div
                key={practice.title}
                className="rounded-2xl border border-green-200 bg-green-50 p-5"
              >
                <h3 className="font-bold text-green-900">{practice.title}</h3>
                <p className="mt-2 text-sm text-green-800">
                  {practice.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* All Questions */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            All 20 Data Analyst Excel Interview Questions
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Review each question and answer to prepare for your data analyst
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
            weaknesses across the skills commonly tested in data analyst
            interviews.
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
            Ready to practice data analyst Excel skills?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Practice realistic data analysis scenarios and build confidence
            using Excel in interviews and real-world work.
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
              href="/excel/pivot-tables"
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
              href="/excel/data-cleaning"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Data Cleaning</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Identify and fix common data-quality problems found in spreadsheets.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn Data Cleaning →
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