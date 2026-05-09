"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Clock, Building2, Calendar,
  CheckCircle, Bookmark, Share2, Zap,
  ExternalLink, Award, GraduationCap,
  Briefcase, Target, Sparkles, Users, Heart, AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";

interface Internship {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  aboutCompany?: string;
  type: string;
  workMode: string;
  location: string;
  duration?: string;
  stipend?: string;
  salary?: string;
  skills: string[];
  overview?: string;
  responsibilities?: string;
  qualifications?: string;
  benefits?: string;
  applyLink: string;
  isVerified: boolean;
  isActivelyHiring: boolean;
  isNew: boolean;
  postedAt: string;
  deadline?: string;
  updatedAt?: string;
}

// Helper functions
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

const getCompanyColor = (company: string) => {
  const colors = [
    "from-emerald-600 to-emerald-800",
    "from-blue-600 to-blue-800",
    "from-purple-600 to-indigo-600",
    "from-rose-600 to-red-600",
    "from-amber-600 to-orange-600",
    "from-cyan-600 to-sky-600",
  ];
  const index = company.length % colors.length;
  return colors[index];
};

const formatBulletPoints = (text: string) => {
  if (!text) return [];
  const sentences = text.split(/\.\s+/);
  return sentences
    .filter(sentence => sentence.trim().length > 0)
    .map(sentence => sentence.trim() + (sentence.endsWith('.') ? '' : '.'));
};

