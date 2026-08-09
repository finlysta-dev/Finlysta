import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: "https://finlysta.com/sitemap.xml",
  };
}