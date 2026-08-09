import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VLOOKUP in Excel: Formula, Examples & Practice",
  description:
    "Learn VLOOKUP in Excel with formula syntax, examples, exact and approximate matches, common errors, multiple criteria, VLOOKUP vs XLOOKUP, interview questions and practical exercises.",
  keywords: [
    "VLOOKUP",
    "VLOOKUP Excel",
    "VLOOKUP formula",
    "how to use VLOOKUP",
    "VLOOKUP example",
    "Excel lookup formula",
    "Excel lookup function",
    "VLOOKUP for beginners",
    "VLOOKUP interview questions",
    "VLOOKUP multiple criteria",
    "VLOOKUP two criteria",
    "VLOOKUP vs XLOOKUP",
    "VLOOKUP practice",
  ],
  alternates: {
    canonical: "/excel-functions/vlookup",
  },
  openGraph: {
    title: "VLOOKUP in Excel: Formula, Examples & Practice",
    description:
      "Learn VLOOKUP in Excel with formulas, examples, common errors, interview questions and practical exercises.",
    url: "https://finlysta.com/excel-functions/vlookup",
    siteName: "Finlysta",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLOOKUP in Excel: Formula, Examples & Practice",
    description:
      "Learn VLOOKUP formulas, examples, common errors and practical Excel interview questions.",
  },
};

const faqs = [
  {
    question: "What is VLOOKUP in Excel?",
    answer:
      "VLOOKUP is an Excel lookup function that searches for a value in the first column of a table and returns a related value from another column in the same row.",
  },
  {
    question: "What is the VLOOKUP formula?",
    answer:
      "The basic VLOOKUP syntax is =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). The fourth argument determines whether Excel should use an exact or approximate match.",
  },
  {
    question: "How do I use VLOOKUP in Excel?",
    answer:
      "To use VLOOKUP, identify the value you want to find, select the table containing the lookup value and result, specify the result column number, and choose FALSE when an exact match is required.",
  },
  {
    question: "What does FALSE mean in VLOOKUP?",
    answer:
      "FALSE tells VLOOKUP to find an exact match. It is commonly used when looking up employee IDs, product codes, invoice numbers and other unique identifiers.",
  },
  {
    question: "What does TRUE mean in VLOOKUP?",
    answer:
      "TRUE tells VLOOKUP to perform an approximate match. The first column of the lookup table should generally be sorted in ascending order for reliable approximate matching.",
  },
  {
    question: "Can VLOOKUP look to the left?",
    answer:
      "Traditional VLOOKUP cannot return a value from a column to the left of the lookup column. INDEX MATCH or XLOOKUP can be used when a left lookup is required.",
  },
  {
    question: "Can VLOOKUP use multiple criteria?",
    answer:
      "VLOOKUP does not directly handle multiple independent criteria in its basic form. A helper column or combined lookup key can be created to combine multiple criteria into one lookup value.",
  },
  {
    question: "What is the difference between VLOOKUP and XLOOKUP?",
    answer:
      "VLOOKUP uses a column index number and normally returns values from columns to the right of the lookup column. XLOOKUP is more flexible and can return values from either side of the lookup range.",
  },
];

