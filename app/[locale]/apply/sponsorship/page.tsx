import { Bitcoin, Heart, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import SupportModal from "@/components/support-modals";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { LocaleType } from "@/types";

import SponsorshipForm from "./_components/sponsorship-form";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("sponsorship.title"),
    description: t("sponsorship.description"),
  };
}

export default async function SponsorshipPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("apply");

  return (
    <div>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <Heart className="text-secondary mx-auto h-16 w-16" />
          <h1 className="from-secondary to-primary bg-gradient-to-r bg-clip-text text-[clamp(2rem,6vw,4rem)] leading-[0.9] font-black tracking-tighter text-transparent">
            {t("categories.sponsorship.title")}
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl">
            {t("categories.sponsorship.description")}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/apply">{t("common.back")}</Link>
          </Button>
          <SponsorshipForm />
        </div>
      </section>

      {/* Support Section */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black mb-4">{t("support.title")}</h2>
          <p className="text-muted-foreground mb-8">{t("support.description")}</p>
          <div className="flex justify-center gap-4">
            <SupportModal
              type="onchain"
              trigger={
                <button className="group flex items-center gap-2 border-2 border-border hover:border-[#f7931a] bg-card px-6 py-3 font-bold transition-all">
                  <Bitcoin className="h-5 w-5 text-[#f7931a]" />
                  {t("support.onchain")}
                </button>
              }
            />
            <SupportModal
              type="lightning"
              trigger={
                <button className="group flex items-center gap-2 border-2 border-border hover:border-[#fbbf24] bg-card px-6 py-3 font-bold transition-all">
                  <Zap className="h-5 w-5 text-[#fbbf24]" />
                  {t("support.lightning")}
                </button>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
