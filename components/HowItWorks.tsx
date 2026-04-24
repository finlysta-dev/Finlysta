"use client";

import { UserPlus, Search, Send, Rocket, Sparkles, ArrowRight, CheckCircle, Target, Zap, Briefcase } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Profile",
      description: "Sign up in 30 seconds",
      fullDescription: "Showcase your skills, interests, and career goals to attract the right opportunities.",
      color: "from-blue-600 to-cyan-500",
      bgColor: "bg-blue-100",
      lightBg: "bg-blue-50",
    },
    {
      icon: Search,
      title: "Explore",
      description: "Browse verified internships",
      fullDescription: "Access real, manually verified opportunities from companies actively hiring students.",
      color: "from-purple-600 to-pink-500",
      bgColor: "bg-purple-100",
      lightBg: "bg-purple-50",
    },
    {
      icon: Send,
      title: "Apply",
      description: "Apply directly on Finlysta or company website",
      fullDescription: "Submit applications quickly without complicated forms or spam portals.",
      color: "from-orange-600 to-red-500",
      bgColor: "bg-orange-100",
      lightBg: "bg-orange-50",
    },
    {
      icon: Rocket,
      title: "Get Hired",
      description: "Start your career",
      fullDescription: "Track applications and kickstart your career with meaningful internship experience.",
      color: "from-green-600 to-emerald-500",
      bgColor: "bg-green-100",
      lightBg: "bg-green-50",
    },
  ];

  return (
    <section className="w-full py-20 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Simple 4-Step Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Finlysta Works
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to landing the perfect internship starts here
          </p>
        </div>

        {/* Roadmap Layout - Figma Style */}
        <div className="relative">
          {/* Desktop Roadmap */}
          <div className="hidden md:block relative">
            {/* Background Path */}
            <div className="absolute top-24 left-0 w-full h-1 bg-gray-200 rounded-full" />
            
            {/* Solid Progress Path */}
            <div className="absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-full" />

            {/* Steps Container */}
            <div className="relative grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={index} className="relative">
                    {/* Step Circle with Number */}
                    <div className="flex flex-col items-center">
                      <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-sm text-gray-700">
                          {index + 1}
                        </div>
                      </div>

                      {/* Arrow (except last) */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-7 -right-8 z-20">
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="mt-8 text-center">
                      <div className={`${step.lightBg} rounded-2xl p-5 min-h-[160px] flex flex-col`}>
                        {/* FIXED: Changed colored text to gray-900 for better contrast */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                          {step.description}
                        </p>
                        {/* FIXED: Changed text-gray-500 to text-gray-700 for better contrast */}
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {step.fullDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4 items-start">
                  {/* Step Indicator */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${step.lightBg} rounded-xl p-4`}>
                    {/* FIXED: Changed colored text to gray-900 for better contrast */}
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    {/* FIXED: Changed text-gray-500 to text-gray-700 for better contrast */}
                    <p className="text-xs text-gray-700 leading-relaxed">{step.fullDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/auth/register">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-98">
              Get Early Access to Finlysta
              <Rocket className="w-5 h-5" />
            </button>
          </Link>
          
          <p className="mt-4 text-sm text-gray-500">
            Join Now to Find your Dream Internship.
          </p>
        </div>
      </div>
    </section>
  );
}
