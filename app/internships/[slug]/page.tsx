"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Clock, Building2, Calendar,
  CheckCircle, Bookmark, Share2, Zap,
  ExternalLink, Award, GraduationCap,
  Briefcase, Target, Sparkles, ChevronRight, ChevronUp,ChevronDown, TrendingUp, Heart, AlertCircle
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

// Fixed: Proper bullet point formatting - smarter period detection
const formatBulletPoints = (text: string) => {
  if (!text) return [];
  
  // Protect common degree abbreviations from being split
  let protectedText = text;
  const degreeAbbreviations = [
    'B.B.A', 'BBA', 'B.Com', 'BCOM', 'B.Sc', 'BSc', 'B.A', 'BA',
    'M.B.A', 'MBA', 'M.Com', 'MCOM', 'M.Sc', 'MSc', 'M.A', 'MA',
    'Ph.D', 'PhD', 'B.F.M', 'BFM', 'B.M.S', 'BMS', 'B.B.I', 'BBI', 'B.A.F', 'BAF'
  ];
  
  degreeAbbreviations.forEach(abbr => {
    const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
    protectedText = protectedText.replace(regex, abbr.replace(/\./g, '___DOT___'));
  });
  
  protectedText = protectedText.replace(/\b([A-Z])\.\s/g, '$1___DOT___ ');
  
  const sentences = protectedText.split(/\.\s+/);
  
  const restoredSentences = sentences.map(sentence => {
    let restored = sentence;
    restored = restored.replace(/___DOT___/g, '.');
    return restored.trim();
  });
  
  return restoredSentences
    .filter(sentence => sentence.length > 0)
    .map(sentence => {
      let cleaned = sentence.trim();
      if (!cleaned.endsWith('.') && !cleaned.endsWith('!') && !cleaned.endsWith('?') && cleaned.length > 5) {
        cleaned = cleaned + '.';
      }
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    });
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

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showFullQualifications, setShowFullQualifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [relatedInternships, setRelatedInternships] = useState<Internship[]>([]);

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

  // Fetch related internships
  useEffect(() => {
    if (internship?.id) {
      const fetchRelatedInternships = async () => {
        try {
          const response = await fetch(`/api/opportunities/related?jobId=${internship.id}&type=internship`);
          if (response.ok) {
            const data = await response.json();
            setRelatedInternships(data);
          }
        } catch (error) {
          console.error("Error fetching related internships:", error);
        }
      };
      fetchRelatedInternships();
    }
  }, [internship?.id]);

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

  // Clean stipend display
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
  let qualificationsPoints = formatBulletPoints(internship.qualifications || "");
  const benefitsPoints = formatBulletPoints(internship.benefits || "");

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

  // Skills categorization - EXCLUDING degree terms
  const uniqueSkills: string[] = [...new Set(internship.skills || [])] as string[];
  
  const financeSkills = uniqueSkills.filter((s: string) => 
    !isDegreeTerm(s) && ['financial', 'analysis', 'accounting', 'budgeting', 'forecasting', 'audit', 'tax', 'reconciliation'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const technicalSkills = uniqueSkills.filter((s: string) =>
    !isDegreeTerm(s) && ['excel', 'sql', 'python', 'power bi', 'tableau', 'software', 'system', 'data', 'quickbooks', 'tally', 'erp'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const softSkills = uniqueSkills.filter((s: string) =>
    !isDegreeTerm(s) && ['communication', 'attention', 'detail', 'team', 'problem solving', 'organization', 'time management', 'leadership'].some(keyword => s.toLowerCase().includes(keyword))
  );
  const otherSkills = uniqueSkills.filter((s: string) => 
    !isDegreeTerm(s) && !financeSkills.includes(s) && !technicalSkills.includes(s) && !softSkills.includes(s)
  );

  // Clean overview text
  let overviewText = internship.overview || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/internships" className="hover:text-emerald-600">Internships</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900">{internship.title}</span>
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
            {/* Internship Highlights */}
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
            </div>
          </div>
        </div>

        {/* Similar Internships - No stipend/salary */}
        {relatedInternships && relatedInternships.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={18} className="text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Similar Entry-Level Finance Internships</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedInternships.map((intern) => (
                <Link key={intern.id} href={`/internships/${intern.slug}`} className="group block bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md hover:border-emerald-200 transition">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {intern.companyLogo ? (
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center p-1.5">
                          <img src={intern.companyLogo} alt={intern.company} className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{getCompanyInitials(intern.company)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 text-sm line-clamp-1">{intern.title}</h3>
                      <p className="text-xs text-gray-500">{intern.company}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                        {intern.duration && <span className="text-gray-400">{intern.duration}</span>}
                        {intern.workMode && intern.workMode !== "Not specified" && (
                          <span className="capitalize text-gray-400">{intern.workMode}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                        <MapPin size={10} />{intern.location?.split(',')[0]}
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
        <button onClick={handleApply} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-xl transition text-center flex items-center justify-center gap-2 shadow-md">
          <ExternalLink size={18} /> Apply for This Internship →
        </button>
      </div>

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