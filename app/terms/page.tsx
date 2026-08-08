"use client";

import { Scale, FileText, AlertCircle, RefreshCw, CheckCircle, Shield, UserCheck, XCircle, Lock, Globe, Clock, Mail, ArrowRight, Heart, Star, Award } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const terms = [
    {
      icon: UserCheck,
      title: "Account Responsibilities",
      description: "You agree to provide accurate information and maintain the integrity of your profile. Keep your login credentials secure and notify us of any unauthorized access immediately.",
      color: "from-blue-600 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Platform Usage",
      description: "Use the platform responsibly. Do not engage in fraudulent activities, misrepresent yourself, or attempt to manipulate the internship application process.",
      color: "from-purple-600 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: XCircle,
      title: "Account Termination",
      description: "We reserve the right to suspend or terminate accounts that violate platform policies, misuse services, or attempt fraudulent activity without prior notice.",
      color: "from-orange-600 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: RefreshCw,
      title: "Terms Updates",
      description: "Finlysta may update these terms periodically to reflect platform improvements or legal requirements. Continued use indicates acceptance of updated terms.",
      color: "from-green-600 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/30">
            <Scale className="w-4 h-4" />
            <span className="text-sm font-medium">Legal Agreement</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Terms of Service
          </h1>
          
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            These terms govern your use of the Finlysta platform. Please read them carefully before accessing or using our services.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <FileText size={16} />
              <span>Last Updated: March 2026</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <CheckCircle size={16} />
              <span>Effective Immediately</span>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Key Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {terms.map((term, index) => {
            const Icon = term.icon;
            return (
              <div key={index} className="group relative">
                <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${term.gradient}`}></div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${term.bgColor} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className={term.textColor} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {term.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {term.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary of Terms - Enhanced */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Summary of Terms</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                By using Finlysta, you agree to provide accurate information, maintain the integrity of your profile, and use the platform responsibly.
              </p>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-purple-600">2</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate platform policies, misuse services, or attempt fraudulent activity.
              </p>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">3</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Finlysta may update these terms periodically to reflect platform improvements or legal requirements. Continued use of the platform indicates acceptance of updated terms.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Disclaimers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Finlysta is provided "as is" without warranties. We do not guarantee internship placements or specific outcomes from platform usage. All opportunities are subject to employer discretion.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Limitation of Liability</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Finlysta shall not be liable for indirect damages arising from platform use. Our liability is limited to the maximum extent permitted by applicable law.
            </p>
          </div>
        </div>

        {/* Key Principles Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Core Principles</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm font-medium text-gray-700">Transparency</p>
              <p className="text-xs text-gray-500 mt-1">Clear and honest communication</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-sm font-medium text-gray-700">Quality</p>
              <p className="text-xs text-gray-500 mt-1">Verified opportunities only</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-700">Trust</p>
              <p className="text-xs text-gray-500 mt-1">Building reliable connections</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Questions?</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Have questions about our Terms?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            If you have any questions regarding these terms, please don't hesitate to contact our support team.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Finlysta. All rights reserved. | Version 2.0 | Effective: March 1, 2026
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}