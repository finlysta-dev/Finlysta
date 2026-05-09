import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicsByCategory, getAllCategories } from '@/lib/topics-data';
import { Clock, ChevronRight, BookOpen, ArrowLeft, Star, Flame, PlayCircle, TrendingUp, Users, Award, Target, Zap } from 'lucide-react';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(category => ({ category }));
}

const categoryConfig: Record<string, {
  name: string;
  icon: string;
  gradient: string;
  bgGradient: string;
  color: string;
  description: string;
  stats: { label: string; value: string; icon: any }[];
}> = {
  excel: {
    name: 'Excel',
    icon: '📊',
    gradient: 'from-emerald-500 to-green-700',
    bgGradient: 'from-emerald-50 to-green-50',
    color: 'emerald',
    description: 'Master spreadsheets, formulas, and data analysis for financial modeling',
    stats: [
      { label: 'Topics', value: '8+', icon: BookOpen },
      { label: 'Lessons', value: '25+', icon: PlayCircle },
      { label: 'Duration', value: '2.5 hrs', icon: Clock }
    ]
  },
  sql: {
    name: 'SQL',
    icon: '🗄️',
    gradient: 'from-blue-500 to-cyan-700',
    bgGradient: 'from-blue-50 to-cyan-50',
    color: 'blue',
    description: 'Query databases and manage data efficiently for financial analysis',
    stats: [
      { label: 'Topics', value: '5+', icon: BookOpen },
      { label: 'Lessons', value: '18+', icon: PlayCircle },
      { label: 'Duration', value: '1.5 hrs', icon: Clock }
    ]
  },
  powerbi: {
    name: 'Power BI',
    icon: '📈',
    gradient: 'from-orange-500 to-red-700',
    bgGradient: 'from-orange-50 to-red-50',
    color: 'orange',
    description: 'Create stunning dashboards and visualize financial data',
    stats: [
      { label: 'Topics', value: '4+', icon: BookOpen },
      { label: 'Lessons', value: '15+', icon: PlayCircle },
      { label: 'Duration', value: '1.5 hrs', icon: Clock }
    ]
  },
  python: {
    name: 'Python',
    icon: '🐍',
    gradient: 'from-violet-500 to-purple-700',
    bgGradient: 'from-violet-50 to-purple-50',
    color: 'violet',
    description: 'Automate tasks and analyze financial data with Python code',
    stats: [
      { label: 'Topics', value: '4+', icon: BookOpen },
      { label: 'Lessons', value: '16+', icon: PlayCircle },
      { label: 'Duration', value: '2 hrs', icon: Clock }
    ]
  },
  finance: {
    name: 'Finance',
    icon: '💰',
    gradient: 'from-teal-500 to-emerald-700',
    bgGradient: 'from-teal-50 to-emerald-50',
    color: 'teal',
    description: 'Understand financial statements, ratios, and analysis techniques',
    stats: [
      { label: 'Topics', value: '6+', icon: BookOpen },
      { label: 'Lessons', value: '20+', icon: PlayCircle },
      { label: 'Duration', value: '2 hrs', icon: Clock }
    ]
  }
};

const getLevelBadge = (level: string) => {
  switch(level) {
    case 'Beginner':
      return { color: 'bg-emerald-100 text-emerald-700', icon: '🌱', text: 'Beginner Friendly' };
    case 'Intermediate':
      return { color: 'bg-amber-100 text-amber-700', icon: '⚡', text: 'Intermediate' };
    case 'Advanced':
      return { color: 'bg-rose-100 text-rose-700', icon: '🔥', text: 'Advanced' };
    default:
      return { color: 'bg-gray-100 text-gray-600', icon: '📘', text: level };
  }
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const topics = getTopicsByCategory(params.category);
  const config = categoryConfig[params.category];
  
  if (topics.length === 0 || !config) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Category Specific */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-50`}></div>
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-3xl`}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Back Button */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors group mb-6"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm">Back to Learning Hub</span>
          </Link>

          {/* Category Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                {config.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {config.name}
                </h1>
                <p className="text-slate-600 max-w-lg">
                  {config.description}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-3">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <stat.icon size={14} className="text-slate-400" />
                    <span className="font-semibold text-slate-900">{stat.value}</span>
                    <span className="text-xs text-slate-500">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path Indicator */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Target size={14} className="text-[#FFD700]" />
              <span className="font-medium">Recommended learning path:</span>
              <span>Start from the top, each lesson builds on the previous one.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">All Topics</h2>
            <p className="text-slate-500 text-sm mt-1">
              {topics.length} topics • Master {config.name} step by step
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp size={12} />
            <span>Most popular first</span>
          </div>
        </div>

        {/* Topics Grid - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const levelBadge = getLevelBadge(topic.level);
            const isPopular = ['Pivot Tables', 'VLOOKUP', 'SQL Joins', 'Profit & Loss', 'Python Basics', 'Data Modeling'].includes(topic.title);
            
            return (
              <Link
                key={topic.title}
                href={`/learn/${params.category}/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block"
              >
                <div className="relative bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full text-[10px] font-medium text-amber-600">
                        <Flame size={10} />
                        Popular
                      </span>
                    </div>
                  )}
                  
                  {/* Topic Number */}
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${config.gradient} opacity-20 flex items-center justify-center text-sm font-bold text-slate-700 mb-4`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 pr-16">
                    {topic.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${levelBadge.color}`}>
                        <span>{levelBadge.icon}</span>
                        <span>{levelBadge.text}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <Clock size={10} />
                        {topic.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-[#FFD700] group-hover:gap-2 transition-all">
                      <span>Start</span>
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Progress Tracker Section */}
        <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Award size={24} className="text-[#FFD700]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Track Your Progress</h3>
                <p className="text-slate-300 text-sm">Complete topics and earn certificates</p>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Overall Progress</span>
                <span>0%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500"></div>
              </div>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition text-sm font-medium"
            >
              <Target size={14} />
              View Full Roadmap
            </Link>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={18} className="text-[#FFD700]" />
            <h3 className="text-lg font-semibold text-slate-900">Related Resources</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/roadmap"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Target size={18} className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition">Career Roadmap</h4>
                <p className="text-xs text-slate-500">Step-by-step guide to become a financial analyst</p>
              </div>
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Briefcase size={18} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 group-hover:text-emerald-600 transition">Entry-Level Jobs</h4>
                <p className="text-xs text-slate-500">Apply to fresher-friendly finance roles</p>
              </div>
            </Link>
            <Link
              href="/blogs"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <BookOpen size={18} className="text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 group-hover:text-purple-600 transition">Finance Blogs</h4>
                <p className="text-xs text-slate-500">Industry insights and interview tips</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing import
import { Briefcase } from 'lucide-react';