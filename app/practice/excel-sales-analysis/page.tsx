"use client";

import { useState } from "react";

const tasks = [
  "Calculate the total revenue generated across all transactions.",
  "Identify the top 5 customers based on total revenue.",
  "Calculate total revenue for each region.",
  "Identify the month with the highest total revenue.",
  "Create a summary of revenue by product category.",
];

export default function ExcelSalesAnalysisPage() {
  const [started, setStarted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    setMessage("");

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
      setMessage("Please select an Excel file (.xlsx or .xls).");
      return;
    }

    setFile(selectedFile);
    setMessage(`Selected: ${selectedFile.name}`);
  }

  async function submitSolution() {
    if (!file) {
      setMessage("Please choose your completed Excel file first.");
      return;
    }

    setLoading(true);
    setMessage("Uploading your workbook...");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/evaluate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to process your workbook."
        );
      }

      if (data.evaluated) {
        if (data.task?.correct) {
          setMessage(
            `✓ Correct! Your total revenue is accurate. Score: ${data.score}%`
          );
        } else {
          setMessage(
            data.message ||
              "Your workbook was evaluated, but the total revenue does not match."
          );
        }
      } else {
        setMessage(
          data.message ||
            "Workbook received, but we could not find the answer."
        );
      }
    } catch (error) {
      console.error("SUBMISSION ERROR:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!started) {
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
              href="/practice"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Practice
            </a>
          </div>
        </header>

        {/* Intro */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Excel Practice
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Sales Performance Analysis
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Test your Excel skills using a realistic sales dataset.
            Solve the challenge independently and submit your completed
            workbook for evaluation.
          </p>

          {/* Challenge */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Your Challenge
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Analyze the sales dataset
            </h2>

            <ol className="mt-6 list-decimal space-y-4 pl-6 leading-7 text-slate-700">
              {tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>
          </div>

          {/* Skills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Excel",
              "Data Analysis",
              "SUMIFS",
              "Pivot Tables",
              "Financial Analysis",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Start */}
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-10 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Challenge →
          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Download the dataset after starting the challenge.
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
            © 2026 Finlysta. Practice skills. Get interview ready.
          </div>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Finlysta
          </a>

          <span className="text-sm font-semibold text-slate-500">
            Excel Challenge
          </span>
        </div>
      </header>

      {/* Challenge */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Hands-on Excel Challenge
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Sales Performance Analysis
              </h1>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Intermediate
            </span>
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            Download the raw sales dataset, complete the analysis in Excel,
            and upload your completed workbook for evaluation.
          </p>

          {/* Tasks */}
          <div className="mt-8 rounded-xl bg-slate-50 p-6">
            <h2 className="text-xl font-bold">
              Tasks
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-6 leading-7 text-slate-700">
              {tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ol>
          </div>

          {/* Download */}
          <div className="mt-8">
            <a
              href="/datasets/sales-performance-analysis.xlsx"
              download
              className="block w-full rounded-xl bg-green-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-green-700"
            >
              Download Excel Dataset ↓
            </a>

            <p className="mt-3 text-center text-sm text-slate-500">
              Download the raw workbook and complete the tasks in Excel.
            </p>
          </div>

          {/* Upload */}
          <div className="mt-8 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
            <h2 className="text-lg font-bold">
              Upload Your Completed Workbook
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload your completed .xlsx or .xls file.
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
              <div className="mt-5 rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  Selected file
                </p>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {file.name}
                </p>
              </div>
            )}

            {message && (
              <div
                className={`mt-5 rounded-lg p-4 text-sm font-semibold ${
                  message.startsWith("✓")
                    ? "bg-green-50 text-green-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={submitSolution}
            disabled={!file || loading}
            className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Evaluating Workbook..." : "Submit & Evaluate"}
          </button>

          {/* Back */}
          <a
            href="/practice"
            className="mt-5 block text-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Excel Practice
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Finlysta. Practice skills. Get interview ready.
          </p>

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