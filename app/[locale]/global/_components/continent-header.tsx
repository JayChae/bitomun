import { Earth } from "lucide-react";

import { ContinentColorTheme } from "../_constants";

type ContinentHeaderProps = {
  title: string;
  subtitle: string;
  theme: ContinentColorTheme;
};

export function ContinentHeader({
  title,
  subtitle,
  theme,
}: ContinentHeaderProps) {
  return (
    <section
      className={`relative hidden overflow-hidden border-b ${theme.headerBg} px-4 py-8 lg:block lg:px-8 lg:py-12 dark:border-gray-700/50`}
    >
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-24 -right-24 h-64 w-64 rounded-full ${theme.headerGlow1} blur-3xl`}
        />
        <div
          className={`absolute -bottom-32 -left-32 h-72 w-72 rounded-full ${theme.headerGlow2} blur-3xl`}
        />
      </div>

      <div className="relative container mx-auto">
        <div className="flex items-center gap-4">
          {/* 아이콘 */}
          <div
            className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.iconGradient} shadow-lg ${theme.iconShadow}`}
          >
            <Earth className="size-6 text-white" />
          </div>
          <div>
            <h1
              className={`bg-gradient-to-r ${theme.textGradient} bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl`}
            >
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
