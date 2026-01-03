"use client";

import Lottie from "lottie-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import confettiAnimation from "@/public/lottie/Confetti-explode.json";

export default function FloatingButton() {
  const pathname = usePathname();
  const t = useTranslations("footer");

  // support 페이지에서는 표시하지 않음 (모든 hook 호출 이후에 체크)
  if (pathname.includes("/support")) return null;

  return (
    <div className="fixed right-8 bottom-8 z-50 translate-y-0 opacity-100 transition-all duration-300">
      <Link
        href="/support"
        className={cn(
          "group relative block overflow-hidden rounded-full px-6 py-3 font-bold",
          "bg-primary text-primary-foreground border-primary border",
          "hover:bg-primary/90",
          "transition-all duration-300",
          "shadow-lg hover:scale-105 hover:shadow-xl",
        )}
      >
        <span className="relative z-10 flex items-center justify-center">
          <Lottie
            animationData={confettiAnimation}
            loop={true}
            className="absolute inset-0 h-full w-full scale-350"
          />
          <span className="relative z-10">{t("support.title")}</span>
        </span>
        <span className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
      </Link>
    </div>
  );
}
