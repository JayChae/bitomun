import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Footer from "@/components/footer";
import {
  EducationalOrganizationJsonLd,
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/json-ld";
import { routing } from "@/i18n/routing";

import Header from "../../components/header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className="size-full">
      <head>
        <link rel="preload" href="/images/icon.webp" as="image" />
        <OrganizationJsonLd locale={locale} />
        <WebsiteJsonLd locale={locale} />
        <EducationalOrganizationJsonLd locale={locale} />
      </head>
      <body
        className={`relative size-full antialiased ${pretendardFont.className} overflow-y-scroll`}
      >
        <NextIntlClientProvider locale={locale}>
          <Header locale={locale} />
          <main className="min-h-full min-w-full pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const baseUrl = "https://www.bitomun.com";
  const ogImageUrl = `${baseUrl}/images/bitomun_key.png`;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: {
      icon: "/images/icon.webp",
      apple: "/images/icon.webp",
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
      },
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    keywords: [
      "Bitcoin",
      "비트코인",
      "Lightning Network",
      "라이트닝 네트워크",
      "Bitcoin Education",
      "비트코인 교육",
      "Bitcoin Development",
      "비트코인 개발",
      "Bitomun",
      "비토문",
    ],
  };
}

const pretendardFont = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  preload: true,
});
