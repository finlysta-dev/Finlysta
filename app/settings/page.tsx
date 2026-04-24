"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Bell, Moon, Sun, Globe, Save, ArrowLeft, 
  CheckCircle, Shield, ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notifications: true,
    darkMode: false,
    profileVisibility: "public",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Load settings from localStorage and session
  useEffect(() => {
    if (session?.user) {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      const savedNotifications = localStorage.getItem("notifications") !== "false";
      const savedVisibility = localStorage.getItem("profileVisibility") || "public";
      
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        notifications: savedNotifications,
        darkMode: savedDarkMode,
        profileVisibility: savedVisibility,
      });
      
      // Apply dark mode
      if (savedDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [session]);

  // Handle save settings
  const handleSaveSettings = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // 1. Save to localStorage (for UI preferences)
      localStorage.setItem("darkMode", String(formData.darkMode));
      localStorage.setItem("notifications", String(formData.notifications));
      localStorage.setItem("profileVisibility", formData.profileVisibility);

      // 2. Apply dark mode immediately
      if (formData.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // 3. Update name in database if changed
      if (formData.name !== session?.user?.name) {
        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update name");
        }

        // Update session with new name
        await update();
      }

      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-500 dark:text-gray-400" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h1>
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save size={16} />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-20">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{session?.user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {[
                  { icon: User, label: "Profile", active: true },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Globe, label: "Privacy", active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                    {item.active && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your personal information</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This name will be visible to employers</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full max-w-md px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Email cannot be changed.{" "}
                    <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your experience</p>
              </div>
              <div className="p-6 space-y-4">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    {formData.darkMode ? (
                      <Moon size={18} className="text-blue-500" />
                    ) : (
                      <Sun size={18} className="text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formData.darkMode ? "Currently in dark mode" : "Switch to dark theme"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, darkMode: !formData.darkMode })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Email Notifications Toggle */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Receive updates about your applications
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.notifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.notifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control who sees your profile</p>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formData.profileVisibility === "public" 
                          ? "Visible to everyone on the platform" 
                          : "Hidden from other users"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFormData({ ...formData, profileVisibility: "public" })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.profileVisibility === "public"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      Public
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, profileVisibility: "private" })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.profileVisibility === "private"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      Private
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
                <CheckCircle size={18} />
                <span className="text-sm">{success}</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
