"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Save, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Trash2
} from "lucide-react";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setTitle(data.post.title);
        setContent(data.post.content || "");
        setIsPublished(data.post.published);
      } else {
        setError(data.error || "Failed to fetch post");
      }
    } catch (error) {
      setError("Failed to fetch post");
    } finally {
      setFetching(false);
    }
  };

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
      
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          slug,
          published: publish,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to update post");

      router.push("/dashboard/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        router.push("/dashboard/posts");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete post");
      }
    } catch (error) {
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-red-600 font-medium text-sm hover:bg-red-50 rounded-xl transition-all"
            >
              <Trash2 size={18} /> Delete
            </button>
            <button
              onClick={() => handleSubmit(isPublished)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-xl transition-all"
            >
              <Save size={18} /> Save Changes
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {isPublished ? "Update & Publish" : "Publish Now"}
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
          {/* Status Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
              isPublished 
                ? "bg-green-50 text-green-700" 
                : "bg-yellow-50 text-yellow-700"
            }`}>
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>

          {/* Writing Header */}
          <div className="mb-8">
            <span className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Edit Your Story
            </span>
            <input
              className="w-full text-4xl font-black text-slate-900 placeholder:text-slate-200 outline-none border-none bg-transparent"
              placeholder="Give your post a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
      </main>
    </div>
  );
}