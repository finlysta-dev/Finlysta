"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/internships", label: "Internships" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/learn", label: "Learning Hub" },
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/blogs", label: "Blogs" },
  ];

  // Pages that are heavy and don't need prefetching
  const noPrefetch = ["/blogs", "/learn"];

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center shrink-0 w-[180px]">
            <Link href="/" className="flex items-center" aria-label="Finlysta Home">
              <Image 
                src="/Finlysta.png" 
                alt="Finlysta Logo" 
                width={180} 
                height={40}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center justify-center gap-6 lg:gap-8 flex-1"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                prefetch={!noPrefetch.includes(link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Empty div for spacing balance on desktop */}
          <div className="hidden md:block w-[180px]"></div>

          {/* Mobile Menu Button - Improved accessibility */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Dropdown Menu - Always in DOM for accessibility */}
        <div
          id="mobile-nav"
          className={`md:hidden border-t border-slate-100 bg-white shadow-lg transition-all duration-200 ${
            mobileMenuOpen ? "block animate-in fade-in slide-in-from-top-2" : "hidden"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}