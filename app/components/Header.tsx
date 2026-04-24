"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ProfileDropdown = dynamic(
  () => import("@/components/ProfileDropdown"),
  { ssr: false, loading: () => <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div> }
);

export default function Header() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything that depends on session until mounted
  if (!mounted) {
    return (
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0" aria-label="Finlysta Home">
            <Image 
              src="/Finlysta.png" 
              alt="Finlysta Logo" 
              width={200} 
              height={45}
              priority
            />
          </Link>
          <div className="w-24 h-8 bg-slate-200 rounded-full animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="Finlysta Home">
          <Image 
            src="/Finlysta.png" 
            alt="Finlysta Logo - Finance Internship Platform for Students"
            width={180} 
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/jobs" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Jobs
          </Link>
          <Link 
            href="/internships" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Internships
          </Link>
          <Link 
            href="/blog" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
          ) : session ? (
            <ProfileDropdown />
          ) : (
            <div className="w-8 h-8"></div> // Empty placeholder to maintain layout
          )}
        </div>
      </div>

      {/* Mobile Navigation - Hidden on desktop, visible on mobile */}
      <div className="md:hidden border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-around">
          <Link 
            href="/jobs" 
            className="text-xs font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Jobs
          </Link>
          <Link 
            href="/internships" 
            className="text-xs font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Internships
          </Link>
          <Link 
            href="/blog" 
            className="text-xs font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
}
