"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import StatsSection from "@/components/StatsSection";

export default function AboutPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            About <span className="text-indigo-600">Internify</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-none">
            Internify is a modern internship discovery platform designed to bridge
            the gap between talented students and genuine career opportunities.
            We help students, freshers, and early professionals discover meaningful
            internships that align with their skills, interests, and long-term ambitions.
          </p>

          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-none">
            Our goal is not just to list opportunities, but to create a structured
            and transparent ecosystem where preparation meets opportunity —
            empowering young professionals to build strong foundations for
            their careers with clarity and confidence.
          </p>

        </div>
      </section>

      {/* Main Content */}
     <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        
        {/* Challenge & Approach */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Search className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Many internship platforms focus only on listings, leaving
                candidates overwhelmed, uncertain, and unsure about authenticity.
                Talented students often struggle to find structured pathways
                that genuinely support their growth.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our Approach
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Internify combines structured profiles, carefully verified
                internship listings, and a transparent application process
                to ensure meaningful connections between candidates and companies.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Internify Different */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            What Makes Internify Different
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <Briefcase className="w-6 h-6 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Structured Profiles
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Present your education, skills, and projects in a format
                that recruiters truly value.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <Shield className="w-6 h-6 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Verified Internships
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every opportunity is reviewed to ensure authenticity
                and reduce noise.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <Eye className="w-6 h-6 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Transparent Process
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Clear application tracking so you always know where you stand.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="text-center py-6 text-gray-500">
            Loading stats...
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-500">
            Error: {error}
          </div>
        ) : (
          <StatsSection />
        )}

        {/* What Makes Us Different - New Section */}
        <div className="bg-indigo-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">No Spam, Ever</h4>
                <p className="text-sm text-gray-600">All internships are manually verified before posting.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Free for Students</h4>
                <p className="text-sm text-gray-600">Always free to browse and apply—no hidden costs.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Real-Time Tracking</h4>
                <p className="text-sm text-gray-600">Know exactly where your application stands.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Career Resources</h4>
                <p className="text-sm text-gray-600">Access guides, tips, and mentorship opportunities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Join Our Community
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Internify isn't just a platform—it's a community of ambitious students, 
              mentors, and companies who believe in the power of internships. Connect with 
              peers, share experiences, and grow together.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/join-internify/" className="text-indigo-600 font-medium hover:text-indigo-800">Follow on LinkedIn →</a>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Rocket className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted ecosystem where opportunity meets preparation,
              helping young professionals transition confidently from learning
              to real-world impact.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 text-white p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students who've found their dream internships on Internify.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Users className="w-5 h-5" />
              Create Free Account
            </a>
            <a
              href="/internships"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              <Briefcase className="w-5 h-5" />
              Browse Internships
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Internify. All rights reserved.
        </div>
      </footer>
    </main>
  );
}