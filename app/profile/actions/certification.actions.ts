"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function createCertification(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.certification.create({
    data: {
      title: (formData.get("title") as string) || "",
      issuer: (formData.get("issuer") as string) || "",
      link: (formData.get("link") as string) || null,
      validFrom: (formData.get("validFrom") as string) || null,
      validTo: (formData.get("validTo") as string) || null,
      userId: user.id,
    },
  })

  revalidatePath(`/profile/${user.id}`)
}

export async function deleteCertification(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.certification.delete({
    where: { id },
  })

  revalidatePath(`/profile/${user.id}`)
}