import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "INDEX MATCH in Excel: Formula, Examples & Practice",
  description:
    "Learn INDEX MATCH in Excel with formula syntax, examples, lookup techniques, two-way lookups, vertical and horizontal searches, common errors, interview questions and practical exercises.",
  keywords: [
    "INDEX MATCH",
    "INDEX MATCH Excel",
    "INDEX MATCH formula",
    "how to use INDEX MATCH",
    "INDEX MATCH example",
    "Excel lookup formula",
    "Excel lookup function",
    "INDEX MATCH for beginners",
    "INDEX MATCH interview questions",
    "INDEX MATCH vs VLOOKUP",
    "INDEX MATCH two-way lookup",
    "INDEX MATCH practice",
    "Excel INDEX function",
    "Excel MATCH function",
  ],
  alternates: {
    canonical: "/excel-functions/index-match",
  },
  openGraph: {
    title: "INDEX MATCH in Excel: Formula, Examples & Practice",
    description:
      "Learn INDEX MATCH in Excel with formulas, examples, two-way lookups, common errors, interview questions and practical exercises.",
    url: "https://finlysta.com/excel-functions/index-match",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INDEX MATCH in Excel - Formula, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INDEX MATCH in Excel: Formula, Examples & Practice",
    description:
      "Learn INDEX MATCH formulas, examples, common errors and practical Excel interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is INDEX MATCH in Excel?",
    answer:
      "INDEX MATCH is a powerful Excel lookup technique that combines the INDEX and MATCH functions. MATCH finds the position of a value in a range, and INDEX returns the value at that position from another range.",
  },
  {
    question: "What is the INDEX MATCH formula?",
    answer:
      "The basic INDEX MATCH syntax is =INDEX(return_range, MATCH(lookup_value, lookup_range, [match_type])). MATCH finds the position of the lookup value, and INDEX returns the value from that position in the return range.",
  },
  {
    question: "How is INDEX MATCH different from VLOOKUP?",
    answer:
      "Unlike VLOOKUP, INDEX MATCH can look up values in any direction—left, right, up, or down. It also handles column insertions better because you don't need to count column numbers.",
  },
  {
    question: "What does the match type mean in MATCH?",
    answer:
      "MATCH offers three match types: 0 for exact match, 1 for less than (sorted ascending), and -1 for greater than (sorted descending). 0 is the most commonly used for exact matching.",
  },
  {
    question: "Can INDEX MATCH be used for two-way lookups?",
    answer:
      "Yes, INDEX MATCH can perform two-way lookups by using MATCH for both the row and column positions. This allows you to find a value at the intersection of a specific row and column.",
  },
  {
    question: "Is INDEX MATCH better than XLOOKUP?",
    answer:
      "XLOOKUP is more modern and easier to use, but INDEX MATCH is still important because many older workbooks use it. It's also useful in Excel versions that don't have XLOOKUP.",
  },
  {
    question: "Can INDEX MATCH look to the left?",
    answer:
      "Yes, INDEX MATCH can return values from columns to the left of the lookup column, which is a major limitation of VLOOKUP.",
  },
  {
    question: "How do I handle errors in INDEX MATCH?",
    answer:
      "You can wrap INDEX MATCH with IFERROR or IFNA to handle errors. For example: =IFERROR(INDEX(B:B, MATCH(D2, A:A, 0)), 'Not Found').",
  },
];

