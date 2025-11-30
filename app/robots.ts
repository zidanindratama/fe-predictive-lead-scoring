import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smartbank.ai";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/auth/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
