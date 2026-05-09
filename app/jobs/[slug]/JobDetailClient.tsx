"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Building2, Briefcase, Award, CheckCircle, Zap, ExternalLink, GraduationCap, Target, Sparkles, Bookmark, Share2, TrendingUp, Heart, Clock, Users, Globe, ChevronDown, ChevronUp, AlertCircle, Eye } from "lucide-react";

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

const formatBulletPoints = (text: string) => {
  if (!text) return [];
  // Split by periods followed by space or newline
  const sentences = text.split(/\.\s+/);
  return sentences
    .filter(sentence => sentence.trim().length > 0)
    .map(sentence => sentence.trim() + (sentence.endsWith('.') ? '' : '.'));
};

// Extract key bullet points from long text
const extractKeyResponsibilities = (text: string) => {
  if (!text) return [];
  // Common responsibility patterns
  const responsibilityPatterns = [
    /(?:Assess|Review|Analyze|Prepare|Create|Develop|Maintain|Manage|Coordinate|Support|Assist|Lead|Execute|Implement|Configure|Generate|Verify|Perform|Process|Document|Track|Report|Communicate|Collaborate)[^.!]*[.!]/gi,
  ];
  
  const matches = text.match(responsibilityPatterns[0]);
  if (matches && matches.length > 0) {
    return matches.slice(0, 8).map(m => m.trim());
  }
  
  // Fallback: split by periods
  const sentences = text.split(/\.\s+/);
  return sentences.filter(s => s.length > 20 && s.length < 150).slice(0, 8).map(s => s.trim() + '.');
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
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showFullQualifications, setShowFullQualifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAllSkillsModal, setShowAllSkillsModal] = useState(false);

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

  // Extract key responsibilities as bullet points
  const responsibilitiesPoints = extractKeyResponsibilities(opportunity.responsibilities);
  const qualificationsPoints = formatBulletPoints(opportunity.qualifications);
  const benefitsPoints = formatBulletPoints(opportunity.benefits);

  // Separate important notes from qualifications
  const importantNotes = qualificationsPoints.filter(point => 
    point.toLowerCase().includes("notice") || 
    point.toLowerCase().includes("eligible") ||
    point.toLowerCase().includes("not apply") ||
    point.toLowerCase().includes("not eligible") ||
    point.toLowerCase().includes("note:")
  );
  const mainQualifications = qualificationsPoints.filter(point => 
    !importantNotes.includes(point)
  );

  // Clean main qualifications to be more readable
  const cleanQualifications = mainQualifications.map(q => {
    if (q.includes("years") && q.includes("experience")) return q;
    if (q.toLowerCase().includes("communication")) return "Strong verbal and written communication skills in English";
    if (q.toLowerCase().includes("attention")) return "Attention to detail and high degree of intellectual curiosity";
    if (q.toLowerCase().includes("customer")) return "Customer service focus with drive to exceed expectations";
    if (q.toLowerCase().includes("priority")) return "Ability to manage and prioritize multiple work requirements";
    if (q.toLowerCase().includes("judgment")) return "Ability to exercise judgment within procedures and practices";
    return q;
  });

  const uniqueSkills = [...new Set(opportunity.skills || [])];
  
  const financeSkills = uniqueSkills.filter((s: string) => 
    ['financial', 'analysis', 'statements', 'loan', 'valuation', 'reporting', 'budgeting', 'forecasting', 'accounting', 'audit', 'tax', 'reconciliation', 'finance'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const technicalSkills = uniqueSkills.filter((s: string) =>
    ['excel', 'erp', 'database', 'sql', 'power bi', 'tableau', 'software', 'system', 'data', 'quickbooks', 'zoho', 'netsuite', 'tool'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const softSkills = uniqueSkills.filter((s: string) =>
    ['communication', 'attention', 'detail', 'time management', 'team', 'problem solving', 'judgment', 'curiosity', 'self management', 'dedication', 'responsive', 'customer support', 'interpersonal', 'organizational'].some(keyword => s.toLowerCase().includes(keyword))
  );
  
  const otherSkills = uniqueSkills.filter((s: string) => 
    !financeSkills.includes(s) && !technicalSkills.includes(s) && !softSkills.includes(s)
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

  // Clean salary display
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

  // Clean overview text - fix grammar
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
            <span>/</span>
            <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
            <span>/</span>
            <span className="text-gray-900">{opportunity.title}</span>
            <span>/</span>
            <span className="text-gray-600">{opportunity.company}</span>
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

            {/* Role Overview - Fixed grammar */}
            {overviewText && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={18} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-gray-900">Role Overview</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{overviewText}</p>
              </div>
            )}

            {/* Key Responsibilities - Clean bullet points */}
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

            {/* Skills - With chip UI and modal */}
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
                      {financeSkills.slice(0, 8).map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {technicalSkills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Technical & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.slice(0, 8).map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {softSkills.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.slice(0, 8).map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {uniqueSkills.length > 8 && (
                  <button onClick={() => setShowAllSkillsModal(true)} className="mt-3 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                    View all {uniqueSkills.length} skills →
                  </button>
                )}
              </div>
            )}

            {/* Qualifications & Requirements - Clean bullet points */}
            {cleanQualifications.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={18} className="text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">Qualifications & Requirements</h2>
                </div>
                <ul className="space-y-2">
                  {(showFullQualifications ? cleanQualifications : cleanQualifications.slice(0, 6)).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                {cleanQualifications.length > 6 && (
                  <button onClick={() => setShowFullQualifications(!showFullQualifications)} className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    {showFullQualifications ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {showFullQualifications ? "Show less" : `View all ${cleanQualifications.length} requirements`}
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

            {/* Why This Role is Great for Freshers */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-green-600" />
                <h2 className="text-lg font-bold text-gray-900">Why This Role is Great for Freshers</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Entry-level friendly with 0-5 years experience accepted</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Building2 size={14} className="text-green-500" /> Large established company with 900+ employees</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Target size={14} className="text-green-500" /> Strong analytical and financial systems exposure</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Award size={14} className="text-green-500" /> Build expertise in ERP systems and financial analysis</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Users size={14} className="text-green-500" /> Join a growing team with learning opportunities</li>
              </ul>
            </div>

            {/* How to Prepare */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={18} className="text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">How to Prepare for This Role</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Build proficiency in Excel and financial statements</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Practice attention to detail through case studies</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Learn basics of ERP systems and database management</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Highlight any experience with data analysis or verification</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-blue-100">
                <p className="text-xs text-gray-500">📚 Recommended: Check our <Link href="/roadmap" className="text-blue-600 hover:underline">Career Roadmap</Link> for financial analysts</p>
              </div>
            </div>

            {/* Before You Apply */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Heart size={18} className="text-rose-600" />
                <h2 className="text-lg font-bold text-gray-900">Before You Apply</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Update your resume with relevant finance skills</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Highlight Excel, data analysis, and attention to detail</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Mention any analytical projects or internships</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Keep your communication professional and clear</li>
              </ul>
            </div>

            {/* Application Difficulty & Trust */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Application Difficulty</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">🟢 Beginner Friendly</span>
                <span className="text-sm text-gray-600">Strong communication and analytical skills required</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                <CheckCircle size={12} className="text-green-500" />
                <span>Verified on {new Date(opportunity.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

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

              {/* Company Snapshot */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mt-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><Building2 size={14} className="text-blue-500" />Company Snapshot</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Industry</span><span className="text-gray-700">Financial Services</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Founded</span><span className="text-gray-700">2002</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Size</span><span className="text-gray-700">900+ Employees</span></div>
                  {opportunity.workMode && opportunity.workMode !== "Not specified" && (
                    <div className="flex justify-between"><span className="text-gray-500">Work Mode</span><span className="text-gray-700 capitalize">{opportunity.workMode}</span></div>
                  )}
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
              {relatedJobs.map((job) => {
                let jobCleanSalary = null;
                if (job.salary) {
                  let salary = job.salary.replace(/[₹$]/g, '').trim();
                  if (salary.includes('Competitive') || salary.includes('competitive')) {
                    jobCleanSalary = "Competitive";
                  } else {
                    jobCleanSalary = salary;
                  }
                }
                return (
                  <Link key={job.id} href={`/jobs/${job.slug}`} className="group block bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {job.companyLogo ? <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center p-1.5"><img src={job.companyLogo} alt={job.company} className="max-w-full max-h-full object-contain" /></div>
                        : <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">{getCompanyInitials(job.company)}</span></div>}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm line-clamp-1">{job.title}</h3>
                        <p className="text-xs text-gray-500">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                          {jobCleanSalary && <span className="text-green-600 font-medium">{jobCleanSalary === "Competitive" ? "💰 Competitive" : `₹${jobCleanSalary.split('-')[0]}+`}</span>}
                          {job.experience && <span className="text-gray-400">{job.experience}</span>}
                          {job.workMode && job.workMode !== "Not specified" && (
                            <span className="capitalize text-gray-400">{job.workMode}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                          <MapPin size={10} />{job.location?.split(',')[0]}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
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

      {/* Skills Modal */}
      {showAllSkillsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">All Required Skills</h3>
              <button onClick={() => setShowAllSkillsModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            <div className="space-y-4">
              {financeSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Finance & Accounting</h4>
                  <div className="flex flex-wrap gap-2">
                    {financeSkills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {technicalSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Technical & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {softSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {otherSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Other Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {otherSkills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setShowAllSkillsModal(false)} className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      )}

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