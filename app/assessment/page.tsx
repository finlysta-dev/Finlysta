"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  skill: string;
};

const questions: Question[] = [
  {
    question:
      "Which Excel function is best for looking up an employee's department using their Employee ID?",
    options: ["XLOOKUP", "SUMIFS", "COUNTIF", "ROUND"],
    answer: 0,
    explanation:
      "XLOOKUP can search for an Employee ID and return the corresponding department from another range.",
    skill: "XLOOKUP",
  },
  {
    question:
      "You need to calculate total revenue for Mumbai and only for Electronics. Which function is most appropriate?",
    options: ["COUNTIF", "SUMIFS", "LEFT", "AVERAGE"],
    answer: 1,
    explanation:
      "SUMIFS is designed to sum values based on multiple criteria such as Region = Mumbai and Category = Electronics.",
    skill: "SUMIFS",
  },
  {
    question:
      "Which Excel feature is most useful for summarizing thousands of sales transactions by region?",
    options: ["WordArt", "Pivot Table", "Page Layout", "Format Painter"],
    answer: 1,
    explanation:
      "Pivot Tables allow you to quickly summarize and analyze large datasets by dimensions such as region, customer or product.",
    skill: "Pivot Tables",
  },
  {
    question:
      "Which tool is best for importing monthly CSV files and creating a repeatable data-cleaning process?",
    options: ["Power Query", "Conditional Formatting", "Text Box", "Page Break"],
    answer: 0,
    explanation:
      "Power Query is designed for importing, transforming and cleaning data through repeatable workflows.",
    skill: "Power Query",
  },
  {
    question:
      "What does the MATCH function return?",
    options: [
      "The value from a cell",
      "The position of a value in a range",
      "The total of a range",
      "The formatting of a cell",
    ],
    answer: 1,
    explanation:
      "MATCH returns the relative position of a value within a specified range.",
    skill: "INDEX & MATCH",
  },
  {
    question:
      "Which formula can calculate the number of transactions for the Mumbai region?",
    options: ["COUNTIF", "SUM", "ROUND", "CONCAT"],
    answer: 0,
    explanation:
      "COUNTIF counts cells that meet a specified condition, such as Region = Mumbai.",
    skill: "COUNTIF",
  },
  {
    question:
      "You receive customer names with inconsistent extra spaces. Which function can help remove unnecessary spaces?",
    options: ["TRIM", "SUM", "MATCH", "MAX"],
    answer: 0,
    explanation:
      "TRIM removes extra spaces from text while leaving single spaces between words.",
    skill: "Data Cleaning",
  },
  {
    question:
      "Which Excel function is commonly used to add values that meet multiple conditions?",
    options: ["SUMIFS", "LEN", "UPPER", "MATCH"],
    answer: 0,
    explanation:
      "SUMIFS adds values that meet multiple criteria.",
    skill: "SUMIFS",
  },
  {
    question:
      "Which formula combination can perform a flexible lookup using a lookup position?",
    options: [
      "INDEX + MATCH",
      "SUM + ROUND",
      "COUNT + LEN",
      "LEFT + RIGHT",
    ],
    answer: 0,
    explanation:
      "INDEX + MATCH is a flexible lookup technique where MATCH finds the position and INDEX returns the corresponding value.",
    skill: "INDEX & MATCH",
  },
  {
    question:
      "What is one major advantage of Pivot Tables?",
    options: [
      "They automatically write VBA code",
      "They summarize and analyze large datasets quickly",
      "They replace all Excel formulas",
      "They only work with text",
    ],
    answer: 1,
    explanation:
      "Pivot Tables are especially useful for quickly summarizing large datasets and creating analytical views.",
    skill: "Pivot Tables",
  },
];

