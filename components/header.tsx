"use client";

import { Languages, Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageType, LocaleType } from "@/types/intl";

import SubscribeModal from "./forms/subscribe-modal";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./ui/logo";

const links = [
  { href: "/about", key: "about" },
  { href: "/development", key: "development" },
  { href: "/education", key: "education" },
  { href: "/global", key: "global" },
  { href: "/apply", key: "apply" },
];
export default function Header({ locale }: { locale: LocaleType }) {
  const pathname = usePathname();
  const withoutLocale = pathname.split("/").slice(2).join("/");
  const t = useTranslations("subscribe");
  const tHeader = useTranslations("header.menu");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-border bg-card/50 fixed top-0 right-0 left-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-white transition-colors"
            locale={locale}
          >
            <Logo width={42} height={42} />
            <span className="-ml-2 block text-3xl font-bold">itomun</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  key={link.href}
                  href={link.href}
                  locale={locale}
                  {...(link.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={cn(
                    "hover:text-primary size-fit text-sm font-medium transition-colors",
                    `/${withoutLocale}` === link.href ||
                      `/${withoutLocale}`.startsWith(`${link.href}/`)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {tHeader(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`https://mini.bitcoinconf.org/${locale}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary text-muted-foreground size-fit text-sm font-medium transition-colors"
              >
                {tHeader("conference")}
              </Link>
            </li>
            <li>
              <SubscribeModal>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground"
                >
                  {t("button")}
                </Button>
              </SubscribeModal>
            </li>
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground gap-2"
                  >
                    <Avatar className="h-5 w-5 rounded-full">
                      <AvatarImage
                        src={
                          locale === "en"
                            ? "https://flagcdn.com/us.svg"
                            : "https://flagcdn.com/kr.svg"
                        }
                        alt={locale === "en" ? "English" : "한국어"}
                        className="object-cover"
                      />
                    </Avatar>
                    <span className="text-sm font-medium">
                      {locale === "en" ? "English" : "한국어"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[6rem]">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={`/${withoutLocale}`}
                      locale={lang.code as LocaleType}
                      rel="alternate"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        {lang.label}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-border border-t py-4">
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li
                  key={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Link
                    key={link.href}
                    href={link.href}
                    locale={locale}
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={cn(
                      "hover:bg-accent block rounded-md px-4 py-3 text-sm font-medium transition-colors hover:text-black",
                      `/${withoutLocale}` === link.href ||
                        `/${withoutLocale}`.startsWith(`${link.href}/`)
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {tHeader(link.key)}
                  </Link>
                </li>
              ))}
              <li onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Link
                  href={`https://mini.bitcoinconf.org/${locale}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-accent text-muted-foreground block rounded-md px-4 py-3 text-sm font-medium transition-colors hover:text-black"
                >
                  {tHeader("conference")}
                </Link>
              </li>

              <li className="border-border w-full border-t pt-4">
                <div className="px-4 pb-3">
                  <SubscribeModal>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="mr-1 h-4 w-4" />
                      {t("button")}
                    </Button>
                  </SubscribeModal>
                </div>
              </li>
              <li>
                <Link
                  href={`/${withoutLocale}`}
                  locale={locale === "en" ? "ko" : "en"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-accent text-muted-foreground block rounded-md px-4 py-3 text-sm transition-colors hover:text-black"
                  rel="alternate"
                >
                  {locale === "en" ? "한국어" : "English"}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

type Language = {
  code: LocaleType;
  label: LanguageType;
};
const languages: Language[] = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
];
