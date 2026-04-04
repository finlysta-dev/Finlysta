"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function PublicNavbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass effect */}
      <div className="backdrop-blur-md bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold">
              I
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              Internify
            </span>
          </Link>

          {/* CENTER NAV (desktop only) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-black transition">
              How it works
            </a>
            <a href="#students" className="hover:text-black transition">
              For Students
            </a>
            <span className="text-slate-400 cursor-not-allowed">
              Internships
            </span>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {!session ? (
              <button
                onClick={() => signIn("github")}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
              >
                Sign in with GitHub
              </button>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-700 hover:text-black"
                >
                  Dashboard
                </Link>

                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border"
                  />
                )}

                <button
                  onClick={() => signOut()}
                  className="text-xs text-slate-500 hover:text-black"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
