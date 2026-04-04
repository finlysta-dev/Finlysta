import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await request.json();

    const updatedInternship = await prisma.internship.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedInternship);

  } catch (error) {
    console.error("Update internship error:", error);

    return NextResponse.json(
      { message: "Failed to update internship" },
      { status: 500 }
    );
  }
}