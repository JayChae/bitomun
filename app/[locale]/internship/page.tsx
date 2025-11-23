import { Bitcoin, Briefcase, Clock, Mail, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IntroSection from "@/components/ui/intro-section";
import { Link } from "@/i18n/navigation";
import { LocaleType } from "@/types";

import InternshipForm from "./_components/internship-form";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("internship.title"),
    description: t("internship.description"),
  };
}

export default async function InternshipPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations("internship");

  return (
    <div>
      <IntroSection>
        <div className="space-y-6">
          <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            {t("hero.description")}
          </p>
        </div>
      </IntroSection>

      {/* Current Status */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card border-primary/30 shadow-lg">
            <CardHeader className="pb-4 text-center">
              <div className="mb-4 flex justify-center">
                <Clock className="text-primary h-16 w-16 animate-bounce" />
              </div>
              <CardTitle className="mb-2 text-lg sm:text-xl">
                {t("status.noOpenings")}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {t("status.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="mailto:bitcoinspecter@gmail.com">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Mail className="mr-1 h-5 w-5" />
                    {t("status.getNotified")}
                  </Button>
                </Link>
                <Link href="/about" locale={locale}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:text-primary hover:bg-transparent hover:underline"
                  >
                    {t("status.learnAboutUs")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
            {t("offers.title")}
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((offer) => {
              const Icon = offer.icon;
              return (
                <Card
                  key={offer.id}
                  className="bg-card border-border hover:border-primary/50 text-center transition-colors"
                >
                  <CardHeader className="flex flex-col items-center justify-center">
                    <Icon className="text-primary mb-2 h-12 w-12" />
                    <CardTitle>{t(offer.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t(offer.descriptionKey)}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <InternshipForm />
        </div>
      </section>

      {/* Stay Connected */}
      <section className="from-secondary/10 bg-gradient-to-r to-transparent px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            {t("stayConnected.title")}
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-lg">
            {t("stayConnected.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/centers" locale={locale}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("stayConnected.exploreCenters")}
              </Button>
            </Link>
            <Link href="/development" locale={locale}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:text-primary hover:bg-transparent hover:underline"
              >
                {t("stayConnected.developmentResources")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const OFFERS = [
  {
    id: "expertise",
    icon: Bitcoin,
    titleKey: "offers.expertise.title",
    descriptionKey: "offers.expertise.description",
  },
  {
    id: "mentorship",
    icon: Users,
    titleKey: "offers.mentorship.title",
    descriptionKey: "offers.mentorship.description",
  },
  {
    id: "projects",
    icon: Briefcase,
    titleKey: "offers.projects.title",
    descriptionKey: "offers.projects.description",
  },
] as const;
