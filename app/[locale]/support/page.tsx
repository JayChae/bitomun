import { Bitcoin, Zap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import SupportModal from "@/components/support-modals";
import { LocaleType } from "@/types";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("support.title"),
    description: t("support.description"),
  };
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations("supportModal");
  const tAbout = await getTranslations("about");

  return (
    <section className="flex min-h-[80dvh] w-full items-center justify-center px-4 py-12 sm:px-6 md:min-h-[84dvh] lg:min-h-[87dvh]">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          {t("title")}
        </h2>

        {/* Description */}
        <p className="my-8 text-center text-sm leading-relaxed text-gray-400 sm:mb-10 sm:text-base">
          {tAbout("support.description")}
        </p>
        <div className="mx-auto w-full max-w-3xl">
          {/* Support Cards */}
          <div className="flex w-full gap-4">
            <SupportModal
              type="onchain"
              trigger={
                <button
                  type="button"
                  className="group aspect-square w-full flex-1 rounded-xl border-2 border-zinc-800 bg-zinc-900 p-3 transition-all hover:border-[#f7931a] hover:bg-zinc-800 sm:p-12 md:p-10"
                >
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#f7931a]/10 transition-colors group-hover:bg-[#fbbf24]/20 md:size-20">
                    <Bitcoin className="size-8 text-[#f7931a] md:size-12" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">
                    {tAbout("support.onchain")}
                  </h3>
                  <p className="text-sm text-gray-400 sm:text-base">
                    Bitcoin Address
                  </p>
                </button>
              }
            />
            <SupportModal
              type="lightning"
              trigger={
                <button
                  type="button"
                  className="group aspect-square w-full flex-1 rounded-xl border-2 border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-[#fbbf24] hover:bg-zinc-800 sm:p-12 md:p-10"
                >
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#fbbf24]/10 transition-colors group-hover:bg-[#fbbf24]/20 md:size-20">
                    <Zap className="size-8 text-[#fbbf24] md:size-12" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">
                    {tAbout("support.lightning")}
                  </h3>
                  <p className="text-sm text-gray-400 sm:text-base">
                    Lightning Address
                  </p>
                </button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
