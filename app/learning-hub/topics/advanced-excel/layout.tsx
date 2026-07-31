import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Advanced Excel for Finance - Topics & Tutorials",
  description:
    "Master Excel for finance roles — VLOOKUP, formulas, interface navigation, and more advanced Excel topics for finance students and freshers.",
  alternates: { canonical: "https://finlysta.com/learning-hub/topics/advanced-excel" },
  openGraph: {
    title: "Advanced Excel for Finance - Topics & Tutorials | Finlysta",
    description: "Master Excel for finance roles — VLOOKUP, formulas, interface navigation, and more.",
    url: "https://finlysta.com/learning-hub/topics/advanced-excel",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Advanced Excel for Finance - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Excel for Finance - Topics & Tutorials | Finlysta",
    description: "Master Excel for finance roles with these tutorials.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function AdvancedExcelTopicsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
