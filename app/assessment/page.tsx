"use client";

import Link from "next/link";
import { useState } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  skill: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Which Excel function is commonly used to look up a value vertically?",
    options: ["SUMIF", "VLOOKUP", "COUNTIF", "LEFT"],
    answer: "VLOOKUP",
    skill: "Lookup Functions",
  },
  {
    id: 2,
    question: "Which function is generally recommended as a modern alternative to VLOOKUP?",
    options: ["SUMIFS", "XLOOKUP", "COUNTIFS", "CONCAT"],
    answer: "XLOOKUP",
    skill: "Lookup Functions",
  },
  {
    id: 3,
    question: "What does the FALSE argument in VLOOKUP generally specify?",
    options: [
      "Approximate match",
      "Exact match",
      "Sort the table",
      "Ignore blanks",
    ],
    answer: "Exact match",
    skill: "Lookup Functions",
  },
  {
    id: 4,
    question: "Which function returns the position of a value within a range?",
    options: ["MATCH", "INDEX", "SUM", "FILTER"],
    answer: "MATCH",
    skill: "Lookup Functions",
  },
  {
    id: 5,
    question: "Which function returns a value from a specified position in a range?",
    options: ["MATCH", "INDEX", "COUNT", "SORT"],
    answer: "INDEX",
    skill: "Lookup Functions",
  },
  {
    id: 6,
    question: "Which function adds values based on multiple criteria?",
    options: ["SUM", "SUMIF", "SUMIFS", "COUNTIFS"],
    answer: "SUMIFS",
    skill: "Conditional Functions",
  },
  {
    id: 7,
    question: "Which function counts cells that meet multiple criteria?",
    options: ["COUNT", "COUNTA", "COUNTIF", "COUNTIFS"],
    answer: "COUNTIFS",
    skill: "Conditional Functions",
  },
  {
    id: 8,
    question: "Which Excel feature is commonly used to summarize large datasets quickly?",
    options: ["Text to Columns", "Pivot Table", "Flash Fill", "Goal Seek"],
    answer: "Pivot Table",
    skill: "Pivot Tables",
  },
  {
    id: 9,
    question: "Which Excel tool is primarily used to clean and transform data?",
    options: ["Power Query", "Solver", "Scenario Manager", "Data Validation"],
    answer: "Power Query",
    skill: "Power Query",
  },
  {
    id: 10,
    question: "Which feature allows you to restrict what users can enter into a cell?",
    options: ["Conditional Formatting", "Data Validation", "Flash Fill", "Find & Replace"],
    answer: "Data Validation",
    skill: "Excel Basics",
  },
  {
    id: 11,
    question: "Which function removes extra spaces from text?",
    options: ["CLEAN", "TRIM", "SUBSTITUTE", "PROPER"],
    answer: "TRIM",
    skill: "Data Cleaning",
  },
  {
    id: 12,
    question: "Which function can combine text from multiple cells?",
    options: ["CONCAT", "COUNT", "SUM", "MATCH"],
    answer: "CONCAT",
    skill: "Text Functions",
  },
  {
    id: 13,
    question: "Which Excel feature highlights cells based on rules?",
    options: ["Conditional Formatting", "Data Validation", "Pivot Table", "Power Query"],
    answer: "Conditional Formatting",
    skill: "Excel Basics",
  },
  {
    id: 14,
    question: "What does an absolute reference such as $A$1 mean?",
    options: [
      "The row changes when copied",
      "The column changes when copied",
      "The reference remains fixed",
      "The formula is invalid",
    ],
    answer: "The reference remains fixed",
    skill: "Excel Basics",
  },
  {
    id: 15,
    question: "Which function can be used to handle an error such as #N/A?",
    options: ["IFERROR", "ERROR", "ISBLANK", "NA"],
    answer: "IFERROR",
    skill: "Excel Basics",
  },
  {
    id: 16,
    question: "Which Excel function calculates the average of numbers?",
    options: ["MEAN", "AVERAGE", "AVG", "MID"],
    answer: "AVERAGE",
    skill: "Excel Basics",
  },
  {
    id: 17,
    question: "Which chart is generally useful for showing a trend over time?",
    options: ["Pie Chart", "Line Chart", "Radar Chart", "Doughnut Chart"],
    answer: "Line Chart",
    skill: "Data Visualization",
  },
  {
    id: 18,
    question: "Which Excel feature is useful for quickly identifying duplicates?",
    options: [
      "Remove Duplicates",
      "Goal Seek",
      "Solver",
      "Watch Window",
    ],
    answer: "Remove Duplicates",
    skill: "Data Cleaning",
  },
  {
    id: 19,
    question: "Which function returns the largest value from a range?",
    options: ["HIGH", "MAX", "LARGE", "TOP"],
    answer: "MAX",
    skill: "Excel Basics",
  },
  {
    id: 20,
    question: "Which function can dynamically filter a dataset based on criteria?",
    options: ["FILTER", "SORT", "LOOKUP", "ROWS"],
    answer: "FILTER",
    skill: "Advanced Excel",
  },
];

const totalQuestions = questions.length;

