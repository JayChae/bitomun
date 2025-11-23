import { getTranslations, setRequestLocale } from "next-intl/server";

import { EuropeCountry, LocaleType } from "@/types";

import {
  ContinentHeader,
  CountryHeader,
  CountrySidebar,
  ResourceList,
} from "../../_components";
import { categories, continentColors } from "../../_constants";
import { europeResources } from "../_resources";

type Props = {
  params: Promise<{ locale: LocaleType; country: EuropeCountry }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("globalEurope.title"),
    description: t("globalEurope.description"),
  };
}

export async function generateStaticParams() {
  const countries: EuropeCountry[] = [
    "germany",
    "switzerland",
    "portugal",
    "czech",
    "uk",
  ];
  return countries.map((country) => ({ country }));
}

export default async function EuropeCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("globalEurope");

  const europeCountries = [
    { label: t("countries.germany"), value: "germany" as const },
    { label: t("countries.switzerland"), value: "switzerland" as const },
    { label: t("countries.portugal"), value: "portugal" as const },
    { label: t("countries.czech"), value: "czech" as const },
    { label: t("countries.uk"), value: "uk" as const },
  ];

  const countryData = europeResources[locale][country];

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

  const theme = continentColors.europe;

  return (
    <div className="relative h-full">
      <ContinentHeader title={t("title")} subtitle="Europe Region Resources" theme={theme} />
      <div className="flex">
        <CountrySidebar
          title={t("countriesTitle")}
          countries={europeCountries}
          selectedCountry={country}
          className="border-border sticky top-20 mt-8 hidden self-start border-r px-4 lg:block"
          theme={theme}
        />
        <section className="relative max-w-7xl flex-1 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10">
          {/* 배경 장식 요소 */}
          <div className={`pointer-events-none absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br ${theme.bgGradient} blur-3xl`} />
          <div className={`pointer-events-none absolute bottom-1/3 left-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr ${theme.bgSecondary} blur-3xl`} />

          <CountryHeader
            countryName={t(`countries.${country}`)}
            countries={europeCountries}
            selectPlaceholder={t("countriesTitle")}
            theme={theme}
          />

          <ResourceList
            countryData={countryData}
            categories={categories}
            categoryLabels={categoryLabels}
            emptyState={{
              title: t("emptyState.title"),
              description: t("emptyState.description"),
            }}
            theme={theme}
          />
        </section>
      </div>
    </div>
  );
}
