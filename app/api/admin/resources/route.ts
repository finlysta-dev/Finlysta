// app/api/resources/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resources = await prisma.careerResource.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Return as array directly (option 1)
    return NextResponse.json(resources);
    
    // OR return as object with resources property (option 2)
    // return NextResponse.json({ resources });
    
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}