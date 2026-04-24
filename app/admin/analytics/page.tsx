"use client";

import { useState, useEffect } from "react";
import { Eye, Users, Calendar, TrendingUp, Briefcase, MousePointer } from "lucide-react";

interface VisitorStats {
  totalVisitors: number;
  totalViews: number;
  todayVisitors: number;
  todayViews: number;
  uniqueSessions: number;
}

interface OpportunityStats {
  id: string;
  title: string;
  company: string;
  type: string;
  views: number;
  applyClicks: number;
}

interface DailyStat {
  id: string;
  date: string;
  totalVisitors: number;
  totalViews: number;
  totalClicks: number;
  newSubscribers: number;
}

export default function AdminAnalytics() {
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunityStats[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, oppRes, dailyRes, visitorsRes] = await Promise.all([
        fetch('/api/admin/visitor-stats'),
        fetch('/api/admin/opportunities/stats'),
        fetch('/api/admin/daily-stats'),
        fetch('/api/admin/recent-visitors'),
      ]);

      const stats = await statsRes.json();
      const opportunities = await oppRes.json();
      const daily = await dailyRes.json();
      const visitors = await visitorsRes.json();

      setVisitorStats(stats);
      setOpportunities(opportunities.opportunities || []);
      setDailyStats(daily);
      setRecentVisitors(visitors);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Track visitors, views, and opportunity performance</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{visitorStats?.totalVisitors || 0}</p>
              </div>
              <Users size={32} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Page Views</p>
                <p className="text-3xl font-bold text-gray-900">{visitorStats?.totalViews || 0}</p>
              </div>
              <Eye size={32} className="text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{visitorStats?.todayVisitors || 0}</p>
              </div>
              <Calendar size={32} className="text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unique Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{visitorStats?.uniqueSessions || 0}</p>
              </div>
              <TrendingUp size={32} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Daily Stats Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Daily Activity</h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Visitors</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Page Views</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Apply Clicks</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Subscribers</th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.map((stat) => (
                  <tr key={stat.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{new Date(stat.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{stat.totalVisitors}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{stat.totalViews}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{stat.totalClicks}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{stat.newSubscribers}</td>
                  </tr>
                ))}
                {dailyStats.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No data yet. Visit your website to generate stats.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Opportunities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Most Viewed Opportunities</h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Apply Clicks</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.slice(0, 10).map((opp) => (
                  <tr key={opp.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{opp.title}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{opp.company}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        opp.type === 'job' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {opp.type === 'job' ? 'Job' : 'Internship'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-blue-600">{opp.views}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{opp.applyClicks}</td>
                  </tr>
                ))}
                {opportunities.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No opportunities found. Add some jobs/internships first.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Visitors</h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Page</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">IP Address</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Session</th>
                </tr>
              </thead>
              <tbody>
                {recentVisitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(visitor.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{visitor.page}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{visitor.ipAddress || 'Unknown'}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{visitor.sessionId?.substring(0, 15)}...</td>
                  </tr>
                ))}
                {recentVisitors.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No visitors yet. Visit your website to see data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
