'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
  Search, BookOpen, Clock, TrendingUp, Users, 
  FileSpreadsheet, BarChart3, Landmark, Bell, 
  Sparkles, Target, CheckCircle, Circle, 
  PieChart, MessageCircle, ArrowRight, Compass, 
  Flame, Rocket, Star, Zap, GraduationCap,
  Award, Trophy, Calendar, CheckSquare,
  Eye, ThumbsUp, Share2, Bookmark, ChevronRight,
  Layers, Database, LineChart, Briefcase, Cloud, Code, Shield, Gift,
  RotateCcw
} from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  slug: string;
  duration: string;
  level: string;
  description: string;
  completed: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: any;
  gradient: string;
  bgLight: string;
  tagBg: string;
  color: string;
  description: string;
  totalChapters: number;
  completedChapters: number;
  chapters: Chapter[];
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Finance Fundamentals',
    slug: 'finance-fundamentals',
    icon: Landmark,
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    tagBg: 'bg-emerald-100',
    color: 'emerald',
    description: 'Master core finance concepts, statements, and forecasting',
    totalChapters: 8,
    completedChapters: 2,
    chapters: [
      { id: 1, title: 'Profit & Loss Statement', slug: 'profit-loss-statement', duration: '12 min', level: 'Beginner', description: 'Understand revenue, expenses, and profitability', completed: true },
      { id: 2, title: 'Balance Sheet', slug: 'balance-sheet', duration: '14 min', level: 'Beginner', description: 'Assets, liabilities, and shareholder equity', completed: true },
      { id: 3, title: 'Cash Flow Statement', slug: 'cash-flow-statement', duration: '16 min', level: 'Intermediate', description: 'Track money movement in & out', completed: false },
      { id: 4, title: 'Financial Ratios', slug: 'financial-ratios', duration: '15 min', level: 'Intermediate', description: 'Liquidity, profitability & efficiency metrics', completed: false },
      { id: 5, title: 'Budgeting Basics', slug: 'budgeting-basics', duration: '10 min', level: 'Beginner', description: 'Plan and control finances effectively', completed: false },
      { id: 6, title: 'Forecasting Methods', slug: 'forecasting-methods', duration: '18 min', level: 'Advanced', description: 'Predict future financial trends', completed: false },
      { id: 7, title: 'Working Capital', slug: 'working-capital', duration: '12 min', level: 'Intermediate', description: 'Manage short-term finances', completed: false },
      { id: 8, title: 'Capital Budgeting', slug: 'capital-budgeting', duration: '16 min', level: 'Advanced', description: 'Evaluate investment decisions', completed: false }
    ]
  },
  {
    id: 2,
    name: 'Advanced Excel',
    slug: 'advanced-excel',
    icon: FileSpreadsheet,
    gradient: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50',
    tagBg: 'bg-blue-100',
    color: 'blue',
    description: 'Master spreadsheets for financial analysis',
    totalChapters: 8,
    completedChapters: 1,
    chapters: [
      { id: 1, title: 'Pivot Tables', slug: 'pivot-tables', duration: '15 min', level: 'Intermediate', description: 'Summarize and analyze large datasets', completed: true },
      { id: 2, title: 'VLOOKUP & XLOOKUP', slug: 'vlookup-xlookup', duration: '12 min', level: 'Intermediate', description: 'Find and match data across spreadsheets', completed: false },
      { id: 3, title: 'Conditional Formatting', slug: 'conditional-formatting', duration: '8 min', level: 'Beginner', description: 'Highlight trends and patterns', completed: false },
      { id: 4, title: 'Data Validation', slug: 'data-validation', duration: '10 min', level: 'Beginner', description: 'Control data entry and prevent errors', completed: false },
      { id: 5, title: 'Charts & Graphs', slug: 'charts-graphs', duration: '14 min', level: 'Beginner', description: 'Visualize your Excel data', completed: false },
      { id: 6, title: 'Macros & VBA', slug: 'macros-vba', duration: '20 min', level: 'Advanced', description: 'Automate repetitive tasks', completed: false },
      { id: 7, title: 'SUMIFS & COUNTIFS', slug: 'sumifs-countifs', duration: '10 min', level: 'Intermediate', description: 'Sum with multiple conditions', completed: false },
      { id: 8, title: 'INDEX MATCH', slug: 'index-match', duration: '15 min', level: 'Advanced', description: 'Advanced lookup alternative', completed: false }
    ]
  },
  {
    id: 3,
    name: 'Financial Analysis',
    slug: 'financial-analysis',
    icon: TrendingUp,
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    tagBg: 'bg-amber-100',
    color: 'amber',
    description: 'Analyze data, interpret ratios, and make informed decisions',
    totalChapters: 8,
    completedChapters: 0,
    chapters: [
      { id: 1, title: 'Ratio Analysis', slug: 'ratio-analysis', duration: '14 min', level: 'Intermediate', description: 'Liquidity, profitability & efficiency ratios', completed: false },
      { id: 2, title: 'Variance Analysis', slug: 'variance-analysis', duration: '12 min', level: 'Intermediate', description: 'Budget vs actual comparison', completed: false },
      { id: 3, title: 'Trend Analysis', slug: 'trend-analysis', duration: '10 min', level: 'Beginner', description: 'Identify patterns over time', completed: false },
      { id: 4, title: 'Scenario Analysis', slug: 'scenario-analysis', duration: '16 min', level: 'Advanced', description: 'What-if analysis for decision making', completed: false },
      { id: 5, title: 'Benchmarking', slug: 'benchmarking', duration: '12 min', level: 'Intermediate', description: 'Compare against industry standards', completed: false },
      { id: 6, title: 'Sensitivity Analysis', slug: 'sensitivity-analysis', duration: '14 min', level: 'Advanced', description: 'Test key variable impacts', completed: false },
      { id: 7, title: 'Break-even Analysis', slug: 'breakeven-analysis', duration: '10 min', level: 'Beginner', description: 'Find profitability threshold', completed: false },
      { id: 8, title: 'Dupont Analysis', slug: 'dupont-analysis', duration: '15 min', level: 'Advanced', description: 'Decompose ROE components', completed: false }
    ]
  },
  {
    id: 4,
    name: 'Financial Reporting',
    slug: 'financial-reporting',
    icon: PieChart,
    gradient: 'from-cyan-500 to-blue-500',
    bgLight: 'bg-cyan-50',
    tagBg: 'bg-cyan-100',
    color: 'cyan',
    description: 'Create professional financial reports and dashboards',
    totalChapters: 8,
    completedChapters: 0,
    chapters: [
      { id: 1, title: 'Annual Reports', slug: 'annual-reports', duration: '12 min', level: 'Beginner', description: 'Understand company performance reports', completed: false },
      { id: 2, title: 'Quarterly Reports', slug: 'quarterly-reports', duration: '10 min', level: 'Beginner', description: 'Track periodic performance', completed: false },
      { id: 3, title: 'Management Reports', slug: 'management-reports', duration: '14 min', level: 'Intermediate', description: 'Internal decision-making reports', completed: false },
      { id: 4, title: 'Regulatory Filings', slug: 'regulatory-filings', duration: '16 min', level: 'Intermediate', description: 'Compliance reporting requirements', completed: false },
      { id: 5, title: 'Investor Reports', slug: 'investor-reports', duration: '12 min', level: 'Advanced', description: 'Shareholder communication', completed: false },
      { id: 6, title: 'Executive Dashboards', slug: 'executive-dashboards', duration: '15 min', level: 'Advanced', description: 'Visual performance tracking', completed: false },
      { id: 7, title: 'MD&A Analysis', slug: 'mda-analysis', duration: '14 min', level: 'Intermediate', description: 'Management discussion analysis', completed: false },
      { id: 8, title: 'Segment Reporting', slug: 'segment-reporting', duration: '12 min', level: 'Advanced', description: 'Business unit performance', completed: false }
    ]
  },
  {
    id: 5,
    name: 'Power BI',
    slug: 'powerbi',
    icon: BarChart3,
    gradient: 'from-orange-500 to-red-500',
    bgLight: 'bg-orange-50',
    tagBg: 'bg-orange-100',
    color: 'orange',
    description: 'Create stunning dashboards and data visualizations',
    totalChapters: 8,
    completedChapters: 0,
    chapters: [
      { id: 1, title: 'Power BI Basics', slug: 'powerbi-basics', duration: '12 min', level: 'Beginner', description: 'Get started with Power BI', completed: false },
      { id: 2, title: 'Data Modeling', slug: 'data-modeling', duration: '15 min', level: 'Intermediate', description: 'Create relationships and schemas', completed: false },
      { id: 3, title: 'DAX Functions', slug: 'dax-functions', duration: '18 min', level: 'Advanced', description: 'Calculate and analyze data', completed: false },
      { id: 4, title: 'Visualizations', slug: 'visualizations', duration: '14 min', level: 'Beginner', description: 'Create interactive dashboards', completed: false },
      { id: 5, title: 'Power Query', slug: 'power-query', duration: '16 min', level: 'Intermediate', description: 'Transform and clean data', completed: false },
      { id: 6, title: 'Dashboard Design', slug: 'dashboard-design', duration: '20 min', level: 'Advanced', description: 'Best practices for dashboards', completed: false },
      { id: 7, title: 'Row-Level Security', slug: 'row-level-security', duration: '14 min', level: 'Advanced', description: 'Control data access', completed: false },
      { id: 8, title: 'Publishing Reports', slug: 'publishing-reports', duration: '10 min', level: 'Intermediate', description: 'Share insights with teams', completed: false }
    ]
  },
  {
    id: 6,
    name: 'Business Communication',
    slug: 'business-communication',
    icon: MessageCircle,
    gradient: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50',
    tagBg: 'bg-purple-100',
    color: 'purple',
    description: 'Master finance communication, reports, and presentations',
    totalChapters: 8,
    completedChapters: 0,
    chapters: [
      { id: 1, title: 'Report Writing', slug: 'report-writing', duration: '12 min', level: 'Beginner', description: 'Write clear financial reports', completed: false },
      { id: 2, title: 'Presentation Skills', slug: 'presentation-skills', duration: '14 min', level: 'Intermediate', description: 'Present data effectively', completed: false },
      { id: 3, title: 'Email Etiquette', slug: 'email-etiquette', duration: '8 min', level: 'Beginner', description: 'Professional email communication', completed: false },
      { id: 4, title: 'Client Communication', slug: 'client-communication', duration: '12 min', level: 'Intermediate', description: 'Handle client interactions', completed: false },
      { id: 5, title: 'Meeting Management', slug: 'meeting-management', duration: '10 min', level: 'Advanced', description: 'Lead finance meetings', completed: false },
      { id: 6, title: 'Negotiation Skills', slug: 'negotiation-skills', duration: '14 min', level: 'Advanced', description: 'Negotiate effectively', completed: false },
      { id: 7, title: 'Business Writing', slug: 'business-writing', duration: '10 min', level: 'Intermediate', description: 'Professional business documents', completed: false },
      { id: 8, title: 'Data Storytelling', slug: 'data-storytelling', duration: '16 min', level: 'Advanced', description: 'Tell stories with data', completed: false }
    ]
  }
];

