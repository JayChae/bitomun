import { ReactNode } from "react";

import BackgroundDecoration from "./background-decoration";
import Logo from "./logo";

export default function IntroSection({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-12 md:py-14">
      <BackgroundDecoration />
      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative size-24 sm:size-32 md:size-40">
            <Logo
              alt="BITOMUN"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
