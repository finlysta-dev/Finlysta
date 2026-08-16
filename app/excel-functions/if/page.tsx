// app/excel-functions/if/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IF & Nested IF in Excel: Formula, Examples & Practice | Finlysta",
  description:
    "Learn IF and Nested IF functions in Excel with formula syntax, examples, logical tests, multiple conditions, AND/OR logic, common errors, interview questions and practical exercises.",
  keywords: [
    "IF function Excel",
    "Nested IF Excel",
    "Excel IF formula",
    "how to use IF in Excel",
    "Excel IF statement",
    "Nested IF formula",
    "Excel logical functions",
    "IF function examples",
    "Excel IF multiple conditions",
    "Excel AND OR IF",
  ],
  alternates: {
    canonical: "/excel-functions/if",
  },
  openGraph: {
    title: "IF & Nested IF in Excel: Formula, Examples & Practice",
    description:
      "Learn IF and Nested IF functions in Excel with formulas, examples, multiple conditions, AND/OR logic, common errors, interview questions and practical exercises.",
    url: "https://finlysta.com/excel-functions/if",
    siteName: "Finlysta",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IF & Nested IF in Excel - Formula, Examples & Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IF & Nested IF in Excel: Formula, Examples & Practice",
    description:
      "Learn IF and Nested IF formulas, examples, common errors and practical interview questions.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "What is the IF function in Excel?",
    answer:
      "The IF function performs a logical test and returns one value if TRUE and another if FALSE. It's one of the most commonly used functions in Excel.",
  },
  {
    question: "What is the IF formula syntax?",
    answer:
      "=IF(logical_test, value_if_true, value_if_false). The logical_test is any condition that returns TRUE or FALSE.",
  },
  {
    question: "Can I use multiple conditions in an IF formula?",
    answer:
      "Yes. You can use nested IFs (IF inside IF) or combine IF with AND/OR functions. For example: =IF(AND(A2>50, B2<100), 'Pass', 'Fail').",
  },
  {
    question: "How many IF statements can I nest in Excel?",
    answer:
      "Excel allows up to 64 nested IF statements. However, for more than 3-4 conditions, it's recommended to use IFS function or a lookup table.",
  },
  {
    question: "What is the difference between IF and IFS?",
    answer:
      "IF handles one condition or nested conditions. IFS handles multiple conditions without nesting. IFS is simpler for 3+ conditions.",
  },
  {
    question: "Can I use AND/OR with IF?",
    answer:
      "Yes. Use AND to check if all conditions are TRUE, OR to check if any condition is TRUE. For example: =IF(AND(A2>50, B2>50), 'Pass', 'Fail').",
  },
  {
    question: "What are common IF function errors?",
    answer:
      "Common errors include: incorrect logical_test syntax, missing quotes for text, wrong number of parentheses, and not handling text case sensitivity.",
  },
  {
    question: "How do I handle errors with IF?",
    answer:
      "Combine IF with ISERROR or IFERROR. For example: =IF(ISERROR(A2/B2), 'Error', A2/B2) or =IFERROR(A2/B2, 'Error').",
  },
];

