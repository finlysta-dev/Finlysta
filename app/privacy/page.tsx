"use client";

import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section className="w-full py-24 px-4 md:px-6 bg-gradient-to-b from-white via-white to-gray-50/50 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Privacy Policy Section */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 rounded-full mb-6 border border-blue-200/50">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Privacy Matters
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h3>
            <p className="text-sm text-gray-500">Last Updated: March 2026</p>
          </div>
          
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            {/* Our Promise - Highlighted */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 mb-8">
              <p className="text-gray-700 text-base leading-relaxed">
                We respect your privacy. Any personal information shared on Internify is used only to improve the platform experience. 
                <span className="block mt-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  We do not sell or misuse user data. You have full control over your profile visibility and information.
                </span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 group-hover:scale-110 transition-transform">1</span>
                    Information We Collect
                  </h4>
                  <p className="text-gray-600">Name, email address, academic details, skills, resume, career preferences, and platform interactions to provide personalized internship matches.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs text-purple-600 group-hover:scale-110 transition-transform">2</span>
                    How We Use Your Information
                  </h4>
                  <p className="text-gray-600">Account management, internship matching, employer communication, platform improvements, and important updates about your applications.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs text-green-600 group-hover:scale-110 transition-transform">3</span>
                    Data Protection & Security
                  </h4>
                  <p className="text-gray-600">256-bit SSL encryption, secure password hashing, regular security audits, restricted employee access, and automated backups to prevent data loss.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs text-orange-600 group-hover:scale-110 transition-transform">4</span>
                    Your Privacy Choices
                  </h4>
                  <p className="text-gray-600">Full control over profile visibility, account deletion option, data download capability, and email notification preferences.</p>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs text-red-600 group-hover:scale-110 transition-transform">5</span>
                    Information Sharing
                  </h4>
                  <p className="text-gray-600">We never sell your data. Information is shared only with employers when you apply, with your explicit consent, or when required by law.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs text-yellow-600 group-hover:scale-110 transition-transform">6</span>
                    Cookies & Tracking
                  </h4>
                  <p className="text-gray-600">Essential cookies keep you logged in securely, Remember preferences, and analyze platform performance. Control cookies through browser settings.</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs text-indigo-600 group-hover:scale-110 transition-transform">7</span>
                    Your Rights
                  </h4>
                  <p className="text-gray-600">Access, rectify, erase, or export your data. Restrict processing or object to data use. Contact us to exercise these rights.</p>
                </div>
              </div>
            </div>
            
            {/* Additional Information - Customized */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {/* Data Retention Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200 group">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Data Retention</h4>
                <p className="text-gray-500 text-sm">Account active: data retained. Account deleted: removed within 30 days</p>
              </div>

              {/* Children's Privacy Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-purple-200 group">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Children's Privacy</h4>
                <p className="text-gray-500 text-sm">Not for under 13. Contact us immediately if concerns arise</p>
              </div>

              {/* Policy Updates Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-green-200 group">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Policy Updates</h4>
                <p className="text-gray-500 text-sm">Changes notified via email or platform notification</p>
              </div>
            </div>

            {/* Simple Contact Note - No Email IDs */}
            <div className="mt-4 text-center text-sm text-gray-500 italic">
              <p>For privacy-related questions, please contact us through our platform's support channel.</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100">
                © 2026 Internify. All rights reserved. | Effective: March 1, 2026 | Version 2.0
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </section>
  );
}