const interviewQuestions = [
  {
    question: "What is VLOOKUP in Excel?",
    answer:
      "VLOOKUP is a vertical lookup function. It searches for a value in the first column of a selected table and returns a related value from another column in the same row.",
  },
  {
    question: "Explain the syntax of the VLOOKUP formula.",
    answer:
      "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). The lookup_value is what you want to find, table_array is the lookup table, col_index_num specifies the return column, and range_lookup determines exact or approximate matching.",
  },
  {
    question: "What is the difference between TRUE and FALSE in VLOOKUP?",
    answer:
      "FALSE performs an exact match, while TRUE performs an approximate match. FALSE is commonly preferred when matching IDs, codes and other unique values.",
  },
  {
    question: "Why does VLOOKUP return #N/A?",
    answer:
      "VLOOKUP returns #N/A when it cannot find the lookup value. Common causes include spelling differences, extra spaces, incorrect ranges, different data types or a lookup value that does not exist in the first column.",
  },
  {
    question: "Can VLOOKUP look to the left?",
    answer:
      "No. Traditional VLOOKUP searches the first column of the selected table and returns a value from a column to its right. INDEX MATCH or XLOOKUP can be used for left lookups.",
  },
  {
    question: "What is the difference between VLOOKUP and XLOOKUP?",
    answer:
      "VLOOKUP requires a table and column index number, while XLOOKUP uses separate lookup and return ranges. XLOOKUP is more flexible because it can perform lookups in either direction.",
  },
  {
    question: "How would you use VLOOKUP with multiple criteria?",
    answer:
      "A common approach is to create a helper column that combines the criteria into one lookup key. For example, Employee ID and Month could be combined into a single value and then used with VLOOKUP.",
  },
  {
    question: "How can you prevent VLOOKUP errors?",
    answer:
      "You can use IFERROR around VLOOKUP to display a custom message or alternative value when the lookup returns an error. You should also check the lookup range, data types, spaces and lookup value.",
  },
];

const mistakes = [
  {
    title: "Using the wrong column index",
    description:
      "The column index determines which column VLOOKUP returns. Count the columns starting from the first column of the selected table array.",
  },
  {
    title: "Using TRUE accidentally",
    description:
      "If you need an exact match but use TRUE or omit the final argument, Excel may return an unexpected result. Use FALSE for exact matching.",
  },
  {
    title: "Lookup value is not in the first column",
    description:
      "Traditional VLOOKUP searches for the lookup value in the first column of the selected table array.",
  },
  {
    title: "Extra spaces or inconsistent data",
    description:
      "Extra spaces and inconsistent data types can prevent VLOOKUP from finding a match. Cleaning and standardizing the source data can resolve these problems.",
  },
  {
    title: "Ignoring #N/A errors",
    description:
      "#N/A generally means Excel could not find the requested lookup value. Check the lookup value, source range and formatting before changing the formula.",
  },
];

