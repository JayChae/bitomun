import { ExternalLink } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

import { ContinentColorTheme } from "../_constants";

type ResourceCardProps = {
  href: string;
  logo: string;
  name: string;
  description: string;
  theme: ContinentColorTheme;
};

export function ResourceCard({ href, logo, name, description, theme }: ResourceCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
    >
      {/* 호버시 나타나는 배경 글로우 */}
      <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${theme.cardGlow} opacity-0 blur transition-all duration-500 group-hover:opacity-100`} />

      <Card className={`relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm transition-all duration-500 ${theme.cardHover} group-hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80`}>
        {/* 상단 그라데이션 바 */}
        <div className={`absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r ${theme.cardBar} opacity-80`} />

        {/* 배경 글로우 - 다크모드에서 더 잘 보이게 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full ${theme.headerGlow1} blur-2xl`} />
          <div className={`absolute -bottom-12 -left-12 h-32 w-32 rounded-full ${theme.headerGlow2} blur-2xl`} />
        </div>

        <CardHeader className="relative p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* 로고 */}
            <div className="relative flex-shrink-0">
              {/* 로고 컨테이너 */}
              <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md sm:size-16 dark:border-gray-600 dark:bg-gray-700">
                <Image
                  src={logo}
                  alt={name}
                  className="object-contain"
                  fill={true}
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              {/* 제목 + 아이콘 */}
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <CardTitle className={`text-base leading-tight font-semibold text-gray-900 transition-colors duration-300 ${theme.cardTitleHover} dark:text-gray-100`}>
                  {name}
                </CardTitle>
                {/* 화살표 아이콘 */}
                <div className={`flex size-7 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 transition-all duration-300 ${theme.buttonHover} dark:border-gray-600 dark:bg-gray-700`}>
                  <ExternalLink className="h-3.5 w-3.5 text-gray-400 transition-all duration-300 group-hover:text-white dark:text-gray-400" />
                </div>
              </div>
              {/* 설명 */}
              <CardDescription className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
