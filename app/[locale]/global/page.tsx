import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import IntroSection, {
  IntroDescription,
  IntroTitle,
} from "@/components/ui/intro-section";
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
      image: "/icons/asia.svg",
      imageScale: "scale-125 group-hover:scale-150",
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
      image: "/icons/europe.svg",
      imageScale: "scale-125 group-hover:scale-150",
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
      image: "/icons/africa.svg",
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
      image: "/icons/north_america.svg",
      imageScale: "scale-125 group-hover:scale-150",
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
      image: "/icons/south_america.svg",
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
      image: "/icons/oceania.svg",
      imageScale: "scale-125 group-hover:scale-150",
    },
  ];

  return (
    <div className="flex min-h-[80dvh] flex-col justify-center md:min-h-[84dvh] lg:min-h-[87dvh]">
      <IntroSection>
        <div className="space-y-6">
          <IntroTitle>{t("title")}</IntroTitle>
          <IntroDescription>{t("description")}</IntroDescription>
        </div>
      </IntroSection>

      {/* Continents Grid */}
      <section className="flex-1 p-4 sm:px-6 lg:px-8">
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
  image: string;
  imageScale?: string;
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

        {/* Continent Image - Left Side */}
        <div
          className={cn(
            "absolute top-0 right-0 left-10 h-full w-4/5 opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80",
            continent.imageScale,
          )}
        >
          <Image
            src={continent.image}
            alt={continent.title}
            fill
            className="object-contain object-center"
          />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6">
          <h2 className="text-xl font-bold transition-transform duration-300 md:text-2xl">
            {continent.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
