// app/employers/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, CheckCircle, Briefcase, GraduationCap, FileText, Users, Zap, Shield, Clock, ChevronDown, ChevronUp } from "lucide-react";

// ============================================
// EMPLOYER HERO COMPONENT
// ============================================
const EmployerHero = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            For Employers
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#081B4B]">
            How Hiring on
            <br />
            <span style={{ color: "#2563EB" }}>
              Finlysta Works
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            Post your finance internship or entry-level job
            <br />
            for free and reach motivated finance students.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/employers/submit"
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold"
            >
              Post a Job for Free
              <ArrowRight size={18} color="#FFFFFF" />
            </Link>
          </div>

          {/* Trust Point - Single */}
          <div className="mt-8">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle size={18} className="text-blue-600" />
              <span>100% Free During Launch</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">
          <div className="relative">
            <Image
              src="/employer-how-it-works.png"
              alt="Employer Hiring Process"
              width={700}
              height={500}
              className="w-full object-contain -ml-8"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 4-STEP PROCESS COMPONENT - WITH IMAGES, GAPS, AND BLUE ARROWS
// ============================================
const ProcessSteps = () => {
  const steps = [
    {
      title: "Submit Job",
      description: "Fill out the job form in\nunder 2 minutes with\nyour opportunity details\nand application link.",
      image: "/step1.png",
    },
    {
      title: "We Review",
      description: "Our team reviews your\njob to ensure quality and\nrelevance for finance\nstudents.",
      image: "/step2.png",
    },
    {
      title: "Job Goes Live",
      description: "Once approved, your job\nis published on Finlysta\nand visible to thousands\nof finance students.",
      image: "/step3.png",
    },
    {
      title: "Students Apply",
      description: "Interested candidates\napply directly through\nyour application link on\n your website.",
      image: "/step4.png",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2563EB]">
          Our Simple 4 Step Process
        </h2>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-8 md:gap-12">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div className="text-center w-[260px] mx-auto">
              <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="font-bold text-[#081B4B] text-xl mb-3">{step.title}</h3>
              <p className="text-base text-black whitespace-pre-line leading-7">
                {step.description}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div className="text-[#2563EB] text-4xl font-bold mx-4">→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// NO RECRUITER ACCOUNT REQUIRED - LEFT SIDE IMAGE
// ============================================
const NoAccountRequired = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - IMAGE (Reduced size and moved up) */}
        <div className="relative -mt-8">
          <Image
            src="/recruiter-no-login.png"
            alt="No Recruiter Account Required"
            width={180}
            height={150}
            className="object-contain w-full"
          />
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            <Shield size={14} />
            No Signup Required
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#081B4B] mb-4">
            No Recruiter Account Required
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            No Signup. No Login. No Dashboard.
            <br />
            Simply send us the job details and application link.
            We'll handle publishing for you.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle size={18} className="text-blue-600" />
              <span>No Account Creation</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle size={18} className="text-blue-600" />
              <span>No Dashboard to Manage</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle size={18} className="text-blue-600" />
              <span>Direct Student Applications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHY POST ON FINLYSTA
// ============================================
const WhyPostOnFinlysta = () => {
  const benefits = [
    { icon: Zap, title: "Post in Under 2 Minutes", description: "Quick and simple submission process", color: "text-blue-600", bgColor: "bg-blue-50" },
    { icon: Shield, title: "No Account Required", description: "No signup or login needed", color: "text-green-600", bgColor: "bg-green-50" },
    { icon: FileText, title: "We Handle Publishing", description: "We review and publish for you", color: "text-purple-600", bgColor: "bg-purple-50" },
    { icon: Users, title: "Reach Finance Students", description: "Targeted finance audience", color: "text-amber-600", bgColor: "bg-amber-50" },
    { icon: Clock, title: "100% Free During Launch", description: "No posting charges", color: "text-red-600", bgColor: "bg-red-50" },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#081B4B]">Why Post on Finlysta</h2>
        <p className="text-slate-500 mt-2">Everything you need to hire finance talent</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${benefit.bgColor} flex items-center justify-center`}>
                <Icon size={22} className={benefit.color} />
              </div>
              <h3 className="font-bold text-[#081B4B] text-sm mb-1">{benefit.title}</h3>
              <p className="text-xs text-slate-500">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// WHAT CAN YOU POST - WITH IMAGES
// ============================================
const WhatCanYouPost = () => {
  const opportunities = [
    { title: "Finance Internships", image: "/finance-internships.png" },
    { title: "Entry-Level Jobs", image: "/entry-level-jobs.png" },
    { title: "CA Articleships", image: "/ca-articleships.png" },
    { title: "Graduate Programs", image: "/graduate-programs.png" },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#081B4B]">What Can You Post?</h2>
        <p className="text-slate-500 mt-2">All types of finance opportunities</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {opportunities.map((opp, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Image
                src={opp.image}
                alt={opp.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="font-bold text-[#081B4B] text-lg">{opp.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// DONT HAVE TIME TO POST
// ============================================
const DontHaveTimeToPost = () => {
  const steps = [
    { title: "Share Job Details", description: "Send job title, company name, location, description, application link" },
    { title: "We Review & Publish", description: "Our team reviews and publishes your opportunity" },
    { title: "Students Discover & Apply", description: "Finance students find and apply to your role" },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#081B4B]">Don't Have Time To Post?</h2>
        <p className="text-slate-500 mt-2">We've got you covered</p>
      </div>
      <div className="max-w-3xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {idx + 1}
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="font-bold text-[#081B4B]">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.description}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="text-slate-300 text-xl flex-shrink-0">↓</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// WHY HIRE THROUGH FINLYSTA
// ============================================
const WhyHireThroughFinlysta = () => {
  const reasons = [
    { icon: Users, title: "Finance-Focused Audience", description: "Reach finance students and fresh graduates." },
    { icon: Shield, title: "100% Free During Launch", description: "No posting charges." },
    { icon: Zap, title: "Simple & Hassle-Free", description: "No dashboard. No complicated setup." },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#081B4B] mb-4">Why Hire Through Finlysta?</h2>
          <p className="text-slate-500 mb-6">The smart way to find finance talent</p>
          <div className="space-y-4">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#081B4B]">{reason.title}</h3>
                    <p className="text-sm text-slate-500">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <Image
            src="/why-hire.png"
            alt="Why Hire Through Finlysta"
            width={500}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ COMPONENT
// ============================================
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Do I need an account to post a job?", a: "No! You don't need to create any account. Simply submit your job details through our form, and we'll publish it for you." },
    { q: "Is posting really free?", a: "Yes, posting jobs and internships on Finlysta is completely free during our launch phase." },
    { q: "What opportunities can I post?", a: "You can post finance internships, entry-level jobs, CA articleships, and graduate programs." },
    { q: "How do candidates apply?", a: "Candidates apply directly through the application link you provide. All applications go straight to you." },
    { q: "How long does approval take?", a: "We typically review and approve jobs within 24-48 hours." },
    { q: "Can I edit or remove a job?", a: "Yes, simply email us at support@finlysta.com with your request." },
    { q: "Do you provide a recruiter dashboard?", a: "Currently, we keep it simple. No dashboard needed — just submit and we handle the rest." },
    { q: "Who sees my job posting?", a: "Your job will be visible to finance students, graduates, and freshers looking for entry-level roles." },
    { q: "How do I submit a job?", a: "Click the 'Post a Job for Free' button and fill out the simple form, or email us directly." },
    { q: "Why use Finlysta instead of traditional job portals?", a: "Finlysta is completely free, finance-focused, and requires no account. We target only finance students and freshers." },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#081B4B]">Frequently Asked Questions</h2>
        <p className="text-slate-500 mt-2">Everything you need to know</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-[#081B4B]">{faq.q}</span>
                {isOpen ? <ChevronUp size={18} className="text-blue-600" /> : <ChevronDown size={18} className="text-blue-600" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-slate-500">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================
// FINAL CTA COMPONENT
// ============================================
const FinalCTA = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="border border-slate-200 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#081B4B] mb-3">Ready to Hire Finance Talent?</h2>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Post your opportunity for free and connect with motivated finance students today.
        </p>
        <Link
          href="/employers/submit"
          className="inline-flex items-center gap-2 px-7 py-3 bg-[#2563EB] text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Post a Job for Free
          <ArrowRight size={18} />
        </Link>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <CheckCircle size={14} className="text-blue-600" /> Takes less than 2 minutes
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function EmployersPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <EmployerHero />
      <ProcessSteps />
      <NoAccountRequired />
      <WhyPostOnFinlysta />
      <WhatCanYouPost />
      <DontHaveTimeToPost />
      <WhyHireThroughFinlysta />
      <FAQ />
      <FinalCTA />
    </main>
  );
}