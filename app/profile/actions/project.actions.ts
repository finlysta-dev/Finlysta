"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  const user = await getCurrentUser()

  // ✅ Null safety fix
  if (!user) {
    throw new Error("Unauthorized")
  }

  const title = (formData.get("title") as string) || ""
  const description = (formData.get("description") as string) || ""
  const githubUrl = formData.get("githubUrl") as string
  const liveUrl = formData.get("liveUrl") as string

  await prisma.project.create({
    data: {
      title,
      description,
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      userId: user.id,
    },
  })

  revalidatePath(`/profile/${user.id}`)
}

export async function deleteProject(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.project.delete({
    where: { id },
  })

  revalidatePath(`/profile/${user.id}`)
}