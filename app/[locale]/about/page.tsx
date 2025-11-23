import {
  Bitcoin,
  Code2,
  GraduationCap,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import SupportModal from "@/components/support-modals";
import IntroSection from "@/components/ui/intro-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("about.title"),
    description: t("about.description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <div className="">
      {/* Intro Section */}
      <IntroSection>
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            BIT
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              OMUN
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-gray-300 sm:text-lg md:text-xl">
            {t("intro")}
          </p>
        </div>
      </IntroSection>

      {/* Program Overview Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xs font-semibold text-white sm:mb-8 sm:text-sm">
            {t("programs.title")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <Link
              href="/internship"
              className="hover:border-primary/50 rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center transition-colors sm:p-6 lg:p-8"
            >
              <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full sm:mb-4 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <Code2 className="text-primary h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base lg:text-lg">
                {t("programs.internship")}
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">
                {t("programs.internshipSubtitle")}
              </p>
            </Link>
            <Link
              href="/education"
              className="hover:border-primary/50 rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center transition-colors sm:p-6 lg:p-8"
            >
              <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full sm:mb-4 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <GraduationCap className="text-primary h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base lg:text-lg">
                {t("programs.education")}
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">
                {t("programs.educationLevel")}
              </p>
            </Link>
            <Link
              href="/education#consulting"
              className="hover:border-primary/50 rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center transition-colors sm:p-6 lg:p-8"
            >
              <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full sm:mb-4 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <MessageSquare className="text-primary h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base lg:text-lg">
                {t("programs.consulting")}
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">
                {t("programs.consultingSubtitle")}
              </p>
            </Link>
            <Link
              href="https://mini.bitcoinconf.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border-primary/50 rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center transition-colors sm:p-6 lg:p-8"
            >
              <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full sm:mb-4 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <Users className="text-primary h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-base lg:text-lg">
                {t("programs.conference")}
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">
                {t("programs.conferenceSubtitle")}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xs font-semibold text-white sm:mb-8 sm:text-sm">
            {t("team.title")}
          </h2>
          <div className="flex gap-6 md:gap-12">
            <div className="text-center">
              <div className="relative mb-3 size-24 rounded-full sm:mb-4 sm:size-28 md:size-32">
                <Image src="/images/specter.webp" alt="Specter" fill />
              </div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                {t("team.members.specter")}
              </h3>
            </div>
            <div className="text-center">
              <div className="relative mb-3 size-24 rounded-full sm:mb-4 sm:size-28 md:size-32">
                <Image src="/images/calvin.webp" alt="Calvin" fill />
              </div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                {t("team.members.calvin")}
              </h3>
            </div>
          </div>
        </div>
      </section> */}

      {/* Sponsor Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xs font-semibold text-white sm:mb-8 sm:text-sm">
            {t("sponsor.title")}
          </h2>
          <div className="text-center text-gray-500">
            <p className="text-sm sm:text-base">{t("sponsor.comingSoon")}</p>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xs font-semibold text-white sm:mb-8 sm:text-sm">
            {t("partnership.title")}
          </h2>
          <div className="text-center text-gray-500">
            <p className="text-sm sm:text-base">
              {t("partnership.comingSoon")}
            </p>
          </div>
        </div>
      </section>
      {/* support section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xs font-semibold text-white sm:mb-8 sm:text-sm">
            {t("support.title")}
          </h2>

          <div className="mx-auto max-w-3xl">
            {/* Support Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <SupportModal
                type="onchain"
                trigger={
                  <button
                    type="button"
                    className="group hover:border-[#f7931a] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:bg-zinc-800 sm:p-8"
                  >
                    <div className="bg-[#f7931a]/10 group-hover:bg-[#f7931a]/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors sm:h-14 sm:w-14">
                      <Bitcoin className="text-[#f7931a] h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                      {t("support.onchain")}
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
                    className="group hover:border-[#fbbf24] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:bg-zinc-800 sm:p-8"
                  >
                    <div className="bg-[#fbbf24]/10 group-hover:bg-[#fbbf24]/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors sm:h-14 sm:w-14">
                      <Zap className="text-[#fbbf24] h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                      {t("support.lightning")}
                    </h3>
                    <p className="text-xs text-gray-400 sm:text-sm">
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
    </div>
  );
}
