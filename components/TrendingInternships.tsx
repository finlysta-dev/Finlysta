"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, CheckCircle, Building2, ArrowRight, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  paid: boolean;
  stipendAmount?: string | null;
  companyLogo?: string | null;
  duration?: string | null;
  skills?: string[] | null;
  isTrending?: boolean | null;
  verified?: boolean | null;
};

function formatStipend(amount: string | null | undefined): string {
  if (!amount) return "Not specified";
  return amount;
}

export default function HomeTrendingInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/internships?limit=6&trending=true");
        const data = await res.json();
        if (Array.isArray(data)) {
          setInternships(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-72 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (internships.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full mb-3 border border-blue-100 shadow-sm">
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
          </motion.div>
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1.5">Trending now</p>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Popular Internships</h2>
        <p className="text-slate-600 text-sm mt-1.5">Most sought opportunities this week</p>
      </motion.div>


      {/* Horizontal Scrolling Carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Display cards only once */}
          {internships.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-80"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/internships/${item.id}`} className="block group h-full">
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-white to-gray-50/50">
                  
                  {/* Trending Badge */}
                  {item.isTrending && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.08, type: "spring" }}
                      className="absolute top-3 right-3 z-10"
                    >
                      <span className="flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-1 rounded-full shadow-lg">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          <Flame className="w-3 h-3" />
                        </motion.div>
                        Hot
                      </span>
                    </motion.div>
                  )}

                  {/* Logo */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-3 border border-blue-100 shadow-sm">
                    {item.companyLogo ? (
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        loading="lazy"
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-blue-400" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-gray-900 mb-0.5 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Company & Verification */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-sm text-gray-600 truncate flex-1">{item.company}</span>
                    {item.verified && (
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      </motion.div>
                    )}
                  </div>

                  {/* Location & Duration */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium border border-blue-100">
                      <MapPin className="w-3 h-3 text-blue-500" />
                      {item.location?.split(",")[0] || "Remote"}
                    </span>
                    {item.duration && (
                      <span className="inline-flex items-center gap-1 bg-purple-50 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium border border-purple-100">
                        <Clock className="w-3 h-3 text-purple-500" />
                        {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Skills */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Apply Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                    {item.paid && item.stipendAmount ? (
                      <span className="text-sm font-bold text-green-600">
                        {formatStipend(item.stipendAmount)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Unpaid</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                    >
                      Apply
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex justify-center mt-10"
      >
        <Link
          href="/internships"
          className="inline-flex items-center gap-2 text-blue-600 font-bold bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 px-6 py-3 rounded-full transition-all border border-blue-200 shadow-sm hover:shadow-md"
        >
          View all internships
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}// Force update - 2026-04-04 18:36:32

// Force rebuild - 2026-04-04 18:44:25
