import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// UPDATE
export async function PUT(req: Request, { params }: any) {
  try {
    const body = await req.json();

    const stat = await prisma.systemStat.update({
      where: { id: params.id },
      data: {
        label: body.label,
        value: body.value,
        icon: body.icon,
        isActive: body.isActive,
        order: body.order,
      },
    });

    return NextResponse.json({ success: true, data: stat });

  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ success: false });
  }
}

// DELETE
export async function DELETE(_: Request, { params }: any) {
  try {
    await prisma.systemStat.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ success: false });
  }
}