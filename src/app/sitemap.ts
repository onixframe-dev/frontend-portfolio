import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/brief`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/razrabotka-lendinga-belarus`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sait-vizitka-dlya-biznesa`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/react-frontend-razrabotka`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/nextjs-sait-pod-kluch`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/telegram-zayavki-formy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
  ];
}
