import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Excel Blog & Interview Tips | Finlysta",
  description:
    "Read expert tips, guides, and practice strategies for Excel interviews, assessments, and real-world data analysis.",
  keywords: [
    "Excel blog",
    "Excel interview tips",
    "Excel practice guide",
    "VLOOKUP tutorial",
    "Excel assessment help",
    "finance Excel tips",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Excel Blog & Interview Tips | Finlysta",
    description:
      "Read expert tips, guides, and practice strategies for Excel interviews, assessments, and real-world data analysis.",
    url: "https://finlysta.com/blog",
    siteName: "Finlysta",
    type: "website",
  },
};

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Excel Interview Questions for Finance Roles",
    excerpt:
      "Prepare for your finance interview with these 10 essential Excel questions that recruiters commonly ask.",
    slug: "top-excel-interview-questions",
    date: "August 15, 2026",
    category: "Interview Preparation",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Practice VLOOKUP for a Job Test",
    excerpt:
      "Master VLOOKUP with this step-by-step guide. Learn common pitfalls and practice scenarios used in real interviews.",
    slug: "how-to-practice-vlookup",
    date: "August 12, 2026",
    category: "Excel Functions",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "5 Tips to Ace Your Excel Skills Assessment",
    excerpt:
      "Excel assessments can be challenging. Here are 5 proven strategies to help you perform your best under pressure.",
    slug: "excel-assessment-tips",
    date: "August 10, 2026",
    category: "Interview Tips",
    readTime: "3 min read",
  },
  {
    id: 4,
    title: "INDEX MATCH vs VLOOKUP: Which One Should You Use?",
    excerpt:
      "Understand the differences between INDEX MATCH and VLOOKUP. Learn when to use each and why in our comprehensive comparison.",
    slug: "index-match-vs-vlookup",
    date: "August 8, 2026",
    category: "Excel Functions",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Power Query for Beginners: Transform Data Like a Pro",
    excerpt:
      "Learn how to use Power Query to automate data cleaning and transformation. Perfect for data analysts and finance professionals.",
    slug: "power-query-beginners",
    date: "August 5, 2026",
    category: "Data Analysis",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Excel Dashboard Design: Best Practices for Business Reporting",
    excerpt:
      "Create professional, interactive dashboards that stakeholders love. Learn design principles, KPI selection, and visualization tips.",
    slug: "excel-dashboard-design",
    date: "August 1, 2026",
    category: "Dashboards",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "Excel Blog & Interview Tips",
    "description": "Read expert tips, guides, and practice strategies for Excel interviews, assessments, and real-world data analysis.",
    "url": "https://finlysta.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Finlysta",
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
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

      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Finlysta Blog
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Excel Tips & Interview Guides
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Expert tips, practice strategies, and guides to help you master
            Excel and ace your interviews.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                {post.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {post.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>{post.date}</span>
                <span className="font-bold text-blue-600 transition group-hover:text-blue-700">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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