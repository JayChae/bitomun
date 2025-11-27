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
  const t = await getTranslations("about");

  return (
    <section className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl">
          {/* Support Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8">
            <SupportModal
              type="onchain"
              trigger={
                <button
                  type="button"
                  className="group aspect-square w-full rounded-xl border-2 border-zinc-800 bg-zinc-900 p-10 transition-all hover:border-[#f7931a] hover:bg-zinc-800 sm:p-12"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7931a]/10 transition-colors group-hover:bg-[#f7931a]/20 sm:h-24 sm:w-24">
                    <Bitcoin className="h-10 w-10 text-[#f7931a] sm:h-12 sm:w-12" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                    {t("support.onchain")}
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
                  className="group aspect-square w-full rounded-xl border-2 border-zinc-800 bg-zinc-900 p-10 transition-all hover:border-[#fbbf24] hover:bg-zinc-800 sm:p-12"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fbbf24]/10 transition-colors group-hover:bg-[#fbbf24]/20 sm:h-24 sm:w-24">
                    <Zap className="h-10 w-10 text-[#fbbf24] sm:h-12 sm:w-12" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                    {t("support.lightning")}
                  </h3>
                  <p className="text-sm text-gray-400 sm:text-base">
                    Lightning Address
                  </p>
                </button>
              }
            />
          </div>
        </div>
        {/* Description */}
        <p className="mt-8 text-center text-sm leading-relaxed text-gray-400 sm:mb-10 sm:text-base">
          {t("support.description")}
        </p>
      </div>
    </section>
  );
}
