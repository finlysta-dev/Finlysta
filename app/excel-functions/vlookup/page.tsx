import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VLOOKUP in Excel: Formula, Examples, Uses & Practice | Finlysta",
  description:
    "Learn VLOOKUP in Excel with formula, syntax, practical examples, multiple criteria, common errors, VLOOKUP vs XLOOKUP, and interview questions with answers.",
  alternates: {
    canonical: "https://finlysta.com/excel-functions/vlookup",
  },
  openGraph: {
    title: "VLOOKUP in Excel: Formula, Examples, Uses & Practice",
    description:
      "Learn the VLOOKUP formula in Excel with practical examples, multiple criteria, common errors, and interview questions.",
    url: "https://finlysta.com/excel-functions/vlookup",
    siteName: "Finlysta",
    type: "article",
  },
};

const interviewQuestions = [
  {
    question: "What is VLOOKUP and when would you use it?",
    answer:
      "VLOOKUP is an Excel function used to search for a value in the first column of a table and return a related value from another column in the same row. It is commonly used for retrieving employee information, product prices, customer details, financial data, and other related records.",
  },
  {
    question: "Explain the syntax of VLOOKUP.",
    answer:
      "The syntax is =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). The lookup_value is what you want to find, table_array is the lookup range, col_index_num identifies the column containing the result, and range_lookup determines whether Excel should use an exact or approximate match.",
  },
  {
    question: "What is the difference between TRUE and FALSE in VLOOKUP?",
    answer:
      "FALSE tells Excel to find an exact match. TRUE tells Excel to find an approximate match. For most business and finance use cases, FALSE is generally preferred when you need an exact result such as an employee ID, product code, or account number.",
  },
  {
    question: "Why does VLOOKUP return #N/A?",
    answer:
      "The #N/A error usually means Excel cannot find the lookup value. Common causes include spelling differences, extra spaces, numbers stored as text, an incorrect lookup range, or a mismatch between the lookup value and the source data.",
  },
  {
    question: "How can you use VLOOKUP with multiple criteria?",
    answer:
      "Traditional VLOOKUP uses a single lookup value. A common approach for multiple criteria is to create a helper column that combines the criteria into one lookup key. You can then use VLOOKUP against that combined key.",
  },
  {
    question: "How can VLOOKUP be used to compare two datasets?",
    answer:
      "VLOOKUP can search for records from one dataset in another dataset. For example, you can check whether employee IDs, customer IDs, or product codes from one list exist in another list and return a corresponding value when a match is found.",
  },
  {
    question: "What are the limitations of VLOOKUP?",
    answer:
      "VLOOKUP normally searches the first column of a selected table and returns a value from a column to its right. It also relies on a column index number, which can become harder to maintain when the structure of a table changes. XLOOKUP provides more flexibility in many modern Excel workflows.",
  },
  {
    question: "What is the difference between VLOOKUP and XLOOKUP?",
    answer:
      "VLOOKUP searches the first column of a table and returns a value from another column based on a column index. XLOOKUP uses separate lookup and return ranges, can look in either direction, and provides more flexible matching and error-handling options.",
  },
  {
    question: "What is the difference between VLOOKUP and HLOOKUP?",
    answer:
      "VLOOKUP performs a vertical lookup by searching down the first column of a table. HLOOKUP performs a horizontal lookup by searching across the first row of a table.",
  },
  {
    question: "How can VLOOKUP be combined with MATCH?",
    answer:
      "MATCH can dynamically find the position of a column heading. That position can then be supplied to VLOOKUP as the column index number, allowing the formula to dynamically select which column should be returned.",
  },
  {
    question: "How does VLOOKUP work in Excel?",
    answer:
      "VLOOKUP searches for a value in the first column of a selected table. Once it finds the matching row, it moves across that row and returns the value from the column specified by the column index number.",
  },
  {
    question: "Why is VLOOKUP used in Excel?",
    answer:
      "VLOOKUP is used to quickly retrieve related information from a table. It can save time when working with large datasets such as employee records, sales reports, customer lists, product databases, and financial reports.",
  },
  {
    question: "How do you use VLOOKUP for multiple columns?",
    answer:
      "You can use VLOOKUP multiple times with different column index numbers. For example, one formula can return a department using column 3 while another formula can return salary using column 4.",
  },
  {
    question: "How do you use VLOOKUP to compare two columns?",
    answer:
      "You can use VLOOKUP to search values from one column in another column. IFERROR can be combined with VLOOKUP to display a custom result such as 'Found' or 'Not Found' when a match does or does not exist.",
  },
  {
    question: "Why is my VLOOKUP not working?",
    answer:
      "Check whether the lookup value exists, whether the lookup column is the first column of the selected range, whether the column index is correct, and whether you need an exact match using FALSE. Also check for extra spaces and numbers stored as text.",
  },
];

