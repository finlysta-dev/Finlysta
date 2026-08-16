// app/excel-functions/xlookup/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XLOOKUP in Excel: Formula, Examples & Practice | Finlysta",
  description:
    "Learn XLOOKUP in Excel with formula syntax, examples, exact and approximate matches, error handling, vertical and horizontal lookups, XLOOKUP vs VLOOKUP, interview questions and practical exercises.",
  keywords: [
    "XLOOKUP",
    "XLOOKUP Excel",
    "XLOOKUP formula",
    "how to use XLOOKUP",
    "XLOOKUP example",
    "Excel lookup formula",
    "Excel lookup function",
    "XLOOKUP for beginners",
    "XLOOKUP vs VLOOKUP",
    "XLOOKUP interview questions",
    "XLOOKUP practice",
    "Excel XLOOKUP tutorial",
  ],
  alternates: {
    canonical: "/excel-functions/xlookup",
  },
  openGraph: {
    title: "XLOOKUP in Excel: Formula, Examples & Practice",
    description:
      "Learn XLOOKUP in Excel with formulas, examples, error handling, XLOOKUP vs VLOOKUP, interview questions and practical exercises.",
    url: "https://finlysta.com/excel-functions/xlookup",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XLOOKUP in Excel - Formula, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XLOOKUP in Excel: Formula, Examples & Practice",
    description:
      "Learn XLOOKUP formulas, examples, error handling and practical interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is XLOOKUP in Excel?",
    answer:
      "XLOOKUP is a modern Excel function that searches for a value in a range and returns a corresponding value from another range. It's more flexible than VLOOKUP and can search in any direction.",
  },
  {
    question: "What is the XLOOKUP formula syntax?",
    answer:
      "The XLOOKUP syntax is: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode]). It requires only three arguments: what to find, where to find it, and what to return.",
  },
  {
    question: "How is XLOOKUP different from VLOOKUP?",
    answer:
      "XLOOKUP is more flexible than VLOOKUP. It can search left or right, has built-in error handling, doesn't require column index numbers, and is not affected by column insertions.",
  },
  {
    question: "Can XLOOKUP perform an exact match?",
    answer:
      "Yes. XLOOKUP defaults to exact match (match_mode = 0). You can also use 0 for exact match, -1 for exact match or next smaller, and 1 for exact match or next larger.",
  },
  {
    question: "Can XLOOKUP look to the left?",
    answer:
      "Yes, XLOOKUP can look in any direction. It searches the lookup_array regardless of its position relative to the return_array. This is a major advantage over VLOOKUP.",
  },
  {
    question: "How do you handle errors in XLOOKUP?",
    answer:
      "XLOOKUP has a built-in if_not_found argument. For example: =XLOOKUP(A2, B:B, C:C, 'Not Found'). This displays 'Not Found' when the value isn't found.",
  },
  {
    question: "Can XLOOKUP use wildcards?",
    answer:
      "Yes, XLOOKUP supports wildcards (* and ?) when match_mode is set to 2 (wildcard match). This is useful for finding partial matches.",
  },
  {
    question: "Is XLOOKUP available in all Excel versions?",
    answer:
      "XLOOKUP is available in Excel 365, Excel 2021, and newer versions. It is not available in Excel 2019 or earlier versions.",
  },
];

