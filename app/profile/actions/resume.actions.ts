"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function uploadResume(formData: FormData) {
  const user = await getCurrentUser()

  // ✅ Null safety fix
  if (!user) {
    throw new Error("Unauthorized")
  }

  const file = formData.get("resume") as File

  if (!file) {
    throw new Error("No file uploaded")
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), "public", "uploads")

  await mkdir(uploadDir, { recursive: true })

  const fileName = `${user.id}-${Date.now()}.pdf`
  const filePath = path.join(uploadDir, fileName)

  await writeFile(filePath, buffer)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resumeUrl: `/uploads/${fileName}`,
      resumeName: file.name,
      resumeUpdated: new Date(),
    },
  })

  revalidatePath(`/profile/${user.id}`)
}
