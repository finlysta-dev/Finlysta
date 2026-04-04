import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const { id } = body;

  try {

    await prisma.contactMessage.update({
      where: { id },
      data: { status: "closed" }
    });

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    return NextResponse.json({
      success: false
    });

  }

}