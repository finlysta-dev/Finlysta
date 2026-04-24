import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {

  const body = await req.json();

  const { id, status } = body;

  try {

    await prisma.contactMessage.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    return NextResponse.json({
      success:false
    });

  }

}
