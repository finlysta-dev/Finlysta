import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import InternshipsClient from "./InternshipsClient";

export const dynamic = "force-dynamic";

export default async function InternshipsPage() {
  const session = await getServerSession(authOptions);

  const internships = await prisma.internship.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  let appliedIds: string[] = [];

  if (session?.user?.email) {
    const applications = await prisma.internshipApplication.findMany({
      where: {
        user: { email: session.user.email },
      },
      select: {
        internshipId: true,
      },
    });

    appliedIds = applications.map((a: any) => a.internshipId);
  }

  return (
    <InternshipsClient
      internships={internships}
      appliedIds={appliedIds}
    />
  );
}