export default function AssessmentPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[current];
  const selectedAnswer = answers[question.id];

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const progress = Math.round(
    ((current + 1) / totalQuestions) * 100
  );

  const selectAnswer = (option: string) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }));
  };

  const nextQuestion = () => {
    if (!selectedAnswer) return;

    if (current < totalQuestions - 1) {
      setCurrent((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitAssessment = () => {
    if (!allAnswered) return;

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct += 1;
      }
    });

    setScore(correct);
    setSubmitted(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
    setScore(0);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skillResults = questions.reduce(
    (acc, q) => {
      if (!acc[q.skill]) {
        acc[q.skill] = {
          total: 0,
          correct: 0,
        };
      }

      acc[q.skill].total += 1;

      if (answers[q.id] === q.answer) {
        acc[q.skill].correct += 1;
      }

      return acc;
    },
    {} as Record<string, { total: number; correct: number }>
  );

  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultLevel = () => {
    if (percentage >= 80) {
      return {
        title: "Strong Excel Foundation",
        description:
          "You have a strong foundation in the Excel concepts tested here. Keep practicing practical scenarios to become more confident in interviews.",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Good Foundation — Keep Practicing",
        description:
          "You understand many important Excel concepts, but there are areas worth strengthening before an Excel interview or assessment.",
      };
    }

    if (percentage >= 40) {
      return {
        title: "Developing Excel Skills",
        description:
          "You have some foundational knowledge. Focus on the areas where you lost marks and practice them with realistic problems.",
      };
    }

    return {
      title: "Start With the Fundamentals",
      description:
        "Use this result as your starting point. Strengthen the fundamentals and practice regularly to build confidence.",
    };
  };

  if (submitted) {
    const resultLevel = getResultLevel();

    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              Finlysta
            </Link>

            <Link
              href="/practice"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Back to Practice
            </Link>
          </div>
        </header>

        <section className="px-4 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Assessment Complete
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Your Excel Assessment Result
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                You answered all {totalQuestions} questions. Here is your
                current Excel skills snapshot.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-500">
                  Your Score
                </p>

                <div className="mt-3 text-6xl font-bold tracking-tight text-blue-600 sm:text-7xl">
                  {percentage}%
                </div>

                <p className="mt-3 text-slate-600">
                  {score} out of {totalQuestions} questions correct
                </p>

                <div className="mx-auto mt-6 h-3 max-w-md overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-10 rounded-xl bg-slate-50 p-5 sm:p-6">
                <h2 className="text-lg font-bold">{resultLevel.title}</h2>

                <p className="mt-2 leading-7 text-slate-600">
                  {resultLevel.description}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold">
                  Your Excel Skill Breakdown
                </h2>

                <div className="mt-5 space-y-4">
                  {Object.entries(skillResults).map(
                    ([skill, result]) => {
                      const skillPercentage = Math.round(
                        (result.correct / result.total) * 100
                      );

                      return (
                        <div
                          key={skill}
                          className="rounded-xl border border-slate-200 p-4 sm:p-5"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="font-semibold">{skill}</h3>
                              <p className="mt-1 text-sm text-slate-500">
                                {result.correct} of {result.total} correct
                              </p>
                            </div>

                            <span className="text-sm font-bold text-blue-600">
                              {skillPercentage}%
                            </span>
                          </div>

                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-600 transition-all"
                              style={{
                                width: `${skillPercentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/practice"
                  className="rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore Excel Practice
                </Link>

                <button
                  type="button"
                  onClick={restart}
                  className="rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Retake Assessment
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Want to improve your score? Practice individual Excel
                functions and realistic challenges on Finlysta.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Finlysta
          </Link>

          <Link
            href="/practice"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Back to Practice
          </Link>
        </div>
      </header>

      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Free Excel Assessment
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Test Your Excel Skills
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Answer {totalQuestions} practical Excel questions covering
              formulas, lookup functions, Pivot Tables, Power Query, data
              cleaning and analysis.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Question
                </p>

                <p className="mt-1 text-lg font-bold">
                  {current + 1} of {totalQuestions}
                </p>
              </div>

              <p className="text-sm font-medium text-slate-500">
                {answeredCount}/{totalQuestions} answered
              </p>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-blue-600">
                {question.skill}
              </p>

              <h2 className="mt-3 text-xl font-bold leading-8 sm:text-2xl">
                {question.question}
              </h2>

              <div
                className="mt-6 space-y-3"
                role="radiogroup"
                aria-label={`Answers for question ${current + 1}`}
              >
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => selectAnswer(option)}
                      className={`w-full rounded-xl border p-4 text-left font-medium transition sm:p-5 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-blue-600 bg-blue-600"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>

                        <span>{option}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={previousQuestion}
                disabled={current === 0}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {current < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitAssessment}
                  disabled={!allAnswered}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit Assessment
                </button>
              )}
            </div>

            {!allAnswered && current === totalQuestions - 1 && (
              <p className="mt-4 text-center text-sm text-slate-500">
                Please answer all {totalQuestions} questions before
                submitting your assessment.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}