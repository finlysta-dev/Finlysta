import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true, // ✅ ONLY LIVE POSTS (unchanged)
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No published posts yet.</p>
      )}

      <div className="space-y-6">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border rounded-lg p-5 hover:shadow-sm transition bg-white"
          >
            {/* TITLE */}
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-xl font-semibold mb-1 hover:underline">
                {post.title}
              </h2>
            </Link>

            {/* META */}
            <p className="text-sm text-gray-500 mb-3">
              By {post.author?.name || "Anonymous"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            {/* CONTENT PREVIEW */}
            {post.content && (
              <p className="text-gray-700 line-clamp-2 mb-4">
                {post.content}
              </p>
            )}

            {/* ACTION BAR (UI ONLY) */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              {/* Like */}
              <button
                type="button"
                className="hover:text-red-600 transition flex items-center gap-1"
              >
                ❤️ Like
              </button>

              {/* Comment */}
              <button
                type="button"
                className="hover:text-blue-600 transition flex items-center gap-1"
              >
                💬 Comment
              </button>

              {/* Share */}
              <button
                type="button"
                className="hover:text-green-600 transition flex items-center gap-1"
              >
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
