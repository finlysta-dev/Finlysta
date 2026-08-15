import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SUMIFS & COUNTIFS in Excel: Formula, Examples & Practice",
  description:
    "Learn SUMIFS and COUNTIFS in Excel with formula syntax, examples, multiple criteria, logical operators, wildcards, dynamic ranges, common errors, interview questions and practical exercises.",
  keywords: [
    "SUMIFS",
    "SUMIFS Excel",
    "SUMIFS formula",
    "COUNTIFS",
    "COUNTIFS Excel",
    "COUNTIFS formula",
    "how to use SUMIFS",
    "how to use COUNTIFS",
    "SUMIFS example",
    "COUNTIFS example",
    "Excel conditional formulas",
    "Excel conditional functions",
    "SUMIFS multiple criteria",
    "COUNTIFS multiple criteria",
    "SUMIFS interview questions",
    "SUMIFS practice",
    "COUNTIFS practice",
  ],
  alternates: {
    canonical: "/excel-functions/sumifs",
  },
  openGraph: {
    title: "SUMIFS & COUNTIFS in Excel: Formula, Examples & Practice",
    description:
      "Learn SUMIFS and COUNTIFS in Excel with formulas, examples, multiple criteria, common errors, interview questions and practical exercises.",
    url: "https://finlysta.com/excel-functions/sumifs",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUMIFS & COUNTIFS in Excel - Formula, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUMIFS & COUNTIFS in Excel: Formula, Examples & Practice",
    description:
      "Learn SUMIFS and COUNTIFS formulas, examples, common errors and practical Excel interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is SUMIFS in Excel?",
    answer:
      "SUMIFS is a conditional summing function that adds values based on multiple criteria. For example, you can sum sales where Region is 'North' AND Month is 'January'.",
  },
  {
    question: "What is COUNTIFS in Excel?",
    answer:
      "COUNTIFS is a conditional counting function that counts cells based on multiple criteria. For example, you can count employees where Department is 'Finance' AND Salary is greater than 50,000.",
  },
  {
    question: "What is the SUMIFS formula syntax?",
    answer:
      "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...). The first argument is the range to sum, followed by pairs of criteria ranges and their conditions.",
  },
  {
    question: "What is the COUNTIFS formula syntax?",
    answer:
      "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...). Each pair defines a range and the condition that cells must meet to be counted.",
  },
  {
    question: "How is SUMIFS different from SUMIF?",
    answer:
      "SUMIF handles only one condition, while SUMIFS can handle multiple conditions. Always use SUMIFS for consistency—it works with one condition too.",
  },
  {
    question: "How is COUNTIFS different from COUNTIF?",
    answer:
      "COUNTIF handles only one condition, while COUNTIFS can handle multiple conditions. COUNTIFS is more powerful and should be used when you need to count with multiple criteria.",
  },
  {
    question: "Can SUMIFS and COUNTIFS use logical operators?",
    answer:
      "Yes, you can use operators like >, <, >=, <=, and <>. For example, '>100' or '<>0'. For text, you can use 'North' for exact matches.",
  },
  {
    question: "Can SUMIFS and COUNTIFS use wildcards?",
    answer:
      "Yes, you can use the * wildcard for any number of characters and ? for a single character. For example, 'S*' matches any text starting with 'S'.",
  },
];

