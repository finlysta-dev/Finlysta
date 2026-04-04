"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  RefreshCw, 
  Save, 
  AlertCircle, 
  Loader2, 
  History,
  Eye
} from "lucide-react";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch post data");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setContent(data.content || "");
        setPublished(Boolean(data.published));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  const handleUpdate = async (isPublished: boolean) => {
    setUpdating(true);
    setError("");

    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          published: isPublished,
        }),
      });

      if (!res.ok) throw new Error("Failed to update showcase");

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen animate-pulse">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
        <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">Fetching Showcase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FF] pb-20">
      {/* --- TOP STICKY NAV --- */}
      <nav className="bg-white border-b sticky top-0 z-10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
          >
            <ArrowLeft size={18} /> Discard Changes
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-md border ${
              published ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
            }`}>
              {published ? "Currently Live" : "Draft Mode"}
            </span>

            <button
              onClick={() => handleUpdate(published)} // Keep current status but save
              disabled={updating}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-all"
            >
              {updating ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save
            </button>
            
            <button
              onClick={() => handleUpdate(!published)} // Toggle and save
              disabled={updating}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm shadow-lg transition-all ${
                published 
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-slate-200" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              {published ? "Unpublish" : "Go Live"}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-12 px-6">
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl">
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="mb-8">
            <span className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <History size={14} /> Editing Showcase
            </span>
            <input
              className="w-full text-4xl font-black text-slate-900 placeholder:text-slate-200 outline-none border-none bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <textarea
              className="w-full text-lg text-slate-700 placeholder:text-slate-300 outline-none border-none bg-transparent resize-none min-h-[400px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* --- LIVE PREVIEW BOX --- */}
        {published && (
           <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <p className="text-sm font-bold text-emerald-800">This post is visible to recruiters.</p>
              </div>
              <Link href={`/post/${params.id}`} target="_blank" className="text-emerald-700 text-xs font-black uppercase flex items-center gap-1 hover:underline">
                View Live <Eye size={14} />
              </Link>
           </div>
        )}
      </main>
    </div>
  );
}