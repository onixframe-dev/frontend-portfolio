import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/razrabotka-lendinga-belarus`,
    },
    {
      url: `${siteUrl}/sait-vizitka-dlya-biznesa`,
    },
    {
      url: `${siteUrl}/react-frontend-razrabotka`,
    },
    {
      url: `${siteUrl}/nextjs-sait-pod-kluch`,
    },
    {
      url: `${siteUrl}/telegram-zayavki-formy`,
    },
  ];
}