const interviewQuestions = [
  {
    question: "What is SUMIFS in Excel?",
    answer:
      "SUMIFS is a conditional summing function that adds values based on multiple criteria. It's one of the most frequently used functions in reporting and analysis.",
  },
  {
    question: "Explain the syntax of SUMIFS.",
    answer:
      "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...). The first range is the values to sum, followed by pairs of ranges and their conditions.",
  },
  {
    question: "What is COUNTIFS in Excel?",
    answer:
      "COUNTIFS counts cells that meet multiple conditions. It's useful for counting transactions, employees, or entries that satisfy specific criteria.",
  },
  {
    question: "Explain the syntax of COUNTIFS.",
    answer:
      "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...). Each pair defines a range and the condition that cells must meet.",
  },
  {
    question: "How would you sum sales for the 'North' region in January?",
    answer:
      'Use SUMIFS: =SUMIFS(Sales_Range, Region_Range, "North", Month_Range, "January"). This sums all sales where Region is North and Month is January.',
  },
  {
    question: "How would you count employees with salary greater than 50,000 in the Finance department?",
    answer:
      'Use COUNTIFS: =COUNTIFS(Department_Range, "Finance", Salary_Range, ">50000"). This counts employees who meet both conditions.',
  },
  {
    question: "What is the difference between SUMIF and SUMIFS?",
    answer:
      "SUMIF handles one condition, SUMIFS handles multiple. SUMIFS is more flexible and should be used even for single conditions for consistency.",
  },
  {
    question: "How do you use wildcards in SUMIFS and COUNTIFS?",
    answer:
      'Use * for any number of characters (e.g., "S*" for words starting with S) and ? for a single character (e.g., "Sm?th"). These work for text criteria in both functions.',
  },
];

const mistakes = [
  {
    title: "Mismatched range sizes",
    description:
      "The sum_range and criteria_range must have the same number of rows and columns. If one range is larger than the other, the formula may return unexpected results.",
  },
  {
    title: "Incorrect criteria syntax",
    description:
      "Text and date criteria should be in double quotes (e.g., 'North'). Numerical operators should also be in quotes (e.g., '>100').",
  },
  {
    title: "Using SUMIFS when SUMIF would work",
    description:
      "For a single condition, either SUMIF or SUMIFS works. However, SUMIFS is often recommended for consistency when adding more conditions later.",
  },
  {
    title: "Not using absolute references",
    description:
      "When copying formulas, use absolute references ($A$1:$A$100) to prevent ranges from shifting. This is especially important in dashboards and reports.",
  },
  {
    title: "Mixing data types",
    description:
      "Ensure that numeric values in criteria are not formatted as text. Numbers stored as text may not match correctly in SUMIFS and COUNTIFS.",
  },
];

