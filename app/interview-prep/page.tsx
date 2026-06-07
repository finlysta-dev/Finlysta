'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { 
  ChevronRight, 
  ArrowRight, 
  Briefcase, 
  Calculator, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Sparkles, 
  CheckCircle,
  FileText,
  BarChart3,
  BookOpen,
  Mic,
  Building2,
  Shield,
  Brain,
  Share2,
  Copy,
  X,
  Headphones,
  Play,
  Pause,
  Clock,
  Heart,
  Database,
  Plus,
  Minus,
  Keyboard,
  Search,
  FileQuestion,
  Volume2
} from "lucide-react";

export default function InterviewPrepPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [audioMode, setAudioMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAudioGuide, setSelectedAudioGuide] = useState<string>("excel");
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [openBehavioralAnswers, setOpenBehavioralAnswers] = useState<Record<number, boolean>>({});
  
  const audioRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Enhanced Interview Guides Data
  const mainGuides = [
    {
      id: 1,
      title: "Advanced Excel Interview Questions",
      shortTitle: "excel",
      icon: Calculator,
      badge: "30+ Questions",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      topBorder: "bg-blue-500",
      ctaColor: "text-blue-600",
      benefit: "Most Asked in Finance Interviews",
      topics: [
        "VLOOKUP vs XLOOKUP",
        "Pivot Tables",
        "INDEX MATCH",
        "SUMIFS vs COUNTIFS",
        "Conditional Formatting",
        "Power Query",
        "Data Validation",
        "Array Formulas",
        "Macros Basics",
        "Charting"
      ],
      totalTopics: 10,
      href: "/interview-prep/advanced-excel-interview-questions"
    },
    {
      id: 2,
      title: "Accounting Basics & Fundamentals",
      shortTitle: "accounting",
      icon: FileText,
      badge: "25+ Questions",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      topBorder: "bg-green-500",
      ctaColor: "text-green-600",
      benefit: "Most Asked in Accounting Interviews",
      topics: [
        "Journal Entries",
        "Depreciation",
        "Trial Balance",
        "Profit & Loss Statement",
        "Balance Sheet",
        "Cash Flow Statement",
        "Accrual Accounting",
        "Bank Reconciliation",
        "Financial Ratios",
        "Inventory Valuation"
      ],
      totalTopics: 10,
      href: "/interview-prep/accounting-basics-fundamentals"
    },
    {
      id: 3,
      title: "Behavioral Interview Questions",
      shortTitle: "behavioral",
      icon: Users,
      badge: "15+ Questions",
      badgeBg: "bg-indigo-100",
      badgeText: "text-indigo-700",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      topBorder: "bg-indigo-500",
      ctaColor: "text-indigo-600",
      benefit: "Master HR & Behavioral Rounds",
      topics: [
        "Tell Me About Yourself",
        "Why Finance?",
        "STAR Method",
        "Strengths & Weaknesses",
        "Leadership Examples",
        "Teamwork Scenarios",
        "Conflict Resolution",
        "Failure Stories",
        "Career Goals",
        "Why This Company?"
      ],
      totalTopics: 10,
      href: "/interview-prep/behavioural-questions"
    }
  ];

  // Feature Cards
  const featureCards = [
    {
      title: "Mock Interview",
      description: "Practice real interview questions with interactive mock interview mode. Get instant feedback and improve your answers.",
      icon: Mic,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      onClick: () => setShowMockInterview(true)
    },
    {
      title: "Quiz Mode",
      description: "Test your knowledge with multiple-choice quiz questions. Track your progress and identify areas for improvement.",
      icon: FileQuestion,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      onClick: () => window.location.href = "/interview-prep/quiz"
    },
    {
      title: "Excel Shortcuts",
      description: "Speed up your workflow with essential Excel shortcuts commonly used in finance, accounting, and data analysis.",
      icon: Keyboard,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      onClick: () => window.location.href = "/interview-prep/shortcuts"
    },
    {
      title: "Listen & Learn Mode",
      description: "Listen to interview questions and answers on the go. Perfect for learning while commuting or multitasking.",
      icon: Volume2,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      onClick: () => {
        setAudioMode(true);
        playAudio();
      }
    }
  ];

  const comingSoonGuides = [
    { title: "Financial Analyst", icon: TrendingUp, description: "DCF, Valuation, Financial Modeling", bgColor: "bg-orange-50", iconColor: "text-orange-600" },
    { title: "FP&A", icon: BarChart3, description: "Budgeting, Forecasting, Variance Analysis", bgColor: "bg-indigo-50", iconColor: "text-indigo-600" },
    { title: "Investment Banking", icon: Building2, description: "M&A, LBO, Pitch Books", bgColor: "bg-red-50", iconColor: "text-red-600" },
    { title: "Credit Analyst", icon: Shield, description: "Credit Risk, Debt Covenants", bgColor: "bg-teal-50", iconColor: "text-teal-600" },
    { title: "Risk Analyst", icon: Target, description: "Market Risk, Operational Risk", bgColor: "bg-pink-50", iconColor: "text-pink-600" },
    { title: "Power BI", icon: Database, description: "DAX, Power Query, Dashboards", bgColor: "bg-yellow-50", iconColor: "text-yellow-600" }
  ];

  const stats = [
    { value: "70+", label: "Questions" },
    { value: "10+", label: "Topics" },
    { value: "100%", label: "Free Access" },
    { value: "Mock", label: "Interviews" }
  ];

  const behavioralQuestionsData = [
    { q: "Tell me about yourself.", a: "Start with your current role/education, then highlight relevant experience, and end with why you're interested in this position. Keep it under 2 minutes and focus on finance-related achievements." },
    { q: "Why did you choose finance?", a: "Share your genuine interest in financial markets, problem-solving, or how numbers help businesses grow." },
    { q: "Why should we hire you?", a: "Highlight your relevant skills (Excel, financial analysis, attention to detail), your enthusiasm for learning, and how you can add value to the team." },
    { q: "What are your greatest strengths?", a: "Focus on strengths relevant to finance: analytical thinking, attention to detail, Excel proficiency, problem-solving, or communication skills." },
    { q: "What are your weaknesses?", a: "Be honest but show improvement. Example: 'I sometimes focus too much on details, but I've learned to balance perfectionism with deadlines.'" },
    { q: "Where do you see yourself in 5 years?", a: "Show ambition while being realistic. Example: 'I see myself as a Senior Financial Analyst, having mastered financial modeling and leading projects.'" }
  ];

  const mockQuestions = [
    { q: "Tell me about yourself.", a: "I am a finance graduate with strong analytical skills and a passion for financial analysis. I've completed internships in financial modeling and am proficient in Excel." },
    { q: "Why do you want to work in finance?", a: "I am passionate about how data drives business decisions and want to help companies grow through financial insights." },
    { q: "What is your greatest strength?", a: "My attention to detail and ability to analyze complex financial data quickly and accurately." },
    { q: "What is your greatest weakness?", a: "I sometimes focus too much on details, but I've learned to balance perfectionism with meeting deadlines effectively." }
  ];

  const faqs = [
    { q: "How do I prepare for finance interviews?", a: "Start with understanding the role requirements, practice technical questions, master behavioral questions using STAR method, and take mock interviews." },
    { q: "What are the most common finance interview questions?", a: "Tell me about yourself, why finance, walk me through a DCF, explain working capital, and behavioral questions about teamwork and leadership." },
    { q: "How can I stand out in finance interviews?", a: "Showcase your Excel skills, understand company financials, ask insightful questions, and demonstrate your passion for finance through projects or internships." },
    { q: "How should I answer 'Tell me about yourself'?", a: "Keep it professional and relevant. Structure it as: past (your education/experience), present (what you're doing now), future (why you want this role). Keep it under 2 minutes." }
  ];

  const toggleBehavioralAnswer = (index: number) => {
    setOpenBehavioralAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const sharePage = async (platform: string) => {
    const url = window.location.href;
    const text = "Check out Finlysta's Interview Preparation platform! Master finance interviews with real questions and mock interviews.";
    
    if (platform === "copy") {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    }
    setShowShareOptions(false);
  };

  const playAudio = () => {
    if (typeof window === 'undefined') return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    
    const selectedGuide = mainGuides.find(g => g.shortTitle === selectedAudioGuide);
    const audioText = `Welcome to ${selectedGuide?.title}. This guide covers ${selectedGuide?.badge} to help you ace your finance interview.`;
    
    const utterance = new SpeechSynthesisUtterance(audioText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.7;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    audioRef.current = utterance;
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Finance Interview Preparation | Excel, Accounting & Behavioral | Finlysta</title>
        <meta name="description" content="Master finance interviews with comprehensive preparation guides for Advanced Excel, Accounting Basics, and Behavioral Questions. Practice with real questions and mock interviews." />
        <meta name="keywords" content="excel interview questions, accounting interview questions, behavioral interview questions, finance interview preparation" />
        <meta name="author" content="Finlysta" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://finlysta.com/interview-prep" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        
        {/* Top Navigation Bar - Only Share button remains */}
        <div className="border-b border-slate-200 sticky top-0 z-20 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-slate-900 font-medium">Interview Preparation</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button onClick={() => setShowShareOptions(!showShareOptions)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
                    <Share2 size={18} className="text-gray-700" />
                  </button>
                  {showShareOptions && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-1 min-w-[140px] border border-slate-200 animate-fadeIn z-30">
                      <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 mb-1">
                        <span className="text-sm font-semibold text-slate-500">Share via</span>
                        <button onClick={() => setShowShareOptions(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                          <X size={14} className="text-slate-400" />
                        </button>
                      </div>
                      <button onClick={() => sharePage("copy")} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                        {copiedLink ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}
                        <span className="text-sm text-slate-700">{copiedLink ? "Copied!" : "Copy Link"}</span>
                      </button>
                      <button onClick={() => sharePage("whatsapp")} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.138 3.86C17.95 1.67 15.06.5 12 .5 5.7.5.5 5.7.5 12c0 2.2.7 4.3 2 6.1L.5 23.5l5.5-1.5c1.8 1.1 3.9 1.7 6 1.7 6.3 0 11.5-5.2 11.5-11.5 0-3.1-1.2-6-3.4-8.2zM12 21.5c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.3.9.9-3.2-.2-.4c-1-1.5-1.5-3.3-1.5-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7 0 5.2-4.2 9.4-9.4 9.4z"/></svg>
                        <span className="text-sm text-slate-700">WhatsApp</span>
                      </button>
                      <button onClick={() => sharePage("linkedin")} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                        <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                        <span className="text-sm text-slate-700">LinkedIn</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Interview Modal */}
        {showMockInterview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-scaleIn">
              <div className="flex justify-between items-center p-5 border-b border-slate-200 sticky top-0 bg-white">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Mic size={20} className="text-purple-600" />Mock Interview</h3>
                <button onClick={() => setShowMockInterview(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="p-5">
                {mockQuestionIndex < mockQuestions.length ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">Question {mockQuestionIndex + 1} of {mockQuestions.length}</span>
                        <button onClick={() => setShowAnswer(!showAnswer)} className="text-sm text-purple-600 hover:underline">{showAnswer ? "Hide Answer" : "Show Answer"}</button>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{mockQuestions[mockQuestionIndex].q}</p>
                      {showAnswer && <div className="mt-3 p-4 bg-purple-50 rounded-xl"><p className="text-sm text-slate-700 leading-relaxed">{mockQuestions[mockQuestionIndex].a}</p></div>}
                    </div>
                    <div className="flex justify-between gap-3 mt-6">
                      <button onClick={() => { setMockQuestionIndex(Math.max(0, mockQuestionIndex - 1)); setShowAnswer(false); }} disabled={mockQuestionIndex === 0} className="px-5 py-2.5 border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50">Previous</button>
                      <button onClick={() => { if (mockQuestionIndex + 1 < mockQuestions.length) { setMockQuestionIndex(mockQuestionIndex + 1); setShowAnswer(false); } }} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105">Next Question</button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><Award size={40} className="text-amber-600" /></div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Complete! 🎉</h4>
                    <p className="text-slate-500 mb-5">Great job practicing! You're ready for the real interview.</p>
                    <button onClick={() => { setMockQuestionIndex(0); setShowAnswer(false); }} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105">Start Over</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Audio Mode Banner */}
        {audioMode && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] bg-white rounded-2xl shadow-2xl p-4 min-w-[320px] border border-slate-200 animate-slideUp">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Headphones size={18} className="text-green-600" /></div>
                <div><p className="text-xs text-slate-500">Now Playing</p><p className="text-sm font-semibold text-slate-800">{mainGuides.find(g => g.shortTitle === selectedAudioGuide)?.title || "Interview Prep"}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { stopAudio(); setTimeout(() => playAudio(), 100); }} className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200"><Play size={14} className="text-slate-700" /></button>
                <button onClick={stopAudio} className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200"><Pause size={14} className="text-slate-700" /></button>
                <button onClick={() => setAudioMode(false)} className="text-xs text-slate-400 hover:text-slate-600 ml-2">Exit</button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden py-16 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-slate-700">Ace Your Next Finance Interview</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-5 leading-tight">Finance Interview <br /><span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Preparation for Freshers</span></h1>
            <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto">Master your finance interview with comprehensive guides for Excel, Accounting Basics, and Behavioral Questions.</p>
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search interview questions..." 
                    className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* SECTION 1: INTERVIEW QUESTIONS BY TOPIC */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Interview Questions by Topic</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Choose your topic to start practicing with real interview questions</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {mainGuides.map((guide) => {
                const Icon = guide.icon;
                const isBehavioral = guide.id === 3;
                
                return (
                  <Link
                    key={guide.id}
                    href={guide.href}
                    className={`group relative rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isBehavioral ? 'border-t-4 border-t-indigo-500' : ''
                    }`}
                  >
                    {!isBehavioral && (
                      <div className={`absolute -top-px left-0 right-0 h-1 ${guide.topBorder} rounded-t-2xl`} style={{ zIndex: 20 }} />
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${guide.iconBg}`}>
                          <Icon className={`h-6 w-6 ${guide.iconColor}`} />
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${guide.badgeBg} ${guide.badgeText}`}>
                          {guide.badge}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-bold text-slate-900 leading-tight">
                        {guide.title}
                      </h3>

                      <div className="mt-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {guide.totalTopics} Topics Covered
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {guide.topics.slice(0, 6).map((topic) => (
                            <span
                              key={topic}
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${guide.iconBg} ${guide.iconColor}`}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
                          <Sparkles size={12} className="text-amber-500" />
                          <p className="text-xs font-medium text-slate-700">
                            {guide.benefit}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-500">
                          {guide.id === 1 ? "Excel Interview Guide" : guide.id === 2 ? "Accounting Interview Guide" : "Behavioral Interview Guide"}
                        </span>
                        <span className={`text-sm font-semibold ${guide.ctaColor} transition-transform duration-300 group-hover:translate-x-1`}>
                          Start Learning →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: PRACTICE TOOLS */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Practice Tools</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Interactive tools to help you prepare better</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureCards.map((card, idx) => (
                <button key={idx} onClick={card.onClick} className="group text-left w-full">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="p-6">
                      <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <card.icon size={24} className={card.iconColor} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{card.title}</h3>
                      <p className="text-sm text-slate-600">{card.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-slate-500 group-hover:text-slate-700 transition">
                        <span className="text-sm font-medium">Get Started</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHY STUDENTS USE FINLYSTA */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Why Students Use Finlysta</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Trusted by finance students and freshers for interview preparation</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileQuestion size={28} className="text-green-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Real Interview Questions</h3>
                <p className="text-sm text-slate-500">Questions asked in actual finance interviews</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={28} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Detailed Answers</h3>
                <p className="text-sm text-slate-500">Step-by-step explanations and sample responses</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic size={28} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Mock Interview Practice</h3>
                <p className="text-sm text-slate-500">Practice with real-time mock interviews</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">100% Free Access</h3>
                <p className="text-sm text-slate-500">Complete interview preparation at no cost</p>
              </div>
            </div>
          </div>

          {/* SECTION 4: BEHAVIORAL QUESTIONS PREVIEW */}
          <div className="mb-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 rounded-t-2xl"></div>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3"><Users size={26} className="text-indigo-600" /></div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Behavioral Questions</h2>
              <p className="text-slate-500">Master the STAR method and common behavioral interview questions</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {behavioralQuestionsData.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => toggleBehavioralAnswer(idx)} className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                    <span className="font-medium text-slate-800">{item.q}</span>
                    {openBehavioralAnswers[idx] ? <Minus size={16} className="text-slate-400" /> : <Plus size={16} className="text-slate-400" />}
                  </button>
                  {openBehavioralAnswers[idx] && (<div className="px-5 pb-4 pt-2 border-t border-slate-100"><p className="text-slate-600 text-sm leading-relaxed">{item.a}</p></div>)}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/interview-prep/behavioural-questions" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-5 py-2 rounded-full shadow-sm hover:shadow transition">Practice all behavioral questions <ArrowRight size={14} /></Link>
            </div>
          </div>

          {/* SECTION 5: ROLE-BASED INTERVIEW PREP */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                Role-Based Interview Prep
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                6 Upcoming Guides for Finance Careers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {comingSoonGuides.map((guide, idx) => (
                <div
                  key={idx}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${guide.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <guide.icon size={22} className={guide.iconColor} />
                    </div>

                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                      Coming Soon
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {guide.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {guide.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Interview Guide
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      Coming Soon →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

         {/* SECTION 6: FINANCE INTERVIEW PREPARATION */}
<div className="mb-16 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <div className="p-8 md:p-10">

    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
      <Sparkles size={14} className="text-blue-600" />
      <span className="text-sm font-semibold text-blue-700">
        Finance Interview Preparation
      </span>
    </div>

    <h2 className="mt-5 text-3xl font-bold text-slate-900 max-w-3xl">
      Everything You Need to Prepare for Finance Interviews
    </h2>

    <p className="mt-4 text-slate-600 leading-relaxed max-w-4xl">
      Finance interviews often assess technical knowledge, problem-solving skills,
      communication abilities, and practical understanding of accounting and Excel.
      Whether you're preparing for a Finance Analyst, Accounts Executive, FP&A,
      Credit Analyst, or Finance Internship role, structured preparation can
      significantly improve your confidence and performance.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-2">

      <div className="rounded-2xl bg-white p-5 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-2">
          What You'll Learn
        </h3>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>✓ Advanced Excel concepts and shortcuts</li>
          <li>✓ Accounting fundamentals and financial statements</li>
          <li>✓ Behavioral and HR interview strategies</li>
          <li>✓ Common finance interview questions and answers</li>
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-5 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-2">
          Ideal For
        </h3>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>✓ Finance Students</li>
          <li>✓ Accounting Freshers</li>
          <li>✓ Finance Intern Applicants</li>
          <li>✓ Early-Career Finance Professionals</li>
        </ul>
      </div>

    </div>

  </div>
</div>

          {/* SECTION 7: FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => toggleFaq(idx)} className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-800">{faq.q}</span>
                    {activeFaq === idx ? <Minus size={18} className="text-slate-400" /> : <Plus size={18} className="text-slate-400" />}
                  </button>
                  {activeFaq === idx && (<div className="px-5 pb-4 pt-2 border-t border-slate-100"><p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p></div>)}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8: FINAL CTA */}
          <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />
            <div className="relative px-8 py-12 md:px-12 md:py-14 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white text-sm font-medium backdrop-blur-sm mb-5">
                <Sparkles size={14} />
                Interview Success Starts Here
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Ace Your Finance Interview?
              </h2>

              <p className="max-w-2xl mx-auto text-blue-100 text-lg mb-8">
                Practice real interview questions, improve your confidence, and get
                interview-ready with structured finance preparation guides.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowMockInterview(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-600 hover:scale-105 transition"
                >
                  <Mic size={18} />
                  Start Mock Interview
                </button>

                <button
                  onClick={() => window.location.href = "/interview-prep/quiz"}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
                >
                  <FileQuestion size={18} />
                  Take a Quiz
                </button>

                <Link
                  href="/interview-prep/advanced-excel-interview-questions"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
                >
                  <Calculator size={18} />
                  Explore Interview Guides
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION 9: QUICK LINKS */}
          <div className="border-t border-slate-200 pt-10">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Explore Finlysta
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Discover jobs, internships, learning resources, and interview preparation.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/jobs"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition"
              >
                Finance Jobs
              </Link>
              <Link
                href="/internships"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition"
              >
                Finance Internships
              </Link>
              <Link
                href="/learning-hub"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition"
              >
                Learning Hub
              </Link>
              <Link
                href="/blogs"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition"
              >
                Resume Templates
              </Link>
              <Link
                href="/"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </>
  );
}