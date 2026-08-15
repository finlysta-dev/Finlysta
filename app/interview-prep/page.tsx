import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "25 Advanced Excel Interview Questions & Answers | Finlysta",
  description:
    "Practice 25 advanced Excel interview questions and answers covering XLOOKUP, VLOOKUP, INDEX MATCH, Pivot Tables, Power Query, SUMIFS, COUNTIFS, IFERROR, data cleaning, dashboards and real-world Excel scenarios.",
  keywords: [
    "advanced Excel interview questions",
    "advanced Excel interview questions and answers",
    "Excel interview questions",
    "Excel interview questions for freshers",
    "Excel interview questions for data analyst",
    "Excel interview questions for finance",
    "Excel interview questions for financial analysts",
    "advanced Excel questions",
    "Excel practical interview questions",
    "Excel assessment questions",
    "Excel formulas interview questions",
    "Excel Pivot Table interview questions",
    "Excel Power Query interview questions",
    "XLOOKUP interview questions",
    "VLOOKUP interview questions",
    "INDEX MATCH interview questions",
    "basic Excel interview questions",
    "Excel interview questions with answers",
    "MS Excel interview questions",
    "common Excel interview questions",
    "Excel interview questions and answers pdf",
  ],
  alternates: {
    canonical: "/practice/advanced-excel",
  },
  openGraph: {
    title: "25 Advanced Excel Interview Questions & Answers | Finlysta",
    description:
      "Prepare for Excel interviews with 25 advanced questions covering formulas, lookups, Pivot Tables, Power Query, data cleaning and practical scenarios.",
    url: "/practice/advanced-excel",
    siteName: "Finlysta",
    type: "article",
  },
};

