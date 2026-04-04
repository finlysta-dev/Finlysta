"use client";

import { useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  bio: string;
  createdAt: string;
}

interface ProfileTabsProps {
  posts: Post[];
  user: User;
}

export default function ProfileTabs({ posts, user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "about">("posts");

  // ✅ MOVED INSIDE COMPONENT (FIX)
  const [bio, setBio] = useState(user.bio);
  const [saving, setSaving] = useState(false);

  const isOwnProfile =
    typeof window !== "undefined" &&
    window.location.pathname.includes(user.id);

  const saveBio = async () => {
    try {
      setSaving(true);
      await fetch("/api/profile/bio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* TAB BUTTONS */}
      <div className="flex gap-6 border-b mb-6">
        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-2 font-medium ${
            activeTab === "posts"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Posts ({posts.length})
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`pb-2 font-medium ${
            activeTab === "about"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          About
        </button>
      </div>

      {/* POSTS TAB */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {posts.length === 0 && (
            <p className="text-gray-500">No posts yet.</p>
          )}

          {posts.map((post) => (
            <div key={post.id} className="border rounded p-4">
              <h3 className="font-semibold">{post.title}</h3>

              {post.content && (
                <p className="text-gray-600 text-sm mt-1">
                  {post.content}
                </p>
              )}

              <small className="text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* ABOUT TAB */}
      {activeTab === "about" && (
        <div className="space-y-6 max-w-xl">
          {/* BIO */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Bio</p>

            {isOwnProfile ? (
              <>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Write something about yourself…"
                />

                <button
                  onClick={saveBio}
                  disabled={saving}
                  className="mt-2 bg-black text-white px-4 py-2 rounded text-sm"
                >
                  {saving ? "Saving..." : "Save Bio"}
                </button>
              </>
            ) : (
              <p className="text-gray-700">
                {user.bio || "No bio added yet."}
              </p>
            )}
          </div>

          {/* NAME */}
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name ?? "—"}</p>
          </div>

          {/* EMAIL */}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email ?? "—"}</p>
          </div>

          {/* JOINED */}
          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
