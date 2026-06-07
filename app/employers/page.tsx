"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase, Users, Zap, CheckCircle, FileText,
  GraduationCap, Send, Target, BadgeCheck,
  FilePenLine, FileCheck, MailCheck, ArrowRight
} from "lucide-react";

const EmployerPage = () => {
  const router = useRouter();

  const whyItems = [
    {
      icon: Target,
      title: "Finance-Focused Audience",
      description: "Reach students who are serious about building careers in finance."
    },
    {
      icon: Users,
      title: "Freshers & Interns Only",
      description: "Only entry-level talent actively looking for opportunities."
    },
    {
      icon: Zap,
      title: "Fast & Easy",
      description: "Post your job in under 5 minutes. We'll take care of the rest."
    },
    {
      icon: BadgeCheck,
      title: "Free During Launch",
      description: "Post unlimited jobs completely free during our launch."
    }
  ];

  const howItWorks = [
    {
      number: "1",
      title: "Post Job",
      description: "Share your job details in under 5 minutes.",
      icon: FilePenLine
    },
    {
      number: "2",
      title: "We Review & Publish",
      description: "Our team verifies and publishes your listing.",
      icon: FileCheck
    },
    {
      number: "3",
      title: "Students Apply",
      description: "Qualified finance freshers submit applications.",
      icon: Users
    },
    {
      number: "4",
      title: "Receive Applications",
      description: "Review candidates directly in your dashboard.",
      icon: MailCheck
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC]">
      <main>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#F8FAFC] pt-12 pb-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">

              {/* Left Content */}
              <div className="z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/Finlysta.png"
                    alt="Finlysta Logo"
                    width={160}
                    height={36}
                    className="object-contain"
                  />
                  <div className="inline-flex items-center px-5 py-2 rounded-full border border-blue-600 bg-white">
                    <span className="text-sm font-bold text-blue-600">For Employers</span>
                  </div>
                </div>

                <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[#081B4B]">
                  Hire Finance
                  <br />
                  Freshers.{" "}
                  <span style={{ color: "#2563EB" }}>
                    Build
                    <br />
                    the Future.
                  </span>
                </h1>

                <p className="mt-3 text-xl text-slate-600 max-w-xl leading-relaxed">
                  Post entry-level finance jobs and internships for free.
                  <br />
                  Reach motivated finance students and fresh graduates
                  <br />
                  ready to start their careers.
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { icon: Users, label: "Finance Students" },
                    { icon: GraduationCap, label: "Fresh Graduates" },
                    { icon: Briefcase, label: "Internships" },
                    { icon: FileText, label: "Entry-Level Roles" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5"
                    >
                      <Icon size={12} /> {label}
                    </div>
                  ))}
                </div>

                <div className="relative inline-block mt-8">
                  {/* Decorative Lines - Positioned on the right side of button */}
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-[3px] bg-[#2563EB] rounded-full mb-1.5"></div>
                    <div className="w-6 h-[3px] bg-[#2563EB] rounded-full ml-2 mb-1.5"></div>
                    <div className="w-4 h-[3px] bg-[#2563EB] rounded-full ml-4"></div>
                  </div>

                  <button
                    onClick={() => router.push('/employers/post-job')}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg inline-flex items-center gap-2"
                  >
                    <Send size={18} strokeWidth={2.5} />
                    Post a Job for Free
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={12} className="text-[#2563EB]" />
                  </div>
                  <span className="text-sm text-slate-500">No signup required. Submit your job in under 5 minutes.</span>
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="flex justify-start -ml-16 lg:-ml-24">
                <div className="relative w-full max-w-[1800px] lg:max-w-[2000px] -mr-28 mt-4">
                  <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-30 rounded-full pointer-events-none" />
                  <Image
                    src="/employer-hero.jpg"
                    alt="Employer Hero"
                    width={2800}
                    height={1200}
                    priority
                    className="relative z-20 w-full h-auto object-contain"
                    style={{ transform: "scale(1.25)" }}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WHY + HOW SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-sm font-semibold text-[#2563EB] mb-2">Why Choose Us</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">Why Post Jobs on Finlysta?</h2>
                <p className="mt-2 text-slate-500">
                  We're built specifically for finance freshers and the employers who want to hire them.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2563EB] mb-2">Simple Process</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B]">How It Works</h2>
                <p className="mt-2 text-slate-500">
                  Get your job in front of qualified finance freshers in just a few steps.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* LEFT FRAME */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  {whyItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-3">
                          <Icon className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-[#081B4B] text-sm">{item.title}</h3>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT FRAME */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  {howItWorks.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="relative inline-block mx-auto">
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                            <Icon className="w-7 h-7 text-blue-600" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                            {step.number}
                          </div>
                        </div>
                        <h3 className="font-bold text-[#081B4B] text-sm mt-2">{step.title}</h3>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLUE RECTANGLE BLOCK WITH MEGAPHONE */}
        <section className="py-12 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-blue-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
              
              {/* Left Side - Megaphone Image */}
              <div className="flex-shrink-0">
                <Image
                  src="/megaphone.png"
                  alt="Megaphone"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              
              {/* Center Text */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  Post Your Job for Free Today!
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Connect with motivated finance students and find the right talent to grow your team.
                </p>
              </div>
              
              {/* Right Side - Button */}
              <button
                onClick={() => router.push('/employers/post-job')}
                className="bg-white text-[#2563EB] px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <Send size={16} />
                Post a Job for Free
              </button>
              
            </div>
          </div>
        </section>

      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EmployerPage;