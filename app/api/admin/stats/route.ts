import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL
export async function GET() {
  try {
    const stats = await prisma.systemStat.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, data: stats });

  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ success: false, data: [] });
  }
}

// CREATE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const stat = await prisma.systemStat.create({
      data: {
        label: body.label,
        value: body.value,
        icon: body.icon || "users",
        order: body.order || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data: stat });

  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ success: false });
  }
}
