"use client";

type Post = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  const deletePost = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Failed to delete post");
      return;
    }

    window.location.reload();
  };

  return (
    <div>
      {posts.length === 0 && <p>No posts yet</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded mb-3 flex justify-between"
        >
          <div>
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <small>
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>

          <div className="flex gap-3">
            <a
              href={`/dashboard/edit-post/${post.id}`}
              className="text-blue-600 underline"
            >
              Edit
            </a>

            <button
              onClick={() => deletePost(post.id)}
              className="text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
