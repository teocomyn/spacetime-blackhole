import type { MetadataRoute } from "next";
import { PAGES, type PageKey } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (Object.keys(PAGES) as PageKey[]).flatMap((key) => {
    const page = PAGES[key];
    const languages = { fr: absoluteUrl(page.path.fr), en: absoluteUrl(page.path.en) };
    return (["fr", "en"] as const).map((locale) => ({
      url: absoluteUrl(page.path[locale]),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : page.kind === "topic" ? 0.9 : 0.7,
      alternates: { languages },
    }));
  });
}
