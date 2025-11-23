"use client";

import { CountrySelect } from "./country-select";

type CountryOption = {
  label: string;
  value: string;
};

type CountryHeaderProps = {
  countryName: string;
  countries: CountryOption[];
  selectPlaceholder: string;
};

export function CountryHeader({
  countryName,
  countries,
  selectPlaceholder,
}: CountryHeaderProps) {
  return (
    <div className="my-8 flex items-center justify-between">
      <div className="group relative">
        {/* 장식 라인 */}
        <div className="bg-primary/80 absolute top-1/2 -left-4 h-8 w-1 -translate-y-1/2 rounded-full" />
        <h2 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
          {countryName}
        </h2>
        {/* 밑줄 장식 */}
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>
      <div className="lg:hidden">
        <CountrySelect countries={countries} placeholder={selectPlaceholder} />
      </div>
    </div>
  );
}
