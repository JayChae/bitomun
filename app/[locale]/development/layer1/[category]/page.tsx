import { Bitcoin, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CategorySelect } from "@/components/category-select";
import { CategorySidebar } from "@/components/category-sidebar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { DevResource, Layer1Category, LocaleType } from "@/types";

import { DevNav } from "../../_components/dev-nav";
import { layer1DevResources } from "../_resources";

type Props = {
  params: Promise<{ locale: LocaleType; category: Layer1Category }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("developmentLayer1.title"),
    description: t("developmentLayer1.description"),
  };
}

export default async function Layer1Page({ params }: Props) {
  const { locale, category } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations("developmentLayer1");

  const layer1Categories: Layer1Categories = [
    {
      label: t(categoryTitles["libraries-sdks"]),
      value: "libraries-sdks",
    },
    {
      label: t(categoryTitles["apis-payments"]),
      value: "apis-payments",
    },
    // {
    //   label: t(categoryTitles["l2s-smart-contracts"]),
    //   value: "l2s-smart-contracts",
    // },
    {
      label: t(categoryTitles["node-software"]),
      value: "node-software",
    },
    {
      label: t(categoryTitles["node-hardware"]),
      value: "node-hardware",
    },
    {
      label: t(categoryTitles["explorers-analytics"]),
      value: "explorers-analytics",
    },
    {
      label: t(categoryTitles["utilities"]),
      value: "utilities",
    },
    {
      label: t(categoryTitles["software-wallets"]),
      value: "software-wallets",
    },
    {
      label: t(categoryTitles["hardware-wallets"]),
      value: "hardware-wallets",
    },
    {
      label: t(categoryTitles["mining"]),
      value: "mining",
    },
    {
      label: t(categoryTitles["research"]),
      value: "research",
    },
  ];

  return (
    <div className="relative h-full">
      {/* Header */}
      <section className="border-border relative border-b px-4 py-6 lg:px-8 lg:pt-8 lg:pb-10">
        <div className="container mx-auto">
          <DevNav activeLink="layer1" />
          <div className="hidden items-center gap-4 lg:flex">
            <Bitcoin className="text-primary h-12 w-12" />
            <div>
              <h1 className="from-primary to-primary bg-gradient-to-r via-yellow-400 bg-clip-text text-3xl font-bold text-transparent">
                {t("title")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("description")}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex">
        <CategorySidebar
          title={t("categories.title")}
          field="layer1"
          categories={layer1Categories}
          selectedCategory={category}
          className="border-border sticky top-20 mt-8 hidden self-start border-r px-4 lg:block"
        />
        <section className="max-w-7xl flex-1 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="my-8 flex items-center justify-between">
            <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">
              {t(categoryTitles[category])}
            </h2>
            <div className="lg:hidden">
              <CategorySelect
                field="layer1"
                categories={layer1Categories}
                placeholder={t("categories.title")}
              />
            </div>
          </div>
          <ResourceList
            resources={layer1DevResources[locale][category]}
            category={category}
            t={t}
          />
        </section>
      </div>
    </div>
  );
}

type ResourceListProps = {
  resources?: DevResource[];
  category: Layer1Category;
  t: (key: string) => string;
};

function ResourceList({ resources, category, t }: ResourceListProps) {
  if (!resources || resources.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-16 text-center">
        <h3 className="mb-2 text-xl font-semibold">{t("emptyState.title")}</h3>
        <p>{t("emptyState.description")}</p>
      </div>
    );
  }

  // Check if this category has subcategories
  const hasSubcategories =
    category === "software-wallets" || category === "hardware-wallets";

  if (!hasSubcategories) {
    return (
      <ul className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {resources.map((resource) => (
          <li key={resource.name} className="h-full">
            <ResourceCard
              href={resource.url}
              logo={resource.logo}
              name={resource.name}
              description={resource.description}
            />
          </li>
        ))}
      </ul>
    );
  }

  // Group resources by subcategory
  const groupedResources = resources.reduce(
    (acc, resource) => {
      const subcategory = resource.subcategory || "other";
      if (!acc[subcategory]) {
        acc[subcategory] = [];
      }
      acc[subcategory].push(resource);
      return acc;
    },
    {} as Record<string, DevResource[]>,
  );

  // Define subcategory order
  const subcategoryOrder =
    category === "software-wallets"
      ? ["onchain", "lightning"]
      : ["airgap", "connected"];

  return (
    <div className="mb-8 space-y-12">
      {subcategoryOrder.map((subcategoryKey) => {
        const subcategoryResources = groupedResources[subcategoryKey];
        if (!subcategoryResources || subcategoryResources.length === 0)
          return null;

        return (
          <div key={subcategoryKey}>
            <h3 className="mb-6 text-lg font-semibold sm:text-xl">
              {t(`subcategories.${subcategoryKey}`)}
            </h3>
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {subcategoryResources.map((resource) => (
                <li key={resource.name} className="h-full">
                  <ResourceCard
                    href={resource.url}
                    logo={resource.logo}
                    name={resource.name}
                    description={resource.description}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

type ResourceCardProps = {
  href: string;
  logo: string;
  name: string;
  description: string;
};
function ResourceCard({ href, logo, name, description }: ResourceCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="bg-card border-border hover:border-primary/50 h-full transition-all group-hover:shadow-lg">
        <CardHeader>
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <div className="relative flex size-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg sm:size-16 lg:size-20">
              <Image
                src={logo}
                alt={name}
                className="object-contain"
                fill={true}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="group-hover:text-primary transition-colors">
                  {name}
                </CardTitle>
                <ExternalLink className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
              </div>
              <CardDescription className="mt-2 line-clamp-3">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

const categoryTitles: Record<Layer1Category, string> = {
  "libraries-sdks": "categories.librariesSdks",
  "apis-payments": "categories.apisPayments",
  "l2s-smart-contracts": "categories.l2sSmartContracts",
  "node-software": "categories.nodeSoftware",
  "node-hardware": "categories.nodeHardware",
  "explorers-analytics": "categories.explorersAnalytics",
  utilities: "categories.utilities",
  "software-wallets": "categories.softwareWallets",
  "hardware-wallets": "categories.hardwareWallets",
  research: "categories.research",
  mining: "categories.mining",
};

type Layer1Categories = {
  label: string;
  value: Layer1Category;
}[];
