import {
  Book,
  CodeXml,
  FileQuestionMark,
  MessageSquare,
  Monitor,
  School,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import { ConsultingForm } from "@/components/consulting-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IntroSection from "@/components/ui/intro-section";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleType, LucideIcon } from "@/types";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export default async function EducationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "educationPage" });

  const levels = [
    {
      level: t("levels.level1.title"),
      description: t("levels.level1.description"),
      targets: [
        t("levels.level1.targets.item1"),
        t("levels.level1.targets.item2"),
        t("levels.level1.targets.item3"),
        t("levels.level1.targets.item4"),
        t("levels.level1.targets.item5"),
        t("levels.level1.targets.item6"),
        t("levels.level1.targets.item7"),
      ],
    },
    {
      level: t("levels.level2.title"),
      description: t("levels.level2.description"),
      targets: [
        t("levels.level2.targets.item1"),
        t("levels.level2.targets.item2"),
        t("levels.level2.targets.item3"),
        t("levels.level2.targets.item4"),
        t("levels.level2.targets.item5"),
        t("levels.level2.targets.item6"),
      ],
    },
    {
      level: t("levels.level3.title"),
      description: t("levels.level3.description"),
      targets: [
        t("levels.level3.targets.item1"),
        t("levels.level3.targets.item2"),
        t("levels.level3.targets.item3"),
        t("levels.level3.targets.item4"),
        t("levels.level3.targets.item5"),
        t("levels.level3.targets.item6"),
      ],
    },
    {
      level: t("levels.level4.title"),
      description: t("levels.level4.description"),
      targets: [
        t("levels.level4.targets.item1"),
        t("levels.level4.targets.item2"),
        t("levels.level4.targets.item3"),
      ],
    },
  ];

  const educationDevResources: Resource[] = [
    {
      title: t("devResources.guidesTutorials.title"),
      description: t("devResources.guidesTutorials.description"),
      icon: FileQuestionMark,
      link: "/education/development/guides-tutorials",
    },
    {
      title: t("devResources.classesCourses.title"),
      description: t("devResources.classesCourses.description"),
      icon: School,
      link: "/education/development/classes-courses",
    },
    {
      title: t("devResources.certifications.title"),
      description: t("devResources.certifications.description"),
      icon: ShieldCheck,
      link: "/education/development/certifications",
    },
    {
      title: t("devResources.books.title"),
      description: t("devResources.books.description"),
      icon: Book,
      link: "/education/development/books",
    },
  ];

  return (
    <div>
      <IntroSection>
        <div className="space-y-6">
          <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            {t("hero.description")}
          </p>
        </div>
      </IntroSection>
      <Section
        title={t("sections.offline.title")}
        description={t("sections.offline.description")}
        className="from-secondary/10 bg-gradient-to-r to-transparent"
        icon={School}
      >
        <OffLine
          levels={levels}
          targetsLabel={t("common.targets")}
          applyLabel={t("common.applyButton")}
        />
      </Section>

      <Section
        title={t("sections.online.title")}
        description={t("sections.online.description")}
        className="bg-gradient-to-l from-blue-500/10 to-transparent"
        icon={Monitor}
      >
        <OnlineEducation
          targetsLabel={t("common.targets")}
          applyLabel={t("common.applyButton")}
          targets={[
            t("sections.online.targets.item1"),
            t("sections.online.targets.item2"),
            t("sections.online.targets.item3"),
            t("sections.online.targets.item4"),
          ]}
        />
      </Section>

      <Section
        title={t("sections.bookClub.title")}
        description={t("sections.bookClub.description")}
        className="bg-gradient-to-r from-amber-500/10 to-transparent"
        icon={Users}
      >
        <BookClub
          targetsLabel={t("common.targets")}
          applyLabel={t("common.applyButton")}
          targets={[
            t("sections.bookClub.targets.item1"),
            t("sections.bookClub.targets.item2"),
            t("sections.bookClub.targets.item3"),
          ]}
        />
      </Section>

      {/* Education Resources Section */}
      <DevSection
        title={t("sections.development.title")}
        resources={educationDevResources}
        buttonLink="education/development/guides-tutorials"
        buttonText={t("sections.development.buttonText")}
        icon={CodeXml}
        className="bg-gradient-to-l from-teal-500/10 to-transparent"
      />

      <Section
        id="consulting"
        title={t("sections.consulting.title")}
        description={t("sections.consulting.description")}
        className="bg-gradient-to-r from-purple-500/10 to-transparent"
        icon={MessageSquare}
      >
        <OneOnOneConsulting
          description={t("sections.consulting.fullDescription")}
          recommendation={t("sections.consulting.recommendation")}
          buttonText={t("sections.consulting.buttonText")}
          dialogTitle={t("sections.consulting.dialogTitle")}
          dialogDescription={t("sections.consulting.dialogDescription")}
        />
      </Section>
    </div>
  );
}

