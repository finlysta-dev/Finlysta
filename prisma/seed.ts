import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Sample Internship 1: Frontend Developer Intern at Razorpay
  await prisma.internship.upsert({
    where: { id: "razorpay-frontend-1" },
    update: {},
    create: {
      id: "razorpay-frontend-1",
      title: "Frontend Developer Intern",
      company: "Razorpay",
      companyLogo: "https://media.glassdoor.com/sqll/1823510/razorpay-squareLogo-1647314500432.png",
      companyWebsite: "https://razorpay.com",
      aboutCompany: "Razorpay is India's leading fintech company that simplifies payments for businesses. We're building the future of digital payments.",
      location: "Bangalore",
      category: "Software Development",
      workMode: "On-site",
      internshipType: "Full-time",
      duration: "6 months",
      description: "We are looking for a passionate Frontend Developer Intern to join our team. You will work on building beautiful and responsive user interfaces using React.js. You'll collaborate with designers and backend engineers to create seamless user experiences for millions of users.\n\nResponsibilities:\n- Build reusable React components\n- Implement responsive designs\n- Optimize application performance\n- Write clean, maintainable code\n- Participate in code reviews\n\nRequirements:\n- Strong knowledge of JavaScript/TypeScript\n- Experience with React.js\n- Understanding of HTML/CSS\n- Basic knowledge of Git\n- Good problem-solving skills",
      applyLink: "https://razorpay.com/careers/internships",
      skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Git"],
      perks: ["Free meals", "Learning budget", "Flexible hours", "PPO opportunity"],
      paid: true,
      stipendAmount: 25000,  // ✅ Fixed: Changed from "25000" to 25000 (number)
      isTrending: true,
      verified: true,
      published: true,
      createdAt: new Date(),
    },
  });

  // Sample Internship 2: Data Analyst Intern at Swiggy
  await prisma.internship.upsert({
    where: { id: "swiggy-data-analyst-1" },
    update: {},
    create: {
      id: "swiggy-data-analyst-1",
      title: "Data Analyst Intern",
      company: "Swiggy",
      companyLogo: "https://media.glassdoor.com/sqll/1133056/swiggy-squareLogo-1620804056253.png",
      companyWebsite: "https://swiggy.com",
      aboutCompany: "Swiggy is India's largest food delivery platform. We use data to make millions of deliveries faster and more efficient every day.",
      location: "Remote",
      category: "Data Science",
      workMode: "Remote",
      internshipType: "Full-time",
      duration: "4 months",
      description: "Join our data science team to analyze food delivery data, customer behavior patterns, and help optimize delivery times. You'll work with large datasets and derive actionable insights.\n\nResponsibilities:\n- Analyze large datasets using SQL and Python\n- Create dashboards and visualizations using Tableau/PowerBI\n- Identify trends and patterns in customer behavior\n- Collaborate with business teams to provide data-driven recommendations\n- Work on A/B testing analysis\n\nRequirements:\n- Strong SQL skills\n- Python programming (Pandas, NumPy)\n- Basic understanding of statistics\n- Data visualization experience\n- Good communication skills",
      applyLink: "https://swiggy.com/careers/internships",
      skills: ["SQL", "Python", "Excel", "Tableau", "Statistics"],
      perks: ["Food coupons", "Flexible hours", "Work from home", "Learning resources"],
      paid: true,
      stipendAmount: 20000,  // ✅ Fixed: Changed from "20000" to 20000 (number)
      isTrending: true,
      verified: true,
      published: true,
      createdAt: new Date(),
    },
  });

  // Sample Internship 3: UI/UX Design Intern at Zomato
  await prisma.internship.upsert({
    where: { id: "zomato-design-1" },
    update: {},
    create: {
      id: "zomato-design-1",
      title: "UI/UX Design Intern",
      company: "Zomato",
      companyLogo: "https://media.glassdoor.com/sqll/1088077/zomato-squareLogo-1620398261803.png",
      companyWebsite: "https://zomato.com",
      aboutCompany: "Zomato is a global food tech company connecting people with the best restaurants and food delivery experiences.",
      location: "Gurgaon",
      category: "Design",
      workMode: "On-site",
      internshipType: "Full-time",
      duration: "3 months",
      description: "We're looking for a creative UI/UX Design Intern to join our product design team. You'll work on designing beautiful interfaces for millions of users.\n\nResponsibilities:\n- Create wireframes, mockups, and prototypes\n- Conduct user research and usability testing\n- Collaborate with product managers and developers\n- Design intuitive user interfaces\n- Maintain design systems\n\nRequirements:\n- Proficiency in Figma/Sketch/Adobe XD\n- Understanding of design principles\n- Portfolio showcasing your work\n- Good communication skills\n- Attention to detail",
      applyLink: "https://zomato.com/careers/internships",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Adobe XD"],
      perks: ["Free meals", "Creative freedom", "Mentorship", "Certificate"],
      paid: true,
      stipendAmount: 18000,  // ✅ Fixed: Changed from "18000" to 18000 (number)
      isTrending: true,
      verified: true,
      published: true,
      createdAt: new Date(),
    },
  });

  // Sample Internship 4: Backend Developer Intern at Google
  await prisma.internship.upsert({
    where: { id: "google-backend-1" },
    update: {},
    create: {
      id: "google-backend-1",
      title: "Backend Developer Intern",
      company: "Google",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
      companyWebsite: "https://google.com",
      aboutCompany: "Google is a global technology company focused on improving the ways people connect with information.",
      location: "Bangalore",
      category: "Software Development",
      workMode: "Hybrid",
      internshipType: "Full-time",
      duration: "6 months",
      description: "Join Google's engineering team to build scalable backend systems. Work on cutting-edge technology that impacts millions of users.\n\nResponsibilities:\n- Design and implement scalable APIs\n- Optimize database queries\n- Write clean, maintainable code\n- Participate in code reviews\n- Collaborate with cross-functional teams\n\nRequirements:\n- Strong Java/Python knowledge\n- Understanding of data structures and algorithms\n- Basic knowledge of databases\n- Problem-solving skills\n- Good communication skills",
      applyLink: "https://careers.google.com/internships",
      skills: ["Java", "Python", "SQL", "System Design", "Algorithms"],
      perks: ["Competitive stipend", "Housing", "Mentorship", "Networking events", "Google swag"],
      paid: true,
      stipendAmount: 50000,  // ✅ Fixed: Changed from "50000" to 50000 (number)
      isTrending: true,
      verified: true,
      published: true,
      createdAt: new Date(),
    },
  });

  // Sample Internship 5: Marketing Intern at Amazon
  await prisma.internship.upsert({
    where: { id: "amazon-marketing-1" },
    update: {},
    create: {
      id: "amazon-marketing-1",
      title: "Marketing Intern",
      company: "Amazon",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
      companyWebsite: "https://amazon.com",
      aboutCompany: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
      location: "Hyderabad",
      category: "Marketing",
      workMode: "On-site",
      internshipType: "Full-time",
      duration: "4 months",
      description: "Join Amazon's marketing team to drive customer engagement and brand awareness. Work on exciting marketing campaigns.\n\nResponsibilities:\n- Assist in marketing campaigns\n- Analyze marketing data\n- Create content for social media\n- Coordinate with cross-functional teams\n- Track campaign performance\n\nRequirements:\n- Strong communication skills\n- Basic knowledge of digital marketing\n- Analytical mindset\n- Creative thinking\n- Proficiency in MS Office",
      applyLink: "https://amazon.jobs/internships",
      skills: ["Digital Marketing", "Social Media", "Content Writing", "Analytics", "SEO"],
      perks: ["Amazon discounts", "Flexible hours", "Learning opportunities", "Networking"],
      paid: true,
      stipendAmount: 22000,  // ✅ Fixed: Changed from "22000" to 22000 (number)
      isTrending: false,
      verified: true,
      published: true,
      createdAt: new Date(),
    },
  });

  // Sample Internship 6: Unpaid Internship - Content Writer
  await prisma.internship.upsert({
    where: { id: "content-writer-1" },
    update: {},
    create: {
      id: "content-writer-1",
      title: "Content Writer Intern",
      company: "Content Studio",
      companyLogo: "",
      companyWebsite: "https://example.com",
      aboutCompany: "Content Studio is a content marketing agency helping brands tell their stories.",
      location: "Remote",
      category: "Content Writing",
      workMode: "Remote",
      internshipType: "Part-time",
      duration: "3 months",
      description: "Looking for creative writers to join our content team. Write blogs, articles, and social media content for various clients.\n\nResponsibilities:\n- Research and write engaging content\n- Optimize content for SEO\n- Edit and proofread articles\n- Manage content calendar\n- Collaborate with design team\n\nRequirements:\n- Excellent writing skills\n- Basic SEO knowledge\n- Research skills\n- Attention to detail\n- Self-motivated",
      applyLink: "https://example.com/apply",
      skills: ["Content Writing", "SEO", "Research", "Editing", "Blog Writing"],
      perks: ["Certificate", "Flexible hours", "Letter of recommendation", "Portfolio building"],
      paid: false,
      stipendAmount: null,  // ✅ Fixed: Changed from "" to null (number can be null)
      isTrending: false,
      verified: false,
      published: true,
      createdAt: new Date(),
    },
  });

  console.log("✅ Sample internships added successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });