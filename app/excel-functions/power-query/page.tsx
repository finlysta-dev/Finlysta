import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Query in Excel: Complete Guide, Examples & Practice",
  description:
    "Learn Power Query in Excel with step-by-step examples, data transformation, merging queries, cleaning data, M language basics, common errors, interview questions and practical exercises.",
  keywords: [
    "Power Query",
    "Power Query Excel",
    "Power Query tutorial",
    "how to use Power Query",
    "Power Query example",
    "Excel Power Query",
    "Power Query for beginners",
    "Power Query interview questions",
    "Power Query data transformation",
    "Power Query merge queries",
    "Power Query append queries",
    "Power Query M language",
    "Excel data cleaning",
    "Power Query practice",
  ],
  alternates: {
    canonical: "/excel/power-query",
  },
  openGraph: {
    title: "Power Query in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn Power Query in Excel with step-by-step examples, data transformation, merging queries, M language basics, common errors, interview questions and practical exercises.",
    url: "https://finlysta.com/excel/power-query",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Power Query in Excel - Complete Guide, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Query in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn Power Query with examples, data transformation, merging, M language basics, common errors and practical interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is Power Query in Excel?",
    answer:
      "Power Query is Excel's data transformation and cleaning tool. It allows you to import, clean, and combine data from multiple sources with repeatable, automated steps.",
  },
  {
    question: "How do I access Power Query in Excel?",
    answer:
      "Go to the Data tab → Get & Transform Data → Get Data. You can also find it under the Power Query tab in newer versions. The editor opens when you click 'Transform Data'.",
  },
  {
    question: "What are the main benefits of Power Query?",
    answer:
      "Power Query automates data cleaning, remembers every step you take, and allows you to refresh with one click. It saves hours of manual work, especially when working with the same data regularly.",
  },
  {
    question: "What sources can Power Query import from?",
    answer:
      "Power Query can import from Excel files, CSV, text files, databases (SQL Server, Access), web pages, SharePoint, Azure, and many other sources.",
  },
  {
    question: "What is the M language in Power Query?",
    answer:
      "M is the programming language behind Power Query. It's what Power Query uses to perform data transformations. While you can write M code directly, most users use the visual interface to build steps.",
  },
  {
    question: "How do I merge queries in Power Query?",
    answer:
      "Merge queries by going to Home → Merge Queries. Select the tables, choose matching columns, and specify the join type. This is like SQL joins within Excel.",
  },
  {
    question: "What is the difference between merge and append queries?",
    answer:
      "Merge combines columns from multiple tables based on matching keys (like a JOIN). Append stacks rows from multiple tables together (like a UNION).",
  },
  {
    question: "How do I refresh data in Power Query?",
    answer:
      "Click Refresh on the Data tab or right-click on the query and select Refresh. Power Query re-executes all steps with the latest source data.",
  },
];

const interviewQuestions = [
  {
    question: "What is Power Query in Excel?",
    answer:
      "Power Query is a data connection technology that enables users to discover, connect, combine, and refine data across a wide variety of sources. It's a game-changer for data preparation and cleaning.",
  },
  {
    question: "What is the difference between Power Query and Pivot Tables?",
    answer:
      "Power Query is for importing, cleaning, and transforming data. Pivot Tables are for summarizing and analyzing already-clean data. They work together—Power Query cleans data, Pivot Tables analyze it.",
  },
  {
    question: "What is the M language in Power Query?",
    answer:
      "M is a functional programming language used in Power Query. Each transformation step you apply in the UI generates M code. You can view and edit the M code in the Advanced Editor.",
  },
  {
    question: "How would you remove duplicates using Power Query?",
    answer:
      "Select the columns you want to check, right-click, and choose 'Remove Duplicates'. Power Query will keep the first occurrence and remove all others. This is much faster than doing it manually.",
  },
  {
    question: "How do you merge two tables in Power Query?",
    answer:
      "Use the 'Merge Queries' feature. Select the primary table and the secondary table, choose the matching columns, and select the join type (Inner, Left Outer, Right Outer, Full Outer).",
  },
  {
    question: "What are some common Power Query transformations?",
    answer:
      "Common transformations include: removing duplicates, changing data types, filtering rows, splitting columns, replacing values, merging and appending queries, and adding custom columns.",
  },
  {
    question: "How can Power Query help with data cleaning?",
    answer:
      "Power Query can automatically identify and fix common data issues like incorrect data types, missing values, extra spaces, inconsistent formatting, and duplicate records.",
  },
  {
    question: "What is the difference between merging and appending queries?",
    answer:
      "Merging joins tables horizontally (adding columns). Appending stacks tables vertically (adding rows). Merging is like SQL JOIN, appending is like SQL UNION.",
  },
];

