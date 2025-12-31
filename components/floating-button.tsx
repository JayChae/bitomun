"use client";

import Lottie from "lottie-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import confettiAnimation from "@/public/lottie/Confetti-explode.json";

export default function FloatingButton() {
  const pathname = usePathname();
  const t = useTranslations("footer");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // 페이지 하단 200px 이내에 도달하면 버튼 숨김
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 200;

      setIsVisible(!isNearBottom);
    };

    // Throttle: 100ms마다 한 번만 실행
    const throttledScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null as unknown as NodeJS.Timeout;
      }, 100);
    };

    // 초기 상태 설정
    handleScroll();
    // 스크롤 이벤트 리스너 추가 (passive 옵션으로 성능 향상)
    window.addEventListener("scroll", throttledScroll, { passive: true });

    // 클린업
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // support 페이지에서는 표시하지 않음 (모든 hook 호출 이후에 체크)
  if (pathname.includes("/support")) return null;

  return (
    <div
      className={cn(
        "fixed right-8 bottom-8 z-50 transition-all duration-300",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
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
