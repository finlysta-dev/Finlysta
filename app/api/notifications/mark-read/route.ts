import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { notificationId, userId, markAll } = body;

    if (markAll && userId) {
      await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      });

      return NextResponse.json({
        success: true,
        message: "All notifications marked as read"
      });
    } 
    
    if (notificationId) {
      const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true }
      });

      return NextResponse.json({
        success: true,
        message: "Notification marked as read",
        data: notification
      });
    }

    return NextResponse.json(
      { error: "Either notificationId or userId with markAll is required" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json(
      { error: "Failed to mark notifications as read" },
      { status: 500 }
    );
  }
}
