'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ChevronRight, Search, Star, Zap, BookOpen, ArrowLeft, Home, TrendingUp, Award, Users, Sparkles, Filter, X } from 'lucide-react';

interface Topic {
  title: string;
  slug: string;
  duration: string;
  level: string;
  description: string;
  popular: boolean;
}

interface Category {
  category: string;
  slug: string;
  icon: string;
  iconBg: string;
  description: string;
  topics: Topic[];
}

const allTopics: Category[] = [
  { 
    category: 'Excel', 
    slug: 'excel', 
    icon: '📊',
    iconBg: 'from-emerald-500 to-green-700',
    description: 'Master spreadsheets, formulas, and data analysis',
    topics: [
      { title: 'Pivot Tables', slug: 'pivot-tables', duration: '15 min', level: 'Intermediate', description: 'Summarize and analyze large datasets', popular: true },
      { title: 'VLOOKUP', slug: 'vlookup', duration: '12 min', level: 'Intermediate', description: 'Find and match data across spreadsheets', popular: true },
      { title: 'Conditional Formatting', slug: 'conditional-formatting', duration: '8 min', level: 'Beginner', description: 'Highlight trends and patterns', popular: false },
      { title: 'Data Validation', slug: 'data-validation', duration: '10 min', level: 'Beginner', description: 'Control data entry and prevent errors', popular: false },
      { title: 'Charts & Graphs', slug: 'charts-graphs', duration: '14 min', level: 'Beginner', description: 'Visualize your Excel data', popular: false },
      { title: 'Macros', slug: 'macros', duration: '20 min', level: 'Advanced', description: 'Automate repetitive tasks', popular: false },
      { title: 'SUMIFS', slug: 'sumifs', duration: '10 min', level: 'Intermediate', description: 'Sum with multiple conditions', popular: false },
      { title: 'INDEX MATCH', slug: 'index-match', duration: '15 min', level: 'Advanced', description: 'Advanced lookup alternative to VLOOKUP', popular: false }
    ]
  },
  { 
    category: 'SQL', 
    slug: 'sql', 
    icon: '🗄️',
    iconBg: 'from-blue-500 to-cyan-700',
    description: 'Query databases and manage data efficiently',
    topics: [
      { title: 'SQL Joins', slug: 'sql-joins', duration: '12 min', level: 'Intermediate', description: 'Combine data from multiple tables', popular: true },
      { title: 'SELECT Queries', slug: 'select-queries', duration: '10 min', level: 'Beginner', description: 'Retrieve data from databases', popular: false },
      { title: 'GROUP BY', slug: 'group-by', duration: '10 min', level: 'Intermediate', description: 'Summarize and aggregate data', popular: false },
      { title: 'Subqueries', slug: 'subqueries', duration: '14 min', level: 'Advanced', description: 'Nested queries for complex logic', popular: false },
      { title: 'Window Functions', slug: 'window-functions', duration: '16 min', level: 'Advanced', description: 'Advanced analytics with RANK, ROW_NUMBER', popular: false }
    ]
  },
  { 
    category: 'Power BI', 
    slug: 'powerbi', 
    icon: '📈',
    iconBg: 'from-orange-500 to-red-700',
    description: 'Create stunning dashboards and visualizations',
    topics: [
      { title: 'Data Modeling', slug: 'data-modeling', duration: '15 min', level: 'Intermediate', description: 'Create relationships and schemas', popular: true },
      { title: 'DAX Functions', slug: 'dax-functions', duration: '18 min', level: 'Advanced', description: 'Calculate and analyze data', popular: false },
      { title: 'Visualizations', slug: 'visualizations', duration: '12 min', level: 'Beginner', description: 'Create interactive dashboards', popular: false },
      { title: 'Power Query', slug: 'power-query', duration: '14 min', level: 'Intermediate', description: 'Transform and clean data', popular: false }
    ]
  },
  { 
    category: 'Python', 
    slug: 'python', 
    icon: '🐍',
    iconBg: 'from-violet-500 to-purple-700',
    description: 'Automate tasks and analyze data with code',
    topics: [
      { title: 'Python Basics', slug: 'python-basics', duration: '15 min', level: 'Beginner', description: 'Variables, loops, and functions', popular: true },
      { title: 'Pandas', slug: 'pandas', duration: '20 min', level: 'Intermediate', description: 'Data manipulation and analysis', popular: false },
      { title: 'Data Visualization', slug: 'data-visualization', duration: '18 min', level: 'Intermediate', description: 'Create charts with matplotlib', popular: false },
      { title: 'NumPy', slug: 'numpy', duration: '14 min', level: 'Intermediate', description: 'Numerical computing with arrays', popular: false }
    ]
  },
  { 
    category: 'Finance', 
    slug: 'finance', 
    icon: '💰',
    iconBg: 'from-teal-500 to-emerald-700',
    description: 'Understand financial statements and analysis',
    topics: [
      { title: 'Profit & Loss', slug: 'profit-loss', duration: '10 min', level: 'Beginner', description: 'Understand revenue and expenses', popular: true },
      { title: 'Balance Sheet', slug: 'balance-sheet', duration: '12 min', level: 'Beginner', description: 'Assets, liabilities & equity', popular: false },
      { title: 'Cash Flow', slug: 'cash-flow', duration: '14 min', level: 'Intermediate', description: 'Track money in & out', popular: false },
      { title: 'Financial Ratios', slug: 'financial-ratios', duration: '12 min', level: 'Intermediate', description: 'Liquidity & profitability analysis', popular: false },
      { title: 'Budgeting', slug: 'budgeting', duration: '10 min', level: 'Beginner', description: 'Plan and control finances', popular: false },
      { title: 'Forecasting', slug: 'forecasting', duration: '14 min', level: 'Advanced', description: 'Predict future trends', popular: false }
    ]
  }
];