const interviewQuestions = [
  {
    question: "What is the IF function in Excel?",
    answer:
      "The IF function is a logical function that returns one value if a condition is TRUE and another value if it's FALSE. It's essential for conditional logic in spreadsheets.",
  },
  {
    question: "Explain the syntax of the IF formula.",
    answer:
      "=IF(logical_test, value_if_true, value_if_false). The logical_test is any expression that returns TRUE or FALSE, like A2>10 or B2='North'.",
  },
  {
    question: "How would you use nested IF in Excel?",
    answer:
      "Nested IF means putting one IF function inside another. For example, to grade scores: =IF(A2>=90, 'A', IF(A2>=80, 'B', IF(A2>=70, 'C', 'Fail'))).",
  },
  {
    question: "What is the difference between IF and IFS?",
    answer:
      "IF uses nested logic for multiple conditions. IFS tests multiple conditions without nesting. For 3+ conditions, IFS is easier to read and maintain.",
  },
  {
    question: "How do you use AND with IF in Excel?",
    answer:
      "Combine AND inside IF: =IF(AND(A2>50, B2>50), 'Pass', 'Fail'). This returns 'Pass' only when both conditions are TRUE.",
  },
  {
    question: "How do you use OR with IF in Excel?",
    answer:
      "Combine OR inside IF: =IF(OR(A2>50, B2>50), 'Pass', 'Fail'). This returns 'Pass' when either condition is TRUE.",
  },
  {
    question: "What are common mistakes with IF functions?",
    answer:
      "Common mistakes include: mixing up TRUE and FALSE returns, missing parentheses, using text without quotes, and not handling errors with IFERROR.",
  },
  {
    question: "How would you handle errors with IF?",
    answer:
      "Use IFERROR: =IFERROR(A2/B2, 'Error'). Or use ISERROR: =IF(ISERROR(A2/B2), 'Error', A2/B2). ISERROR is more specific for error detection.",
  },
];

const mistakes = [
  {
    title: "Wrong number of parentheses",
    description:
      "Every IF needs 2 parentheses (one at start, one at end). Nested IFs need careful parenthesis counting. Use Excel's color-coded parentheses to help.",
  },
  {
    title: "Text without quotes",
    description:
      "Text values in IF must be in double quotes. For example: =IF(A2='North', 'Yes', 'No') is correct. Without quotes, it's an error.",
  },
  {
    title: "Using AND/OR incorrectly",
    description:
      "AND and OR are functions themselves. Use AND(range1, range2) not range1 AND range2. Example: =IF(AND(A2>50, B2>50), 'Pass', 'Fail').",
  },
  {
    title: "Not handling errors",
    description:
      "Always handle potential errors with IFERROR or ISERROR. This is especially important for formulas with division or lookups.",
  },
  {
    title: "Creating overly complex nested IFs",
    description:
      "For 3+ conditions, consider IFS function or a lookup table. Complex nested IFs are hard to read and maintain.",
  },
];

const examples = [
  {
    title: "Basic IF",
    description: "Check if sales target is met.",
    formula: '=IF(B2>=100000, "Met", "Not Met")',
  },
  {
    title: "Nested IF",
    description: "Grade scores from A to F.",
    formula: '=IF(A2>=90, "A", IF(A2>=80, "B", IF(A2>=70, "C", "Fail")))',
  },
  {
    title: "IF with AND",
    description: "Pass if both sales and profit targets are met.",
    formula: '=IF(AND(B2>=100000, C2>=20000), "Pass", "Fail")',
  },
  {
    title: "IF with OR",
    description: "Pass if either sales or profit target is met.",
    formula: '=IF(OR(B2>=100000, C2>=20000), "Pass", "Fail")',
  },
];

