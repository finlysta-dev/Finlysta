import prisma from "@/lib/prisma";
import { transporter } from "@/lib/mail";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If email exists, reset link sent",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 1000 * 60 * 30);

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    });

    const resetLink =
      `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"Finlysta Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your Finlysta password",
      html: `
      <h2>Finlysta Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 30 minutes.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Reset email sent",
    });

  } catch (error) {

    console.error("Forgot password error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }

}
