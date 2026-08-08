"use client";

import { Shield, Lock, Eye, Database, Cookie, UserCheck, Clock, Users, RefreshCw, Mail, CheckCircle, FileText, Server, AlertTriangle, Globe, Smartphone, Fingerprint } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/30">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Your Privacy Matters</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Privacy Policy
          </h1>
          
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            We are committed to protecting your personal information and being transparent about how we use it.
          </p>
          
          <p className="text-sm text-blue-200/80 mt-4">Last Updated: March 2026</p>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Our Promise - Highlighted Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-100 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Promise to You</h2>
              <p className="text-gray-700 leading-relaxed">
                We respect your privacy. Any personal information shared on Finlysta is used only to improve the platform experience.
              </p>
              <p className="text-lg font-semibold text-blue-700 mt-3">
                We do not sell or misuse user data. You have full control over your profile visibility and information.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Information We Collect */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Information We Collect</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Name, email address, academic details, skills, resume, career preferences, and platform interactions to provide personalized internship matches.
            </p>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">How We Use Your Information</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Account management, internship matching, employer communication, platform improvements, and important updates about your applications.
            </p>
          </div>

          {/* Data Protection & Security */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data Protection & Security</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              256-bit SSL encryption, secure password hashing, regular security audits, restricted employee access, and automated backups to prevent data loss.
            </p>
          </div>

          {/* Your Privacy Choices */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Privacy Choices</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Full control over profile visibility, account deletion option, data download capability, and email notification preferences.
            </p>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Information Sharing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We never sell your data. Information is shared only with employers when you apply, with your explicit consent, or when required by law.
            </p>
          </div>

          {/* Cookies & Tracking */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Cookie className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cookies & Tracking</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Essential cookies keep you logged in securely, remember preferences, and analyze platform performance. Control cookies through browser settings.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Rights</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Access, rectify, erase, or export your data. Restrict processing or object to data use. Contact us to exercise these rights.
            </p>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data Retention</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Account active: data retained. Account deleted: removed within 30 days. Some anonymized data may be kept for analytics.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Children's Privacy</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our platform is not intended for users under 13. If you believe a child has provided us with personal information, please contact us immediately.
            </p>
          </div>

          {/* Policy Updates */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Policy Updates</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this privacy policy from time to time. Changes will be notified via email or platform notification.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Questions?</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Have privacy concerns?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
              Contact Support
              <Mail className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Finlysta. All rights reserved. | Effective: March 1, 2026 | Version 2.0
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