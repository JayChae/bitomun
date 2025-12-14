import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TeamMember = {
  name: string;
  position: string;
  bio: string;
  expertise: string[];
  social: {
    twitter: string;
    github: string;
  };
};

type TeamMemberCardProps = {
  member: TeamMember;
  image: string;
};

function TeamMemberTrigger({
  member,
  image,
}: {
  member: TeamMember;
  image: string;
}) {
  return (
    <button
      type="button"
      className="group hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-8"
    >
      {/* Animated background gradient */}
      <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Image with glow effect */}
        <div className="relative mb-4 sm:mb-6">
          <div className="from-primary to-secondary absolute inset-0 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
          <div className="group-hover:border-primary/50 relative size-24 overflow-hidden rounded-full border-2 border-zinc-700 transition-all duration-300 sm:size-28 md:size-32">
            <Image
              src={image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="mb-1 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-lg font-bold text-transparent transition-all sm:text-xl">
          {member.name}
        </h3>

        {/* Position */}
        <p className="text-muted-foreground mb-3 text-sm font-semibold sm:text-base">
          {member.position}
        </p>

        {/* Click indicator */}
        <div className="text-primary/60 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Click to learn more
        </div>
      </div>
    </button>
  );
}

export default function TeamMemberCard({ member, image }: TeamMemberCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TeamMemberTrigger member={member} image={image} />
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-950 text-white">
        {/* Header Section */}
        <DialogHeader className="">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6 sm:text-left">
            {/* Profile Image */}
            <div className="border-primary/50 relative size-24 shrink-0 overflow-hidden rounded-full border-2 sm:size-28">
              <Image
                src={image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Name, Position and Role */}
            <div className="flex-1 text-center sm:text-left">
              <DialogTitle className="mb-2 text-2xl font-bold sm:text-3xl">
                {member.name}
              </DialogTitle>
              <div className="text-primary text-base font-semibold sm:text-lg">
                {member.position}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content Section */}
        <div className="space-y-6 pt-4">
          {/* Bio */}
          <div>
            <p className="text-base leading-relaxed whitespace-pre-line text-gray-300">
              {member.bio}
            </p>
          </div>

          {/* Expertise - Commented out for now */}
          {/* <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="border-primary/30 bg-primary/10 text-primary hover:border-primary/50 hover:bg-primary/20 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div> */}

          {/* Social Links */}
          {(member.social.twitter || member.social.github) && (
            <div className="border-t border-zinc-800 pt-4">
              <div className="flex flex-wrap gap-3">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary/50 hover:bg-primary/10 flex-1 rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-center text-sm font-medium transition-all sm:flex-initial"
                  >
                    Twitter
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary/50 hover:bg-primary/10 flex-1 rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-center text-sm font-medium transition-all sm:flex-initial"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
