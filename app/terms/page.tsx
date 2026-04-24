"use client";

import { Scale, FileText, AlertCircle, RefreshCw, CheckCircle, Shield, UserCheck, XCircle } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const terms = [
    {
      icon: UserCheck,
      title: "Account Responsibilities",
      description: "You agree to provide accurate information and maintain the integrity of your profile. Keep your login credentials secure and notify us of any unauthorized access.",
      color: "from-blue-600 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: Shield,
      title: "Platform Usage",
      description: "Use the platform responsibly. Do not engage in fraudulent activities, misrepresent yourself, or attempt to manipulate the internship application process.",
      color: "from-purple-600 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: XCircle,
      title: "Account Termination",
      description: "We reserve the right to suspend or terminate accounts that violate platform policies, misuse services, or attempt fraudulent activity without prior notice.",
      color: "from-orange-600 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      icon: RefreshCw,
      title: "Terms Updates",
      description: "Finlysta may update these terms periodically to reflect platform improvements or legal requirements. Continued use indicates acceptance of updated terms.",
      color: "from-green-600 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 rounded-full mb-6 border border-blue-200/50">
              <Scale className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Legal Agreement
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                Service
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These terms govern your use of the Finlysta platform. Please read them carefully before accessing or using our services.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText size={16} className="text-blue-500" />
                <span>Last Updated: March 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle size={16} className="text-green-500" />
                <span>Effective Immediately</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20" />
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Key Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {terms.map((term, index) => {
              const Icon = term.icon;
              return (
                <div key={index} className="group relative">
                  <div 
                    className={`relative h-full bg-white rounded-2xl p-6 shadow-sm border-2 ${term.borderColor} hover:border-transparent transition-all duration-500 overflow-hidden`}
                  >
                    {/* Gradient Background on Hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${term.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div 
                          className={`relative w-12 h-12 ${term.bgColor} rounded-xl flex items-center justify-center shadow-md transition-all duration-500 group-hover:bg-white/20 group-hover:backdrop-blur-sm`}
                        >
                          <Icon 
                            size={24} 
                            className={`${term.textColor} transition-colors duration-500 group-hover:text-white`} 
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 
                            className={`text-lg font-bold mb-2 transition-colors duration-500 group-hover:text-white text-gray-900`}
                          >
                            {term.title}
                          </h3>
                          <p 
                            className={`text-sm leading-relaxed transition-colors duration-500 group-hover:text-white/90 text-gray-600`}
                          >
                            {term.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Terms */}
          <div className="space-y-8">
            {/* Original Terms in Enhanced Format */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Summary of Terms
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    By using Finlysta, you agree to provide accurate information, maintain the integrity of your profile, and use the platform responsibly.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600">2</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to suspend or terminate accounts that violate platform policies, misuse services, or attempt fraudulent activity.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">3</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Finlysta may update these terms periodically to reflect platform improvements or legal requirements. Continued use of the platform indicates acceptance of updated terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information Cards */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Disclaimers</h3>
                <p className="text-sm text-gray-600">
                  Finlysta is provided &quot;as is&quot; without warranties. We do not guarantee internship placements or specific outcomes from platform usage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                <p className="text-sm text-gray-600">
                  Finlysta shall not be liable for indirect damages arising from platform use. Our liability is limited to the maximum extent permitted by law.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">📋 Questions About Our Terms?</h4>
              <p className="text-gray-600">
                If you have any questions regarding these terms, please contact us through our platform's support channel.
              </p>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-12">
              <p className="text-xs text-gray-400 pt-4 border-t border-gray-200">
                © 2026 Finlysta. All rights reserved. | Version 2.0 | Effective: March 1, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

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
    </main>
  );
}
