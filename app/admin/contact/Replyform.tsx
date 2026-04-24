"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReplyForm({ id }: { id: string }) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReply = async () => {
    if (!reply.trim()) {
      alert("Write a reply first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/contact/${id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      // ✅ FIXED CONDITION
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to send reply");
        return;
      }

      // ✅ SUCCESS
      alert("Reply sent successfully");
      setReply("");
      router.refresh();

    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">

      <textarea
        placeholder="Write your reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={sendReply}
        disabled={loading}
        className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-800 transition"
      >
        {loading ? "Sending..." : "Send Reply"}
      </button>

    </div>
  );
}
