"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  LayoutDashboard,
  Heart,
  User,
  HelpCircle,
  Briefcase,
  Award
} from "lucide-react";
import Avatar from "./Avatar";

export default function ProfileDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" aria-label="Loading profile"></div>;
  }

  if (!session) {
    return null;
  }

  const user = session.user as any;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Toggle Button with ARIA attributes */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 focus:outline-none hover:bg-white/10 px-3 py-1.5 rounded-xl transition-all duration-200 backdrop-blur-sm group"
      >
        <div className="relative">
          <Avatar user={user} size={34} />
          {/* Green Live Icon */}
          <div 
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"
            aria-label="Online"
          ></div>
        </div>
        <span className="hidden md:block text-sm font-semibold text-gray-800">
          {user?.name?.split(" ")[0] || "User"}
        </span>
        <ChevronDown 
          size={14} 
          className={`text-gray-500 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown positioned further right to prevent cutoff */}
          <div className="absolute right-0 md:-right-8 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 z-50 overflow-hidden">
            
            {/* User Info Section */}
            <div className="px-4 py-3 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar user={user} size={38} />
                  <div 
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"
                    aria-label="Online"
                  ></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {user?.name?.split(" ")[0] || "User"}
                  </p>
                  <div className="flex items-center gap-1">
                    <Award size={10} className="text-amber-500" aria-hidden="true" />
                    <p className="text-[10px] text-gray-500">Member</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1" role="menu">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Go to Dashboard"
                role="menuitem"
              >
                <LayoutDashboard size={14} className="text-blue-500" aria-hidden="true" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                href="/dashboard/applications"
                className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-purple-50 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="View your applications"
                role="menuitem"
              >
                <Briefcase size={14} className="text-purple-500" aria-hidden="true" />
                <span>My Applications</span>
              </Link>
              
              <Link
                href="/saved"
                className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-red-50 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="View saved internships"
                role="menuitem"
              >
                <Heart size={14} className="text-red-500" aria-hidden="true" />
                <span>Saved Internships</span>
              </Link>
            </div>

            <div className="border-t border-gray-100" aria-hidden="true"></div>

            <div className="py-1" role="menu">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="View your profile"
                role="menuitem"
              >
                <User size={14} className="text-green-500" aria-hidden="true" />
                <span>Profile</span>
              </Link>
              
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Account settings"
                role="menuitem"
              >
                <Settings size={14} className="text-gray-500" aria-hidden="true" />
                <span>Settings</span>
              </Link>

              <Link
                href="/help"
                className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-yellow-50 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Get help and support"
                role="menuitem"
              >
                {/* <HelpCircle size={14} className="text-yellow-500" aria-hidden="true" />
                <span>Help & Support</span> */}
              </Link>
            </div>

            <div className="border-t border-gray-100" aria-hidden="true"></div>
            
            {/* Sign Out Button */}
            <div className="p-1.5 bg-gray-50/50">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Sign out of your account"
              >
                <LogOut size={13} aria-hidden="true" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}