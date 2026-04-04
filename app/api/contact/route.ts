import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET → used by admin panel to see messages
export async function GET() {

  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return NextResponse.json(messages);

}


// POST → used by contact form
export async function POST(req: Request) {

  try {

    const { name, email, company, subject, message, userType } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        company,
        subject,
        message,
        userType,
        status: "NEW"
      }
    });

    return NextResponse.json({
      success: true,
      message: newMessage
    });

  } catch (error) {

    console.error("Contact error:", error);

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );

  }

}