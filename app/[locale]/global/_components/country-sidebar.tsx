"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { ContinentColorTheme } from "../_constants";

type Props = {
  title: string;
  countries: { label: string; value: string }[];
  selectedCountry: string;
  className?: string;
  theme: ContinentColorTheme;
};

export function CountrySidebar({
  title,
  countries,
  selectedCountry,
  className,
  theme,
}: Props) {
  const pathname = usePathname();
  // Extract continent from pathname: /en/global/asia/japan -> asia
  const pathParts = pathname.split("/");
  const globalIndex = pathParts.findIndex((part) => part === "global");
  const continent = globalIndex >= 0 ? pathParts[globalIndex + 1] : "asia";

  return (
    <aside className={cn("w-64 flex-shrink-0", className)}>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <nav className="flex flex-col gap-2">
        {countries.map((country) => (
          <Link href={`/global/${continent}/${country.value}`} key={country.value}>
            <Button
              key={country.value}
              className={cn(
                `w-full justify-start text-left ${theme.navHover}`,
                selectedCountry === country.value
                  ? theme.navActive
                  : "bg-transparent",
              )}
            >
              {country.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
