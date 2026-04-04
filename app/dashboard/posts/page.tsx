"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Calendar, Eye, Heart, MessageCircle, Edit, Trash2, Sparkles, ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  slug: string;
  createdAt: string;
  _count?: {
    likes: number;
    comments: number;
    views: number;
  };
}

export default function UserPostsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"published" | "drafts">("published");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchPosts();
    }
  }, [session, activeTab]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/posts?status=${activeTab}`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredPosts = posts.filter(post => 
    activeTab === "published" ? post.published : !post.published
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link 
                  href="/dashboard" 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft size={20} />
                </Link>
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
                </div>
              </div>
              <p className="text-gray-500 text-sm ml-9">
                Manage your blog posts and projects
              </p>
            </div>
            <Link
              href="/dashboard/posts/create"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Plus size={18} />
              Create New Post
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="flex gap-6 border-b">
          <button
            onClick={() => setActiveTab("published")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === "published"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Published ({posts.filter(p => p.published).length})
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === "drafts"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Drafts ({posts.filter(p => !p.published).length})
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === "published" ? "No published posts yet" : "No drafts"}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "published" 
                ? "Share your work with the community" 
                : "Start writing your first post"}
            </p>
            <Link
              href="/dashboard/posts/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700"
            >
              <Plus size={18} />
              Create New Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
              >
                <div className="p-6">
                  {/* Title */}
                  <Link href={`/posts/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  {/* Content Preview */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.content?.replace(/<[^>]*>/g, '').substring(0, 150) || 'No content yet'}...
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {post._count?.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={12} />
                      {post._count?.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {post._count?.comments || 0}
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  {!post.published && (
                    <span className="inline-block px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full mb-3">
                      Draft
                    </span>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/dashboard/posts/edit/${post.id}`}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={14} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}