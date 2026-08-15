import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Cleaning in Excel: Complete Guide, Examples & Practice",
  description:
    "Learn data cleaning in Excel with step-by-step examples, TRIM, CLEAN, PROPER, removing duplicates, handling missing values, text to columns, Flash Fill, data validation, common errors, interview questions and practical exercises.",
  keywords: [
    "data cleaning",
    "data cleaning Excel",
    "Excel data cleaning",
    "how to clean data in Excel",
    "TRIM function Excel",
    "CLEAN function Excel",
    "remove duplicates Excel",
    "text to columns Excel",
    "Flash Fill Excel",
    "data validation Excel",
    "Excel data preparation",
    "data cleaning interview questions",
    "Excel data quality",
    "data cleaning practice",
  ],
  alternates: {
    canonical: "/excel/data-cleaning",
  },
  openGraph: {
    title: "Data Cleaning in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn data cleaning in Excel with TRIM, CLEAN, PROPER, removing duplicates, handling missing values, text to columns, Flash Fill, data validation, common errors and interview questions.",
    url: "https://finlysta.com/excel/data-cleaning",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Data Cleaning in Excel - Complete Guide, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Cleaning in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn data cleaning with TRIM, CLEAN, PROPER, removing duplicates, handling missing values, text to columns and practical interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is data cleaning in Excel?",
    answer:
      "Data cleaning is the process of identifying and correcting errors, inconsistencies, and inaccuracies in datasets. In Excel, this includes removing duplicates, fixing formatting, handling missing values, and standardizing data.",
  },
  {
    question: "What is the TRIM function in Excel?",
    answer:
      "TRIM removes all extra spaces from text except for single spaces between words. For example, '  Hello   World  ' becomes 'Hello World'. It's essential for cleaning text data.",
  },
  {
    question: "What is the CLEAN function in Excel?",
    answer:
      "CLEAN removes non-printable characters from text. These are often hidden characters that come from imported data, causing issues with lookups and analysis.",
  },
  {
    question: "How do I remove duplicates in Excel?",
    answer:
      "Go to Data → Remove Duplicates. Select the columns where you want to check for duplicates. Excel will keep the first occurrence and remove all others.",
  },
  {
    question: "What is Text to Columns in Excel?",
    answer:
      "Text to Columns is a feature that splits text into multiple columns based on a delimiter (like comma, tab, or space) or fixed width. It's useful for separating full names, addresses, or other combined data.",
  },
  {
    question: "What is Flash Fill in Excel?",
    answer:
      "Flash Fill automatically fills data based on patterns you establish. For example, if you type 'John' from 'John Doe' in the next column, Flash Fill will complete the pattern. Use Ctrl+E to activate it.",
  },
  {
    question: "What is data validation in Excel?",
    answer:
      "Data validation restricts what users can enter into a cell. You can create dropdown lists, set number limits, or add custom error messages to prevent incorrect data entry.",
  },
  {
    question: "How do I handle missing values in Excel?",
    answer:
      "You can handle missing values by: 1) Finding them using Ctrl+G → Special → Blanks, 2) Replacing with a specific value, 3) Using IF/ISBLANK functions, 4) Removing rows with missing data, or 5) Filling with averages or median.",
  },
];

