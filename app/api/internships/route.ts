import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limitParam = searchParams.get("limit");
    const trendingParam = searchParams.get("trending");

    const limit = limitParam ? Number(limitParam) : 8;
    const isTrending = trendingParam === "true";

    const internships = await prisma.internship.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return NextResponse.json(internships ?? []);
  } catch (error) {
    console.error("Internships API error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
