"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function createEducation(formData: FormData) {
  const user = await getCurrentUser()

  // ✅ Null safety fix
  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.education.create({
    data: {
      school: (formData.get("school") as string) || "",
      degree: (formData.get("degree") as string) || "",
      yearStart: (formData.get("yearStart") as string) || null,
      yearEnd: (formData.get("yearEnd") as string) || "",
      userId: user.id,
    },
  })

  revalidatePath(`/profile/${user.id}`)
}

export async function deleteEducation(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.education.delete({
    where: { id },
  })

  revalidatePath(`/profile/${user.id}`)
}
