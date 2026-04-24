"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User, MapPin, Briefcase, Upload, Plus, Trash2, 
  Save, CheckCircle, AlertCircle, Camera, GraduationCap,
  Calendar, Building2, X, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  yearStart: string;
  yearEnd: string;
}

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [profileStrength, setProfileStrength] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    location: "",
    bio: "",
    skills: [] as string[],
    resumeUrl: "",
  });

  // Education Data
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
      setFormData({
        name: user.name || "",
        headline: user.headline || "",
        location: user.location || "",
        bio: user.bio || "",
        skills: user.skills || [],
        resumeUrl: user.resumeUrl || "",
      });
      setPhotoPreview(user.image || null);
      setResumeName(user.resumeName || "");
      setEducationList(user.education || []);
      
      // Calculate profile strength
      let strength = 0;
      if (user.name) strength += 15;
      if (user.headline) strength += 15;
      if (user.location) strength += 10;
      if (user.bio && user.bio.length > 20) strength += 15;
      if (user.skills?.length > 0) strength += Math.min(user.skills.length * 5, 25);
      if (user.resumeUrl) strength += 20;
      if (user.education?.length > 0) strength += 10;
      setProfileStrength(Math.min(strength, 100));
    }
  }, [session]);

  // Add Education
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

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
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
      payload.append("name", formData.name);
      payload.append("headline", formData.headline);
      payload.append("location", formData.location);
      payload.append("bio", formData.bio);
      payload.append("skills", JSON.stringify(formData.skills));
      payload.append("education", JSON.stringify(educationList));
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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
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

        {/* Basic Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User size={18} className="text-blue-500" />
            Basic Info
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g., Aspiring Frontend Developer"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="India, Bangalore, etc."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h2>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about yourself, your skills, and what you're looking for..."
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Resume Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resume</h2>
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

        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.skills.map((skill) => (
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

        {/* Education Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 mb-6">
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
                    <button onClick={() => editEducation(edu)} className="text-gray-400 hover:text-blue-500">Edit</button>
                    <button onClick={() => removeEducation(edu.id)} className="text-gray-400 hover:text-red-500">Delete</button>
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

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
            <CheckCircle size={16} /> {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
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
            {saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
