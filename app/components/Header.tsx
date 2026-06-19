"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [employerDropdownOpen, setEmployerDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setEmployerDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/internships", label: "Internships" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/blogs", label: "Blogs" },
  ];

  // Pages that are heavy and don't need prefetching
  const noPrefetch = ["/blogs", "/learning-hub", "/interview-prep"];

  const employerLinks = [
    { href: "/employers/post-job", label: "📌 Post a Job" },
    { href: "/employers/post-internship", label: "📝 Post an Internship" },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 font-sans antialiased ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo - Full Left */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
              aria-label="Finlysta - Finance Jobs and Internships for Freshers"
            >
              <Image 
                src="/Finlysta.png" 
                alt="Finlysta Logo" 
                width={160} 
                height={36}
                priority
                className="object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Navigation - Desktop - Centered */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center justify-center gap-10 lg:gap-12 absolute left-1/2 transform -translate-x-1/2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    prefetch={!noPrefetch.includes(link.href)}
                    className={`text-base font-bold transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-black hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {isActive && (
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full shadow-sm"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* For Employers Dropdown - Right Side */}
          <div className="hidden md:block" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEmployerDropdownOpen(!employerDropdownOpen);
                }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-[14px] font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                🚀Post Openings Free
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-200 ${employerDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {employerDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {employerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setEmployerDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-black hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-black hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.href} className="py-2">
                    <Link 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-base font-bold px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? "text-blue-600" 
                          : "text-black hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <div className="px-4 mt-1">
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full shadow-sm"></div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* For Employers section in mobile menu */}
              <div className="mt-2 border-t border-gray-100 pt-2">
                <p className="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  For Employers
                </p>
                {employerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}