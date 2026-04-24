import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicsByCategory, getAllCategories } from '@/lib/topics-data';
import { Clock, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(category => ({ category }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const topics = getTopicsByCategory(params.category);
  
  if (topics.length === 0) {
    notFound();
  }
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'excel': return 'from-green-500 to-green-600';
      case 'sql': return 'from-cyan-500 to-cyan-600';
      case 'finance': return 'from-emerald-500 to-emerald-600';
      case 'powerbi': return 'from-orange-500 to-orange-600';
      case 'python': return 'from-purple-500 to-purple-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold capitalize mb-2">{params.category}</h1>
          <p className="text-slate-300">Master {params.category} for financial analysis</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={`/learn/${params.category}/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block"
            >
              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition mb-2">
                  {topic.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {topic.duration}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      topic.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                      topic.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {topic.level}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}