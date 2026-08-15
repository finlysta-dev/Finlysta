import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pivot Tables in Excel: Complete Guide, Examples & Practice",
  description:
    "Learn Pivot Tables in Excel with step-by-step examples, formatting tips, calculated fields, grouping, slicers, Pivot Charts, common errors, interview questions and practical exercises.",
  keywords: [
    "Pivot Tables",
    "Pivot Table Excel",
    "Pivot Table tutorial",
    "how to create a Pivot Table",
    "Pivot Table example",
    "Excel Pivot Table",
    "Pivot Table for beginners",
    "Pivot Table interview questions",
    "Pivot Table calculated fields",
    "Pivot Table grouping",
    "Pivot Table slicers",
    "Pivot Chart",
    "Excel data summarization",
    "Pivot Table practice",
  ],
  alternates: {
    canonical: "/excel/pivot-tables",
  },
  openGraph: {
    title: "Pivot Tables in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn Pivot Tables in Excel with step-by-step examples, calculated fields, grouping, slicers, Pivot Charts, common errors, interview questions and practical exercises.",
    url: "https://finlysta.com/excel/pivot-tables",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pivot Tables in Excel - Complete Guide, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pivot Tables in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn Pivot Tables with examples, formatting, calculated fields, common errors and practical interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is a Pivot Table in Excel?",
    answer:
      "A Pivot Table is a powerful Excel feature that summarizes and analyzes large datasets. It allows you to group, count, sum, and visualize data without writing formulas.",
  },
  {
    question: "How do I create a Pivot Table in Excel?",
    answer:
      "Select your data, go to Insert → PivotTable, choose where to place it, and then drag fields to Rows, Columns, and Values areas to build your summary.",
  },
  {
    question: "What are the main components of a Pivot Table?",
    answer:
      "The main components are: Rows (categories), Columns (categories), Values (numbers to summarize), and Filters (to refine data). The Fields pane lets you arrange these easily.",
  },
  {
    question: "How do I group dates in a Pivot Table?",
    answer:
      "Right-click on a date field in the Pivot Table and select 'Group'. You can group by Years, Quarters, Months, or Days. This is essential for monthly, quarterly, or yearly reports.",
  },
  {
    question: "What is a calculated field in a Pivot Table?",
    answer:
      "A calculated field allows you to create new values based on existing fields. For example, you can create a 'Profit' field using 'Revenue - Cost' directly in the Pivot Table.",
  },
  {
    question: "What are slicers in Pivot Tables?",
    answer:
      "Slicers are visual filters that let you quickly filter data in Pivot Tables. They look like buttons and make filtering interactive and user-friendly, especially in dashboards.",
  },
  {
    question: "How do I refresh a Pivot Table?",
    answer:
      "Right-click on the Pivot Table and select 'Refresh'. You can also go to Data → Refresh All. This updates the Pivot Table when the source data changes.",
  },
  {
    question: "What is the difference between a Pivot Table and a regular table?",
    answer:
      "A regular table stores data. A Pivot Table summarizes and analyzes that data. Pivot Tables are dynamic—they can be rearranged and recalculated without changing the source data.",
  },
];

