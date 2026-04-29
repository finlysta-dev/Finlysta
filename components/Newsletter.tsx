"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, User, ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [interests, setInterests] = useState<{ jobs: boolean; internships: boolean }>({
    jobs: false,
    internships: false,
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFrequency, setShowFrequency] = useState(false);

  const handleInterestChange = (type: "jobs" | "internships") => {
    const newInterests = {
      ...interests,
      [type]: !interests[type],
    };
    setInterests(newInterests);
    
    // Show frequency if at least one interest is selected
    setShowFrequency(newInterests.jobs || newInterests.internships);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!interests.jobs && !interests.internships) {
      setError("Please select at least one option (Jobs or Internships)");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const requestBody = {
        email: email,
        name: name,
        frequency: frequency,
        interests: {
          jobs: interests.jobs,
          internships: interests.internships
        },
        source: "newsletter_form"
      };
      
      console.log("Sending request:", requestBody);
      
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(requestBody)
      });
      
      const data = await res.json();
      console.log("Response:", data);
      
      if (res.ok) {
        setIsSubscribed(true);
        setName("");
        setEmail("");
        setInterests({ jobs: false, internships: false });
        setShowFrequency(false);
        setTimeout(() => setIsSubscribed(false), 4000);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasAnyInterest = interests.jobs || interests.internships;

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-4">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Career Updates</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get New Finance Jobs Before Others
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Curated opportunities delivered to your inbox.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {isSubscribed ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're subscribed! 🎉</h3>
              <p className="text-gray-500 text-sm">Check your inbox for confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="p-6 md:p-8 space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Interests - Simple Checkboxes (no icons) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I'm interested in <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                      interests.jobs
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={interests.jobs}
                      onChange={() => handleInterestChange('jobs')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium">Jobs</span>
                  </label>
                  <label
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                      interests.internships
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={interests.internships}
                      onChange={() => handleInterestChange('internships')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium">Internships</span>
                  </label>
                </div>
                {!hasAnyInterest && (
                  <p className="text-amber-600 text-xs mt-2">
                    ⚠️ Select at least one option to continue
                  </p>
                )}
              </div>
              
              {/* Frequency - Radio style buttons */}
              {showFrequency && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How often do you want updates? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFrequency("daily")}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                        frequency === "daily"
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Clock size={16} />
                      <span className="font-medium">Daily</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency("weekly")}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                        frequency === "weekly"
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Calendar size={16} />
                      <span className="font-medium">Weekly</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !hasAnyInterest}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
                  hasAnyInterest
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Get New Jobs in Your Inbox </span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-400 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;