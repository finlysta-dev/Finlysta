// app/layout.js

export const metadata = {
  title: "Finlysta – Verified Internships",
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
              "name": "Finlysta",
              "url": "https://tryFinlysta.in",
              "logo": "https://www.tryFinlysta.in/Finlysta.png",
              "sameAs": [
                "https://www.instagram.com/Finlysta.in/",
                "https://www.linkedin.com/company/join-Finlysta/",
                "https://x.com/Finlysta83656"
              ]
            }),
          }}
        />
        <link rel="icon" href="https://www.tryFinlysta.in/Finlysta.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
