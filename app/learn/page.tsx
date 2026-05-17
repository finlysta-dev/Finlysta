'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Search, BookOpen, Clock, TrendingUp, Award, Users, 
  FileSpreadsheet, Database, BarChart3, Code, Landmark, 
  Home, User, Bell, ChevronRight, Sparkles, Target, CheckCircle,
  Circle, Lock, Play, Star, Zap, LineChart, PieChart, MessageCircle,
  X, Filter, ArrowRight, GraduationCap, Globe, Briefcase, 
  Coffee, ThumbsUp, Rocket, Calendar, Activity, Compass
} from 'lucide-react';

// Types
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
  iconBg: string;
  gradient: string;
  color: string;
  lightColor: string;
  description: string;
  totalChapters: number;
  completedChapters: number;
  chapters: Chapter[];
}

// Complete chapter data for all 6 categories
const categories: Category[] = [
  {
    id: 1,
    name: 'Finance Fundamentals',
    slug: 'finance-fundamentals',
    icon: Landmark,
    iconBg: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-500',
    color: 'emerald',
    lightColor: 'bg-emerald-50',
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
    iconBg: 'bg-blue-50',
    gradient: 'from-blue-500 to-indigo-500',
    color: 'blue',
    lightColor: 'bg-blue-50',
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
    iconBg: 'bg-amber-50',
    gradient: 'from-amber-500 to-orange-500',
    color: 'amber',
    lightColor: 'bg-amber-50',
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
    iconBg: 'bg-cyan-50',
    gradient: 'from-cyan-500 to-blue-500',
    color: 'cyan',
    lightColor: 'bg-cyan-50',
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
    iconBg: 'bg-orange-50',
    gradient: 'from-orange-500 to-red-500',
    color: 'orange',
    lightColor: 'bg-orange-50',
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
    iconBg: 'bg-purple-50',
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple',
    lightColor: 'bg-purple-50',
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

const getLevelBadge = (level: string) => {
  switch(level) {
    case 'Beginner': return { bg: 'bg-emerald-100 text-emerald-700', icon: '🌱', label: 'Beginner' };
    case 'Intermediate': return { bg: 'bg-amber-100 text-amber-700', icon: '📈', label: 'Intermediate' };
    case 'Advanced': return { bg: 'bg-rose-100 text-rose-700', icon: '🚀', label: 'Advanced' };
    default: return { bg: 'bg-gray-100 text-gray-600', icon: '📚', label: level };
  }
};

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [chapterStates, setChapterStates] = useState(categories);

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

  const totalChapters = chapterStates.reduce((sum, cat) => sum + cat.totalChapters, 0);
  const totalCompleted = chapterStates.reduce((sum, cat) => sum + cat.completedChapters, 0);
  const totalProgress = (totalCompleted / totalChapters) * 100;
  const popularChapters = chapterStates.flatMap(cat => cat.chapters).filter(ch => ch.id <= 2).length;

  const filteredCategories = chapterStates
    .map(category => ({
      ...category,
      chapters: category.chapters.filter(chapter => {
        const matchesSearch = searchQuery === '' || 
          chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chapter.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || category.slug === selectedCategory;
        const matchesLevel = !selectedLevel || chapter.level === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
      })
    }))
    .filter(category => category.chapters.length > 0);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== null || selectedLevel !== null || searchQuery !== '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500]"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Finlysta</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Home</Link>
              <Link href="/learn" className="text-sm font-medium text-[#FFD700] transition">Learn</Link>
              <Link href="/roadmap" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Roadmap</Link>
              <Link href="/blogs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Blogs</Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                <Bell size={16} className="text-gray-600" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center cursor-pointer">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-sm font-semibold text-blue-700 mb-6 shadow-sm">
              <Sparkles size={14} className="text-[#FFD700]" />
              <span>New lessons added weekly</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-[1.2] tracking-tight">
              Master Finance & Analytics{' '}
              <span className="text-[#FFD700]">
                Skills That Get You Hired
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Learn the exact skills companies are looking for — from Excel basics to advanced financial modeling. 
              Bite-sized lessons, real-world projects, and completely free.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Excel, SQL, Power BI, Financial Modeling..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent rounded-2xl outline-none text-gray-900 placeholder-gray-400 text-base"
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BookOpen size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalChapters}</div>
                    <div className="text-xs text-gray-500">Free Chapters</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Star size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{popularChapters}</div>
                    <div className="text-xs text-gray-500">Popular Topics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview - Inline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Target size={22} className="text-[#FFD700]" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-semibold text-base">Your Learning Journey</h3>
                  <span className="text-[#FFD700] text-sm font-semibold">{Math.round(totalProgress)}%</span>
                </div>
                <p className="text-gray-300 text-xs">{totalCompleted} of {totalChapters} chapters completed • {Math.floor(totalCompleted / totalChapters * 30)} day streak 🔥</p>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500" style={{ width: `${totalProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Chapters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 pb-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Categories
          </button>
          {chapterStates.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.slug
                    ? `${cat.lightColor} text-gray-900 shadow-sm border border-gray-200`
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chapters Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No topics found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-xl text-sm font-medium">
              Clear all filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const CategoryIcon = category.icon;
            const categoryProgress = (category.completedChapters / category.totalChapters) * 100;
            const levelBadge = getLevelBadge;

            return (
              <div key={category.id} className="mb-12 last:mb-0">
                {/* Category Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${category.lightColor} flex items-center justify-center shadow-sm`}>
                      <CategoryIcon size={28} className="text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{Math.round(categoryProgress)}%</div>
                      <div className="text-xs text-gray-400">{category.completedChapters}/{category.totalChapters} done</div>
                    </div>
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`} style={{ width: `${categoryProgress}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Chapters Grid - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.chapters.map((chapter) => {
                    const level = levelBadge(chapter.level);
                    const isPopular = chapter.id <= 2;
                    
                    return (
                      <Link
                        key={chapter.id}
                        href={`/learn/${category.slug}/${chapter.slug}`}
                        className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className={`h-1.5 bg-gradient-to-r ${category.gradient}`}></div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-10 h-10 rounded-xl ${category.lightColor} flex items-center justify-center`}>
                                <CategoryIcon size={18} className="text-gray-700" />
                              </div>
                              {isPopular && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full text-[10px] font-semibold text-amber-600">
                                  <Zap size={10} className="text-amber-500" />
                                  Popular
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleChapter(category.id, chapter.id);
                              }}
                              className="text-gray-400 hover:text-emerald-500 transition"
                            >
                              {chapter.completed ? (
                                <CheckCircle size={18} className="text-emerald-500" />
                              ) : (
                                <Circle size={18} />
                              )}
                            </button>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#FFD700] transition-colors line-clamp-1">
                            {chapter.title}
                          </h3>
                          
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {chapter.description}
                          </p>
                          
                          <div className="flex items-center gap-3">
                            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${level.bg}`}>
                              <span>{level.icon}</span>
                              <span>{chapter.level}</span>
                            </span>
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                              <Clock size={11} />
                              {chapter.duration}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Why Learn with Finlysta */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-sm font-semibold text-blue-700 mb-4">
              <Rocket size={14} />
              <span>Why Finlysta?</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Learn with Confidence</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Join thousands of students who transformed their careers with Finlysta</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} className="text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">48+</div>
              <div className="text-sm text-gray-500">Free Lessons</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">30+</div>
              <div className="text-sm text-gray-500">Hours of Content</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-500">Active Learners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-[#FFD700] mb-6">
            <Sparkles size={14} />
            <span>100% Free — Always</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Join thousands of students mastering finance skills for their dream careers
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              <Compass size={18} />
              View Career Roadmap
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur text-white font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
            >
              <BookOpen size={18} />
              Read Our Blogs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}