type ContinentHeaderProps = {
  title: string;
  subtitle: string;
};

export function ContinentHeader({ title, subtitle }: ContinentHeaderProps) {
  return (
    <section className="relative hidden overflow-hidden border-b border-gray-200/50 bg-gradient-to-r from-amber-50/50 via-orange-50/30 to-rose-50/50 px-4 py-8 lg:block lg:px-8 lg:py-12 dark:border-gray-700/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-rose-950/20">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl dark:bg-orange-500/10" />
      </div>

      <div className="relative container mx-auto">
        <div className="flex items-center gap-4">
          {/* 아이콘 */}
          <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/25">
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
            <h1 className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl dark:from-amber-400 dark:via-orange-400 dark:to-rose-400">
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
