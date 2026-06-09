"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  UploadCloud, Shield, ShieldCheck, Lock, Send, Target,
  BadgeCheck, Zap, Gift, Clock3, Mail, Check, ChevronDown, Plus, X
} from "lucide-react";

type FormDataType = {
  companyName: string;
  companyLogo: File | null;
  companyWebsite: string;
  companyEmail: string;
  companyLinkedin: string;
  recruiterName: string;
  recruiterContact: string;
  companyDescription: string;
  jobTitle: string;
  hiringFor: string;
  jobType: string;
  workMode: string;
  location: string;
  numberOfOpenings: string;
  salaryStipend: string;
  applicationDeadline: string;
  joiningTimeline: string;
  eligibleEducation: string;
  graduationYear: string;
  experienceRequired: string;
  selectedSkills: string[];
  otherSkill: string;
  responsibilities: string;
  requirements: string;
  niceToHave: string;
  whyJoin: string;
  applicationProcess: string;
  applicationEmail: string;
  externalLink: string;
  additionalInstructions: string;
  confirmGenuine: boolean;
  confirmTerms: boolean;
};

const PostJobPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });
  const [showOtherSkills, setShowOtherSkills] = useState(false);
  const [otherSkillInput, setOtherSkillInput] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [showExternalLink, setShowExternalLink] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [posterToken, setPosterToken] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string>("");

  const [formData, setFormData] = useState<FormDataType>({
    companyName: "",
    companyLogo: null,
    companyWebsite: "",
    companyEmail: "",
    companyLinkedin: "",
    recruiterName: "",
    recruiterContact: "",
    companyDescription: "",
    jobTitle: "",
    hiringFor: "",
    jobType: "",
    workMode: "",
    location: "",
    numberOfOpenings: "",
    salaryStipend: "",
    applicationDeadline: "",
    joiningTimeline: "",
    eligibleEducation: "",
    graduationYear: "",
    experienceRequired: "",
    selectedSkills: [],
    otherSkill: "",
    responsibilities: "",
    requirements: "",
    niceToHave: "",
    whyJoin: "",
    applicationProcess: "finlysta",
    applicationEmail: "",
    externalLink: "",
    additionalInstructions: "",
    confirmGenuine: false,
    confirmTerms: false,
  });

  const [charCounts, setCharCounts] = useState({
    responsibilities: 0,
    requirements: 0,
    whyJoin: 0,
    niceToHave: 0,
    companyDescription: 0,
    additionalInstructions: 0,
  });

  const skillsList = [
    "Excel", "Advanced Excel", "Financial Analysis", "Accounting",
    "GST", "Tally", "Power BI", "SQL", "Financial Modeling",
    "MIS Reporting", "Communication",
  ];

  const resetForm = () => {
    setFormData({
      companyName: "",
      companyLogo: null,
      companyWebsite: "",
      companyEmail: "",
      companyLinkedin: "",
      recruiterName: "",
      recruiterContact: "",
      companyDescription: "",
      jobTitle: "",
      hiringFor: "",
      jobType: "",
      workMode: "",
      location: "",
      numberOfOpenings: "",
      salaryStipend: "",
      applicationDeadline: "",
      joiningTimeline: "",
      eligibleEducation: "",
      graduationYear: "",
      experienceRequired: "",
      selectedSkills: [],
      otherSkill: "",
      responsibilities: "",
      requirements: "",
      niceToHave: "",
      whyJoin: "",
      applicationProcess: "finlysta",
      applicationEmail: "",
      externalLink: "",
      additionalInstructions: "",
      confirmGenuine: false,
      confirmTerms: false,
    });
    setLogoPreview(null);
    setCustomSkills([]);
    setShowOtherSkills(false);
    setOtherSkillInput("");
    setShowExternalLink(false);
    setCharCounts({
      responsibilities: 0,
      requirements: 0,
      whyJoin: 0,
      niceToHave: 0,
      companyDescription: 0,
      additionalInstructions: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      if (charCounts.hasOwnProperty(name)) {
        setCharCounts((prev) => ({ ...prev, [name]: value.length }));
      }
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setShowExternalLink(value === "external");
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const handleAddCustomSkill = () => {
    const skills = otherSkillInput.split(",").map(s => s.trim()).filter(s => s);
    const newSkills = skills.filter(s => !customSkills.includes(s) && !skillsList.includes(s));
    
    if (newSkills.length > 0 && customSkills.length + newSkills.length <= 20) {
      const updatedCustomSkills = [...customSkills, ...newSkills];
      setCustomSkills(updatedCustomSkills);
      setFormData((prev) => ({
        ...prev,
        selectedSkills: [...prev.selectedSkills, ...newSkills]
      }));
      setOtherSkillInput("");
      setShowOtherSkills(false);
    } else if (customSkills.length + newSkills.length > 20) {
      alert("Maximum 20 custom skills allowed");
    }
  };

  const handleRemoveCustomSkill = (skillToRemove: string) => {
    const updatedCustomSkills = customSkills.filter(skill => skill !== skillToRemove);
    setCustomSkills(updatedCustomSkills);
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, companyLogo: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage({ type: '', text: '' });
    
    try {
      const jobData = {
        companyName: formData.companyName,
        companyLogo: null,
        companyWebsite: formData.companyWebsite,
        companyEmail: formData.companyEmail,
        companyLinkedin: formData.companyLinkedin,
        companyDescription: formData.companyDescription,
        recruiterName: formData.recruiterName,
        recruiterContact: formData.recruiterContact,
        jobTitle: formData.jobTitle,
        hiringFor: formData.hiringFor,
        jobType: formData.jobType,
        workMode: formData.workMode,
        location: formData.location,
        numberOfOpenings: formData.numberOfOpenings,
        salaryStipend: formData.salaryStipend,
        applicationDeadline: formData.applicationDeadline,
        joiningTimeline: formData.joiningTimeline,
        eligibleEducation: formData.eligibleEducation,
        graduationYear: formData.graduationYear,
        experienceRequired: formData.experienceRequired,
        skillsRequired: formData.selectedSkills,
        responsibilities: formData.responsibilities,
        requirements: formData.requirements,
        niceToHave: formData.niceToHave,
        whyJoinTeam: formData.whyJoin,
        applicationProcess: formData.applicationProcess,
        applicationEmail: formData.applicationEmail,
        externalLink: formData.externalLink,
        additionalInstructions: formData.additionalInstructions,
        confirmGenuine: formData.confirmGenuine,
        confirmTerms: formData.confirmTerms,
      };

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the token and job title for the success page
        setPosterToken(result.posterToken);
        setJobTitle(formData.jobTitle);
        
        // Show success message
        setSubmitMessage({ 
          type: 'success', 
          text: '✅ Job posted successfully! Your job is now under review.' 
        });
        
        // Show success modal instead of immediate redirect
        setShowSuccessModal(true);
        
        // Reset form after successful submission
        resetForm();
        
        // Auto redirect after 5 seconds (optional)
        setTimeout(() => {
          if (result.posterToken) {
           router.push(`/employers/job-posted?token=${result.posterToken}`);
          } else {
            router.push('/employers/dashboard');
          }
        }, 5000);
        
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to post job. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleViewSuccessPage = () => {
    if (posterToken) {
      router.push(`/job-posted?token=${posterToken}`);
    } else {
      router.push('/employers/dashboard');
    }
  };

  const inputClass =
    "w-full h-14 px-5 text-base border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white text-gray-900 placeholder-gray-500";
  const selectClass =
    "w-full h-14 px-5 text-base border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-gray-900 appearance-none cursor-pointer pr-10";
  const textareaClass =
    "w-full px-5 py-3 text-base border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none bg-white text-gray-900 placeholder-gray-500";
  const labelClass = "block text-base font-semibold text-gray-900 mb-2";
  const hintClass = "text-sm text-gray-500 mt-1";

  const SectionHeader = ({ num, title, sub }: { num: string; title: string; sub: string }) => (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-1">
        <div
          className="flex items-center justify-center text-white text-base font-bold flex-shrink-0"
          style={{ width: 36, height: 36, borderRadius: "999px", background: "#2563EB" }}
        >
          {num}
        </div>
        <h2 className="text-xl font-bold text-[#2563EB]">{title}</h2>
      </div>
      <p className="text-base text-gray-600 ml-[48px]">{sub}</p>
    </div>
  );

  const SelectWrap = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {children}
      <ChevronDown
        size={20}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, -apple-system, sans-serif", overflowX: "hidden" }}
    >
      {/* HEADER */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/Finlysta.png"
                alt="Finlysta Logo"
                width={140}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-600">
              <span className="text-sm font-semibold text-blue-600">For Employers</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#2563EB]" />
            <span className="text-base font-medium text-[#081B4B]">100% Free • No Signup Required</span>
          </div>
        </div>
      </header>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Your job "{jobTitle}" has been submitted. Our team will review it within 5 Minutes.
            </p>
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                🔑 Your unique tracking link has been created. You can view your job status anytime.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleViewSuccessPage}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                View Success Page
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/employers/dashboard');
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="flex gap-8 items-start">

          {/* LEFT FORM */}
          <div className="flex-1 minw-0">
            <div className="mb-7">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Post a Job for Free</h1>
              <p className="text-lg text-gray-600 mt-2">
                Reach motivated finance students and fresh graduates across India.
              </p>
            </div>

            {submitMessage.text && (
              <div className={`mb-4 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Section 1 - Company Information */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="1" title="Company Information" sub="Tell us about your company" />
                <div className="grid grid-cols-2 gap-5">

                  <div>
                    <label className={labelClass}>Company Name <span className="text-red-500">*</span></label>
                    <input
                      type="text" name="companyName" value={formData.companyName}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="Enter company name" required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className={labelClass}>Company Logo</label>
                    <div className="border-2 border-dashed border-[#2563EB] rounded-lg h-[110px] flex flex-col items-center justify-center cursor-pointer relative overflow-hidden bg-blue-50">
                      <input
                        type="file" accept="image/*" onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="h-16 w-auto object-contain" />
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-2 shadow-md">
                            <UploadCloud size={24} className="text-white" />
                          </div>
                          <span className="text-sm font-semibold text-[#2563EB]">Upload Logo</span>
                          <span className="text-xs text-gray-500 mt-0.5">PNG, JPG (Max 2MB)</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Company Website</label>
                    <input
                      type="url" name="companyWebsite" value={formData.companyWebsite}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Company Email <span className="text-red-500">*</span></label>
                    <input
                      type="email" name="companyEmail" value={formData.companyEmail}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="hr@yourcompany.com" required
                    />
                    <p className={hintClass}>Applications will be sent to this email</p>
                  </div>

                  <div>
                    <label className={labelClass}>Company LinkedIn Page</label>
                    <input
                      type="url" name="companyLinkedin" value={formData.companyLinkedin}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="https://www.linkedin.com/company/"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Recruiter Contact Number{" "}
                      <span className="text-gray-500 font-normal text-sm">(For verification)</span>
                    </label>
                    <input
                      type="tel" name="recruiterContact" value={formData.recruiterContact}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="Enter mobile number"
                    />
                    <p className={hintClass}>We'll use this only if needed</p>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Recruiter / Hiring Manager Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="recruiterName" value={formData.recruiterName}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="Enter your name" required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className={labelClass}>Company Description <span className="text-red-500">*</span></label>
                    <textarea
                      name="companyDescription" value={formData.companyDescription}
                      onChange={handleInputChange} rows={3} maxLength={300}
                      className={textareaClass} placeholder="Write about your company..." required
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {charCounts.companyDescription} / 300
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 - Job Details */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="2" title="Job Details" sub="Details about the role you are hiring for" />
                <div className="grid grid-cols-3 gap-5">

                  <div>
                    <label className={labelClass}>Job Title <span className="text-red-500">*</span></label>
                    <input
                      type="text" name="jobTitle" value={formData.jobTitle}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="e.g. Finance Intern" required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Hiring For <span className="text-red-500">*</span></label>
                    <SelectWrap>
                      <select name="hiringFor" value={formData.hiringFor}
                        onChange={handleInputChange} className={selectClass} required>
                        <option value="">Select role</option>
                        <option>Internship</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                      </select>
                    </SelectWrap>
                  </div>

                  <div>
                    <label className={labelClass}>Job Type</label>
                    <SelectWrap>
                      <select name="jobType" value={formData.jobType}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select job type</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>Onsite</option>
                      </select>
                    </SelectWrap>
                  </div>

                  <div>
                    <label className={labelClass}>Work Mode</label>
                    <SelectWrap>
                      <select name="workMode" value={formData.workMode}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select work mode</option>
                        <option>Work from Home</option>
                        <option>Work from Office</option>
                        <option>Hybrid</option>
                      </select>
                    </SelectWrap>
                  </div>

                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      type="text" name="location" value={formData.location}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="e.g. Mumbai, Bangalore"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Number of Openings</label>
                    <SelectWrap>
                      <select name="numberOfOpenings" value={formData.numberOfOpenings}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select openings</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                        <option value="10+">10+</option>
                      </select>
                    </SelectWrap>
                  </div>

                  <div>
                    <label className={labelClass}>Salary / Stipend <span className="text-red-500">*</span></label>
                    <input
                      type="text" name="salaryStipend" value={formData.salaryStipend}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="e.g. ₹15,000/month or ₹4-6 LPA" required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Application Deadline</label>
                    <input
                      type="date" name="applicationDeadline" value={formData.applicationDeadline}
                      onChange={handleInputChange} className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Joining Timeline</label>
                    <SelectWrap>
                      <select name="joiningTimeline" value={formData.joiningTimeline}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select timeline</option>
                        <option>Immediate</option>
                        <option>15 days</option>
                        <option>1 month</option>
                        <option>2 months</option>
                      </select>
                    </SelectWrap>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox" id="fresherSuitable"
                    className="rounded border-gray-300 text-[#2563EB] w-4 h-4" defaultChecked
                  />
                  <label htmlFor="fresherSuitable" className="text-base text-gray-700">
                    This role is suitable for freshers or students.
                  </label>
                </div>
              </section>

              {/* Section 3 - Candidate Requirements */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="3" title="Candidate Requirements" sub="Who can apply for this role?" />
                <div className="grid grid-cols-3 gap-5 mb-5">

                  <div>
                    <label className={labelClass}>Eligible Education</label>
                    <SelectWrap>
                      <select name="eligibleEducation" value={formData.eligibleEducation}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select education</option>
                        <option>B.Com</option>
                        <option>BBA</option>
                        <option>MBA Finance</option>
                        <option>CA Inter</option>
                        <option>CA Final</option>
                        <option>M.Com</option>
                        <option>Any Graduate</option>
                      </select>
                    </SelectWrap>
                  </div>

                  <div>
                    <label className={labelClass}>Graduation Year</label>
                    <SelectWrap>
                      <select name="graduationYear" value={formData.graduationYear}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select batch</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                      </select>
                    </SelectWrap>
                  </div>

                  <div>
                    <label className={labelClass}>Experience Required</label>
                    <SelectWrap>
                      <select name="experienceRequired" value={formData.experienceRequired}
                        onChange={handleInputChange} className={selectClass}>
                        <option value="">Select experience</option>
                        <option>Fresher</option>
                        <option>0-1 years</option>
                        <option>1-3 years</option>
                        <option>3-5 years</option>
                      </select>
                    </SelectWrap>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Skills Required <span className="text-gray-500 font-normal text-sm">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {skillsList.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedSkills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                          className="rounded border-gray-300 text-[#2563EB] w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-base text-gray-800">{skill}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Custom Skills Display */}
                  {customSkills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {customSkills.map((skill) => (
                        <span key={skill} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomSkill(skill)}
                            className="hover:text-red-600"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Other Skills Button */}
                  {!showOtherSkills ? (
                    <button
                      type="button"
                      onClick={() => setShowOtherSkills(true)}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-[#2563EB] hover:text-blue-700"
                    >
                      <Plus size={16} /> Add other skills (max 20)
                    </button>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={otherSkillInput}
                        onChange={(e) => setOtherSkillInput(e.target.value)}
                        placeholder="Enter skills separated by commas"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomSkill}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowOtherSkills(false);
                          setOtherSkillInput("");
                        }}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* Section 4 - Job Description */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="4" title="Job Description" sub="Provide complete details about the role" />
                <div className="grid grid-cols-3 gap-5">

                  <div>
                    <label className={labelClass}>Responsibilities <span className="text-red-500">*</span></label>
                    <textarea
                      name="responsibilities" value={formData.responsibilities}
                      onChange={handleInputChange} rows={5} maxLength={2000}
                      className={textareaClass} placeholder="List the key responsibilities..." required
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {charCounts.responsibilities} / 2000
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Requirements <span className="text-red-500">*</span></label>
                    <textarea
                      name="requirements" value={formData.requirements}
                      onChange={handleInputChange} rows={5} maxLength={2000}
                      className={textareaClass} placeholder="List the must-have skills and requirements..." required
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {charCounts.requirements} / 2000
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Nice to Have{" "}
                      <span className="text-gray-500 font-normal text-sm">(Optional)</span>
                    </label>
                    <textarea
                      name="niceToHave" value={formData.niceToHave}
                      onChange={handleInputChange} rows={5} maxLength={2000}
                      className={textareaClass} placeholder="Add preferred skills or qualifications..."
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {charCounts.niceToHave} / 2000
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>
                    Why should candidates join your team?{" "}
                    <span className="text-gray-500 font-normal text-sm">(Optional)</span>
                  </label>
                  <textarea
                    name="whyJoin" value={formData.whyJoin}
                    onChange={handleInputChange} rows={3} maxLength={300}
                    className={textareaClass} placeholder="Tell candidates what makes this opportunity great..."
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {charCounts.whyJoin} / 300
                  </div>
                </div>
              </section>

              {/* Section 5 - Application Process */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="5" title="Application Process" sub="How should candidates apply?" />
                <div className="grid grid-cols-2 gap-6">

                  <div className="space-y-3">
                    {[
                      {
                        value: "finlysta",
                        label: "Apply on Finlysta (Recommended)",
                        sub: null,
                        badge: "Easier for students",
                      },
                      {
                        value: "email",
                        label: "Email Applications",
                        sub: "Candidates will email you directly",
                        badge: null,
                      },
                      {
                        value: "external",
                        label: "External Apply Link",
                        sub: "Redirect candidates to your website or form",
                        badge: null,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-3 p-3.5 border rounded-lg cursor-pointer transition-colors ${
                          formData.applicationProcess === opt.value
                            ? "border-[#2563EB] bg-blue-50"
                            : "border-slate-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio" name="applicationProcess" value={opt.value}
                          checked={formData.applicationProcess === opt.value}
                          onChange={handleRadioChange} className="mt-0.5 text-[#2563EB]"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-base text-gray-900">{opt.label}</span>
                            {opt.badge && (
                              <span className="text-xs bg-blue-100 text-[#2563EB] font-semibold px-2 py-0.5 rounded-full">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          {opt.sub && (
                            <div className="text-sm text-gray-500 mt-0.5">{opt.sub}</div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Application Email</label>
                      <input
                        type="email" name="applicationEmail" value={formData.applicationEmail}
                        onChange={handleInputChange} className={inputClass}
                        placeholder="hr@yourcompany.com"
                      />
                      <p className={hintClass}>Candidates will send their applications to this email</p>
                    </div>
                    
                    {/* External Link Box - Shows only when External Apply Link is selected */}
                    {showExternalLink && (
                      <div>
                        <label className={labelClass}>External Apply Link <span className="text-red-500">*</span></label>
                        <input
                          type="url" name="externalLink" value={formData.externalLink}
                          onChange={handleInputChange} className={inputClass}
                          placeholder="https://yourcompany.com/careers/apply"
                        />
                        <p className={hintClass}>Candidates will be redirected to this link to apply</p>
                      </div>
                    )}

                    <div>
                      <label className={labelClass}>
                        Additional Instructions{" "}
                        <span className="text-gray-500 font-normal text-sm">(Optional)</span>
                      </label>
                      <textarea
                        name="additionalInstructions" value={formData.additionalInstructions}
                        onChange={handleInputChange} rows={4} maxLength={300}
                        className={textareaClass} placeholder="Any specific instructions for candidates?"
                      />
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {charCounts.additionalInstructions} / 300
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 - Verify & Submit */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="6" title="Verify & Submit" sub="Please confirm the details before submitting" />

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox" name="confirmGenuine" checked={formData.confirmGenuine}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#2563EB] w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-base text-gray-700">I confirm this is a genuine job opportunity.</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox" name="confirmTerms" checked={formData.confirmTerms}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#2563EB] w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-base text-gray-700">I agree to Finlysta's posting guidelines and terms.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!formData.confirmGenuine || !formData.confirmTerms || loading}
                  className="w-full h-14 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="text-white" />
                      Post Job for Free
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Lock size={13} /> No Signup Required
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={13} /> Takes less than 5 minutes
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} /> Reviewed within 24 hours
                  </span>
                </p>
              </section>

            </form>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[320px] flex-shrink-0 space-y-5 sticky top-[72px] self-start">

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-5 text-white text-center">
              <div className="mx-auto mb-3 flex items-center justify-center rounded-full w-20 h-20 bg-white">
                <Gift size={40} strokeWidth={2} className="text-gray-800" />
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide mb-2">LAUNCH OFFER</div>
              <h3 className="text-3xl font-black mb-1">100% FREE</h3>
              <p className="text-base text-white/80 leading-snug">Post Jobs Completely Free During Our Launch Phase</p>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Why Post on Finlysta?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50"><Target size={20} className="text-[#2563EB]" /></div>
                  <div><div className="font-semibold text-base text-gray-900">Finance-Focused Audience</div><p className="text-sm text-gray-600 mt-0.5">Reach students serious about finance careers.</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50"><BadgeCheck size={20} className="text-[#2563EB]" /></div>
                  <div><div className="font-semibold text-base text-gray-900">Quality Applications</div><p className="text-sm text-gray-600 mt-0.5">Get applications from job-ready finance talent.</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50"><ShieldCheck size={20} className="text-[#2563EB]" /></div>
                  <div><div className="font-semibold text-base text-gray-900">Verified Student Community</div><p className="text-sm text-gray-600 mt-0.5">Connect with finance students across India.</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50"><Zap size={20} className="text-[#2563EB]" /></div>
                  <div><div className="font-semibold text-base text-gray-900">Fast & Easy</div><p className="text-sm text-gray-600 mt-0.5">Post in under 2 minutes. Published within 24 hours.</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Tips for Better Responses</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm text-gray-700"><Check size={16} className="text-green-500" /> Write a clear job title</li>
                <li className="flex items-start gap-2 text-sm text-gray-700"><Check size={16} className="text-green-500" /> Add complete job description</li>
                <li className="flex items-start gap-2 text-sm text-gray-700"><Check size={16} className="text-green-500" /> Mention stipend/salary range</li>
                <li className="flex items-start gap-2 text-sm text-gray-700"><Check size={16} className="text-green-500" /> Highlight growth opportunities</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-100 p-5" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)" }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex items-center justify-center rounded-full flex-shrink-0 w-8 h-8 bg-white"><Mail size={16} className="text-[#2563EB]" /></div>
                <h3 className="font-bold text-gray-900 text-lg">Need Help?</h3>
              </div>
              <a href="mailto:support@finlysta.com" className="text-[#2563EB] text-base font-semibold hover:underline">support@finlysta.com</a>
              <p className="text-sm text-gray-600 mt-1">We're here to help!</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJobPage;