import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  AsiaCountry,
  AsiaResources,
  LocaleType,
  OrganizationCategory,
} from "@/types";

import { CountrySelect } from "../../_components/country-select";
import { CountrySidebar } from "../../_components/country-sidebar";
import { categories } from "../../_constants";
import { asiaResources } from "../_resources";

type Props = {
  params: Promise<{ locale: LocaleType; country: AsiaCountry }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("globalAsia.title"),
    description: t("globalAsia.description"),
  };
}

export async function generateStaticParams() {
  const countries: AsiaCountry[] = [
    "korea",
    "japan",
    "taiwan",
    "indonesia",
    "india",
  ];
  return countries.map((country) => ({ country }));
}

export default async function AsiaCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("globalAsia");

  const asiaCountries: AsiaCountries = [
    { label: t("countries.korea"), value: "korea" },
    { label: t("countries.japan"), value: "japan" },
    { label: t("countries.taiwan"), value: "taiwan" },
    { label: t("countries.indonesia"), value: "indonesia" },
    { label: t("countries.india"), value: "india" },
  ];

  const countryData = asiaResources[locale][country];

  return (
    <div className="relative h-full">
      {/* Header */}
      <section className="relative hidden overflow-hidden border-b border-gray-200/50 bg-gradient-to-r from-amber-50/50 via-orange-50/30 to-rose-50/50 px-4 py-8 lg:block lg:px-8 lg:py-12 dark:border-gray-700/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-rose-950/20">
        {/* 배경 장식 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl dark:bg-orange-500/10" />
        </div>

        <div className="relative container mx-auto">
          <div className="flex items-center gap-4">
            {/* 아이콘 */}
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/25">
              <svg
                className="size-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl dark:from-amber-400 dark:via-orange-400 dark:to-rose-400">
                {t("title")}
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Asia Region Resources
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex">
        <CountrySidebar
          title={t("countriesTitle")}
          countries={asiaCountries}
          selectedCountry={country}
          className="border-border sticky top-20 mt-8 hidden self-start border-r px-4 lg:block"
        />
        <section className="relative max-w-7xl flex-1 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10">
          {/* 배경 장식 요소 */}
          <div className="pointer-events-none absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute bottom-1/3 left-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-400/15 via-purple-400/10 to-transparent blur-3xl" />

          {/* 헤더 영역 */}
          <div className="my-8 flex items-center justify-between">
            <div className="group relative">
              {/* 장식 라인 */}
              <div className="bg-primary/80 absolute top-1/2 -left-4 h-8 w-1 -translate-y-1/2 rounded-full" />
              <h2 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                {t(`countries.${country}`)}
              </h2>
              {/* 밑줄 장식 */}
              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            </div>
            <div className="lg:hidden">
              <CountrySelect
                countries={asiaCountries}
                placeholder={t("countriesTitle")}
              />
            </div>
          </div>

          {/* 리소스 리스트 */}
          <ResourceList
            countryData={countryData}
            categories={categories}
            t={t}
          />
        </section>
      </div>
    </div>
  );
}

type AsiaCountries = {
  label: string;
  value: AsiaCountry;
}[];

type ResourceListProps = {
  countryData: AsiaResources[AsiaCountry];
  categories: OrganizationCategory[];
  t: Awaited<ReturnType<typeof getTranslations<"globalAsia">>>;
};

function ResourceList({ countryData, categories, t }: ResourceListProps) {
  const hasResources = categories.some(
    (cat) => countryData[cat] && countryData[cat].length > 0,
  );

  if (!hasResources) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-6 dark:from-gray-800 dark:to-gray-700">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{t("emptyState.title")}</h3>
        <p className="max-w-sm">{t("emptyState.description")}</p>
      </div>
    );
  }

  return (
    <div className="mb-12 space-y-16">
      {categories.map((category, index) => {
        const resources = countryData[category];
        if (!resources || resources.length === 0) return null;

        return (
          <div key={category} className="relative">
            {/* 카테고리 헤더 */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/25">
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
                {t(`categories.${category}`)}
              </h3>
            </div>

            {/* 카드 그리드 */}
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {resources.map((resource, resourceIndex) => (
                <li
                  key={resource.name}
                  className="h-full"
                  style={{
                    animationDelay: `${resourceIndex * 100}ms`,
                  }}
                >
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
      className="group relative block h-full"
    >
      {/* 호버시 나타나는 배경 글로우 */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-rose-500/50 opacity-0 blur transition-all duration-500 group-hover:opacity-100 dark:from-amber-400/30 dark:via-orange-400/30 dark:to-rose-400/30" />

      <Card className="relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:border-amber-300 group-hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:group-hover:border-amber-500/50">
        {/* 상단 그라데이션 바 */}
        <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 opacity-80" />

        {/* 배경 글로우 - 다크모드에서 더 잘 보이게 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl dark:bg-amber-400/10" />
          <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl dark:bg-orange-400/10" />
        </div>

        <CardHeader className="relative p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* 로고 */}
            <div className="relative flex-shrink-0">
              {/* 로고 컨테이너 */}
              <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md sm:size-16 dark:border-gray-600 dark:bg-gray-700">
                <Image
                  src={logo}
                  alt={name}
                  className="object-contain"
                  fill={true}
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              {/* 제목 + 아이콘 */}
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <CardTitle className="text-base leading-tight font-semibold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 dark:text-gray-100 dark:group-hover:text-amber-400">
                  {name}
                </CardTitle>
                {/* 화살표 아이콘 */}
                <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:group-hover:border-amber-500 dark:group-hover:bg-amber-500">
                  <ExternalLink className="h-3.5 w-3.5 text-gray-400 transition-all duration-300 group-hover:text-white dark:text-gray-400" />
                </div>
              </div>
              {/* 설명 */}
              <CardDescription className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