export default function VlookupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "VLOOKUP in Excel: Formula, Examples & Practice",
    description:
      "Learn VLOOKUP in Excel with formulas, examples, common errors, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel-functions/vlookup",
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

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Excel Practice
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Practice real-world Excel skills
            </p>
          </div>

          <a
            href="/practice"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 sm:text-base"
          >
            Practice →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Excel Functions
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            VLOOKUP in Excel: Formula, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use VLOOKUP in Excel with simple formulas,
            practical examples, exact and approximate matches, common
            mistakes and interview-focused exercises.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/practice"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-center font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Practice VLOOKUP →
            </a>

            <a
              href="/excel-functions/index-match"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Learn INDEX MATCH
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* What is VLOOKUP */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is VLOOKUP in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            VLOOKUP is one of the most commonly used Excel lookup functions.
            It allows you to search for a value in the first column of a
            table and return related information from another column in the
            same row.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            VLOOKUP is frequently used in finance, accounting, reporting,
            operations and analyst roles. For example, you can use it to
            find an employee's department from an Employee ID, retrieve a
            product price from a product code or match customer information
            across tables.
          </p>
        </section>

        {/* Formula */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            VLOOKUP Formula
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
            </code>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0">
              {[
                [
                  "lookup_value",
                  "The value you want Excel to find.",
                ],
                [
                  "table_array",
                  "The range containing the lookup value and result.",
                ],
                [
                  "col_index_num",
                  "The number of the column containing the result.",
                ],
                [
                  "range_lookup",
                  "TRUE for approximate match or FALSE for exact match.",
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
            VLOOKUP Example
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Imagine you have an employee table containing Employee ID,
            Department and Salary. The Employee ID you want to search is in
            cell E2.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =VLOOKUP(E2,A2:C100,2,FALSE)
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula searches for the value in E2 in the first column
            of A2:C100 and returns the corresponding value from the second
            column. FALSE tells Excel to find an exact match.
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

        {/* Exact match */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            VLOOKUP Exact Match
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Exact matching is one of the most important VLOOKUP concepts
            for Excel interviews. Use FALSE as the fourth argument when you
            need Excel to find the exact lookup value.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =VLOOKUP(A2,D2:F100,3,FALSE)
            </code>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">Interview tip</p>

            <p className="mt-2 leading-7 text-blue-900/80">
              When matching IDs, codes or other unique identifiers,
              explicitly using FALSE makes your intention clear and avoids
              accidental approximate matches.
            </p>
          </div>
        </section>

        {/* Approximate */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            VLOOKUP Approximate Match
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Approximate matching can be useful when working with ranges
            such as commission tiers, grades or pricing bands. TRUE tells
            VLOOKUP to use an approximate match.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =VLOOKUP(A2,D2:E10,2,TRUE)
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            For approximate matching, the lookup column should generally be
            sorted in ascending order. Otherwise, the returned result may
            not be what you expect.
          </p>
        </section>

        {/* How it works */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Use VLOOKUP in Excel
          </h2>

          <div className="mt-7 space-y-4">
            {[
              "Identify the value you want to search for.",
              "Select a table that contains the lookup value in its first column.",
              "Choose the column containing the information you want to return.",
              "Enter the appropriate column index number.",
              "Use FALSE when you need an exact match.",
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
        </section>

        {/* Multiple criteria */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            VLOOKUP With Multiple Criteria
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            A standard VLOOKUP works with one lookup value. When a problem
            requires multiple conditions, such as Employee ID plus Month or
            Customer plus Product, you can create a combined lookup key in
            a helper column and use that key with VLOOKUP.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =A2&amp;"-"&amp;B2
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            The combined key can then be used as the lookup value. In newer
            Excel workflows, XLOOKUP or other approaches may provide a
            cleaner solution depending on the problem.
          </p>
        </section>

        {/* Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common VLOOKUP Errors and Mistakes
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

        {/* Comparison */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            VLOOKUP vs XLOOKUP
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            VLOOKUP remains an important Excel skill because it is widely
            recognized in interviews and existing business workbooks.
            XLOOKUP provides a more flexible modern lookup approach.
          </p>

          <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[620px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold">VLOOKUP</th>
                  <th className="p-4 font-bold">XLOOKUP</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="p-4">Lookup direction</td>
                  <td className="p-4">Primarily to the right</td>
                  <td className="p-4">More flexible</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="p-4">Column index number</td>
                  <td className="p-4">Required</td>
                  <td className="p-4">Not required</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="p-4">Common in older workbooks</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Less common</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="p-4">Modern flexibility</td>
                  <td className="p-4">Lower</td>
                  <td className="p-4">Higher</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Interview questions */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            VLOOKUP Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common VLOOKUP questions you may encounter in Excel
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

        {/* Practice CTA */}
        <section className="mt-16 rounded-3xl bg-slate-50 p-7 text-center sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Practice
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Ready to practice VLOOKUP?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding the formula is only the beginning. Practice
            realistic Excel scenarios and build confidence using lookup
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
              href="/excel-functions/index-match"
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <h3 className="font-bold text-slate-900">
                INDEX MATCH
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn a flexible Excel lookup technique using INDEX and
                MATCH.
              </p>

              <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                Learn INDEX MATCH →
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
                Practice realistic Excel problems for finance and analyst
                roles.
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

      {/* Minimal footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-8 text-center sm:px-6">
          <p className="text-sm font-medium text-slate-500">
            Excel Practice — Learn formulas. Solve problems. Get interview
            ready.
          </p>

          <div className="mt-4 flex justify-center gap-6 text-sm font-semibold">
            <a
              href="/privacy"
              className="text-slate-500 transition hover:text-slate-900"
            >
              Privacy
            </a>

            <a
              href="/contact"
              className="text-slate-500 transition hover:text-slate-900"
            >
              Contact
            </a>

            <a
              href="/practice"
              className="text-blue-600 transition hover:text-blue-700"
            >
              Practice
            </a>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            © 2026 Finlysta
          </p>
        </div>
      </footer>
    </main>
  );
}