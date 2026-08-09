"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", topic: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a73e8] text-white font-bold text-xl">
              F
            </div>
            <span className="text-2xl font-bold text-gray-900">Finlysta</span>
          </Link>

          <Link
            href="/practice"
            className="rounded-lg bg-[#1a73e8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1557b0]"
          >
            Practice Excel
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Let's Talk
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Have questions about Excel practice? Need help with something?
            We're here to help you become interview-ready.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
              <p className="mt-2 text-gray-600">
                We'd love to hear from you. Choose a topic and send us a
                message.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    💬
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">General Questions</h3>
                    <p className="text-sm text-gray-600">
                      About Finlysta, Excel practice, or our platform
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
                    💡
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Feedback</h3>
                    <p className="text-sm text-gray-600">
                      Suggestions to improve our content or features
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
                    🔧
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Corrections</h3>
                    <p className="text-sm text-gray-600">
                      Found an error in our content? Let us know
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Support</h3>
                    <p className="text-sm text-gray-600">
                      Need help with Excel or interview preparation
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-gray-50 p-6">
                <p className="text-sm text-gray-600">
                  ⚡ We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
              <p className="mt-1 text-gray-600">
                Fill out the form and we'll get back to you as soon as possible.
              </p>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
                  ❌ {error}
                </div>
              )}

              {submitted ? (
                <div className="mt-8 rounded-xl bg-green-50 p-6 text-center">
                  <div className="text-4xl">✅</div>
                  <h3 className="mt-3 text-xl font-bold text-green-800">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-green-700">
                    Thanks for reaching out. We'll respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="correction">Report a Correction</option>
                      <option value="support">Excel Support</option>
                      <option value="suggestion">Content Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#1a73e8] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1557b0] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>

                  <p className="text-center text-sm font-medium text-gray-700">
                    We'll only use your information to respond to your message.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-gray-900">Practice</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/practice" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    Excel Practice
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    Free Assessment
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Functions</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/excel-functions/vlookup" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    VLOOKUP
                  </Link>
                </li>
                <li>
                  <Link href="/excel-functions/index-match" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    INDEX MATCH
                  </Link>
                </li>
                <li>
                  <Link href="/excel-functions/sumifs" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    SUMIFS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Topics</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/excel/pivot-tables" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    Pivot Tables
                  </Link>
                </li>
                <li>
                  <Link href="/excel/power-query" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    Power Query
                  </Link>
                </li>
                <li>
                  <Link href="/excel/data-cleaning" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    Data Cleaning
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Company</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-[#1a73e8] font-medium">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#1a73e8]">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}