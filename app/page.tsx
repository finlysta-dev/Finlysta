import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finlysta | Excel Practice & Interview Preparation",
  description:
    "Practice Excel skills, real-world scenarios, assessments and interview questions for students, freshers and entry-level finance and analyst roles.",
  keywords: [
    "Excel practice",
    "Excel interview questions",
    "Excel interview preparation",
    "Advanced Excel practice",
    "Excel assessment test",
    "Excel questions for freshers",
    "Excel practical test",
    "Excel for financial analysts",
    "finance interview preparation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Finlysta | Excel Practice & Interview Preparation",
    description:
      "Practice real-world Excel skills, assessments and interview questions for students, freshers and entry-level professionals.",
    url: "https://finlysta.com",
    siteName: "Finlysta",
    type: "website",
  },
};

const skills = [
  {
    title: "VLOOKUP & XLOOKUP",
    description:
      "Practice lookup formulas with realistic data and business scenarios.",
    href: "/excel-functions/vlookup",
  },
  {
    title: "INDEX & MATCH",
    description:
      "Learn flexible lookup techniques used in real-world Excel analysis.",
    href: "/excel-functions/index-match",
  },
  {
    title: "SUMIFS & COUNTIFS",
    description:
      "Practice conditional calculations used in reporting and analysis.",
    href: "/excel-functions/sumifs",
  },
  {
    title: "Pivot Tables",
    description:
      "Analyze and summarize business data with practical Excel exercises.",
    href: "/excel/pivot-tables",
  },
  {
    title: "Power Query",
    description:
      "Practice cleaning, transforming and preparing data for analysis.",
    href: "/excel/power-query",
  },
  {
    title: "Data Cleaning",
    description:
      "Identify and fix common data-quality problems found in spreadsheets.",
    href: "/excel/data-cleaning",
  },
  {
    title: "Excel Dashboards",
    description:
      "Practice turning raw data into useful business reports and dashboards.",
    href: "/excel/dashboards",
  },
  {
    title: "Financial Analysis",
    description:
      "Apply Excel skills to practical finance and analyst scenarios.",
    href: "/finance/financial-analysis",
  },
];

