"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            alt="Finlysta Logo - Entry Level Financial Analyst Jobs"
            width={180} 
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Home
          </Link>
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
            href="/blogs" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Blogs
          </Link>
        </nav>

        {/* Empty div to maintain layout */}
        <div className="w-10"></div>
      </div>

      {/* Mobile Navigation - FIXED with proper spacing */}
      <div className="md:hidden border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Home
          </Link>
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
            href="/blogs" 
            className="text-sm font-semibold text-slate-600 hover:text-[#0A2540] transition-colors"
          >
            Blogs
          </Link>
        </div>
      </div>
    </header>
  );
}