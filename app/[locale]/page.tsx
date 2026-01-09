import {
  ArrowRight,
  Bitcoin,
  Mail,
  Monitor,
  School,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import Stack from "@/components/card-rotate";
import SubscribeModal from "@/components/forms/subscribe-modal";
import BackgroundDecoration from "@/components/ui/background-decoration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logo";
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
    title: t("home.title"),
    description: t("home.description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations("landing");
  const tSubscribe = await getTranslations("subscribe");
  return (
    <div className="relative">
      <Hero
        description={t("hero.description")}
        button1={t("hero.button1")}
        subscribeButton={tSubscribe("button")}
      />

      {/* Development Resources Section */}
      <Section
        title={t("development.title")}
        description={t("development.description")}
        className=""
        layoutClassName=""
      >
        <ul className="flex flex-wrap justify-center gap-6">
          {DEV_RESOURCES.map((resource, index) => {
            const Icon = resource.icon;
            const isBitcoin = index === 0;
            return (
              <li key={resource.id}>
                <Link href={resource.link} locale={locale}>
                  <div
                    className={cn(
                      "group bg-card text-card-foreground relative w-full max-w-xs cursor-pointer overflow-hidden rounded-3xl border-2 p-8 text-center transition-all hover:scale-105 sm:max-w-sm sm:p-12",
                      isBitcoin
                        ? "hover:border-orange-500/50"
                        : "hover:border-yellow-500/50",
                    )}
                  >
                    {/* Content */}
                    <div className="relative space-y-4">
                      <div
                        className={cn(
                          "mx-auto inline-flex rounded-2xl p-6 transition-colors",
                          isBitcoin
                            ? "bg-orange-500/20 group-hover:bg-orange-500/30"
                            : "bg-yellow-500/20 group-hover:bg-yellow-500/30",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-12 sm:size-14",
                            isBitcoin ? "text-orange-500" : "text-yellow-600",
                          )}
                        />
                      </div>
                      <h3 className="text-xl font-bold sm:text-2xl">
                        {t(resource.title)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                        {t(resource.description)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex justify-center">
          <ExploreAllButton href="/development" text={t("exploreAll")} />
        </div>
      </Section>

      {/* Education Resources Section */}
      <Section
        title={t("education.title")}
        description={t("education.description")}
        className="bg-gradient-to-l from-yellow-500/10 to-transparent"
        layoutClassName=""
      >
        <ul className="flex flex-wrap justify-center gap-4">
          {EDUCATION_RESOURCES.map((resource) => {
            const Icon = resource.icon;
            return (
              <li key={resource.id}>
                <Link href={resource.link} locale={locale}>
                  <Card className="hover:border-primary/50 h-full w-full max-w-2xs cursor-pointer gap-4 text-center transition-colors sm:gap-6">
                    <CardHeader>
                      <Icon className="text-primary mx-auto mb-2 size-10 sm:size-12 lg:size-14" />
                      <CardTitle>{t(resource.title)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        {t(resource.description)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-12 flex justify-center">
          <ExploreAllButton href="/education" text={t("exploreAll")} />
        </div>
      </Section>

      {/* Global Centers & Organizations Section */}
      <Section
        title={t("global.title")}
        description={t("global.description")}
        className="bg-gradient-to-r from-blue-500/10 to-transparent"
        layoutClassName=""
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {CONTINENTS.map((continent) => (
            <Link
              key={continent.id}
              href={continent.link}
              locale={locale}
              className="group"
            >
              <div
                className={cn(
                  "border-border bg-card/50 relative h-full min-h-[160px] overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500",
                  "hover:scale-[1.02] hover:shadow-xl",
                  continent.borderColor,
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-all duration-500",
                    continent.gradient,
                    continent.hoverGradient,
                  )}
                />

                {/* Continent Image */}
                <div
                  className={cn(
                    "absolute top-0 right-0 left-0 h-full w-full opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80",
                    continent.imageScale,
                  )}
                >
                  <Image
                    src={continent.image}
                    alt={t(continent.title)}
                    fill
                    className="object-contain object-center"
                  />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col items-center justify-center gap-3 p-5">
                  <h3 className="text-xl font-bold md:text-2xl">
                    {t(continent.title)}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ExploreAllButton href="/global" text={t("exploreAll")} />
        </div>
      </Section>

      {/* Highlights Section */}
      <Section
        title={t("highlights.title")}
        description=""
        className=""
        layoutClassName="mx-10 md:mx-20 max-w-full"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:pt-10">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              className="group relative aspect-[3/2] w-full overflow-hidden rounded-lg md:aspect-[3/2]"
            >
              <Image
                src={`/images/2025_bitomun_highlights-${num}.jpg`}
                alt={`2025 Bitomun Highlight ${num}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-120"
                sizes="(min-width: 768px) 20vw, 50vw"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Internship Section */}
      <Section
        title={t("internship.title")}
        description={t("internship.description")}
        className="bg-gradient-to-r from-purple-500/10 to-transparent"
        layoutClassName=""
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/internship">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t("internship.details")}
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}

type HeroProps = {
  description: string;
  button1: string;
  button2?: string;
  subscribeButton: string;
};

function Hero({ description, button1, subscribeButton }: HeroProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <BackgroundDecoration />
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto size-24 sm:size-32 md:size-40 lg:hidden">
          <Logo alt="BITOMUN" fill className="object-contain drop-shadow-2xl" />
        </div>
        <div className="grid h-full items-center gap-8 py-8 lg:grid-cols-12 lg:py-12">
          {/* Left - Main Content */}
          <div className="space-y-10 lg:col-span-7">
            <div className="flex flex-col items-center justify-center gap-6 lg:items-start">
              {/* Title and Mobile Visual Element */}
              <div className="flex items-center justify-center gap-4 lg:block">
                <h1 className="text-5xl leading-[0.9] font-black sm:text-7xl lg:text-8xl xl:text-9xl">
                  BIT
                  <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-bold text-transparent">
                    OMUN
                  </span>
                </h1>
              </div>

              <p className="text-muted-foreground text-center text-sm leading-relaxed whitespace-pre-line sm:text-lg md:text-xl lg:text-left">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:text-primary hover:bg-transparent hover:underline"
                >
                  {button1}
                </Button>
              </Link>
              {/* <ExploreAllButton href="/development" text={button2} /> */}
              <SubscribeModal>
                <Button size="lg">
                  <Mail className="mr-1 h-4 w-4" />
                  {subscribeButton}
                </Button>
              </SubscribeModal>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto aspect-square max-w-md">
              <Stack
                cards={[
                  // Bitomun Key Image with Background
                  <div
                    key="bitomun-key"
                    className="relative h-full w-full bg-gradient-to-br from-orange-500 to-orange-600"
                  >
                    <Image
                      src="/images/bitomun_key.webp"
                      alt="Bitomun Key"
                      fill
                      className="pointer-events-none object-contain p-8"
                      priority
                    />
                  </div>,
                  // Highlight Images
                  ...Array.from({ length: 8 }, (_, i) => (
                    <Image
                      key={`highlight-${i + 1}`}
                      src={`/images/2025_bitomun_highlights-${i + 1}.webp`}
                      alt={`2025 Bitomun Highlight ${i + 1}`}
                      fill
                      className="pointer-events-none object-cover"
                    />
                  )),
                ]}
                autoplay={true}
                autoplayDelay={2000}
                pauseOnHover={true}
                mobileClickOnly={true}
                randomRotation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  layoutClassName?: string;
  title: string | ReactNode;
  description: string;
};

function Section({
  children,
  className,
  title,
  description,
  layoutClassName,
}: SectionProps) {
  return (
    <section className={cn("px-4 py-32 sm:px-6 lg:px-8", className)}>
      <div className={cn("mx-auto max-w-4xl", layoutClassName)}>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold whitespace-pre-line md:whitespace-normal">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

function ExploreAllButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="">
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:text-primary hover:bg-transparent hover:underline"
      >
        {text}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Link>
  );
}

const DEV_RESOURCES = [
  {
    id: "layer1",
    icon: Bitcoin,
    title: "development.resources.layer1.title",
    description: "development.resources.layer1.description",
    link: "/development/layer1/libraries-sdks",
  },
  {
    id: "layer2",
    icon: Zap,
    title: "development.resources.layer2.title",
    description: "development.resources.layer2.description",
    link: "/development/layer2/libraries-sdks",
  },
] as const;

type ContinentData = {
  id: string;
  title: string;
  link: string;
  gradient: string;
  hoverGradient: string;
  borderColor: string;
  image: string;
  imageScale?: string;
};

const CONTINENTS: ContinentData[] = [
  {
    id: "asia",
    title: "global.continents.asia",
    link: "/global/asia",
    gradient: "from-rose-500/20 via-orange-500/20 to-amber-500/20",
    hoverGradient:
      "group-hover:from-rose-500/40 group-hover:via-orange-500/40 group-hover:to-amber-500/40",
    borderColor: "hover:border-orange-500/50",
    image: "/icons/asia.svg",
    imageScale: "scale-125 group-hover:scale-150",
  },
  {
    id: "europe",
    title: "global.continents.europe",
    link: "/global/europe",
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
    hoverGradient:
      "group-hover:from-blue-500/40 group-hover:via-indigo-500/40 group-hover:to-violet-500/40",
    borderColor: "hover:border-blue-500/50",
    image: "/icons/europe.svg",
    imageScale: "scale-125 group-hover:scale-150",
  },
  {
    id: "africa",
    title: "global.continents.africa",
    link: "/global/africa",
    gradient: "from-amber-500/20 via-yellow-500/20 to-lime-500/20",
    hoverGradient:
      "group-hover:from-amber-500/40 group-hover:via-yellow-500/40 group-hover:to-lime-500/40",
    borderColor: "hover:border-yellow-500/50",
    image: "/icons/africa.svg",
  },
  {
    id: "northAmerica",
    title: "global.continents.northAmerica",
    link: "/global/north-america",
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    hoverGradient:
      "group-hover:from-emerald-500/40 group-hover:via-teal-500/40 group-hover:to-cyan-500/40",
    borderColor: "hover:border-emerald-500/50",
    image: "/icons/north_america.svg",
    imageScale: "scale-125 group-hover:scale-150",
  },
  {
    id: "southAmerica",
    title: "global.continents.southAmerica",
    link: "/global/south-america",
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    hoverGradient:
      "group-hover:from-green-500/40 group-hover:via-emerald-500/40 group-hover:to-teal-500/40",
    borderColor: "hover:border-green-500/50",
    image: "/icons/south_america.svg",
  },
  {
    id: "oceania",
    title: "global.continents.oceania",
    link: "/global/oceania",
    gradient: "from-cyan-500/20 via-sky-500/20 to-blue-500/20",
    hoverGradient:
      "group-hover:from-cyan-500/40 group-hover:via-sky-500/40 group-hover:to-blue-500/40",
    borderColor: "hover:border-cyan-500/50",
    image: "/icons/oceania.svg",
    imageScale: "scale-125 group-hover:scale-150",
  },
];

const EDUCATION_RESOURCES = [
  {
    id: "offline",
    icon: School,
    title: "education.resources.offline.title",
    description: "education.resources.offline.description",
    link: "/education#offline",
  },
  {
    id: "online",
    icon: Monitor,
    title: "education.resources.online.title",
    description: "education.resources.online.description",
    link: "/education#online",
  },
  {
    id: "bookclub",
    icon: Users,
    title: "education.resources.bookclub.title",
    description: "education.resources.bookclub.description",
    link: "/education#bookclub",
  },
] as const;
