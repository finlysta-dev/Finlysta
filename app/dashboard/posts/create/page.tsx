"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Save, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (publish: boolean) => {
    if (!title.trim()) {
      setError("Please provide a title for your post.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const slug = generateSlug(title);
      
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          slug,
          published: publish,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to create post");

      router.push("/dashboard/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] pb-20">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/dashboard/posts" 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} /> Back to Posts
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-xl transition-all"
            >
              <Save size={18} /> Save Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              Publish Post
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-12 px-6">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          {/* Writing Header */}
          <div className="mb-8">
            <span className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Write Your Story
            </span>
            <input
              className="w-full text-4xl font-black text-slate-900 placeholder:text-slate-200 outline-none border-none bg-transparent"
              placeholder="Give your post a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* Editor Area */}
          <div className="space-y-6">
            <div className="relative">
              <textarea
                className="w-full text-lg text-slate-700 placeholder:text-slate-300 outline-none border-none bg-transparent resize-none min-h-[400px]"
                placeholder="What did you build or learn? Describe the process, the tools used, and the outcome..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
            <h4 className="text-xs font-black text-blue-800 uppercase mb-2">Pro Tip</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Include links to your GitHub repository or hosted project to make your showcase more credible.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
            <h4 className="text-xs font-black text-emerald-800 uppercase mb-2">Recruiter Insight</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Companies look for "How" you solved a problem, not just what you built. Explain your logic!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}