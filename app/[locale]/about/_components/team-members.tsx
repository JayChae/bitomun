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

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-12">
      <TeamMemberCard member={specter} image="/images/specter.webp" />
      <TeamMemberCard member={calvin} image="/images/calvin.webp" />
    </div>
  );
}
