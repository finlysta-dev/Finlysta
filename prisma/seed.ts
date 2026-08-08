import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add sample opportunities
  await prisma.opportunity.create({
    data: {
      title: "Financial Analyst Intern",
      slug: "financial-analyst-intern",
      company: "Goldman Sachs",
      type: "internship",
      workMode: "onsite",
      location: "Mumbai",
      duration: "3 months",
      salary: "₹25,000/month",
      skills: ["Excel", "Financial Modeling", "SQL"],
      applyLink: "https://goldmansachs.com/careers",
      isVerified: true,
      isTrending: true,
      overview: "Great opportunity for finance students..."
    }
  })

  console.log("Database seeded!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
