"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const [index, setIndex] = useState(0);

  const words = ["Dream", "Career", "Future"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ── ALL LOGIC UNCHANGED ── */
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError("Please enter your email address"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address"); return; }
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSubmitted(true);
      setButtonDisabled(true);
      setCountdown(40);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(timer); setButtonDisabled(false); return 0; }
          return prev - 1;
        });
      }, 1000);
      setTimeout(() => {
        setRedirectCountdown(30);
        const redirectTimer = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev <= 1) { clearInterval(redirectTimer); router.push("/auth/signin"); return 0; }
            return prev - 1;
          });
        }, 1000);
      }, 10000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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

        .fp-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* NAV */
        .fp-nav {
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
        .fp-nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .fp-nav-logo img {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: transform 0.2s;
        }
        .fp-nav-logo:hover img { transform: scale(1.04); }
        .fp-nav-right { display: flex; align-items: center; gap: 20px; }
        .fp-nav-back {
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
        .fp-nav-back:hover { color: var(--text-dark); }
        .fp-nav-signin {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          padding: 7px 16px;
          border: 1.5px solid var(--primary);
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .fp-nav-signin:hover { background: var(--primary); color: white; }

        /* BODY */
        .fp-body { flex: 1; display: flex; }

        /* LEFT */
        .fp-left {
          width: 52%;
          padding: 56px 80px 64px 48px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-right: 1px solid var(--border);
        }
        .fp-headline {
          font-size: 48px;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.08;
          letter-spacing: -0.03em;
        }
        .fp-headline-muted { color: var(--text-light); }
        .fp-word-row {
          display: block;
          height: 1.12em;
          overflow: hidden;
          position: relative;
        }
        .fp-word {
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
        .fp-word-on  { transform: translateY(0);    opacity: 1; }
        .fp-word-off { transform: translateY(110%); opacity: 0; }

        .fp-tagline {
          font-size: 18px;
          color: var(--text-muted);
          font-weight: 400;
          line-height: 1.65;
          margin-top: 24px;
          max-width: 420px;
        }

        /* STEPS */
        .fp-steps {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 48px;
        }
        .fp-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .fp-step-icon {
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
        .fp-step-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 3px;
          letter-spacing: -0.015em;
        }
        .fp-step-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          font-weight: 400;
        }

        /* RIGHT */
        .fp-right {
          width: 48%;
          padding: 56px 48px 64px 80px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .fp-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          border: 1px solid var(--border);
        }

        .fp-card-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }
        .fp-card-sub {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 400;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        /* FORM */
        .fp-form { display: flex; flex-direction: column; gap: 16px; }
        .fp-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-dark);
          margin-bottom: 6px;
        }
        .fp-input-wrap { position: relative; }
        .fp-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          pointer-events: none;
        }
        .fp-input {
          width: 100%;
          height: 48px;
          padding: 0 14px 0 44px;
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
        .fp-input::placeholder { color: #D1D5DB; }
        .fp-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }
        .fp-input.fp-input-error { border-color: #EF4444; }
        .fp-error-msg {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #EF4444;
          margin-top: 6px;
          font-weight: 500;
        }

        /* BUTTON */
        .fp-btn {
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
        .fp-btn:hover:not(:disabled) {
          background: var(--primary-h);
          box-shadow: 0 4px 14px rgba(79,70,229,0.35);
          transform: translateY(-1px);
        }
        .fp-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
        .fp-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .fp-spin {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: fpspin 0.7s linear infinite;
        }
        @keyframes fpspin { to { transform: rotate(360deg); } }

        /* BACK LINK */
        .fp-back {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 18px;
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .fp-back:hover { color: var(--primary); }

        /* SECURITY NOTE */
        .fp-security {
          display: flex;
          align-items: center;
          gap: 9px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 11px 14px;
          margin-top: 16px;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 400;
        }
        .fp-security svg { color: var(--primary); flex-shrink: 0; }

        /* SUCCESS STATE */
        .fp-success-wrap { text-align: center; }
        .fp-success-circle {
          width: 64px;
          height: 64px;
          background: #ECFDF5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #10B981;
        }
        .fp-success-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-dark);
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }
        .fp-success-sub {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 20px;
        }
        .fp-email-pill {
          display: inline-block;
          background: #EEF2FF;
          color: var(--primary);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 8px;
          margin-bottom: 20px;
          word-break: break-all;
        }
        .fp-success-banner {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-align: left;
          margin-bottom: 16px;
        }
        .fp-success-banner svg { color: #10B981; flex-shrink: 0; margin-top: 1px; }
        .fp-banner-title { font-size: 13px; font-weight: 700; color: #065F46; margin-bottom: 2px; }
        .fp-banner-text { font-size: 12px; color: #047857; line-height: 1.5; }
        .fp-redirect-pill {
          display: inline-block;
          background: #EEF2FF;
          color: var(--primary);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 14px;
          animation: fp-pulse 2s infinite;
        }
        @keyframes fp-pulse { 0%,100%{opacity:1} 50%{opacity:.65} }
        .fp-try-again {
          font-size: 13px;
          color: var(--text-light);
          margin-top: 4px;
        }
        .fp-try-again button {
          background: none; border: none;
          color: var(--primary); font-weight: 600;
          cursor: pointer; text-decoration: underline;
          font-size: inherit; font-family: inherit;
        }

        /* DIV */
        .fp-div {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0 6px;
        }
        .fp-div-line { flex: 1; height: 1px; background: var(--border); }
        .fp-div-txt { font-size: 11px; color: var(--text-light); font-weight: 500; white-space: nowrap; }

        @media (max-width: 900px) {
          .fp-body { flex-direction: column; }
          .fp-left { width: 100%; padding: 40px 24px 36px; border-right: none; border-bottom: 1px solid var(--border); }
          .fp-right { width: 100%; padding: 36px 24px 52px; align-items: flex-start; }
          .fp-headline, .fp-word { font-size: 36px; }
          .fp-nav { padding: 0 24px; }
          .fp-card { padding: 24px 20px; }
        }
      `}</style>

      <div className="fp-root">

        {/* NAV */}
        <nav className="fp-nav">
          <a href="/" className="fp-nav-logo">
            <img src="/Internify.png" alt="Internify Logo" />
          </a>
          <div className="fp-nav-right">
            <button className="fp-nav-back" onClick={() => router.back()}>
              <ArrowLeft size={13} /> Back
            </button>
            <Link href="/auth/signin" className="fp-nav-signin">Sign in</Link>
          </div>
        </nav>

        {/* BODY */}
        <div className="fp-body">

          {/* LEFT */}
          <div className="fp-left">
            <h1 className="fp-headline">
              Reset &amp; get back<br />
              <span className="fp-headline-muted">to your</span><br />
              <span className="fp-word-row">
                {words.map((word, i) => (
                  <span key={i} className={`fp-word ${i === index ? "fp-word-on" : "fp-word-off"}`}>
                    {word}.
                  </span>
                ))}
              </span>
            </h1>

            <p className="fp-tagline">
              Forgot your password? No problem — we'll get you back in seconds.
            </p>

            <div className="fp-steps">
              {[
                {
                  title: "Enter your email",
                  desc: "Type in the email address linked to your Internify account.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  ),
                },
                {
                  title: "Check your inbox",
                  desc: "We'll send a secure reset link — check spam too if needed.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
                    </svg>
                  ),
                },
                {
                  title: "Set a new password",
                  desc: "Click the link and choose a strong new password to get back in.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <div key={i} className="fp-step">
                  <div className="fp-step-icon">{s.icon}</div>
                  <div>
                    <div className="fp-step-title">{s.title}</div>
                    <div className="fp-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="fp-right">
            <div className="fp-card">

              {!submitted ? (
                <>
                  <h2 className="fp-card-title">Forgot password?</h2>
                  <p className="fp-card-sub">
                    Enter your email and we'll send you a reset link right away.
                  </p>

                  <form onSubmit={submit} className="fp-form">
                    <div>
                      <label className="fp-label">Email address</label>
                      <div className="fp-input-wrap">
                        <Mail size={16} className="fp-input-icon" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          className={`fp-input ${error ? "fp-input-error" : ""}`}
                        />
                      </div>
                      {error && (
                        <div className="fp-error-msg">
                          <AlertCircle size={13} /> {error}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="fp-btn"
                      disabled={loading || buttonDisabled}
                    >
                      {loading ? (
                        <><div className="fp-spin" /> Sending…</>
                      ) : buttonDisabled ? (
                        `Resend in ${countdown}s`
                      ) : (
                        "Send reset link →"
                      )}
                    </button>
                  </form>

                  <div className="fp-security">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Your data is secure. We'll never share your email.
                  </div>

                  <div className="fp-div">
                    <div className="fp-div-line" />
                    <span className="fp-div-txt">Remember your password?</span>
                    <div className="fp-div-line" />
                  </div>

                  <Link href="/auth/signin" className="fp-back">
                    <ArrowLeft size={13} /> Back to sign in
                  </Link>
                </>
              ) : (
                /* ── SUCCESS STATE ── */
                <div className="fp-success-wrap">
                  <div className="fp-success-circle">
                    <CheckCircle size={30} />
                  </div>

                  <h2 className="fp-success-title">Check your inbox</h2>
                  <p className="fp-success-sub">
                    If an account exists for this email, we've sent a reset link to:
                  </p>
                  <div className="fp-email-pill">{email}</div>

                  <div className="fp-success-banner">
                    <Mail size={16} />
                    <div>
                      <div className="fp-banner-title">Check your inbox &amp; spam folder</div>
                      <div className="fp-banner-text">
                        The link expires in 30 mins.{countdown > 0 && ` You can resend in ${countdown}s.`}
                      </div>
                    </div>
                  </div>

                  {redirectCountdown > 0 && (
                    <div className="fp-redirect-pill">
                      Redirecting to sign in in {redirectCountdown}s…
                    </div>
                  )}

                  <div className="fp-try-again">
                    Didn't receive it?{" "}
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setButtonDisabled(false);
                        setRedirectCountdown(0);
                      }}
                    >
                      Try again
                    </button>
                  </div>

                  <div className="fp-div">
                    <div className="fp-div-line" />
                    <span className="fp-div-txt">Remember your password?</span>
                    <div className="fp-div-line" />
                  </div>

                  <Link href="/auth/signin" className="fp-back">
                    <ArrowLeft size={13} /> Back to sign in
                  </Link>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
}