const interviewQuestions = [
  {
    question: "What is XLOOKUP in Excel?",
    answer:
      "XLOOKUP is a modern lookup function that replaces VLOOKUP and HLOOKUP. It searches for a value in a range and returns a corresponding value from another range, with built-in error handling.",
  },
  {
    question: "Explain the syntax of XLOOKUP.",
    answer:
      "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode]). The first three arguments are required: what to find, where to find it, and what to return.",
  },
  {
    question: "What is the advantage of XLOOKUP over VLOOKUP?",
    answer:
      "XLOOKUP is more flexible and robust. It can search in any direction, has built-in error handling, doesn't need column index numbers, and isn't affected by column insertions.",
  },
  {
    question: "How do you perform an exact match with XLOOKUP?",
    answer:
      "Exact match is the default behavior when match_mode is omitted. You can also use 0 for exact match. For example: =XLOOKUP(A2, B:B, C:C) returns an exact match.",
  },
  {
    question: "How do you handle #N/A errors in XLOOKUP?",
    answer:
      "Use the if_not_found argument. For example: =XLOOKUP(A2, B:B, C:C, 'Not Found'). This displays a custom message instead of an error.",
  },
  {
    question: "Can XLOOKUP look to the left?",
    answer:
      "Yes, XLOOKUP can search in any direction. Unlike VLOOKUP, it doesn't require the lookup column to be the first column of a table.",
  },
  {
    question: "What match modes are available in XLOOKUP?",
    answer:
      "XLOOKUP offers three match modes: 0 for exact match (default), -1 for exact match or next smaller, and 1 for exact match or next larger. There's also 2 for wildcard match.",
  },
  {
    question: "How do you use wildcards with XLOOKUP?",
    answer:
      "Set match_mode to 2 for wildcard match. Use * for multiple characters and ? for a single character. For example: =XLOOKUP('S*', A:A, B:B, 'Not Found', 2).",
  },
];

const mistakes = [
  {
    title: "Using the wrong match mode",
    description:
      "XLOOKUP defaults to exact match (0). If you need approximate match, use -1 (next smaller) or 1 (next larger). For wildcards, use 2.",
  },
  {
    title: "Not using the if_not_found argument",
    description:
      "XLOOKUP has built-in error handling. Use the if_not_found argument to display a custom message instead of #N/A errors.",
  },
  {
    title: "Using VLOOKUP habits with XLOOKUP",
    description:
      "XLOOKUP doesn't use column index numbers. It uses separate lookup and return arrays, making it more flexible and easier to maintain.",
  },
  {
    title: "Not understanding search modes",
    description:
      "XLOOKUP offers search modes: 1 for first-to-last (default), -1 for last-to-first, and 2 for binary search (sorted). Choose the right one for your needs.",
  },
  {
    title: "Using XLOOKUP in older Excel versions",
    description:
      "XLOOKUP is not available in Excel 2019 or earlier. Check the user's Excel version before using XLOOKUP in shared workbooks.",
  },
];

