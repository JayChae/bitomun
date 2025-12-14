import { getTranslations } from "next-intl/server";

import TeamMemberCard from "./team-member-card";

export default async function TeamMembers() {
  const t = await getTranslations("about");

  const specter = {
    name: t("team.members.specter.name"),
    position: t("team.members.specter.position"),
    bio: t("team.members.specter.bio"),
    expertise: t.raw("team.members.specter.expertise") as string[],
    social: t.raw("team.members.specter.social") as {
      twitter: string;
      github: string;
    },
  };

  const calvin = {
    name: t("team.members.calvin.name"),
    position: t("team.members.calvin.position"),
    bio: t("team.members.calvin.bio"),
    expertise: t.raw("team.members.calvin.expertise") as string[],
    social: t.raw("team.members.calvin.social") as {
      twitter: string;
      github: string;
    },
  };

  const mineey = {
    name: t("team.members.mineey.name"),
    position: t("team.members.mineey.position"),
    bio: t("team.members.mineey.bio"),
    expertise: t.raw("team.members.mineey.expertise") as string[],
    social: t.raw("team.members.mineey.social") as {
      twitter: string;
      github: string;
    },
  };

  const ivar = {
    name: t("team.members.ivar.name"),
    position: t("team.members.ivar.position"),
    bio: t("team.members.ivar.bio"),
    expertise: t.raw("team.members.ivar.expertise") as string[],
    social: t.raw("team.members.ivar.social") as {
      twitter: string;
      github: string;
    },
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-12">
      <TeamMemberCard member={specter} image="/images/specter.webp" isFounder />
      <TeamMemberCard member={calvin} image="/images/calvin.webp" />
      <TeamMemberCard member={mineey} image="/images/mineey.webp" />
      <TeamMemberCard member={ivar} image="/images/ivar.webp" />
    </div>
  );
}
