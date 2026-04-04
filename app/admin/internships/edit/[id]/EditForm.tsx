"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define proper types
interface Internship {
  id: string;
  title: string;
  company: string;
  companyWebsite: string | null;
  aboutCompany: string | null;
  location: string;
  description: string;
  category: string;
  workMode: string;
  internshipType: string | null;
  duration: string;
  paid: boolean;
  stipendAmount: string | null;
  skills: string[];
  perks: string[];
  applyLink: string | null;
  isTrending: boolean;
  verified: boolean;
}

interface EditFormProps {
  internship: Internship;
}

interface FormData {
  title: string;
  company: string;
  companyWebsite: string;
  aboutCompany: string;
  location: string;
  description: string;
  category: string;
  workMode: string;
  internshipType: string;
  duration: string;
  paid: boolean;
  stipendAmount: string;
  skills: string;
  perks: string;
  applyLink: string;
  isTrending: boolean;
  verified: boolean;
}

export default function EditForm({ internship }: EditFormProps) {
  const router = useRouter();

  // Handle null values properly when initializing form
  const [form, setForm] = useState<FormData>({
    title: internship.title || "",
    company: internship.company || "",
    companyWebsite: internship.companyWebsite || "",
    aboutCompany: internship.aboutCompany || "",
    location: internship.location || "",
    description: internship.description || "",
    category: internship.category || "",
    workMode: internship.workMode || "",
    internshipType: internship.internshipType || "",
    duration: internship.duration || "",
    paid: internship.paid || false,
    stipendAmount: internship.stipendAmount || "",
    skills: internship.skills?.join(", ") || "",
    perks: internship.perks?.join(", ") || "",
    applyLink: internship.applyLink || "",
    isTrending: internship.isTrending || false,
    verified: internship.verified || false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Split and trim skills and perks with proper typing
    const skillsArray = form.skills.split(",").map((s: string) => s.trim()).filter(Boolean);
    const perksArray = form.perks.split(",").map((p: string) => p.trim()).filter(Boolean);

    try {
      const response = await fetch(`/api/admin/internships/${internship.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          skills: skillsArray,
          perks: perksArray,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update internship");
      }

      router.push("/admin/internships");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Internship</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* COMPANY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
          <input
            name="company"
            value={form.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* COMPANY WEBSITE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
          <input
            name="companyWebsite"
            value={form.companyWebsite}
            onChange={handleInputChange}
            placeholder="Company Website"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ABOUT COMPANY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About Company</label>
          <textarea
            name="aboutCompany"
            value={form.aboutCompany}
            onChange={handleInputChange}
            placeholder="About Company"
            className="w-full border p-3 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <select
            name="location"
            value={form.location}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Location</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Software">Software</option>
            <option value="Data">Data</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
            <option value="Business">Business</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {/* WORK MODE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode *</label>
          <select
            name="workMode"
            value={form.workMode}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* INTERNSHIP TYPE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Internship Type</label>
          <select
            name="internshipType"
            value={form.internshipType}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        {/* DURATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
          <input
            name="duration"
            value={form.duration}
            onChange={handleInputChange}
            placeholder="Duration (e.g. 3 months)"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Job Description"
            className="w-full border p-3 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* APPLY LINK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link *</label>
          <input
            name="applyLink"
            value={form.applyLink}
            onChange={handleInputChange}
            placeholder="Apply Link (VERY IMPORTANT)"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* SKILLS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (comma separated)
          </label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleInputChange}
            placeholder="React, Node.js, Python"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PERKS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Perks (comma separated)
          </label>
          <input
            name="perks"
            value={form.perks}
            onChange={handleInputChange}
            placeholder="Certificate, PPO, Flexible Hours"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PAID CHECKBOX */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="paid"
            type="checkbox"
            checked={form.paid}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Paid Internship</span>
        </label>

        {/* STIPEND */}
        {form.paid && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stipend Amount (per month)
            </label>
            <input
              name="stipendAmount"
              value={form.stipendAmount}
              onChange={handleInputChange}
              placeholder="e.g., 25000"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* TRENDING CHECKBOX */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="isTrending"
            type="checkbox"
            checked={form.isTrending}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Mark as Trending</span>
        </label>

        {/* VERIFIED CHECKBOX */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="verified"
            type="checkbox"
            checked={form.verified}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Verified Company</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Internship"}
        </button>
      </form>
    </div>
  );
}