import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await prisma.notification.deleteMany({
      where: { userId }
    });

    return NextResponse.json({
      success: true,
      message: "All notifications deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting all notifications:", error);
    return NextResponse.json(
      { error: "Failed to delete notifications" },
      { status: 500 }
    );
  }
}