export default function SumifsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "SUMIFS & COUNTIFS in Excel: Formula, Examples & Practice",
    description:
      "Learn SUMIFS and COUNTIFS in Excel with formulas, examples, common errors, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel-functions/sumifs",
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
        name: "Excel Functions",
        item: "https://finlysta.com/practice",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "SUMIFS & COUNTIFS",
        item: "https://finlysta.com/excel-functions/sumifs",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Structured data */}
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
                  INDEX & MATCH
                </a>
                <a
                  href="/excel-functions/sumifs"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  SUMIFS & COUNTIFS
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
              <li className="font-semibold text-slate-900">SUMIFS & COUNTIFS</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Excel Function
            </span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Interview Question
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            SUMIFS & COUNTIFS in Excel: Formula, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use SUMIFS and COUNTIFS in Excel with simple formulas,
            practical examples, multiple criteria, logical operators, common
            mistakes and interview-focused exercises.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>📊 8+ practice exercises</span>
            <span>•</span>
            <span>💼 Interview questions included</span>
            <span>•</span>
            <span>✅ Free to practice</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/assessment"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-center font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Take Free Excel Assessment →
            </a>

            <a
              href="/excel-functions/vlookup"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Learn VLOOKUP
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* What is SUMIFS & COUNTIFS */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Are SUMIFS & COUNTIFS in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            SUMIFS and COUNTIFS are conditional functions that allow you to sum or count values based on one or more conditions.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            SUMIFS adds values that meet specified criteria. COUNTIFS counts cells that meet specified criteria. Together, they are essential for reporting, data analysis, and financial modeling.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            These functions are frequently used in finance, accounting, operations, and data analyst roles. They are often tested in interviews for their ability to handle multiple conditions efficiently.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              SUMIFS and COUNTIFS are among the most frequently tested Excel functions in interviews. Interviewers often ask candidates to sum or count data based on multiple conditions to assess their practical Excel skills.
            </p>
          </div>
        </section>

        {/* SUMIFS Formula */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            SUMIFS Formula
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
            </code>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0">
              {[
                [
                  "sum_range",
                  "The range of values to sum.",
                ],
                [
                  "criteria_range1",
                  "The range to apply the first condition to.",
                ],
                [
                  "criteria1",
                  "The condition that must be met.",
                ],
                [
                  "criteria_range2, criteria2",
                  "Additional pairs of ranges and conditions.",
                ],
              ].map(([term, description]) => (
                <div
                  key={term}
                  className="border-slate-200 p-5 sm:border-b sm:border-r"
                >
                  <p className="font-bold text-slate-900">{term}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COUNTIFS Formula */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            COUNTIFS Formula
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
            </code>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0">
              {[
                [
                  "criteria_range1",
                  "The range to apply the first condition to.",
                ],
                [
                  "criteria1",
                  "The condition that must be met.",
                ],
                [
                  "criteria_range2, criteria2",
                  "Additional pairs of ranges and conditions.",
                ],
              ].map(([term, description]) => (
                <div
                  key={term}
                  className="border-slate-200 p-5 sm:border-b sm:border-r"
                >
                  <p className="font-bold text-slate-900">{term}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            SUMIFS & COUNTIFS Example
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Let's say you have a sales table with Region, Month, and Sales. You want to:
          </p>

          <ul className="mt-4 space-y-2 text-slate-600">
            <li>• Sum sales for the North region in January</li>
            <li>• Count how many sales transactions are in the North region in January</li>
          </ul>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =SUMIFS(Sales_Range, Region_Range, "North", Month_Range, "January")
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula sums all sales where Region is "North" AND Month is "January".
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =COUNTIFS(Region_Range, "North", Month_Range, "January")
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula counts all rows where Region is "North" AND Month is "January".
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap p-4 font-bold">Region</th>
                  <th className="whitespace-nowrap p-4 font-bold">Month</th>
                  <th className="whitespace-nowrap p-4 font-bold">Sales (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4">North</td>
                  <td className="p-4">January</td>
                  <td className="p-4">10,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">North</td>
                  <td className="p-4">February</td>
                  <td className="p-4">12,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">South</td>
                  <td className="p-4">January</td>
                  <td className="p-4">8,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">North</td>
                  <td className="p-4">January</td>
                  <td className="p-4">15,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            The SUMIFS formula would return 25,000 (10,000 + 15,000). The COUNTIFS formula would return 2 (two rows matching the criteria).
          </p>
        </section>

        {/* Multiple Criteria */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            SUMIFS & COUNTIFS with Multiple Criteria
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            You can add as many criteria pairs as needed. Here's an example with three conditions:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =SUMIFS(Sales_Range, Region_Range, "North", Month_Range, "January", Product_Range, "Electronics")
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This sums sales for North region, in January, for Electronics products only.
          </p>
        </section>

        {/* Logical Operators */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Using Logical Operators
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            SUMIFS and COUNTIFS support logical operators like &gt;, &lt;, &gt;=, &lt;=, and &lt;&gt;.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-bold text-slate-900">Greater than 100</p>
              <code className="mt-2 block font-mono text-sm text-slate-600">
                =SUMIFS(Sales_Range, Sales_Range, "&gt;100")
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-bold text-slate-900">Greater than or equal to 50,000</p>
              <code className="mt-2 block font-mono text-sm text-slate-600">
                =COUNTIFS(Salary_Range, "&gt;=50000")
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-bold text-slate-900">Not equal to zero</p>
              <code className="mt-2 block font-mono text-sm text-slate-600">
                =COUNTIFS(Quantity_Range, "&lt;&gt;0")
              </code>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
            <p className="font-bold text-yellow-900">💡 Tip</p>
            <p className="mt-2 leading-7 text-yellow-900/80">
              Always put logical operators and text in double quotes. For example: "&gt;100", "North", "&lt;&gt;0".
            </p>
          </div>
        </section>

        {/* Wildcards */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Using Wildcards
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Wildcards are useful when you need to match patterns in text:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-bold text-slate-900">* (Asterisk)</p>
              <p className="mt-2 text-sm text-slate-600">Matches any number of characters</p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                =SUMIFS(Sales_Range, Product_Range, "S*")
              </code>
              <p className="mt-2 text-xs text-slate-500">Sums sales for products starting with "S"</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-bold text-slate-900">? (Question Mark)</p>
              <p className="mt-2 text-sm text-slate-600">Matches a single character</p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                =COUNTIFS(Name_Range, "Sm?th")
              </code>
              <p className="mt-2 text-xs text-slate-500">Counts names like "Smith" or "Smyth"</p>
            </div>
          </div>
        </section>

        {/* VLOOKUP Comparison */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            SUMIFS vs SUMIF / COUNTIFS vs COUNTIF
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Both SUMIFS and COUNTIFS are more powerful than their single-condition counterparts:
          </p>

          <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[620px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold">SUMIFS / COUNTIFS</th>
                  <th className="p-4 font-bold">SUMIF / COUNTIF</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Number of conditions</td>
                  <td className="p-4">Unlimited</td>
                  <td className="p-4">Only one</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Flexibility</td>
                  <td className="p-4">Very flexible</td>
                  <td className="p-4">Limited</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Single condition use</td>
                  <td className="p-4">Works perfectly</td>
                  <td className="p-4">Works</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Recommendation</td>
                  <td className="p-4">Always use</td>
                  <td className="p-4">Avoid for new work</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Pro tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Always use SUMIFS and COUNTIFS instead of SUMIF and COUNTIF. They work with one condition too and are easier to extend when you need to add more conditions later.
            </p>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common SUMIFS & COUNTIFS Errors and Mistakes
          </h2>

          <div className="mt-7 space-y-4">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <h3 className="font-bold text-slate-900">
                  {mistake.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  {mistake.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interview Questions */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            SUMIFS & COUNTIFS Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common SUMIFS and COUNTIFS questions you may encounter in Excel
            interviews and practical assessments.
          </p>

          <div className="mt-7 space-y-3">
            {interviewQuestions.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 p-5"
              >
                <summary className="cursor-pointer list-none font-bold text-slate-900">
                  <span className="mr-3 text-blue-600 group-open:hidden">
                    +
                  </span>
                  <span className="mr-3 hidden text-blue-600 group-open:inline">
                    −
                  </span>
                  {item.question}
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
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
            weaknesses across the skills commonly tested in interviews.
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
            Ready to practice SUMIFS & COUNTIFS?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding the formulas is only the beginning. Practice
            realistic Excel scenarios and build confidence using conditional
            functions in interviews and real-world work.
          </p>

          <a
            href="/practice"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-700"
          >
            Start Excel Practice →
          </a>
        </section>

        {/* Related topics */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold">
            Related Excel Topics
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="/excel-functions/vlookup"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">
                VLOOKUP & XLOOKUP
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice lookup formulas with realistic data and business scenarios.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn VLOOKUP →
              </span>
            </a>

            <a
              href="/excel-functions/index-match"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">
                INDEX & MATCH
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn flexible lookup techniques used in real-world Excel analysis.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn INDEX & MATCH →
              </span>
            </a>

            <a
              href="/excel/pivot-tables"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">
                Pivot Tables
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Analyze and summarize business data with practical Excel exercises.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn Pivot Tables →
              </span>
            </a>

            <a
              href="/practice"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">
                Excel Practice
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice realistic Excel problems for finance and analyst roles.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Start Practice →
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