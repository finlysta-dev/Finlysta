import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const internship = await prisma.internship.findUnique({
      where: { id }
    });

    if (!internship) {
      return NextResponse.json(
        { message: "Internship not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.internship.update({
      where: { id },
      data: {
        isTrending: !internship.isTrending
      }
    });

    return NextResponse.json(updated);

  } catch (error) {
    console.error("Toggle trending error:", error);

    return NextResponse.json(
      { message: "Failed to toggle trending" },
      { status: 500 }
    );
  }
}