const interviewQuestions = [
  {
    question: "What is INDEX MATCH in Excel?",
    answer:
      "INDEX MATCH is a lookup combination that finds a value using two functions: MATCH returns the position of a value, and INDEX returns the value at a given position.",
  },
  {
    question: "Explain the syntax of INDEX MATCH.",
    answer:
      "=INDEX(return_range, MATCH(lookup_value, lookup_range, [match_type])). MATCH finds the position, and INDEX returns the value from that position in the return range.",
  },
  {
    question: "What is the advantage of INDEX MATCH over VLOOKUP?",
    answer:
      "INDEX MATCH is more flexible because it can look up values in any direction. It's also more reliable when columns are inserted or deleted, since you don't rely on column index numbers.",
  },
  {
    question: "How do you perform an exact match with INDEX MATCH?",
    answer:
      "Use 0 as the match type in MATCH. For example: =INDEX(B:B, MATCH(D2, A:A, 0)). This finds an exact match for D2 in column A and returns the corresponding value from column B.",
  },
  {
    question: "Can INDEX MATCH work with multiple criteria?",
    answer:
      "Yes, you can use an array formula with multiple MATCH functions or combine criteria into a helper column. The formula =INDEX(return_range, MATCH(1, (criteria1_range=criteria1)*(criteria2_range=criteria2), 0)) is one approach.",
  },
  {
    question: "How do you handle #N/A errors in INDEX MATCH?",
    answer:
      "Wrap the formula with IFERROR. For example: =IFERROR(INDEX(B:B, MATCH(D2, A:A, 0)), 'Not Found'). This displays a custom message instead of the error.",
  },
  {
    question: "What's the difference between INDEX MATCH and VLOOKUP?",
    answer:
      "INDEX MATCH offers more flexibility—it can search in any direction, handles column insertions better, and is more efficient for large datasets. VLOOKUP is simpler but more limited.",
  },
  {
    question: "What is a two-way lookup in Excel?",
    answer:
      "A two-way lookup searches for a value at the intersection of a specific row and column. It uses INDEX with two MATCH functions—one for the row position and one for the column position.",
  },
];

const mistakes = [
  {
    title: "Using the wrong range in MATCH",
    description:
      "The MATCH function searches in one row or one column. Make sure you're searching in a range that is either entirely vertical or entirely horizontal.",
  },
  {
    title: "Incorrect match type in MATCH",
    description:
      "Use 0 for exact match, 1 for less-than (sorted ascending), and -1 for greater-than (sorted descending). 0 is the most common choice for lookups.",
  },
  {
    title: "Using inconsistent ranges",
    description:
      "The return_range in INDEX and the lookup_range in MATCH should be the same size. If one has 100 rows and the other has 100 rows, they should match.",
  },
  {
    title: "Not locking ranges with $",
    description:
      "When copying INDEX MATCH formulas, use absolute references ($A$1:$A$100) to prevent the ranges from shifting.",
  },
  {
    title: "Ignoring #N/A errors",
    description:
      "#N/A means MATCH could not find the lookup value. Check for extra spaces, inconsistent formatting, or missing values.",
  },
];