const questions = [
  {
    question: "What is the difference between VLOOKUP and XLOOKUP?",
    answer:
      "VLOOKUP searches for a value in the first column and returns a value to the right. XLOOKUP is newer and more flexible—it can search left or right and has built-in error handling. Think of VLOOKUP as the older, limited version, and XLOOKUP as the upgrade that fixes all its problems.",
  },
  {
    question: "How does INDEX & MATCH work in Excel?",
    answer:
      "INDEX & MATCH is a powerful lookup combination. MATCH finds where a value is located (like a GPS coordinate), and INDEX returns what's at that location. For example, MATCH finds 'John' in column A is at row 5, INDEX then returns the value from row 5 in column C. This is more flexible than VLOOKUP because it works in any direction.",
  },
  {
    question: "When would you use XLOOKUP instead of VLOOKUP?",
    answer:
      "Use XLOOKUP when you need more flexibility—it doesn't need column numbers, can search left or right, and handles errors better. It's also easier to maintain when you add or remove columns. If you have Excel 365, XLOOKUP is always the better choice.",
  },
  {
    question: "What is the difference between exact and approximate match?",
    answer:
      "Exact match finds a value that is exactly the same (like looking for 'EMP001' exactly). Approximate match finds the closest value (like finding a tax bracket based on income). In VLOOKUP, FALSE is exact match (most common), TRUE is approximate match (used for ranges like grades or commissions).",
  },
  {
    question: "How can you handle #N/A errors in lookup formulas?",
    answer:
      "Wrap your formula with IFERROR or IFNA. For example: =IFERROR(VLOOKUP(A2, B:C, 2, FALSE), 'Not Found'). This shows a clean message instead of an ugly error. IFNA is specifically for #N/A errors, while IFERROR catches all errors.",
  },
  {
    question: "What is the difference between SUMIF and SUMIFS?",
    answer:
      "SUMIF adds values with one condition (like 'sum sales where region is North'). SUMIFS adds with multiple conditions (like 'sum sales where region is North AND month is January'). Always use SUMIFS—it's more flexible and handles single conditions too.",
  },
  {
    question: "What is the difference between COUNTIF and COUNTIFS?",
    answer:
      "COUNTIF counts cells with one condition (like 'count employees in department A'). COUNTIFS counts with multiple conditions (like 'count employees in department A AND with salary above 50,000'). Use COUNTIFS when you need to count with multiple criteria.",
  },
  {
    question: "How would you find and remove duplicate values in Excel?",
    answer:
      "Find duplicates using Conditional Formatting → Highlight Cell Rules → Duplicate Values. To remove them, go to Data → Remove Duplicates. If you need a formula: =COUNTIF(A:A, A2)>1 will identify duplicates. For repeatable work, use Power Query's Remove Duplicates feature.",
  },
  {
    question: "What are Pivot Tables used for?",
    answer:
      "Pivot Tables summarize large datasets in seconds. They help you group data by categories, calculate totals, averages, and counts. For example, you can use a Pivot Table to quickly see sales by region, month, or product without writing any formulas. It's like having a mini-dashboard inside Excel.",
  },
  {
    question: "What is Power Query used for in Excel?",
    answer:
      "Power Query is Excel's data cleaning and transformation tool. It helps you import, clean, and combine data from different sources. The best part? It remembers every step, so you can refresh with one click when new data arrives. It's essential for anyone who cleans the same data regularly.",
  },
  {
    question: "How would you clean a messy dataset in Excel?",
    answer:
      "Start by identifying issues: missing values, duplicates, inconsistent formatting, and extra spaces. Use TRIM to remove extra spaces, PROPER for consistent capitalization, CLEAN for hidden characters, and Remove Duplicates for duplicate rows. Always save a backup before cleaning. Power Query can automate this for repeatable tasks.",
  },
  {
    question: "What does IFERROR do in Excel?",
    answer:
      "IFERROR catches errors and replaces them with a value you choose. For example, =IFERROR(A2/B2, 0) returns 0 when dividing by zero instead of #DIV/0. It makes your spreadsheets look cleaner and more professional. Use IFNA specifically for #N/A errors if you only want to catch those.",
  },
  {
    question: "How would you calculate a percentage change in Excel?",
    answer:
      "Percentage change = (New Value - Old Value) / Old Value. If old revenue is in B2 and new revenue in C2, use =(C2-B2)/B2. Format as percentage. For example, if sales went from 100 to 120, the formula gives 20% growth. Simple and commonly asked in interviews.",
  },
  {
    question: "What is the difference between relative and absolute cell references?",
    answer:
      "Relative references (A1) change when you copy a formula. If you copy =A1+B1 down, it becomes =A2+B2. Absolute references ($A$1) stay fixed. If you copy =$A$1+B1 down, $A$1 stays the same. Use F4 key to toggle between them. Absolute is useful for fixed values like tax rates or conversion factors.",
  },
  {
    question: "How would you create a dynamic Excel dashboard?",
    answer:
      "A dynamic dashboard combines clean data, Pivot Tables, charts, and slicers. Start with clean data, create Pivot Tables for summaries, add charts for visual insights, and use slicers for filtering. The goal is to make it interactive—users can click filters and see data update instantly. Focus on key metrics that help decision-making.",
  },
  {
    question: "What Excel skills are important for a financial analyst?",
    answer:
      "Financial analysts need lookup functions (VLOOKUP, XLOOKUP, INDEX MATCH), conditional formulas (SUMIFS, COUNTIFS), Pivot Tables, data cleaning skills, and charting. Also important: understanding financial calculations (growth rates, percentages, NPV, IRR) and being able to explain what the numbers mean, not just produce them.",
  },
  {
    question: "How would you analyze sales performance by region and product?",
    answer:
      "Use a Pivot Table. Put Region in Rows, Product in Columns, and Sales in Values. You can instantly see sales breakdowns. Add calculations for percentages of total, year-over-year growth, or average order value. Slicers can make it interactive so you can filter by month or quarter quickly.",
  },
  {
    question: "How would you troubleshoot a formula that returns an incorrect result?",
    answer:
      "Start by checking cell references, data types, and formula structure. Use Evaluate Formula (Formulas → Evaluate Formula) to see step-by-step calculation. Trace Precedents and Trace Dependents help understand what cells affect the formula. Check if the data has hidden characters or extra spaces that might cause issues.",
  },
  {
    question: "What is SUMPRODUCT and when would you use it?",
    answer:
      "SUMPRODUCT multiplies arrays and adds the results. It's useful for weighted averages (=SUMPRODUCT(values, weights)/SUM(weights)). It can also do conditional summing without SUMIFS, though SUMIFS is usually easier. Think of it as a versatile formula for calculations involving multiple arrays.",
  },
  {
    question: "How would you create a monthly sales report using a Pivot Table?",
    answer:
      "Start with data containing dates and sales. Insert a Pivot Table, drag Date to Rows, right-click and group by Month, then drag Sales to Values. You can add Year and Quarter for deeper analysis. This creates a clean monthly sales summary that updates when you refresh the data.",
  }
];

