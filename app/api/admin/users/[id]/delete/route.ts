import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  const userId = params.id;

  // delete related applications first
  await prisma.internshipApplication.deleteMany({
    where: {
      userId: userId
    }
  });

  // delete user
  await prisma.user.delete({
    where: {
      id: userId
    }
  });

  return NextResponse.json({
    success: true
  });

}