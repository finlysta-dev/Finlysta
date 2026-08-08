"use client";

import { useState } from "react";

type EvaluationResult = {
  number: number;
  title: string;
  status: "correct" | "incorrect" | "not_found";
  submitted?: number;
  expected?: number;
  difference?: number;
  location?: {
    sheet: string;
    cell: string;
  };
  message: string;
};

type EvaluationResponse = {
  success: boolean;
  evaluated: boolean;
  fileName?: string;
  sheetUsed?: string;
  score?: number | null;
  evaluatedTasks?: number;
  totalTasks?: number;
  results?: EvaluationResult[];
  message?: string;
  error?: string;
};

export default function ExcelSalesAnalysisPage() {
  const [started, setStarted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] =
    useState<EvaluationResponse | null>(null);

  const tasks = [
    "Calculate the total revenue generated across all transactions.",
    "Identify the top 5 customers based on total revenue.",
    "Calculate total revenue for each region.",
    "Identify the month with the highest total revenue.",
    "Create a summary of revenue by product category.",
  ];

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    setMessage("");
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    const isExcel =
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".xls");

    if (!isExcel) {
      setFile(null);
      setMessage(
        "Please select an Excel file (.xlsx or .xls)."
      );
      return;
    }

    setFile(selectedFile);
    setMessage(
      `Selected file: ${selectedFile.name}`
    );
  }

  async function submitSolution() {
    if (!file) {
      setMessage(
        "Please choose your completed Excel file first."
      );
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/evaluate", {
        method: "POST",
        body: formData,
      });

      const data: EvaluationResponse =
        await response.json();

      console.log("EVALUATION RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to evaluate your workbook."
        );
      }

      setResult(data);

      if (data.evaluated) {
        setMessage(
          "✓ Your workbook has been evaluated."
        );
      } else {
        setMessage(
          data.message ||
            "Your workbook was received, but an answer could not be evaluated."
        );
      }
    } catch (error) {
      console.error("SUBMISSION ERROR:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your workbook."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetEvaluation() {
    setResult(null);
    setMessage("");
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        {/* Header */}

        <header className="border-b border-slate-200">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <a
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              Finlysta
            </a>

            <a
              href="/practice"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Practice
            </a>
          </div>
        </header>

        {/* Challenge Introduction */}

        <section className="mx-auto max-w-4xl px-6 py-16">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Excel Practice
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            Sales Performance Analysis
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Test your Excel skills using a realistic
            sales dataset. Solve the challenge
            independently and submit your completed
            workbook for evaluation.
          </p>

          <div className="mt-10 rounded-2xl bg-slate-50 p-7">
            <h2 className="text-xl font-bold">
              Your Challenge
            </h2>

            <ol className="mt-5 list-decimal space-y-4 pl-6 text-slate-700">
              {tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-10 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Challenge →
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}

      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Finlysta
          </a>

          <span className="text-sm font-semibold text-slate-500">
            Excel Challenge
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        {/* Challenge Card */}

        {!result && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold">
              Sales Performance Analysis
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              Download the raw dataset, solve the
              challenge in Excel, then upload your
              completed workbook.
            </p>

            <a
              href="/datasets/sales-performance-analysis.xlsx"
              download
              className="mt-8 block w-full rounded-xl bg-green-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-green-700"
            >
              Download Excel Dataset
            </a>

            <div className="mt-8 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
              <h2 className="text-lg font-bold">
                Upload your completed workbook
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Any Excel filename is accepted. Your
                workbook does not need to be named
                "Final Answers".
              </p>

              <label className="mt-6 inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Choose Excel File

                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {file && (
                <p className="mt-5 break-all text-sm font-semibold text-slate-700">
                  Selected file: {file.name}
                </p>
              )}

              {message && (
                <p className="mt-5 text-sm font-semibold text-blue-600">
                  {message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={submitSolution}
              disabled={!file || loading}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Evaluating your workbook..."
                : "Submit & Evaluate"}
            </button>
          </div>
        )}

        {/* Evaluation Result */}

        {result && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Excel Challenge Result
              </p>

              <h1 className="mt-3 text-3xl font-bold">
                Your Evaluation
              </h1>

              {result.score !== null &&
                result.score !== undefined && (
                  <div className="mt-8 rounded-2xl bg-slate-50 p-7 text-center">
                    <p className="text-sm font-semibold text-slate-500">
                      Current Score
                    </p>

                    <p className="mt-2 text-5xl font-bold text-blue-600">
                      {result.score}%
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      {result.evaluatedTasks ?? 0} of{" "}
                      {result.totalTasks ?? 5} tasks
                      evaluated
                    </p>
                  </div>
                )}

              {result.score === null && (
                <div className="mt-8 rounded-2xl bg-amber-50 p-7">
                  <h2 className="font-bold text-amber-900">
                    Evaluation needs attention
                  </h2>

                  <p className="mt-2 leading-7 text-amber-800">
                    We received your workbook, but we
                    could not identify an answer that
                    could be automatically evaluated.
                  </p>
                </div>
              )}

              {result.fileName && (
                <p className="mt-5 break-all text-sm text-slate-500">
                  Workbook:{" "}
                  <span className="font-medium text-slate-700">
                    {result.fileName}
                  </span>
                </p>
              )}
            </div>

            {/* Task Results */}

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold">
                Evaluation Details
              </h2>

              <div className="mt-6 space-y-4">
                {(result.results ?? []).map(
                  (task) => (
                    <div
                      key={task.number}
                      className="rounded-xl border border-slate-200 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-500">
                            Task {task.number}
                          </p>

                          <h3 className="mt-1 font-bold">
                            {task.title}
                          </h3>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                            task.status ===
                            "correct"
                              ? "bg-green-100 text-green-700"
                              : task.status ===
                                "incorrect"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {task.status ===
                          "correct"
                            ? "Correct"
                            : task.status ===
                              "incorrect"
                            ? "Incorrect"
                            : "Not Evaluated"}
                        </span>
                      </div>

                      <p className="mt-4 leading-7 text-slate-600">
                        {task.message}
                      </p>

                      {task.submitted !==
                        undefined && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">
                              Your Answer
                            </p>

                            <p className="mt-1 font-semibold">
                              {task.submitted.toLocaleString()}
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">
                              Expected
                            </p>

                            <p className="mt-1 font-semibold">
                              {task.expected?.toLocaleString()}
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">
                              Difference
                            </p>

                            <p className="mt-1 font-semibold">
                              {task.difference?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}

                      {task.location && (
                        <p className="mt-4 text-xs text-slate-500">
                          Found in{" "}
                          <span className="font-semibold">
                            {task.location.sheet}
                          </span>{" "}
                          — cell{" "}
                          <span className="font-semibold">
                            {task.location.cell}
                          </span>
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Important MVP notice */}

            {(result.evaluatedTasks ?? 0) <
              (result.totalTasks ?? 5) && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <h2 className="font-bold text-blue-900">
                  More evaluation coming
                </h2>

                <p className="mt-2 leading-7 text-blue-800">
                  This MVP currently automatically
                  evaluates the Total Revenue task.
                  Additional challenge tasks can be
                  added to the evaluator without
                  changing the upload experience.
                </p>
              </div>
            )}

            {/* Actions */}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={resetEvaluation}
                className="rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Submit Another Workbook
              </button>

              <a
                href="/practice"
                className="rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Back to Practice
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}