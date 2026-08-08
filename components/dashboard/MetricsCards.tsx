'use client';

import { 
  Users, 
  User, 
  Eye, 
  MousePointerClick, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  CalendarPlus 
} from 'lucide-react';

interface MetricsProps {
  metrics: {
    totalVisitors: number;
    uniqueVisitors: number;
    jobViews: number;
    applyClicks: number;
    activeJobs: number;
    activeInternships: number;
    totalOpportunities: number;
    addedToday: number;
    addedThisWeek: number;
  };
}

export default function MetricsCards({ metrics }: MetricsProps) {
  const cards = [
    {
      title: 'Total Visitors',
      value: metrics.totalVisitors.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Unique Visitors',
      value: metrics.uniqueVisitors.toLocaleString(),
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Job Views',
      value: metrics.jobViews.toLocaleString(),
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Apply Clicks',
      value: metrics.applyClicks.toLocaleString(),
      icon: MousePointerClick,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Active Jobs',
      value: metrics.activeJobs.toLocaleString(),
      icon: Briefcase,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Active Internships',
      value: metrics.activeInternships.toLocaleString(),
      icon: GraduationCap,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Total Opportunities',
      value: metrics.totalOpportunities.toLocaleString(),
      icon: FileText,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Added This Week',
      value: metrics.addedThisWeek.toLocaleString(),
      icon: CalendarPlus,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div 
            key={card.title}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{card.title}</span>
              <div className={`${card.bgColor} p-2.5 rounded-xl`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}