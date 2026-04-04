import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();
    const { status } = body;

    await prisma.internshipApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Application update error:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}