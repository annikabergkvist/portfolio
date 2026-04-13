import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { PROJECT_SLUGS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticPaths: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const workPaths: MetadataRoute.Sitemap = PROJECT_SLUGS.map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPaths, ...workPaths];
}