const relatedFunctions = [
  {
    title: "XLOOKUP in Excel",
    description: "Learn the modern and flexible alternative to VLOOKUP.",
    href: "/excel-functions/xlookup",
  },
  {
    title: "HLOOKUP in Excel",
    description: "Learn horizontal lookup formulas in Excel.",
    href: "/excel-functions/hlookup",
  },
  {
    title: "INDEX MATCH in Excel",
    description: "Learn flexible lookup techniques using INDEX and MATCH.",
    href: "/excel-functions/index-match",
  },
  {
    title: "SUMIFS in Excel",
    description: "Learn conditional calculations using SUMIFS.",
    href: "/excel-functions/sumifs",
  },
  {
    title: "COUNTIFS in Excel",
    description: "Count records using multiple conditions.",
    href: "/excel-functions/countifs",
  },
];

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl bg-slate-950 p-5">
      <code className="whitespace-pre-wrap break-words font-mono text-sm text-white md:text-base">
        {children}
      </code>
    </div>
  );
}

function RevealAnswer({ answer }: { answer: string }) {
  return (
    <details className="mt-4 overflow-hidden rounded-xl border border-blue-100 bg-blue-50">
      <summary className="cursor-pointer px-5 py-4 font-semibold text-blue-700 hover:bg-blue-100">
        Reveal Answer
      </summary>

      <div className="border-t border-blue-100 px-5 py-5 leading-7 text-slate-700">
        {answer}
      </div>
    </details>
  );
}

