"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/Finlysta.png"
              alt="Finlysta Logo"
              className="h-10 w-30 rounded-lg object-contain"
            />
          </Link>

          <Link
            href="/practice"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Practice Excel →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            This Privacy Policy explains how Finlysta handles information
            when you visit and use our website, Excel practice resources,
            interview preparation content and learning materials.
          </p>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            1. Introduction
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Finlysta is an online learning platform focused on practical
            skills, Excel practice, interview preparation and educational
            resources for students, freshers and aspiring finance,
            accounting and analyst professionals.
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            We respect your privacy and aim to be transparent about the
            information that may be collected when you use Finlysta.
          </p>
        </section>

        {/* 2. Information We May Collect */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            2. Information We May Collect
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Depending on how you use Finlysta, we may receive limited
            information such as:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">
                Information you provide
              </h3>
              <p className="mt-1 text-slate-600">
                Such as your name, email address and message when you
                contact us.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">
                Usage information
              </h3>
              <p className="mt-1 text-slate-600">
                Information about how visitors interact with pages and
                features on the website.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">
                Technical information
              </h3>
              <p className="mt-1 text-slate-600">
                Information such as browser type, device information and
                general website activity that may be collected through
                analytics or technical services.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Information You Provide */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            3. Information You Provide
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you contact Finlysta through our contact page, you may
            provide information such as your name, email address, topic
            and message.
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            This information may be used to respond to your question,
            feedback, correction request, suggestion or support request.
          </p>
        </section>

        {/* 4. How We Use Information */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            4. How We Use Information
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Information may be used to:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-slate-600">
            <li>Respond to questions and support requests.</li>
            <li>Improve Finlysta's website and learning resources.</li>
            <li>Identify and fix errors or technical problems.</li>
            <li>Understand how visitors use the website.</li>
            <li>Improve Excel practice and interview preparation content.</li>
            <li>Maintain the security and reliability of the website.</li>
          </ul>
        </section>

        {/* 5. Cookies and Analytics */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            5. Cookies and Analytics
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Finlysta may use cookies, analytics tools or similar
            technologies to understand website traffic, measure
            performance and improve the user experience.
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            These technologies may collect information such as pages
            visited, approximate usage patterns, browser information and
            other technical information.
          </p>
        </section>

        {/* 6. Third-Party Services */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            6. Third-Party Services
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Finlysta may use third-party services for website hosting,
            analytics, security, email communication or other technical
            functionality.
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            These services may process information according to their own
            privacy policies and terms.
          </p>
        </section>

        {/* 7. Data Security */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            7. Data Security
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            We take reasonable steps to protect information submitted
            through Finlysta. However, no internet transmission or online
            storage system can be guaranteed to be completely secure.
          </p>
        </section>

        {/* 8. Changes to This Privacy Policy */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            8. Changes to This Privacy Policy
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            We may update this Privacy Policy from time to time as Finlysta
            develops new features, services or functionality. Updates will
            be reflected on this page with a revised update date.
          </p>
        </section>

        {/* 9. Contact Finlysta */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            9. Contact Finlysta
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you have questions about this Privacy Policy or want to
            report a privacy concern, please contact Finlysta.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Contact Finlysta →
          </Link>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-center text-sm text-slate-400">
            © 2026 Finlysta. Practice skills. Get interview ready.
          </p>
        </div>
      </footer>
    </main>
  );
}