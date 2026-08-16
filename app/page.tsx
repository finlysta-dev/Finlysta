const excelTopics = [
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
    title: "IF & Nested IF",
    description:
      "Master conditional logic with IF, Nested IF, AND, and OR functions.",
    href: "/excel-functions/if",
  },
  {
    title: "XLOOKUP",
    description:
      "Learn the modern Excel lookup function with built-in error handling.",
    href: "/excel-functions/xlookup",
  },
  {
    title: "Pivot Tables",
    description:
      "Analyze and summarize business data with practical Excel exercises.",
    href: "/excel-functions/pivot-tables",
  },
  {
    title: "Power Query",
    description:
      "Practice cleaning, transforming and preparing data for analysis.",
    href: "/excel-functions/power-query",
  },
  {
    title: "Data Cleaning",
    description:
      "Identify and fix common data-quality problems found in spreadsheets.",
    href: "/excel-functions/data-cleaning",
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
    href: "/interview-prep",
    color: "blue",
  },
  {
    title: "Finance Excel Interview Questions",
    description:
      "Practice financial modeling, valuation and accounting scenarios.",
    href: "/interview-prep/finance",
    color: "green",
  },
  {
    title: "Data Analyst Excel Interview Questions",
    description:
      "Test your skills in data cleaning, Power Query, and dashboard creation.",
    href: "/interview-prep/data-analyst",
    color: "purple",
  },
  {
    title: "Consulting Case Study Excel",
    description:
      "Solve business problems using Excel analysis and presentation skills.",
    href: "/excel/dashboards",
    color: "orange",
  },
];

const blogPosts = [
  {
    title: "Data Analyst Excel: Complete Guide for 2026",
    description:
      "A complete guide to mastering Excel for data analysis, covering essential functions, Pivot Tables, Power Query, and data cleaning techniques.",
    href: "/blog/data-analyst-excel-guide",
    category: "Data Analysis",
  },
  {
    title: "INDEX MATCH vs VLOOKUP: Which One Should You Use?",
    description:
      "A detailed comparison of INDEX MATCH and VLOOKUP, helping you understand when and why to use each function.",
    href: "/blog/index-match-vs-vlookup",
    category: "Excel Functions",
  },
  {
    title: "Top 10 Excel Interview Questions for Finance Roles",
    description:
      "Prepare for your finance interview with these 10 essential Excel questions that recruiters commonly ask.",
    href: "/blog/top-excel-interview-questions",
    category: "Interview Preparation",
  },
  {
    title: "How to Practice VLOOKUP for a Job Test",
    description:
      "Master VLOOKUP with this step-by-step practice guide. Learn common pitfalls and real-world scenarios.",
    href: "/blog/how-to-practice-vlookup",
    category: "Excel Functions",
  },
  {
    title: "5 Tips to Ace Your Excel Interview",
    description:
      "Excel assessments can be challenging. Here are 5 proven strategies to help you perform your best under pressure.",
    href: "/blog/excel-assessment-tips",
    category: "Interview Tips",
  },
];

const steps = [
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
];

const faqs = [
  {
    question: "What is Finlysta?",
    answer:
      "Finlysta is a practical skills and interview preparation platform focused on Excel, finance and analytical skills.",
  },
  {
    question: "Is Finlysta an Excel course?",
    answer:
      "No. Finlysta focuses on practical Excel practice, assessments, challenges and interview preparation.",
  },
  {
    question: "Who should use Finlysta?",
    answer:
      "Finlysta is designed for students, freshers, finance candidates, analysts and entry-level professionals preparing for interviews or practical assessments.",
  },
  {
    question: "Can I practice Excel interview questions?",
    answer:
      "Yes. Finlysta includes Excel interview questions, scenario-based challenges and practical assessment-style exercises.",
  },
  {
    question: "Can beginners use Finlysta?",
    answer:
      "Yes. You can start with fundamental Excel topics and gradually move toward more advanced practical challenges.",
  },
  {
    question: "Is the Excel assessment free?",
    answer:
      "The Finlysta Excel assessment is designed to let you start practicing without requiring a paid course.",
  },
];

