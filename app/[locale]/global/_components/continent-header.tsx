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
            <svg
              className="size-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
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
