import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      education: true,
      employments: true,
      certificates: true,
      accomplishments: true,
      projects: true,
    },
  })

  return user
}
