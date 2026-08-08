import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Finance Fundamentals - Learn Core Finance Concepts",
  description:
    "Learn core finance fundamentals — balance sheets, cash flow, budgeting, financial ratios, and capital budgeting — explained simply for finance students and freshers.",
  alternates: { canonical: "https://finlysta.com/learning-hub/finance-fundamentals" },
  openGraph: {
    title: "Finance Fundamentals - Learn Core Finance Concepts | Finlysta",
    description:
      "Learn core finance fundamentals — balance sheets, cash flow, budgeting, financial ratios, and capital budgeting.",
    url: "https://finlysta.com/learning-hub/finance-fundamentals",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Finance Fundamentals - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Fundamentals - Learn Core Finance Concepts | Finlysta",
    description: "Learn core finance fundamentals explained simply for finance students and freshers.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function FinanceFundamentalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
