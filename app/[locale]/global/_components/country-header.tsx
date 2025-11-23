"use client";

import { ContinentColorTheme } from "../_constants";
import { CountrySelect } from "./country-select";

type CountryOption = {
  label: string;
  value: string;
};

type CountryHeaderProps = {
  countryName: string;
  countries: CountryOption[];
  selectPlaceholder: string;
  theme: ContinentColorTheme;
};

export function CountryHeader({
  countryName,
  countries,
  selectPlaceholder,
  theme,
}: CountryHeaderProps) {
  return (
    <div className="my-8 flex items-center justify-between">
      <div className="group relative">
        {/* 장식 라인 */}
        <div className={`absolute top-1/2 -left-4 h-8 w-1 -translate-y-1/2 rounded-full ${theme.accentLine}`} />
        <h2 className={`bg-gradient-to-r ${theme.textGradient} bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl lg:text-4xl`}>
          {countryName}
        </h2>
        {/* 밑줄 장식 */}
        <div className={`mt-2 h-1 w-16 rounded-full bg-gradient-to-r ${theme.underline}`} />
      </div>
      <div className="lg:hidden">
        <CountrySelect countries={countries} placeholder={selectPlaceholder} theme={theme} />
      </div>
    </div>
  );
}
