'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Download, Calendar, ChevronDown, LogIn, LogOut, User, Clock, TrendingUp, Users, Eye, MousePointerClick, Briefcase, GraduationCap, FileText, CalendarPlus, Shield, ShieldOff } from 'lucide-react';
import MetricsCards from '@/components/dashboard/MetricsCards';
import TopJobsTables from '@/components/dashboard/TopJobsTables';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import LoginModal from '@/components/dashboard/LoginModal';
import { exportToExcel } from '@/lib/export-to-excel';

interface DashboardData {
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
  topViewedJobs: any[];
  topAppliedJobs: any[];
  dailyMetrics?: any[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [nextRefreshTime, setNextRefreshTime] = useState<Date | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);

  // Refresh schedule: 5min, 15min, 30min, 1hr, 1.5hr, 2hr, 3hr, 4hr, 5hr, 6hr, 8hr, 12hr
  const refreshSchedule = [5, 15, 30, 60, 90, 120, 180, 240, 300, 360, 480, 720];
  const maxRefreshesPerDay = 50;

  const fetchData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setIsRefreshing(true);
        // Increment refresh count
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('refreshDate');
        const storedCount = parseInt(localStorage.getItem('refreshCount') || '0');
        
        if (storedDate === today) {
          if (storedCount >= maxRefreshesPerDay) {
            alert(`You've reached the maximum of ${maxRefreshesPerDay} manual refreshes per day.`);
            setIsRefreshing(false);
            return;
          }
          localStorage.setItem('refreshCount', String(storedCount + 1));
        } else {
          localStorage.setItem('refreshDate', today);
          localStorage.setItem('refreshCount', '1');
        }
        setRefreshCount(storedCount + 1);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString());
      if (endDate) params.append('endDate', endDate.toISOString());

      const response = await fetch(`/api/analytics?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
      
      // Schedule next refresh
      scheduleNextRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Dashboard error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const scheduleNextRefresh = () => {
    const currentCount = parseInt(localStorage.getItem('refreshCount') || '0');
    const scheduleIndex = Math.min(currentCount, refreshSchedule.length - 1);
    const minutes = refreshSchedule[scheduleIndex] || 30;
    
    const nextTime = new Date();
    nextTime.setMinutes(nextTime.getMinutes() + minutes);
    setNextRefreshTime(nextTime);
  };

  useEffect(() => {
    // Check login status
    const checkLogin = localStorage.getItem('dashboardAuth') === 'true';
    setIsLoggedIn(checkLogin);
    if (checkLogin) {
      fetchData();
    } else {
      setIsLoading(false);
    }

    // Save refresh state to localStorage to persist on page reload
    const savedAutoRefresh = localStorage.getItem('autoRefreshEnabled') === 'true';
    setAutoRefreshEnabled(savedAutoRefresh);
  }, []);

  // Auto-refresh timer
  useEffect(() => {
    if (!autoRefreshEnabled || !isLoggedIn) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      if (nextRefreshTime && now >= nextRefreshTime) {
        fetchData(true);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [autoRefreshEnabled, nextRefreshTime, isLoggedIn]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleLogin = (code: string) => {
    const validCode = 'FINLYSTA2024';
    if (code === validCode) {
      localStorage.setItem('dashboardAuth', 'true');
      setIsLoggedIn(true);
      setShowLogin(false);
      fetchData();
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dashboardAuth');
    localStorage.removeItem('autoRefreshEnabled');
    setIsLoggedIn(false);
    setData(null);
    setAutoRefreshEnabled(false);
  };

  const handleExport = () => {
    if (!data) return;
    exportToExcel(data, startDate, endDate);
  };

  const toggleAutoRefresh = () => {
    const newState = !autoRefreshEnabled;
    setAutoRefreshEnabled(newState);
    localStorage.setItem('autoRefreshEnabled', String(newState));
    if (newState) {
      scheduleNextRefresh();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getRefreshCount = () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('refreshDate');
    if (storedDate !== today) return 0;
    return parseInt(localStorage.getItem('refreshCount') || '0');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <LoginModal onLogin={handleLogin} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRefresh}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const remainingRefreshes = maxRefreshesPerDay - getRefreshCount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                F
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  Last updated: {formatTime(lastUpdated)}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Refresh Count */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                <Clock size={14} className="text-blue-500" />
                <span className="font-medium">{remainingRefreshes}</span>
                <span className="text-gray-400">refreshes left</span>
              </div>

              {/* Auto Refresh Toggle */}
              <button
                onClick={toggleAutoRefresh}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  autoRefreshEnabled 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 ring-2 ring-green-400/50' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <RefreshCw size={14} className={autoRefreshEnabled ? 'animate-spin' : ''} />
                {autoRefreshEnabled ? 'Auto ON' : 'Auto OFF'}
              </button>

              {/* Date Range */}
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onApply={() => fetchData()}
              />

              {/* Export */}
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs font-medium shadow-sm shadow-green-500/20"
              >
                <Download size={15} />
                Export
              </button>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || remainingRefreshes <= 0}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-blue-500/20"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                {isRefreshing ? '...' : 'Refresh'}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition text-xs font-medium"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Metrics Cards */}
        <div className="mb-8">
          <MetricsCards metrics={data.metrics} />
        </div>

        {/* Next Refresh Info */}
        {autoRefreshEnabled && nextRefreshTime && (
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 py-2.5 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2 text-blue-700">
              <RefreshCw size={14} className="animate-spin" />
              <span className="font-medium">Next auto-refresh:</span>
            </div>
            <span className="font-semibold text-gray-800">{formatTime(nextRefreshTime)}</span>
            <span className="text-xs text-gray-500">
              (Schedule: {refreshSchedule.map(m => m < 60 ? `${m}m` : `${m/60}h`).join(', ')})
            </span>
            <button
              onClick={toggleAutoRefresh}
              className="ml-auto text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Turn Off
            </button>
          </div>
        )}

        {/* Top Jobs Tables */}
        <div className="mb-8">
          <TopJobsTables 
            topViewed={data.topViewedJobs} 
            topApplied={data.topAppliedJobs} 
          />
        </div>

        {/* Day-wise Tracking */}
        {data.dailyMetrics && data.dailyMetrics.length > 0 && (
          <div className="mb-8">
            <DailyMetricsTable metrics={data.dailyMetrics} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-md text-black-400 border-t border-gray-200 pt-6">
          <p>Data updates automatically when users interact with the site</p>
          <p className="mt-1 text-xs">
            <span className="font-large text-black-500">{getRefreshCount()}</span> of <span className="font-large text-black-500">{maxRefreshesPerDay}</span> manual refreshes used today
          </p>
          <p className="mt-2 text-md text-black-400">
            Auto-refresh schedule: {refreshSchedule.map(m => m < 60 ? `${m}m` : `${m/60}h`).join(' → ')}
          </p>
        </div>
      </main>
    </div>
  );
}

// Daily Metrics Table Component - Center aligned with improved UI
function DailyMetricsTable({ metrics }: { metrics: any[] }) {
  // Ensure we're showing the latest data
  const sortedMetrics = [...metrics].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate totals for summary row
  const totals = sortedMetrics.reduce((acc, metric) => ({
    totalVisitors: acc.totalVisitors + (metric.totalVisitors || 0),
    uniqueVisitors: acc.uniqueVisitors + (metric.uniqueVisitors || 0),
    jobViews: acc.jobViews + (metric.jobViews || 0),
    applyClicks: acc.applyClicks + (metric.applyClicks || 0),
    newJobs: acc.newJobs + (metric.addedToday || 0),
  }), {
    totalVisitors: 0,
    uniqueVisitors: 0,
    jobViews: 0,
    applyClicks: 0,
    newJobs: 0,
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          Daily Metrics
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Track daily performance and user engagement</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Date
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <div className="flex items-center justify-center gap-1">
                  <Users size={14} className="text-blue-500" />
                  Total Visitors
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <div className="flex items-center justify-center gap-1">
                  <User size={14} className="text-green-500" />
                  Unique Visitors
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <div className="flex items-center justify-center gap-1">
                  <Eye size={14} className="text-purple-500" />
                  Job Views
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <div className="flex items-center justify-center gap-1">
                  <MousePointerClick size={14} className="text-orange-500" />
                  Apply Clicks
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                <div className="flex items-center justify-center gap-1">
                  <Briefcase size={14} className="text-indigo-500" />
                  New Jobs
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedMetrics.map((metric, index) => {
              const isToday = new Date(metric.date).toDateString() === new Date().toDateString();
              return (
                <tr 
                  key={index} 
                  className={`hover:bg-gray-50 transition-colors ${isToday ? 'bg-blue-50/30' : ''}`}
                >
                  <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    {isToday && (
                      <span className="inline-flex items-center gap-1 mr-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                      </span>
                    )}
                    {new Date(metric.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                    {isToday && (
                      <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    {metric.totalVisitors?.toLocaleString() || 0}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {metric.uniqueVisitors?.toLocaleString() || 0}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      {metric.jobViews > 0 && (
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      )}
                      {metric.jobViews?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      {metric.applyClicks > 0 && (
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      )}
                      {metric.applyClicks?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {metric.addedToday?.toLocaleString() || 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* Summary Footer */}
          <tfoot className="bg-gray-50 border-t-2 border-gray-200">
            <tr>
              <td className="px-4 py-3 text-center text-sm font-bold text-gray-700">
                Total
              </td>
              <td className="px-4 py-3 text-center text-sm font-bold text-blue-600">
                {totals.totalVisitors.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-sm font-bold text-green-600">
                {totals.uniqueVisitors.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-sm font-bold text-purple-600">
                {totals.jobViews.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-sm font-bold text-orange-600">
                {totals.applyClicks.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-sm font-bold text-indigo-600">
                {totals.newJobs.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}