import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await context.params;

    await prisma.internship.delete({
      where: { id }
    });

    return NextResponse.json({
      message: "Internship deleted successfully"
    });

  } catch (error) {

    console.error("Delete internship error:", error);

    return NextResponse.json(
      { message: "Failed to delete internship" },
      { status: 500 }
    );

  }
}