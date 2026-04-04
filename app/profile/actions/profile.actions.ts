"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function updateContactInfo(formData: FormData) {
  const user = await getCurrentUser()

  // ✅ Null safety fix
  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      location: (formData.get("location") as string) || "",
      linkedinUrl: (formData.get("linkedinUrl") as string) || "",
      githubUrl: (formData.get("githubUrl") as string) || "",
      portfolioUrl: (formData.get("portfolioUrl") as string) || "",
      mediumUrl: (formData.get("mediumUrl") as string) || "",
      twitterUrl: (formData.get("twitterUrl") as string) || "",
    },
  })

  revalidatePath(`/profile/${user.id}`)
}