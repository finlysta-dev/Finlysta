'use client';

// ... rest of your code
import type { Metadata } from "next";
import { useState } from "react";
import {
  Briefcase,
  Eye,
  Search,
  Shield,
  Target,
  CheckCircle,
  Rocket,
  Users,
  MessageCircle,
  Globe,
  BookOpen,
  TrendingUp,
  Sparkles,
  Award,
  Heart,
  Linkedin,
  Mail,
  ArrowRight,
  Zap,
  Star,
  BadgeCheck,
  Compass,
  Lightbulb,
  Share2,
  FileText,
  Calendar,
  Clock,
  Building2,
  UserCheck,
  MapPin,
  DollarSign,
  GraduationCap,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Bell,
  ChevronRight,
  Plus,
  Minus,
  Mic,
  GraduationCap as GraduationIcon
} from "lucide-react";
import Link from "next/link";

// ✅ METADATA ADDED HERE - This fixes the duplicate title issue for About page
export const metadata: Metadata = {
  title: "About Finlysta - Building the Future of Finance Careers",
  description:
    "Learn about Finlysta's mission to connect finance students and freshers with verified internships, entry-level jobs, and career resources in India.",
  keywords: [
    "about finlysta",
    "finance career platform",
    "finance internships india",
    "finance jobs for freshers",
    "finance career resources",
  ],
  openGraph: {
    title: "About Finlysta - Building the Future of Finance Careers",
    description:
      "Learn about Finlysta's mission to connect finance students and freshers with verified internships, entry-level jobs, and career resources in India.",
    url: "https://finlysta.com/about",
    images: [
      {
        url: "https://finlysta.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Finlysta - Finance Career Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Finlysta - Building the Future of Finance Careers",
    description:
      "Learn about Finlysta's mission to connect finance students and freshers with verified internships, entry-level jobs, and career resources in India.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What types of internships are available on Finlysta?",
      a: "Finlysta offers internships in Finance, Accounting, Financial Analysis, Investment Banking, Equity Research, Risk Management, Auditing, Taxation, and more. All opportunities are entry-level and fresher-friendly."
    },
    {
      q: "Is Finlysta free for students?",
      a: "Yes! Finlysta is completely free for students and job seekers. You can browse internships, apply to opportunities, and access career resources without any cost."
    },
    {
      q: "How are internships verified on Finlysta?",
      a: "Every internship listing on Finlysta is manually reviewed by our team before being published. We verify company details, role authenticity, and ensure no spam or fake listings make it to the platform."
    },
    {
      q: "Can companies post internships on Finlysta?",
      a: "Yes, companies looking to hire finance interns can post opportunities on Finlysta. Contact our team at partnerships@finlysta.com for more information."
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      
      {/* Hero Section - Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700">Built for Finance Freshers</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Finlysta</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Finlysta is a modern finance career platform designed to bridge
            the gap between talented finance students and genuine career opportunities.
            We help students, freshers, and early professionals discover meaningful
            internships and entry-level jobs that align with their skills and ambitions.
          </p>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-3xl">
            Our goal is not just to list opportunities, but to create a structured
            and transparent ecosystem where preparation meets opportunity —
            empowering young finance professionals to build strong foundations for
            their careers with clarity and confidence.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/internships">
              <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-105">
                <Briefcase size={18} />
                Browse Internships
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/jobs">
              <button className="inline-flex items-center gap-2 border-2 border-indigo-200 text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300">
                <Search size={18} />
                Find Entry Level Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Challenge & Approach - Grid Layout */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
              <Search className="w-7 h-7 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The Challenge</h2>
            <p className="text-gray-600 leading-relaxed">
              Many internship platforms focus only on listings, leaving
              candidates overwhelmed, uncertain, and unsure about authenticity.
              Talented finance students often struggle to find structured pathways
              that genuinely support their growth into meaningful careers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 border border-emerald-100">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Approach</h2>
            <p className="text-gray-600 leading-relaxed">
              Finlysta combines structured profiles, carefully verified
              internship listings, and a transparent application process
              to ensure meaningful connections between finance candidates and companies.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Finlysta Different - Updated with Learning Hub and Interview Prep */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Finlysta Different
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building more than just a job board — we're creating a complete ecosystem for finance career success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Structured Profiles</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Present your education, skills, and projects in a format that recruiters truly value.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Verified Internships</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every opportunity is reviewed to ensure authenticity and reduce noise.
              </p>
            </div>

            {/* Learning Hub - Replacing Transparent Process */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Learning Hub</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Access finance guides, tutorials, and skill-building resources to prepare for your career.
              </p>
              <Link href="/learning-hub" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                Explore Learning Hub →
              </Link>
            </div>

            {/* Interview Prep - Replacing No Spam, Ever */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Interview Prep</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Master finance interviews with practice questions, mock interviews, and expert tips.
              </p>
              <Link href="/interview-prep" className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium">
                Start Interview Prep →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free for Students</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Always free to browse and apply — no hidden costs or premium subscriptions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <BadgeCheck className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Career Resources</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Access resume templates, career guides, and mentorship opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - LinkedIn only */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Join Our Community</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Finlysta isn't just a platform — it's a community of ambitious finance students, 
                mentors, and companies who believe in the power of internships. Connect with 
                peers, share experiences, and grow together.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.linkedin.com/company/finlysta/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                  <Linkedin size={18} />
                  Follow on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Rocket className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become India's most trusted ecosystem for finance careers, where opportunity meets preparation,
              helping young professionals transition confidently from learning to real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-1.5 mb-4">
              <MessageCircle size={14} className="text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700">FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about Finlysta</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  {activeFaq === index ? (
                    <Minus size={18} className="text-indigo-600 flex-shrink-0" />
                  ) : (
                    <Plus size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start your journey?</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of students who've found their dream finance internships on Finlysta.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/internships">
              <button className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <Briefcase className="w-5 h-5" />
                Browse Internships
              </button>
            </Link>
            <Link href="/jobs">
              <button className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                <Search className="w-5 h-5" />
                Find Entry Level Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Finlysta. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}