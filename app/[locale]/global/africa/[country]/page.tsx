import { getTranslations, setRequestLocale } from "next-intl/server";

import { AfricaCountry, LocaleType } from "@/types";

import {
  ContinentHeader,
  CountryHeader,
  CountrySidebar,
  ResourceList,
} from "../../_components";
import { categories } from "../../_constants";
import { africaResources } from "../_resources";

type Props = {
  params: Promise<{ locale: LocaleType; country: AfricaCountry }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("globalAfrica.title"),
    description: t("globalAfrica.description"),
  };
}

export async function generateStaticParams() {
  const countries: AfricaCountry[] = [
    "south-africa",
    "nigeria",
    "kenya",
    "ghana",
    "tanzania",
  ];
  return countries.map((country) => ({ country }));
}

export default async function AfricaCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("globalAfrica");

  const africaCountries = [
    { label: t("countries.south-africa"), value: "south-africa" as const },
    { label: t("countries.nigeria"), value: "nigeria" as const },
    { label: t("countries.kenya"), value: "kenya" as const },
    { label: t("countries.ghana"), value: "ghana" as const },
    { label: t("countries.tanzania"), value: "tanzania" as const },
  ];

  const countryData = africaResources[locale][country];

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
      <ContinentHeader title={t("title")} subtitle="Africa Region Resources" />
      <div className="flex">
        <CountrySidebar
          title={t("countriesTitle")}
          countries={africaCountries}
          selectedCountry={country}
          className="border-border sticky top-20 mt-8 hidden self-start border-r px-4 lg:block"
        />
        <section className="relative max-w-7xl flex-1 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="pointer-events-none absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute bottom-1/3 left-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-400/15 via-purple-400/10 to-transparent blur-3xl" />

          <CountryHeader
            countryName={t(`countries.${country}`)}
            countries={africaCountries}
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
