import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

interface NotificationRequest {
  target: "ALL" | "USER";
  userId?: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
}

export async function POST(req: Request) {
  try {
    const body: NotificationRequest = await req.json();
    
    console.log("Sending notification with body:", body);

    const { target, userId, title, message, type, link } = body;

    // Validate required fields
    if (!title || !message || !type) {
      return NextResponse.json(
        { error: "Title, message, and type are required" },
        { status: 400 }
      );
    }

    // Validate target
    if (target !== "ALL" && target !== "USER") {
      return NextResponse.json(
        { error: "Target must be either 'ALL' or 'USER'" },
        { status: 400 }
      );
    }

    // For USER target, userId is required
    if (target === "USER" && !userId) {
      return NextResponse.json(
        { error: "userId is required when target is USER" },
        { status: 400 }
      );
    }

    if (target === "ALL") {
      // Get all users
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true
        }
      });

      console.log(`Found ${users.length} users to send notifications`);

      if (users.length === 0) {
        return NextResponse.json(
          { error: "No users found to send notifications" },
          { status: 404 }
        );
      }

      // Create notifications for all users
      const notifications = await prisma.notification.createMany({
        data: users.map((user) => ({
          title,
          message,
          type,
          link: link || null,  // This should work now
          userId: user.id,
          isRead: false
        }))
      });

      return NextResponse.json({
        success: true,
        message: `Notification sent to ${users.length} users`,
        data: {
          count: notifications.count,
          target: "ALL"
        }
      });

    } else {
      // Send notification to single user
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true }
      });

      if (!userExists) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Create notification for single user
      const notification = await prisma.notification.create({
        data: {
          title,
          message,
          type,
          link: link || null,  // This should work now
          userId: userId as string,
          isRead: false
        }
      });

      return NextResponse.json({
        success: true,
        message: "Notification sent successfully",
        data: {
          id: notification.id,
          target: "USER",
          userId: userId
        }
      });
    }

  } catch (error) {
    console.error("Error sending notification:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      if (error.message.includes("Prisma") || error.message.includes("prisma")) {
        return NextResponse.json(
          { error: "Database error occurred", details: error.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to send notification", details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
