import { NextResponse } from 'next/server';

// This is where your actual data lives
// You can replace this with your database connection
export async function GET() {
  // This data should come from your PostgreSQL database
  // For now, it's here as an example
  const opportunities = [
    {
      id: "cmo5puzqg0000tbyi319uow9f",
      slug: "financial-analyst-intern",
      title: "Financial Analyst Intern",
      company: "Goldman Sachs",
      companyLogo: null,
      aboutCompany: "Goldman Sachs is a leading global investment banking, securities and investment management firm.",
      type: "internship",
      workMode: "onsite",
      location: "Mumbai",
      experience: null,
      duration: "3 months",
      salary: "25,000/month",
      skills: ["Excel", "Financial Modeling", "SQL", "Power BI"],
      overview: "Great opportunity for finance students to gain hands-on experience in investment banking.",
      responsibilities: "Work as a financial analyst",
      qualifications: "BCA, BCOM, MBA Finance",
      benefits: "PPO, Certificate, Letter of Recommendation",
      applyLink: "https://goldmansachs.com/careers",
      isNew: true,
      isVerified: true,
      isTrending: true,
      isActivelyHiring: true,
      postedAt: "2026-04-19T12:02:33.446Z",
      views: 0,
      applyClicks: 0
    }
  ];
  
  return NextResponse.json(opportunities);
}
