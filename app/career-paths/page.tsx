import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ArrowRight,
  Briefcase,
  Target,
  Zap,
  ChevronRight,
  BarChart3,
  Calculator,
  PieChart,
  LineChart,
  Wallet,
  Building2,
  DollarSign,
  Scale,
  Users,
  Landmark,
  CreditCard,
  Globe,
  Shield,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Rocket,
  Star,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Finance Career Paths | Explore Roles, Skills & Growth | Finlysta",
  description:
    "Discover finance career paths for freshers in India. Explore roles like Financial Analyst, Investment Banking, FP&A, and more. Learn required skills, responsibilities, salary expectations, and career progression.",
  keywords: [
    "finance career paths",
    "financial analyst career",
    "investment banking career",
    "FP&A career",
    "finance jobs for freshers",
    "career in finance India",
    "financial analyst skills",
    "finance career roadmap",
  ],
  alternates: { canonical: "https://finlysta.com/career-paths" },
  openGraph: {
    title: "Finance Career Paths | Explore Roles, Skills & Growth | Finlysta",
    description:
      "Discover finance career paths for freshers in India. Explore roles, required skills, salary expectations, and career progression.",
    url: "https://finlysta.com/career-paths",
    siteName: "Finlysta",
    images: [
      {
        url: "/Finlysta.png",
        width: 1200,
        height: 630,
        alt: "Finlysta - Finance Career Paths",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const careerPaths = [
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    shortDescription:
      "Analyze financial data to help companies make informed business decisions",
    icon: BarChart3,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    popularity: "Most Popular",
    avgSalary: "₹5-12 LPA",
    experience: "0-3 Years",
    growth: "High",
  },
  {
    id: "investment-banking",
    title: "Investment Banking",
    shortDescription:
      "Help corporations and governments raise capital and execute mergers & acquisitions",
    icon: Landmark,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    popularity: "High Growth",
    avgSalary: "₹8-25 LPA",
    experience: "0-3 Years",
    growth: "Very High",
  },
  {
    id: "fpa",
    title: "FP&A Analyst",
    shortDescription:
      "Financial Planning & Analysis - Forecast financial performance and budget management",
    icon: Calculator,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    popularity: "In Demand",
    avgSalary: "₹6-14 LPA",
    experience: "0-3 Years",
    growth: "High",
  },
  {
    id: "corporate-finance",
    title: "Corporate Finance",
    shortDescription:
      "Manage company finances including capital raising, investments, and mergers",
    icon: Building2,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    popularity: "Stable",
    avgSalary: "₹5-15 LPA",
    experience: "0-3 Years",
    growth: "Medium",
  },
  {
    id: "risk-management",
    title: "Risk Management",
    shortDescription:
      "Identify and mitigate financial risks including market, credit, and operational risks",
    icon: Shield,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    popularity: "Growing",
    avgSalary: "₹5-12 LPA",
    experience: "0-3 Years",
    growth: "High",
  },
  {
    id: "accounting",
    title: "Accounting",
    shortDescription:
      "Record, classify, and summarize financial transactions for businesses",
    icon: BookOpen,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    popularity: "Essential",
    avgSalary: "₹3-8 LPA",
    experience: "0-3 Years",
    growth: "Medium",
  },
];

const whyChooseFinance = [
  {
    icon: TrendingUp,
    title: "High Earning Potential",
    description:
      "Finance offers competitive salaries with rapid growth as you gain experience and certifications.",
  },
  {
    icon: Rocket,
    title: "Fast Career Growth",
    description:
      "Performance-based promotions and clear progression paths to senior roles within 3-5 years.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description:
      "Work with multinational companies or relocate internationally with transferable skills.",
  },
  {
    icon: Briefcase,
    title: "Diverse Roles",
    description:
      "Choose from analyst, banking, consulting, risk, or corporate finance paths.",
  },
];

export default function CareerPathsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" />
              Career Discovery
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Explore{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Finance Career Paths
              </span>
              <br className="hidden sm:block" />
              for Your Future
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
              Discover the perfect finance career path. Learn required skills, responsibilities,
              salary expectations, and growth opportunities for each role.
            </p>

            {/* Search-like input showing filters */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Financial Analyst",
                  "Investment Banking",
                  "FP&A",
                  "Risk Management",
                ].map((role, i) => (
                  <Link
                    key={role}
                    href={`/career-paths/${role.toLowerCase().replace(" ", "-")}`}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 shadow-sm"
                  >
                    {role}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 md:h-16"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* Why Choose Finance Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose a Career in Finance?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Finance offers exciting opportunities with excellent growth potential for
              freshers in India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseFinance.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-blue-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Paths Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular Finance Career Paths
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Click on any role to explore detailed requirements, skills, and career progression
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((career, index) => {
              const Icon = career.icon;
              return (
                <Link
                  key={career.id}
                  href={`/career-paths/${career.id}`}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* Hover Gradient Background */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${career.color}`}
                  ></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${career.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          career.popularity === "Most Popular"
                            ? "bg-blue-100 text-blue-700"
                            : career.popularity === "High Growth"
                            ? "bg-purple-100 text-purple-700"
                            : career.popularity === "In Demand"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {career.popularity}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-white transition-colors duration-300">
                      {career.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 group-hover:text-white/80 transition-colors duration-300">
                      {career.shortDescription}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 group-hover:bg-white/20 transition-colors">
                        <DollarSign className="w-3.5 h-3.5 text-green-600 group-hover:text-white" />
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-white">
                          {career.avgSalary}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 group-hover:bg-white/20 transition-colors">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-white">
                          {career.experience}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 group-hover:bg-white/20 transition-colors">
                        <TrendingUp
                          className={`w-3.5 h-3.5 ${
                            career.growth === "Very High"
                              ? "text-purple-600"
                              : career.growth === "High"
                              ? "text-green-600"
                              : "text-orange-600"
                          } group-hover:text-white`}
                        />
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-white">
                          {career.growth} Growth
                        </span>
                      </div>
                    </div>

                    {/* Learn More */}
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:text-white transition-colors duration-300">
                      <span>Explore Career Path</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Finance Career?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive resources to land your dream finance role. Get interview
            tips, resume guides, and job alerts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jobs"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Find Finance Jobs
            </Link>
            <Link
              href="/interview-prep"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors duration-200 border border-blue-500"
            >
              Interview Prep
            </Link>
            <Link
              href="/blogs"
              className="px-6 py-3 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200 border border-white/30"
            >
              Read Career Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Which finance career has the highest salary?",
                a: "Investment Banking and Private Equity typically offer the highest starting salaries (₹8-25 LPA for freshers), followed by Financial Analyst roles in top companies (₹5-12 LPA).",
              },
              {
                q: "Do I need an MBA to become a Financial Analyst?",
                a: "No, many Financial Analysts start with a bachelor's degree in finance, commerce, or related fields. Certifications like CFA, FRM, or Excel proficiency can significantly boost your career.",
              },
              {
                q: "What skills are needed for finance careers?",
                a: "Key skills include Excel proficiency, financial modeling, analytical thinking, communication, and knowledge of accounting principles. SQL, Python, and data visualization tools are increasingly important.",
              },
              {
                q: "Which finance role is best for freshers?",
                a: "Financial Analyst, Accounting, and FP&A roles are excellent entry points. They offer good learning opportunities and clear progression paths.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
