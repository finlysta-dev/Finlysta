import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const id = params.id

    await prisma.contactMessage.update({
      where: { id },
      data: { status: "CLOSED" }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error("Close ticket error:", error)

    return NextResponse.json(
      { error: "Failed to close ticket" },
      { status: 500 }
    )

  }

}