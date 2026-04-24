"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Sparkles,
  Send,
  Loader2,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Users,
  Award,
  Flame,
  Clock,
  User,
  ChevronUp,
  Briefcase,
  Target,
  Zap,
  Crown,
  ArrowLeft
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string | null;
  slug: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  _count: {
    likes: number;
    comments: number;
    views: number;
  };
  liked?: boolean;
  saved?: boolean;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

export default function CommunityPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [likingPost, setLikingPost] = useState<string | null>(null);
  const [submittingComment, setSubmittingComment] = useState<string | null>(null);
  const [savingPost, setSavingPost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPosts();
    fetchInternships();
  }, []);

  const fetchPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch("/api/posts/public");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const postsArray = data.posts || [];
      
      const formattedPosts = postsArray.map((post: any) => ({
        ...post,
        _count: {
          likes: post._count?.likes || 0,
          comments: post._count?.comments || 0,
          views: post._count?.views || 0,
        },
        liked: post.liked || false,
        saved: post.saved || false,
      }));
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchInternships = async () => {
    try {
      const response = await fetch("/api/internships?limit=2");
      if (response.ok) {
        const data = await response.json();
        setInternships(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      
      const data = await response.json();
      setComments(prev => ({ ...prev, [postId]: data.comments || [] }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async (postId: string) => {
    if (!session) {
      alert("Please sign in to support posts");
      return;
    }

    setLikingPost(postId);
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) throw new Error('Failed to support post');
      
      const data = await response.json();
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const currentLikes = post._count?.likes || 0;
          return {
            ...post,
            _count: {
              ...post._count,
              likes: data.liked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
            },
            liked: data.liked,
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error supporting post:", error);
      alert("Failed to like. Please try again.");
    } finally {
      setLikingPost(null);
    }
  };

  const handleSave = async (postId: string) => {
    if (!session) {
      alert("Please sign in to save posts");
      return;
    }

    setSavingPost(postId);
    try {
      const response = await fetch(`/api/posts/${postId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) throw new Error('Failed to save post');
      
      const data = await response.json();
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            saved: data.saved,
          };
        }
        return post;
      }));
      
      alert(data.saved ? "Post saved!" : "Post removed from saved!");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    } finally {
      setSavingPost(null);
    }
  };

  const handleComment = async (postId: string) => {
    if (!session) {
      alert("Please sign in to comment");
      return;
    }

    if (!commentText.trim()) {
      alert("Please write a comment");
      return;
    }

    setSubmittingComment(postId);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });
      
      if (!response.ok) throw new Error('Failed to post comment');
      
      const data = await response.json();
      
      setComments(prev => ({
        ...prev,
        [postId]: [data.comment, ...(prev[postId] || [])]
      }));
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            _count: {
              ...post._count,
              comments: (post._count?.comments || 0) + 1,
            },
          };
        }
        return post;
      }));
      
      setCommentText("");
      setActiveCommentPost(null);
      alert("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmittingComment(null);
    }
  };

  const handleShare = async (slug: string) => {
    try {
      const url = `${window.location.origin}/posts/${slug}`;
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Failed to copy link. Please try again.");
    }
  };

  const toggleReadMore = (postId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const timeAgo = (date: string) => {
    if (!date) return "recently";
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const extractHashtags = (text: string) => {
    const hashtagRegex = /#[\w\u0590-\u05fe]+/g;
    return text.match(hashtagRegex) || [];
  };

  // Get user's post count (for streak/day number)
  const getUserPostCount = (userId: string) => {
    return posts.filter(post => post.author?.id === userId).length;
  };

  // Get current user's post count
  const getCurrentUserPostCount = () => {
    if (!session?.user?.id) return 0;
    return posts.filter(post => post.author?.id === session.user.id).length;
  };

  const getUserLikeCount = () => {
    if (!session?.user?.id) return 0;
    const userPosts = posts.filter(post => post.author?.id === session.user.id);
    return userPosts.reduce((acc, post) => acc + (post._count?.likes || 0), 0);
  };

  const renderAvatar = (imageUrl: string | null | undefined, name: string | null | undefined, size: number = 48) => {
    const initial = name?.[0]?.toUpperCase() || 'U';
    
    if (imageUrl) {
      return (
        <img 
          src={imageUrl} 
          alt={name || "User"} 
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://ui-avatars.com/api/?name=${initial}&background=3b82f6&color=fff&bold=true&size=${size*2}&rounded=true`;
          }}
        />
      );
    }
    
    return (
      <img 
        src={`https://ui-avatars.com/api/?name=${initial}&background=3b82f6&color=fff&bold=true&size=${size*2}&rounded=true`}
        alt={name || "User"}
        className="object-cover w-full h-full"
      />
    );
  };

  const MedalIcon = ({ size, className }: { size: number; className?: string }) => {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 14v2a7 7 0 0 0 14 0v-2" />
        <line x1="12" y1="12" x2="12" y2="22" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading community...</p>
        </div>
      </div>
    );
  }

  const currentUserPostCount = getCurrentUserPostCount();
  const progressPercentage = Math.min((currentUserPostCount / 30) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community
              </h1>
              <p className="text-sm text-gray-500">Share your learning journey</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Back Button - Moved to right side next to Write Post */}
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft size={18} />
                <span className="text-sm">Back to Home</span>
              </button>
              {session && (
                <Link
                  href="/dashboard/posts/create"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md"
                >
                  <Sparkles size={16} />
                  Write a post
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            {session && session.user?.id && (
              <>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                      {renderAvatar(session.user?.image, session.user?.name, 56)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {session.user?.name || "Your Profile"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {currentUserPostCount} Posts • {getUserLikeCount()} Supports
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Flame size={14} className="text-orange-500" />
                        <span className="text-sm font-semibold text-orange-600">Streak: {currentUserPostCount} Days</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/dashboard/posts/create"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all shadow-md mb-4"
                  >
                    <Sparkles size={18} />
                    + Create Post
                  </Link>
                  
                  <div className="space-y-2 border-t border-gray-100 pt-4">
                    <Link href="/saved" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Bookmark size={16} className="text-orange-600" />
                      <span className="text-sm text-gray-700">Saved Posts</span>
                    </Link>
                    <Link href={`/profile/${session.user.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <User size={16} className="text-green-600" />
                      <span className="text-sm text-gray-700">My Profile</span>
                    </Link>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={18} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Your Journey Progress</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Day {currentUserPostCount} / Day 30</p>
                  <div className="h-2 bg-blue-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {currentUserPostCount === 0 ? "Start your journey today! 🚀" : 
                     currentUserPostCount >= 30 ? "Amazing! You've reached 30 days! 🎉" : 
                     `Keep going! You're building consistency 🔥`}
                  </p>
                </div>
              </>
            )}

            {session && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={20} className="text-orange-500" />
                  <h3 className="font-semibold text-gray-900">Keep Your Streak Alive</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  You're on Day {currentUserPostCount}
                  {currentUserPostCount === 0 ? " - Post today to start your journey!" : " - Post today to reach Day " + (currentUserPostCount + 1)}
                </p>
                <Link
                  href="/dashboard/posts/create"
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-medium transition-colors"
                >
                  <Sparkles size={16} />
                  Create Post
                </Link>
              </div>
            )}
          </div>

          {/* MAIN FEED */}
          <div className="lg:col-span-6">
            {session && (
              <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                    {renderAvatar(session.user?.image, session.user?.name, 40)}
                  </div>
                  <Link 
                    href="/dashboard/posts/create"
                    className="flex-1 bg-gray-50 hover:bg-gray-100 rounded-full px-5 py-2.5 text-gray-500 transition-colors cursor-pointer text-sm"
                  >
                    What did you learn today? Share your journey...
                  </Link>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center text-sm">
                {error}
                <button onClick={fetchPosts} className="ml-2 text-blue-600 underline">Retry</button>
              </div>
            )}

            {/* Posts Feed */}
            {posts.length === 0 && !error ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={40} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">Be the first to share your learning journey!</p>
                {session && (
                  <Link href="/dashboard/posts/create" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full mt-4 text-sm hover:bg-blue-700">
                    <Sparkles size={16} />
                    Write your first post
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => {
                  const contentText = post.content?.replace(/<[^>]*>/g, '') || '';
                  const hashtags = extractHashtags(contentText);
                  const isExpanded = expandedPosts[post.id] || false;
                  const displayContent = isExpanded ? contentText : contentText.substring(0, 350);
                  // Calculate user's post day based on their post count
                  const userPostNumber = getUserPostCount(post.author?.id || '');
                  
                  return (
                    <div key={post.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      {/* Post Header */}
                      <div className="p-5 pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Link href={`/profile/${post.author?.id}`} className="relative">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                                {renderAvatar(post.author?.image, post.author?.name, 40)}
                              </div>
                            </Link>
                            <div>
                              <div className="flex items-center gap-2">
                                <Link href={`/profile/${post.author?.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                                  {post.author?.name || "Anonymous"}
                                </Link>
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                  Day {userPostNumber}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">{timeAgo(post.createdAt)}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleSave(post.id)} 
                            disabled={savingPost === post.id}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            {savingPost === post.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : post.saved ? (
                              <BookmarkCheck size={16} className="text-blue-600" />
                            ) : (
                              <Bookmark size={16} className="text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Post Content - REMOVED THE LINK from title */}
                      <div className="px-5 pb-3">
                        {/* Title is now just text, NOT a link */}
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                          {displayContent}
                          {contentText.length > 350 && (
                            <button
                              onClick={() => toggleReadMore(post.id)}
                              className="text-blue-600 hover:text-blue-700 ml-1 text-sm"
                            >
                              {isExpanded ? "Show less" : "...see more"}
                            </button>
                          )}
                        </p>
                      </div>

                      {/* Hashtags */}
                      {hashtags.length > 0 && (
                        <div className="px-5 pb-2">
                          <div className="flex flex-wrap gap-2">
                            {hashtags.map((tag, idx) => (
                              <span key={idx} className="text-blue-600 font-semibold text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="px-5 py-2 border-t border-gray-100">
                        <div className="flex items-center gap-5 text-sm">
                          <button 
                            onClick={() => handleLike(post.id)} 
                            disabled={likingPost === post.id}
                            className="flex items-center gap-1.5"
                          >
                            {likingPost === post.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Heart 
                                size={16} 
                                className={post.liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
                              />
                            )}
                            <span className={`text-xs ${post.liked ? 'text-red-500' : 'text-gray-500'}`}>
                              {formatNumber(post._count.likes)} supports
                            </span>
                          </button>
                          <button 
                            onClick={() => {
                              if (activeCommentPost === post.id) {
                                setActiveCommentPost(null);
                              } else {
                                setActiveCommentPost(post.id);
                                if (!comments[post.id]) fetchComments(post.id);
                              }
                            }}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors"
                          >
                            <MessageCircle size={16} />
                            <span className="text-xs">{formatNumber(post._count.comments)} comments</span>
                          </button>
                          <button 
                            onClick={() => handleShare(post.slug)}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-green-500 transition-colors"
                          >
                            <Share2 size={16} />
                            <span className="text-xs">Share</span>
                          </button>
                        </div>
                      </div>

                      {/* Comments Section */}
                      {activeCommentPost === post.id && (
                        <div className="border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                          <div className="p-4">
                            <div className="flex gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                                {renderAvatar(session?.user?.image, session?.user?.name, 32)}
                              </div>
                              <div className="flex-1">
                                <textarea
                                  placeholder="Write a comment..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm bg-white"
                                  rows={2}
                                  autoFocus
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    onClick={() => {
                                      setActiveCommentPost(null);
                                      setCommentText("");
                                    }}
                                    className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleComment(post.id)}
                                    disabled={submittingComment === post.id || !commentText.trim()}
                                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                                  >
                                    {submittingComment === post.id ? (
                                      <Loader2 size={12} className="animate-spin" />
                                    ) : (
                                      <Send size={12} />
                                    )}
                                    Post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {(!comments[post.id] || comments[post.id].length === 0) && (
                              <div className="text-center py-6">
                                <MessageCircle size={24} className="mx-auto text-gray-300 mb-1" />
                                <p className="text-gray-400 text-xs">No comments yet</p>
                              </div>
                            )}
                            {comments[post.id]?.map((comment) => (
                              <div key={comment.id} className="p-3 border-t border-gray-100">
                                <div className="flex gap-2">
                                  <Link href={`/profile/${comment.user?.id}`} className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                    {renderAvatar(comment.user?.image, comment.user?.name, 24)}
                                  </Link>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <Link href={`/profile/${comment.user?.id}`} className="font-semibold text-xs hover:text-blue-600">
                                        {comment.user?.name}
                                      </Link>
                                      <span className="text-[10px] text-gray-400">{timeAgo(comment.createdAt)}</span>
                                    </div>
                                    <p className="text-xs text-gray-700">{comment.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Contributors */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Top Contributors</h3>
              </div>
              <div className="space-y-3">
                {(() => {
                  const contributorMap = new Map();
                  posts.forEach(post => {
                    if (post.author?.id) {
                      if (!contributorMap.has(post.author.id)) {
                        contributorMap.set(post.author.id, {
                          id: post.author.id,
                          name: post.author.name,
                          image: post.author.image,
                          postCount: 0
                        });
                      }
                      contributorMap.get(post.author.id).postCount++;
                    }
                  });
                  return Array.from(contributorMap.values())
                    .sort((a, b) => b.postCount - a.postCount)
                    .slice(0, 5)
                    .map((user, idx) => (
                      <Link href={`/profile/${user.id}`} key={user.id} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 transition-colors">
                        <div className="w-7 text-center">
                          {idx === 0 && <Crown size={16} className="text-yellow-500" />}
                          {idx === 1 && <MedalIcon size={16} className="text-gray-400" />}
                          {idx === 2 && <MedalIcon size={16} className="text-orange-400" />}
                          {idx > 2 && <span className="text-xs text-gray-400">#{idx + 1}</span>}
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                          {renderAvatar(user.image, user.name, 32)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{user.name?.split(' ')[0] || user.name}</p>
                          <p className="text-xs text-gray-500">{user.postCount} posts</p>
                        </div>
                      </Link>
                    ));
                })()}
              </div>
            </div>

            {/* Internships */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={18} className="text-green-600" />
                <h3 className="font-semibold text-gray-900">Recommended Internships</h3>
              </div>
              <div className="space-y-3">
                {internships.slice(0, 2).map((internship) => (
                  <div key={internship.id} className="bg-white rounded-xl p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{internship.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{internship.company} • {internship.location || 'Remote'}</p>
                    <div className="mt-2">
                      <Link href={`/internships/${internship.id}`} className="block w-full text-center text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                        Apply Now →
                      </Link>
                    </div>
                  </div>
                ))}
                {internships.length === 0 && (
                  <div className="bg-white rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500">No internships available</p>
                  </div>
                )}
              </div>
              <Link href="/internships" className="block text-center mt-3 text-sm text-green-600 hover:text-green-700">
                View all internships →
              </Link>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users size={18} className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">Community Stats</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="text-sm font-semibold text-gray-900">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Supports</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {posts.reduce((acc, p) => acc + p._count.likes, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Comments</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {posts.reduce((acc, p) => acc + p._count.comments, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Tip */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Learning Tip</h3>
              <p className="text-sm text-gray-700">Share what you learn daily. Small progress adds up to big results!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
