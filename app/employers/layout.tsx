import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hire Finance Talent - Post Jobs & Internships",
  description:
    "Hire verified finance freshers and interns on Finlysta. Post jobs and internships to reach thousands of finance students and early-career candidates across India.",
  keywords: [
    "hire finance freshers",
    "post finance job",
    "hire finance interns india",
    "finance recruitment platform",
  ],
  alternates: { canonical: "https://finlysta.com/employers" },
  openGraph: {
    title: "Hire Finance Talent - Post Jobs & Internships | Finlysta",
    description:
      "Hire verified finance freshers and interns on Finlysta. Reach thousands of finance students across India.",
    url: "https://finlysta.com/employers",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Hire Finance Talent - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Finance Talent - Post Jobs & Internships | Finlysta",
    description: "Hire verified finance freshers and interns on Finlysta.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function EmployersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