const interviewQuestions = [
  {
    question: "What is data cleaning and why is it important?",
    answer:
      "Data cleaning is the process of detecting and correcting errors in datasets. It's important because dirty data leads to inaccurate analysis, wrong decisions, and unreliable reports. Most data analysts spend 60-80% of their time on data cleaning.",
  },
  {
    question: "How would you remove duplicate records in Excel?",
    answer:
      "Use Data → Remove Duplicates. You can select specific columns to check for duplicates. For more control, use Conditional Formatting to highlight duplicates first, then manually review or use Advanced Filter.",
  },
  {
    question: "What is the difference between TRIM and CLEAN functions?",
    answer:
      "TRIM removes extra spaces between words. CLEAN removes non-printable characters like line breaks and tabs. Together, they are powerful for cleaning text data. Use both: =CLEAN(TRIM(cell)).",
  },
  {
    question: "How do you fix inconsistent formatting in Excel?",
    answer:
      "Use PROPER for consistent capitalization, UPPER/LOWER for case conversion. Use Text to Columns for splitting data. Use Find and Replace for specific text changes. Also use TRIM for extra spaces and CLEAN for non-printable characters.",
  },
  {
    question: "How would you handle missing or blank values in a dataset?",
    answer:
      "1) Use Ctrl+G → Special → Blanks to find them. 2) Fill with a specific value like 'N/A' or 0. 3) Use IF(ISBLANK(cell), value, cell). 4) Use AVERAGE or MEDIAN to fill numeric blanks. 5) Remove rows with excessive missing data.",
  },
  {
    question: "What is Flash Fill and how is it useful?",
    answer:
      "Flash Fill automatically fills data based on a pattern you establish. It's useful for splitting names, formatting data, and extracting information without formulas. Just start typing and press Ctrl+E.",
  },
  {
    question: "How can you ensure data quality in Excel?",
    answer:
      "Use data validation to restrict entries, apply conditional formatting to flag errors, regularly remove duplicates, standardize data formats, and document your cleaning process. Also, always keep a backup of the original data.",
  },
  {
    question: "What are some common data cleaning challenges?",
    answer:
      "Common challenges include: inconsistent formatting, missing values, duplicate records, extra spaces, incorrect data types, merged cells, and hidden characters. Each requires a different approach to fix effectively.",
  },
];

const mistakes = [
  {
    title: "Not cleaning data before analysis",
    description:
      "Always clean data before performing any analysis. Dirty data leads to wrong conclusions. Start with a backup copy and document your cleaning steps.",
  },
  {
    title: "Using Find and Replace incorrectly",
    description:
      "Be careful with Find and Replace as it can accidentally modify unintended cells. Use 'Match entire cell contents' and 'Match case' options for more precise replacements.",
  },
  {
    title: "Not using TRIM on imported text",
    description:
      "Imported data often has extra spaces that can break lookups. Always use TRIM on text data before using it in formulas like VLOOKUP or INDEX MATCH.",
  },
  {
    title: "Ignoring hidden characters",
    description:
      "Data from other systems often contains non-printable characters. Use CLEAN to remove these, especially when lookups aren't working correctly.",
  },
  {
    title: "Overwriting original data",
    description:
      "Always keep a backup of your raw data. Work on a copy or use Power Query to clean data without modifying the original. This allows you to go back if something goes wrong.",
  },
];

const cleaningFunctions = [
  {
    name: "TRIM",
    description: "Removes extra spaces from text",
    example: '=TRIM("  Hello   World  ") → "Hello World"',
  },
  {
    name: "CLEAN",
    description: "Removes non-printable characters",
    example: "=CLEAN(A1) → Removes hidden characters",
  },
  {
    name: "PROPER",
    description: "Capitalizes first letter of each word",
    example: '=PROPER("john doe") → "John Doe"',
  },
  {
    name: "UPPER",
    description: "Converts text to uppercase",
    example: '=UPPER("john") → "JOHN"',
  },
  {
    name: "LOWER",
    description: "Converts text to lowercase",
    example: '=LOWER("JOHN") → "john"',
  },
  {
    name: "LEFT",
    description: "Extracts characters from the left",
    example: '=LEFT("Hello", 2) → "He"',
  },
  {
    name: "RIGHT",
    description: "Extracts characters from the right",
    example: '=RIGHT("Hello", 2) → "lo"',
  },
  {
    name: "MID",
    description: "Extracts characters from the middle",
    example: '=MID("Hello", 2, 3) → "ell"',
  },
];

const keyBenefits = [
  {
    title: "Better Data Quality",
    description: "Remove errors, inconsistencies, and duplicates for accurate analysis.",
  },
  {
    title: "Improved Accuracy",
    description: "Clean data leads to reliable reports, charts, and business decisions.",
  },
  {
    title: "Time Savings",
    description: "Automate cleaning with functions and features to save hours of manual work.",
  },
  {
    title: "Better Lookup Results",
    description: "Clean data ensures VLOOKUP, XLOOKUP, and INDEX MATCH work correctly.",
  },
];

