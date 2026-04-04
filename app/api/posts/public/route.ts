import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get all posts without any filters to debug
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    console.log("========== POSTS DEBUG ==========");
    console.log("Posts found in database:", posts.length);
    
    if (posts.length > 0) {
      console.log("Post IDs:", posts.map(p => p.id));
      console.log("Post titles:", posts.map(p => p.title));
    }
    console.log("=================================");
    
    // Return posts even if empty
    return NextResponse.json({ 
      success: true,
      posts: posts,
      count: posts.length 
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      success: false, 
      posts: [],
      error: String(error) 
    });
  }
}