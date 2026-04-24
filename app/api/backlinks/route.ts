import { NextResponse } from "next/server";

export async function GET() {
  // This would be connected to a database in production
  const backlinks = [
    { source: "LinkedIn", url: "https://linkedin.com/company/Finlysta", type: "Social" },
    { source: "Twitter", url: "https://twitter.com/Finlysta", type: "Social" },
    { source: "Instagram", url: "https://instagram.com/Finlysta.in", type: "Social" },
  ];
  
  return NextResponse.json({ 
    total: backlinks.length,
    backlinks,
    message: "Build more backlinks to improve SEO ranking"
  });
}
