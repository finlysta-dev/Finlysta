"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, User, Bell, Calendar } from "lucide-react";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Sending request with:", { email, name, frequency });
      
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name, 
          frequency,
          source: 'homepage_banner' 
        })
      });
      
      const data = await res.json();
      console.log("Response:", data);
      
      if (res.ok) {
        setIsSubscribed(true);
        setName("");
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        setError(data.error || data.details || "Something went wrong");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Get Latest Jobs in Your Inbox
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Subscribe to get daily/weekly job updates directly in your inbox!
          </p>
        </div>
        
        {isSubscribed ? (
          <div className="flex items-center justify-center gap-2 text-green-600 py-4">
            <CheckCircle size={20} />
            <span className="text-sm">Subscribed successfully! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            {/* Name Field */}
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
              />
            </div>
            
            {/* Email Field */}
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
              />
            </div>
            
            {/* Preference Options */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={frequency === "daily"}
                  onChange={() => setFrequency("daily")}
                  className="w-3.5 h-3.5 accent-[#FFD700]"
                />
                <div className="flex items-center gap-1.5">
                  <Bell size={14} className="text-[#FFD700]" />
                  <span className="text-gray-700 text-xs">Daily jobs</span>
                </div>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={frequency === "weekly"}
                  onChange={() => setFrequency("weekly")}
                  className="w-3.5 h-3.5 accent-[#FFD700]"
                />
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#FFD700]" />
                  <span className="text-gray-700 text-xs">Weekly updates</span>
                </div>
              </label>
            </div>
            
            {/* Subscribe Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2540] text-sm font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#0A2540] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Subscribe Now</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        )}
        {error && <p className="text-red-500 text-xs mt-3 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
