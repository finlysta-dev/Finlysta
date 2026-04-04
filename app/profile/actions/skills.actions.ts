"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export async function addSkill(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const skill = (formData.get("skill") as string)?.trim()

  if (!skill) return
  if (user.skills.includes(skill)) return

  await prisma.user.update({
    where: { id: user.id },
    data: {
      skills: {
        push: skill,
      },
    },
  })

  revalidatePath(`/profile/${user.id}`)
}

export async function deleteSkill(skill: string) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      skills: user.skills.filter((s:any) => s !== skill),
    },
  })

  revalidatePath(`/profile/${user.id}`)
}