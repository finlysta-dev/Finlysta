"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, Users, Briefcase, FileText, 
  BarChart3, TrendingUp, BookOpen, Mail, 
  Bell, LogOut, Menu, X, Clock, ChevronRight,
  UserCircle, Settings, HelpCircle, ChevronDown,
  Megaphone
} from "lucide-react";
import NotificationBell from "@/components/NotificationBell";

interface Activity {
  id: number;
  user: string;
  action: string;
  path: string;
  timestamp: string;
  timeAgo: string;
  userAvatar?: string;
}

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showActivity, setShowActivity] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load activities
  useEffect(() => {
    const saved = localStorage.getItem("adminActivities");
    if (saved) setActivities(JSON.parse(saved));
  }, []);

  // Save activities
  useEffect(() => {
    localStorage.setItem("adminActivities", JSON.stringify(activities));
  }, [activities]);

  // Track page view
  useEffect(() => {
    const action = getActionName(pathname);
    if (action) addActivity(action, pathname);
  }, [pathname]);

  const getActionName = (path: string) => {
    const map: Record<string, string> = {
      "/admin": "Viewed Dashboard",
      "/admin/users": "Viewed Users",
      "/admin/internships": "Viewed Internships",
      "/admin/applications": "Viewed Applications",
      "/admin/analytics": "Viewed Analytics",
      "/admin/stats": "Viewed Stats",
      "/admin/resources": "Viewed Resources",
      "/admin/contact": "Viewed Contact",
      "/admin/notifications": "Viewed Notifications",
      "/admin/settings": "Viewed Settings",
    };
    return map[path] || null;
  };

  const addActivity = (action: string, path: string) => {
    const now = new Date();
    const timeAgo = getTimeAgo(now);

    const newActivity: Activity = {
      id: Date.now(),
      user: "Admin",
      action,
      path,
      timestamp: now.toLocaleString(),
      timeAgo,
      userAvatar: `https://ui-avatars.com/api/?name=Admin&background=3B82F6&color=fff`,
    };

    setActivities((prev) => [newActivity, ...prev].slice(0, 50));
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const clearAllActivities = () => setActivities([]);

  const navigation = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/internships", label: "Internships", icon: Briefcase },
    { href: "/admin/applications", label: "Applications", icon: FileText },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/stats", label: "Stats", icon: TrendingUp },
    { href: "/admin/resources", label: "Resources", icon: BookOpen },
    { href: "/admin/contact", label: "Contact", icon: Mail },
    { href: "/admin/notifications", label: "Send Notification", icon: Megaphone },
    { href: "/admin/notification-history", label: "History", icon: Bell }, // Add this
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      {/* Mobile Menu Button */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Fixed positioning */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-40 flex flex-col ${
          isSidebarOpen ? "w-72" : "w-0 md:w-20"
        } ${isMobile && !isSidebarOpen ? "hidden" : "block"}`}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b border-gray-100 ${!isSidebarOpen && "md:px-3"}`}>
          <Link href="/" className="flex items-center justify-center">
            {isSidebarOpen ? (
              <img src="/Finlysta.png" className="h-10" alt="Logo" />
            ) : (
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={Icon}
                isActive={isActive}
                isCollapsed={!isSidebarOpen}
              />
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <NavItem
            href="/admin/settings"
            label="Settings"
            icon={Settings}
            isActive={pathname === "/admin/settings"}
            isCollapsed={!isSidebarOpen}
          />
          <NavItem
            href="/admin/help"
            label="Help & Support"
            icon={HelpCircle}
            isActive={pathname === "/admin/help"}
            isCollapsed={!isSidebarOpen}
          />
          <Link
            href="/admin/logout"
            className={`flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors ${
              !isSidebarOpen && "md:justify-center"
            }`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </Link>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 hidden md:flex bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all"
        >
          {isSidebarOpen ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </aside>

      {/* Main Content - Positioned with margin to account for fixed sidebar */}
      <div 
        className={`transition-all duration-300 min-h-screen ${
          isSidebarOpen ? "md:ml-72" : "md:ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-4">
            {isMobile && !isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <NotificationBell />
            
            {/* Activity Button */}
            <button
              onClick={() => setShowActivity(!showActivity)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Clock size={20} className="text-gray-600" />
              {activities.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activities.length > 9 ? "9+" : activities.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <UserCircle size={20} className="text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Activity Dropdown */}
        {showActivity && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowActivity(false)}
            />
            <div className="absolute right-4 top-16 w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Track your admin actions
                  </p>
                </div>
                {activities.length > 0 && (
                  <button
                    onClick={clearAllActivities}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {activities.length === 0 ? (
                  <div className="p-8 text-center">
                    <Clock size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">No recent activity</p>
                  </div>
                ) : (
                  activities.map((a) => (
                    <div key={a.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <img
                          src={a.userAvatar}
                          alt={a.user}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{a.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{a.timestamp}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {a.timeAgo}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* Page Content */}
        <main className="p-6">
          <div className="animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ 
  href, 
  label, 
  icon: Icon, 
  isActive, 
  isCollapsed 
}: { 
  href: string; 
  label: string; 
  icon: any; 
  isActive: boolean; 
  isCollapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      } ${isCollapsed && "md:justify-center"}`}
    >
      <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
      {!isCollapsed && (
        <>
          <span className="flex-1 font-medium">{label}</span>
          {isActive && (
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          )}
        </>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
}
