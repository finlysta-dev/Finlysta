"use client";

import Link from "next/link";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/mission" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  "Job Seekers": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Salary Calculator", href: "/salary" },
    { label: "Resume Builder", href: "/resume" },
    { label: "Career Advice", href: "/career-advice" },
  ],
  Employers: [
    { label: "Post a Job", href: "/post-job" },
    { label: "Search Resumes", href: "/resumes" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "Recruiter Login", href: "/recruiter" },
    { label: "Hiring Solutions", href: "/solutions" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Settings", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

const appStores = [
  {
    label: "Download on App Store",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    sub: "App Store",
  },
  {
    label: "Get it on Google Play",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M3.18 23.76c.3.17.64.24.99.21l13.5-7.79-2.89-2.89L3.18 23.76zM.75 1.78C.29 2.14 0 2.73 0 3.46v17.08c0 .73.29 1.32.75 1.68l.09.08 9.57-9.57v-.23L.84 1.7l-.09.08zm19.5 9.12l-2.71-1.57-3.05 3.05 3.05 3.05 2.72-1.57c.78-.45.78-1.51-.01-1.96zM4.17.24L17.67 8.03l-2.89 2.89L4.17.24z" />
      </svg>
    ),
    sub: "Google Play",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-gray-300 font-['DM_Sans',sans-serif]">
      {/* Newsletter strip */}
      <div className="bg-gradient-to-r from-[#1a6bff] to-[#0a4fd4] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-200 mb-1">
              Stay Ahead
            </p>
            <h3 className="text-white text-2xl font-bold">
              Get the latest job alerts & career tips
            </h3>
          </div>
          <form
            className="flex w-full md:w-auto gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/15 backdrop-blur border border-white/25 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#1a6bff] font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a6bff] to-[#0a4fd4] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.1 15.9 0 13.34 0c-1.3 0-2.48.52-3.34 1.36L9 3.02l-1-1.66C7.14.52 5.96 0 4.66 0 2.1 0 0 2.1 0 4.66c0 .46.11.9.18 1.34H0c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM13.34 2c1.29 0 2.34 1.05 2.34 2.34 0 1.29-1.05 2.34-2.34 2.34H10l2.5-4.34c.28-.47.82-.34.84 0zM2.34 4.34C2.34 3.05 3.39 2 4.68 2c.02.34.56.47.84 0L8.02 6.68H4.68C3.39 6.68 2.34 5.63 2.34 4.34zM2 19V8h8v11H2zm10 0V8h8v11h-8z" />
                </svg>
              </span>
              <span className="text-white text-xl font-bold tracking-tight">
                JobPortal
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              India's leading job platform connecting millions of professionals
              with top companies across every industry.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-7">
              {[
                { val: "10M+", label: "Job Seekers" },
                { val: "500K+", label: "Companies" },
                { val: "50M+", label: "Jobs Posted" },
                { val: "15M+", label: "Hires Made" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-xl px-3 py-3 border border-white/8"
                >
                  <p className="text-white font-bold text-lg leading-none">
                    {stat.val}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#1a6bff] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-150 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#1a6bff] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App download */}
        <div className="mt-12 pt-10 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-white mb-3">
              Download the App
            </p>
            <div className="flex gap-3">
              {appStores.map((store) => (
                <a
                  key={store.label}
                  href={store.href}
                  className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/12 rounded-xl px-4 py-2.5 transition-colors group"
                >
                  <span className="text-white">{store.icon}</span>
                  <div>
                    <p className="text-gray-400 text-[10px] leading-none group-hover:text-gray-300">
                      Available on
                    </p>
                    <p className="text-white text-sm font-semibold leading-tight">
                      {store.sub}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
            {[
              "ISO 27001 Certified",
              "GDPR Compliant",
              "SSL Secured",
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/8"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3 h-3 text-green-400"
                >
                  <path d="M8 0l1.5 4.5H14l-3.75 2.7 1.42 4.35L8 9.1l-3.67 2.45 1.42-4.35L2 4.5h4.5z" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} JobPortal Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <span className="flex items-center gap-1">
              Made with{" "}
              <span className="text-red-400">♥</span> in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
