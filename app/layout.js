// app/layout.js

export const metadata = {
  title: "Internify – Verified Internships",
  description: "Find real, verified internship opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Internify",
              "url": "https://tryinternify.in",
              "logo": "https://www.tryinternify.in/Internify.png",
              "sameAs": [
                "https://www.instagram.com/internify.in/",
                "https://www.linkedin.com/company/join-internify/",
                "https://x.com/internify83656"
              ]
            }),
          }}
        />
        <link rel="icon" href="https://www.tryinternify.in/Internify.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}