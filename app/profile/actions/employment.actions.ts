"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function createEmployment(formData: FormData) {
  const user = await getCurrentUser()

  // ✅ Null safety fix
  if (!user) {
    throw new Error("Unauthorized")
  }

  const isCurrent = formData.get("isCurrent") === "on"

  await prisma.employment.create({
    data: {
      role: (formData.get("role") as string) || "",
      company: (formData.get("company") as string) || "",
      startDate: (formData.get("startDate") as string) || "",
      endDate: (formData.get("endDate") as string) || null,
      description: (formData.get("description") as string) || "",
      isCurrent,
      userId: user.id,
    },
  })

  revalidatePath(`/profile/${user.id}`)
}

export async function deleteEmployment(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.employment.delete({
    where: { id },
  })

  revalidatePath(`/profile/${user.id}`)
}