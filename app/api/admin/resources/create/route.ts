import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received body:", body);

    const {
      title,
      excerpt,
      content,
      category,
      fileUrl,
      link,
      type
    } = body;

    // Validate required fields
    if (!title || !excerpt || !category || !type) {
      console.log("Missing required fields:", { title, excerpt, category, type });
      return NextResponse.json(
        { error: "Missing required fields: title, excerpt, category, and type are required" },
        { status: 400 }
      );
    }

    // Generate slug
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const slug = `${baseSlug}-${Date.now()}`;
    console.log("Generated slug:", slug);

    // Log available Prisma models
    console.log("Available Prisma models:", 
      Object.keys(prisma).filter(key => !key.startsWith('_')));

    // Prepare data based on type
    const resourceData: any = {
      title,
      slug,
      excerpt,
      category,
      type,
      published: true,
    };

    // Only add fields that are relevant to the type
    if (type === "text") {
      resourceData.content = content;
    } else if (type === "pdf") {
      resourceData.fileurl = fileUrl; // Note: lowercase 'u' to match schema
    } else if (type === "link") {
      resourceData.link = link;
    }

    console.log("Attempting to create with data:", resourceData);

    // Try to create the resource
    const resource = await prisma.careerResource.create({
      data: resourceData
    });

    console.log("Resource created successfully:", resource);

    return NextResponse.json({ 
      success: true, 
      resource,
      message: "Resource created successfully" 
    });

  } catch (error: any) {
    console.error("RESOURCE ERROR DETAILS:", {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });

    // Check for specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A resource with this slug already exists" },
        { status: 409 }
      );
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Foreign key constraint failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create resource" },
      { status: 500 }
    );
  }
}
