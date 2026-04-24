import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ Add this to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "100");

    // Build where clause
    const where: any = {};
    
    if (type && type !== "") {
      where.type = type;
    }
    
    if (search && search !== "") {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch notifications
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      },
      take: limit,
    });

    // Calculate stats
    const total = notifications.length;
    const broadcast = notifications.filter(n => n.userId === null).length;
    const userSpecific = notifications.filter(n => n.userId !== null).length;
    const unreadTotal = notifications.filter(n => n.isRead === false).length;
    
    // Get unique types
    const types = [...new Set(notifications.map(n => n.type))];

    return NextResponse.json({
      success: true,
      data: notifications,
      total,
      broadcast,
      userSpecific,
      unreadTotal,
      types,
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