export default function DataCleaningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Data Cleaning in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn data cleaning in Excel with TRIM, CLEAN, PROPER, removing duplicates, handling missing values, text to columns, Flash Fill, data validation, common errors and interview questions.",
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
      "@id": "https://finlysta.com/excel/data-cleaning",
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
        name: "Excel",
        item: "https://finlysta.com/practice",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Data Cleaning",
        item: "https://finlysta.com/excel/data-cleaning",
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
              <li className="font-semibold text-slate-900">Data Cleaning</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Excel Feature
            </span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Interview Question
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Data Cleaning in Excel: Complete Guide, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to clean data in Excel using TRIM, CLEAN, PROPER, removing
            duplicates, handling missing values, Text to Columns, Flash Fill,
            data validation, and interview-focused exercises.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>🧹 10+ cleaning techniques</span>
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
              href="/excel/power-query"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Learn Power Query
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* What is Data Cleaning */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is Data Cleaning in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Data cleaning is the process of identifying and correcting errors, inconsistencies, and inaccuracies in datasets. In Excel, this includes removing duplicates, fixing formatting, handling missing values, and standardizing data.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Data cleaning is one of the most important skills in data analysis. Most data professionals spend 60-80% of their time cleaning and preparing data before analysis.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Clean data leads to accurate reports, better business decisions, and reliable analysis. Dirty data can lead to wrong conclusions, lost revenue, and damaged credibility.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Data cleaning is a critical interview topic. Employers want candidates who can identify and fix data quality issues efficiently. Many interview tests include messy data that needs cleaning.
            </p>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why Data Cleaning Matters
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-bold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Functions */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Key Data Cleaning Functions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Here are the essential functions for cleaning data in Excel:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cleaningFunctions.map((func) => (
              <div
                key={func.name}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-bold text-slate-900">{func.name}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {func.description}
                </p>
                <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                  {func.example}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Removing Duplicates */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Removing Duplicates
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Duplicate records are common in datasets. Here are several ways to remove them:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Method 1: Remove Duplicates Feature</h3>
              <p className="mt-2 text-sm text-slate-600">
                Go to Data → Remove Duplicates. Select columns to check for duplicates.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Data tab → Remove Duplicates → Select columns → OK
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Method 2: Conditional Formatting</h3>
              <p className="mt-2 text-sm text-slate-600">
                Highlight duplicates visually before deciding which to remove.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Home → Conditional Formatting → Highlight Cell Rules → Duplicate Values
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Method 3: COUNTIF Formula</h3>
              <p className="mt-2 text-sm text-slate-600">
                Use COUNTIF to identify duplicates. Values greater than 1 are duplicates.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                {`=COUNTIF(A:A, A2) > 1 (returns TRUE for duplicates)`}
              </code>
            </div>
          </div>
        </section>

        {/* Handling Missing Values */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Handling Missing Values
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Missing values can affect analysis results. Here are strategies to handle them:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Find Missing Values</h3>
              <p className="mt-2 text-sm text-slate-600">
                Use Go To Special to find all blank cells quickly.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Ctrl+G → Special → Blanks → OK
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Replace with Value</h3>
              <p className="mt-2 text-sm text-slate-600">
                Fill blanks with a specific value like "N/A" or 0.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Type value → Ctrl+Enter (fills all selected blanks)
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Fill with Average</h3>
              <p className="mt-2 text-sm text-slate-600">
                Fill numeric blanks with the average of the column.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                =AVERAGE(range) → Copy → Paste into blanks
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">IF + ISBLANK</h3>
              <p className="mt-2 text-sm text-slate-600">
                Use formula to replace blanks without modifying original data.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                {`=IF(ISBLANK(A2), "N/A", A2)`}
              </code>
            </div>
          </div>
        </section>

        {/* Text to Columns */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Text to Columns
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Text to Columns splits text into multiple columns based on a delimiter or fixed width.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Common uses:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
            <li>Split full names into First Name and Last Name</li>
            <li>Separate addresses into Street, City, State, ZIP</li>
            <li>Split product codes by delimiter (e.g., "ABC-123" → "ABC" and "123")</li>
            <li>Extract dates from combined date-time fields</li>
          </ul>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              Data → Text to Columns → Choose Delimited or Fixed Width → Select Delimiter → Finish
            </code>
          </div>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Pro tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Text to Columns is permanent. If you need to keep both the original and split data, copy the column first, then apply Text to Columns to the copy.
            </p>
          </div>
        </section>

        {/* Flash Fill */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Flash Fill
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Flash Fill automatically fills data based on patterns you establish. It's one of Excel's smartest features.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Example: Extracting First Name</h3>
              <p className="mt-2 text-sm text-slate-600">
                If you have "John Doe" in column A, type "John" in column B. Excel will suggest the pattern.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Type pattern → Ctrl+E (or Data → Flash Fill)
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Example: Formatting Phone Numbers</h3>
              <p className="mt-2 text-sm text-slate-600">
                If you have "1234567890" and want "(123) 456-7890", type the format once and Excel learns.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Type format → Ctrl+E → All rows formatted
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Example: Extracting Email Domain</h3>
              <p className="mt-2 text-sm text-slate-600">
                From "john@company.com" extract "company.com" by typing the pattern.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Type pattern → Ctrl+E → All domains extracted
              </code>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
            <p className="font-bold text-yellow-900">⚠️ Note</p>
            <p className="mt-2 leading-7 text-yellow-900/80">
              Flash Fill is not dynamic. If you change the source data, you need to reapply Flash Fill. For dynamic solutions, use formulas like LEFT, RIGHT, or MID instead.
            </p>
          </div>
        </section>

        {/* Data Validation */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Data Validation
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Data validation prevents incorrect data entry by restricting what users can enter.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Dropdown Lists</h3>
              <p className="mt-2 text-sm text-slate-600">
                Create a dropdown list of valid options (e.g., "North", "South", "East", "West").
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Data → Data Validation → Allow: List → Source: North,South,East,West
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Number Restrictions</h3>
              <p className="mt-2 text-sm text-slate-600">
                Limit values to a specific range (e.g., between 0 and 100).
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Data → Data Validation → Allow: Whole Number → Between 0 and 100
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Date Restrictions</h3>
              <p className="mt-2 text-sm text-slate-600">
                Allow dates only within a specific range.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Data → Data Validation → Allow: Date → Between 01/01/2024 and 12/31/2024
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Custom Error Messages</h3>
              <p className="mt-2 text-sm text-slate-600">
                Show friendly error messages when users enter invalid data.
              </p>
              <code className="mt-3 block text-xs font-mono text-slate-700 bg-slate-100 p-2 rounded">
                Data → Data Validation → Error Alert → Title and Error Message
              </code>
            </div>
          </div>
        </section>

        {/* Example Workflow */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Example: Complete Data Cleaning Workflow
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Here's a typical data cleaning workflow in Excel:
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Make a backup copy of the original data",
              "Remove duplicate rows using Remove Duplicates feature",
              "Use TRIM to remove extra spaces from all text columns",
              "Use CLEAN to remove non-printable characters",
              "Standardize case using PROPER, UPPER, or LOWER as needed",
              "Find and handle missing values using Go To Special → Blanks",
              "Split combined data using Text to Columns",
              "Use Flash Fill for pattern-based extraction",
              "Apply data validation to prevent future errors",
              "Verify your cleaned data with sample analysis",
            ].map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-slate-200 p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                  {index + 1}
                </span>
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Key takeaway</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Data cleaning is not a one-time task. Build a repeatable process using Power Query or macros to automate cleaning for regularly updated data.
            </p>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common Data Cleaning Errors and Mistakes
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
            Data Cleaning Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common data cleaning questions you may encounter in Excel
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
            Ready to practice data cleaning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Data cleaning is a critical skill for any Excel professional. Practice
            realistic scenarios and build confidence using data cleaning techniques
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
              href="/excel/dashboards"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">Excel Dashboards</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practice turning raw data into useful business reports and dashboards.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn Dashboards →
              </span>
            </a>

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