'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import { 
  Calculator, 
  Users, 
  Mic, 
  Target, 
  Award, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  Star,
  Zap,
  Briefcase,
  GraduationCap,
  FileText,
  BarChart3,
  LineChart,
  PieChart,
  Brain,
  Lightbulb,
  Rocket
} from "lucide-react";

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState<"excel" | "behavioral">("excel");

  // Progress data (mock for now)
  const excelProgress = {
    completed: 0,
    total: 30,
    streak: 0,
    mastered: 0
  };

  const behavioralProgress = {
    completed: 0,
    total: 15,
    streak: 0,
    mastered: 0
  };

  const currentProgress = activeTab === "excel" ? excelProgress : behavioralProgress;
  const progressPercentage = currentProgress.total > 0 
    ? Math.round((currentProgress.completed / currentProgress.total) * 100) 
    : 0;

  return (
    <>
      <Head>
        <title>Interview Preparation | Excel & Behavioral Questions | Finlysta</title>
        <meta name="description" content="Master finance interviews with our comprehensive preparation platform. Practice Excel technical questions and behavioral interview questions with detailed answers and mock interviews." />
        <meta name="keywords" content="interview preparation, excel interview questions, behavioral interview questions, finance interview, mock interview" />
        <meta name="author" content="Finlysta" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Interview Preparation | Excel & Behavioral Questions | Finlysta" />
        <meta property="og:description" content="Master finance interviews with comprehensive preparation including Excel technical questions and behavioral interview questions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finlysta.com/interview-prep" />
        <link rel="canonical" href="https://finlysta.com/interview-prep" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#FFD700] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 font-medium">Interview Preparation</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0f2d4a] to-[#1a3a5c] py-16 lg:py-20">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFA500]/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Mic size={14} className="text-[#FFD700]" />
              <span className="text-xs font-semibold text-white">Ace Your Next Interview</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Interview Preparation
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Master Excel technical questions and behavioral interview questions with detailed answers, 
              mock interviews, and personalized progress tracking.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">30+ Excel Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm">15+ Behavioral Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">Mock Interview Mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setActiveTab("excel")}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "excel"
                    ? "bg-[#FFD700] text-[#0A2540] shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Calculator size={18} />
                Excel Technical Questions
                <span className="text-xs ml-1">30+</span>
              </button>
              <button
                onClick={() => setActiveTab("behavioral")}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "behavioral"
                    ? "bg-[#FFD700] text-[#0A2540] shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Users size={18} />
                Behavioral Questions
                <span className="text-xs ml-1">15+</span>
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeTab === "excel" ? "Excel Interview Progress" : "Behavioral Interview Progress"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Track your preparation journey
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentProgress.completed}</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentProgress.total}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{currentProgress.streak}</div>
                  <div className="text-xs text-gray-500">Day Streak</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Overall Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-[#FFD700] h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Excel Card */}
            <Link href="/learn/advanced-excel" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FFD700] transition-colors">
                  Excel Interview Questions
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Master 30+ frequently asked Excel interview questions with detailed answers, real examples, and syntax explanations.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">VLOOKUP/XLOOKUP</span>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Pivot Tables</span>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Power Query</span>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Financial Modeling</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-400">30+ Questions</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#FFD700] font-medium text-sm group-hover:gap-2 transition-all">
                    Start Learning
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Behavioral Card */}
            <Link href="/learn/behavioral-interview" className="group block">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users size={28} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FFD700] transition-colors">
                  Behavioral Interview Questions
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Practice 15+ behavioral questions using the STAR method. Learn to answer confidently and impress recruiters.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">STAR Method</span>
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">Leadership</span>
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">Teamwork</span>
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">Problem Solving</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-400">15+ Questions</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#FFD700] font-medium text-sm group-hover:gap-2 transition-all">
                    Start Learning
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Featured Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-3 py-1 mb-3">
                  <Sparkles size={12} className="text-[#FFD700]" />
                  <span className="text-xs font-medium text-gray-700">Featured</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mock Interview Mode</h3>
                <p className="text-gray-600 mb-4">
                  Practice answering real interview questions with our interactive mock interview mode. 
                  Get feedback and improve your answers.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button className="inline-flex items-center gap-2 bg-[#FFD700] text-[#0A2540] px-5 py-2 rounded-lg font-semibold hover:bg-[#FFA500] transition">
                    <Mic size={16} />
                    Start Mock Interview
                  </button>
                  <button className="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-2 rounded-lg font-semibold border border-gray-200 hover:border-[#FFD700] transition">
                    <FileText size={16} />
                    Take Practice Quiz
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center shadow-lg">
                  <Mic size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Why Prepare Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why Prepare with <span className="text-[#FFD700]">Finlysta</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Comprehensive interview preparation designed specifically for finance professionals
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={22} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Real Questions</h4>
                <p className="text-xs text-gray-500">Curated from actual interviews</p>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star size={22} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Detailed Answers</h4>
                <p className="text-xs text-gray-500">Step-by-step explanations</p>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target size={22} className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Mock Interviews</h4>
                <p className="text-xs text-gray-500">Practice under real conditions</p>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp size={22} className="text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Track Progress</h4>
                <p className="text-xs text-gray-500">Monitor your improvement</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Ace Your Interview?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start practicing today and walk into your interview with confidence.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/learn/advanced-excel">
                <button className="bg-[#FFD700] text-[#0A2540] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#FFA500] transition inline-flex items-center gap-2">
                  <Calculator size={16} />
                  Excel Questions
                </button>
              </Link>
              <Link href="/learn/behavioral-interview">
                <button className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition inline-flex items-center gap-2">
                  <Users size={16} />
                  Behavioral Questions
                </button>
              </Link>
              <Link href="/jobs">
                <button className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition inline-flex items-center gap-2">
                  <Briefcase size={16} />
                  Apply to Jobs
                </button>
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8 pb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}