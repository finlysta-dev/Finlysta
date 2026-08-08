"use client";

import { useMemo, useState } from "react";

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
      "A Pivot Table is an efficient way to summarize thousands of transactions by customer and calculate total revenue. Sorting the revenue column from largest to smallest then identifies the top customers.",
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
      "XLOOKUP is designed to find a value in one range and return the corresponding value from another range. It is a modern and flexible lookup function.",
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
      "Power Query is designed for repeatable data import, transformation, and cleaning workflows. It can significantly reduce repetitive manual work when monthly files follow a similar structure.",
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
      "SUMIFS can sum a numeric range based on multiple conditions, such as Region = Mumbai and Category = Electronics.",
    skills: ["SUMIFS", "Formulas"],
  },
];

export default function PracticePage() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const challenge = challenges[challengeIndex];

  const progress = useMemo(
    () => Math.round(((challengeIndex + 1) / challenges.length) * 100),
    [challengeIndex]
  );

  const isCorrect = selectedAnswer === challenge.answer;

  const chooseAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === challenge.answer) {
      setScore((current) => current + 1);
    }
  };

  const nextChallenge = () => {
    if (challengeIndex >= challenges.length - 1) return;

    setChallengeIndex((current) => current + 1);
    setSelectedAnswer(null);
    setShowResult(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const finalScore =
    challengeIndex === challenges.length - 1 && showResult
      ? Math.round((score / challenges.length) * 100)
      : 0;

  const getScoreMessage = () => {
    if (finalScore >= 80) {
      return {
        title: "Excellent work! 🎉",
        text: "You have a strong foundation in practical Excel problem-solving.",
      };
    }

    if (finalScore >= 60) {
      return {
        title: "Good progress! 💪",
        text: "You have a solid foundation, but a little more practice can improve your interview readiness.",
      };
    }

    return {
      title: "Keep practicing! 🚀",
      text: "You have identified some areas to improve. Practice consistently and try the challenges again.",
    };
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl"
            aria-label="Finlysta home"
          >
            Finlysta
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-blue-600 sm:inline"
            >
              Home
            </a>

            <a
              href="/practice"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-4"
            >
              Practice
            </a>
          </div>
        </div>
      </header>

      {/* Page */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-slate-500"
        >
          <a href="/" className="transition hover:text-blue-600">
            Finlysta
          </a>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-700">
            Excel Practice
          </span>
        </nav>

        {/* Intro */}
        <section className="mt-7">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700 sm:text-sm">
            Excel Practice
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Practice real Excel interview scenarios
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Don't just memorize Excel formulas. Practice choosing the right
            tool and approach for realistic workplace problems.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white px-3 py-2 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              {challenges.length} challenges
            </span>

            <span className="rounded-full bg-white px-3 py-2 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              Instant feedback
            </span>

            <span className="rounded-full bg-white px-3 py-2 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              Free practice
            </span>
          </div>
        </section>

        {/* Progress */}
        <section className="mt-8" aria-label="Practice progress">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-slate-800">
              Challenge {challengeIndex + 1} of {challenges.length}
            </span>

            <span className="font-medium text-slate-500">
              {progress}% complete
            </span>
          </div>

          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Practice progress: ${progress}%`}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Challenge Card */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-8">
          <div className="p-5 sm:p-8 md:p-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {challenge.category}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                {challenge.difficulty}
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {challenge.title}
            </h2>

            {/* Scenario */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Scenario
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                {challenge.scenario}
              </p>
            </div>

            {/* Question */}
            <h3 className="mt-7 text-lg font-bold leading-7 text-slate-950 sm:text-xl">
              {challenge.question}
            </h3>

            {/* Options */}
            <div className="mt-5 space-y-3">
              {challenge.options.map((option, index) => {
                const selected = selectedAnswer === index;
                const correct = challenge.answer === index;

                let optionClass =
                  "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50";

                if (showResult && correct) {
                  optionClass =
                    "border-green-500 bg-green-50 ring-1 ring-green-500";
                } else if (showResult && selected && !correct) {
                  optionClass =
                    "border-red-500 bg-red-50 ring-1 ring-red-500";
                } else if (selected) {
                  optionClass =
                    "border-blue-600 bg-blue-50 ring-1 ring-blue-600";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseAnswer(index)}
                    disabled={showResult}
                    aria-pressed={selected}
                    className={`w-full rounded-xl border p-4 text-left text-sm leading-6 transition sm:p-5 sm:text-base ${optionClass} ${
                      showResult
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    <span className="mr-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showResult && (
              <div
                className={`mt-7 rounded-xl border p-5 sm:p-6 ${
                  isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isCorrect
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {isCorrect ? "✓" : "!"}
                  </div>

                  <div>
                    <h3
                      className={`font-bold ${
                        isCorrect
                          ? "text-green-900"
                          : "text-red-900"
                      }`}
                    >
                      {isCorrect
                        ? "Correct! Great choice."
                        : "Not quite. Here's why."}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                      {challenge.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {challenge.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            {showResult && (
              <div className="mt-7">
                {challengeIndex < challenges.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextChallenge}
                    className="w-full rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-base"
                  >
                    Next Challenge →
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
                      <p className="text-sm font-semibold text-blue-700">
                        Practice complete
                      </p>

                      <p className="mt-2 text-3xl font-bold text-slate-950">
                        {score}/{challenges.length}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {Math.round(
                          (score / challenges.length) * 100
                        )}
                        % score
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                      <h3 className="font-bold text-slate-950">
                        {getScoreMessage().title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {getScoreMessage().text}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={restartPractice}
                        className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Practice Again
                      </button>

                      <a
                        href="/"
                        className="rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Explore More Practice →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Current Skills */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Skills covered
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-950">
            What you're practicing
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
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

        {/* Why Practice */}
        <section className="mt-6 rounded-2xl bg-slate-900 p-6 text-white sm:mt-8 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Why practical practice?
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Excel interviews test more than formulas.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Employers may expect you to choose the right function, analyze
            data, clean a dataset, build reports and explain your approach.
            Finlysta helps you practice those decisions through realistic
            scenarios.
          </p>

          <a
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Explore Finlysta →
          </a>
        </section>

        {/* FAQ */}
        <section className="mt-10 sm:mt-14">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            FAQ
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Excel practice questions
          </h2>

          <div className="mt-6 space-y-3">
            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">
                Is this Excel practice free?
                <span className="float-right text-slate-400 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Yes. You can use these Finlysta Excel practice questions to
                test your knowledge and get immediate feedback.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">
                Who is this Excel practice for?
                <span className="float-right text-slate-400 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                The challenges are designed for students, freshers and
                entry-level professionals preparing for Excel assessments,
                finance roles and analyst interviews.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">
                Will I see the answer after selecting an option?
                <span className="float-right text-slate-400 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Yes. After you select an answer, Finlysta immediately shows
                whether your answer was correct and explains the recommended
                approach.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">
                What Excel skills are covered?
                <span className="float-right text-slate-400 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                This practice set currently covers Pivot Tables, XLOOKUP,
                Power Query, SUMIFS, data analysis and data cleaning.
              </p>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center sm:mt-14 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Ready to improve your Excel skills?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Keep practicing realistic problems and build confidence for your
            next Excel assessment or interview.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore Excel Practice →
            </a>

            <a
              href="/"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Back to Finlysta
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
          <p>
            © 2026 Finlysta. Practice skills. Get interview ready.
          </p>

          <div className="mt-3 flex justify-center gap-5">
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
      </footer>
    </main>
  );
}