// Extract key responsibilities
const extractKeyResponsibilities = (text: string) => {
  if (!text) return [];
  const responsibilityPatterns = [
    /(?:Assist|Help|Support|Prepare|Create|Develop|Maintain|Manage|Coordinate|Review|Analyze|Participate|Learn|Contribute)[^.!]*[.!]/gi,
  ];
  
  const matches = text.match(responsibilityPatterns[0]);
  if (matches && matches.length > 0) {
    return matches.slice(0, 8).map(m => m.trim());
  }
  
  const sentences = text.split(/\.\s+/);
  return sentences.filter(s => s.length > 20 && s.length < 150).slice(0, 8).map(s => s.trim() + '.');
};

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showFullQualifications, setShowFullQualifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAllSkillsModal, setShowAllSkillsModal] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    const fetchInternship = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/opportunities/slug/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) throw new Error("Internship not found");
          throw new Error("Failed to fetch internship");
        }
        
        const data = await response.json();
        setInternship(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Failed to load internship");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInternship();
  }, [slug]);

  useEffect(() => {
    if (internship) {
      const savedItems = JSON.parse(localStorage.getItem("saved_opportunities") || "[]");
      setSaved(savedItems.includes(internship.id));
    }
  }, [internship]);

  const handleSave = () => {
    if (!internship) return;
    const savedItems = JSON.parse(localStorage.getItem("saved_opportunities") || "[]");
    if (!saved) {
      savedItems.push(internship.id);
      localStorage.setItem("saved_opportunities", JSON.stringify(savedItems));
      setSaved(true);
    } else {
      const filtered = savedItems.filter((item: string) => item !== internship.id);
      localStorage.setItem("saved_opportunities", JSON.stringify(filtered));
      setSaved(false);
    }
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const text = `${internship?.title} at ${internship?.company} - Apply now on Finlysta`;
    
    if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleApply = () => {
    if (internship?.applyLink) {
      window.open(internship.applyLink, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Internship Not Found</h1>
          <p className="text-gray-600 mb-6">The internship you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push("/internships")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Browse All Internships
          </button>
        </div>
      </div>
    );
  }

  const timeAgo = getTimeAgo(internship.postedAt);
  const locationDisplay = getLocationDisplay(internship.location, internship.workMode);
  const companyInitials = getCompanyInitials(internship.company);
  const companyColor = getCompanyColor(internship.company);

  // Clean salary/stipend display
  let cleanStipend = null;
  if (internship.stipend || internship.salary) {
    const stipendText = internship.stipend || internship.salary || "";
    let stipend = stipendText.replace(/[₹$]/g, '').trim();
    if (stipend.includes('Competitive') || stipend.includes('competitive')) {
      cleanStipend = "Competitive";
    } else if (stipend.includes('Unpaid') || stipend.includes('unpaid')) {
      cleanStipend = "Unpaid";
    } else {
      cleanStipend = stipend;
    }
  }

  // Format bullet points
  const responsibilitiesPoints = extractKeyResponsibilities(internship.responsibilities || "");
  const qualificationsPoints = formatBulletPoints(internship.qualifications || "");
  const benefitsPoints = formatBulletPoints(internship.benefits || "");

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

  // Skills categorization
  const uniqueSkills = [...new Set(internship.skills || [])];
  const financeSkills = uniqueSkills.filter((s: string) => 
    ['financial', 'analysis', 'accounting', 'budgeting', 'forecasting', 'audit', 'tax', 'reconciliation'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const technicalSkills = uniqueSkills.filter((s: string) =>
    ['excel', 'sql', 'python', 'power bi', 'tableau', 'software', 'system', 'data', 'quickbooks', 'tally', 'erp'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const softSkills = uniqueSkills.filter((s: string) =>
    ['communication', 'attention', 'detail', 'team', 'problem solving', 'organization', 'time management', 'leadership'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const otherSkills = uniqueSkills.filter((s: string) => 
    !financeSkills.includes(s) && !technicalSkills.includes(s) && !softSkills.includes(s)
  );

  const getStipendInsight = () => {
    if (!internship.stipend && !internship.salary) return null;
    return "Competitive stipend for entry-level finance internships in India. Great opportunity to gain hands-on experience.";
  };

  const stipendInsight = getStipendInsight();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span>/</span>
            <Link href="/internships" className="hover:text-emerald-600">Internships</Link>
            <span>/</span>
            <span className="text-gray-900">{internship.title}</span>
            <span>/</span>
            <span className="text-gray-600">{internship.company}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                {!logoError && internship.companyLogo ? (
                  <div className="w-20 h-20 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center p-3">
                    <img src={internship.companyLogo} alt={internship.company} className="max-w-full max-h-full object-contain" onError={() => setLogoError(true)} />
                  </div>
                ) : (
                  <div className={`w-20 h-20 bg-gradient-to-br ${companyColor} rounded-2xl shadow-sm flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">{companyInitials}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{internship.title}</h1>
                <p className="text-lg text-gray-600">{internship.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {internship.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      <CheckCircle size={12} /> Verified
                    </span>
                  )}
                  {internship.isActivelyHiring && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                      <Zap size={12} /> Actively Hiring
                    </span>
                  )}
                  {internship.isNew && (
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
            <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${saved ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
              <span className="text-sm">{saved ? "Saved" : "Save Internship"}</span>
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
                Internship Highlights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="text-gray-700">Internship</span>
                </div>
                {internship.duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-gray-700">{internship.duration}</span>
                  </div>
                )}
                {cleanStipend && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-green-600">{cleanStipend === "Competitive" ? "💰 Competitive" : cleanStipend === "Unpaid" ? "Unpaid" : `₹${cleanStipend}`}</span>
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
            {internship.aboutCompany && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={18} className="text-emerald-600" />
                  <h2 className="text-lg font-bold text-gray-900">About {internship.company}</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{internship.aboutCompany}</p>
              </div>
            )}

            {/* Role Overview */}
            {internship.overview && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={18} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-gray-900">Role Overview</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{internship.overview}</p>
              </div>
            )}

            {/* Key Responsibilities */}
            {responsibilitiesPoints.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-emerald-600" />
                  <h2 className="text-lg font-bold text-gray-900">Key Responsibilities</h2>
                </div>
                <ul className="space-y-2">
                  {responsibilitiesPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
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
                  <button onClick={() => setShowAllSkillsModal(true)} className="mt-3 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition">
                    View all {uniqueSkills.length} skills →
                  </button>
                )}
              </div>
            )}

            {/* Qualifications */}
            {mainQualifications.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={18} className="text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">Qualifications & Requirements</h2>
                </div>
                <ul className="space-y-2">
                  {(showFullQualifications ? mainQualifications : mainQualifications.slice(0, 6)).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                {mainQualifications.length > 6 && (
                  <button onClick={() => setShowFullQualifications(!showFullQualifications)} className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    {showFullQualifications ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {showFullQualifications ? "Show less" : `View all ${mainQualifications.length} requirements`}
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

            {/* Why This Internship is Great for Freshers */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-green-600" />
                <h2 className="text-lg font-bold text-gray-900">Why This Internship is Great for Freshers</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Build real-world finance experience before graduating</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Building2 size={14} className="text-green-500" /> Work with experienced finance professionals</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Target size={14} className="text-green-500" /> Learn industry-standard tools and processes</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Award size={14} className="text-green-500" /> Potential for full-time conversion based on performance</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Users size={14} className="text-green-500" /> Network with industry experts and build your professional circle</li>
              </ul>
            </div>

            {/* How to Prepare */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={18} className="text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">How to Prepare for This Internship</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Build proficiency in Excel and financial fundamentals</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Research the company and understand their business model</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Prepare questions about the role and learning opportunities</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-blue-500" /> Highlight any relevant coursework or projects on your resume</li>
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
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Update your resume with relevant coursework and skills</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Highlight any previous internships or projects</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Prepare a cover letter explaining your interest in finance</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> Review basic accounting and finance concepts</li>
              </ul>
            </div>

            {/* Application Difficulty */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Application Difficulty</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">🟢 Beginner Friendly</span>
                <span className="text-sm text-gray-600">Basic finance knowledge and eagerness to learn required</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                <CheckCircle size={12} className="text-green-500" />
                <span>Verified on {new Date(internship.updatedAt || internship.postedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Benefits */}
            {benefitsPoints.length > 0 && !internship.benefits?.includes("not provided") && (
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
                Report Internship
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24">
              {/* Apply Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-md">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="text-xl font-bold text-gray-900">Apply for This Internship</h3>
                  <p className="text-xs text-gray-500 mt-1">Start your finance career journey</p>
                </div>

                <button
                  onClick={handleApply}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-xl transition text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ExternalLink size={18} /> Apply Now →
                </button>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Posted</span><span className="font-medium text-gray-700">{timeAgo}</span></div>
                  {cleanStipend && <div className="flex justify-between"><span className="text-gray-500">Stipend</span><span className="font-semibold text-green-600">{cleanStipend === "Competitive" ? "💰 Competitive" : cleanStipend === "Unpaid" ? "Unpaid" : `₹${cleanStipend}`}</span></div>}
                  {internship.duration && <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium text-gray-700">{internship.duration}</span></div>}
                </div>

                {/* Share buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">📢 Share this internship:</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleShare("linkedin")} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">LinkedIn</button>
                    <button onClick={() => handleShare("whatsapp")} className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium">WhatsApp</button>
                    <button onClick={() => handleShare()} className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium">Copy Link</button>
                  </div>
                </div>
              </div>

              {/* Company Snapshot */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mt-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><Building2 size={14} className="text-emerald-500" />Company Snapshot</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="text-gray-700">Corporate</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Internship Type</span><span className="text-gray-700 capitalize">{internship.workMode || "On-site"}</span></div>
                  {internship.duration && <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="text-gray-700">{internship.duration}</span></div>}
                </div>
              </div>

              {/* Stipend Insight */}
              {stipendInsight && (
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100 p-4 shadow-sm mt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">💡 Stipend Insight</h4>
                  <p className="text-xs text-gray-600">{stipendInsight}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Apply Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <button onClick={handleApply} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-xl transition text-center flex items-center justify-center gap-2 shadow-md">
          <ExternalLink size={18} /> Apply for This Internship →
        </button>
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
            <button onClick={() => setShowAllSkillsModal(false)} className="mt-6 w-full py-2 bg-emerald-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-100 mt-10 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Start Your Finance Career Today</h3>
          <p className="text-gray-600 text-sm mb-4">Browse more entry-level finance internships and jobs</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/internships" className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700">Browse All Internships</Link>
            <Link href="/jobs" className="px-5 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">Find Jobs</Link>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Report Internship</h3>
            <p className="text-sm text-gray-600 mb-4">Help us keep Finlysta safe by reporting this internship if it's inappropriate or spam.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
              <button onClick={() => { setShowReportModal(false); alert("Thank you for reporting. We'll review this internship."); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}