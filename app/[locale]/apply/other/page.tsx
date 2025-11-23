import { MessageSquare } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { LocaleType } from "@/types";

import OtherForm from "./_components/other-form";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("other.title"),
    description: t("other.description"),
  };
}

export default async function OtherPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("apply");

  return (
    <div>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <MessageSquare className="text-muted-foreground mx-auto h-16 w-16" />
          <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-[clamp(2rem,6vw,4rem)] leading-[0.9] font-black tracking-tighter text-transparent">
            {t("categories.other.title")}
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl">
            {t("categories.other.description")}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/apply">{t("common.back")}</Link>
          </Button>
          <OtherForm />
        </div>
      </section>
    </div>
  );
}
