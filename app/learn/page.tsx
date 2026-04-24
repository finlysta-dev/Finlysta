'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ChevronRight, Search, Star, Zap, BookOpen, ArrowLeft, Home } from 'lucide-react';

const allTopics = [
  { 
    category: 'Excel', 
    slug: 'excel', 
    icon: '📊',
    iconBg: 'from-emerald-400 to-green-600',
    description: 'Master spreadsheets, formulas, and data analysis',
    topics: [
      { title: 'Pivot Tables', slug: 'pivot-tables', duration: '15 min', level: 'Intermediate', description: 'Summarize and analyze large datasets', popular: true },
      { title: 'VLOOKUP', slug: 'vlookup', duration: '12 min', level: 'Intermediate', description: 'Find and match data across spreadsheets', popular: true },
      { title: 'Conditional Formatting', slug: 'conditional-formatting', duration: '8 min', level: 'Beginner', description: 'Highlight trends and patterns' },
      { title: 'Data Validation', slug: 'data-validation', duration: '10 min', level: 'Beginner', description: 'Control data entry and prevent errors' },
      { title: 'Charts & Graphs', slug: 'charts-graphs', duration: '14 min', level: 'Beginner', description: 'Visualize your Excel data' },
      { title: 'Macros', slug: 'macros', duration: '20 min', level: 'Advanced', description: 'Automate repetitive tasks' },
      { title: 'SUMIFS', slug: 'sumifs', duration: '10 min', level: 'Intermediate', description: 'Sum with multiple conditions' },
      { title: 'INDEX MATCH', slug: 'index-match', duration: '15 min', level: 'Advanced', description: 'Advanced lookup alternative to VLOOKUP' }
    ]
  },
  { 
    category: 'SQL', 
    slug: 'sql', 
    icon: '🗄️',
    iconBg: 'from-blue-400 to-cyan-600',
    description: 'Query databases and manage data efficiently',
    topics: [
      { title: 'SQL Joins', slug: 'sql-joins', duration: '12 min', level: 'Intermediate', description: 'Combine data from multiple tables', popular: true },
      { title: 'SELECT Queries', slug: 'select-queries', duration: '10 min', level: 'Beginner', description: 'Retrieve data from databases' },
      { title: 'GROUP BY', slug: 'group-by', duration: '10 min', level: 'Intermediate', description: 'Summarize and aggregate data' },
      { title: 'Subqueries', slug: 'subqueries', duration: '14 min', level: 'Advanced', description: 'Nested queries for complex logic' },
      { title: 'Window Functions', slug: 'window-functions', duration: '16 min', level: 'Advanced', description: 'Advanced analytics with RANK, ROW_NUMBER' }
    ]
  },
  { 
    category: 'Power BI', 
    slug: 'powerbi', 
    icon: '📈',
    iconBg: 'from-orange-400 to-red-600',
    description: 'Create stunning dashboards and visualizations',
    topics: [
      { title: 'Data Modeling', slug: 'data-modeling', duration: '15 min', level: 'Intermediate', description: 'Create relationships and schemas', popular: true },
      { title: 'DAX Functions', slug: 'dax-functions', duration: '18 min', level: 'Advanced', description: 'Calculate and analyze data' },
      { title: 'Visualizations', slug: 'visualizations', duration: '12 min', level: 'Beginner', description: 'Create interactive dashboards' },
      { title: 'Power Query', slug: 'power-query', duration: '14 min', level: 'Intermediate', description: 'Transform and clean data' }
    ]
  },
  { 
    category: 'Python', 
    slug: 'python', 
    icon: '🐍',
    iconBg: 'from-violet-400 to-purple-600',
    description: 'Automate tasks and analyze data with code',
    topics: [
      { title: 'Python Basics', slug: 'python-basics', duration: '15 min', level: 'Beginner', description: 'Variables, loops, and functions', popular: true },
      { title: 'Pandas', slug: 'pandas', duration: '20 min', level: 'Intermediate', description: 'Data manipulation and analysis' },
      { title: 'Data Visualization', slug: 'data-visualization', duration: '18 min', level: 'Intermediate', description: 'Create charts with matplotlib' },
      { title: 'NumPy', slug: 'numpy', duration: '14 min', level: 'Intermediate', description: 'Numerical computing with arrays' }
    ]
  },
  { 
    category: 'Finance', 
    slug: 'finance', 
    icon: '💰',
    iconBg: 'from-teal-400 to-emerald-600',
    description: 'Understand financial statements and analysis',
    topics: [
      { title: 'Profit & Loss', slug: 'profit-loss', duration: '10 min', level: 'Beginner', description: 'Understand revenue and expenses', popular: true },
      { title: 'Balance Sheet', slug: 'balance-sheet', duration: '12 min', level: 'Beginner', description: 'Assets, liabilities & equity' },
      { title: 'Cash Flow', slug: 'cash-flow', duration: '14 min', level: 'Intermediate', description: 'Track money in & out' },
      { title: 'Financial Ratios', slug: 'financial-ratios', duration: '12 min', level: 'Intermediate', description: 'Liquidity & profitability analysis' },
      { title: 'Budgeting', slug: 'budgeting', duration: '10 min', level: 'Beginner', description: 'Plan and control finances' },
      { title: 'Forecasting', slug: 'forecasting', duration: '14 min', level: 'Advanced', description: 'Predict future trends' }
    ]
  }
];

