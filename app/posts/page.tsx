import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  // ❗ If draft or missing → 404 (INTENDED)
  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-500 text-sm mb-6">
        {new Date(post.createdAt).toDateString()}
      </p>

      <div className="whitespace-pre-wrap">
        {post.content}
      </div>
    </main>
  );
}