type SectionProps = {
  id?: string;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
  icon?: LucideIcon;
};

function Section({
  id,
  title,
  description,
  className,
  children,
  icon,
}: SectionProps) {
  const Icon = icon;
  return (
    <section id={id} className={cn("px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3">
            {Icon && <Icon className="text-primary size-8" />}
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          <span>{description}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

type LevelCardProps = Level & {
  targetsLabel: string;
  applyLabel: string;
};

function LevelCard({
  level,
  description,
  targets,
  targetsLabel,
  applyLabel,
}: LevelCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:border-primary/50 cursor-pointer transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-primary text-center text-xl">
              {level}
            </CardTitle>
            <CardDescription className="text-center text-xs leading-relaxed lg:text-sm">
              {description}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{level}</DialogTitle>
          <DialogDescription className="px-3 text-base leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="">
            <h3 className="mb-3 text-lg font-semibold">{targetsLabel}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm lg:text-base">
              {targets.map((target, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button className="h-9 w-full px-6 text-sm md:h-12 md:px-16 md:text-base">
            {applyLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type Level = {
  level: string;
  description: string;
  targets: string[];
};
type OffLineProps = {
  levels: Level[];
  targetsLabel: string;
  applyLabel: string;
};

function OffLine({ levels, targetsLabel, applyLabel }: OffLineProps) {
  return (
    <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
      {levels.map((levelData, index) => (
        <LevelCard
          key={index}
          {...levelData}
          targetsLabel={targetsLabel}
          applyLabel={applyLabel}
        />
      ))}
    </div>
  );
}

type OnlineEducationProps = {
  targetsLabel: string;
  applyLabel: string;
  targets: string[];
};

function OnlineEducation({
  targetsLabel,
  applyLabel,
  targets,
}: OnlineEducationProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <Card className="w-full">
        <CardHeader>
          <div>
            <h3 className="mb-3 text-center text-lg font-semibold">
              {targetsLabel}
            </h3>
            <ul className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-sm md:text-base">
              {targets.map((target, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardHeader>
      </Card>
      <Button
        variant="outline"
        className="border-primary text-primary hover:bg-primary h-9 px-6 text-sm hover:text-white md:h-12 md:px-16 md:text-base"
        asChild
      >
        <a
          href="https://example.com/online-course"
          target="_blank"
          rel="noopener noreferrer"
        >
          {applyLabel}
        </a>
      </Button>
    </div>
  );
}

type BookClubProps = {
  targetsLabel: string;
  applyLabel: string;
  targets: string[];
};

function BookClub({ targetsLabel, applyLabel, targets }: BookClubProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <Card className="w-full">
        <CardHeader>
          <div>
            <h3 className="mb-3 text-center text-lg font-semibold">
              {targetsLabel}
            </h3>
            <ul className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-sm md:text-base">
              {targets.map((target, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardHeader>
      </Card>
      <Button
        variant="outline"
        className="border-primary text-primary hover:bg-primary h-9 px-6 text-sm hover:text-white md:h-12 md:px-16 md:text-base"
      >
        {applyLabel}
      </Button>
    </div>
  );
}

type OneOnOneConsultingProps = {
  description: string;
  recommendation: string;
  buttonText: string;
  dialogTitle: string;
  dialogDescription: string;
};

function OneOnOneConsulting({
  description,
  recommendation,
  buttonText,
  dialogTitle,
  dialogDescription,
}: OneOnOneConsultingProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <Card className="w-full">
        <CardHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
            <p className="text-muted-foreground font-semibold">
              {recommendation}
            </p>
          </div>
        </CardHeader>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary h-9 px-6 text-sm hover:text-white md:h-12 md:px-16 md:text-base"
          >
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <ConsultingForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

type Resource = {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
};

type DevSectionProps = {
  title: string;
  resources: Resource[];
  buttonLink: string;
  buttonText: string;
  icon: LucideIcon;
  className?: string;
};

function DevSection({
  title,
  resources,
  buttonLink,
  buttonText,
  icon,
  className,
}: DevSectionProps) {
  const Icon = icon;
  return (
    <section className={cn("px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-12">
        <div className="flex w-full items-center justify-center gap-3">
          <Icon className="text-primary size-8" />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>

        <div className="mx-auto flex flex-wrap justify-center gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link href={resource.link} key={resource.link}>
                <Card className="bg-card border-border hover:border-primary/50 h-full w-full max-w-sm transition-colors">
                  <CardHeader className="flex flex-col items-center text-center">
                    <Icon className="text-primary mb-2 size-8 sm:size-10" />
                    <CardTitle className="text-sm sm:text-lg">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-xs sm:text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Link href={buttonLink}>
            <Button
              variant="outline"
              className="border-primary text-primary hover:text-primary h-9 px-6 text-sm hover:bg-transparent hover:underline md:h-12 md:px-16 md:text-base"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages" });

  return {
    title: t("education.title"),
    description: t("education.description"),
  };
}
