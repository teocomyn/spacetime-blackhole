import { SITE_URL, SECTIONS } from "@/lib/constants";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...SECTIONS.map((section) => ({
      url: `${SITE_URL}/#${section.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
