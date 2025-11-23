import { FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-border border-t px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-muted-foreground flex w-full flex-col items-center justify-evenly gap-4 text-sm lg:flex-row">
        {/* <div className="flex flex-col items-center justify-center">
          <span>{t("contact")}: </span>
          <a
            href="mailto:bitcoinspecter@gmail.com"
            className="hover:text-primary hover:underline"
          >
            bitcoinspecter@gmail.com
          </a>
        </div> */}

        <Link href="/apply/sponsorship" className="hover:text-primary">
          {t("support.title")}
        </Link>

        <p className="text-center">
          © {new Date().getFullYear()} Bitomun. Empowering through knowledge.
        </p>

        <Link
          href="/whitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary flex flex-wrap items-center justify-center gap-2 border-none hover:bg-transparent hover:underline"
        >
          <FileText className="h-5 w-5" />
          {t("whitepaper")}
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
