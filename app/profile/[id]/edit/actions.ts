"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const userId = formData.get("userId") as string;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const totalExperience = formData.get("totalExperience") as string;
  const bio = formData.get("bio") as string;

  const resumeUrl = formData.get("resumeUrl") as string;
  const portfolioUrl = formData.get("portfolioUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const twitterUrl = formData.get("twitterUrl") as string;

  const dateOfBirth = formData.get("dateOfBirth") as string;
  const gender = formData.get("gender") as string;

  const skillsRaw = formData.get("skills") as string;
  const skills = skillsRaw
    ? skillsRaw.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const languagesRaw = formData.get("languagesRaw") as string;
  const languageLines = languagesRaw
    ? languagesRaw.split("\n").filter(line => line.trim())
    : [];

  const languages = languageLines.map(line => {
    const parts = line.split("|").map(p => p.trim());
    return `${parts[0] || ""} (${parts[1] || ""})`;
  });

  const experienceRaw = formData.get("experienceRaw") as string;
  const experienceLines = experienceRaw
    ? experienceRaw.split("\n").filter(line => line.trim())
    : [];

  const experiences = experienceLines.map(line => {
    const parts = line.split("|").map(p => p.trim());
    return {
      role: parts[0] || "",
      company: parts[1] || "",
      startDate: parts[2] || "",
      endDate: parts[3] || null,
      description: parts[4] || "",
    };
  });

  const educationRaw = formData.get("educationRaw") as string;
  const educationLines = educationRaw
    ? educationRaw.split("\n").filter(line => line.trim())
    : [];

  const education = educationLines.map(line => {
    const parts = line.split("|").map(p => p.trim());
    return {
      school: parts[0] || "",
      degree: parts[1] || "",
      yearStart: parts[2] || null,
      yearEnd: parts[3] || "",
    };
  });

  const achievementsRaw = formData.get("achievementsRaw") as string;
  const achievementLines = achievementsRaw
    ? achievementsRaw.split("\n").filter(line => line.trim())
    : [];

  const achievements = achievementLines.map(line => {
    const parts = line.split("|").map(p => p.trim());
    return {
      title: parts[0] || "",
      description: parts[1] || "",
      date: parts[2] || null,
    };
  });

  try {
    await prisma.$transaction(async (tx:any) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          name,
          headline,
          email,
          phone,
          location,
          totalExperience,
          bio,
          resumeUrl,
          portfolioUrl,
          githubUrl,
          linkedinUrl,
          twitterUrl,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
          skills,
          languages,
        },
      });

      await tx.employment.deleteMany({ where: { userId } });

      if (experiences.length > 0) {
        await tx.employment.createMany({
          data: experiences.map(exp => ({
            ...exp,
            userId,
          })),
        });
      }

      await tx.education.deleteMany({ where: { userId } });

      if (education.length > 0) {
        await tx.education.createMany({
          data: education.map(edu => ({
            ...edu,
            userId,
          })),
        });
      }

      await tx.accomplishment.deleteMany({ where: { userId } });

      if (achievements.length > 0) {
        await tx.accomplishment.createMany({
          data: achievements.map(ach => ({
            title: ach.title,
            description: ach.description,
            date: ach.date ? new Date(ach.date) : null,
            type: "GENERAL", // ✅ REQUIRED FIELD ADDED
            userId,
          })),
        });
      }
    });

    revalidatePath(`/profile/${userId}`);
    revalidatePath(`/profile/${userId}/edit`);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }

  redirect(`/profile/${userId}`);
}