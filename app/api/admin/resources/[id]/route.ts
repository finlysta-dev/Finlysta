import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await request.json();

    const updatedResource = await prisma.careerResource.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedResource);

  } catch (error) {
    console.error("Update resource error:", error);

    return NextResponse.json(
      { message: "Failed to update resource" },
      { status: 500 }
    );
  }
}