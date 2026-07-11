// app/guides/page.tsx

import Link from "next/link";
import { FileSpreadsheet, ChevronRight, BookOpen, Users, Clock } from "lucide-react";

// ============================================================
// SEO METADATA
// ============================================================
export const metadata = {
  title: "Finance Guides & Resources | Free Excel Tutorials for Finance Careers",
  description: "Master Excel functions, financial modeling, and accounting skills with our free finance guides. Learn VLOOKUP, XLOOKUP, SUMIFS, and more with real datasets.",
  keywords: "finance guides, Excel tutorials, Excel functions, financial modeling, accounting tutorials, finance career resources, free finance learning",
  openGraph: {
    title: "Finance Guides & Resources | Free Excel Tutorials",
    description: "Master Excel functions, financial modeling, and accounting skills with our free finance guides. Start learning today.",
    type: "website",
    url: "https://www.finlysta.com/guides",
    images: [
      {
        url: "https://www.finlysta.com/og-guides.png",
        width: 1200,
        height: 630,
        alt: "Finance Guides & Resources",
      },
    ],
  },
  alternates: {
    canonical: "https://www.finlysta.com/guides",
  },
};

// ============================================================
// STRUCTURED DATA (JSON-LD) FOR SEO
// ============================================================
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Finance Guides & Resources",
  "description": "Master Excel functions, financial modeling, and accounting skills with our free finance guides.",
  "url": "https://www.finlysta.com/guides",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.finlysta.com/" },
      { "@type": "ListItem", "position": 2, "name": "Learning Hub", "item": "https://www.finlysta.com/learning-hub" },
      { "@type": "ListItem", "position": 3, "name": "Guides", "item": "https://www.finlysta.com/guides" }
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Top 50 Advanced Excel Functions for Finance",
        "description": "Master the most-used Excel functions in finance jobs and interviews with real datasets and practice questions.",
        "url": "https://www.finlysta.com/guides/excel-functions-guide"
      }
    ]
  }
};

// ============================================================
// TYPES
// ============================================================
type Guide = {
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  slug: string;
  color: string;
  bgColor: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  students: number;
};

// ============================================================
// GUIDES DATA
// ============================================================
const guides: Guide[] = [
  {
    title: "Top 50 Advanced Excel Functions for Finance",
    description: "Master the most-used Excel functions in finance jobs and interviews with real datasets and practice questions.",
    category: "Excel & Skills",
    readTime: "30 min",
    icon: FileSpreadsheet,
    slug: "excel-functions-guide",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    difficulty: "Beginner",
    students: 12450,
  },
  // Add more guides here as you create them
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function GuidesPage() {
  const totalGuides = guides.length;

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <BookOpen size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">Free Finance Learning Resources</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#081B4B] leading-tight">
              Finance Guides & <span className="text-blue-600">Resources</span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Master Excel functions, financial modeling, and accounting skills with our free guides.
              Built for students, freshers, and anyone starting their finance career.
            </p>
          </div>
        </section>

        {/* ============================================================
            GUIDES GRID
            ============================================================ */}
        <section className="max-w-5xl mx-auto px-6 py-12" aria-label="Finance guides and tutorials">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#081B4B]">All Guides</h2>
            <span className="text-sm text-slate-500">{totalGuides} guides available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              const difficultyColors = {
                Beginner: "bg-green-50 text-green-700",
                Intermediate: "bg-yellow-50 text-yellow-700",
                Advanced: "bg-red-50 text-red-700",
              };

              return (
                <Link
                  key={index}
                  href={`/guides/${guide.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  aria-label={`Read guide: ${guide.title}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${guide.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} className={guide.color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {guide.category}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[guide.difficulty]}`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {guide.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#081B4B] group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {guide.description}
                      </p>

                      {/* Students */}
                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                        <Users size={12} />
                        <span>{guide.students.toLocaleString()} students</span>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                        Read Guide
                        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {guides.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#081B4B]">More Guides Coming Soon</h3>
              <p className="text-sm text-slate-500 mt-1">We're working on new guides to help you build your finance career.</p>
            </div>
          )}
        </section>

        {/* ============================================================
            FAQ SECTION FOR SEO
            ============================================================ */}
        <section className="max-w-5xl mx-auto px-6 pb-16" aria-label="Frequently asked questions about finance guides">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-[#081B4B] mb-6">Frequently Asked Questions About Finance Guides</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#081B4B]">What Excel functions are covered in the guide?</h3>
                  <p className="text-sm text-slate-600 mt-1">The guide covers 50+ Excel functions including VLOOKUP, XLOOKUP, SUMIFS, COUNTIFS, IF, IFS, NPV, IRR, PMT, FV, and many more. Each function includes real datasets, practice questions, and examples.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">Are these guides suitable for beginners?</h3>
                  <p className="text-sm text-slate-600 mt-1">Yes. Our guides are designed for students, freshers, and anyone starting their finance career. They include clear explanations, real datasets, and step-by-step examples.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#081B4B]">How can I use these guides for interview preparation?</h3>
                  <p className="text-sm text-slate-600 mt-1">Each guide includes practice questions and real-world examples that mirror what you might encounter in finance interviews. You can also copy formulas and test them directly in Excel.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">Are these finance guides free?</h3>
                  <p className="text-sm text-slate-600 mt-1">Yes. All guides on Finlysta are completely free. We believe in making finance education accessible to everyone.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CTA SECTION
            ============================================================ */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-6 py-8 text-center text-white">
            <h2 className="text-2xl font-bold">Ready to Start Your Finance Career?</h2>
            <p className="mt-2 text-blue-100 max-w-xl mx-auto">
              Explore verified entry-level finance jobs and internships built for freshers on Finlysta.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <Link
                href="/jobs"
                className="bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition"
              >
                Browse Finance Jobs →
              </Link>
              <Link
                href="/learning-hub"
                className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition"
              >
                More Learning Resources →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}