const categories = [
  "Lookup Functions",
  "Advanced Formulas",
  "Pivot Tables",
  "Power Query",
  "Data Cleaning",
  "Excel Dashboards",
  "Finance & Analysis",
];

export default function AdvancedExcelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "25 Advanced Excel Interview Questions & Answers",
    description:
      "Practice 25 advanced Excel interview questions covering lookup functions, formulas, Pivot Tables, Power Query, data cleaning and real-world business scenarios.",
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
      "@id": "https://finlysta.com/practice/advanced-excel",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
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

            {/* Excel Functions Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-slate-700 transition hover:text-blue-600">
                Excel Functions
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-lg opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                <a
                  href="/excel-functions/vlookup"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  VLOOKUP
                </a>
                <a
                  href="/excel-functions/index-match"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  INDEX MATCH
                </a>
                <a
                  href="/excel-functions/sumifs"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  SUMIFS
                </a>
              </div>
            </div>
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
            Excel Interview Preparation
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            20 Advanced Excel Interview Questions & Answers
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Prepare for Excel interviews with 20 essential questions covering
            lookup functions, formulas, Pivot Tables, Power Query, data
            cleaning and real-world business scenarios.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 border border-slate-200"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/practice"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-bold text-white transition hover:bg-blue-700"
            >
              Start Excel Practice →
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

      {/* Advanced Excel Interview Questions for Analysts */}
      <section className="border-b border-slate-200 py-12">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Advanced Excel Interview Questions for Analysts
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Excel remains an important skill for finance, accounting, business
            and data analyst roles. Interviews often test more than basic
            formulas. Candidates may be asked to solve lookup problems, clean
            datasets, summarize information with Pivot Tables and explain how
            they would approach a real business problem.
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            These advanced Excel interview questions are designed to help
            candidates prepare for practical assessments and interviews. Try
            answering each question yourself before reading the answer.
          </p>
        </div>
      </section>

      {/* Pro Tips - Focus on Functions */}
      <section className="border-b border-slate-200 py-12">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            💡 Pro Tips: Focus on These Functions
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Master these key Excel functions to ace your interview:
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Lookup Functions", text: "VLOOKUP, XLOOKUP, INDEX MATCH" },
              { title: "Advanced Formulas", text: "SUMIFS, COUNTIFS, IFERROR, SUMPRODUCT" },
              { title: "Pivot Tables", text: "Data summarization, analysis, calculated fields" },
              { title: "Power Query", text: "Data cleaning, transformation, combining files" },
              { title: "Data Cleaning", text: "TRIM, CLEAN, removing duplicates, handling blanks" },
              { title: "Dashboards", text: "KPIs, charts, slicers, dynamic reporting" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-200"
              >
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Questions */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            All 20 Advanced Excel Interview Questions
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Review each question and answer to prepare for your Excel interview.
          </p>

          <div className="mt-8 space-y-4">
            {questions.map((item, index) => (
              <div
                key={item.question}
                className="rounded-lg border border-slate-200 bg-white p-5 hover:border-blue-200"
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

          {/* Free Assessment CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-7 text-center text-white sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
              Free Assessment
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              How interview-ready is your Excel?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
              Take our free Excel assessment to identify your strengths and
              weaknesses across the skills commonly tested in interviews.
            </p>

            <a
              href="/assessment"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-blue-600 transition hover:bg-slate-100"
            >
              Take Free Assessment →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
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

            {/* Practice */}
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

            {/* Interview Prep */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Interview Prep
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="/interview-prep"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Advanced Excel Interview Questions
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
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

          {/* Bottom bar */}
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