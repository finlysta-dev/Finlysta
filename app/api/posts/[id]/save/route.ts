import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const postId = params.id;
    const userId = session.user.id;

    // Check if already saved
    const existingSave = await prisma.savedPost.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingSave) {
      // Unsave
      await prisma.savedPost.delete({
        where: { id: existingSave.id },
      });
      return NextResponse.json({ saved: false });
    } else {
      // Save
      await prisma.savedPost.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error("Error toggling save:", error);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}