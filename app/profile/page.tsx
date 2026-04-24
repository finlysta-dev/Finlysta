"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User, Mail, MapPin, Briefcase, Upload, Plus, Trash2, 
  Save, CheckCircle, AlertCircle, Camera, GraduationCap,
  Calendar, Building2, X, ArrowLeft, Award, Github, Linkedin, Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  yearStart: string;
  yearEnd: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("basic");
  const [profileStrength, setProfileStrength] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Basic Info
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    headline: "",
    location: "",
    bio: "",
    skills: [] as string[],
  });

  // Education
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [educationForm, setEducationForm] = useState({
    school: "",
    degree: "",
    field: "",
    yearStart: "",
    yearEnd: "",
  });

  // Experience
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [experienceForm, setExperienceForm] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrent: false,
  });

  // Social Links
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>("");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Load user data
  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;
      setBasicInfo({
        name: user.name || "",
        email: user.email || "",
        headline: user.headline || "",
        location: user.location || "",
        bio: user.bio || "",
        skills: user.skills || [],
      });
      setPhotoPreview(user.image || null);
      setResumeName(user.resumeName || "");
      setEducationList(user.education || []);
      setExperienceList(user.experience || []);
      setSocialLinks({
        github: user.githubUrl || "",
        linkedin: user.linkedinUrl || "",
        portfolio: user.portfolioUrl || "",
      });
      
      // Calculate profile strength
      let strength = 0;
      if (user.name) strength += 10;
      if (user.headline) strength += 10;
      if (user.location) strength += 5;
      if (user.bio && user.bio.length > 20) strength += 10;
      if (user.skills?.length > 0) strength += Math.min(user.skills.length * 5, 20);
      if (user.resumeUrl) strength += 15;
      if (user.education?.length > 0) strength += 15;
      if (user.experience?.length > 0) strength += 15;
      setProfileStrength(Math.min(strength, 100));
    }
  }, [session]);

  // Education functions
  const addEducation = () => {
    if (!educationForm.school || !educationForm.degree) return;
    
    if (editingEducation) {
      setEducationList(educationList.map(e => 
        e.id === editingEducation.id 
          ? { ...editingEducation, ...educationForm }
          : e
      ));
      setEditingEducation(null);
    } else {
      setEducationList([
        ...educationList,
        {
          id: Date.now().toString(),
          ...educationForm,
        },
      ]);
    }
    setEducationForm({ school: "", degree: "", field: "", yearStart: "", yearEnd: "" });
    setShowEducationForm(false);
  };

  const editEducation = (edu: Education) => {
    setEditingEducation(edu);
    setEducationForm({
      school: edu.school,
      degree: edu.degree,
      field: edu.field || "",
      yearStart: edu.yearStart || "",
      yearEnd: edu.yearEnd || "",
    });
    setShowEducationForm(true);
  };

  const removeEducation = (id: string) => {
    setEducationList(educationList.filter(e => e.id !== id));
  };

  // Experience functions
  const addExperience = () => {
    if (!experienceForm.company || !experienceForm.role) return;
    
    if (editingExperience) {
      setExperienceList(experienceList.map(e => 
        e.id === editingExperience.id 
          ? { ...editingExperience, ...experienceForm }
          : e
      ));
      setEditingExperience(null);
    } else {
      setExperienceList([
        ...experienceList,
        {
          id: Date.now().toString(),
          ...experienceForm,
        },
      ]);
    }
    setExperienceForm({ company: "", role: "", startDate: "", endDate: "", description: "", isCurrent: false });
    setShowExperienceForm(false);
  };

  const editExperience = (exp: Experience) => {
    setEditingExperience(exp);
    setExperienceForm({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      description: exp.description || "",
      isCurrent: exp.isCurrent || false,
    });
    setShowExperienceForm(true);
  };

  const removeExperience = (id: string) => {
    setExperienceList(experienceList.filter(e => e.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !basicInfo.skills.includes(newSkill.trim())) {
      setBasicInfo({ ...basicInfo, skills: [...basicInfo.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setBasicInfo({ ...basicInfo, skills: basicInfo.skills.filter(s => s !== skill) });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = new FormData();
      payload.append("name", basicInfo.name);
      payload.append("headline", basicInfo.headline);
      payload.append("location", basicInfo.location);
      payload.append("bio", basicInfo.bio);
      payload.append("skills", JSON.stringify(basicInfo.skills));
      payload.append("education", JSON.stringify(educationList));
      payload.append("experience", JSON.stringify(experienceList));
      payload.append("githubUrl", socialLinks.github);
      payload.append("linkedinUrl", socialLinks.linkedin);
      payload.append("portfolioUrl", socialLinks.portfolio);
      if (resumeFile) payload.append("resume", resumeFile);

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to save profile");

      await update();
      setSuccess("Profile saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sections = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "social", label: "Social Links", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Strength */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Profile Strength</span>
            <span className="text-sm font-bold text-blue-800 dark:text-blue-300">{profileStrength}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${profileStrength}%` }} />
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
            {profileStrength < 50 ? "Complete your profile to increase chances of getting selected 🚀" : "Great profile! You're ready to apply 🎯"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - FIXED: Changed from Link to button */}
          <div className="lg:w-64">
            <div className="sticky top-8 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Basic Info Section */}
            {activeSection === "basic" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User size={18} className="text-blue-500" />
                  Basic Information
                </h2>
                
                <div className="flex gap-6 flex-wrap mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <User size={32} />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Camera size={12} /> Change photo
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={basicInfo.name}
                        onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={basicInfo.email}
                        disabled
                        className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
                      <input
                        type="text"
                        value={basicInfo.headline}
                        onChange={(e) => setBasicInfo({ ...basicInfo, headline: e.target.value })}
                        placeholder="e.g., Aspiring Frontend Developer"
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={basicInfo.location}
                        onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
                        placeholder="India, Bangalore, etc."
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                  <textarea
                    rows={4}
                    value={basicInfo.bio}
                    onChange={(e) => setBasicInfo({ ...basicInfo, bio: e.target.value })}
                    placeholder="Tell us about yourself, your skills, and what you're looking for..."
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {basicInfo.skills.map((skill) => (
                      <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      placeholder="Add a skill (e.g., React, Python)"
                      className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button onClick={addSkill} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => resumeInputRef.current?.click()}
                      className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Upload size={14} /> Upload Resume
                    </button>
                    <input ref={resumeInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
                    {resumeName && <span className="text-sm text-gray-600 dark:text-gray-400">{resumeName}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Education Section */}
            {activeSection === "education" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <GraduationCap size={18} className="text-green-500" />
                    Education
                  </h2>
                  <button
                    onClick={() => setShowEducationForm(true)}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Education
                  </button>
                </div>

                {educationList.length > 0 ? (
                  <div className="space-y-3">
                    {educationList.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">{edu.degree} in {edu.field}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{edu.school}</p>
                          <p className="text-xs text-gray-500">{edu.yearStart} - {edu.yearEnd}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => editEducation(edu)} className="text-gray-400 hover:text-blue-500 text-sm">Edit</button>
                          <button onClick={() => removeEducation(edu.id)} className="text-gray-400 hover:text-red-500 text-sm">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No education added yet</p>
                )}

                {/* Education Form Modal */}
                {showEducationForm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{editingEducation ? "Edit Education" : "Add Education"}</h3>
                        <button onClick={() => { setShowEducationForm(false); setEditingEducation(null); setEducationForm({ school: "", degree: "", field: "", yearStart: "", yearEnd: "" }); }}>
                          <X size={20} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="School/University *"
                          value={educationForm.school}
                          onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Degree *"
                          value={educationForm.degree}
                          onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Field of Study"
                          value={educationForm.field}
                          onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Start Year"
                            value={educationForm.yearStart}
                            onChange={(e) => setEducationForm({ ...educationForm, yearStart: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="End Year"
                            value={educationForm.yearEnd}
                            onChange={(e) => setEducationForm({ ...educationForm, yearEnd: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <button onClick={addEducation} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        {editingEducation ? "Update" : "Add"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={18} className="text-purple-500" />
                    Work Experience
                  </h2>
                  <button
                    onClick={() => setShowExperienceForm(true)}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Experience
                  </button>
                </div>

                {experienceList.length > 0 ? (
                  <div className="space-y-3">
                    {experienceList.map((exp) => (
                      <div key={exp.id} className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">{exp.role} at {exp.company}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}</p>
                          {exp.description && <p className="text-xs text-gray-500 mt-1">{exp.description.substring(0, 100)}...</p>}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => editExperience(exp)} className="text-gray-400 hover:text-blue-500 text-sm">Edit</button>
                          <button onClick={() => removeExperience(exp.id)} className="text-gray-400 hover:text-red-500 text-sm">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No work experience added yet</p>
                )}

                {/* Experience Form Modal */}
                {showExperienceForm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{editingExperience ? "Edit Experience" : "Add Experience"}</h3>
                        <button onClick={() => { setShowExperienceForm(false); setEditingExperience(null); setExperienceForm({ company: "", role: "", startDate: "", endDate: "", description: "", isCurrent: false }); }}>
                          <X size={20} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Company *"
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Role *"
                          value={experienceForm.role}
                          onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Start Date"
                            value={experienceForm.startDate}
                            onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="End Date"
                            value={experienceForm.endDate}
                            onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={experienceForm.isCurrent}
                            onChange={(e) => setExperienceForm({ ...experienceForm, isCurrent: e.target.checked })}
                          />
                          <span className="text-sm">I currently work here</span>
                        </label>
                        <textarea
                          placeholder="Description"
                          value={experienceForm.description}
                          onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <button onClick={addExperience} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        {editingExperience ? "Update" : "Add"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Social Links Section */}
            {activeSection === "social" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Globe size={18} className="text-indigo-500" />
                  Social Links
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <Github size={16} /> GitHub
                    </label>
                    <input
                      type="url"
                      value={socialLinks.github}
                      onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <Linkedin size={16} /> LinkedIn
                    </label>
                    <input
                      type="url"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <Globe size={16} /> Portfolio
                    </label>
                    <input
                      type="url"
                      value={socialLinks.portfolio}
                      onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Success/Error Messages */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
                <CheckCircle size={16} /> {success}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Save Button */}
            <div className="sticky bottom-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : <><Save size={16} /> Save All Changes</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
