"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Building2, ChevronRight, Briefcase, Award, CheckCircle, Zap, ExternalLink, GraduationCap, Target, Sparkles, Bookmark, Share2, TrendingUp, Heart, Clock, Users, Globe, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

const getTimeAgo = (date: string) => {
  if (!date) return "Recently";
  const posted = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

const getLocationDisplay = (location: string, workMode: string) => {
  if (!location) return null;
  if (workMode === "remote") return "Remote";
  if (workMode === "hybrid") return `${location} (Hybrid)`;
  if (location === "PAN India" || location.toLowerCase().includes("pan india")) {
    return "Multiple Locations (On-site)";
  }
  return `${location} (On-site)`;
};

const getCompanyInitials = (company: string) => {
  if (!company) return "CO";
  const words = company.split(" ");
  if (words.length === 1) return company.substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

// Fixed: Proper bullet point formatting - smarter period detection
const formatBulletPoints = (text: string) => {
  if (!text) return [];
  
  // Special case: Don't split on periods that are part of abbreviations (B., M., etc.)
  // First, protect abbreviations by replacing them with a placeholder
  let protectedText = text;
  
  // Protect common degree abbreviations (B.B.A., B.Com, M.B.A., etc.)
  const degreeAbbreviations = [
    'B.B.A', 'BBA', 'B.Com', 'BCOM', 'B.Sc', 'BSc', 'B.A', 'BA',
    'M.B.A', 'MBA', 'M.Com', 'MCOM', 'M.Sc', 'MSc', 'M.A', 'MA',
    'Ph.D', 'PhD', 'B.F.M', 'BFM', 'B.M.S', 'BMS', 'B.B.I', 'BBI', 'B.A.F', 'BAF'
  ];
  
  degreeAbbreviations.forEach(abbr => {
    const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
    protectedText = protectedText.replace(regex, abbr.replace(/\./g, '___DOT___'));
  });
  
  // Also protect single letters with periods (like "B.", "M.", "C.")
  protectedText = protectedText.replace(/\b([A-Z])\.\s/g, '$1___DOT___ ');
  
  // Now split by period followed by space or newline
  const sentences = protectedText.split(/\.\s+/);
  
  // Restore the protected dots
  const restoredSentences = sentences.map(sentence => {
    let restored = sentence;
    restored = restored.replace(/___DOT___/g, '.');
    return restored.trim();
  });
  
  return restoredSentences
    .filter(sentence => sentence.length > 0)
    .map(sentence => {
      let cleaned = sentence.trim();
      // Add period back if missing and not already ending with punctuation
      if (!cleaned.endsWith('.') && !cleaned.endsWith('!') && !cleaned.endsWith('?') && cleaned.length > 5) {
        cleaned = cleaned + '.';
      }
      // Capitalize first letter
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    });
};

// Fixed: Extract key responsibilities properly
const extractKeyResponsibilities = (text: string) => {
  if (!text) return [];
  
  // First, try to split by numbered points (1., 2., etc.) or bullet points
  const bulletMatch = text.match(/(?:•|\d+\.)\s*([^•\d]+?)(?=(?:•|\d+\.|$))/g);
  if (bulletMatch) {
    return bulletMatch.map(item => item.replace(/^[•\d\.\s]+/, '').trim()).filter(s => s.length > 10);
  }
  
  // Then try to split by periods that start with capital letter
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
  if (sentences.length > 1) {
    return sentences.filter(s => s.trim().length > 20).map(s => s.trim());
  }
  
  // Finally, split by period and space
  const periodSplit = text.split(/\.\s+/);
  return periodSplit
    .filter(s => s.trim().length > 20)
    .map(s => s.trim() + '.')
    .slice(0, 8);
};

// Helper function to check if a skill is actually a degree term
const isDegreeTerm = (skill: string): boolean => {
  const degreeTerms = [
    'bachelor', 'master', 'mba', 'b.com', 'bba', 'mms', 'cfa', 'chartered', 
    'ca', 'acca', 'graduate', 'post graduate', 'baf', 'bfm', 'bms', 'bbi',
    'bcom', 'bachelor\'s', 'bachelors', 'masters', 'phd', 'doctorate',
    'ba', 'bs', 'bsc', 'ma', 'ms', 'msc', 'mcom', 'mba finance'
  ];
  const lowerSkill = skill.toLowerCase();
  return degreeTerms.some(term => lowerSkill.includes(term));
};

const companyColors = [
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-teal-600",
  "from-purple-600 to-indigo-600",
  "from-rose-600 to-red-600",
  "from-amber-600 to-orange-600",
  "from-cyan-600 to-sky-600",
];

export default function JobDetailClient({ opportunity, relatedJobs }: { opportunity: any; relatedJobs: any[] }) {
  const [saved, setSaved] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showFullQualifications, setShowFullQualifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (opportunity?.id) {
      const savedItems = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
      setSaved(savedItems.includes(opportunity.id));
    }
  }, [opportunity?.id]);

  const handleSave = () => {
    if (!opportunity?.id) return;
    const savedItems = JSON.parse(localStorage.getItem("saved_jobs") || "[]");
    if (!saved) {
      savedItems.push(opportunity.id);
      localStorage.setItem("saved_jobs", JSON.stringify(savedItems));
      setSaved(true);
    } else {
      const filtered = savedItems.filter((id: string) => id !== opportunity.id);
      localStorage.setItem("saved_jobs", JSON.stringify(filtered));
      setSaved(false);
    }
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const text = `${opportunity.title} at ${opportunity.company} - Apply now on Finlysta`;
    
    if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else {
      await navigator.clipboard.writeText(url);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
    }
  };

  const timeAgo = getTimeAgo(opportunity.postedAt);
  const locationDisplay = getLocationDisplay(opportunity.location, opportunity.workMode);
  const companyInitials = getCompanyInitials(opportunity.company);
  const companyColor = companyColors[(opportunity.company?.length || 0) % companyColors.length];

  // Get cleaned responsibilities and qualifications
  let responsibilitiesPoints = extractKeyResponsibilities(opportunity.responsibilities);
  let qualificationsPoints = formatBulletPoints(opportunity.qualifications);
  const benefitsPoints = formatBulletPoints(opportunity.benefits);

  // Split qualifications into Educational and Requirements
  const educationalKeywords = ['bachelor', 'master', 'mba', 'degree', 'b.com', 'bba', 'mms', 'cfa', 'chartered', 'ca', 'acca', 'graduate', 'post graduate', 'baf', 'bfm', 'bms', 'bbi', 'phd', 'doctorate'];
  const educationalQuals = qualificationsPoints.filter((point: string) => 
    educationalKeywords.some(keyword => point.toLowerCase().includes(keyword))
  );
  const otherRequirements = qualificationsPoints.filter((point: string) => 
    !educationalKeywords.some(keyword => point.toLowerCase().includes(keyword))
  );

  const importantNotes = otherRequirements.filter((point: string) => 
    point.toLowerCase().includes("notice") || 
    point.toLowerCase().includes("eligible") ||
    point.toLowerCase().includes("not apply") ||
    point.toLowerCase().includes("note:")
  );
  const mainRequirements = otherRequirements.filter((point: string) => 
    !importantNotes.includes(point)
  );

  // Type-safe skills filtering - EXCLUDING degree terms
  const uniqueSkills: string[] = [...new Set(opportunity.skills || [])] as string[];
  
  const financeSkills = uniqueSkills.filter((s: string) => 
    !isDegreeTerm(s) && ['financial', 'analysis', 'statements', 'loan', 'valuation', 'reporting', 'budgeting', 'forecasting', 'accounting', 'audit', 'tax', 'reconciliation', 'finance'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const technicalSkills = uniqueSkills.filter((s: string) =>
    !isDegreeTerm(s) && ['excel', 'erp', 'database', 'sql', 'power bi', 'tableau', 'software', 'system', 'data', 'quickbooks', 'zoho', 'netsuite', 'tool'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const softSkills = uniqueSkills.filter((s: string) =>
    !isDegreeTerm(s) && ['communication', 'attention', 'detail', 'time management', 'team', 'problem solving', 'judgment', 'curiosity', 'self management', 'dedication', 'responsive', 'customer support', 'interpersonal', 'organizational'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const otherSkills = uniqueSkills.filter((s: string) => 
    !isDegreeTerm(s) && !financeSkills.includes(s) && !technicalSkills.includes(s) && !softSkills.includes(s)
  );

  const getSalaryInsight = () => {
    if (!opportunity.salary) return null;
    const salary = opportunity.salary;
    if (salary.includes('3.5') || salary.includes('3.50')) {
      return "₹3.5 – 6 LPA is competitive for entry-level financial analyst roles in India, especially for candidates building experience in financial analysis and mortgage operations.";
    }
    return null;
  };

  const salaryInsight = getSalaryInsight();

  let cleanSalary = null;
  if (opportunity.salary) {
    let salary = opportunity.salary.replace(/[₹$]/g, '').trim();
    if (salary.includes('Competitive') || salary.includes('competitive')) {
      cleanSalary = "Competitive";
    } else if (salary.includes('Not disclosed') || salary.includes('not disclosed')) {
      cleanSalary = "Not disclosed";
    } else {
      cleanSalary = salary;
    }
  }

  let overviewText = opportunity.overview || "";
  if (overviewText.includes("PAN India location flexibility")) {
    overviewText = "This role is open to candidates across multiple locations in India. " + overviewText.replace("PAN India location flexibility", "");
  } else if (overviewText.includes("PAN India")) {
    overviewText = overviewText.replace(/PAN India/g, "multiple locations across India");
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600">The job you're looking for doesn't exist.</p>
          <Link href="/jobs" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900">{opportunity.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                {!logoError && opportunity.companyLogo ? (
                  <div className="w-20 h-20 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center p-3">
                    <img src={opportunity.companyLogo} alt={opportunity.company} className="max-w-full max-h-full object-contain" onError={() => setLogoError(true)} />
                  </div>
                ) : (
                  <div className={`w-20 h-20 bg-gradient-to-br ${companyColor} rounded-2xl shadow-sm flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">{companyInitials}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{opportunity.title}</h1>
                <p className="text-lg text-gray-600">{opportunity.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {opportunity.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      <CheckCircle size={12} /> Verified
                    </span>
                  )}
                  {opportunity.isActivelyHiring && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                      <Zap size={12} /> Actively Hiring
                    </span>
                  )}
                  {opportunity.isNew && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      <Sparkles size={12} /> New
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    <Clock size={10} /> {timeAgo}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${saved ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              <span className="text-sm">{saved ? "Saved" : "Save Job"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Highlights */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                Job Highlights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {opportunity.type && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase size={14} className="text-gray-400" />
                    <span className="capitalize text-gray-700">{opportunity.type === "job" ? "Full-Time" : "Internship"}</span>
                  </div>
                )}
                {opportunity.experience && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-gray-700">{opportunity.experience}</span>
                  </div>
                )}
                {cleanSalary && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-green-600">{cleanSalary === "Competitive" ? "💰 Competitive" : `₹${cleanSalary}`}</span>
                  </div>
                )}
                {locationDisplay && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-gray-700">{locationDisplay}</span>
                  </div>
                )}
              </div>
            </div>

            {/* About Company */}
            {opportunity.aboutCompany && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={18} className="text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">About {opportunity.company}</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{opportunity.aboutCompany}</p>
              </div>
            )}

            {/* Role Overview */}
            {overviewText && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={18} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-gray-900">Role Overview</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{overviewText}</p>
              </div>
            )}

            {/* Key Responsibilities */}
            {responsibilitiesPoints.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-green-600" />
                  <h2 className="text-lg font-bold text-gray-900">Key Responsibilities</h2>
                </div>
                <ul className="space-y-2">
                  {responsibilitiesPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills - Cleaned, no degree terms */}
            {uniqueSkills.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-amber-600" />
                  <h2 className="text-lg font-bold text-gray-900">Skills You'll Need</h2>
                </div>
                
                {financeSkills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Finance & Accounting</h3>
                    <div className="flex flex-wrap gap-2">
                      {financeSkills.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {technicalSkills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Technical & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {softSkills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {otherSkills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Other Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {otherSkills.map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Educational Qualifications */}
            {educationalQuals.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={18} className="text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">Educational Qualifications</h2>
                </div>
                <ul className="space-y-2">
                  {educationalQuals.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {mainRequirements.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Requirements</h2>
                </div>
                <ul className="space-y-2">
                  {(showFullQualifications ? mainRequirements : mainRequirements.slice(0, 6)).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                {mainRequirements.length > 6 && (
                  <button onClick={() => setShowFullQualifications(!showFullQualifications)} className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    {showFullQualifications ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {showFullQualifications ? "Show less" : `View all ${mainRequirements.length} requirements`}
                  </button>
                )}
              </div>
            )}

            {/* Important Notes */}
            {importantNotes.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-amber-600" />
                  <h2 className="text-lg font-bold text-gray-900">Important Notes</h2>
                </div>
                <ul className="space-y-2">
                  {importantNotes.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefitsPoints.length > 0 && !opportunity.benefits?.includes("not provided") && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={18} className="text-rose-600" />
                  <h2 className="text-lg font-bold text-gray-900">Benefits & Perks</h2>
                </div>
                <ul className="space-y-2">
                  {benefitsPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Report Job */}
            <div className="flex justify-end">
              <button onClick={() => setShowReportModal(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition">
                <AlertCircle size={12} />
                Report Job
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24">
              {/* Apply Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-md">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">💼</div>
                  <h3 className="text-xl font-bold text-gray-900">Apply for This Role</h3>
                  <p className="text-xs text-gray-500 mt-1">Start your finance career today</p>
                </div>

                <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-xl transition text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                  <ExternalLink size={18} /> Apply Now →
                </a>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Posted</span><span className="font-medium text-gray-700">{timeAgo}</span></div>
                  {cleanSalary && <div className="flex justify-between"><span className="text-gray-500">Salary</span><span className="font-semibold text-green-600">{cleanSalary === "Competitive" ? "💰 Competitive" : `₹${cleanSalary}`}</span></div>}
                  {opportunity.experience && <div className="flex justify-between"><span className="text-gray-500">Experience</span><span className="font-medium text-gray-700">{opportunity.experience}</span></div>}
                </div>

                {/* Share buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">📢 Share this job:</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleShare("linkedin")} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">LinkedIn</button>
                    <button onClick={() => handleShare("whatsapp")} className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium">WhatsApp</button>
                    <button onClick={() => handleShare()} className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium">Copy Link</button>
                  </div>
                </div>
              </div>

              {/* Salary Insight */}
              {salaryInsight && (
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100 p-4 shadow-sm mt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">💡 Salary Insight</h4>
                  <p className="text-xs text-gray-600">{salaryInsight}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {relatedJobs && relatedJobs.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={18} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Similar Entry-Level Finance Jobs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="group block bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {job.companyLogo ? <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center p-1.5"><img src={job.companyLogo} alt={job.company} className="max-w-full max-h-full object-contain" /></div>
                      : <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">{getCompanyInitials(job.company)}</span></div>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm line-clamp-1">{job.title}</h3>
                      <p className="text-xs text-gray-500">{job.company}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <MapPin size={10} />{job.location?.split(',')[0]}
                        {job.experience && <span className="text-gray-400">{job.experience}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Apply Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-xl transition text-center flex items-center justify-center gap-2 shadow-md">
          <ExternalLink size={18} /> Apply for This Job →
        </a>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 mt-10 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Start Your Finance Career Today</h3>
          <p className="text-gray-600 text-sm mb-4">Browse more entry-level financial analyst jobs and internships</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/jobs" className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Browse All Jobs</Link>
            <Link href="/internships" className="px-5 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">Find Internships</Link>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Report Job</h3>
            <p className="text-sm text-gray-600 mb-4">Help us keep Finlysta safe by reporting this job if it's inappropriate or spam.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
              <button onClick={() => { setShowReportModal(false); alert("Thank you for reporting. We'll review this job."); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}