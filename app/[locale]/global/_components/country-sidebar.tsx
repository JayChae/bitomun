"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  countries: { label: string; value: string }[];
  selectedCountry: string;
  className?: string;
};

export function CountrySidebar({
  title,
  countries,
  selectedCountry,
  className,
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
                "hover:bg-primary/20 w-full justify-start text-left",
                selectedCountry === country.value
                  ? "bg-primary/50"
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