const mistakes = [
  {
    title: "Not checking data types before transformations",
    description:
      "Power Query sometimes applies automatic data types that may not be correct. Always check and confirm data types for each column before applying transformations.",
  },
  {
    title: "Merging queries incorrectly",
    description:
      "When merging, ensure the key columns have the same data type and are matched correctly. Incorrect merges can result in missing or duplicate data.",
  },
  {
    title: "Ignoring performance optimization",
    description:
      "For large datasets, use 'Remove Duplicates' early, avoid unnecessary steps, and consider using 'Filter Rows' to reduce data volume before complex transformations.",
  },
  {
    title: "Not using the Advanced Editor",
    description:
      "The Advanced Editor shows all your M code. Understanding it helps with debugging, copying queries, and adding custom logic that the UI doesn't support.",
  },
  {
    title: "Forgetting to refresh queries",
    description:
      "Power Query doesn't auto-refresh when source data changes. Always use 'Refresh' to update your data. You can also set up scheduled refresh in Power BI.",
  },
];

const keyBenefits = [
  {
    title: "Automated Data Cleaning",
    description: "Transform messy data into clean, structured data in seconds.",
  },
  {
    title: "Repeatable Workflows",
    description: "Once you build a query, it can be refreshed with new data instantly.",
  },
  {
    title: "Multi-Source Connection",
    description: "Import and combine data from Excel, CSV, databases, web, and more.",
  },
  {
    title: "No Programming Required",
    description: "Most transformations can be done through a user-friendly interface.",
  },
];

const dataSources = [
  { name: "Excel Files", description: "Import from .xlsx, .xls files" },
  { name: "CSV / Text Files", description: "Import from .csv, .txt files" },
  { name: "Databases", description: "SQL Server, Oracle, MySQL, Access" },
  { name: "Web", description: "Import from web pages and APIs" },
  { name: "SharePoint", description: "Import from SharePoint lists and folders" },
  { name: "Azure", description: "Azure SQL, Blob Storage, Data Lake" },
];

