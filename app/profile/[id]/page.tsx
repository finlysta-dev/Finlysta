import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

import ProfileHeader from "@/app/profile/components/ProfileHeader"
import ProfileCompletion from "@/app/profile/components/ProfileCompletion"

import AboutSection from "@/app/profile/components/sections/AboutSection"
import EmploymentSection from "@/app/profile/components/sections/EmploymentSection"
import EducationSection from "@/app/profile/components/sections/EducationSection"
import SkillsSection from "@/app/profile/components/sections/SkillsSection"
import ResumeCard from "@/app/profile/components/sections/ResumeCard"
import ProjectsSection from "@/app/profile/components/sections/ProjectsSection"
import CertificationsSection from "@/app/profile/components/sections/CertificationSection"
import AchievementsSection from "@/app/profile/components/sections/AchievementsSection"

interface PageProps {
  params: {
    id: string
  }
}

export const dynamic = "force-dynamic"

export default async function PublicProfilePage({ params }: PageProps) {

  // Get logged in session
  const session = await getServerSession(authOptions)

  // If logged in → check if banned
  if (session?.user?.id) {

    const loggedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isBanned: true }
    })

    if (loggedUser?.isBanned) {
      redirect("/banned")
    }

  }

  // Fetch profile user
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      education: true,
      employments: true,
      certificates: true,
      accomplishments: true,
      projects: true,
    },
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">User not found</p>
      </div>
    )
  }

  // If the profile owner is banned → hide profile
  if (user.isBanned) {
    redirect("/banned")
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <ProfileHeader user={user} />

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Profile Completion only for owner */}
        {session?.user?.id === user.id && (
          <ProfileCompletion user={user} />
        )}

        <AboutSection user={user} />
        <EmploymentSection user={user} />
        <EducationSection user={user} />
        <ProjectsSection user={user} />
        <CertificationsSection user={user} />
        <AchievementsSection user={user} />
        <ResumeCard user={user} />
        <SkillsSection user={user} />

      </div>

    </div>
  )
}