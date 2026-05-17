import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicsByCategory, getAllCategories } from '@/lib/topics-data';
import { 
  Clock, ChevronRight, BookOpen, Sparkles, Target, 
  TrendingUp, FileSpreadsheet, BarChart3, Landmark, 
  MessageCircle, PieChart, Play, Zap, GraduationCap
} from 'lucide-react';

export async function generateStaticParams() {
  const categories = getAllCategories();
  // Filter to only finance-focused categories
  const financeCategories = categories.filter(cat => 
    ['finance', 'excel', 'financial-analysis', 'financial-reporting', 'powerbi', 'business-communication'].includes(cat)
  );
  return financeCategories.map(category => ({ category }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const topics = getTopicsByCategory(params.category);
  
  if (topics.length === 0) {
    notFound();
  }
  
  // Category configuration with proper colors and icons
  const categoryConfig: Record<string, any> = {
    'finance': {
      name: 'Finance Fundamentals',
      icon: Landmark,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50/80 to-teal-50/80',
      description: 'Master core finance concepts, statements, and forecasting techniques',
      color: 'emerald'
    },
    'excel': {
      name: 'Advanced Excel',
      icon: FileSpreadsheet,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50/80 to-indigo-50/80',
      description: 'Master spreadsheets for financial analysis and data manipulation',
      color: 'blue'
    },
    'financial-analysis': {
      name: 'Financial Analysis',
      icon: TrendingUp,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50/80 to-orange-50/80',
      description: 'Analyze data, interpret ratios, and make informed decisions',
      color: 'amber'
    },
    'financial-reporting': {
      name: 'Financial Reporting',
      icon: PieChart,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50/80 to-blue-50/80',
      description: 'Create professional financial reports and dashboards',
      color: 'cyan'
    },
    'powerbi': {
      name: 'Power BI',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/80 to-red-50/80',
      description: 'Create stunning dashboards and data visualizations',
      color: 'orange'
    },
    'business-communication': {
      name: 'Business Communication',
      icon: MessageCircle,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80',
      description: 'Master finance communication, reports, and presentations',
      color: 'purple'
    }
  };

  const config = categoryConfig[params.category] || {
    name: params.category,
    icon: BookOpen,
    gradient: 'from-slate-500 to-slate-600',
    bgGradient: 'from-slate-50/80 to-slate-100/80',
    description: `Master ${params.category} for finance careers`,
    color: 'slate'
  };

  const Icon = config.icon;

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Intermediate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Advanced': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch(level) {
      case 'Beginner': return '🌱';
      case 'Intermediate': return '📈';
      case 'Advanced': return '🚀';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${config.gradient} text-white`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize">
                {config.name}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Build in-demand skills for your finance career
              </p>
            </div>
          </div>
          <p className="text-white/90 text-base max-w-2xl mt-2">
            {config.description}
          </p>
        </div>
      </div>
      
      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-full px-4 py-1.5 mb-3">
            <Sparkles size={14} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-[#0A2540]">Learning Path</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-2">
            All {config.name} Topics
          </h2>
          <p className="text-[#64748B] text-sm max-w-2xl mx-auto">
            Choose a topic to start learning. Each lesson takes 10-20 minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, idx) => {
            const levelColor = getLevelColor(topic.level);
            const levelIcon = getLevelIcon(topic.level);
            
            return (
              <Link
                key={topic.title}
                href={`/learn/${params.category}/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block"
              >
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-[#FFD700]/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Topic Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.bgGradient} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    {topic.icon ? (
                      <topic.icon size={20} className={`text-${config.color}-600`} />
                    ) : (
                      <BookOpen size={20} className={`text-${config.color}-600`} />
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-[#FFD700] transition-colors mb-2">
                    {topic.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#64748B] text-sm mb-4 line-clamp-2">
                    {topic.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 text-[#64748B]">
                        <Clock size={12} />
                        {topic.duration}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${levelColor}`}>
                        <span>{levelIcon}</span>
                        <span>{topic.level}</span>
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-[#0A2540] transition-all duration-300">
                      <ChevronRight size={14} className="text-[#64748B] group-hover:text-[#0A2540]" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#FFD700] text-[#0A2540] font-semibold rounded-xl hover:bg-[#FFD700] transition-all duration-300"
          >
            <GraduationCap size={18} />
            Back to All Categories
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}