const getLevelColor = (level) => {
  switch(level) {
    case 'Beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    case 'Intermediate': return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'Advanced': return 'bg-rose-100 text-rose-700 border-rose-300';
    default: return 'bg-gray-100 text-gray-600 border-gray-300';
  }
};

export default function LearnPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const filteredTopics = allTopics
    .map(category => ({
      ...category,
      topics: category.topics.filter(topic => {
        const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || category.slug === selectedCategory;
        const matchesLevel = !selectedLevel || topic.level === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
      })
    }))
    .filter(category => category.topics.length > 0);

  const totalTopics = allTopics.reduce((sum, cat) => sum + cat.topics.length, 0);
  const populars = allTopics.flatMap(cat => cat.topics).filter(t => t.popular).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Back Button - Top Left - Goes to Home */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - New lessons every week */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 mb-6 backdrop-blur-sm shadow-sm">
            <Zap size={14} className="text-amber-500" />
            <span>New lessons every week</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Become a Financial Analyst
          </h1>

          {/* Subheading */}
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn the exact skills companies expect — Excel, financial modeling, and analysis.
          </p>

          {/* Search Bar - Fixed position */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="          Search topics, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Quick Stats - Removed Learners */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-xl px-4 py-2 border border-slate-200">
              <BookOpen size={16} className="text-blue-500" />
              <span className="font-semibold text-slate-900">{totalTopics}</span>
              <span className="text-sm text-slate-500">Topics</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-xl px-4 py-2 border border-slate-200">
              <Star size={16} className="text-amber-500" />
              <span className="font-semibold text-slate-900">{populars}</span>
              <span className="text-sm text-slate-500">Popular</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters Bar */}
        <div className="mb-10">
          <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All
                  </button>
                  {allTopics.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat.slug
                          ? `bg-gradient-to-r ${cat.iconBg} text-white`
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Level</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedLevel === null
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All
                  </button>
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedLevel === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No topics found</h3>
            <p className="text-slate-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          filteredTopics.map((category) => (
            <div key={category.slug} className="mb-16 last:mb-0">
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.iconBg} flex items-center justify-center text-xl shadow-md`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                  <p className="text-sm text-slate-500">{category.description}</p>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/learn/${category.slug}/${topic.slug}`}
                    className="group block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category.icon}</span>
                        {topic.popular && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 rounded-full text-[10px] font-medium text-amber-600">
                            <Star size={10} className="fill-amber-500" />
                            Popular
                          </span>
                        )}
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" />
                    </div>
                    
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {topic.description}
                    </p>
                    
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

        {/* Simple Footer Note */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            All lessons are completely free. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
