import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      company,
      companyWebsite,
      aboutCompany,
      location,
      category,
      workMode,
      internshipType,
      duration,
      description,
      applyLink,
      skills,
      perks,
      paid,
      stipendAmount,
      isTrending,
      verified,
      published,
    } = body;

    // Validation
    if (!title || !company || !location || !category || !workMode || !duration || !description || !applyLink) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create internship
    const internship = await prisma.internship.create({
      data: {
        title,
        company,
        companyWebsite: companyWebsite || null,
        aboutCompany: aboutCompany || null,
        location,
        category,
        workMode,
        internshipType: internshipType || null,
        duration,
        description,
        applyLink,
        skills: skills || [],
        perks: perks || [],
        paid: paid || false,
        stipendAmount: paid ? stipendAmount : null,
        isTrending: isTrending || false,
        verified: verified || false,
        published: published !== false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Internship created successfully",
      data: internship,
    });

  } catch (error) {
    console.error("Error creating internship:", error);
    return NextResponse.json(
      { error: "Failed to create internship" },
      { status: 500 }
    );
  }
}