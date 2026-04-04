import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
      published: true, // ✅ IMPORTANT: drafts hidden
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* Meta info */}
      <div className="text-sm text-gray-500 mb-6">
        <span>
          By <strong>{post.author?.name || "Anonymous"}</strong>
        </span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content ? (
          <p className="whitespace-pre-line">{post.content}</p>
        ) : (
          <p className="text-gray-400 italic">No content available.</p>
        )}
      </div>
    </article>
  );
}
