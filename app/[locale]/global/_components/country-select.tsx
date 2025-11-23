"use client";

import { ChevronDownIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

import { ContinentColorTheme } from "../_constants";

type Props = {
  countries: { label: string; value: string }[];
  className?: string;
  placeholder?: string;
  theme: ContinentColorTheme;
};

export function CountrySelect({ countries, placeholder, theme }: Props) {
  const pathname = usePathname();
  // Extract continent from pathname: /en/global/asia/japan -> asia
  const pathParts = pathname.split("/");
  const globalIndex = pathParts.findIndex((part) => part === "global");
  const continent = globalIndex >= 0 ? pathParts[globalIndex + 1] : "asia";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-32 items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]">
        <span className="text-sm font-medium">{placeholder}</span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        {countries.map((country) => (
          <DropdownMenuItem key={country.value} asChild className="p-0">
            <Link
              href={`/global/${continent}/${country.value}`}
              className={`flex w-full cursor-pointer items-center px-4 py-3 text-base md:px-3 md:py-2 md:text-sm ${theme.navHover}`}
            >
              {country.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
