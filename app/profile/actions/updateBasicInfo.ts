"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function updateBasicInfo(formData: FormData) {
  const user = await getCurrentUser()

  // ✅ IMPORTANT: null guard
  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: (formData.get("name") as string) || "",
      headline: (formData.get("headline") as string) || "",
      bio: (formData.get("bio") as string) || "",
      location: (formData.get("location") as string) || "",
    },
  })

  revalidatePath(`/profile/${user.id}`)
}