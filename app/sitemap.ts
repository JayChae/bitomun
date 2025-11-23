import { MetadataRoute } from "next";

const host = "https://www.bitomun.com";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
  alternates: {
    languages: {
      en: string;
      ko: string;
    };
  };
};

function createEntry(
  path: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
): SitemapEntry {
  const cleanPath = path === "/" ? "" : path;
  return {
    url: `${host}${cleanPath}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${host}/en${cleanPath}`,
        ko: `${host}/ko${cleanPath}`,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: SitemapEntry[] = [
    // Home
    createEntry("/", "daily", 1.0),
    // About
    createEntry("/about", "monthly", 0.8),
    // Education
    createEntry("/education", "weekly", 0.9),
    // Apply pages
    createEntry("/apply", "monthly", 0.7),
    createEntry("/apply/sponsorship", "monthly", 0.6),
    createEntry("/apply/other", "monthly", 0.6),
    // Internship
    createEntry("/internship", "weekly", 0.7),
    // Global main page
    createEntry("/global", "weekly", 0.9),
  ];

  // Development pages
  const developmentPages: SitemapEntry[] = [
    // Layer 1 categories
    createEntry("/development/layer1/libraries-sdks", "weekly", 0.8),
    createEntry("/development/layer1/apis-payments", "weekly", 0.8),
    createEntry("/development/layer1/utilities", "weekly", 0.8),
    createEntry("/development/layer1/l2s-smart-contracts", "weekly", 0.8),
    createEntry("/development/layer1/node-software", "weekly", 0.8),
    createEntry("/development/layer1/node-hardware", "weekly", 0.8),
    createEntry("/development/layer1/explorers-analytics", "weekly", 0.8),
    createEntry("/development/layer1/software-wallets", "weekly", 0.8),
    createEntry("/development/layer1/hardware-wallets", "weekly", 0.8),
    createEntry("/development/layer1/research", "weekly", 0.8),
    createEntry("/development/layer1/mining", "weekly", 0.8),
    // Layer 2 categories
    createEntry("/development/layer2/libraries-sdks", "weekly", 0.8),
    createEntry("/development/layer2/apis-payments", "weekly", 0.8),
    createEntry("/development/layer2/lsps-enterprise", "weekly", 0.8),
    createEntry("/development/layer2/dashboards-monitoring", "weekly", 0.8),
    createEntry("/development/layer2/routing-liquidity", "weekly", 0.8),
    createEntry("/development/layer2/wallets", "weekly", 0.8),
    createEntry("/development/layer2/research", "weekly", 0.8),
    // Education development categories
    createEntry("/education/development/guides-tutorials", "weekly", 0.8),
    createEntry("/education/development/notes-docs", "weekly", 0.8),
    createEntry("/education/development/books", "weekly", 0.8),
    createEntry("/education/development/classes-courses", "weekly", 0.8),
    createEntry("/education/development/training-programs", "weekly", 0.8),
    createEntry("/education/development/certifications", "weekly", 0.8),
  ];

  // Global continent pages
  const continents = [
    "asia",
    "europe",
    "africa",
    "north-america",
    "south-america",
    "oceania",
  ];

  // Countries by continent
  const countriesByContinent: Record<string, string[]> = {
    asia: ["japan", "korea", "taiwan", "indonesia", "india"],
    europe: ["germany", "switzerland", "portugal", "czech", "uk"],
    africa: ["south-africa", "nigeria", "kenya", "ghana", "tanzania"],
    "north-america": ["usa", "canada", "mexico", "el-salvador", "costa-rica"],
    "south-america": ["brazil", "argentina", "colombia", "chile", "venezuela"],
    oceania: ["australia", "new-zealand"],
  };

  const globalPages: SitemapEntry[] = [];

  for (const continent of continents) {
    // Add continent page
    globalPages.push(createEntry(`/global/${continent}`, "weekly", 0.7));

    // Add country pages
    const countries = countriesByContinent[continent] || [];
    for (const country of countries) {
      globalPages.push(
        createEntry(`/global/${continent}/${country}`, "weekly", 0.6),
      );
    }
  }

  return [...staticPages, ...developmentPages, ...globalPages];
}