export default function AssessmentPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    setAnswers((previous) => {
      const updated = [...previous];
      updated[currentQuestion] = index;
      return updated;
    });
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const restartAssessment = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index]?.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) {
      return {
        title: "Excellent Excel foundation!",
        text:
          "You have demonstrated strong knowledge of common Excel skills used in practical analysis and interviews.",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Good start!",
        text:
          "You have a solid foundation, but a little more practice can help you become more confident in Excel interviews.",
      };
    }

    return {
      title: "Keep practicing!",
      text:
        "You have identified some areas to improve. Use Finlysta's practical challenges to strengthen your Excel skills.",
    };
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
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
                    INDEX MATCH
                  </a>
                  <a
                    href="/excel-functions/sumifs"
                    className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    SUMIFS
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

        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="mt-10">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                Free Excel Assessment
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                How interview-ready is your Excel?
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Test your knowledge of Excel formulas, lookups, Pivot Tables,
                Power Query and practical data analysis concepts.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-2xl font-extrabold text-blue-600">
                  10
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Questions
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-2xl font-extrabold text-blue-600">
                  Practical
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Interview-style questions
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-2xl font-extrabold text-blue-600">
                  Free
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  No account required
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-slate-50 p-7">
              <h2 className="text-xl font-extrabold">
                What will you be tested on?
              </h2>

              <ul className="mt-5 grid gap-3 text-slate-700 sm:grid-cols-2">
                {[
                  "XLOOKUP",
                  "INDEX & MATCH",
                  "SUMIFS & COUNTIF",
                  "Pivot Tables",
                  "Power Query",
                  "Data Cleaning",
                ].map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      ✓
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="mt-10 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start Free Assessment →
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
              No login required. Take the assessment at your own pace.
            </p>
          </div>
        </section>

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

  if (finished) {
    const result = getResultMessage();

    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
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
                    INDEX MATCH
                  </a>
                  <a
                    href="/excel-functions/sumifs"
                    className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    SUMIFS
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

        <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
            Assessment Complete
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {result.title}
          </h1>

          <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-100 bg-white shadow-sm">
            <div>
              <p className="text-4xl font-extrabold text-blue-600">
                {percentage}%
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                {score}/{questions.length} correct
              </p>
            </div>
          </div>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            {result.text}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/practice"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white hover:bg-blue-700"
            >
              Practice Excel →
            </a>

            <button
              type="button"
              onClick={restartAssessment}
              className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-800 hover:bg-slate-50"
            >
              Retake Assessment
            </button>
          </div>
        </section>

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

  const progress = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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
                  INDEX MATCH
                </a>
                <a
                  href="/excel-functions/sumifs"
                  className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  SUMIFS
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

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold">
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span className="text-slate-500">
            {progress}% complete
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            {question.skill}
          </span>

          <h1 className="mt-6 text-2xl font-extrabold leading-9 sm:text-3xl">
            {question.question}
          </h1>

          <div className="mt-7 space-y-3">
            {question.options.map((option, index) => {
              const selected = selectedAnswer === index;
              const correct = question.answer === index;

              let stateClass =
                "border-slate-200 hover:border-blue-300 hover:bg-slate-50";

              if (selectedAnswer !== null && correct) {
                stateClass = "border-green-500 bg-green-50";
              } else if (
                selectedAnswer !== null &&
                selected &&
                !correct
              ) {
                stateClass = "border-red-500 bg-red-50";
              } else if (selected) {
                stateClass = "border-blue-600 bg-blue-50";
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(index)}
                  className={`w-full rounded-xl border p-4 text-left transition ${stateClass} disabled:cursor-default`}
                >
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-extrabold text-slate-700">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div
              className={`mt-7 rounded-xl p-5 ${
                selectedAnswer === question.answer
                  ? "bg-green-50"
                  : "bg-red-50"
              }`}
            >
              <h2
                className={`font-extrabold ${
                  selectedAnswer === question.answer
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {selectedAnswer === question.answer
                  ? "Correct! 🎉"
                  : "Not quite."}
              </h2>

              <p className="mt-2 leading-7 text-slate-700">
                {question.explanation}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={nextQuestion}
            disabled={selectedAnswer === null}
            className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentQuestion === questions.length - 1
              ? "See My Results →"
              : "Next Question →"}
          </button>
        </div>
      </section>
    </main>
  );
}