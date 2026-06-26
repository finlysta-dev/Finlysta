import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Finlysta - Building the Future of Finance Careers",
  description:
    "Learn about Finlysta's mission to connect finance students and freshers with verified internships, entry-level jobs, and career resources in India.",
  keywords: [
    "about finlysta",
    "finance career platform",
    "finance internships india",
    "finance jobs for freshers",
    "finance career resources",
  ],
  openGraph: {
    title: "About Finlysta - Building the Future of Finance Careers",
    description:
      "Learn about Finlysta's mission to connect finance students and freshers with verified internships, entry-level jobs, and career resources in India.",
    url: "https://finlysta.com/about",
    images: [
      {
        url: "https://finlysta.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Finlysta - Finance Career Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Finlysta - Building the Future of Finance Careers",
    description:
      "Learn about Finlysta's mission to connect finance students and freshers with verified internships, entry-level jobs, and career resources in India.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}