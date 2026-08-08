'use client';

import { useState, useEffect } from 'react';
import {
  Users, Eye, MousePointerClick, MessageSquare, Star, Activity,
  RefreshCw, AlertCircle, LogOut, Shield, Lock, Key,
  Globe, Clock, BookOpen, TrendingUp, BarChart3,
  X, CheckCircle, Archive, Trash2,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';

// ===== AUTHENTICATION =====
function LoginScreen({ onLogin }: { onLogin: (password: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('admin_token', data.token);
        sessionStorage.setItem('admin_authenticated', 'true');
        onLogin(password);
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/25">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Hub</h1>
          <p className="text-blue-200/70">Secure Dashboard Access</p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()} placeholder="Enter admin password"
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all" />
          </div>
          {error && <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-3 text-red-200 text-sm flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
          <button onClick={handleLogin} disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <Key size={18} />}
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </div>
        <p className="text-center text-blue-300/30 text-xs mt-6">🔒 Protected · Finlysta Analytics</p>
      </div>
    </div>
  );
}

// ===== CHART COMPONENTS =====
function DonutChart({ data, title }: { data: Record<string, number>; title: string }) {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  let cumulative = 0;
  const segments = Object.entries(data).filter(([, v]) => v > 0).map(([key, value], i) => {
    const start = cumulative;
    cumulative += (value / total) * 360;
    return { key, value, start, end: cumulative, color: colors[i % colors.length] };
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {segments.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No data available</p>
      ) : (
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 100 100" className="w-32 h-32">
            {segments.map((seg, i) => {
              const startAngle = (seg.start - 90) * Math.PI / 180;
              const endAngle = (seg.end - 90) * Math.PI / 180;
              const x1 = 50 + 35 * Math.cos(startAngle);
              const y1 = 50 + 35 * Math.sin(startAngle);
              const x2 = 50 + 35 * Math.cos(endAngle);
              const y2 = 50 + 35 * Math.sin(endAngle);
              const largeArc = seg.end - seg.start > 180 ? 1 : 0;
              return <path key={i} d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={seg.color} />;
            })}
            <circle cx="50" cy="50" r="22" fill="white" />
            <text x="50" y="50" textAnchor="middle" dy="5" className="text-sm font-bold fill-gray-900">{total}</text>
          </svg>
          <div className="space-y-2 flex-1">
            {segments.map((seg, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }}></div>
                <span className="text-sm text-gray-600 truncate">{seg.key}</span>
                <span className="text-sm font-semibold ml-auto">{((seg.value / total) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BarChartHorizontal({ data, title, color }: { data: Record<string, number>; title: string; color: string }) {
  const entries = Object.entries(data).filter(([key]) => 
    key && key !== 'direct' && !key.includes('localhost') && !key.includes('127.0.0.1')
  );
  const maxValue = Math.max(...entries.map(([, v]) => v), 1);
  
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500', green: 'bg-green-500', purple: 'bg-purple-500',
    amber: 'bg-amber-500', red: 'bg-red-500', teal: 'bg-teal-500',
    indigo: 'bg-indigo-500', pink: 'bg-pink-500',
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {entries.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No data available</p>
      ) : (
        <div className="space-y-3">
          {entries.slice(0, 10).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-24 truncate" title={key}>{key}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-6 rounded-full ${colorMap[color] || 'bg-gray-800'} flex items-center justify-end px-2 transition-all duration-700`}
                  style={{ width: `${Math.max((value / maxValue) * 100, 3)}%` }}
                >
                  <span className="text-xs text-white font-medium">{value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== INTERFACES =====
interface AnalyticsData {
  stats: any;
  dailyStats: Array<any>;
  recentVisitors: Array<any>;
  referrers: Array<{ source: string; count: number }>;
  topPages: Array<{ page: string; views: number }>;
  feedback?: any;
  devices?: Record<string, number>;
  browsers?: Record<string, number>;
  countries?: Record<string, number>;
  cities?: Record<string, number>;
  hourlyTraffic?: Record<number, number>;
  osStats?: Record<string, number>;
  screenSizes?: Record<string, number>;
  blogAnalytics?: any;
}

interface FeedbackItem {
  id: string; name: string; rating: number; comment: string;
  page: string; status: string; device?: string; createdAt: string;
}

// ===== MAIN COMPONENT =====
export default function AnalyticsDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [feedbackRatingFilter, setFeedbackRatingFilter] = useState<number | null>(null);
  const [feedbackData, setFeedbackData] = useState<{
    data: FeedbackItem[]; total: number; averageRating: number;
  }>({ data: [], total: 0, averageRating: 0 });

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!authenticated || !autoRefresh) return;
    const interval = setInterval(() => { fetchAnalytics(); setLastRefresh(new Date()); }, 120000);
    return () => clearInterval(interval);
  }, [authenticated, autoRefresh]);

  useEffect(() => {
    if (authenticated) { fetchAnalytics(); setLastRefresh(new Date()); }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && activeTab === 'feedback') fetchFeedback();
  }, [authenticated, activeTab, feedbackFilter, feedbackRatingFilter]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_token');
    setAuthenticated(false);
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics/stats');
      const result = await res.json();
      if (res.ok) setData(result);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchFeedback = async () => {
    try {
      let url = '/api/analytics/feedback?limit=50';
      if (feedbackFilter !== 'all') url += `&status=${feedbackFilter}`;
      if (feedbackRatingFilter) url += `&rating=${feedbackRatingFilter}`;
      const res = await fetch(url);
      const result = await res.json();
      if (res.ok) setFeedbackData({
        data: result.data || [], total: result.total || 0, averageRating: result.averageRating || 0,
      });
    } catch (err) { console.error(err); }
  };

  const updateFeedbackStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/analytics/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchFeedback(); fetchAnalytics();
    } catch (err) { console.error(err); }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Delete permanently?')) return;
    try {
      await fetch(`/api/analytics/feedback?id=${id}`, { method: 'DELETE' });
      fetchFeedback(); fetchAnalytics();
    } catch (err) { console.error(err); }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-100 text-blue-700', REVIEWED: 'bg-yellow-100 text-yellow-700',
      RESPONDED: 'bg-green-100 text-green-700', ARCHIVED: 'bg-gray-100 text-gray-700',
      FLAGGED: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} size={14} className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
      ))}
    </div>
  );

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw size={40} className="text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const blogData = data?.blogAnalytics;

  const filteredReferrers = (data?.referrers || []).filter((r: any) => 
    r.source && !r.source.includes('localhost') && !r.source.includes('127.0.0.1')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Finlysta Analytics</h1>
              <p className="text-xs text-gray-400">Last refresh: {lastRefresh.toLocaleTimeString()}{autoRefresh && ' · Auto 2min'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAutoRefresh(!autoRefresh)} className={`p-2 rounded-lg text-xs ${autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {autoRefresh ? 'Auto ON' : 'Auto OFF'}
            </button>
            <button onClick={() => { fetchAnalytics(); setLastRefresh(new Date()); }} className="p-2 rounded-lg hover:bg-gray-100">
              <RefreshCw size={16} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm">
              <LogOut size={14} /> Exit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'demographics', label: 'Demographics', icon: Users },
            { id: 'feedback', label: 'Feedback', icon: MessageSquare },
            { id: 'blogs', label: 'Blogs', icon: BookOpen },
            { id: 'traffic', label: 'Traffic', icon: Activity },
            { id: 'visitors', label: 'Visitors', icon: Eye },
            { id: 'geo', label: 'Geography', icon: Globe },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'text-gray-500 hover:bg-gray-100'
              }`}>
              <tab.icon size={16} />{tab.label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW ===== */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {[
                { label: 'Total Visitors', value: (stats.totalVisitors || 0).toLocaleString(), icon: Users, color: 'blue' },
                { label: 'Page Views', value: (stats.totalPageViews || 0).toLocaleString(), icon: Eye, color: 'green' },
                { label: 'Apply Clicks', value: (stats.totalClicks || 0).toLocaleString(), icon: MousePointerClick, color: 'purple' },
                { label: 'Feedback', value: (stats.totalFeedback || 0).toLocaleString(), icon: MessageSquare, color: 'amber' },
                { label: 'Avg Rating', value: `${stats.averageRating || 0}⭐`, icon: Star, color: 'yellow' },
                { label: 'Sessions', value: (stats.uniqueSessions || 0).toLocaleString(), icon: Activity, color: 'teal' },
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 bg-${kpi.color}-50 rounded-xl flex items-center justify-center mb-3`}>
                    <kpi.icon size={20} className={`text-${kpi.color}-500`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DonutChart data={data?.devices || {}} title="📱 Device Distribution" />
              <DonutChart data={data?.browsers || {}} title="🌐 Browser Distribution" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <BarChartHorizontal data={data?.countries || {}} title="🌍 Top Countries" color="blue" />
              <BarChartHorizontal data={data?.osStats || {}} title="💻 Operating Systems" color="purple" />
              <BarChartHorizontal 
                data={(data?.topPages || []).reduce((acc: any, p: any) => ({ ...acc, [p.page]: p.views }), {})} 
                title="📄 Top Pages" color="green" />
            </div>
          </>
        )}

        {/* ===== DEMOGRAPHICS ===== */}
        {activeTab === 'demographics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DonutChart data={data?.devices || {}} title="📱 Devices" />
            <DonutChart data={data?.browsers || {}} title="🌐 Browsers" />
            <BarChartHorizontal data={data?.osStats || {}} title="💻 Operating Systems" color="blue" />
            <BarChartHorizontal data={data?.screenSizes || {}} title="📐 Screen Resolutions" color="purple" />
            <BarChartHorizontal data={data?.countries || {}} title="🌍 Top Countries" color="green" />
            <BarChartHorizontal 
              data={filteredReferrers.reduce((acc: any, r: any) => ({ ...acc, [r.source]: r.count }), {})} 
              title="🔗 Referrers" color="amber" />
          </div>
        )}

        {/* ===== FEEDBACK ===== */}
        {activeTab === 'feedback' && (
          <div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex flex-wrap gap-3 items-center">
              <div className="flex gap-1">
                {['all', 'NEW', 'REVIEWED', 'RESPONDED', 'ARCHIVED'].map(status => (
                  <button key={status} onClick={() => setFeedbackFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${feedbackFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {status === 'all' ? 'All' : status}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {[null, 5, 4, 3, 2, 1].map(rating => (
                  <button key={rating === null ? 'all' : rating} onClick={() => setFeedbackRatingFilter(rating)}
                    className={`px-2 py-1 rounded text-xs ${feedbackRatingFilter === rating ? 'bg-amber-100 text-amber-700' : 'hover:bg-gray-100 text-gray-500'}`}>
                    {rating === null ? 'All' : `${rating}⭐`}
                  </button>
                ))}
              </div>
              <span className="ml-auto text-sm text-gray-500">{feedbackData.total} feedback · {feedbackData.averageRating}⭐ avg</span>
            </div>
            <div className="space-y-3">
              {feedbackData.data.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center"><MessageSquare size={48} className="text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No feedback yet</p></div>
              ) : (
                feedbackData.data.map((fb: FeedbackItem) => (
                  <div key={fb.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-gray-900">{fb.name}</span>
                          {renderStars(fb.rating)}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(fb.status)}`}>{fb.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{fb.comment}</p>
                        <div className="flex gap-3 text-xs text-gray-400 flex-wrap">
                          <span>📄 {fb.page}</span><span>🕐 {new Date(fb.createdAt).toLocaleString()}</span>
                          {fb.device && <span>📱 {fb.device}</span>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {fb.status === 'NEW' && <button onClick={() => updateFeedbackStatus(fb.id, 'REVIEWED')} className="p-1.5 hover:bg-yellow-100 rounded text-yellow-600"><CheckCircle size={14} /></button>}
                        <button onClick={() => updateFeedbackStatus(fb.id, 'ARCHIVED')} className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><Archive size={14} /></button>
                        <button onClick={() => deleteFeedback(fb.id)} className="p-1.5 hover:bg-red-100 rounded text-red-400"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ===== BLOGS ===== */}
        {activeTab === 'blogs' && (
          <div>
            {!blogData || (!blogData.stats?.length && !blogData.totalViews) ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <BookOpen size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No blog analytics data available yet</p>
                <p className="text-sm text-gray-400 mt-1">Blog views and clicks will appear here once tracked</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Blog Views', value: (blogData.totalViews || 0).toLocaleString(), icon: Eye, color: 'blue' },
                    { label: 'Clicks', value: (blogData.totalClicks || 0).toLocaleString(), icon: MousePointerClick, color: 'purple' },
                    { label: 'Avg Read Time', value: `${Math.floor((blogData.avgReadTime || 0) / 60)}m ${(blogData.avgReadTime || 0) % 60}s`, icon: Clock, color: 'orange' },
                    { label: 'CTR', value: `${blogData.ctr || 0}%`, icon: TrendingUpIcon, color: 'green' },
                  ].map((kpi, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className={`w-10 h-10 bg-${kpi.color}-50 rounded-xl flex items-center justify-center mb-3`}>
                        <kpi.icon size={20} className={`text-${kpi.color}-500`} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <p className="text-sm text-gray-500">{kpi.label}</p>
                    </div>
                  ))}
                </div>
                {blogData.stats?.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
                    <h3 className="font-semibold text-gray-900 mb-4">📝 Blog Performance</h3>
                    <table className="w-full text-sm">
                      <thead><tr className="border-b"><th className="text-left py-3 px-2">Title</th><th className="text-right py-3 px-2">Views</th><th className="text-right py-3 px-2">Clicks</th><th className="text-right py-3 px-2">CTR</th><th className="text-right py-3 px-2">Read Time</th><th className="text-right py-3 px-2">Category</th></tr></thead>
                      <tbody>
                        {blogData.stats.map((blog: any) => (
                          <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-3 px-2"><p className="font-medium">{blog.title}</p><p className="text-xs text-gray-400">/{blog.slug}</p></td>
                            <td className="py-3 px-2 text-right font-semibold text-blue-600">{blog.totalViews || 0}</td>
                            <td className="py-3 px-2 text-right font-semibold text-purple-600">{blog.totalClicks || 0}</td>
                            <td className="py-3 px-2 text-right"><span className={`font-semibold ${(blog.ctr || 0) > 5 ? 'text-green-600' : 'text-yellow-600'}`}>{blog.ctr || 0}%</span></td>
                            <td className="py-3 px-2 text-right text-gray-500">{blog.avgReadTime ? `${Math.floor(blog.avgReadTime / 60)}m ${blog.avgReadTime % 60}s` : 'N/A'}</td>
                            <td className="py-3 px-2 text-right"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{blog.category || 'General'}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <BarChartHorizontal data={(blogData.categoryStats || []).reduce((acc: any, c: any) => ({ ...acc, [c.category]: c.views }), {})} title="📂 Categories" color="blue" />
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">👁️ Recent Readers</h3>
                    {(blogData.recentReaders || []).length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No readers yet</p>
                    ) : (
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {(blogData.recentReaders || []).slice(0, 10).map((reader: any) => (
                          <div key={reader.id} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium truncate">{reader.blogTitle}</p>
                            <div className="flex gap-3 text-xs text-gray-500 mt-1">
                              <span>🕐 {reader.readTime ? `${reader.readTime}s` : 'N/A'}</span>
                              <span>🌐 {reader.ipAddress || 'Unknown'}</span>
                              <span>{new Date(reader.viewedAt).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== TRAFFIC ===== */}
        {activeTab === 'traffic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">📈 Daily Traffic (7 Days)</h3>
              <div className="space-y-3">
                {(data?.dailyStats || []).map((day: any) => {
                  const max = Math.max(...(data?.dailyStats || []).map((d: any) => d.visitors), 1);
                  return (
                    <div key={day.date} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-20">{day.date.slice(5)}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-6">
                        <div className="bg-gray-800 h-6 rounded-full flex items-center justify-end px-2 transition-all" 
                          style={{ width: `${(day.visitors / max) * 100}%` }}>
                          <span className="text-xs text-white font-medium">{day.visitors}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <BarChartHorizontal data={(data?.topPages || []).reduce((acc: any, p: any) => ({ ...acc, [p.page]: p.views }), {})} title="📄 Top Pages" color="blue" />
            <BarChartHorizontal data={filteredReferrers.reduce((acc: any, r: any) => ({ ...acc, [r.source]: r.count }), {})} title="🔗 Top Referrers" color="green" />
          </div>
        )}

        {/* ===== VISITORS ===== */}
        {activeTab === 'visitors' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">👥 Recent Visitors</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-3 px-2">Time</th><th className="text-left py-3 px-2">Page</th><th className="text-left py-3 px-2">IP</th><th className="text-left py-3 px-2">Device</th></tr></thead>
                <tbody>
                  {(data?.recentVisitors || []).slice(0, 20).map((v: any) => (
                    <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-600">{new Date(v.createdAt).toLocaleTimeString()}</td>
                      <td className="py-3 px-2 max-w-[200px] truncate text-gray-600">{v.page}</td>
                      <td className="py-3 px-2 text-gray-500 text-xs">{v.ipAddress || 'N/A'}</td>
                      <td className="py-3 px-2 text-gray-500">{v.deviceType || 'Desktop'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== GEOGRAPHY ===== */}
        {activeTab === 'geo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartHorizontal data={data?.countries || {}} title="🌍 Top Countries" color="blue" />
            <BarChartHorizontal data={data?.cities || {}} title="🏙️ Top Cities" color="purple" />
          </div>
        )}
      </div>
    </div>
  );
}
