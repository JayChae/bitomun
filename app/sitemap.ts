import { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";

const host = "https://www.bitomun.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: host,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: host + (await getPathname({ locale: "en", href: "/" })),
          ko: host + (await getPathname({ locale: "ko", href: "/" })),
        },
      },
    },
  ];
}
