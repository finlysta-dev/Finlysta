import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure this path matches your auth config
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const { internshipId } = await req.json();

    if (!internshipId) {
      return NextResponse.json({ error: "Internship ID missing" }, { status: 400 });
    }

    // This block finds the user by email. 
    // If they aren't in the DB yet, it registers them (upsert).
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {}, 
      create: {
        email: session.user.email,
        name: session.user.name ?? "New Applicant",
        image: session.user.image,
      },
    });

    // Create the application
    const application = await prisma.internshipApplication.create({
      data: {
        userId: user.id,
        internshipId: internshipId,
      },
    });

    return NextResponse.json({ success: true, application });

  } catch (error: any) {
    // Handle Prisma unique constraint error (P2002)
    if (error.code === "P2002") {
      return NextResponse.json({ error: "You have already applied for this role." }, { status: 409 });
    }

    console.error("Apply Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
