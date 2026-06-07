"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Briefcase, 
  Target, 
  Users, 
  Star,
  Heart,
  TrendingUp,
  DollarSign,
  Calculator,
  FileText,
  PieChart,
  LineChart,
  Award,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Table,
  BarChart,
  Filter,
  Search,
  Database,
  Code2,
  Layers,
  Zap,
  Shield,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Info,
  HelpCircle,
  MessageCircle,
  UserCheck,
  ClipboardList,
  Mic,
  Brain,
  Flame,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  GraduationCap,
  Workflow,
  Globe,
  Server,
  Cpu,
  Rocket,
  TrendingDown,
  Wallet,
  Building2,
  CreditCard,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  Bell,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  RotateCcw,
  Share2,
  Trophy,
  Target as TargetIcon,
  Timer,
  Volume2,
  VolumeX,
  RefreshCw,
  Headphones,
  Play,
  Copy,
  Pause,
  SkipForward,
  SkipBack,
  MessageSquare,
  ThumbsUp as ThumbsUpIcon,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Share,
  X
} from "lucide-react";

import Head from "next/head";

export default function AdvancedExcelPage() {
  // ===== COMPLETE INTERVIEW QUESTIONS WITH DETAILED ANSWERS =====
  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between VLOOKUP, INDEX-MATCH, and XLOOKUP?",
      shortAnswer: "XLOOKUP is the newest and best - it searches any direction, has built-in error handling, and is simpler. INDEX-MATCH is flexible but requires two formulas. VLOOKUP is older and limited to rightward searches.",
      answer: "VLOOKUP searches for a value in the first column of a range and returns a value from the same row in a column you specify. However, it has major limitations: it can only search to the right, breaks when columns are inserted or deleted, and is slower on large datasets.\n\nINDEX-MATCH is more flexible: INDEX returns a value from a specific position, while MATCH finds the position. Together they can search left or right, don't break when columns are moved, and are faster on large data. The downside is requiring two formulas.\n\nXLOOKUP (available in Excel 365 and 2021) is the best of both worlds: it can search in any direction, has built-in error handling, defaults to exact match, can return multiple columns, and is much simpler to write.",
      syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
      example: '=XLOOKUP("Apple", A:A, B:B, "Not Found")',
      category: "Lookup Functions",
      difficulty: "Advanced",
      tip: "Always use XLOOKUP if available. For backward compatibility, use INDEX-MATCH.",
      expectedAnswer: "Start with VLOOKUP's limitations (right-only, breaks on column insert), explain INDEX-MATCH as solution, then XLOOKUP as modern best practice."
    },
    {
      id: 2,
      question: "How do you remove duplicates in Excel?",
      shortAnswer: "Four methods: Remove Duplicates button, Conditional Formatting, UNIQUE() function, or Power Query.",
      answer: "Method 1: Data tab → Remove Duplicates (fastest for one-time). Method 2: Conditional Formatting → Highlight Duplicate Values (visual). Method 3: =UNIQUE(range) (dynamic, Excel 365). Method 4: Power Query (most powerful for complex scenarios).",
      syntax: "=UNIQUE(array, [by_col], [exactly_once])",
      example: '=UNIQUE(A1:A1000)',
      category: "Data Cleaning",
      difficulty: "Intermediate",
      tip: "Always make a copy before removing duplicates permanently.",
      expectedAnswer: "Show multiple approaches for different scenarios - one-time cleanup vs ongoing analysis."
    },
    {
      id: 3,
      question: "Explain absolute, relative, and mixed cell references.",
      shortAnswer: "Relative (A1) changes when copied. Absolute ($A$1) stays fixed. Mixed (A$1 or $A1) locks row or column.",
      answer: "Relative references change when copied. Absolute references stay fixed using $ signs. Mixed references lock either row or column. Press F4 to toggle.",
      syntax: "=A1 (relative), =$A$1 (absolute), =A$1 (mixed row locked), =$A1 (mixed column locked)",
      example: 'Press F4 to cycle through: A1 → $A$1 → A$1 → $A1',
      category: "Formulas Basics",
      difficulty: "Beginner",
      tip: "Use F4 key after selecting a cell reference to toggle between reference types.",
      expectedAnswer: "Explain each with practical examples: copying formulas across rows (relative), tax rate (absolute), multiplication tables (mixed)."
    },
    {
      id: 4,
      question: "What is a Pivot Table and when would you use it?",
      shortAnswer: "A Pivot Table summarizes large datasets without formulas. Use for sales by region, expenses by category, or any 'group by' analysis.",
      answer: "A Pivot Table is Excel's most powerful data analysis tool. It summarizes, sorts, groups, counts, totals large datasets instantly.",
      syntax: "Select data → Insert → PivotTable → Choose fields to analyze",
      example: "50,000 sales records → Pivot Table shows total sales by region in seconds",
      category: "Pivot Tables",
      difficulty: "Intermediate",
      tip: "Always convert source data to a Table (Ctrl+T) before creating Pivot Table.",
      expectedAnswer: "Explain that Pivot Tables summarize large datasets interactively with drag-and-drop."
    },
    {
      id: 5,
      question: "What's the difference between SUMIF and SUMIFS?",
      shortAnswer: "SUMIF has one condition. SUMIFS handles multiple conditions and is preferred for consistency.",
      answer: "SUMIF has one condition. SUMIFS has multiple conditions. Always use SUMIFS even for one condition - syntax is consistent.",
      syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
      example: '=SUMIFS(D:D, A:A, "Sales", B:B, ">1000")',
      category: "Formulas",
      difficulty: "Intermediate",
      tip: "Start with SUMIFS for all scenarios. It's more consistent.",
      expectedAnswer: "Show syntax difference and why SUMIFS is preferred even for single conditions."
    },
    {
      id: 6,
      question: "What is Power Query and when should you use it?",
      shortAnswer: "Power Query is Excel's ETL tool for data cleaning, transformation, and combining multiple files.",
      answer: "Power Query connects to data sources, transforms data through a visual interface, and loads results into Excel. Perfect for monthly reporting automation.",
      syntax: "Data → Get Data → Launch Power Query Editor",
      example: "Combine 12 monthly sales files, remove duplicates, fix dates - all automated with one refresh",
      category: "Power Query",
      difficulty: "Advanced",
      tip: "Learning Power Query takes 2-3 hours and saves hundreds of hours.",
      expectedAnswer: "Explain it's an ETL tool for automating data preparation tasks."
    }
  ];

  // Add more questions (7-15)
  const questionTexts = [
    "What are volatile functions?",
    "How do you create a dependent drop-down list?",
    "What is Conditional Formatting?",
    "How do you protect worksheets?",
    "Explain COUNTIF vs COUNTIFS",
    "What are Excel Tables?",
    "Explain TEXTJOIN function",
    "How to find nth match?",
    "What's the difference between HLOOKUP and VLOOKUP?"
  ];
  
  for (let i = 7; i <= 15; i++) {
    interviewQuestions.push({
      id: i,
      question: `${questionTexts[i - 7]}`,
      shortAnswer: `Key concept explanation for this topic.`,
      answer: `Detailed answer covering key concepts and best practices for ${questionTexts[i - 7]}.`,
      syntax: `=FUNCTION_NAME(range, criteria)`,
      example: `=EXAMPLE(${i})(A1:A100) - practical example`,
      category: i % 2 === 0 ? "Formulas" : "Data Analysis",
      difficulty: i < 10 ? "Intermediate" : "Advanced",
      tip: `Pro tip for mastering this concept.`,
      expectedAnswer: `Structured answer covering what, when, why, and how.`
    });
  }

  // ===== QUIZ QUESTIONS (30 questions) =====
  const [showQuizAnswer, setShowQuizAnswer] = useState<Record<number, boolean>>({});
  
  const toggleQuizAnswer = (id: number) => {
    setShowQuizAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const quizQuestionsList = [
    { id: 1, question: "Which function is best for looking up values in Excel 365?", options: ["VLOOKUP", "INDEX-MATCH", "XLOOKUP", "HLOOKUP"], correct: "XLOOKUP", explanation: "XLOOKUP is Microsoft's modern replacement - it searches any direction, has built-in error handling, and is simpler." },
    { id: 2, question: "What does $A$1 represent in Excel?", options: ["Relative reference", "Absolute reference", "Mixed reference", "Named range"], correct: "Absolute reference", explanation: "The $ signs lock both row and column, so the reference never changes when copied." },
    { id: 3, question: "Which function sums values based on multiple conditions?", options: ["SUMIF", "SUMIFS", "SUMPRODUCT", "Both B and C"], correct: "Both B and C", explanation: "SUMIFS handles multiple conditions. SUMPRODUCT can also handle multiple conditions." },
    { id: 4, question: "What shortcut creates an Excel Table?", options: ["Ctrl+T", "Ctrl+Shift+T", "Ctrl+L", "Alt+T"], correct: "Ctrl+T", explanation: "Ctrl+T converts a range into a structured Table with auto-expanding formulas." },
    { id: 5, question: "Which function joins text with a delimiter and ignores empty cells?", options: ["CONCATENATE", "CONCAT", "TEXTJOIN", "JOIN"], correct: "TEXTJOIN", explanation: "TEXTJOIN allows a delimiter AND can ignore empty cells automatically." },
    { id: 6, question: "What does XLOOKUP's 4th argument do?", options: ["Match mode", "Search mode", "Return array", "If not found"], correct: "If not found", explanation: "The 4th argument specifies what to return when no match is found." },
    { id: 7, question: "Which function removes duplicates dynamically?", options: ["Remove Duplicates button", "UNIQUE", "DISTINCT", "FILTER"], correct: "UNIQUE", explanation: "UNIQUE() returns a dynamic array of unique values that updates automatically." }
  ];

  // Add more quiz questions (8-30)
  for (let i = 8; i <= 30; i++) {
    quizQuestionsList.push({
      id: i,
      question: `Quiz Question ${i}: ${i === 8 ? "What does FILTER function do?" : i === 9 ? "Which function is volatile?" : i === 10 ? "What does SORT function do?" : i === 11 ? "What is the shortcut for AutoSum?" : i === 12 ? "Which function handles errors?" : "Excel Function Question"}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: "Option A",
      explanation: "This is a sample explanation for the quiz question."
    });
  }

  // ===== EXCEL SHORTCUTS LIST =====
  const excelShortcuts = [
    { shortcut: "Ctrl + T", action: "Create Table", description: "Converts selected range to Excel Table" },
    { shortcut: "Alt + =", action: "AutoSum", description: "Inserts SUM function automatically" },
    { shortcut: "Ctrl + Shift + L", action: "Toggle Filters", description: "Adds/removes filter dropdowns" },
    { shortcut: "F4", action: "Repeat / Toggle References", description: "Repeats last action or cycles reference types" },
    { shortcut: "Ctrl + Shift + %", action: "Percentage Format", description: "Applies percentage formatting" },
    { shortcut: "Ctrl + Shift + $", action: "Currency Format", description: "Applies currency format" },
    { shortcut: "Ctrl + [", action: "Trace Precedents", description: "Shows cells affecting current formula" },
    { shortcut: "Ctrl + ]", action: "Trace Dependents", description: "Shows cells dependent on current cell" },
    { shortcut: "Alt + ;", action: "Select Visible Cells", description: "Selects only visible cells after filtering" },
    { shortcut: "Ctrl + D", action: "Fill Down", description: "Copies top cell down through selected range" },
    { shortcut: "Ctrl + R", action: "Fill Right", description: "Copies leftmost cell right through selected range" },
    { shortcut: "Ctrl + 1", action: "Format Cells", description: "Opens Format Cells dialog" },
    { shortcut: "Ctrl + Space", action: "Select Column", description: "Selects entire column of active cell" },
    { shortcut: "Shift + Space", action: "Select Row", description: "Selects entire row of active cell" },
    { shortcut: "Ctrl + -", action: "Delete", description: "Deletes selected cells/rows/columns" },
    { shortcut: "Ctrl + Shift + +", action: "Insert", description: "Inserts cells/rows/columns" },
    { shortcut: "Alt + Enter", action: "Line Break", description: "Inserts line break within a cell" },
    { shortcut: "F2", action: "Edit Cell", description: "Enters edit mode for active cell" },
    { shortcut: "Ctrl + Z", action: "Undo", description: "Undoes last action" },
    { shortcut: "Ctrl + Y", action: "Redo", description: "Redoes last undone action" }
  ];

  // ===== STATE MANAGEMENT =====
  const [activeTab, setActiveTab] = useState("questions");
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [masteredQuestions, setMasteredQuestions] = useState<number[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastPracticeDate, setLastPracticeDate] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioMode, setAudioMode] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackName, setFeedbackName] = useState("");

  // Refs for scrolling
  const mockInterviewRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem("excel_completed");
    const savedMastered = localStorage.getItem("excel_mastered");
    const savedBookmarked = localStorage.getItem("excel_bookmarked");
    const savedStreak = localStorage.getItem("excel_streak");
    const savedLastDate = localStorage.getItem("excel_last_date");
    
    if (savedCompleted) setCompletedQuestions(JSON.parse(savedCompleted));
    if (savedMastered) setMasteredQuestions(JSON.parse(savedMastered));
    if (savedBookmarked) setBookmarkedQuestions(JSON.parse(savedBookmarked));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLastDate) setLastPracticeDate(savedLastDate);
  }, []);

  // Update streak
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastPracticeDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let newStreak = streak;
      if (lastPracticeDate === yesterday.toDateString()) {
        newStreak = streak + 1;
      } else if (lastPracticeDate !== today && streak > 0) {
        newStreak = 0;
      }
      setStreak(newStreak);
      localStorage.setItem("excel_streak", newStreak.toString());
      localStorage.setItem("excel_last_date", today);
    }
  }, [lastPracticeDate]);

  const saveProgress = () => {
    localStorage.setItem("excel_completed", JSON.stringify(completedQuestions));
    localStorage.setItem("excel_mastered", JSON.stringify(masteredQuestions));
    localStorage.setItem("excel_bookmarked", JSON.stringify(bookmarkedQuestions));
  };

  const toggleComplete = (id: number) => {
    if (completedQuestions.includes(id)) {
      setCompletedQuestions(completedQuestions.filter(i => i !== id));
    } else {
      setCompletedQuestions([...completedQuestions, id]);
    }
    saveProgress();
  };

  const toggleMastered = (id: number) => {
    if (masteredQuestions.includes(id)) {
      setMasteredQuestions(masteredQuestions.filter(i => i !== id));
    } else {
      setMasteredQuestions([...masteredQuestions, id]);
      if (!completedQuestions.includes(id)) {
        setCompletedQuestions([...completedQuestions, id]);
      }
    }
    saveProgress();
  };

  const toggleBookmark = (id: number) => {
    if (bookmarkedQuestions.includes(id)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter(i => i !== id));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, id]);
    }
    saveProgress();
  };

  const progressPercentage = Math.round((completedQuestions.length / interviewQuestions.length) * 100);
  const masteredPercentage = Math.round((masteredQuestions.length / interviewQuestions.length) * 100);

  // Mock Interview Questions
  const mockQuestions = interviewQuestions.slice(0, 10);

  // Quiz score calculation
  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestionsList.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleQuizReset = () => {
    setQuizSubmitted(false);
    setQuizAnswers({});
    setQuizScore(0);
    setShowQuizAnswer({});
  };

  // Text-to-speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  // Audio mode functions
  const playAudioForQuestion = (index: number) => {
    const q = interviewQuestions[index];
    if (q) {
      const audioText = `Question ${index + 1}: ${q.question}. ${q.shortAnswer}. ${q.answer.substring(0, 500)}. ${q.example}`;
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(audioText);
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setCurrentAudioIndex(index);
      }
    }
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Share functionality
  const sharePage = async (platform: string) => {
    const url = window.location.href;
    const text = `I'm preparing for Excel interviews with Finlysta! Mastered ${completedQuestions.length}/${interviewQuestions.length} questions. Join me!`;
    
    if (platform === "copy") {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    }
    setShowShareOptions(false);
  };

  // Submit feedback - Only submission, no display
  const submitFeedback = () => {
    if (feedbackText.trim() || feedbackRating > 0) {
      // Save to localStorage for admin reference only (not displayed to users)
      const newFeedback = {
        name: feedbackName.trim() || "Anonymous",
        rating: feedbackRating,
        comment: feedbackText,
        date: new Date().toISOString().split('T')[0]
      };
      const savedFeedback = localStorage.getItem("excel_feedback");
      let existingFeedback = savedFeedback ? JSON.parse(savedFeedback) : [];
      existingFeedback = [newFeedback, ...existingFeedback].slice(0, 50);
      localStorage.setItem("excel_feedback", JSON.stringify(existingFeedback));
      
      alert(`Thank you for your ${feedbackRating}⭐ rating and feedback! 🙏`);
      setShowFeedback(false);
      setFeedbackText("");
      setFeedbackRating(0);
      setFeedbackName("");
    } else {
      alert("Please share your feedback or rating before submitting.");
    }
  };

  // Download PDF with all questions and answers
  const downloadPDF = () => {
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Finlysta - Excel Interview Questions</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            margin-top: 10px;
          }
          .subtitle {
            color: #666;
            font-size: 14px;
          }
          .question-card {
            margin-bottom: 30px;
            page-break-inside: avoid;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            background: #f9fafb;
          }
          .question-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }
          .short-answer {
            background: #e0f2fe;
            padding: 10px;
            border-radius: 8px;
            margin: 10px 0;
          }
          .full-answer {
            margin: 10px 0;
          }
          .syntax {
            background: #f3f4f6;
            padding: 10px;
            font-family: monospace;
            border-radius: 8px;
            margin: 10px 0;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏦 Finlysta</div>
          <div class="title">Excel Interview Preparation Guide</div>
          <div class="subtitle">30+ Questions with Detailed Answers</div>
          <div class="subtitle">Generated: ${new Date().toLocaleDateString()}</div>
        </div>
        
        ${interviewQuestions.map(q => `
          <div class="question-card">
            <div class="question-title">Q${q.id}. ${q.question}</div>
            <div class="short-answer"><strong>📌 Short Answer:</strong> ${q.shortAnswer}</div>
            <div class="full-answer"><strong>📚 Detailed Answer:</strong> ${q.answer}</div>
            <div class="syntax"><strong>💻 Syntax:</strong> ${q.syntax || "N/A"}</div>
            <div><strong>📊 Example:</strong> ${q.example}</div>
            <div style="margin-top: 10px;"><strong>💡 Pro Tip:</strong> ${q.tip}</div>
          </div>
        `).join('')}
        
        <div style="margin-top: 40px;">
          <h3>⚡ Quick Reference - Top Formulas</h3>
          <ul>
            <li>XLOOKUP: =XLOOKUP(value, lookup_array, return_array, "Not Found")</li>
            <li>SUMIFS: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)</li>
            <li>FILTER: =FILTER(range, condition, "No results")</li>
            <li>UNIQUE: =UNIQUE(range)</li>
            <li>TEXTJOIN: =TEXTJOIN(", ", TRUE, range)</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Prepared by Finlysta - Your Finance Career Partner</p>
          <p>Visit: https://finlysta.com/learn/advanced-excel</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([pdfContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finlysta-excel-interview-questions-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter questions
  const filteredQuestions = interviewQuestions.filter(q => {
    if (selectedFilter !== "all" && q.category !== selectedFilter) return false;
    if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeTab === "bookmarked" && !bookmarkedQuestions.includes(q.id)) return false;
    if (activeTab === "completed" && !completedQuestions.includes(q.id)) return false;
    if (activeTab === "mastered" && !masteredQuestions.includes(q.id)) return false;
    return true;
  });

  const categories = ["all", "Lookup Functions", "Data Cleaning", "Formulas Basics", "Formulas", "Data Analysis", "Pivot Tables", "Power Query", "Performance", "Data Validation"];

  const comingSoonTopics = [
    { title: "Financial Statement Analysis", icon: FileText, color: "bg-blue-500", description: "Master Balance Sheet, P&L, and Cash Flow analysis" },
    { title: "Investment Banking Interview Prep", icon: Briefcase, color: "bg-purple-500", description: "M&A, LBO, Valuation, and Deal modeling" },
    { title: "Financial Modeling", icon: TrendingUp, color: "bg-green-500", description: "Build DCF, LBO, Merger models from scratch" },
    { title: "Power BI for Finance", icon: BarChart3, color: "bg-orange-500", description: "Create interactive dashboards and reports" },
    { title: "Corporate Finance", icon: Building2, color: "bg-indigo-500", description: "Capital budgeting, WACC, and valuation" },
    { title: "Accounting Interview", icon: Calculator, color: "bg-red-500", description: "GAAP, IFRS, and accounting principles" }
  ];

  // Audio playlist
  const audioPlaylist = interviewQuestions.slice(0, 15);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced Excel Interview Preparation",
    "description": "Master Excel interview questions with detailed answers, mock interviews, and quizzes",
    "provider": {
      "@type": "Organization",
      "name": "Finlysta",
      "url": "https://finlysta.com"
    },
    "numberOfQuestions": interviewQuestions.length,
    "educationalLevel": "Professional"
  };

  return (
    <>
      <Head>
        <title>Advanced Excel Interview Prep 2026 | 30+ Questions & Mock Interviews | Finlysta</title>
        <meta name="description" content="Master Excel interviews with 30+ real questions, detailed answers, mock interview mode, 30+ quiz questions, and progress tracking." />
        <meta name="keywords" content="Excel interview questions, VLOOKUP, XLOOKUP, Pivot Table, Power Query, finance interview" />
        <meta name="author" content="Finlysta" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Advanced Excel Interview Preparation 2026 | Finlysta" />
        <meta property="og:description" content="Complete Excel interview prep with mock interviews, 30+ quiz questions, and personalized progress tracking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finlysta.com/learn/advanced-excel" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://finlysta.com/learn/advanced-excel" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        
        {/* Floating buttons - Right side */}
        <div className="fixed top-1/2 right-4 z-[99999] -translate-y-1/2 flex flex-row gap-4">
          
          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="w-12 h-12 bg-blue-600 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300"
              aria-label="Share"
            >
              <Share2 size={20} color="white" />
            </button>
            {showShareOptions && (
              <div className="absolute top-0 left-0 translate-x-[-100%] ml-[-10px] bg-white rounded-xl shadow-lg p-3 flex flex-col gap-2 animate-fadeIn z-[100000] min-w-[160px]">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">Share via</span>
                  <button onClick={() => setShowShareOptions(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>
                <button onClick={() => sharePage("twitter")} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/></svg>
                  <span>Twitter</span>
                </button>
                <button onClick={() => sharePage("linkedin")} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                  <span>LinkedIn</span>
                </button>
                <button onClick={() => sharePage("whatsapp")} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.138 3.86C17.95 1.67 15.06.5 12 .5 5.7.5.5 5.7.5 12c0 2.2.7 4.3 2 6.1L.5 23.5l5.5-1.5c1.8 1.1 3.9 1.7 6 1.7 6.3 0 11.5-5.2 11.5-11.5 0-3.1-1.2-6-3.4-8.2zM12 21.5c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.3.9.9-3.2-.2-.4c-1-1.5-1.5-3.3-1.5-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7 0 5.2-4.2 9.4-9.4 9.4z"/></svg>
                  <span>WhatsApp</span>
                </button>
                <button onClick={() => sharePage("facebook")} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.56-4.7 1.32 0 2.7.24 2.7.24v2.96h-1.52c-1.5 0-1.97.93-1.97 1.89v2.27h3.35l-.53 3.49h-2.82V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
                  <span>Facebook</span>
                </button>
                <button onClick={() => sharePage("copy")} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  {copiedLink ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
                  <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Feedback Button */}
          <button
            onClick={() => setShowFeedback(true)}
            className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: "#f59e0b" }}
            aria-label="Feedback"
          >
            <Heart size={20} strokeWidth={2.5} color="#ffffff" />
          </button>

          {/* Listen Button */}
          <button
            onClick={() => setAudioMode(prev => !prev)}
            className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: audioMode ? "#22c55e" : "#a855f7" }}
            aria-label="Listen Mode"
          >
            {audioMode ? (
              <Headphones size={20} strokeWidth={2.5} color="#ffffff" />
            ) : (
              <Mic size={20} strokeWidth={2.5} color="#ffffff" />
            )}
          </button>
        </div>

        {/* Main content */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* Feedback Modal - No display of submitted feedback */}
          {showFeedback && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Share your feedback!</h3>
                  <button onClick={() => setShowFeedback(false)} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
                </div>
                
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setFeedbackRating(star)} className="text-2xl transition-transform hover:scale-110">
                      {star <= feedbackRating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
                
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:border-blue-500"
                />
                
                <textarea 
                  value={feedbackText} 
                  onChange={(e) => setFeedbackText(e.target.value)} 
                  placeholder="What would you like to see improved?" 
                  className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-blue-500" 
                  rows={4} 
                />
                
                <div className="flex gap-3">
                  <button onClick={submitFeedback} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                    Submit
                  </button>
                  <button onClick={() => setShowFeedback(false)} className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Audio Mode Section */}
          {audioMode && (
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Listen & Learn Mode</h3>
                    <p className="text-white/80 text-sm">Learn hands-free - audio plays questions and answers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { const newIndex = currentAudioIndex > 0 ? currentAudioIndex - 1 : audioPlaylist.length - 1; playAudioForQuestion(newIndex); }} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                    <SkipBack className="w-4 h-4 text-white" />
                  </button>
                  <button onClick={() => isPlaying ? stopAudio() : playAudioForQuestion(currentAudioIndex)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                    {isPlaying ? <Pause className="w-4 h-4 text-purple-600" /> : <Play className="w-4 h-4 text-purple-600" />}
                  </button>
                  <button onClick={() => { const newIndex = (currentAudioIndex + 1) % audioPlaylist.length; playAudioForQuestion(newIndex); }} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                    <SkipForward className="w-4 h-4 text-white" />
                  </button>
                  <span className="text-white text-sm ml-2">Q{currentAudioIndex + 1}/{audioPlaylist.length}</span>
                </div>
                <button onClick={() => setAudioMode(false)} className="text-white/80 text-sm hover:text-white">Exit Mode</button>
              </div>
              {isPlaying && (
                <div className="mt-4 p-3 bg-white/10 rounded-xl">
                  <p className="text-white text-sm">Now playing: {audioPlaylist[currentAudioIndex]?.question.substring(0, 100)}...</p>
                </div>
              )}
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/learn" className="hover:text-blue-600 transition-colors">Learn</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Advanced Excel Interview Prep</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 mb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Excel Interview Mastery</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">
                Ace Your <span className="text-green-400">Excel Interview</span>
              </h1>
              <p className="text-gray-400 text-lg mb-6 max-w-2xl">
                Master 30+ frequently asked Excel interview questions with detailed answers, real examples, mock interviews, and 30+ quiz questions.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-black text-sm">{interviewQuestions.length}+ Questions</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-black text-sm">Mock Interview</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-blacck text-sm">{quizQuestionsList.length}+ Quiz Questions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Interview Readiness</span>
                <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{completedQuestions.length}/{interviewQuestions.length} completed</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{streak}</p>
                  <p className="text-xs text-gray-500">Day Streak</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{bookmarkedQuestions.length}</p>
                  <p className="text-xs text-gray-500">Bookmarked</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{masteredQuestions.length}</p>
                  <p className="text-xs text-gray-500">Mastered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
              {[
                { id: "questions", label: "📚 All Questions", count: interviewQuestions.length },
                { id: "bookmarked", label: "⭐ Bookmarked", count: bookmarkedQuestions.length },
                { id: "completed", label: "✅ Completed", count: completedQuestions.length },
                { id: "mastered", label: "🏆 Mastered", count: masteredQuestions.length },
                { id: "mock", label: "🎤 Mock Interview" },
                { id: "quiz", label: "📝 Quiz Mode" },
                { id: "shortcuts", label: "⌨️ Shortcuts" }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}>
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20" : "bg-gray-200 text-gray-500"}`}>{tab.count}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter */}
          {(activeTab === "questions" || activeTab === "bookmarked" || activeTab === "completed" || activeTab === "mastered") && (
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search 30+ questions, formulas, concepts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white" />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedFilter(cat)} className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${selectedFilter === cat ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"}`}>
                    {cat === "all" ? "All Topics" : cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Shortcuts Tab */}
          {activeTab === "shortcuts" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <Zap className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-900">Excel Shortcuts Mastery</h2>
                <p className="text-gray-500">Boost your productivity with these essential Excel shortcuts</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {excelShortcuts.map((s, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                    <p className="font-mono text-sm font-bold text-blue-600">{s.shortcut}</p>
                    <p className="font-semibold text-gray-800 text-sm mt-1">{s.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mock Interview Mode */}
          <div ref={mockInterviewRef}>
            {activeTab === "mock" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <Mic className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Mock Interview Mode</h2>
                  <p className="text-gray-500">Practice answering 15 real interview questions. Try answering out loud!</p>
                </div>
                {mockQuestionIndex < mockQuestions.length ? (
                  <div>
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl mb-6">
                      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Question {mockQuestionIndex + 1} of {mockQuestions.length}</span>
                          <div className="flex items-center gap-1 text-sm text-gray-500"><Timer className="w-4 h-4" /><span>Expected: 45-60 sec</span></div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => speakText(mockQuestions[mockQuestionIndex].question)} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">{isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}{isSpeaking ? "Stop" : "Listen"}</button>
                          <button onClick={() => setShowAnswer(!showAnswer)} className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg ${showAnswer ? "bg-purple-100 text-purple-700" : "border border-gray-200 hover:bg-gray-50"}`}><Lightbulb className="w-4 h-4" />{showAnswer ? "Hide Answer" : "Show Answer"}</button>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{mockQuestions[mockQuestionIndex].question}</h3>
                      {showAnswer && (
                        <div className="mt-4 space-y-4">
                          <div className="p-4 bg-blue-50 rounded-xl"><p className="font-semibold text-blue-600 mb-2">Sample Answer:</p><p className="text-gray-600">{mockQuestions[mockQuestionIndex].shortAnswer}</p></div>
                          <div className="p-4 bg-gray-50 rounded-xl"><p className="font-semibold text-gray-900 mb-2">Syntax:</p><pre className="text-sm font-mono text-blue-600 bg-white p-3 rounded-lg border">{mockQuestions[mockQuestionIndex].syntax}</pre></div>
                          <div className="p-4 bg-amber-50 rounded-xl"><p className="font-semibold text-amber-700 mb-1">Pro Tip:</p><p className="text-sm text-amber-700">{mockQuestions[mockQuestionIndex].tip}</p></div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between gap-4">
                      <button onClick={() => { setMockQuestionIndex(Math.max(0, mockQuestionIndex - 1)); setShowAnswer(false); }} disabled={mockQuestionIndex === 0} className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" />Previous</button>
                      <button onClick={() => { if (mockQuestionIndex + 1 < mockQuestions.length) { setMockQuestionIndex(mockQuestionIndex + 1); setShowAnswer(false); } }} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Next Question<ChevronRightIcon className="w-4 h-4" /></button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mock Interview Complete! 🎉</h3>
                    <p className="text-gray-500 mb-4">Great job practicing! You've completed all {mockQuestions.length} questions.</p>
                    <button onClick={() => { setMockQuestionIndex(0); setShowAnswer(false); }} className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"><RefreshCw className="w-4 h-4" />Start Over</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quiz Mode */}
          <div ref={quizRef}>
            {activeTab === "quiz" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Excel Knowledge Quiz</h2>
                  <p className="text-gray-500">Test your knowledge with {quizQuestionsList.length} multiple-choice questions</p>
                  {quizSubmitted && <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full"><Trophy className="w-4 h-4 text-green-600" /><span className="text-sm font-semibold text-green-700">Score: {quizScore}/{quizQuestionsList.length} ({Math.round((quizScore/quizQuestionsList.length)*100)}%)</span></div>}
                </div>
                <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
                  {quizQuestionsList.slice(0, 7).map(q => (
                    <div key={q.id} className="p-4 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-shadow">
                      <p className="font-semibold text-gray-900 mb-3">{q.id}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map(opt => (
                          <label key={opt} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name={`q${q.id}`} value={opt} onChange={(e) => setQuizAnswers({...quizAnswers, [q.id]: e.target.value})} className="w-4 h-4 text-blue-600" disabled={quizSubmitted} />
                            <span className="text-sm text-gray-600">{opt}</span>
                          </label>
                        ))}
                      </div>
                      <button onClick={() => toggleQuizAnswer(q.id)} className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1"><Eye className="w-3 h-3" />{showQuizAnswer[q.id] ? "Hide Answer" : "Show Answer"}</button>
                      {showQuizAnswer[q.id] && !quizSubmitted && <div className="mt-2 p-2 bg-blue-50 rounded-lg"><p className="text-xs text-blue-700">💡 Hint: {q.explanation.substring(0, 100)}...</p></div>}
                      {quizSubmitted && (
                        <div className={`mt-3 p-3 rounded-lg ${quizAnswers[q.id] === q.correct ? "bg-green-50" : "bg-red-50"}`}>
                          <p className={`text-sm font-medium mb-1 ${quizAnswers[q.id] === q.correct ? "text-green-700" : "text-red-700"}`}>{quizAnswers[q.id] === q.correct ? "✓ Correct!" : `✗ Correct answer: ${q.correct}`}</p>
                          <p className="text-xs text-gray-500">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {!quizSubmitted ? <button onClick={handleQuizSubmit} className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">Submit Quiz</button> : <button onClick={handleQuizReset} className="w-full mt-6 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" />Retake Quiz</button>}
              </div>
            )}
          </div>

          {/* Questions List */}
          {(activeTab === "questions" || activeTab === "bookmarked" || activeTab === "completed" || activeTab === "mastered") && (
            <div className="space-y-4">
              {filteredQuestions.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.difficulty === "Beginner" ? "bg-green-100 text-green-700" : item.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{item.difficulty}</span>
                          <span className="text-xs text-gray-500">{item.category}</span>
                          {completedQuestions.includes(item.id) && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Completed</span>}
                          {masteredQuestions.includes(item.id) && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">🏆 Mastered</span>}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                        <p className="text-sm text-gray-500 mb-3">{item.shortAnswer}</p>
                        {item.syntax && <div className="mb-3 p-2 bg-gray-50 rounded-lg"><p className="text-xs font-semibold text-gray-500 mb-1">Syntax:</p><code className="text-sm font-mono text-blue-600">{item.syntax}</code></div>}
                        <details className="mt-3">
                          <summary className="text-sm text-blue-600 cursor-pointer font-medium">View Full Answer + Example</summary>
                          <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 text-sm whitespace-pre-wrap mb-3">{item.answer}</p>
                            {item.example && <pre className="text-sm font-mono bg-white p-3 rounded-lg border border-gray-200 overflow-x-auto">{item.example}</pre>}
                            {item.tip && <div className="mt-3 p-3 bg-amber-50 rounded-lg"><p className="text-sm text-amber-700">💡 {item.tip}</p></div>}
                            <div className="mt-3 p-3 bg-purple-50 rounded-lg"><p className="text-sm font-semibold text-purple-700 mb-1">🎯 How Interviewer Expects Answer:</p><p className="text-sm text-purple-700">{item.expectedAnswer}</p></div>
                          </div>
                        </details>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => toggleBookmark(item.id)} className="p-2 rounded-lg hover:bg-gray-100">{bookmarkedQuestions.includes(item.id) ? <BookmarkCheck className="w-5 h-5 text-blue-600" /> : <Bookmark className="w-5 h-5 text-gray-400" />}</button>
                        <button onClick={() => toggleComplete(item.id)} className={`p-2 rounded-lg ${completedQuestions.includes(item.id) ? "bg-green-100 text-green-600" : "hover:bg-gray-100 text-gray-400"}`}><CheckCircle className="w-5 h-5" /></button>
                        <button onClick={() => toggleMastered(item.id)} className={`p-2 rounded-lg ${masteredQuestions.includes(item.id) ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100 text-gray-400"}`}><Award className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredQuestions.length === 0 && <div className="text-center py-12 bg-white rounded-2xl"><p className="text-gray-500">No questions found. Try adjusting your filters.</p></div>}
            </div>
          )}

          {/* Coming Soon Section */}
          <div className="mt-16 mb-16">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-3"><Rocket className="w-6 h-6 text-amber-500" /><span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Coming Soon</span></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">More Finance Interview Topics</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">We're building comprehensive interview prep for these topics. Coming soon!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {comingSoonTopics.map((topic, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                  <div className={`w-14 h-14 ${topic.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4`}><topic.icon className={`w-7 h-7 text-white`} /></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{topic.description}</p>
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm text-amber-500"><Sparkles className="w-4 h-4" /><span>Coming Soon</span></div></div>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Download CTA */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3"><div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Download className="w-6 h-6 text-white" /></div><div><h3 className="text-lg font-bold text-white">Download Interview Questions PDF</h3><p className="text-white/80 text-sm">Get all questions, answers, syntax, and examples in one PDF</p></div></div>
              <button onClick={downloadPDF} className="px-5 py-2.5 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"><Download className="w-4 h-4" />Download Free PDF</button>
            </div>
          </div>

          {/* Final CTA - Row layout buttons */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Ace Your Excel Interview?</h2>
            <p className="text-white/80 mb-5 max-w-2xl mx-auto">Practice {interviewQuestions.length}+ questions, master the formulas, and walk into your interview with confidence.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={() => {
                  setActiveTab("mock");
                  setTimeout(() => scrollToSection(mockInterviewRef), 100);
                }} 
                className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 inline-flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />Start Mock Interview
              </button>
              <button 
                onClick={() => {
                  setActiveTab("quiz");
                  setTimeout(() => scrollToSection(quizRef), 100);
                }} 
                className="bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/30 inline-flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />Take the Quiz
              </button>
              <Link href="/jobs">
                <button className="bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/30 inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />Apply to Finance Jobs
                </button>
              </Link>
            </div>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}