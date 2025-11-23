import { getTranslations, setRequestLocale } from "next-intl/server";

import { LocaleType, SouthAmericaCountry } from "@/types";

import {
  ContinentHeader,
  CountryHeader,
  CountrySidebar,
  ResourceList,
} from "../../_components";
import { categories, continentColors } from "../../_constants";
import { southAmericaResources } from "../_resources";

type Props = {
  params: Promise<{ locale: LocaleType; country: SouthAmericaCountry }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("globalSouthAmerica.title"),
    description: t("globalSouthAmerica.description"),
  };
}

export async function generateStaticParams() {
  const countries: SouthAmericaCountry[] = [
    "brazil",
    "argentina",
    "colombia",
    "chile",
    "venezuela",
  ];
  return countries.map((country) => ({ country }));
}

export default async function SouthAmericaCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("globalSouthAmerica");
  const common = await getTranslations("globalCommon");

  const southAmericaCountries = [
    { label: t("countries.brazil"), value: "brazil" as const },
    { label: t("countries.argentina"), value: "argentina" as const },
    { label: t("countries.colombia"), value: "colombia" as const },
    { label: t("countries.chile"), value: "chile" as const },
    { label: t("countries.venezuela"), value: "venezuela" as const },
  ];

  const countryData = southAmericaResources[locale][country];

  const categoryLabels = {
    center: common("categories.center"),
    events: common("categories.events"),
    meetups: common("categories.meetups"),
    mining: common("categories.mining"),
    nodes: common("categories.nodes"),
    retail: common("categories.retail"),
    charity: common("categories.charity"),
    lightning: common("categories.lightning"),
  };

  const theme = continentColors.southAmerica;

  return (
    <div className="relative h-full">
      <ContinentHeader title={t("title")} subtitle="South America Region Resources" theme={theme} />
      <div className="flex">
        <CountrySidebar
          title={common("countriesTitle")}
          countries={southAmericaCountries}
          selectedCountry={country}
          className="border-border sticky top-20 mt-8 hidden self-start border-r px-4 lg:block"
          theme={theme}
        />
        <section className="relative max-w-7xl flex-1 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10">
          <div className={`pointer-events-none absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br ${theme.bgGradient} blur-3xl`} />
          <div className={`pointer-events-none absolute bottom-1/3 left-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr ${theme.bgSecondary} blur-3xl`} />

          <CountryHeader
            countryName={t(`countries.${country}`)}
            countries={southAmericaCountries}
            selectPlaceholder={common("countriesTitle")}
            theme={theme}
          />

          <ResourceList
            countryData={countryData}
            categories={categories}
            categoryLabels={categoryLabels}
            emptyState={{
              title: common("emptyState.title"),
              description: common("emptyState.description"),
            }}
            comingSoonText={common("comingSoon")}
            theme={theme}
          />
        </section>
      </div>
    </div>
  );
}
