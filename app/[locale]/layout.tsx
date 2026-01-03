import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import FloatingButton from "@/components/floating-button";
import Footer from "@/components/footer";
import {
  EducationalOrganizationJsonLd,
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/json-ld";
import { Toaster } from "@/components/ui/sonner";
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
        <meta
          name="google-site-verification"
          content="b6m911ASGXsJQyLp_4ZDSrRIKrOYgszkcfFFcCYJUXA"
        />
        <Favicons />
      </head>
      <body
        className={`relative size-full antialiased ${pretendardFont.className} overflow-y-scroll`}
      >
        <NextIntlClientProvider locale={locale}>
          <Toaster position="top-center" />
          <Header locale={locale} />
          <main className="min-w-full pt-16">{children}</main>
          <Footer />
          <FloatingButton />
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
  const ogImageUrl = `${baseUrl}/images/bitomun_key.webp`;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: {
      icon: "/favicons/favicon.ico",
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
        "x-default": "/ko", // 기본 언어 (한국어)
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

function Favicons() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/favicons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicons/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/manifest.json" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    </>
  );
}