const interviewQuestions = [
  {
    question: "What is a Pivot Table in Excel?",
    answer:
      "A Pivot Table is a data summarization tool that automatically sorts, counts, totals, and averages data stored in a spreadsheet. It's one of the most commonly used features in Excel for reporting.",
  },
  {
    question: "How do you create a Pivot Table?",
    answer:
      "Select your data range, go to Insert → PivotTable, choose the location (new or existing worksheet), and then use the Fields pane to drag and drop fields into Rows, Columns, and Values areas.",
  },
  {
    question: "What are the four areas of a Pivot Table?",
    answer:
      "The four areas are: Rows (categories down the left), Columns (categories across the top), Values (numbers to summarize), and Filters (to limit what data appears).",
  },
  {
    question: "How would you group sales data by month in a Pivot Table?",
    answer:
      "Right-click on any date in the Pivot Table, select 'Group', then choose 'Months'. You can also group by Years, Quarters, or Days depending on your reporting needs.",
  },
  {
    question: "What is a calculated field in a Pivot Table and when would you use it?",
    answer:
      "A calculated field creates a new metric from existing fields. For example, if you have Revenue and Cost, you can create a calculated field for Profit. Use it when you need a custom calculation that doesn't exist in your source data.",
  },
  {
    question: "How do you show values as percentages in a Pivot Table?",
    answer:
      "Right-click on the values field, select 'Value Field Settings', go to the 'Show Values As' tab, and choose '% of Grand Total', '% of Column Total', or '% of Row Total'.",
  },
  {
    question: "What are slicers and when would you use them?",
    answer:
      "Slicers are visual filters that display as buttons. You can use them to create interactive dashboards and reports where users can click to filter data by different categories.",
  },
  {
    question: "What are some common challenges with Pivot Tables?",
    answer:
      "Common challenges include: data not being in the right format (needs to be tabular), blank rows or columns, #N/A errors, needing to refresh data, and ensuring number formats are correctly applied.",
  },
];

const mistakes = [
  {
    title: "Data not in tabular format",
    description:
      "Pivot Tables work best with data in a tabular format—rows of data with column headers. Avoid blank rows, merged cells, and summary rows in the source data.",
  },
  {
    title: "Forgetting to refresh after data changes",
    description:
      "Pivot Tables don't auto-update when source data changes. Right-click and select 'Refresh' or use Data → Refresh All to update the Pivot Table.",
  },
  {
    title: "Using numbers that are stored as text",
    description:
      "If numbers are stored as text, Pivot Tables won't calculate them correctly. Use the Number Format or Text to Columns to convert text to numbers.",
  },
  {
    title: "Not using filters effectively",
    description:
      "Filters help focus on specific data. If you're not using them, you might be missing important insights or creating unnecessarily large Pivot Tables.",
  },
  {
    title: "Ignoring Pivot Table options",
    description:
      "Right-click options like 'Show Values As', 'Group', and 'Sort' can unlock powerful analysis. Always explore these options to get the most out of your Pivot Tables.",
  },
];

const keyBenefits = [
  {
    title: "Quick Summarization",
    description: "Sum, average, count, and find percentages in seconds.",
  },
  {
    title: "Dynamic Analysis",
    description: "Rearrange fields and change summaries without touching the source data.",
  },
  {
    title: "Grouping & Filtering",
    description: "Group by dates, categories, and numbers, then filter with slicers.",
  },
  {
    title: "Interactive Dashboards",
    description: "Combine Pivot Tables, slicers, and charts to create interactive reports.",
  },
];

