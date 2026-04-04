"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostActions({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);

    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete post");
      setLoading(false);
      return;
    }

    router.refresh(); // ✅ clean refresh
  };

  return (
    <div className="flex gap-3 text-sm">
      <a
        href={`/dashboard/edit-post/${postId}`}
        className="text-blue-600 underline"
      >
        Edit
      </a>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 underline disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
