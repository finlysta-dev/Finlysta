"use client";

import { useRouter } from "next/navigation";

export default function PostsClient({ posts }: any) {
  const router = useRouter();

  const deletePost = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete post");
      return;
    }

    router.refresh();
  };

  if (posts.length === 0) {
    return <p>No posts yet</p>;
  }

  return (
    <>
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="border p-4 rounded mb-3 flex justify-between"
        >
          <div>
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>

          <div className="flex gap-3">
            <a
              href={`/dashboard/edit-post/${post.id}`}
              className="text-blue-600 text-sm underline"
            >
              Edit
            </a>

            <button
              onClick={() => deletePost(post.id)}
              className="text-red-600 text-sm underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
