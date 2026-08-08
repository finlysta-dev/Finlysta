"use client";

import { useState } from "react";

const challenges = [
  {
    title: "Find the Top Customers",
    category: "Data Analysis",
    difficulty: "Intermediate",
    scenario:
      "You have 5,000 sales transactions containing Customer, Region, Product, Quantity, and Revenue. Your manager asks you to identify the top 10 customers by total revenue.",
    question: "What would be the best approach?",
    options: [
      "Create a Pivot Table, put Customer in Rows and Revenue in Values, then sort Revenue from largest to smallest.",
      "Use CONCATENATE to combine Customer and Revenue.",
      "Use COUNTIF to count how many times each customer appears.",
      "Apply conditional formatting to the entire dataset and stop there.",
    ],
    answer: 0,
    explanation:
      "A Pivot Table is an efficient way to summarize thousands of transactions by customer and calculate total revenue. Sorting the revenue column from largest to smallest gives you the top customers.",
    skills: ["Pivot Tables", "Data Analysis"],
  },
  {
    title: "Match Employee Information",
    category: "Lookups",
    difficulty: "Advanced",
    scenario:
      "You have an Employee ID in cell A2 and a separate employee master table containing Employee ID, Department, Manager, and Salary. You need to return the employee's Department.",
    question: "Which approach is most appropriate in modern Excel?",
    options: [
      "Use XLOOKUP with Employee ID as the lookup value.",
      "Use SUM to add the employee's department.",
      "Use COUNT to find the department.",
      "Use ROUND to format the Employee ID.",
    ],
    answer: 0,
    explanation:
      "XLOOKUP is designed to find a value in one range and return the corresponding value from another range. It is especially useful for modern Excel lookup scenarios.",
    skills: ["XLOOKUP", "Lookups"],
  },
  {
    title: "Clean Monthly Files",
    category: "Data Cleaning",
    difficulty: "Advanced",
    scenario:
      "Every month you receive a CSV file containing sales transactions. The columns are mostly the same, but there are occasional formatting issues and new files arrive every month.",
    question:
      "Which Excel tool would be most useful for creating a repeatable cleaning process?",
    options: [
      "Power Query",
      "Format Painter",
      "WordArt",
      "Page Layout",
    ],
    answer: 0,
    explanation:
      "Power Query is designed for repeatable data import, transformation, and cleaning workflows. Once the transformation steps are created, they can be reused when new files arrive.",
    skills: ["Power Query", "Data Cleaning"],
  },
  {
    title: "Calculate Conditional Revenue",
    category: "Formulas",
    difficulty: "Intermediate",
    scenario:
      "You need to calculate total revenue for the Mumbai region where the product category is Electronics.",
    question: "Which formula is most appropriate?",
    options: ["SUMIFS", "COUNT", "LEFT", "PROPER"],
    answer: 0,
    explanation:
      "SUMIFS can sum a numeric range based on multiple conditions such as Region = Mumbai and Category = Electronics.",
    skills: ["SUMIFS", "Formulas"],
  },
];

export default function PracticePage() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const challenge = challenges[challengeIndex];

  const chooseAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === challenge.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextChallenge = () => {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex((previous) => previous + 1);
      setSelectedAnswer(null);
      setShowResult(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const restartPractice = () => {
    setChallengeIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isCorrect = selectedAnswer === challenge.answer;
  const isLastChallenge = challengeIndex === challenges.length - 1;
  const progress = ((challengeIndex + 1) / challenges.length) * 100;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Finlysta
          </a>

          <a
            href="/assessment"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Take Assessment →
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Back link */}
        <a
          href="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Finlysta
        </a>

        {/* Intro */}
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Excel Practice
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Practice real Excel scenarios
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Don't just memorize Excel functions. Practice deciding which tool
            or approach you would use to solve realistic workplace problems.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-10">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Challenge {challengeIndex + 1} of {challenges.length}
            </span>

            <span className="text-slate-500">
              {Math.round(progress)}% complete
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Challenge card */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {challenge.category}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {challenge.difficulty}
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
            {challenge.title}
          </h2>

          {/* Scenario */}
          <div className="mt-6 rounded-xl bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Scenario
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              {challenge.scenario}
            </p>
          </div>

          {/* Question */}
          <h3 className="mt-8 text-lg font-bold">
            {challenge.question}
          </h3>

          {/* Options */}
          <div className="mt-5 space-y-3">
            {challenge.options.map((option, index) => {
              const selected = selectedAnswer === index;
              const correct = challenge.answer === index;

              let optionClass =
                "border-slate-200 hover:border-blue-300 hover:bg-slate-50";

              if (showResult && correct) {
                optionClass = "border-green-500 bg-green-50";
              } else if (showResult && selected && !correct) {
                optionClass = "border-red-500 bg-red-50";
              } else if (selected) {
                optionClass = "border-blue-600 bg-blue-50";
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(index)}
                  disabled={showResult}
                  className={`w-full rounded-xl border p-4 text-left transition ${optionClass} ${
                    showResult ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>

                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <div
              className={`mt-8 rounded-xl p-6 ${
                isCorrect ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <h3
                className={`font-bold ${
                  isCorrect ? "text-green-800" : "text-red-800"
                }`}
              >
                {isCorrect ? "Correct! 🎉" : "Not quite."}
              </h3>

              <p className="mt-2 leading-7 text-slate-700">
                {challenge.explanation}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {challenge.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {showResult && (
            <div className="mt-8">
              {!isLastChallenge ? (
                <button
                  type="button"
                  onClick={nextChallenge}
                  className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
                >
                  Next Challenge →
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 p-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Practice Complete
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {score} / {challenges.length}
                    </p>

                    <p className="mt-2 text-slate-600">
                      Keep practicing to strengthen your Excel skills.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={restartPractice}
                    className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Practice Again
                  </button>

                  <a
                    href="/assessment"
                    className="block w-full rounded-xl border border-slate-300 px-6 py-4 text-center font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Take Full Excel Assessment →
                  </a>

                  <a
                    href="/practice/excel-sales-analysis"
                    className="block w-full rounded-xl border border-slate-300 px-6 py-4 text-center font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Try Practical Excel Challenge →
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Skills */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-7">
          <h2 className="text-xl font-bold">
            Skills you're practicing
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {challenge.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Practical challenge CTA */}
        <section className="mt-8 rounded-2xl bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
            Go beyond questions
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Ready for a real Excel task?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Download a real sales dataset, solve practical analysis tasks in
            Excel, and submit your completed workbook for evaluation.
          </p>

          <a
            href="/practice/excel-sales-analysis"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Try Sales Analysis Challenge →
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Finlysta. Practice skills. Get interview ready.</p>

          <div className="flex gap-5">
            <a
              href="/privacy"
              className="hover:text-slate-900"
            >
              Privacy
            </a>

            <a
              href="/contact"
              className="hover:text-slate-900"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}