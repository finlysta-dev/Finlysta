'use client';

import { useState, useEffect } from 'react';
import {
  Users, Eye, MousePointerClick, FileText, Mail,
  RefreshCw, AlertCircle, UserCheck, Download,
  TrendingUp, Calendar, Activity, BookOpen, ExternalLink
} from 'lucide-react';

interface AnalyticsData {
  stats: {
    totalVisitors: number;
    totalPageViews: number;
    totalClicks: number;
    totalApplications: number;
    totalSubscribers: number;
    uniqueVisitors: number;
    todayVisitors: number;
    todayViews: number;
    todayClicks: number;
    todayApplications: number;
    uniqueSessions: number;
    totalBlogViews: number;
    totalBlogClicks: number;
  };
  dailyStats: Array<{
    date: string;
    visitors: number;
    views: number;
    clicks: number;
    applications: number;
    subscribers: number;
    blogViews: number;
    blogClicks: number;
  }>;
  mostViewed: Array<{
    id: string;
    title: string;
    company: string;
    type: string;
    views: number;
    applyClicks: number;
  }>;
  recentVisitors: Array<{
    id: string;
    sessionId: string;
    page: string;
    createdAt: string;
    ipAddress: string;
  }>;
  blogStats: Array<{
    id: string;
    title: string;
    slug: string;
    views: number;
    clicks: number;
    avgReadTime: number | null;
    ctr: number;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resetting, setResetting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [generatingTest, setGeneratingTest] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analytics/stats');
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        setError(result.error || 'Failed to load analytics');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error - please check if the API endpoint is available');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalytics = async () => {
    if (!confirm('⚠️ WARNING: This will reset ALL analytics data to zero. This action cannot be undone. Are you sure?')) {
      return;
    }
    
    setResetting(true);
    try {
      const res = await fetch('/api/analytics/reset', {
        method: 'POST',
      });
      
      if (res.ok) {
        alert('✅ Analytics data has been reset successfully!');
        await fetchAnalytics();
      } else {
        const error = await res.json();
        alert(`❌ Failed to reset: ${error.error}`);
      }
    } catch (err) {
      console.error('Reset error:', err);
      alert('❌ Network error. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  const generateTestData = async () => {
    if (!confirm('This will generate sample test data. Continue?')) {
      return;
    }
    
    setGeneratingTest(true);
    try {
      const res = await fetch('/api/analytics/test-data', {
        method: 'POST',
      });
      
      if (res.ok) {
        const result = await res.json();
        alert(result.message);
        await fetchAnalytics();
      } else {
        const error = await res.json();
        alert(`❌ Failed: ${error.error}`);
      }
    } catch (err) {
      console.error('Test data error:', err);
      alert('❌ Network error. Please try again.');
    } finally {
      setGeneratingTest(false);
    }
  };

  const exportToCSV = () => {
    if (!data) return;
    
    setExporting(true);
    
    // Prepare daily stats data
    const dailyStatsData = data.dailyStats.map(day => ({
      Date: day.date,
      Visitors: day.visitors,
      'Page Views': day.views,
      'Apply Clicks': day.clicks,
      Applications: day.applications,
      Subscribers: day.subscribers,
      'Blog Views': day.blogViews,
      'Blog Clicks': day.blogClicks,
    }));
    
    // Prepare summary stats
    const summaryStatsCSV = convertToCSV([
      { Metric: 'Total Visitors', Value: data.stats.totalVisitors },
      { Metric: 'Unique Visitors', Value: data.stats.uniqueVisitors },
      { Metric: 'Total Page Views', Value: data.stats.totalPageViews },
      { Metric: 'Total Apply Clicks', Value: data.stats.totalClicks },
      { Metric: 'Newsletter Subscribers', Value: data.stats.totalSubscribers },
      { Metric: 'Unique Sessions', Value: data.stats.uniqueSessions },
      { Metric: 'Total Blog Views', Value: data.stats.totalBlogViews },
      { Metric: 'Total Blog Clicks', Value: data.stats.totalBlogClicks },
      { Metric: "Today's Visitors", Value: data.stats.todayVisitors },
      { Metric: "Today's Page Views", Value: data.stats.todayViews },
      { Metric: "Today's Clicks", Value: data.stats.todayClicks },
    ]);
    
    const dailyStatsCSV = convertToCSV(dailyStatsData);
    
    // Prepare opportunities data
    const opportunitiesData = data.mostViewed.map(opp => ({
      Title: opp.title,
      Company: opp.company,
      Type: opp.type,
      Views: opp.views,
      'Apply Clicks': opp.applyClicks,
      'CTR': opp.views > 0 ? ((opp.applyClicks / opp.views) * 100).toFixed(1) + '%' : '0%',
    }));
    
    const opportunitiesCSV = convertToCSV(opportunitiesData);
    
    // Prepare blog data
    const blogData = data.blogStats.map(blog => ({
      Title: blog.title,
      Views: blog.views,
      Clicks: blog.clicks,
      'CTR': blog.ctr + '%',
      'Avg Read Time': blog.avgReadTime ? `${blog.avgReadTime}s` : 'N/A',
    }));
    
    const blogCSV = convertToCSV(blogData);
    
    // Download files
    downloadCSV(summaryStatsCSV, 'analytics_summary.csv');
    downloadCSV(dailyStatsCSV, 'analytics_daily_stats.csv');
    downloadCSV(opportunitiesCSV, 'analytics_opportunities.csv');
    downloadCSV(blogCSV, 'analytics_blogs.csv');
    
    setExporting(false);
    alert('✅ Analytics data exported to CSV files!');
  };
  
  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(header => JSON.stringify(obj[header] || '')).join(','));
    return [headers.join(','), ...rows].join('\n');
  };
  
  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
            <button 
              onClick={generateTestData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Generate Test Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const dailyStats = data?.dailyStats || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500">Track visitors, views, opportunities, and blog performance</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={generateTestData}
              disabled={generatingTest}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              <Activity size={16} />
              {generatingTest ? 'Generating...' : 'Generate Test Data'}
            </button>
            <button
              onClick={exportToCSV}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Download size={16} />
              {exporting ? 'Exporting...' : 'Export CSV'}
            </button>
            <button
              onClick={fetchAnalytics}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <RefreshCw size={16} className="text-gray-500" />
              <span>Refresh</span>
            </button>
            <button
              onClick={resetAnalytics}
              disabled={resetting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              <AlertCircle size={16} />
              {resetting ? 'Resetting...' : 'Reset All Data'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-blue-600" />
              </div>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalVisitors?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Total Visitors</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <UserCheck size={24} className="text-indigo-600" />
              </div>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.uniqueVisitors?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Unique Visitors</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye size={24} className="text-green-600" />
              </div>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalPageViews?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Total Page Views</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MousePointerClick size={24} className="text-purple-600" />
              </div>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalClicks?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Apply Clicks</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Mail size={24} className="text-yellow-600" />
              </div>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalSubscribers?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Subscribers</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-teal-600" />
              </div>
              <span className="text-xs text-gray-400">All Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.uniqueSessions?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Unique Sessions</p>
          </div>
        </div>

        {/* Blog Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-sm p-6 border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-orange-600" />
              </div>
              <span className="text-xs text-orange-400">Blog Analytics</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalBlogViews?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Total Blog Views</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ExternalLink size={24} className="text-purple-600" />
              </div>
              <span className="text-xs text-purple-400">Blog Analytics</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalBlogClicks?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">Total Blog Link Clicks</p>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats?.todayVisitors || 0}</p>
              <p className="text-xs text-gray-500">Visitors</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats?.todayViews || 0}</p>
              <p className="text-xs text-gray-500">Page Views</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{stats?.todayClicks || 0}</p>
              <p className="text-xs text-gray-500">Apply Clicks</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{stats?.todayApplications || 0}</p>
              <p className="text-xs text-gray-500">Applications</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-teal-600">{stats?.uniqueSessions || 0}</p>
              <p className="text-xs text-gray-500">Active Sessions</p>
            </div>
          </div>
        </div>

        {/* Daily Activity Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity (Last 7 Days)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Visitors</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Page Views</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Apply Clicks</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Subscribers</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Blog Views</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Blog Clicks</th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.map((day, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm text-gray-900">{day.date}</td>
                    <td className="py-3 px-2 text-sm text-right text-gray-600">{day.visitors}</td>
                    <td className="py-3 px-2 text-sm text-right text-gray-600">{day.views}</td>
                    <td className="py-3 px-2 text-sm text-right text-gray-600">{day.clicks}</td>
                    <td className="py-3 px-2 text-sm text-right text-gray-600">{day.subscribers}</td>
                    <td className="py-3 px-2 text-sm text-right text-gray-600">{day.blogViews}</td>
                    <td className="py-3 px-2 text-sm text-right text-gray-600">{day.blogClicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Viewed Opportunities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Viewed Opportunities</h2>
          {data?.mostViewed && data.mostViewed.length > 0 ? (
            <div className="space-y-3">
              {data.mostViewed.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.company} • {item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">{item.views} views</p>
                    <p className="text-xs text-gray-400">{item.applyClicks} clicks</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No opportunities viewed yet</p>
          )}
        </div>

        {/* Blog Analytics Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Blog Performance</h2>
          {data?.blogStats && data.blogStats.length > 0 ? (
            <div className="space-y-3">
              {data.blogStats.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{blog.title}</p>
                    <p className="text-xs text-gray-500">/{blog.slug}</p>
                  </div>
                  <div className="flex gap-4 text-right">
                    <div>
                      <p className="text-sm font-semibold text-blue-600">{blog.views} views</p>
                      <p className="text-xs text-gray-400">Views</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-600">{blog.clicks} clicks</p>
                      <p className="text-xs text-gray-400">Clicks</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600">{blog.ctr}%</p>
                      <p className="text-xs text-gray-400">CTR</p>
                    </div>
                    {blog.avgReadTime && (
                      <div>
                        <p className="text-sm font-semibold text-orange-600">{blog.avgReadTime}s</p>
                        <p className="text-xs text-gray-400">Avg Read</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No blog data yet</p>
          )}
        </div>

        {/* Recent Visitors */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Visitors</h2>
          {data?.recentVisitors && data.recentVisitors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Time</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Page</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">IP Address</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Session ID</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentVisitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm text-gray-600">
                        {new Date(visitor.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600">{visitor.page}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{visitor.ipAddress || 'N/A'}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{visitor.sessionId?.substring(0, 15)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No visitors yet</p>
          )}
        </div>
      </div>
    </div>
  );
}