const getLevelColor = (level: string) => {
  switch(level) {
    case 'Beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Intermediate': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Advanced': return 'bg-rose-100 text-rose-700 border-rose-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const getLevelBadgeColor = (level: string) => {
  switch(level) {
    case 'Beginner': return 'bg-emerald-500';
    case 'Intermediate': return 'bg-amber-500';
    case 'Advanced': return 'bg-rose-500';
    default: return 'bg-gray-500';
  }
};

export default function LearnPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTopics = allTopics
    .map(category => ({
      ...category,
      topics: category.topics.filter(topic => {
        const matchesSearch = searchQuery === '' || 
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || category.slug === selectedCategory;
        const matchesLevel = !selectedLevel || topic.level === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
      })
    }))
    .filter(category => category.topics.length > 0);

  const totalTopics = allTopics.reduce((sum, cat) => sum + cat.topics.length, 0);
  const populars = allTopics.flatMap(cat => cat.topics).filter(t => t.popular).length;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== null || selectedLevel !== null || searchQuery !== '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/30 -z-10"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FFA500]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 mb-6 shadow-sm">
            <Sparkles size={14} className="text-[#FFD700]" />
            <span>New lessons added weekly</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Master Skills for{' '}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              Financial Analysis
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn the exact skills companies expect — from Excel basics to advanced financial modeling. 
            Bite-sized lessons, real-world examples, and completely free.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search topics, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-3.5 border border-slate-200 rounded-xl outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-lg transition"
                >
                  <X size={16} className="text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2.5 bg-white rounded-xl px-5 py-2.5 border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <BookOpen size={16} className="text-blue-500" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{totalTopics}</div>
                <div className="text-xs text-slate-500">Lessons</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl px-5 py-2.5 border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Star size={16} className="text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{populars}</div>
                <div className="text-xs text-slate-500">Popular</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl px-5 py-2.5 border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Users size={16} className="text-emerald-500" />
              </div>
              <div>
                <div className="font-bold text-slate-900">5K+</div>
                <div className="text-xs text-slate-500">Learners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters Bar */}
        <div className="mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Filter Header - Mobile Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between p-4 lg:hidden"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-slate-500" />
                <span className="font-medium text-slate-700">Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              <ChevronRight
                size={16}
                className={`transform transition-transform text-slate-400 ${
                  showFilters ? 'rotate-90' : ''
                }`}
              />
            </button>

            {/* Filter Content */}
            <div className={`p-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Category Filter */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === null
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      All
                    </button>
                    {allTopics.map(cat => (
                      <button
                        key={cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                          selectedCategory === cat.slug
                            ? `bg-gradient-to-r ${cat.iconBg} text-white shadow-sm`
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div className="lg:w-48">
                  <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
                    Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedLevel(null)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedLevel === null
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      All
                    </button>
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                          selectedLevel === level
                            ? `${getLevelBadgeColor(level)} text-white shadow-sm`
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedLevel === level ? 'bg-white' : getLevelBadgeColor(level)}`}></div>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters & Clear */}
              {hasActiveFilters && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        {allTopics.find(c => c.slug === selectedCategory)?.category}
                        <button onClick={() => setSelectedCategory(null)} className="hover:text-blue-800">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedLevel && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        {selectedLevel}
                        <button onClick={() => setSelectedLevel(null)} className="hover:text-blue-800">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:text-blue-800">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-slate-500 hover:text-red-500 transition"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No topics found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredTopics.map((category) => (
            <div key={category.slug} className="mb-14 last:mb-0">
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.iconBg} flex items-center justify-center text-xl shadow-md`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                  <p className="text-sm text-slate-500">{category.description}</p>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {category.topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/learn/${category.slug}/${topic.slug}`}
                    className="group block bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all hover:-translate-y-1 duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        {topic.popular && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 rounded-full text-[10px] font-medium text-amber-600">
                            <Star size={10} className="fill-amber-500" />
                            Popular
                          </span>
                        )}
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {topic.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getLevelColor(topic.level)}`}>
                        {topic.level}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <Clock size={10} />
                        {topic.duration}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}

        {/* CTA Section */}
        {filteredTopics.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-100 text-center">
            <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-100">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFD700]/10 rounded-full text-xs font-medium text-[#0A2540] mb-4">
                <Sparkles size={12} className="text-[#FFD700]" />
                <span>100% Free</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to start learning?</h3>
              <p className="text-slate-500 mb-4">All lessons are completely free. No credit card required.</p>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A2540] font-semibold rounded-lg hover:shadow-md transition-all"
              >
                View Career Roadmap
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}