export default function IndexMatchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "INDEX MATCH in Excel: Formula, Examples & Practice",
    description:
      "Learn INDEX MATCH in Excel with formulas, examples, common errors, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel-functions/index-match",
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
        name: "INDEX MATCH",
        item: "https://finlysta.com/excel-functions/index-match",
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
              <li className="font-semibold text-slate-900">INDEX MATCH</li>
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
            INDEX MATCH in Excel: Formula, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use INDEX MATCH in Excel with simple formulas,
            practical examples, flexible lookups, common mistakes and
            interview-focused exercises.
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
        {/* What is INDEX MATCH */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is INDEX MATCH in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            INDEX MATCH is a powerful Excel lookup technique that combines two functions to find and return values. It is often considered superior to VLOOKUP because it is more flexible and reliable.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            The MATCH function finds the position of a value in a row or column. The INDEX function returns a value from a specific position in a range. Together, they create a dynamic and flexible lookup solution.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            INDEX MATCH is frequently used in finance, accounting, data analysis and consulting roles. It's especially useful when you need to look up values to the left, search in two dimensions, or maintain reliable spreadsheets when columns are added or removed.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              INDEX MATCH is a favorite interview topic because it tests deeper Excel knowledge. Interviewers ask about it to see if you understand the limitations of VLOOKUP and can build more robust solutions.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How INDEX MATCH Works
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            INDEX MATCH uses two functions:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                INDEX
              </p>
              <p className="mt-3 text-xl font-bold text-slate-900">
                INDEX(return_range, row_num, [column_num])
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Returns a value from a range at a specific row (and column) position.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                MATCH
              </p>
              <p className="mt-3 text-xl font-bold text-slate-900">
                MATCH(lookup_value, lookup_range, [match_type])
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Returns the position of a value within a row or column. Use 0 for exact match.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            MATCH finds the position of the lookup value in the lookup_range. INDEX then returns the value from the same position in the return_range.
          </p>
        </section>

        {/* Example */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            INDEX MATCH Example
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Let's say you have an employee table with Employee ID in column A and Department in column B. You want to find the department for Employee ID "EMP103".
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =INDEX(B:B, MATCH("EMP103", A:A, 0))
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            MATCH finds "EMP103" in column A (position 3) and INDEX returns the value from position 3 in column B ("Operations").
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap p-4 font-bold">
                    Employee ID
                  </th>
                  <th className="whitespace-nowrap p-4 font-bold">
                    Department
                  </th>
                  <th className="whitespace-nowrap p-4 font-bold">
                    Salary
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4">EMP101</td>
                  <td className="p-4">Finance</td>
                  <td className="p-4">₹45,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">EMP102</td>
                  <td className="p-4">Accounting</td>
                  <td className="p-4">₹42,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">EMP103</td>
                  <td className="p-4">Operations</td>
                  <td className="p-4">₹48,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Left Lookup */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            INDEX MATCH Left Lookup
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            One of the biggest advantages of INDEX MATCH over VLOOKUP is the ability to look up values to the left. VLOOKUP can only return values from columns to the right of the lookup column.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            With INDEX MATCH, you can search for a value and return a value from a column to the left.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =INDEX(A:A, MATCH("Operations", B:B, 0))
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula searches for "Operations" in column B and returns the Employee ID from column A—a left lookup that VLOOKUP cannot do.
          </p>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Key advantage</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Unlike VLOOKUP, INDEX MATCH can return values from any column—left, right, or even from a completely different range.
            </p>
          </div>
        </section>

        {/* Two-Way Lookup */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            INDEX MATCH Two-Way Lookup
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            INDEX MATCH can perform two-way lookups—finding a value at the intersection of a specific row and column.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =INDEX(B2:E10, MATCH("RowValue", A2:A10, 0), MATCH("ColumnHeader", B1:E1, 0))
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            One MATCH finds the row position, the other finds the column position. INDEX then returns the value at their intersection. This is one of the most powerful lookup techniques in Excel.
          </p>
        </section>

        {/* Multiple Criteria */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            INDEX MATCH with Multiple Criteria
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            INDEX MATCH can handle multiple criteria by using an array formula or a helper column. Here's the array formula approach:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =INDEX(return_range, MATCH(1, (criteria1_range=criteria1)*(criteria2_range=criteria2), 0))
            </code>
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
            <p className="font-bold text-yellow-900">⚠️ Note</p>
            <p className="mt-2 leading-7 text-yellow-900/80">
              This formula works with the criteria AND logic. For newer Excel versions, XLOOKUP or helper columns may provide a cleaner solution.
            </p>
          </div>
        </section>

        {/* VLOOKUP Comparison */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            INDEX MATCH vs VLOOKUP
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Both VLOOKUP and INDEX MATCH are useful lookup tools. Here's when to use each:
          </p>

          <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[620px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold">INDEX MATCH</th>
                  <th className="p-4 font-bold">VLOOKUP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Lookup direction</td>
                  <td className="p-4">Left, right, up, down</td>
                  <td className="p-4">Only to the right</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Column insertion</td>
                  <td className="p-4">Not affected</td>
                  <td className="p-4">May break formulas</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Flexibility</td>
                  <td className="p-4">Very flexible</td>
                  <td className="p-4">Limited</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Learning curve</td>
                  <td className="p-4">Slightly steeper</td>
                  <td className="p-4">Easier to learn</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Two-way lookup</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">No</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Multiple criteria</td>
                  <td className="p-4">Yes (with array formula)</td>
                  <td className="p-4">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common INDEX MATCH Errors and Mistakes
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
            INDEX MATCH Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common INDEX MATCH questions you may encounter in Excel
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
            Ready to practice INDEX MATCH?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding the formula is only the beginning. Practice
            realistic Excel scenarios and build confidence using INDEX MATCH
            in interviews and real-world work.
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

            <a
              href="/excel-functions/sumifs"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">
                SUMIFS & COUNTIFS
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice conditional calculations used in reporting and analysis.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn SUMIFS →
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