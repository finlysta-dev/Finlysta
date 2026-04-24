"use client";

import { useState, useEffect } from 'react';
import { Eye, TrendingUp, Briefcase, Calendar } from 'lucide-react';

interface OpportunityStats {
  id: string;
  title: string;
  company: string;
  type: string;
  views: number;
  applyClicks: number;
  createdAt: string;
}

export default function AdminViewsPage() {
  const [opportunities, setOpportunities] = useState<OpportunityStats[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/opportunities/stats');
      const data = await res.json();
      setOpportunities(data.opportunities);
      setTotalViews(data.totalViews);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">View Analytics</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">{opportunities.length}</div>
                <div className="text-gray-600 text-sm">Total Opportunities</div>
              </div>
              <Briefcase size={32} className="text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">{totalViews}</div>
                <div className="text-gray-600 text-sm">Total Views</div>
              </div>
              <Eye size={32} className="text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {opportunities.reduce((sum, opp) => sum + opp.applyClicks, 0)}
                </div>
                <div className="text-gray-600 text-sm">Apply Clicks</div>
              </div>
              <TrendingUp size={32} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Opportunities Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Opportunity Views</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apply Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{opp.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{opp.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        opp.type === 'job' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {opp.type === 'job' ? 'Job' : 'Internship'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{opp.views}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{opp.applyClicks}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {opp.views > 0 ? ((opp.applyClicks / opp.views) * 100).toFixed(1) : 0}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(opp.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