export default function PowerQueryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Power Query in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn Power Query in Excel with step-by-step examples, data transformation, merging queries, M language basics, common errors, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel/power-query",
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
        name: "Power Query",
        item: "https://finlysta.com/excel/power-query",
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
              <li className="font-semibold text-slate-900">Power Query</li>
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
            Power Query in Excel: Complete Guide, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use Power Query in Excel to import, clean, transform,
            and combine data from multiple sources. Master data preparation,
            merging, M language basics, and interview-focused exercises.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>📊 10+ practice exercises</span>
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
              href="/excel/pivot-tables"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Learn Pivot Tables
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* What is Power Query */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is Power Query in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Power Query is Excel's powerful data transformation and cleaning tool. It allows you to import, clean, and combine data from multiple sources with automated, repeatable steps.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Think of Power Query as a data preparation studio. You can connect to various data sources, apply transformations (like removing duplicates, changing data types, splitting columns), and load clean data into Excel or Power BI.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Power Query is essential for data analysts, finance professionals, and anyone who works with data regularly. It saves hours of manual data cleaning and makes your workflow repeatable and reliable.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Power Query is increasingly important in interviews for data analyst and finance roles. Employers want candidates who can automate data cleaning and build efficient, repeatable workflows.
            </p>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Key Benefits of Power Query
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

        {/* Data Sources */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Data Sources Power Query Can Import From
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dataSources.map((source) => (
              <div
                key={source.name}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-bold text-slate-900">{source.name}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Access */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Access Power Query
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            To access Power Query in Excel:
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Go to the Data tab in the Excel ribbon",
              "Click on Get Data → From File → From Excel Workbook (or other sources)",
              "Select your file and click Import",
              "The Power Query Editor will open showing your data",
              "Apply transformations and click Close & Load to load the data",
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

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Quick tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              You can also access Power Query directly from the Power Query tab or by using keyboard shortcuts. In newer Excel versions, go to Data → Get & Transform Data.
            </p>
          </div>
        </section>

        {/* Common Transformations */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common Power Query Transformations
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Here are some of the most commonly used transformations in Power Query:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Remove Duplicates</h3>
              <p className="mt-2 text-sm text-slate-600">
                Select columns → Right-click → Remove Duplicates. Keeps first occurrence.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Change Data Type</h3>
              <p className="mt-2 text-sm text-slate-600">
                Click the data type icon next to column name. Choose from Text, Number, Date, etc.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Filter Rows</h3>
              <p className="mt-2 text-sm text-slate-600">
                Click dropdown on column header → Filter → Choose conditions or values.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Split Column</h3>
              <p className="mt-2 text-sm text-slate-600">
                Right-click column → Split Column → By Delimiter or By Position.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Replace Values</h3>
              <p className="mt-2 text-sm text-slate-600">
                Right-click column → Replace Values → Find and replace text or numbers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Add Custom Column</h3>
              <p className="mt-2 text-sm text-slate-600">
                Add Column → Custom Column → Write M formula to create new data.
              </p>
            </div>
          </div>
        </section>

        {/* Merging Queries */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Merging Queries (Like SQL JOIN)
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Merging queries combines columns from two tables based on matching key columns. This is similar to a SQL JOIN.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              Home → Merge Queries → Select Tables → Choose Matching Columns → Select Join Type
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            Join types available:
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Inner Join</h3>
              <p className="mt-2 text-sm text-slate-600">
                Returns matching rows from both tables. Similar to SQL INNER JOIN.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Left Outer Join</h3>
              <p className="mt-2 text-sm text-slate-600">
                Returns all rows from left table, matching from right. Similar to SQL LEFT JOIN.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Right Outer Join</h3>
              <p className="mt-2 text-sm text-slate-600">
                Returns all rows from right table, matching from left. Similar to SQL RIGHT JOIN.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Full Outer Join</h3>
              <p className="mt-2 text-sm text-slate-600">
                Returns all rows from both tables. Similar to SQL FULL JOIN.
              </p>
            </div>
          </div>
        </section>

        {/* Appending Queries */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Appending Queries (Like SQL UNION)
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Appending stacks rows from multiple tables together. This is similar to a SQL UNION.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              Home → Append Queries → Select Tables → Click OK
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            Append queries when:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
            <li>You have monthly sales data in separate files and want to combine them</li>
            <li>You have employee data from different departments with the same columns</li>
            <li>You want to consolidate data from multiple sources</li>
          </ul>

          <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
            <p className="font-bold text-yellow-900">⚠️ Note</p>
            <p className="mt-2 leading-7 text-yellow-900/80">
              For appending queries, all tables should have the same column structure. Power Query tries to match columns by name when appending.
            </p>
          </div>
        </section>

        {/* M Language Basics */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            M Language Basics
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            M is the programming language behind Power Query. Every transformation you apply in the UI generates M code.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Here are some basic M language concepts:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Basic M Formula</h3>
              <pre className="mt-3 overflow-x-auto rounded bg-slate-100 p-4 text-sm font-mono text-slate-700">
                {`let
    Source = Excel.CurrentWorkbook(),
    Data = Source{[Name="Table1"]}[Content],
    RemovedDuplicates = Table.Distinct(Data)
in
    RemovedDuplicates`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Common M Functions</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><code className="bg-slate-100 px-2 py-0.5 rounded">Table.Distinct()</code> - Remove duplicates</li>
                <li><code className="bg-slate-100 px-2 py-0.5 rounded">Table.TransformColumnTypes()</code> - Change data types</li>
                <li><code className="bg-slate-100 px-2 py-0.5 rounded">Table.SelectRows()</code> - Filter rows</li>
                <li><code className="bg-slate-100 px-2 py-0.5 rounded">Table.AddColumn()</code> - Add custom column</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Pro tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              You can view and edit M code in the Advanced Editor. Go to View → Advanced Editor or Home → Advanced Editor. This is useful for copying queries between workbooks.
            </p>
          </div>
        </section>

        {/* Example Workflow */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Example: Power Query Data Cleaning Workflow
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Here's a typical Power Query workflow for cleaning sales data:
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Import data from CSV file (Data → Get Data → From File → From CSV)",
              "Remove duplicate rows (Remove Duplicates)",
              "Change data types (Date, Number, Text)",
              "Filter out blank rows and invalid data",
              "Split Full Name into First Name and Last Name",
              "Replace NULL values with 0 in numeric columns",
              "Add a custom column for Profit (Revenue - Cost)",
              "Load clean data into Excel (Close & Load)",
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
              The power of Power Query is that all these steps are recorded. When new data arrives, you simply click Refresh and the entire workflow runs again automatically.
            </p>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common Power Query Errors and Mistakes
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
            Power Query Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common Power Query questions you may encounter in Excel
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
            Ready to practice Power Query?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding Power Query is essential for modern data analysis.
            Practice realistic scenarios and build confidence using Power Query
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