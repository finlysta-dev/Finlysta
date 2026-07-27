import type { Metadata } from "next";
import Script from "next/script";
import HomePageContent from "./HomePageContent";

export const metadata: Metadata = {
  metadataBase: new URL("https://finlysta.com"),
  title: "Finance Jobs & Internships for Freshers in India",
  description:
    "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
  keywords: [
    "finance jobs India",
    "entry level finance jobs",
    "finance internships India",
    "financial analyst jobs freshers",
    "accounting jobs India",
    "finance careers freshers",
    "finance internships",
    "finance jobs freshers India",
  ],
  alternates: { canonical: "https://finlysta.com" },
  openGraph: {
    title: "Finance Jobs & Internships for Freshers in India | Finlysta",
    description:
      "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
    url: "https://finlysta.com",
    siteName: "Finlysta",
    images: [{ url: "/Finlysta.png", width: 1200, height: 630, alt: "Finlysta – Finance Jobs & Internships for Freshers" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Jobs & Internships for Freshers in India | Finlysta",
    description:
      "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
    images: ["/Finlysta.png"],
    site: "@Finlysta",
    creator: "@Finlysta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// ============================================
// JSON-LD SCHEMAS (Moved from client component)
// ============================================
const popularRoles = [
  { name: "Financial Analyst" },
  { name: "Investment Banking" },
  { name: "Credit Analyst" },
  { name: "Risk Analyst" },
  { name: "Article Trainee" },
  { name: "Article Assistant" },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Finlysta",
  url: "https://finlysta.com",
  logo: "https://finlysta.com/Finlysta.png",
  description: "The job board built exclusively for entry-level financial roles and internships in India.",
  sameAs: [
    "https://www.linkedin.com/company/finlysta",
    "https://twitter.com/Finlysta",
    "https://instagram.com/finlysta.in",
    "https://facebook.com/finlysta",
    "https://youtube.com/@finlysta",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@finlysta.com",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Finance Jobs & Internships for Freshers in India | Finlysta",
  description: "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
  url: "https://finlysta.com",
  about: {
    "@type": "Thing",
    name: "Entry-Level Finance Careers in India",
  },
  audience: {
    "@type": "Audience",
    name: "Finance students and fresh graduates in India",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Finlysta",
    url: "https://finlysta.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Finlysta",
  url: "https://finlysta.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://finlysta.com/jobs?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://finlysta.com/",
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Popular Entry-Level Finance Roles",
  description: "Most popular entry-level finance roles for freshers in India",
  itemListElement: popularRoles.map((role, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: role.name,
    url: `https://finlysta.com/jobs?search=${encodeURIComponent(role.name)}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Finlysta different from traditional job portals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike traditional portals, Finlysta focuses only on entry-level finance roles. Every listing is manually reviewed — no ghost jobs, no spam, no irrelevant senior positions."
      }
    },
    {
      "@type": "Question",
      name: "Are the jobs on Finlysta verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every job and internship listed on Finlysta is manually reviewed to help students avoid fake listings."
      }
    },
    {
      "@type": "Question",
      name: "What kind of finance jobs are available on Finlysta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finlysta features entry-level finance roles including Finance Executive, Finance Associate, Accounts Executive, MIS Executive, Audit Associate, Tax Associate, and Accounting roles."
      }
    },
    {
      "@type": "Question",
      name: "Who can use Finlysta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finlysta is designed for finance students, graduates, and career-switchers looking for entry-level positions."
      }
    },
    {
      "@type": "Question",
      name: "Can freshers apply for jobs on Finlysta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Finlysta is built specifically for students, graduates, and first-time job seekers."
      }
    },
    {
      "@type": "Question",
      name: "Is Finlysta really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 100% free for job seekers. Always."
      }
    }
  ]
};

const allSchemas = [
  organizationSchema,
  webpageSchema,
  websiteSchema,
  breadcrumbSchema,
  itemListSchema,
  faqSchema,
];

export default function Page() {
  return (
    <>
      {/* JSON-LD structured data — rendered server-side */}
      {allSchemas.map((schema, index) => (
        <Script
          key={`schema-${index}`}
          id={`schema-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      <HomePageContent />
    </>
  );
}