import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Simple function to generate a random session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) + 
         Date.now().toString(36);
}

export async function trackVisitor(req: NextRequest) {
  try {
    // Get session ID from cookies
    let sessionId = req.cookies.get('visitor_session')?.value;
    
    // Create new session ID if not exists
    if (!sessionId) {
      sessionId = generateSessionId();
    }
    
    // Only track page views, not API routes and admin pages
    if (!req.nextUrl.pathname.startsWith('/api') && 
        !req.nextUrl.pathname.startsWith('/admin') &&
        !req.nextUrl.pathname.startsWith('/_next')) {
      await prisma.visitor.create({
        data: {
          sessionId: sessionId,
          createdAt: new Date()
        }
      });
    }
    
    return sessionId;
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return null;
  }
}