"use client";

import { useState, useEffect } from "react";
import { Eye, Users, Calendar, TrendingUp, Lock } from "lucide-react";

// Secret key - change this to your own secret
const SECRET_KEY = "finlysta123";

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

export default function AnalyticsPage({ params }: { params: { slug: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunityStats[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the URL contains the secret key
  useEffect(() => {
    const slug = params.slug;
    if (slug === SECRET_KEY) {
      setIsAuthenticated(true);
      fetchAllData();
    } else if (slug && slug !== SECRET_KEY) {
      setIsAuthenticated(false);
      setError("Invalid access key");
    }
  }, [params.slug]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_KEY) {
      setIsAuthenticated(true);
      fetchAllData();
      setError(null);
    } else {
      setError("Wrong secret key! Access denied.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching analytics data...');
      
      const statsRes = await fetch('/api/track');
      const stats = await statsRes.json();
      
      const dailyRes = await fetch('/api/daily-stats');
      const daily = await dailyRes.json();
      
      const oppRes = await fetch('/api/opportunities/stats');
      const opportunitiesData = await oppRes.json();
      
      const visitorsRes = await fetch('/api/recent-visitors');
      const visitors = await visitorsRes.json();

      setVisitorStats({
        totalVisitors: stats.totalVisitors || 0,
        totalViews: stats.totalViews || 0,
        todayVisitors: stats.todayVisitors || 0,
        todayViews: stats.todayViews || 0,
        uniqueSessions: stats.uniqueSessions || 0
      });
      
      setDailyStats(daily || []);
      setOpportunities(opportunitiesData.opportunities || []);
      setRecentVisitors(visitors || []);
      
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError("Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock size={48} className="mx-auto text-red-500 mb-3" />
            <h1 className="text-2xl font-bold text-gray-900">Analytics Access Restricted</h1>
            <p className="text-gray-500 text-sm mt-1">This page is for authorized administrators only</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter administrator key"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Access Analytics
            </button>
          </form>
          
          <p className="text-xs text-gray-400 text-center mt-4">
            ⚠️ Unauthorized access is prohibited
          </p>
        </div>
      </div>
    );
  }

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Track visitors, views, and opportunity performance</p>
          </div>
          <div className="text-sm text-gray-400">Admin Mode</div>
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

        {/* Daily Stats Table */}
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}