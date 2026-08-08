import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://finlysta.com"),
  title: {
    default: "Finlysta | Excel Practice & Interview Preparation",
    template: "%s | Finlysta",
  },
  description:
    "Practice Excel, finance and analytical skills through realistic challenges, assessments and interview questions designed for students, freshers and entry-level professionals.",
  keywords: [
    "Excel practice",
    "Excel interview questions",
    "Excel assessment test",
    "Advanced Excel practice",
    "Excel interview questions for freshers",
    "financial analyst Excel",
    "finance interview preparation",
    "Excel practical test",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Finlysta | Practice Skills. Get Interview Ready.",
    description:
      "Practice Excel, finance and analytical skills through realistic challenges and interview preparation.",
    url: "https://finlysta.com",
    siteName: "Finlysta",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}