export default function XlookupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "XLOOKUP in Excel: Formula, Examples & Practice",
    description:
      "Learn XLOOKUP in Excel with formulas, examples, error handling, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel-functions/xlookup",
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
        name: "XLOOKUP",
        item: "https://finlysta.com/excel-functions/xlookup",
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
              <li className="font-semibold text-slate-900">XLOOKUP</li>
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
            XLOOKUP in Excel: Formula, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use XLOOKUP in Excel with simple formulas, practical
            examples, error handling, left lookups, match modes, and
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
        {/* What is XLOOKUP */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is XLOOKUP in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            XLOOKUP is Excel's modern lookup function that searches for a value in a range and returns a corresponding value from another range. It is designed to be a simpler, more flexible replacement for VLOOKUP and HLOOKUP.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            XLOOKUP is available in Excel 365, Excel 2021, and newer versions. It offers built-in error handling, can search in any direction, and doesn't require column index numbers.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            XLOOKUP is increasingly important for modern Excel users. Interviewers often ask about it to see if you're up to date with the latest Excel features.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              XLOOKUP is becoming a standard interview question. Employers want
              to know if you can use modern Excel features efficiently. XLOOKUP
              is preferred over VLOOKUP in companies that use Excel 365.
            </p>
          </div>
        </section>

        {/* Formula */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            XLOOKUP Formula
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
            </code>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0">
              {[
                ["lookup_value", "The value you want to find."],
                ["lookup_array", "The range containing the lookup value."],
                ["return_array", "The range containing the value to return."],
                ["if_not_found", "Value to display if not found (optional)."],
                ["match_mode", "0=exact, -1=next smaller, 1=next larger, 2=wildcard (optional)."],
                ["search_mode", "1=first-to-last, -1=last-to-first (optional)."],
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
            XLOOKUP Example
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Let's say you have an employee table with Employee ID in column A and Department in column B. You want to find the department for Employee ID "EMP103".
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =XLOOKUP("EMP103", A:A, B:B)
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            XLOOKUP searches for "EMP103" in column A and returns the
            corresponding value from column B ("Operations").
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

        {/* Error Handling */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            XLOOKUP Error Handling
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            One of the biggest advantages of XLOOKUP is its built-in error
            handling. Use the if_not_found argument to display a custom message.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =XLOOKUP(A2, B:B, C:C, "Not Found")
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula searches for the value in A2 in column B and returns
            the corresponding value from column C. If the value is not found,
            it displays "Not Found" instead of #N/A.
          </p>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Pro tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Unlike VLOOKUP, XLOOKUP doesn't require IFERROR. The if_not_found
              argument makes error handling cleaner and more readable.
            </p>
          </div>
        </section>

        {/* Left Lookup */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            XLOOKUP Left Lookup
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            XLOOKUP can search in any direction, making it much more flexible
            than VLOOKUP. Here's a left lookup example:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =XLOOKUP("Operations", B:B, A:A)
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula searches for "Operations" in column B and returns the
            Employee ID from column A—a left lookup that VLOOKUP cannot do.
          </p>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Key advantage</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Unlike VLOOKUP, XLOOKUP can return values from any column—left,
              right, or even from a completely different range.
            </p>
          </div>
        </section>

        {/* Match Modes */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            XLOOKUP Match Modes
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            XLOOKUP offers four match modes for different lookup scenarios:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">0 – Exact Match (Default)</h3>
              <p className="mt-2 text-sm text-slate-600">
                Finds an exact match. Most commonly used for IDs and codes.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                =XLOOKUP(A2, B:B, C:C, "Not Found", 0)
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">-1 – Exact Match or Next Smaller</h3>
              <p className="mt-2 text-sm text-slate-600">
                Finds exact match, or next smaller value if not found.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                =XLOOKUP(A2, B:B, C:C, "Not Found", -1)
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">1 – Exact Match or Next Larger</h3>
              <p className="mt-2 text-sm text-slate-600">
                Finds exact match, or next larger value if not found.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                =XLOOKUP(A2, B:B, C:C, "Not Found", 1)
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">2 – Wildcard Match</h3>
              <p className="mt-2 text-sm text-slate-600">
                Uses * and ? wildcards for partial matches.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                =XLOOKUP("S*", A:A, B:B, "Not Found", 2)
              </code>
            </div>
          </div>
        </section>

        {/* VLOOKUP Comparison */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            XLOOKUP vs VLOOKUP
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            XLOOKUP is the modern replacement for VLOOKUP. Here's how they compare:
          </p>

          <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[620px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold">XLOOKUP</th>
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
                  <td className="p-4 font-medium">Error handling</td>
                  <td className="p-4">Built-in (if_not_found)</td>
                  <td className="p-4">Requires IFERROR</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Column index number</td>
                  <td className="p-4">Not required</td>
                  <td className="p-4">Required</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Column insertions</td>
                  <td className="p-4">Not affected</td>
                  <td className="p-4">May break formulas</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Wildcard support</td>
                  <td className="p-4">Yes (match_mode=2)</td>
                  <td className="p-4">Limited</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">Availability</td>
                  <td className="p-4">Excel 365, Excel 2021+</td>
                  <td className="p-4">All Excel versions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common XLOOKUP Errors and Mistakes
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
            XLOOKUP Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common XLOOKUP questions you may encounter in Excel
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
            Ready to practice XLOOKUP?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding XLOOKUP is essential for modern Excel users. Practice
            realistic scenarios and build confidence using XLOOKUP in interviews
            and real-world work.
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
          <h2 className="text-2xl font-extrabold">Related Excel Topics</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="/excel-functions/vlookup"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">VLOOKUP & XLOOKUP</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice lookup formulas with realistic data and business
                scenarios.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn VLOOKUP →
              </span>
            </a>
            <a
              href="/excel-functions/index-match"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">INDEX & MATCH</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn flexible lookup techniques used in real-world Excel
                analysis.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn INDEX & MATCH →
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
              href="/practice"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Excel Practice</h3>
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