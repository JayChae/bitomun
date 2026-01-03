"use client";

import { Bitcoin, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import SupportModal from "./support-modals";

export default function Support() {
  const t = useTranslations("supportModal");
  const tAbout = useTranslations("about");

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:px-6 lg:px-8">
      {/* 그라데이션 배경 */}
      <div className="from-accent/20 via-primary/10 absolute inset-0 bg-gradient-to-br to-transparent" />
      <div className="from-accent/25 via-primary/15 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-transparent" />
      <div className="to-accent/10 absolute inset-0 bg-gradient-to-t from-transparent via-transparent" />

      {/* 컨텐츠 */}
      <div className="relative mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("title")}</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            {t("onchain.description")}
          </p>
        </header>

        <div className="mx-auto max-w-3xl">
          {/* Support Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <SupportModal
              type="onchain"
              trigger={
                <button
                  type="button"
                  className="group w-full rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-[#f7931a] hover:bg-zinc-800 sm:p-8"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7931a]/10 transition-colors group-hover:bg-[#f7931a]/20 sm:h-14 sm:w-14">
                    <Bitcoin className="h-6 w-6 text-[#f7931a] sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                    {tAbout("support.onchain")}
                  </h3>
                  <p className="text-xs text-gray-400 sm:text-sm">
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
                  className="group w-full rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-[#fbbf24] hover:bg-zinc-800 sm:p-8"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fbbf24]/10 transition-colors group-hover:bg-[#fbbf24]/20 sm:h-14 sm:w-14">
                    <Zap className="h-6 w-6 text-[#fbbf24] sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                    {tAbout("support.lightning")}
                  </h3>
                  <p className="text-xs text-gray-400 sm:text-sm">
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
