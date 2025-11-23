import { ArrowUpRight } from "lucide-react";
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

export function ResourceCard({
  href,
  logo,
  name,
  description,
  theme,
}: ResourceCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
    >
      <Card
        className={`relative h-full overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl dark:bg-gray-900`}
      >
        {/* 이미지 영역 - 크게 확대 */}
        <div
          className={`relative h-40 overflow-hidden bg-gradient-to-br ${theme.cardBar}`}
        >
          {/* 로고 이미지 - 크고 중앙 배치 */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative size-32 overflow-hidden rounded-2xl transition-all duration-500 group-hover:scale-110 sm:size-28">
              <Image
                src={logo}
                alt={name}
                className="rounded-2xl object-contain drop-shadow-lg"
                fill={true}
              />
            </div>
          </div>

          {/* 링크 아이콘 - 우측 상단 */}
          <div
            className={`absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white`}
          >
            <ArrowUpRight className="size-4 text-white transition-colors duration-300 group-hover:text-gray-900" />
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <CardHeader className="relative space-y-2 p-5">
          {/* 제목 */}
          <CardTitle
            className={`text-lg font-bold text-gray-900 transition-colors duration-300 ${theme.cardTitleHover} dark:text-gray-100`}
          >
            {name}
          </CardTitle>

          {/* 설명 */}
          <CardDescription className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {description}
          </CardDescription>

          {/* 하단 액센트 라인 */}
          {/* <div className="pt-3">
            <div
              className={`h-1 w-12 rounded-full bg-gradient-to-r ${theme.cardBar} opacity-60 transition-all duration-500 group-hover:w-full group-hover:opacity-100`}
            />
          </div> */}
        </CardHeader>
      </Card>
    </Link>
  );
}
