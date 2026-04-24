"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Filter, Search, Eye, Bell, Megaphone } from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string | null;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  userId: string | null;
  createdAt: string;
  user: User | null;
  isRead?: boolean;
}

export default function NotificationHistoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    broadcast: 0,
    userSpecific: 0,
    unreadTotal: 0
  });
  const [types, setTypes] = useState<string[]>([]);

  const typeFilter = searchParams.get("type") || "";
  const searchFilter = searchParams.get("search") || "";

  useEffect(() => {
    fetchNotifications();
  }, [typeFilter, searchFilter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      let url = "/api/notifications/admin?";
      if (typeFilter) url += `type=${typeFilter}&`;
      if (searchFilter) url += `search=${searchFilter}&`;
      url += "limit=100";

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.data);
        setStats({
          total: data.total,
          broadcast: data.broadcast,
          userSpecific: data.userSpecific,
          unreadTotal: data.unreadTotal
        });
        setTypes(data.types || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type") as string;
    const search = formData.get("search") as string;
    
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (search) params.set("search", search);
    
    router.push(`/admin/notification-history?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/admin/notification-history");
  };

  const handleExport = () => {
    const csv = [
      ['Title', 'Message', 'Type', 'Target', 'Status', 'Date'],
      ...notifications.map(n => [
        n.title,
        n.message,
        n.type,
        n.userId ? (n.user?.email || 'User') : 'ALL USERS',
        n.isRead ? 'Read' : 'Unread',
        new Date(n.createdAt).toLocaleString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notifications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link 
            href="/admin" 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Notification History</h1>
        </div>
        <p className="text-gray-500 text-sm">View all notifications sent to users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Total Sent</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-400 mt-1">All time</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Broadcast</p>
          <p className="text-2xl font-bold text-green-600">{stats.broadcast}</p>
          <p className="text-xs text-gray-400 mt-1">Sent to all users</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Personal</p>
          <p className="text-2xl font-bold text-blue-600">{stats.userSpecific}</p>
          <p className="text-xs text-gray-400 mt-1">Sent to specific users</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Unread</p>
          <p className="text-2xl font-bold text-orange-600">{stats.unreadTotal}</p>
          <p className="text-xs text-gray-400 mt-1">Not yet opened</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-3">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </div>
        </div>
        <div className="p-4">
          <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-4">
            {/* Type Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
              <select
                name="type"
                defaultValue={typeFilter}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-[2] min-w-[200px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchFilter}
                  placeholder="Search by title or message..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notifications.map((n: Notification) => (
                <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{n.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-md truncate">
                      {n.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      n.type === "INFO" 
                        ? "bg-blue-100 text-blue-700"
                        : n.type === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : n.type === "WARNING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {n.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {n.userId ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-sm text-blue-600">
                          {n.user?.email || n.user?.name || "User"}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-medium text-green-600">
                          ALL USERS
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {n.isRead ? (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Eye size={12} />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-orange-600">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        Unread
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(n.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium">No notifications found</p>
            <p className="text-sm text-gray-400 mt-1">
              {typeFilter || searchFilter ? 'Try adjusting your filters' : 'Send your first notification to get started'}
            </p>
            {!typeFilter && !searchFilter && (
              <Link
                href="/admin/notifications"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <Megaphone size={16} />
                Send Notification
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Export Button */}
      {notifications.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export to CSV
          </button>
        </div>
      )}
    </div>
  );
}
