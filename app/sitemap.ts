import { MetadataRoute } from "next";

const host = "https://www.bitomun.com";
const locales = ["ko", "en"] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

function createLocalizedEntries(
  path: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
): SitemapEntry[] {
  const cleanPath = path === "/" ? "" : path;

  return locales.map((locale) => ({
    url: `${host}/${locale}${cleanPath}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ko: `${host}/ko${cleanPath}`,
        en: `${host}/en${cleanPath}`,
        "x-default": `${host}/ko${cleanPath}`,
      },
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntry[] = [];

  // ========================================
  // 1. 정적 페이지
  // ========================================

  // 홈페이지
  entries.push(...createLocalizedEntries("/", "daily", 1.0));

  // About
  entries.push(...createLocalizedEntries("/about", "monthly", 0.8));

  // Education
  entries.push(...createLocalizedEntries("/education", "weekly", 0.9));

  // Apply 페이지들
  entries.push(...createLocalizedEntries("/apply", "monthly", 0.7));
  entries.push(...createLocalizedEntries("/apply/sponsorship", "monthly", 0.6));
  entries.push(...createLocalizedEntries("/apply/other", "monthly", 0.6));

  // Internship
  entries.push(...createLocalizedEntries("/internship", "weekly", 0.7));

  // Global 메인
  entries.push(...createLocalizedEntries("/global", "weekly", 0.9));

  // Development 메인 페이지들 (리다이렉트지만 인덱싱용으로 포함)
  entries.push(...createLocalizedEntries("/development", "weekly", 0.8));
  entries.push(...createLocalizedEntries("/development/layer1", "weekly", 0.8));
  entries.push(...createLocalizedEntries("/development/layer2", "weekly", 0.8));
  entries.push(
    ...createLocalizedEntries("/education/development", "weekly", 0.8),
  );

  // ========================================
  // 2. Development Layer1 카테고리 (11개)
  // ========================================
  const layer1Categories = [
    "libraries-sdks",
    "apis-payments",
    "l2s-smart-contracts",
    "node-software",
    "node-hardware",
    "explorers-analytics",
    "utilities",
    "software-wallets",
    "hardware-wallets",
    "research",
    "mining",
  ];

  for (const category of layer1Categories) {
    entries.push(
      ...createLocalizedEntries(
        `/development/layer1/${category}`,
        "weekly",
        0.7,
      ),
    );
  }

  // ========================================
  // 3. Development Layer2 카테고리 (7개)
  // ========================================
  const layer2Categories = [
    "libraries-sdks",
    "apis-payments",
    "lsps-enterprise",
    "dashboards-monitoring",
    "routing-liquidity",
    "wallets",
    "research",
  ];

  for (const category of layer2Categories) {
    entries.push(
      ...createLocalizedEntries(
        `/development/layer2/${category}`,
        "weekly",
        0.7,
      ),
    );
  }

  // ========================================
  // 4. Education Development 카테고리 (7개)
  // ========================================
  const educationCategories = [
    "guides-tutorials",
    "notes-docs",
    "books",
    "classes-courses",
    "training-programs",
    "certifications",
    "mining",
  ];

  for (const category of educationCategories) {
    entries.push(
      ...createLocalizedEntries(
        `/education/development/${category}`,
        "weekly",
        0.7,
      ),
    );
  }

  // ========================================
  // 5. Global 대륙 및 국가 페이지
  // ========================================
  const continentsWithCountries: Record<string, string[]> = {
    asia: ["japan", "korea", "taiwan", "indonesia", "india"],
    europe: ["germany", "switzerland", "portugal", "czech", "uk"],
    africa: ["south-africa", "nigeria", "kenya", "ghana", "tanzania"],
    "north-america": ["usa", "canada", "mexico", "el-salvador", "costa-rica"],
    "south-america": ["brazil", "argentina", "colombia", "chile", "venezuela"],
    oceania: ["australia", "new-zealand"],
  };

  for (const [continent, countries] of Object.entries(
    continentsWithCountries,
  )) {
    // 대륙 페이지
    entries.push(
      ...createLocalizedEntries(`/global/${continent}`, "weekly", 0.7),
    );

    // 국가 페이지들
    for (const country of countries) {
      entries.push(
        ...createLocalizedEntries(
          `/global/${continent}/${country}`,
          "weekly",
          0.6,
        ),
      );
    }
  }

  return entries;
}
