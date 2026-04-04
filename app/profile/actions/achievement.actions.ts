"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function createAchievement(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.accomplishment.create({
    data: {
      title: formData.get("title") as string,
      type: (formData.get("type") as string) || "GENERAL",
      link: (formData.get("link") as string) || null,
      description: (formData.get("description") as string) || null,
      userId: user.id,
    },
  })

  revalidatePath(`/profile/${user.id}`)
}

export async function deleteAchievement(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.accomplishment.delete({
    where: { id },
  })

  revalidatePath(`/profile/${user.id}`)
}