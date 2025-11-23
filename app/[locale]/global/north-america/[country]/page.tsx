import { getTranslations, setRequestLocale } from "next-intl/server";

import { LocaleType, NorthAmericaCountry } from "@/types";

import {
  ContinentHeader,
  CountryHeader,
  CountrySidebar,
  ResourceList,
} from "../../_components";
import { categories } from "../../_constants";
import { northAmericaResources } from "../_resources";

type Props = {
  params: Promise<{ locale: LocaleType; country: NorthAmericaCountry }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("globalNorthAmerica.title"),
    description: t("globalNorthAmerica.description"),
  };
}

export async function generateStaticParams() {
  const countries: NorthAmericaCountry[] = [
    "usa",
    "canada",
    "mexico",
    "el-salvador",
    "costa-rica",
  ];
  return countries.map((country) => ({ country }));
}

export default async function NorthAmericaCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("globalNorthAmerica");

  const northAmericaCountries = [
    { label: t("countries.usa"), value: "usa" as const },
    { label: t("countries.canada"), value: "canada" as const },
    { label: t("countries.mexico"), value: "mexico" as const },
    { label: t("countries.el-salvador"), value: "el-salvador" as const },
    { label: t("countries.costa-rica"), value: "costa-rica" as const },
  ];

  const countryData = northAmericaResources[locale][country];

  const categoryLabels = {
    center: t("categories.center"),
    events: t("categories.events"),
    meetups: t("categories.meetups"),
    mining: t("categories.mining"),
    nodes: t("categories.nodes"),
    retail: t("categories.retail"),
    charity: t("categories.charity"),
    lightning: t("categories.lightning"),
  };

  return (
    <div className="relative h-full">
      <ContinentHeader title={t("title")} subtitle="North America Region Resources" />
      <div className="flex">
        <CountrySidebar
          title={t("countriesTitle")}
          countries={northAmericaCountries}
          selectedCountry={country}
          className="border-border sticky top-20 mt-8 hidden self-start border-r px-4 lg:block"
        />
        <section className="relative max-w-7xl flex-1 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="pointer-events-none absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute bottom-1/3 left-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-400/15 via-purple-400/10 to-transparent blur-3xl" />

          <CountryHeader
            countryName={t(`countries.${country}`)}
            countries={northAmericaCountries}
            selectPlaceholder={t("countriesTitle")}
          />

          <ResourceList
            countryData={countryData}
            categories={categories}
            categoryLabels={categoryLabels}
            emptyState={{
              title: t("emptyState.title"),
              description: t("emptyState.description"),
            }}
          />
        </section>
      </div>
    </div>
  );
}
