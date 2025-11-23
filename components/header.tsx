"use client";

import { Languages, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageType, LocaleType } from "@/types/intl";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./ui/logo";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/development", label: "Development" },
  { href: "/education", label: "Education" },
  { href: "/global", label: "Global" },
  { href: "/apply", label: "Apply" },
  { href: "https://mini.bitcoinconf.org/", label: "Mini Conference" },
];
export default function Header({ locale }: { locale: LocaleType }) {
  const pathname = usePathname();
  const withoutLocale = pathname.split("/").slice(2).join("/");

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
            <span className="block text-3xl font-bold sm:hidden md:block">
              itomun
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-6 sm:flex">
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
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                  >
                    <Languages className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
            className="text-muted-foreground sm:hidden"
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
          <div className="border-border border-t py-4 md:hidden">
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
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-border w-full border-t pt-4">
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
