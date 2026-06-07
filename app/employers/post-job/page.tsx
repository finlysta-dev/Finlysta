"use client";

import { useState } from "react";
import {
  UploadCloud, Shield, ShieldCheck, Lock, Send, Target,
  BadgeCheck, Zap, Gift, Clock3, Mail, Check, ChevronDown
} from "lucide-react";

const PostJobPage = () => {
  const [formData, setFormData] = useState({
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

  const [logoPreview, setLogoPreview] = useState(null);

  const skillsList = [
    "Excel", "Advanced Excel", "Financial Analysis", "Accounting",
    "GST", "Tally", "Power BI", "SQL", "Financial Modeling",
    "MIS Reporting", "Communication", "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, companyLogo: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Job posted successfully! We'll review and publish it within 24 hours.");
  };

  // Larger text classes with better visibility
  const inputClass =
    "w-full h-14 px-5 text-base border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white text-gray-900 placeholder-gray-500";
  const selectClass =
    "w-full h-14 px-5 text-base border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-gray-900 appearance-none cursor-pointer pr-10";
  const textareaClass =
    "w-full px-5 py-3 text-base border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none bg-white text-gray-900 placeholder-gray-500";
  const labelClass = "block text-base font-semibold text-gray-900 mb-2";
  const hintClass = "text-sm text-gray-500 mt-1";

  const SectionHeader = ({ num, title, sub }) => (
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

  const SelectWrap = ({ children }) => (
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
      {/* ── HEADER ── */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#2563EB] rounded-md flex items-center justify-center">
                <span className="text-white font-black text-lg">F</span>
              </div>
              <span className="text-2xl font-black text-[#081B4B]">Finlysta</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#2563EB]">
              <span className="text-sm font-semibold text-[#2563EB]">For Employers</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#2563EB]" />
            <span className="text-base font-medium text-[#081B4B]">100% Free • No Signup Required</span>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="flex gap-8 items-start">

          {/* ══ LEFT FORM ══ */}
          <div className="flex-1 min-w-0">
            <div className="mb-7">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Post a Job for Free</h1>
              <p className="text-lg text-gray-600 mt-2">
                Reach motivated finance students and fresh graduates across India.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ── 1. Company Information ── */}
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

                  {/* Blue Square Logo Box - Aligned properly */}
                  <div className="flex flex-col">
                    <label className={labelClass}>Company Logo</label>
                    <div className="border-2 border-dashed border-[#2563EB] rounded-lg h-[110px] flex flex-col items-center justify-center hover:border-blue-600 transition-colors cursor-pointer relative overflow-hidden bg-blue-50">
                      <input
                        type="file" accept="image/*" onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="h-16 w-auto object-contain" />
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-2 shadow-md">
                            <UploadCloud size={24} className="text-white" />
                          </div>
                          <span className="text-sm font-semibold text-[#2563EB]">Upload Logo</span>
                          <span className="text-xs text-gray-500 mt-0.5">JPG, PNG (Max 2MB)</span>
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
                      {formData.companyDescription.length} / 300
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 2. Job Details ── */}
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
                    <label className={labelClass}>Job Type <span className="text-red-500">*</span></label>
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
                    <label className={labelClass}>Work Mode <span className="text-red-500">*</span></label>
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
                    <label className={labelClass}>Location <span className="text-red-500">*</span></label>
                    <input
                      type="text" name="location" value={formData.location}
                      onChange={handleInputChange} className={inputClass}
                      placeholder="e.g. Mumbai, Bangalore"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Number of Openings <span className="text-red-500">*</span></label>
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

              {/* ── 3. Candidate Requirements ── */}
              <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <SectionHeader num="3" title="Candidate Requirements" sub="Who can apply for this role?" />
                <div className="grid grid-cols-3 gap-5 mb-5">

                  <div>
                    <label className={labelClass}>Eligible Education <span className="text-red-500">*</span></label>
                    <SelectWrap>
                      <select name="eligibleEducation" value={formData.eligibleEducation}
                        onChange={handleInputChange} className={selectClass} required>
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
                    <label className={labelClass}>Graduation Year <span className="text-red-500">*</span></label>
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
                    <label className={labelClass}>Experience Required <span className="text-red-500">*</span></label>
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
                    Skills Required <span className="text-red-500">*</span>{" "}
                    <span className="text-gray-500 font-normal text-sm">(Select all that apply)</span>
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
                  {formData.selectedSkills.includes("Other") && (
                    <div className="mt-3 max-w-xs">
                      <input
                        type="text" name="otherSkill" value={formData.otherSkill}
                        onChange={handleInputChange} className={inputClass}
                        placeholder="Type other skills"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* ── 4. Job Description ── */}
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
                      {formData.responsibilities.length} / 2000
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
                      {formData.requirements.length} / 2000
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
                      {formData.niceToHave.length} / 2000
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
                    {formData.whyJoin.length} / 300
                  </div>
                </div>
              </section>

              {/* ── 5. Application Process ── */}
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
                          onChange={handleInputChange} className="mt-0.5 text-[#2563EB]"
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
                      <label className={labelClass}>Application Email <span className="text-red-500">*</span></label>
                      <input
                        type="email" name="applicationEmail" value={formData.applicationEmail}
                        onChange={handleInputChange} className={inputClass}
                        placeholder="hr@yourcompany.com"
                      />
                      <p className={hintClass}>Candidates will send their applications to this email</p>
                    </div>
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
                        {formData.additionalInstructions.length} / 300
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 6. Verify & Submit ── */}
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
                    <span className="text-base text-gray-700">
                      I agree to Finlysta's posting guidelines and terms.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!formData.confirmGenuine || !formData.confirmTerms}
                  className={`w-full h-14 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 transition-all ${
                    formData.confirmGenuine && formData.confirmTerms
                      ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-md cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={20} className="text-white fill-white" />
                  Post Job for Free
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

          {/* ══ RIGHT SIDEBAR - Enhanced with more text ══ */}
          <div className="w-[320px] flex-shrink-0 space-y-5 sticky top-[72px] self-start">

            {/* Launch Offer */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-5 text-white text-center">
              <div
                className="mx-auto mb-3 flex items-center justify-center rounded-full"
                style={{ width: 80, height: 80, borderRadius: 999, background: "#DBEAFE" }}
              >
                <Gift size={36} strokeWidth={2} className="text-[#2563EB]" />
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide mb-2">
                LAUNCH OFFER
              </div>
              <h3 className="text-3xl font-black mb-1">100% FREE</h3>
              <p className="text-base text-white/80 leading-snug">Post Jobs Completely Free During Our Launch Phase</p>
            </div>

            {/* Why Post on Finlysta - Full descriptions */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Why Post on Finlysta?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50">
                    <Target size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-900">Finance-Focused Audience</div>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                      Reach students and fresh graduates who are serious about finance careers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50">
                    <BadgeCheck size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-900">Quality Applications</div>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                      Get applications from motivated and job-ready finance talent.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50">
                    <ShieldCheck size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-900">Verified Student Community</div>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                      Connect with a growing community of finance students across India.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-blue-50">
                    <Zap size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-900">Fast & Easy</div>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                      Post in under 2 minutes. We'll review and publish within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips for Better Responses - Full descriptions */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Tips for Better Responses</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Write a clear job title</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Add complete job description and requirements</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Mention stipend/salary range</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Highlight learning and growth opportunities</span>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="rounded-xl border border-blue-100 p-5" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)" }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex items-center justify-center rounded-full flex-shrink-0 w-8 h-8 bg-white">
                  <Mail size={16} className="text-[#2563EB]" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Need Help?</h3>
              </div>
              <a href="mailto:hello@finlysta.com" className="text-[#2563EB] text-base font-semibold hover:underline">
                hello@finlysta.com
              </a>
              <p className="text-sm text-gray-600 mt-1">We're here to help!</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJobPage;