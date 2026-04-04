import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Only allow valid fields that exist in the User schema
    const validFields = {
      name: body.name,
      headline: body.headline,
      location: body.location,
      bio: body.bio,
      email: body.email,
      phone: body.phone,
      // Add other valid fields here if needed
    };

    // Filter out undefined values
    const updateData: any = {};
    Object.keys(validFields).forEach((key) => {
      if (validFields[key as keyof typeof validFields] !== undefined) {
        updateData[key] = validFields[key as keyof typeof validFields];
      }
    });

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}