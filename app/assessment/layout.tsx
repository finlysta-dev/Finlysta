import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Excel Assessment Test for Freshers | Finlysta",
  description:
    "Take a free Excel assessment test covering formulas, lookup functions, Pivot Tables, Power Query, data cleaning and analysis. Test your Excel skills and find areas to improve.",
  keywords: [
    "Excel assessment test",
    "Excel test for freshers",
    "Excel skills assessment",
    "Excel interview test",
    "Excel assessment for jobs",
    "Excel practical test",
    "Excel interview questions",
    "Advanced Excel test",
  ],
  alternates: {
    canonical: "/assessment",
  },
  openGraph: {
    title: "Free Excel Assessment Test for Freshers | Finlysta",
    description:
      "Test your Excel skills with a free practical assessment covering formulas, lookup functions, Pivot Tables, Power Query and data analysis.",
    url: "/assessment",
    siteName: "Finlysta",
    type: "website",
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}