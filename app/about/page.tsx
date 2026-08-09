import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Finlysta | Practical Excel & Interview Preparation",
  description:
    "Learn about Finlysta, a practical learning platform helping students, freshers and aspiring finance and analyst professionals build Excel skills and prepare for interviews.",
  keywords: [
    "About Finlysta",
    "Finlysta",
    "Excel practice",
    "Excel interview preparation",
    "Excel skills for freshers",
    "finance analyst skills",
    "Excel learning platform",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Finlysta | Practical Excel & Interview Preparation",
    description:
      "Learn how Finlysta helps students and aspiring professionals build practical Excel skills and prepare for interviews.",
    url: "/about",
    siteName: "Finlysta",
    type: "website",
  },
};

const values = [
  {
    title: "Practical Learning",
    description:
      "We focus on practical problems and realistic examples instead of only teaching formulas and definitions.",
    icon: "💡",
  },
  {
    title: "Interview Ready",
    description:
      "Our content is designed to help learners understand the questions, tasks and practical situations they may encounter during interviews.",
    icon: "🎯",
  },
  {
    title: "Beginner Friendly",
    description:
      "Complex Excel concepts are explained in a simple and structured way so beginners can learn step by step.",
    icon: "📚",
  },
  {
    title: "Career Focused",
    description:
      "We focus on skills that can be useful for finance, accounting, business and analyst roles.",
    icon: "🚀",
  },
];

const audiences = [
  "Students learning Excel for the first time",
  "Freshers preparing for their first job",
  "Finance and accounting students",
  "Aspiring financial and data analysts",
  "Candidates preparing for Excel assessments",
  "Professionals looking to strengthen their Excel fundamentals",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Finlysta home"
          >
            <img
              src="/Finlysta.png"
              alt="Finlysta Logo"
              className="h-16 w-16 rounded-lg object-contain md:h-10 md:w-30"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 text-sm font-semibold md:flex"
          >
            <Link
              href="/#practice"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Practice
            </Link>

            <Link
              href="/#topics"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Interview Questions
            </Link>

            <Link
              href="/#how-it-works"
              className="text-slate-700 transition hover:text-blue-600"
            >
              How It Works
            </Link>

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
                <Link
                  href="/excel-functions/vlookup"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  VLOOKUP
                </Link>
                <Link
                  href="/excel-functions/index-match"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  INDEX MATCH
                </Link>
                <Link
                  href="/excel-functions/sumifs"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  SUMIFS
                </Link>
              </div>
            </div>
          </nav>

          <Link
            href="/assessment"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 sm:px-5"
          >
            Start Assessment
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              About Finlysta
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Learn practical skills.
              <br />
              <span className="text-blue-600">Get interview ready.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Finlysta is a practical learning platform designed to help
              students, freshers and aspiring finance and analyst professionals
              build useful Excel skills and prepare for real-world work.
            </p>
          </div>
        </div>
      </section>

      {/* What is Finlysta */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                What we do
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Learning should go beyond memorizing formulas.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Many learners can remember an Excel formula but struggle when
                they are given an unfamiliar dataset or a practical business
                problem.
              </p>

              <p>
                Finlysta was created to bridge that gap. We help learners
                practice Excel concepts through realistic examples, practical
                challenges, interview questions and hands-on exercises.
              </p>

              <p>
                Instead of focusing only on what a formula does, we focus on
                when to use it, how to apply it and how to explain your
                approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Our mission
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Make career-focused learning more practical.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our goal is to make it easier for learners to develop practical
                skills they can actually use in interviews, assessments and
                their first roles.
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                We believe that confidence comes from practice. That is why
                Finlysta is built around doing, solving and applying—not just
                reading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Who is Finlysta for?
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Built for people building their careers.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Finlysta is especially useful for learners who want to turn
              theoretical knowledge into practical skills.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {audiences.map((audience, index) => (
              <div
                key={audience}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <p className="text-base font-semibold leading-7 text-slate-800 sm:text-lg">
                  {audience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              What we believe
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Simple principles behind Finlysta.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-950 group-hover:text-blue-600">
                  {value.title}
                </h3>

                <p className="mt-4 text-lg leading-8 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current focus */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Our focus
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Starting with Excel.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Excel is one of the most widely used tools across finance,
                accounting, operations and analyst roles. That makes it a
                natural place to start.
              </p>

              <p>
                Finlysta currently focuses on practical Excel learning,
                including lookup functions, formulas, data analysis, Pivot
                Tables, Power Query, dashboards, assessments and interview
                preparation.
              </p>

              <p>
                As the platform grows, we aim to expand into more practical
                career-focused learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-900">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
            Start learning
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to practice?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Put your Excel knowledge into practice with realistic problems
            and interview-focused exercises.
          </p>

          <Link
            href="/practice"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-blue-500"
          >
            Start Excel Practice →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/Finlysta.png"
                  alt="Finlysta Logo"
                  className="h-16 w-16 rounded-lg object-contain md:h-10 md:w-30"
                />
              </Link>
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
                  <Link
                    href="/practice"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Excel Practice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/assessment"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Free Assessment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Functions */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Functions
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/excel-functions/vlookup"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    VLOOKUP
                  </Link>
                </li>
                <li>
                  <Link
                    href="/excel-functions/index-match"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    INDEX MATCH
                  </Link>
                </li>
                <li>
                  <Link
                    href="/excel-functions/sumifs"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    SUMIFS
                  </Link>
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
                  <Link
                    href="/about"
                    className="text-sm text-blue-600 font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Privacy
                  </Link>
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