export default function PivotTablesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pivot Tables in Excel: Complete Guide, Examples & Practice",
    description:
      "Learn Pivot Tables in Excel with step-by-step examples, calculated fields, grouping, slicers, Pivot Charts, common errors, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel/pivot-tables",
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
        name: "Pivot Tables",
        item: "https://finlysta.com/excel/pivot-tables",
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
              <li className="font-semibold text-slate-900">Pivot Tables</li>
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
            Pivot Tables in Excel: Complete Guide, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use Pivot Tables in Excel to summarize, analyze, and
            visualize large datasets. Master grouping, calculated fields,
            slicers, Pivot Charts, and interview-focused exercises.
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
        {/* What is a Pivot Table */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is a Pivot Table in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            A Pivot Table is one of Excel's most powerful features. It allows you to summarize, analyze, and present large datasets quickly and efficiently.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            With a Pivot Table, you can group data by categories, calculate totals, averages, and percentages, and create interactive reports—all without writing a single formula.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Pivot Tables are essential for finance, accounting, operations, sales, and data analyst roles. They are frequently tested in interviews for their ability to handle real-world data analysis scenarios.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Pivot Tables are among the most frequently tested Excel skills in interviews. Employers want to know if you can quickly summarize data, spot trends, and create meaningful insights—all skills that Pivot Tables enable.
            </p>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Key Benefits of Pivot Tables
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

        {/* How to Create */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Create a Pivot Table
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Follow these simple steps to create your first Pivot Table:
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Select any cell in your data range",
              "Go to Insert → PivotTable",
              "Choose where to place the Pivot Table (new or existing worksheet)",
              "In the PivotTable Fields pane, drag fields to Rows, Columns, and Values",
              "The Pivot Table updates instantly as you arrange the fields",
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
            <p className="font-bold text-green-900">💡 Pro tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Make sure your data is in a tabular format with column headers and no blank rows or columns. This ensures Pivot Table works correctly and accurately.
            </p>
          </div>
        </section>

        {/* Example */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pivot Table Example
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Imagine you have a sales dataset with Region, Product, Salesperson, and Sales. You want to see total sales by Region and Product.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap p-4 font-bold">Region</th>
                  <th className="whitespace-nowrap p-4 font-bold">Product</th>
                  <th className="whitespace-nowrap p-4 font-bold">Salesperson</th>
                  <th className="whitespace-nowrap p-4 font-bold">Sales (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4">North</td>
                  <td className="p-4">Electronics</td>
                  <td className="p-4">Amit</td>
                  <td className="p-4">10,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">North</td>
                  <td className="p-4">Furniture</td>
                  <td className="p-4">Priya</td>
                  <td className="p-4">8,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">South</td>
                  <td className="p-4">Electronics</td>
                  <td className="p-4">Rahul</td>
                  <td className="p-4">15,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">South</td>
                  <td className="p-4">Clothing</td>
                  <td className="p-4">Sneha</td>
                  <td className="p-4">12,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4">North</td>
                  <td className="p-4">Electronics</td>
                  <td className="p-4">Vikram</td>
                  <td className="p-4">12,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 leading-8 text-slate-600">
            A Pivot Table can instantly summarize this data to show:
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap p-4 font-bold">Region</th>
                  <th className="whitespace-nowrap p-4 font-bold">Electronics</th>
                  <th className="whitespace-nowrap p-4 font-bold">Furniture</th>
                  <th className="whitespace-nowrap p-4 font-bold">Clothing</th>
                  <th className="whitespace-nowrap p-4 font-bold">Grand Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">North</td>
                  <td className="p-4">22,000</td>
                  <td className="p-4">8,000</td>
                  <td className="p-4">-</td>
                  <td className="p-4 font-bold">30,000</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-4 font-medium">South</td>
                  <td className="p-4">15,000</td>
                  <td className="p-4">-</td>
                  <td className="p-4">12,000</td>
                  <td className="p-4 font-bold">27,000</td>
                </tr>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="p-4 font-bold">Grand Total</td>
                  <td className="p-4 font-bold">37,000</td>
                  <td className="p-4 font-bold">8,000</td>
                  <td className="p-4 font-bold">12,000</td>
                  <td className="p-4 font-bold">57,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            Notice how the Pivot Table quickly grouped sales by Region and Product, showing subtotals and a grand total—all without formulas!
          </p>
        </section>

        {/* Grouping */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Grouping Data in Pivot Tables
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Grouping is one of the most powerful Pivot Table features. You can group by dates, numbers, and categories.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Grouping by Date</h3>
              <p className="mt-2 text-sm text-slate-600">
                Right-click on any date and select 'Group'. Choose Years, Quarters, Months, or Days.
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Right-click date → Group → Select Months
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Grouping by Number</h3>
              <p className="mt-2 text-sm text-slate-600">
                Right-click on numeric fields and select 'Group' to create ranges (e.g., 0-100, 101-200).
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Right-click number → Group → Set Starting, Ending, and Step values
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Grouping by Category</h3>
              <p className="mt-2 text-sm text-slate-600">
                Manually group text items by selecting them and using 'Group Selection'.
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Select items → Right-click → Group
              </code>
            </div>
          </div>
        </section>

        {/* Calculated Fields */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Calculated Fields in Pivot Tables
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Calculated fields allow you to create new metrics from existing fields without changing your source data.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              = Revenue - Cost
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            To add a calculated field:
          </p>

          <div className="mt-4 space-y-3 text-slate-600">
            <p>1. Click on the Pivot Table</p>
            <p>2. Go to PivotTable Analyze → Fields, Items, & Sets → Calculated Field</p>
            <p>3. Give it a name (e.g., "Profit")</p>
            <p>4. Enter the formula (e.g., = Revenue - Cost)</p>
            <p>5. Click OK</p>
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
            <p className="font-bold text-yellow-900">⚠️ Note</p>
            <p className="mt-2 leading-7 text-yellow-900/80">
              Calculated fields use the summarized values, not individual rows. For row-level calculations, use a formula column in the source data instead.
            </p>
          </div>
        </section>

        {/* Show Values As */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Show Values As: Percentages & More
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            The "Show Values As" feature lets you display values as percentages, running totals, and more.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">% of Grand Total</h3>
              <p className="mt-2 text-sm text-slate-600">
                Shows each value as a percentage of the grand total.
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Right-click → Value Field Settings → Show Values As → % of Grand Total
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">% of Row Total</h3>
              <p className="mt-2 text-sm text-slate-600">
                Shows each value as a percentage of its row total.
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Right-click → Value Field Settings → Show Values As → % of Row Total
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">% of Column Total</h3>
              <p className="mt-2 text-sm text-slate-600">
                Shows each value as a percentage of its column total.
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Right-click → Value Field Settings → Show Values As → % of Column Total
              </code>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Running Total</h3>
              <p className="mt-2 text-sm text-slate-600">
                Shows cumulative totals over time or categories.
              </p>
              <code className="mt-3 block font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded">
                Right-click → Value Field Settings → Show Values As → Running Total In
              </code>
            </div>
          </div>
        </section>

        {/* Slicers */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Slicers: Interactive Filtering
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Slicers are visual filters that make it easy to filter Pivot Tables. They look like buttons and provide a user-friendly filtering experience.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            To add a slicer:
          </p>

          <div className="mt-4 space-y-3 text-slate-600">
            <p>1. Click on the Pivot Table</p>
            <p>2. Go to PivotTable Analyze → Insert Slicer</p>
            <p>3. Select the fields you want to filter</p>
            <p>4. Click OK</p>
          </div>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Dashboard tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              Connect multiple Pivot Tables to the same slicer by right-clicking the slicer → Report Connections → select all Pivot Tables. This creates a truly interactive dashboard.
            </p>
          </div>
        </section>

        {/* Pivot Charts */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pivot Charts: Visualizing Pivot Table Data
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Pivot Charts are charts that are directly connected to Pivot Tables. When you filter the Pivot Table, the chart updates automatically.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            To create a Pivot Chart:
          </p>

          <div className="mt-4 space-y-3 text-slate-600">
            <p>1. Click on the Pivot Table</p>
            <p>2. Go to PivotTable Analyze → PivotChart</p>
            <p>3. Choose your chart type (Column, Bar, Line, etc.)</p>
            <p>4. Format and customize as needed</p>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Common Pivot Chart types</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              Column charts for comparisons, Line charts for trends over time, and Pie charts for showing proportions. Choose based on what story you want to tell.
            </p>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common Pivot Table Errors and Mistakes
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
            Pivot Table Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common Pivot Table questions you may encounter in Excel
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
            Ready to practice Pivot Tables?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding Pivot Tables is essential for data analysis. Practice
            realistic scenarios and build confidence using Pivot Tables in
            interviews and real-world work.
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