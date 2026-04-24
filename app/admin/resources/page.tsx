"use client";

import { FormEvent, useState } from "react";

export default function AdminResourcesPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("resume-tips"); // Updated default
  const [type, setType] = useState("text");
  const [fileUrl, setFileUrl] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/resources/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          fileUrl,
          link,
          type
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Show success message
      alert("✅ Resource added successfully!");
      setSuccess(true);

      // Reset form
      setTitle("");
      setExcerpt("");
      setContent("");
      setFileUrl("");
      setLink("");
      setCategory("resume-tips"); // Reset to default
      setType("text");
      
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Error adding resource");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  // Category options with display labels and values
  const categories = [
    { value: "resume-tips", label: "Resume Tips" },
    { value: "interview", label: "Interview Prep" },
    { value: "roadmap", label: "Career Roadmaps" },
    { value: "projects", label: "Project Ideas" },
    { value: "skills", label: "Skill Development" },
    { value: "jobs", label: "Job Search" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Add Career Resource
        </h1>
        <p className="text-gray-500 mb-8">
          Create a new resource for job seekers and career growth
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g., How to Write an ATS-Friendly Resume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Excerpt Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Brief summary of the resource (max 150 characters)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              maxLength={150}
            />
            <p className="text-xs text-gray-400 mt-1">
              {excerpt.length}/150 characters
            </p>
          </div>

          {/* Category and Type Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Type <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="text">📝 Text / Article</option>
                <option value="pdf">📄 PDF Document</option>
                <option value="link">🔗 External Link</option>
              </select>
            </div>
          </div>

          {/* Dynamic Fields Based on Type */}
          {type === "text" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write your resource content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                rows={8}
                required={type === "text"}
              />
            </div>
          )}

          {type === "pdf" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF URL <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="https://example.com/document.pdf"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required={type === "pdf"}
                type="url"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must be a direct link to a PDF file
              </p>
            </div>
          )}

          {type === "link" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                External Link <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="https://example.com/article"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required={type === "link"}
                type="url"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 px-6 rounded-lg font-semibold text-white
              transition-all duration-200 transform hover:scale-[1.02]
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Resource...
              </span>
            ) : (
              'Add Resource'
            )}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Resource added successfully! 
            <a href="/resources" className="underline ml-2 font-medium">View all resources →</a>
          </div>
        )}
      </div>
    </div>
  );
}
