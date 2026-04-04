"use client";

import { useState } from "react";

export default function NotificationsPage() {
  const [target, setTarget] = useState("ALL");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("INFO");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  async function sendNotification(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const payload = {
        target,
        userId: target === "USER" ? userId : undefined,
        title,
        message,
        type,
        link: link || undefined
      };

      console.log("Sending payload:", payload);

      const res = await fetch("/api/admin/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Failed to send");
      }

      setResponseMessage(`✅ ${data.message || "Notification sent successfully!"}`);
      
      // Reset form
      setTitle("");
      setMessage("");
      setUserId("");
      setLink("");

      // Clear success message after 5 seconds
      setTimeout(() => setResponseMessage(""), 5000);

    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(`❌ ${error instanceof Error ? error.message : "Failed to send notification"}`);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Send Notification
      </h1>

      {responseMessage && (
        <div className={`mb-4 p-3 rounded-lg ${
          responseMessage.startsWith("✅") 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {responseMessage}
        </div>
      )}

      <form onSubmit={sendNotification} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Send To
          </label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            <option value="ALL">All Users</option>
            <option value="USER">Specific User</option>
          </select>
        </div>

        {target === "USER" && (
          <div>
            <label className="block mb-1 font-medium">
              User ID
            </label>
            <input
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border px-4 py-2 rounded w-full"
              required
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">
            Title
          </label>
          <input
            placeholder="Notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Message
          </label>
          <textarea
            placeholder="Notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Link (optional)
          </label>
          <input
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            type="url"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Notification Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            <option value="INFO">ℹ️ Info</option>
            <option value="SUCCESS">✅ Success</option>
            <option value="WARNING">⚠️ Warning</option>
            <option value="ERROR">❌ Error</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
}