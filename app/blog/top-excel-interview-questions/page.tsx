// app/blog/top-excel-interview-questions/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top 10 Excel Interview Questions for Finance Roles | Finlysta",
  description:
    "Prepare for your finance interview with these 10 essential Excel questions that recruiters commonly ask. Learn how to answer them effectively with practical tips.",
  keywords: [
    "Excel interview questions",
    "finance interview Excel",
    "Excel interview preparation",
    "Excel test for finance",
    "financial analyst Excel",
    "Excel questions for finance interview",
    "Excel assessment",
  ],
  alternates: {
    canonical: "/blog/top-excel-interview-questions",
  },
  openGraph: {
    title: "Top 10 Excel Interview Questions for Finance Roles | Finlysta",
    description:
      "Prepare for your finance interview with these 10 essential Excel questions that recruiters commonly ask.",
    url: "https://finlysta.com/blog/top-excel-interview-questions",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top 10 Excel Interview Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 Excel Interview Questions for Finance Roles",
    description:
      "Prepare for your finance interview with these 10 essential Excel questions.",
    images: ["/og-image.png"],
  },
};

export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Top 10 Excel Interview Questions for Finance Roles",
    description:
      "Prepare for your finance interview with these 10 essential Excel questions that recruiters commonly ask.",
    author: {
      "@type": "Organization",
      name: "Finlysta",
    },
    publisher: {
      "@type": "Organization",
      name: "Finlysta",
    },
    datePublished: "2026-08-15",
    dateModified: "2026-08-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://finlysta.com/blog/top-excel-interview-questions",
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
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
            Interview Preparation
          </span>
          <span>•</span>
          <span>5 min read</span>
          <span>•</span>
          <span>August 15, 2026</span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          Top 10 Excel Interview Questions for Finance Roles
        </h1>

        <div className="mt-8 space-y-6 text-slate-600">
          {/* Introduction */}
          <p className="text-lg leading-8 text-slate-700">
            Excel is one of the most important skills for finance professionals.
            In interviews, you'll often be tested on your ability to use Excel
            efficiently and accurately. Here are the top 10 questions you need
            to prepare for to succeed in your finance interview.
          </p>

          <p className="leading-8">
            Finance roles—whether in investment banking, corporate finance,
            accounting, or financial analysis—require strong Excel skills. The
            key to succeeding in your interview is not just knowing the formulas,
            but understanding when and why to use them. Let's dive into the
            questions you are most likely to face.
          </p>

          {/* Question 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              1. What is the difference between SUMIF and SUMIFS?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span> SUMIF
              handles one condition, while SUMIFS handles multiple conditions.
              For example, SUMIF can sum sales where the region is "North"
              (single condition). SUMIFS, on the other hand, can sum sales where
              the region is "North" AND the month is "January" (multiple
              conditions).
            </p>
            <div className="mt-4 rounded-xl bg-slate-950 p-4">
              <code className="text-sm text-white">
                =SUMIFS(Sales_Range, Region_Range, "North", Month_Range, "January")
              </code>
            </div>
            <div className="mt-4 rounded-xl bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">💡 Why it matters:</p>
              <p className="mt-1 text-sm text-blue-800">
                In finance, you often need to analyze data based on multiple
                factors. For example, you might need to calculate revenue for a
                specific product in a specific region during a specific quarter.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              2. How do you use VLOOKUP?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span>{" "}
              VLOOKUP searches for a value in the first column of a table and
              returns a value from another column in the same row. The syntax is:
            </p>
            <div className="mt-4 rounded-xl bg-slate-950 p-4">
              <code className="text-sm text-white">
                =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
              </code>
            </div>
            <p className="mt-4 leading-8">
              Always use FALSE for exact matches when looking up IDs, codes, or
              other unique values. TRUE is used for approximate matches, like
              finding tax brackets or commission tiers.
            </p>
          </div>

          {/* Question 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              3. What is the difference between VLOOKUP and XLOOKUP?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span>{" "}
              VLOOKUP can only search to the right and requires a column index
              number. XLOOKUP is more flexible—it can search left or right, has
              built-in error handling, and doesn't need column numbers. XLOOKUP
              is available in Excel 365 and newer versions.
            </p>
            <div className="mt-4 rounded-xl bg-green-50 p-4 border border-green-200">
              <p className="text-sm font-semibold text-green-900">💡 Pro tip:</p>
              <p className="mt-1 text-sm text-green-800">
                If you're interviewing for a role where they use the latest Excel
                version, XLOOKUP is the preferred answer. If they use older
                versions, VLOOKUP is still relevant.
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              4. How do you handle #N/A errors in lookup formulas?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span> Wrap
              your formula with IFERROR or IFNA. For example:
            </p>
            <div className="mt-4 rounded-xl bg-slate-950 p-4">
              <code className="text-sm text-white">
                =IFERROR(VLOOKUP(A2, B:C, 2, FALSE), "Not Found")
              </code>
            </div>
            <p className="mt-4 leading-8">
              This shows a clean message instead of an ugly error. IFNA is
              specifically for #N/A errors, while IFERROR catches all errors.
            </p>
          </div>

          {/* Question 5 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              5. What is INDEX MATCH and why is it useful?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span> INDEX
              MATCH is a powerful lookup combination. MATCH finds the position
              of a value, and INDEX returns the value at that position. It's
              more flexible than VLOOKUP because it can look left or right and
              is not affected by column insertions.
            </p>
            <div className="mt-4 rounded-xl bg-slate-950 p-4">
              <code className="text-sm text-white">
                =INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
              </code>
            </div>
          </div>

          {/* Question 6 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              6. How do you create a Pivot Table?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span> Select
              your data, go to Insert → PivotTable, choose where to place it,
              and then drag fields to Rows, Columns, and Values areas. Pivot
              Tables are essential for quickly summarizing and analyzing large
              datasets without writing formulas.
            </p>
            <div className="mt-4 rounded-xl bg-purple-50 p-4 border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">💡 Pro tip:</p>
              <p className="mt-1 text-sm text-purple-800">
                Mention that you can group dates by month or quarter, add
                calculated fields, and use slicers for interactive filtering.
              </p>
            </div>
          </div>

          {/* Question 7 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              7. What are slicers in Pivot Tables?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span>{" "}
              Slicers are visual filters that let you quickly filter Pivot
              Tables. They look like buttons and make filtering interactive and
              user-friendly, especially in dashboards. Unlike dropdown filters,
              slicers show all available options visually, making it easier for
              users to understand their data.
            </p>
          </div>

          {/* Question 8 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              8. What is Power Query and how is it used?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span> Power
              Query is Excel's data transformation tool. It allows you to import,
              clean, and combine data from multiple sources with repeatable
              steps. It's essential for automating data preparation tasks,
              especially when working with the same data sources regularly. Once
              you build a query, you can refresh it with new data in one click.
            </p>
          </div>

          {/* Question 9 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              9. How do you remove duplicates in Excel?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span> Go to
              Data → Remove Duplicates. Select the columns where you want to
              check for duplicates. Excel will keep the first occurrence and
              remove all others. For more control, you can also use Conditional
              Formatting to highlight duplicates first.
            </p>
          </div>

          {/* Question 10 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              10. What is the difference between relative and absolute cell references?
            </h2>
            <p className="mt-3 leading-8">
              <span className="font-semibold text-slate-900">Answer:</span>{" "}
              Relative references (A1) change when you copy a formula. Absolute
              references ($A$1) stay fixed. Use F4 key to toggle between them.
              Absolute is useful for fixed values like tax rates or conversion
              factors. Mixed references ($A1 or A$1) lock either the row or the
              column.
            </p>
          </div>

          {/* Bonus Section */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Bonus: How to Prepare for Excel Interview Questions
            </h2>
            <p className="mt-3 leading-8">
              Here are some practical tips to help you succeed in your Excel
              interview:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-6">
              <li className="leading-7">
                <span className="font-semibold text-slate-900">
                  Practice hands-on:
                </span>{" "}
                Watch tutorials are helpful, but practice is what builds
                confidence. Use real datasets and practice common scenarios.
              </li>
              <li className="leading-7">
                <span className="font-semibold text-slate-900">
                  Understand the "why":
                </span>{" "}
                It's not enough to know the formulas. Understand when and why
                to use each one.
              </li>
              <li className="leading-7">
                <span className="font-semibold text-slate-900">
                  Learn shortcuts:
                </span>{" "}
                Keyboard shortcuts like Ctrl+Z, Ctrl+C, Ctrl+V, and
                Ctrl+Shift+Down Arrow can save you time and impress
                interviewers.
              </li>
              <li className="leading-7">
                <span className="font-semibold text-slate-900">
                  Take a practice test:
                </span>{" "}
                Use our free Excel assessment to identify your strengths and
                weaknesses before the interview.
              </li>
              <li className="leading-7">
                <span className="font-semibold text-slate-900">
                  Stay calm:
                </span>{" "}
                If you're stuck, think about the steps logically. Interviewers
                often care more about your problem-solving process than the
                final answer.
              </li>
            </ul>
          </div>

          {/* Conclusion */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-blue-900">Conclusion</h2>
            <p className="mt-3 leading-8 text-blue-800">
              Excel is an essential skill for finance professionals. By preparing
              for these 10 questions, you'll be well-equipped to handle the Excel
              portion of your finance interview. Remember: it's not just about
              knowing the formulas, but understanding how to apply them to
              real-world financial scenarios.
            </p>
            <p className="mt-4 leading-8 text-blue-800">
              Good luck with your interview! And don't forget to practice with
              our free Excel assessment to test your skills before the big day.
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
              href="/blog/how-to-practice-vlookup"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h4 className="font-bold text-slate-900">
                How to Practice VLOOKUP for a Job Test
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Master VLOOKUP with step-by-step practice.
              </p>
            </Link>
            <Link
              href="/blog/excel-assessment-tips"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h4 className="font-bold text-slate-900">
                5 Tips to Ace Your Excel Skills Assessment
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