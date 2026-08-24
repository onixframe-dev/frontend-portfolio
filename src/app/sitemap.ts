import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/brief`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/razrabotka-lendinga-belarus`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sait-vizitka-dlya-biznesa`,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/react-frontend-razrabotka`,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/nextjs-sait-pod-kluch`,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/telegram-zayavki-formy`,
      changeFrequency: "monthly",
      priority: 0.78,
    },
  ];
}
