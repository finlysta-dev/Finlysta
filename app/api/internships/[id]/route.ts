import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Log the ID being searched
    console.log("Searching for internship with ID:", params.id);
    
    // Test database connection first
    await prisma.$connect();
    console.log("Database connected successfully");
    
    const internship = await prisma.internship.findUnique({
      where: { id: params.id }
    });
    
    if (!internship) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json(internship);
  } catch (error: any) {
    // Return the actual error message
    console.error("Error details:", error);
    return NextResponse.json(
      { 
        error: "Server error", 
        details: error.message,
        code: error.code,
        meta: error.meta
      }, 
      { status: 500 }
    );
  }
}