export default function VLOOKUPPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold text-blue-600">
            Finlysta
          </a>

          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="/practice" className="hover:text-blue-600">
              Excel Practice
            </a>
            <a href="/practice" className="hover:text-blue-600">
              Challenges
            </a>
            <a href="/interview-prep" className="hover:text-blue-600">
              Interview Questions
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="mb-5 text-sm text-slate-500">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>{" "}
            /{" "}
            <span>Excel Functions</span> /{" "}
            <span>VLOOKUP</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              VLOOKUP Guide
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              VLOOKUP in Excel: Formula, Examples, Uses & Practice
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Learn the VLOOKUP formula in Excel with simple examples, syntax,
              practical use cases, multiple columns, multiple criteria,
              comparison techniques, common errors, VLOOKUP vs XLOOKUP and
              interview questions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#formula"
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Learn the Formula
              </a>

              <a
                href="#interview-questions"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Practice Questions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0">
            {/* Quick Answer */}
            <section className="mb-14 rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-950">
                VLOOKUP in Excel: Quick Answer
              </h2>

              <p className="mt-4 leading-8 text-slate-700">
                VLOOKUP is an Excel function used to search for a value in the
                first column of a table and return a related value from another
                column in the same row.
              </p>

              <p className="mt-4 font-semibold text-slate-800">
                The basic exact-match formula is:
              </p>

              <CodeBlock>
                {"=VLOOKUP(A2,$A$2:$D$100,4,FALSE)"}
              </CodeBlock>
            </section>

            {/* What is VLOOKUP */}
            <section id="what-is-vlookup" className="mb-14 scroll-mt-24">
              <h2 className="text-3xl font-bold">
                What Is VLOOKUP in Excel?
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                VLOOKUP stands for Vertical Lookup. It searches vertically
                through the first column of a selected table and returns
                information from another column in the same row.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                VLOOKUP is one of the most widely known Excel lookup functions.
                It is frequently used in finance, accounting, sales, operations,
                HR, MIS reporting and data analysis.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                For example, if you have an employee ID and need to find the
                employee's department or salary, VLOOKUP can automatically
                retrieve the information instead of requiring you to search the
                table manually.
              </p>
            </section>

            {/* What does VLOOKUP do */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">What Does VLOOKUP Do?</h2>

              <p className="mt-5 leading-8 text-slate-700">
                VLOOKUP finds a lookup value in the first column of a table.
                After finding the matching row, it moves across that row and
                returns the value from the column specified by the column index
                number.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                This makes VLOOKUP useful for retrieving information such as:
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Employee names and departments",
                  "Product prices",
                  "Customer information",
                  "Sales values",
                  "Financial reporting data",
                  "Account information",
                  "Inventory details",
                  "Performance metrics",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-slate-200 p-4 text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Why VLOOKUP */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                Why Is VLOOKUP Used in Excel?
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                VLOOKUP is used because it can quickly connect related
                information stored in different columns. Instead of manually
                searching thousands of rows, you can write one formula and copy
                it down.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                In finance and business analysis, this can be useful for
                combining information from different reports, reconciling
                records, retrieving account details and preparing management
                reports.
              </p>
            </section>

            {/* Formula */}
            <section id="formula" className="mb-14 scroll-mt-24">
              <h2 className="text-3xl font-bold">
                VLOOKUP Formula in Excel
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                The standard VLOOKUP formula is:
              </p>

              <CodeBlock>
                {"=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])"}
              </CodeBlock>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[600px] text-left">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-4 font-bold">Argument</th>
                      <th className="p-4 font-bold">Meaning</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-semibold">
                        lookup_value
                      </td>
                      <td className="p-4">
                        The value you want to search for.
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">
                        table_array
                      </td>
                      <td className="p-4">
                        The range containing your lookup table.
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">
                        col_index_num
                      </td>
                      <td className="p-4">
                        The column number containing the result.
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">
                        range_lookup
                      </td>
                      <td className="p-4">
                        FALSE for an exact match or TRUE for an approximate
                        match.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Syntax */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP Syntax Explained
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                Understanding the VLOOKUP syntax is important because each
                argument controls a different part of the lookup.
              </p>

              <CodeBlock>
                {"=VLOOKUP(A2,$A$2:$D$100,4,FALSE)"}
              </CodeBlock>

              <p className="leading-8 text-slate-700">
                In this example, Excel looks for the value in A2, searches the
                first column of A2:D100, and returns the value from the fourth
                column using an exact match.
              </p>
            </section>

            {/* Example */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP Formula in Excel With Example
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                Consider this employee dataset:
              </p>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[600px] text-left">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-4">Employee ID</th>
                      <th className="p-4">Employee</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Salary</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="p-4">E001</td>
                      <td className="p-4">Rahul</td>
                      <td className="p-4">Finance</td>
                      <td className="p-4">35000</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4">E002</td>
                      <td className="p-4">Priya</td>
                      <td className="p-4">Sales</td>
                      <td className="p-4">42000</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4">E003</td>
                      <td className="p-4">Aman</td>
                      <td className="p-4">Finance</td>
                      <td className="p-4">38000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6 leading-8 text-slate-700">
                If F2 contains E002 and you want to find the department, use:
              </p>

              <CodeBlock>
                {"=VLOOKUP(F2,A2:D4,3,FALSE)"}
              </CodeBlock>

              <p className="leading-8 text-slate-700">
                The result is Sales because Sales is located in the third
                column of the selected range.
              </p>
            </section>

            {/* How to use */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                How to Use VLOOKUP in Excel
              </h2>

              <ol className="mt-6 space-y-3">
                {[
                  "Identify your lookup value.",
                  "Select the lookup table.",
                  "Make sure the lookup column is the first column.",
                  "Determine the result column number.",
                  "Use FALSE for an exact match.",
                  "Press Enter and verify the result.",
                  "Copy the formula down when appropriate.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-xl border border-slate-200 p-4"
                  >
                    <span className="font-bold text-blue-600">
                      {index + 1}.
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Multiple Columns */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP for Multiple Columns in Excel
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                VLOOKUP can return values from multiple columns. You simply
                change the column index number.
              </p>

              <CodeBlock>
                {"=VLOOKUP(A2,$A$2:$E$100,3,FALSE)"}
                {"\n=VLOOKUP(A2,$A$2:$E$100,4,FALSE)"}
                {"\n=VLOOKUP(A2,$A$2:$E$100,5,FALSE)"}
              </CodeBlock>
            </section>

            {/* Multiple Criteria */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                How to Use VLOOKUP With Multiple Criteria
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                A standard VLOOKUP uses one lookup value. If you need to use
                multiple criteria, one common method is to combine the criteria
                into a helper column.
              </p>

              <p className="mt-4 leading-8 text-slate-700">
                For example, if Region and Product are both required, you can
                create a combined key.
              </p>

              <CodeBlock>
                {"=A2&\"|\"&B2"}
              </CodeBlock>

              <p className="leading-8 text-slate-700">
                You can then use that combined value in your VLOOKUP formula.
              </p>

              <CodeBlock>
                {"=VLOOKUP(F2&\"|\"&G2,$H$2:$J$100,3,FALSE)"}
              </CodeBlock>
            </section>

            {/* Compare Columns */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                How to Use VLOOKUP to Compare Two Columns
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                VLOOKUP can be used to compare two lists and identify whether a
                record from one column exists in another.
              </p>

              <CodeBlock>
                {'=IFERROR(VLOOKUP(A2,$D$2:$D$100,1,FALSE),"Not Found")'}
              </CodeBlock>

              <p className="leading-8 text-slate-700">
                This technique can be useful for basic data reconciliation,
                employee lists, customer lists and record validation.
              </p>
            </section>

            {/* IF and MATCH */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP With IF and MATCH
              </h2>

              <h3 className="mt-8 text-2xl font-bold">
                VLOOKUP With IF Condition
              </h3>

              <p className="mt-4 leading-8 text-slate-700">
                IF can evaluate the result returned by VLOOKUP.
              </p>

              <CodeBlock>
                {'=IF(VLOOKUP(A2,$A$2:$C$100,3,FALSE)>50000,"High","Low")'}
              </CodeBlock>

              <h3 className="mt-8 text-2xl font-bold">
                VLOOKUP With MATCH Function
              </h3>

              <p className="mt-4 leading-8 text-slate-700">
                MATCH can dynamically identify the column number.
              </p>

              <CodeBlock>
                {"=VLOOKUP(A2,$A$1:$E$100,MATCH(F1,$A$1:$E$1,0),FALSE)"}
              </CodeBlock>
            </section>

            {/* HLOOKUP */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP and HLOOKUP in Excel
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                VLOOKUP performs a vertical lookup, while HLOOKUP performs a
                horizontal lookup.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[500px] text-left">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-4">Function</th>
                      <th className="p-4">Search Direction</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-semibold">VLOOKUP</td>
                      <td className="p-4">Vertical</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">HLOOKUP</td>
                      <td className="p-4">Horizontal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-5 leading-8 text-slate-700">
                If your lookup values are arranged vertically in columns,
                VLOOKUP is the traditional choice. If the lookup values are
                arranged horizontally across rows, HLOOKUP may be appropriate.
              </p>
            </section>

            {/* XLOOKUP */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP vs XLOOKUP
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                XLOOKUP is a newer lookup function that offers greater
                flexibility than VLOOKUP in many modern Excel workflows.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[600px] text-left">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-4">Feature</th>
                      <th className="p-4">VLOOKUP</th>
                      <th className="p-4">XLOOKUP</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-semibold">Lookup to left</td>
                      <td className="p-4">No</td>
                      <td className="p-4">Yes</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">Column index</td>
                      <td className="p-4">Required</td>
                      <td className="p-4">Not required</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">
                        Exact match default
                      </td>
                      <td className="p-4">No</td>
                      <td className="p-4">Yes</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-4 font-semibold">
                        Flexible lookup
                      </td>
                      <td className="p-4">Limited</td>
                      <td className="p-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Errors */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                Why Is VLOOKUP Not Working?
              </h2>

              <p className="mt-5 leading-8 text-slate-700">
                If your VLOOKUP is not working, check these common problems
                first.
              </p>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                  <h3 className="text-xl font-bold">#N/A Error</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Excel cannot find the lookup value. Check spelling, spaces,
                    data types and the lookup range.
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
                  <h3 className="text-xl font-bold">#REF! Error</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    The column index number may be greater than the number of
                    columns in the selected table.
                  </p>
                </div>

                <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
                  <h3 className="text-xl font-bold">Incorrect Result</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Check the fourth argument. FALSE should normally be used
                    when an exact match is required.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold">
                    Numbers Stored as Text
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    A number stored as text may not match a true numeric value.
                    Make sure both lookup values use compatible data types.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold">Extra Spaces</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Hidden leading or trailing spaces can prevent an apparently
                    identical value from matching.
                  </p>
                </div>
              </div>
            </section>

            {/* Interview Questions */}
            <section
              id="interview-questions"
              className="mb-14 scroll-mt-24"
            >
              <div className="mb-8">
                <div className="mb-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Excel Interview Preparation
                </div>

                <h2 className="text-3xl font-bold">
                  VLOOKUP Interview Questions
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  Test yourself before revealing the answer. These VLOOKUP
                  questions are useful for finance, accounting, MIS, data
                  analyst and business analyst interviews.
                </p>
              </div>

              <div className="space-y-5">
                {interviewQuestions.map((item, index) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold leading-7">
                          {item.question}
                        </h3>

                        <RevealAnswer answer={item.answer} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Prompts */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                VLOOKUP AI Prompt Ideas
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Use these prompts to generate additional VLOOKUP exercises and
                improve your Excel problem-solving skills.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Create a VLOOKUP practice problem using a sales dataset. Do not reveal the answer until I submit my solution.",
                  "Create a VLOOKUP formula problem for a financial analyst interview.",
                  "Give me a VLOOKUP problem involving multiple criteria.",
                  "Create an Excel exercise where I need to compare two columns using VLOOKUP.",
                  "Give me a difficult VLOOKUP and MATCH interview problem.",
                  "Give me a VLOOKUP debugging exercise where the formula returns #N/A.",
                ].map((prompt) => (
                  <div
                    key={prompt}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="leading-7 text-slate-700">{prompt}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Practice */}
            <section className="mb-14 rounded-3xl bg-blue-600 p-8 text-white md:p-10">
              <h2 className="text-3xl font-bold">
                Practice VLOOKUP With Real Excel Data
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-blue-50">
                Reading about VLOOKUP is not enough. Download a dataset, solve
                practical Excel tasks and submit your workbook for evaluation.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/practice/excel-sales-analysis"
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Start Excel Challenge
                </a>

                <a
                  href="/practice"
                  className="rounded-xl border border-blue-300 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Explore Excel Practice
                </a>
              </div>
            </section>

            {/* Related */}
            <section className="mb-14">
              <h2 className="text-3xl font-bold">
                Related Excel Functions & Practice
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedFunctions.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </a>
                ))}

                <a
                  href="/practice"
                  className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    Excel Practice
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    Solve practical Excel problems and build job-ready skills.
                  </p>
                </a>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-14 scroll-mt-24">
              <h2 className="text-3xl font-bold">
                Frequently Asked Questions About VLOOKUP
              </h2>

              <div className="mt-6 space-y-4">
                {[
                  {
                    q: "What is VLOOKUP in Excel?",
                    a: "VLOOKUP is an Excel function that searches for a value in the first column of a table and returns a related value from another column in the same row.",
                  },
                  {
                    q: "What is the VLOOKUP formula?",
                    a: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
                  },
                  {
                    q: "What is the most common VLOOKUP formula?",
                    a: "=VLOOKUP(A2,$A$2:$D$100,4,FALSE) is a common exact-match pattern when the lookup value is in A2 and the required result is in the fourth column.",
                  },
                  {
                    q: "How do I use VLOOKUP in Excel with an example?",
                    a: "Select the value you want to find, select the lookup table, specify the result column number, and use FALSE when you need an exact match.",
                  },
                  {
                    q: "What does VLOOKUP do?",
                    a: "VLOOKUP finds a value in the first column of a table and returns related information from another column in the matching row.",
                  },
                  {
                    q: "Why is VLOOKUP not working?",
                    a: "Check the lookup value, lookup range, column index, exact-match setting, extra spaces, and whether numbers are stored as text.",
                  },
                  {
                    q: "Can VLOOKUP search multiple columns?",
                    a: "VLOOKUP can return values from different columns by changing the column index number. It does not independently search multiple lookup columns in the traditional setup.",
                  },
                  {
                    q: "Can VLOOKUP use multiple criteria?",
                    a: "Yes. A common approach is to combine multiple criteria into a helper column and then use that combined value as the lookup key.",
                  },
                  {
                    q: "Is VLOOKUP better than XLOOKUP?",
                    a: "It depends on the Excel version and use case. XLOOKUP is generally more flexible, while VLOOKUP remains widely used and important to understand.",
                  },
                ].map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-slate-200"
                  >
                    <summary className="cursor-pointer px-6 py-5 font-semibold text-slate-900 hover:bg-slate-50">
                      {item.q}
                    </summary>

                    <div className="border-t border-slate-200 px-6 py-5 leading-7 text-slate-600">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-8 text-center md:p-12">
              <h2 className="text-3xl font-bold">
                Ready to Master VLOOKUP?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
                Learn the formula, test your knowledge and practice VLOOKUP
                with realistic Excel challenges.
              </p>

              <a
                href="/practice"
                className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Start Excel Practice →
              </a>
            </section>
          </article>

          {/* Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold">On this page</h2>

              <nav className="mt-4 space-y-2 text-sm">
                {[
                  ["What Is VLOOKUP?", "#what-is-vlookup"],
                  ["VLOOKUP Formula", "#formula"],
                  ["Interview Questions", "#interview-questions"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-slate-600 hover:text-blue-600"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-sm text-slate-500">
            Finlysta — Practical Excel practice and interview preparation for
            students and entry-level professionals.
          </p>
        </div>
      </footer>
    </main>
  );
}