const getLevelStyles = (level: string) => {
  switch(level) {
    case 'Beginner': return 'bg-emerald-100 text-emerald-700';
    case 'Intermediate': return 'bg-amber-100 text-amber-700';
    case 'Advanced': return 'bg-rose-100 text-rose-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chapterStates, setChapterStates] = useState(categories);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleChapter = (categoryId: number, chapterId: number) => {
    setChapterStates(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const updatedChapters = cat.chapters.map(ch => 
          ch.id === chapterId ? { ...ch, completed: !ch.completed } : ch
        );
        const completedCount = updatedChapters.filter(ch => ch.completed).length;
        return { ...cat, chapters: updatedChapters, completedChapters: completedCount };
      }
      return cat;
    }));
  };

  const resetAllProgress = () => {
    setChapterStates(prev => prev.map(cat => ({
      ...cat,
      completedChapters: 0,
      chapters: cat.chapters.map(ch => ({ ...ch, completed: false }))
    })));
    setShowResetConfirm(false);
  };

  const totalChapters = chapterStates.reduce((sum, cat) => sum + cat.totalChapters, 0);
  const totalCompleted = chapterStates.reduce((sum, cat) => sum + cat.completedChapters, 0);
  const totalProgress = (totalCompleted / totalChapters) * 100;

  const filteredCategories = chapterStates
    .map(category => ({
      ...category,
      chapters: category.chapters.filter(chapter => {
        const matchesSearch = searchQuery === '' || 
          chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chapter.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || category.slug === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    }))
    .filter(category => category.chapters.length > 0);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  // Get margin top for categories based on name
  const getCategoryMargin = (categoryName: string) => {
    const categoriesWithMargin = [
      'Advanced Excel',
      'Financial Analysis',
      'Financial Reporting',
      'Power BI',
      'Business Communication'
    ];
    return categoriesWithMargin.includes(categoryName) ? "mt-12" : "";
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Finlysta.png" 
                alt="Finlysta logo"
                width={180} 
                height={40}
                priority
                className="object-contain"
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Home</Link>
              <Link href="/learning-hub" className="text-sm font-semibold text-blue-600">Learning Hub</Link>
              <Link href="/roadmap" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Roadmap</Link>
              <Link href="/blogs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Blogs</Link>
               <Link href="/interview-prep" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Interview Prep</Link>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                <Bell size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-56 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-blue-600 mb-6 shadow-sm">
            <Sparkles size={12} />
            New lessons added weekly
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6">
            Master Finance &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Analytics</span>
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Learn the exact skills companies are looking for. From Excel fundamentals to advanced financial modeling. Bite-sized lessons, real-world projects, 100% free.
          </p>
          
{/* Search */}
<div className="max-w-xl mx-auto mt-9 mb-8">
  <div className="relative">
    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder="          Search chapters, skills, topics..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-28 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
    />
  </div>
</div>
          {/* Stats */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalChapters}</div>
              <div className="text-xs text-gray-500">Free Chapters</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-xs text-gray-500">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar with Reset Button */}
      <section className="max-w-2xl mx-auto px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Target size={16} className="text-white" />
              </div>
              <span className="text-base font-semibold text-gray-900">Your Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-blue-600">{Math.round(totalProgress)}%</span>
              {totalCompleted > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowResetConfirm(!showResetConfirm)}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                    title="Reset Progress"
                  >
                    <RotateCcw size={14} className="text-gray-600" />
                  </button>
                  {showResetConfirm && (
                    <div className="absolute right-0 top-10 z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-48">
                      <p className="text-xs text-gray-600 mb-2">Reset all progress?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={resetAllProgress}
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition"
                        >
                          Yes, Reset
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">{totalCompleted} of {totalChapters} chapters completed</p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All
          </button>
          {chapterStates.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                  selectedCategory === cat.slug
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Chapters Grid - Card Style */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-20">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No topics found</h3>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;
              const categoryProgress = (category.completedChapters / category.totalChapters) * 100;
              
              return (
                <div key={category.id} className={getCategoryMargin(category.name)}>
                  {/* Category Header - Removed color blocks */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <CategoryIcon size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{Math.round(categoryProgress)}%</div>
                      <div className="text-xs text-gray-400">{category.completedChapters}/{category.totalChapters}</div>
                    </div>
                  </div>
                  
                  {/* Progress bar under category */}
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-500`}
                      style={{ width: `${categoryProgress}%` }}
                    />
                  </div>
                  
                  {/* Chapter Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.chapters.map((chapter) => (
                      <Link
                        key={chapter.id}
                        href={`/learning-hub/${category.slug}/${chapter.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                          {/* Top section - Removed colored background */}
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <CategoryIcon size={18} className="text-gray-600" />
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleChapter(category.id, chapter.id);
                                }}
                              >
                                {chapter.completed ? (
                                  <CheckCircle size={18} className="text-emerald-500" />
                                ) : (
                                  <Circle size={18} className="text-gray-300 group-hover:text-gray-400 transition" />
                                )}
                              </button>
                            </div>
                            
                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition line-clamp-1">
                              {chapter.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {chapter.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                              <span className={`${getLevelStyles(chapter.level)} px-2.5 py-1 rounded-full text-xs font-medium`}>
                                {chapter.level}
                              </span>
                              <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-500 flex items-center gap-1">
                                <Clock size={11} />
                                {chapter.duration}
                              </span>
                            </div>
                          </div>
                          
                          {/* Bottom with Explore button */}
                          <div className="flex items-center justify-between px-5 py-3 bg-white border-t border-gray-50">
                            <span className="text-sm font-medium text-gray-600">Start Learning</span>
                            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition group-hover:scale-105">
                              <ArrowRight size={14} className="text-gray-600" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-blue-600 mb-4 shadow-sm">
              <Rocket size={12} />
              Why choose Finlysta
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Learn with Confidence</h2>
            <p className="text-gray-500 text-sm mt-1">Join thousands transforming their careers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { icon: BookOpen, title: 'Free Lessons', value: '48+', description: 'Completely free access' },
              { icon: Clock, title: 'Hours of Content', value: '30+', description: 'Learn at your pace' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="font-medium text-gray-700 text-sm mt-1">{item.title}</div>
                  <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-10 text-center">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-5">
                <Gift size={12} />
                100% Free, Always
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Transform Your Skills?</h2>
              <p className="text-white text-sm mb-6 max-w-md mx-auto">
                Join thousands of learners building in-demand finance expertise
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/roadmap"
                  className="px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-xl text-sm hover:shadow-lg transition hover:scale-105"
                >
                  View Career Roadmap
                </Link>
                <Link
                  href="/blogs"
                  className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl text-sm hover:bg-white/30 transition"
                >
                  Read Our Insights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Centered only */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2026 Finlysta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