export default function IfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IF & Nested IF in Excel: Formula, Examples & Practice",
    description:
      "Learn IF and Nested IF functions in Excel with formulas, examples, multiple conditions, AND/OR logic, common errors, interview questions and practical exercises.",
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
      "@id": "https://finlysta.com/excel-functions/if",
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
        name: "IF Function",
        item: "https://finlysta.com/excel-functions/if",
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
              <li className="font-semibold text-slate-900">IF Function</li>
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
            IF & Nested IF in Excel: Formula, Examples & Practice
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Learn how to use IF and Nested IF functions in Excel with simple
            formulas, multiple conditions, AND/OR logic, common mistakes, and
            interview-focused exercises.
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
        {/* What is IF */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Is the IF Function in Excel?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            The IF function is one of Excel's most important logical functions.
            It performs a test on a condition and returns one value if the
            condition is TRUE and another if it's FALSE.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            IF is used everywhere in business—from grading scores to evaluating
            sales performance, from approving budgets to flagging exceptions.
            It's one of the first functions you should master.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            For more complex logic, you can nest multiple IF functions together,
            or combine IF with AND, OR, and NOT functions.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-bold text-blue-900">📌 Why this matters for interviews</p>
            <p className="mt-2 leading-7 text-blue-900/80">
              IF is one of the most frequently tested Excel functions in
              interviews. Employers want to see if you can handle conditional
              logic and make decisions based on data.
            </p>
          </div>
        </section>

        {/* Formula */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            IF Formula
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =IF(logical_test, value_if_true, value_if_false)
            </code>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-y-0">
              {[
                [
                  "logical_test",
                  "The condition to test (e.g., A2>100, B2='North')",
                ],
                [
                  "value_if_true",
                  "The value returned if the test is TRUE",
                ],
                [
                  "value_if_false",
                  "The value returned if the test is FALSE",
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

        {/* Examples */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            IF Examples
          </h2>

          <div className="mt-6 grid gap-4">
            {examples.map((example, index) => (
              <div
                key={example.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-slate-900">{example.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {example.description}
                </p>
                <div className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">
                  <code className="text-sm text-white">
                    {example.formula}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nested IF */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Nested IF
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Nested IF means putting one IF function inside another. This is
            useful when you have more than two possible outcomes.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 sm:p-7">
            <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
              =IF(A2{'>='}90, "A", IF(A2{'>='}80, "B", IF(A2{'>='}70, "C", "Fail")))
            </code>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This formula tests for multiple conditions: A (90+), B (80-89),
            C (70-79), and Fail (below 70). Each condition is checked in order.
          </p>

          <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
            <p className="font-bold text-yellow-900">⚠️ Limit nesting</p>
            <p className="mt-2 leading-7 text-yellow-900/80">
              For more than 3-4 conditions, consider using IFS function or a
              lookup table. They are easier to read and maintain.
            </p>
          </div>
        </section>

        {/* IF with AND/OR */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            IF with AND & OR
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Combine IF with AND or OR to test multiple conditions simultaneously.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">AND inside IF</h3>
              <p className="mt-2 text-sm text-slate-600">
                ALL conditions must be TRUE for the result to be TRUE.
              </p>
              <div className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">
                <code className="text-sm text-white">
                  =IF(AND(B2{'>='}100000, C2{'>='}20000), "Pass", "Fail")
                </code>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Pass if sales {'>='} 100,000 AND profit {'>='} 20,000
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">OR inside IF</h3>
              <p className="mt-2 text-sm text-slate-600">
                At least ONE condition must be TRUE for the result to be TRUE.
              </p>
              <div className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">
                <code className="text-sm text-white">
                  =IF(OR(B2{'>='}100000, C2{'>='}20000), "Pass", "Fail")
                </code>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Pass if sales {'>='} 100,000 OR profit {'>='} 20,000
              </p>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            IF with Error Handling
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Combine IF with ISERROR or IFERROR to handle formula errors
            gracefully.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">ISERROR + IF</h3>
              <div className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">
                <code className="text-sm text-white">
                  =IF(ISERROR(A2/B2), "Error", A2/B2)
                </code>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">IFERROR (Recommended)</h3>
              <div className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4">
                <code className="text-sm text-white">
                  =IFERROR(A2/B2, "Error")
                </code>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                IFERROR is simpler and cleaner
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="font-bold text-green-900">💡 Pro tip</p>
            <p className="mt-2 leading-7 text-green-900/80">
              IFERROR is recommended over ISERROR+IF because it's simpler,
              cleaner, and uses one function instead of two.
            </p>
          </div>
        </section>

        {/* Common Errors */}
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common IF Errors and Mistakes
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
            IF Interview Questions
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            These are common IF function questions you may encounter in Excel
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
            Ready to practice IF & Nested IF?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Understanding IF functions is essential for any Excel user. Practice
            realistic scenarios and build confidence using conditional logic in
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
          <h2 className="text-2xl font-extrabold">Related Excel Topics</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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