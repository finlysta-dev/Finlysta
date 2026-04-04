"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const words = ["Dream", "Career", "Future"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ── REGISTER FUNCTION with password validation ── */
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Password validation: minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long and contain at least one letter and one number");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess(true);
      setTimeout(() => router.push("/auth/signin"), 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      num: "01",
      title: "Direct Applications",
      desc: "Apply straight to hiring teams. No recruiters. No middlemen.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
        </svg>
      ),
    },
    {
      num: "02",
      title: "Built for Students",
      desc: "Perfect for freshers and early-career talent starting their journey.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
    },
    {
      num: "03",
      title: "Free Forever",
      desc: "No hidden fees. Internify will always be free for students.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --primary:     #4F46E5;
          --primary-h:   #4338CA;
          --text-dark:   #111827;
          --text-muted:  #6B7280;
          --text-light:  #9CA3AF;
          --border:      #E5E7EB;
          --bg:          #FFFFFF;
          --bg-surface:  #F9FAFB;
        }

        .wf-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .wf-nav {
          height: 60px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          position: sticky;
          top: 0;
          background: var(--bg);
          z-index: 50;
        }
        .wf-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .wf-logo img {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: transform 0.2s;
        }
        .wf-logo:hover img { transform: scale(1.04); }
        .wf-nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .wf-nav-back {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--text-light);
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          transition: color 0.15s;
        }
        .wf-nav-back:hover { color: var(--text-dark); }
        .wf-nav-member {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 400;
        }
        .wf-nav-signin {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          padding: 7px 16px;
          border: 1.5px solid var(--primary);
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .wf-nav-signin:hover {
          background: var(--primary);
          color: white;
        }

        /* ── BODY ── */
        .wf-body {
          flex: 1;
          display: flex;
        }

        /* ── LEFT PANEL ── */
        .wf-left {
          width: 52%;
          padding: 56px 80px 64px 48px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-right: 1px solid var(--border);
        }

        /* headline */
        .wf-headline {
          font-size: 48px;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.08;
          letter-spacing: -0.03em;
        }
        .wf-headline-muted { color: var(--text-light); }

        /* animated word */
        .wf-word-row {
          display: block;
          height: 1.12em;
          overflow: hidden;
          position: relative;
        }
        .wf-word {
          display: block;
          position: absolute;
          left: 0;
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--primary);
          transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.45s ease;
        }
        .wf-word-on  { transform: translateY(0);    opacity: 1; }
        .wf-word-off { transform: translateY(110%); opacity: 0; }

        .wf-tagline {
          font-size: 18px;
          color: var(--text-muted);
          font-weight: 400;
          line-height: 1.65;
          margin-top: 24px;
          max-width: 420px;
        }

        /* features */
        .wf-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 48px;
        }
        .wf-feat {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .wf-feat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #EEF2FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--primary);
        }
        .wf-feat-num {
          font-size: 11px;
          font-weight: 700;
          color: var(--border);
          letter-spacing: 0.06em;
          min-width: 26px;
          padding-top: 3px;
        }
        .wf-feat-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 3px;
          letter-spacing: -0.015em;
        }
        .wf-feat-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          font-weight: 400;
        }

        /* ── RIGHT PANEL ── */
        .wf-right {
          width: 48%;
          padding: 56px 48px 64px 80px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .wf-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--border);
        }

        .wf-form-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }
        .wf-form-sub {
          font-size: 15px;
          color: var(--text-muted);
          font-weight: 400;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        /* socials */
        .wf-socials { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .wf-soc {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-dark);
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s, background 0.15s;
        }
        .wf-soc:hover {
          border-color: #9CA3AF;
          background: var(--bg-surface);
        }

        /* divider */
        .wf-div {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .wf-div-line { flex: 1; height: 1px; background: var(--border); }
        .wf-div-txt {
          font-size: 13px;
          color: var(--text-light);
          font-weight: 500;
          white-space: nowrap;
        }

        /* form */
        .wf-form { display: flex; flex-direction: column; gap: 16px; }
        .wf-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-dark);
          margin-bottom: 6px;
        }
        .wf-input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 15px;
          font-family: inherit;
          color: var(--text-dark);
          background: white;
          outline: none;
          font-weight: 400;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .wf-input::placeholder { color: #D1D5DB; }
        .wf-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .wf-pw-wrap { position: relative; }
        .wf-pw-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-light);
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.15s;
        }
        .wf-pw-toggle:hover { color: var(--text-dark); }

        /* password hint */
        .wf-pw-hint {
          font-size: 11px;
          color: var(--text-light);
          margin-top: 6px;
          padding-left: 4px;
          letter-spacing: -0.01em;
        }
        .wf-pw-hint span {
          color: var(--primary);
          font-weight: 500;
        }

        /* submit */
        .wf-submit {
          width: 100%;
          height: 48px;
          background: var(--primary);
          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          letter-spacing: -0.01em;
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
        }
        .wf-submit:hover:not(:disabled) {
          background: var(--primary-h);
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
          transform: translateY(-1px);
        }
        .wf-submit:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        .wf-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .wf-spin {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: wspin 0.7s linear infinite;
        }
        @keyframes wspin { to { transform: rotate(360deg); } }

        /* trust line */
        .wf-trust {
          display: none;
        }

        .wf-legal {
          font-size: 12px;
          color: var(--text-light);
          line-height: 1.7;
          margin-top: 14px;
          font-weight: 400;
          text-align: center;
          white-space: normal;
        }
        .wf-legal a {
          color: var(--text-muted);
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .wf-legal a:hover { color: var(--primary); }
        .wf-legal .wf-signin-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
        }
        .wf-legal .wf-signin-link:hover { text-decoration: underline; }

        /* ── SUCCESS OVERLAY ── */
        .wf-success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(17, 24, 39, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: wf-fadein 0.25s ease;
        }
        @keyframes wf-fadein { from { opacity: 0; } to { opacity: 1; } }

        .wf-success-card {
          background: white;
          border-radius: 20px;
          padding: 48px 40px;
          text-align: center;
          max-width: 380px;
          width: 90%;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
          animation: wf-slideup 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes wf-slideup { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .wf-success-icon {
          width: 64px;
          height: 64px;
          background: #ECFDF5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .wf-success-icon svg { color: #10B981; }

        .wf-success-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }
        .wf-success-msg {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.65;
          font-weight: 400;
          margin-bottom: 28px;
        }
        .wf-success-redirect {
          font-size: 13px;
          color: var(--text-light);
          font-weight: 400;
          margin-bottom: 20px;
        }
        .wf-success-btn {
          display: inline-block;
          padding: 12px 32px;
          background: var(--primary);
          color: white;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
        }
        .wf-success-btn:hover {
          background: var(--primary-h);
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
          transform: translateY(-1px);
        }
        .wf-success-bar-wrap {
          width: 100%;
          height: 3px;
          background: #E5E7EB;
          border-radius: 100px;
          margin-top: 24px;
          overflow: hidden;
        }
        .wf-success-bar {
          height: 100%;
          background: var(--primary);
          border-radius: 100px;
          animation: wf-progress 3s linear forwards;
        }
        @keyframes wf-progress { from { width: 0%; } to { width: 100%; } }

        @media (max-width: 900px) {
          .wf-body { flex-direction: column; }
          .wf-left { width: 100%; padding: 40px 24px 36px; border-right: none; border-bottom: 1px solid var(--border); }
          .wf-right { width: 100%; padding: 36px 24px 52px; align-items: flex-start; }
          .wf-headline, .wf-word { font-size: 36px; }
          .wf-nav { padding: 0 24px; }
          .wf-card { padding: 24px 20px; }
        }
      `}</style>

      <div className="wf-root">

        {/* SUCCESS OVERLAY */}
        {success && (
          <div className="wf-success-overlay">
            <div className="wf-success-card">
              <div className="wf-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h2 className="wf-success-title">You're all set! 🎉</h2>
              <p className="wf-success-msg">
                Your Internify account has been created successfully.<br />
                Start exploring internships made for you.
              </p>
              <p className="wf-success-redirect">Redirecting you to sign in…</p>
              <Link href="/auth/signin" className="wf-success-btn">
                Sign in now →
              </Link>
              <div className="wf-success-bar-wrap">
                <div className="wf-success-bar" />
              </div>
            </div>
          </div>
        )}

        {/* NAV */}
        <nav className="wf-nav">
          <a href="/" className="wf-logo">
            <img src="/Internify.png" alt="Internify Logo" />
          </a>
          <div className="wf-nav-right">
            <button className="wf-nav-back" onClick={() => router.back()}>
              <ArrowLeft size={13} /> Back
            </button>
            <Link href="/auth/signin" className="wf-nav-signin">Sign in</Link>
          </div>
        </nav>

        {/* BODY */}
        <div className="wf-body">

          {/* LEFT */}
          <div className="wf-left">
            <h1 className="wf-headline">
              The Internship<br />
              That Fits Your<br />
              <span className="wf-word-row">
                {words.map((word, i) => (
                  <span key={i} className={`wf-word ${i === index ? "wf-word-on" : "wf-word-off"}`}>
                    {word}.
                  </span>
                ))}
              </span>
            </h1>

            <p className="wf-tagline">
              Internify connects ambitious students with companies that are ready to hire — no middlemen, no gatekeeping.
            </p>

            <div className="wf-features">
              {features.map((f) => (
                <div key={f.num} className="wf-feat">
                  <div className="wf-feat-icon">{f.icon}</div>
                  <div>
                    <div className="wf-feat-title">{f.title}</div>
                    <div className="wf-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="wf-right">
            <div className="wf-card">
              <h2 className="wf-form-title">Create account</h2>
              <p className="wf-form-sub">Join now to find your dream internship.</p>

              {/* Social */}
              <div className="wf-socials">
                <SocialButton provider="google">
                  <GoogleIcon /> Continue with Google
                </SocialButton>
                <SocialButton provider="github">
                  <GithubIcon /> Continue with GitHub
                </SocialButton>
              </div>

              {/* Divider */}
              <div className="wf-div">
                <div className="wf-div-line" />
                <span className="wf-div-txt">or continue with email</span>
                <div className="wf-div-line" />
              </div>

              {/* Form */}
              <form onSubmit={handleRegister} className="wf-form">
                <div>
                  <label className="wf-label">Full name</label>
                  <input
                    className="wf-input"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="wf-label">Email address</label>
                  <input
                    className="wf-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="wf-label">Password</label>
                  <div className="wf-pw-wrap">
                    <input
                      className="wf-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingRight: "44px" }}
                    />
                    <button
                      type="button"
                      className="wf-pw-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Password hint note */}
                  <div className="wf-pw-hint">
                    <span>🔐 Password must be at least 8 characters with at least one letter and one number.</span> Include @ $ ! % * # ? & for extra security.
                  </div>
                </div>

                <button type="submit" className="wf-submit" disabled={loading}>
                  {loading && <div className="wf-spin" />}
                  {loading ? "Creating account…" : "Create account →"}
                </button>
              </form>

              <p className="wf-legal">
                By signing up you agree to our{" "}
                <a href="#">Terms of Service</a> &amp;{" "}
                <a href="#">Privacy Policy</a>.
                <br />
                Already a member?{" "}
                <Link href="/auth/signin" className="wf-signin-link">Sign in</Link>
              </p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

/* ── SOCIAL BUTTON (logic unchanged) ── */
function SocialButton({ provider, children }: { provider: string; children: React.ReactNode }) {
  return (
    <button className="wf-soc" onClick={() => signIn(provider, { callbackUrl: "/" })}>
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#111827">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}