import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Toggle ban
    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        isBanned: !user.isBanned
      }
    });

    return NextResponse.json({
      success: true,
      user: updated
    });

  } catch (error) {

    console.error("Ban toggle error:", error);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );

  }

}