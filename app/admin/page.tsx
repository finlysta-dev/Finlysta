"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  published: boolean;
  isVerified: boolean;
  postedAt: string;
  applyLink: string;
  experience?: string;
  salary?: string;
}

export default function AdminDashboard() {
  const [pendingJobs, setPendingJobs] = useState<Opportunity[]>([]);
  const [approvedJobs, setApprovedJobs] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const ADMIN_KEY = "finlysta_admin_2026";

  const handleLogin = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      fetchJobs();
    } else {
      alert("Invalid admin key");
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Fetch pending jobs
      const pendingRes = await fetch(`/api/admin/opportunities?status=pending&adminKey=${ADMIN_KEY}`);
      const pendingData = await pendingRes.json();
      setPendingJobs(pendingData.opportunities || []);

      // Fetch approved jobs
      const approvedRes = await fetch(`/api/admin/opportunities?status=approved&adminKey=${ADMIN_KEY}`);
      const approvedData = await approvedRes.json();
      setApprovedJobs(approvedData.opportunities || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (opportunityId: string, action: "approve" | "reject") => {
    setActionLoading(opportunityId);
    try {
      const response = await fetch("/api/admin/opportunities", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunityId,
          action,
          adminKey: ADMIN_KEY,
        }),
      });

      if (response.ok) {
        await fetchJobs();
      } else {
        const error = await response.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (opportunityId: string) => {
    if (!confirm("Are you sure you want to delete this opportunity? This action cannot be undone.")) {
      return;
    }
    
    setActionLoading(opportunityId);
    try {
      const response = await fetch(`/api/admin/opportunities?opportunityId=${opportunityId}&adminKey=${ADMIN_KEY}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchJobs();
        alert("Opportunity deleted successfully");
      } else {
        const error = await response.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
      const interval = setInterval(fetchJobs, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
            <p className="text-slate-600 mt-2">Enter your admin key to access dashboard</p>
          </div>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter admin key"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-slate-500 text-sm">Review and manage job submissions</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchJobs}
                className="px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition"
              >
                🔄 Refresh
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-1.5 text-sm text-slate-600 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-3 px-1 font-semibold transition relative ${
                activeTab === "pending"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Pending Review
              {pendingJobs.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {pendingJobs.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`py-3 px-1 font-semibold transition relative ${
                activeTab === "approved"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Approved ({approvedJobs.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
            <p className="text-slate-500 mt-4">Loading...</p>
          </div>
        ) : activeTab === "pending" ? (
          pendingJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-slate-500">No pending submissions</p>
              <p className="text-sm text-slate-400 mt-1">New job postings will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          job.type === "job" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                        }`}>
                          {job.type === "job" ? "Full Time" : "Internship"}
                        </span>
                        <span className="text-xs text-slate-400">{new Date(job.postedAt).toLocaleString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{job.title}</h3>
                      <p className="text-emerald-600 font-semibold mb-2">{job.company}</p>
                      <p className="text-slate-600 text-sm mb-2">📍 {job.location}</p>
                      {job.experience && <p className="text-slate-500 text-sm">📅 {job.experience}</p>}
                      {job.salary && <p className="text-slate-500 text-sm">💰 {job.salary}</p>}
                      <div className="flex gap-2 text-sm text-slate-500 mt-2">
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Apply Link →
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleAction(job.id, "approve")}
                        disabled={actionLoading === job.id}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50"
                      >
                        {actionLoading === job.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleAction(job.id, "reject")}
                        disabled={actionLoading === job.id}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={actionLoading === job.id}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-4">
            {approvedJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500">No approved jobs yet</p>
              </div>
            ) : (
              approvedJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Approved</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          job.type === "job" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                        }`}>
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                      <p className="text-slate-600">{job.company} • {job.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition"
                      >
                        View →
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={actionLoading === job.id}
                        className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
