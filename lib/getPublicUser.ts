import { prisma } from "@/lib/prisma"

export async function getPublicUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      education: true,
      employments: true,
      certificates: true,
    },
  })

  if (!user) return null

  return user
}