const interviewTopics = [
  {
    title: "Advanced Excel Interview Questions",
    description:
      "Test your knowledge of formulas, lookup functions, Pivot Tables and more.",
  },
  {
    title: "Excel Interview Questions for Freshers",
    description:
      "Prepare for common Excel questions asked in entry-level interviews.",
  },
  {
    title: "Excel Scenario-Based Questions",
    description:
      "Practice solving realistic business and workplace Excel problems.",
  },
  {
    title: "Excel Practical Test",
    description:
      "Move beyond theory and solve hands-on Excel tasks.",
  },
  {
    title: "Excel Assessment Test",
    description:
      "Prepare for spreadsheet assessments used during hiring.",
  },
  {
    title: "Excel Questions for Financial Analysts",
    description:
      "Practice Excel questions relevant to finance and analyst roles.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-extrabold tracking-tight text-slate-900"
            aria-label="Finlysta Home"
          >
            Finlysta
          </a>

          <nav
            className="hidden items-center gap-8 text-sm font-semibold md:flex"
            aria-label="Main navigation"
          >
            <a
              href="#practice"
              className="transition hover:text-blue-600"
            >
              Practice
            </a>

            <a
              href="#topics"
              className="transition hover:text-blue-600"
            >
              Interview Questions
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-blue-600"
            >
              How It Works
            </a>
          </nav>

          <a
            href="/assessment"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Start Assessment
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Practical Skills & Interview Preparation
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Practice the skills.
            <br />
            <span className="text-blue-600">
              Get interview ready.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Build practical Excel, finance and analytical skills through
            realistic challenges, assessments and interview questions
            designed for students, freshers and entry-level professionals.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/assessment"
              className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Take Free Excel Assessment
            </a>

            <a
              href="#practice"
              className="rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Explore Practice
            </a>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Practice at your own pace. No course required.
          </p>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Test yourself
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How interview-ready is your Excel?
            </h2>

            <p className="mt-4 text-slate-600">
              Start with a free Excel assessment and identify your strengths
              and weaknesses across the skills commonly tested in interviews
              and practical assessments.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-8 text-center sm:grid-cols-3">
              <div>
                <p className="text-3xl font-bold text-blue-600">20+</p>
                <p className="mt-2 text-sm text-slate-600">
                  Practical questions
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-blue-600">Real</p>
                <p className="mt-2 text-sm text-slate-600">
                  Interview-style scenarios
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-blue-600">Free</p>
                <p className="mt-2 text-sm text-slate-600">
                  To get started
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/assessment"
                className="block rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Start Your Free Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section id="practice">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Excel Practice
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Don&apos;t just learn Excel. Practice it.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Learn by solving realistic Excel problems based on the type of
              work you may encounter in finance, accounting, business and
              analyst roles.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <a
                key={skill.title}
                href={skill.href}
                className="group rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-sm"
              >
                <h3 className="font-semibold transition group-hover:text-blue-700">
                  {skill.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {skill.description}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                  Learn & Practice →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Real-world skills */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Build practical skills
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Excel practice for real-world work
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Knowing Excel formulas is only one part of becoming
              interview-ready. Employers often expect candidates to analyze
              data, solve practical problems, prepare reports and explain
              their approach.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Finlysta helps you practice those skills through Excel
              functions, practical challenges, assessments and interview-style
              questions. Practice topics such as VLOOKUP, XLOOKUP,
              INDEX & MATCH, SUMIFS, COUNTIFS, Pivot Tables, Power Query,
              data cleaning and Excel dashboards.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              The goal is simple: spend less time memorizing answers and more
              time solving the types of problems you may encounter in
              finance, accounting, business and analyst roles.
            </p>
          </div>

          {/* Excel visual */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="flex h-72 w-72 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm sm:h-80 sm:w-80"
              aria-label="Excel practice"
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-green-600 text-6xl font-black text-white shadow-lg">
                X
              </div>

              <p className="mt-6 text-2xl font-bold text-slate-900">
                Excel
              </p>

              <p className="mt-2 text-center text-sm font-medium text-slate-500">
                Practice real-world skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Simple process
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Practice. Measure. Improve.
            </h2>

            <p className="mt-4 text-slate-600">
              A simple way to turn what you learn into practical,
              interview-ready skills.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose a challenge",
                text: "Pick an Excel skill, practical challenge or interview topic based on your goals.",
              },
              {
                number: "02",
                title: "Solve the problem",
                text: "Work through realistic tasks instead of simply memorizing formulas and answers.",
              },
              {
                number: "03",
                title: "Improve your score",
                text: "Use your results to identify weak areas and keep practicing until you are more confident.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <span className="text-sm font-bold text-blue-600">
                  {item.number}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Topics */}
      <section id="topics" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Interview Preparation
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Prepare for the Excel questions recruiters ask
            </h2>

            <p className="mt-4 text-slate-600">
              Prepare for Excel interviews and practical assessments with
              questions designed around common workplace scenarios and
              entry-level analyst roles.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interviewTopics.map((topic) => (
              <a
                href="/practice"
                key={topic.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <h3 className="font-semibold">
                  {topic.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {topic.description}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                  Practice →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Finlysta */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Why Finlysta?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Stop wondering if you&apos;re ready.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Watching tutorials can help you understand Excel. Practice
              helps you apply it. Finlysta is built around practical problems,
              assessments and interview preparation so you can build
              confidence through doing.
            </p>

            <a
              href="/practice"
              className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start Practicing
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-4">
            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold">
                What is Finlysta?
              </summary>

              <p className="mt-4 leading-7 text-slate-600">
                Finlysta is a practical skills platform focused on Excel
                practice, assessments and interview preparation for students,
                freshers and entry-level professionals.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Is Finlysta an Excel course?
              </summary>

              <p className="mt-4 leading-7 text-slate-600">
                No. Finlysta focuses on practical Excel practice,
                assessments and interview preparation rather than traditional
                video-based courses.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Who should use Finlysta?
              </summary>

              <p className="mt-4 leading-7 text-slate-600">
                Finlysta is designed for students, freshers, finance
                candidates, analysts and anyone preparing for Excel
                assessments or interviews.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Can I practice Excel interview questions?
              </summary>

              <p className="mt-4 leading-7 text-slate-600">
                Yes. Finlysta includes practical Excel challenges and
                interview-focused questions covering formulas, lookups,
                Pivot Tables, Power Query and data analysis.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Can beginners use Finlysta?
              </summary>

              <p className="mt-4 leading-7 text-slate-600">
                Yes. You can start with practical Excel fundamentals and
                gradually work toward more advanced challenges.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Is the Excel assessment free?
              </summary>

              <p className="mt-4 leading-7 text-slate-600">
                Yes. You can start the Excel assessment without paying.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to test your Excel skills?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Start with a free assessment, find your weak areas and practice
            the skills that matter for your next interview.
          </p>

          <a
            href="/assessment"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Free Excel Practice →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <a
                href="/"
                className="text-2xl font-extrabold tracking-tight text-slate-900"
              >
                Finlysta
              </a>

              <p className="mt-3 text-lg font-semibold leading-7 text-slate-700 sm:text-xl">
                Practice skills. Get interview ready.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
              <a
                href="/privacy"
                className="transition hover:text-slate-900"
              >
                Privacy
              </a>

              <a
                href="/contact"
                className="transition hover:text-slate-900"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-6 text-center text-sm text-slate-400 sm:text-left">
            © 2026 Finlysta. Practice skills. Get interview ready.
          </div>
        </div>
      </footer>
    </main>
  );
}