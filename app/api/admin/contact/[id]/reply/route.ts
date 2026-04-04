import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { reply } = await req.json();

    if (!reply || reply.trim() === "") {
      return NextResponse.json(
        { error: "Reply content is required" },
        { status: 400 }
      );
    }

    // ✅ find message
    const message = await prisma.contactMessage.findUnique({
      where: { id: params.id },
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    if (!message.email) {
      return NextResponse.json(
        { error: "User email missing" },
        { status: 400 }
      );
    }

    // ✅ send email via Resend
    await resend.emails.send({
      from: "Internify <hello@tryinternify.in>",
      to: message.email,
      subject: `Re: ${message.subject} - Internify Support`,
      html: `
        <div style="font-family: Arial; max-width:600px;">
          <h2>Hello ${message.name},</h2>

          <p>Thanks for contacting Internify.</p>

          <p><strong>Your message:</strong></p>
          <p style="background:#f5f5f5;padding:10px;">
            ${message.message}
          </p>

          <p><strong>Our reply:</strong></p>
          <p>${reply.replace(/\n/g, "<br/>")}</p>

          <br/>
          <p>— Internify Team</p>
        </div>
      `,
    });

    // ✅ update DB - remove repliedAt if it doesn't exist in schema
    const updated = await prisma.contactMessage.update({
      where: { id: params.id },
      data: {
        reply,
        status: "REPLIED",
        // repliedAt: new Date(), // REMOVE THIS LINE
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (error) {
    console.error("REPLY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}