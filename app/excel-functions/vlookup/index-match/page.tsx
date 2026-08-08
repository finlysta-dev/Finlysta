import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "INDEX MATCH in Excel: Formula, Examples & Practice | Finlysta",
  description:
    "Learn INDEX MATCH in Excel with simple formulas, examples, use cases, common mistakes and practical exercises for finance and analyst interviews.",
  keywords: [
    "INDEX MATCH Excel",
    "INDEX MATCH formula",
    "INDEX MATCH in Excel",
    "INDEX MATCH example",
    "Excel INDEX MATCH",
    "INDEX MATCH vs VLOOKUP",
    "Excel lookup formulas",
  ],
  alternates: {
    canonical: "/excel-functions/index-match",
  },
};

const faqs = [
  {
    question: "What is INDEX MATCH in Excel?",
    answer:
      "INDEX MATCH combines the INDEX and MATCH functions to look up a value in a table and return a corresponding result. It is a flexible alternative to traditional lookup methods.",
  },
  {
    question: "Why use INDEX MATCH instead of VLOOKUP?",
    answer:
      "INDEX MATCH can look to the left or right and does not require a fixed column index number, making it useful for flexible lookup scenarios.",
  },
  {
    question: "Can INDEX MATCH return values from another column?",
    answer:
      "Yes. MATCH identifies the position of the lookup value and INDEX returns the corresponding value from the result range.",
  },
];

export default function IndexMatchPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold">
            Finlysta
          </a>

          <a
            href="/practice"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Excel Practice →
          </a>
        </div>
      </header>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <a
            href="/"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Finlysta
          </a>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Excel Functions
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            INDEX MATCH in Excel: Formula, Examples & Practice
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Learn how to use INDEX MATCH in Excel with practical examples,
            lookup formulas and real-world scenarios for finance, accounting
            and analyst roles.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/practice"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
            >
              Start Excel Practice
            </a>

            <a
              href="/excel-functions/vlookup"
              className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold hover:bg-slate-50"
            >
              Learn VLOOKUP
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-14">
        <section>
          <h2 className="text-3xl font-bold">
            What Is INDEX MATCH in Excel?
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            INDEX MATCH is a popular Excel lookup technique that combines two
            functions. MATCH finds the position of a value, while INDEX returns
            the corresponding value from a specified range.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            It is commonly used in financial analysis, reporting, accounting,
            business analysis and data management when you need a flexible
            lookup solution.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold">INDEX MATCH Formula</h2>

          <div className="mt-6 rounded-xl bg-slate-900 p-6 font-mono text-sm text-white">
            =INDEX(C2:C100,MATCH(E2,A2:A100,0))
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            In this example, MATCH searches for the value in E2 within the
            range A2:A100. INDEX then returns the corresponding value from
            C2:C100.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold">
            How INDEX MATCH Works
          </h2>

          <div className="mt-6 space-y-4">
            {[
              "Identify the value you want to find.",
              "Use MATCH to locate its position.",
              "Use INDEX to return the corresponding value.",
              "Use 0 in MATCH when an exact match is required.",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 p-5"
              >
                <span className="font-bold text-blue-600">
                  {index + 1}.
                </span>{" "}
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold">
            INDEX MATCH vs VLOOKUP
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold">Feature</th>
                  <th className="p-4 font-semibold">INDEX MATCH</th>
                  <th className="p-4 font-semibold">VLOOKUP</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="p-4">Lookup direction</td>
                  <td className="p-4">Flexible</td>
                  <td className="p-4">Limited</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Fixed column number</td>
                  <td className="p-4">No</td>
                  <td className="p-4">Yes</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Common use</td>
                  <td className="p-4">Flexible lookups</td>
                  <td className="p-4">Traditional lookups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold">
            INDEX MATCH Interview Questions
          </h2>

          <div className="mt-6 space-y-3">
            {[
              "What is INDEX MATCH in Excel?",
              "How does MATCH work?",
              "What does the 0 argument in MATCH mean?",
              "Why use INDEX MATCH instead of VLOOKUP?",
              "Can INDEX MATCH perform a left lookup?",
              "How can INDEX MATCH be used with multiple criteria?",
            ].map((question) => (
              <details
                key={question}
                className="rounded-xl border border-slate-200 p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {question}
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  Practice this question yourself first, then compare your
                  approach with an Excel lookup example.
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-slate-200 p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {faq.question}
                </summary>

                <p className="mt-4 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-bold">
            Practice INDEX MATCH
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            Understanding the formula is only the first step. Test your Excel
            skills with practical challenges.
          </p>

          <a
            href="/practice"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Start Excel Practice →
          </a>
        </section>
      </div>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
          © 2026 Finlysta. Practice skills. Get interview ready.
        </div>
      </footer>
    </main>
  );
}