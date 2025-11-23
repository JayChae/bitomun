import { ArrowRight, Code, Heart, MessageSquare } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { LocaleType } from "@/types";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("apply.title"),
    description: t("apply.description"),
  };
}

const categoryStyles = {
  internship: {
    icon: Code,
    color: "text-primary",
    borderColor: "hover:border-primary",
    bgColor: "bg-primary",
  },
  sponsorship: {
    icon: Heart,
    color: "text-secondary",
    borderColor: "hover:border-secondary",
    bgColor: "bg-secondary",
  },
  other: {
    icon: MessageSquare,
    color: "text-muted-foreground",
    borderColor: "hover:border-muted-foreground",
    bgColor: "bg-muted-foreground",
  },
} as const;

export default async function ApplyPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("apply");

  const categories = [
    { id: "internship", href: "/internship" },
    { id: "sponsorship", href: "/apply/sponsorship" },
    { id: "other", href: "/apply/other" },
  ] as const;

  return (
    <div>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-[clamp(3rem,8vw,6rem)] leading-[0.9] font-black tracking-tighter text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Category Selection */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {categories.map((category) => {
            const style = categoryStyles[category.id];
            const Icon = style.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group text-left"
              >
                <div
                  className={`border-border h-full border-2 ${style.borderColor} bg-card relative overflow-hidden p-8 transition-all`}
                >
                  <div
                    className={`absolute top-0 right-0 h-24 w-24 ${style.bgColor}/10 rounded-bl-full transition-all group-hover:scale-110`}
                  />
                  <div className="relative z-10 flex min-h-[300px] flex-col space-y-6">
                    <Icon className={`h-12 w-12 ${style.color}`} />
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl font-black">
                        {t(`categories.${category.id}.title`)}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium">
                        {t(`categories.${category.id}.subtitle`)}
                      </p>
                      <p className="text-muted-foreground pt-2">
                        {t(`categories.${category.id}.description`)}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${style.color} font-bold`}
                    >
                      {t("common.apply")}{" "}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