export default function Home() {
  // Helper function to get color classes
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          border: "border-blue-200",
          bg: "bg-blue-50",
          hover: "hover:border-blue-300",
          text: "text-blue-600",
        };
      case "green":
        return {
          border: "border-green-200",
          bg: "bg-green-50",
          hover: "hover:border-green-300",
          text: "text-green-600",
        };
      case "purple":
        return {
          border: "border-purple-200",
          bg: "bg-purple-50",
          hover: "hover:border-purple-300",
          text: "text-purple-600",
        };
      case "orange":
        return {
          border: "border-orange-200",
          bg: "bg-orange-50",
          hover: "hover:border-orange-300",
          text: "text-orange-600",
        };
      default:
        return {
          border: "border-slate-200",
          bg: "bg-slate-50",
          hover: "hover:border-slate-300",
          text: "text-blue-600",
        };
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
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
            className="hidden items-center gap-6 text-sm font-semibold md:flex"
          >
            <a
              href="#practice"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Practice
            </a>
            <a
              href="#topics"
              className="text-slate-700 transition hover:text-blue-600"
            >
              Interview Qs
            </a>
            <a
              href="#how-it-works"
              className="text-slate-700 transition hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="/blog"
              className="text-slate-700 transition hover:text-blue-600"
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

      {/* Hero */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Practical Skills & Interview Preparation
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Practice the skills.
              <br />
              <span className="text-blue-600">Get interview ready.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Build practical Excel, finance and analytical skills through
              realistic challenges, assessments and interview questions designed
              for students, freshers and entry-level professionals. Instead of
              watching passive tutorials, you'll solve the type of problems
              employers actually test in interviews — from VLOOKUP and Pivot
              Tables to financial modeling and data cleaning.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
              <span className="font-semibold">20+ practice questions</span> ·
              <span className="font-semibold"> Real interview scenarios</span> ·
              <span className="font-semibold"> Free to start</span>
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/assessment"
                className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Take Free Excel Assessment
              </a>

              <a
                href="#practice"
                className="rounded-xl border border-slate-300 px-7 py-4 font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Explore Practice
              </a>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Practice at your own pace. No course required.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section
        id="assessment"
        className="scroll-mt-20 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Test yourself
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How interview-ready is your Excel?
            </h2>

            <p className="mt-4 leading-7 text-slate-600 sm:text-lg">
              Start with a free Excel assessment and identify your strengths
              and weaknesses across the skills commonly tested in interviews
              and practical assessments.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-7 text-center sm:grid-cols-3">
              <div>
                <p className="text-3xl font-extrabold text-blue-600">
                  20+
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Practical questions
                </p>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-blue-600">
                  Real
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Interview-style scenarios
                </p>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-blue-600">
                  Free
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  To get started
                </p>
              </div>
            </div>

            <a
              href="/assessment"
              className="mt-8 block rounded-xl bg-blue-600 px-6 py-4 text-center font-bold text-white transition hover:bg-blue-700"
            >
              Start Your Free Assessment
            </a>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section id="practice" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Excel Practice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Don&apos;t just learn Excel. Practice it.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Learn by solving realistic Excel problems based on the type of
              work you may encounter in finance, accounting, business and
              analyst roles.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {excelTopics.map((topic) => (
              <a
                key={topic.title}
                href={topic.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
                  {topic.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {topic.description}
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                  Practice →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Real-world skills */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Build practical skills
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Excel practice for real-world work
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Knowing Excel formulas is only one part of becoming
              interview-ready. Employers often expect candidates to analyze
              data, solve practical problems, prepare reports and explain
              their approach.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Finlysta helps you practice those skills through Excel
              functions, practical challenges, assessments and
              interview-style questions.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              The goal is simple: spend less time memorizing answers and more
              time solving the types of problems you may encounter in
              finance, accounting, business and analyst roles.
            </p>

            <a
              href="/practice"
              className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Start Practicing →
            </a>
          </div>

          {/* Excel visual */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="flex h-64 w-64 items-center justify-center rounded-3xl border border-blue-100 bg-white shadow-lg sm:h-80 sm:w-80"
              aria-label="Excel practice visual"
            >
              <div className="text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-green-600 text-5xl font-extrabold text-white shadow-md sm:h-36 sm:w-36 sm:text-6xl">
                  X
                </div>

                <p className="mt-5 text-2xl font-extrabold text-slate-900">
                  Excel
                </p>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Practice real-world skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-20"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Simple process
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Practice. Measure. Improve.
            </h2>

            <p className="mt-4 text-slate-600">
              A simple way to turn what you learn into practical,
              interview-ready skills.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <span className="text-sm font-extrabold text-blue-600">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview topics */}
      <section
        id="topics"
        className="scroll-mt-20 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Interview Preparation
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Prepare for the Excel questions recruiters ask
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Prepare for Excel interviews and practical assessments with
              questions designed around common workplace scenarios and
              entry-level analyst roles.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {interviewTopics.map((topic) => {
              const colors = getColorClasses(topic.color);
              return (
                <a
                  key={topic.title}
                  href={topic.href}
                  className={`rounded-xl border ${colors.border} ${colors.bg} p-5 transition ${colors.hover} hover:shadow-md`}
                >
                  <h3 className={`font-bold text-slate-900`}>
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {topic.description}
                  </p>

                  <span className={`mt-4 inline-block text-sm font-bold ${colors.text}`}>
                    View →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Finlysta */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Why Finlysta?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Stop wondering if you&apos;re ready.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Watching tutorials can help you understand Excel. Practice
              helps you apply it. Finlysta is built around practical
              problems, assessments and interview preparation so you can
              build confidence through doing.
            </p>

            <a
              href="/practice"
              className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Start Practicing
            </a>
          </div>
        </div>
      </section>

      {/* Why We Pivoted */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Our Story
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From Job Platform to Excel Practice
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Finlysta started as a job and internship platform. But we
              quickly realized that the biggest barrier for students wasn't
              finding jobs — it was passing the Excel tests that employers
              use to screen candidates.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              So we pivoted. Today, we're building the most practical,
              hands-on Excel practice platform for students, freshers, and
              entry-level professionals.
            </p>
            <a
              href="/about"
              className="mt-6 inline-block text-sm font-bold text-blue-600 transition hover:text-blue-800"
            >
              Discover Our Journey →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Find answers to common questions about Finlysta and Excel
              practice.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <summary className="cursor-pointer list-none px-6 py-5 font-semibold text-slate-900 transition group-hover:text-blue-600">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600 group-hover:bg-blue-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition group-open:rotate-45 group-hover:bg-blue-100 group-hover:text-blue-600">
                      +
                    </span>
                  </div>
                </summary>

                <div className="px-6 pb-5 pt-2">
                  <div className="border-t border-slate-100 pt-4">
                    <p className="leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Resources / Blog */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Resources
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tips & Guides for Excel Interviews
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Free articles to help you prepare for Excel assessments and
              interviews.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <a
                key={post.title}
                href={post.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
              >
                <p className="text-sm font-semibold text-blue-600">
                  {post.category}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-2 text-base leading-6 text-slate-500">
                  {post.description}
                </p>
                <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                  Read →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-blue-50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to test your Excel skills?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Start with a free assessment, find your weak areas and practice
            the skills that matter for your next interview.
          </p>

          <a
            href="/assessment"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Take Assessment →
          </a>
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
                <li>
                  <a
                    href="/interview-prep/finance"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Finance Interview Questions
                  </a>
                </li>
                <li>
                  <a
                    href="/interview-prep/data-analyst"
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    Data Analyst Interview Questions
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

          {/* Social Sharing in Footer */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-500">Share Finlysta:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <a
                href="https://twitter.com/intent/tweet?url=https://finlysta.com&text=Practice%20Excel%20skills%20with%20Finlysta"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                aria-label="Share on Twitter"
              >
                🐦 Twitter
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://finlysta.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                aria-label="Share on LinkedIn"
              >
                💼 LinkedIn
              </a>
              <a
                href="mailto:?subject=Practice%20Excel%20skills%20with%20Finlysta&body=I%20found%20this%20great%20Excel%20practice%20platform%3A%20https%3A%2F%2Ffinlysta.com"
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                aria-label="Share via Email"
              >
                ✉️ Email
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-400">
              © 2026 Finlysta. Practice skills. Get interview ready.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}