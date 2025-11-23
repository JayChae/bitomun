import { getTranslations, setRequestLocale } from "next-intl/server";

import IntroSection from "@/components/ui/intro-section";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleType } from "@/types";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("global.title"),
    description: t("global.description"),
  };
}

export default async function GlobalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("global");

  const continents: ContinentData[] = [
    {
      key: "asia",
      href: "/global/asia",
      title: t("continents.asia.sectionTitle"),
      description: t("continents.asia.description"),
      gradient: "from-rose-500/20 via-orange-500/20 to-amber-500/20",
      hoverGradient:
        "group-hover:from-rose-500/40 group-hover:via-orange-500/40 group-hover:to-amber-500/40",
      borderColor: "hover:border-orange-500/50",
    },
    {
      key: "europe",
      href: "/global/europe",
      title: t("continents.europe.sectionTitle"),
      description: t("continents.europe.description"),
      gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
      hoverGradient:
        "group-hover:from-blue-500/40 group-hover:via-indigo-500/40 group-hover:to-violet-500/40",
      borderColor: "hover:border-blue-500/50",
    },
    {
      key: "africa",
      href: "/global/africa",
      title: t("continents.africa.sectionTitle"),
      description: t("continents.africa.description"),
      gradient: "from-amber-500/20 via-yellow-500/20 to-lime-500/20",
      hoverGradient:
        "group-hover:from-amber-500/40 group-hover:via-yellow-500/40 group-hover:to-lime-500/40",
      borderColor: "hover:border-yellow-500/50",
    },
    {
      key: "northAmerica",
      href: "/global/north-america",
      title: t("continents.northAmerica.sectionTitle"),
      description: t("continents.northAmerica.description"),
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      hoverGradient:
        "group-hover:from-emerald-500/40 group-hover:via-teal-500/40 group-hover:to-cyan-500/40",
      borderColor: "hover:border-emerald-500/50",
    },
    {
      key: "southAmerica",
      href: "/global/south-america",
      title: t("continents.southAmerica.sectionTitle"),
      description: t("continents.southAmerica.description"),
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      hoverGradient:
        "group-hover:from-green-500/40 group-hover:via-emerald-500/40 group-hover:to-teal-500/40",
      borderColor: "hover:border-green-500/50",
    },
    {
      key: "oceania",
      href: "/global/oceania",
      title: t("continents.oceania.sectionTitle"),
      description: t("continents.oceania.description"),
      gradient: "from-cyan-500/20 via-sky-500/20 to-blue-500/20",
      hoverGradient:
        "group-hover:from-cyan-500/40 group-hover:via-sky-500/40 group-hover:to-blue-500/40",
      borderColor: "hover:border-cyan-500/50",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <IntroSection>
        <div className="space-y-6">
          <h1 className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            {t("description")}
          </p>
        </div>
      </IntroSection>

      {/* Continents Grid */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {continents.map((continent) => (
              <ContinentCard key={continent.key} continent={continent} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

type ContinentData = {
  key: string;
  href: string;
  title: string;
  description: string;
  gradient: string;
  hoverGradient: string;
  borderColor: string;
};

type ContinentCardProps = {
  continent: ContinentData;
};

function ContinentCard({ continent }: ContinentCardProps) {
  return (
    <Link href={continent.href} className="group">
      <div
        className={cn(
          "border-border bg-card/50 relative h-full min-h-[200px] overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500",
          "hover:scale-[1.02] hover:shadow-xl",
          continent.borderColor,
        )}
      >
        {/* Gradient background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-500",
            continent.gradient,
            continent.hoverGradient,
          )}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-end p-6">
          <h2 className="mb-2 text-xl font-bold transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
            {continent.title}
          </h2>
          <p className="text-muted-foreground line-clamp-2 text-sm transition-opacity duration-300 group-hover:opacity-80">
            {continent.description}
          </p>

          {/* Arrow indicator */}
          <div className="absolute top-6 right-6 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5 blur-xl transition-all duration-500 group-hover:scale-150" />
      </div>
    </Link>
  );
}
