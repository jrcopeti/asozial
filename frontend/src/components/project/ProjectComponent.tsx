//Next
import Image from "next/image";
import Link from "next/link";

//Components
import PageTitle from "../common/ui/PageTitle";
import UserAvatar from "../common/ui/image/UserAvatar";
import ProjectPitch from "./ProjectPitch";
import ProjectMainLanguage from "./ProjectMainLanguage";
import ProjectDescription from "./ProjectDescription";
import LeaveProjectForm from "./requests/LeaveProjectForm";

//UI
import github from "/public/socials/github.png";
import { Button } from "../ui/button";
import { Users } from "lucide-react";

//Lib
import { auth } from "@/auth";

//Utils
import { techStackClass, setStatusIcon } from "@/utils";
import { socialsData } from "@/constants";

//Types
import type { Project } from "@/types/Project";

type ProjectComponentProps = {
  project: Project;
  isMember: boolean;
  isOwner: boolean;
};

async function ProjectComponent({
  project,
  isMember,
  isOwner,
}: ProjectComponentProps) {
  const session = await auth();
  const username = session?.user?.githubUsername;

  return (
    <section className="relative -mt-4 flex w-full flex-col gap-4 border-b border-b-neutral-300 px-4 dark:border-b-neutral-600">
      {/* Header Section */}
      <div className="relative left-1/2 h-64 w-[150%] -translate-x-1/2 transform shadow-lg dark:shadow-neutral-300/20 2xl:w-[200%]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            blurDataURL={project.placeholder}
            fill
            objectFit="cover"
            className="rounded-b-md"
            placeholder="blur"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center"></div>
        )}
        {/* Title*/}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent px-8 py-6 tracking-wide">
          <PageTitle className="text-2xl font-bold text-white xs:text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl">
            {project.title}
          </PageTitle>
        </div>
      </div>

      {/* Description */}
      <ProjectDescription project={project} isOwner={isOwner} />

      {/* Pitch*/}
      <ProjectPitch project={project} isOwner={isOwner} />

      {/* Tech stack */}
      <div className="flex flex-wrap gap-4 px-4 py-6">
        {project.techStack.map((tech: string) => (
          <span key={tech} className={techStackClass(tech)}>
            {tech}
          </span>
        ))}
      </div>

      {/* Status */}
      <div>
        <h4 className="text-lg font-semibold">Status</h4>
        <p className="capitalize">
          <span>
            {setStatusIcon(project.status)} {project.status}
          </span>
        </p>
      </div>

      {/* Language */}
      <ProjectMainLanguage project={project} isOwner={isOwner} />
      {/* Members */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold">Members</h4>
          <span className="font-normal">
            {`(${project.members?.membersJoined.length})`}
          </span>
        </div>
        <div className="flex gap-4">
          {project.members?.membersJoined &&
          project.members.membersJoined.length > 0 ? (
            project.members?.membersJoined.map((member) => {
              return (
                <UserAvatar
                  key={member.info.name}
                  src={member.info.image}
                  username={member.info.username}
                  userId={member._id}
                />
              );
            })
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400">
              No members joined yet
            </p>
          )}
        </div>
      </div>

      {/* Owner */}
      <div className="flex flex-col items-start gap-2">
        <p className="text-base font-semibold">Owner</p>
        <UserAvatar
          src={project.owner.info.image}
          username={project.owner.info.username}
          userId={project.owner._id}
        />
      </div>

      {/* Socials */}
      <div className="mb-8 mt-4 flex items-center gap-5">
        {project.githubRepo && (
          <a href={project.githubRepo} target="_blank">
            <Image
              src={github}
              alt="github logo"
              width={40}
              height={40}
              className="inline dark:invert dark:filter"
            />
          </a>
        )}

        {/* Socials */}
        {(isMember || isOwner) &&
          project.socials &&
          socialsData.map((socialData) => {
            const socialUrl =
              project.socials && project?.socials[socialData.key];

            return (
              socialUrl && (
                <a href={socialUrl} target="_blank" key={socialData.key}>
                  <Image
                    src={socialData.imageSrc}
                    alt={socialData.alt}
                    width={socialData.key === "notion" ? 40 : 40}
                    height={socialData.key === "notion" ? 40 : 40}
                    className="inline rounded-md"
                  />
                </a>
              )
            );
          })}
      </div>
      {/* Edit Button */}
      <div className="mb-6">
        {isOwner && (
          <div className="flex w-full items-end justify-end gap-4">
            <Link href={`/${username}/${project.slug}/${project._id}/edit`}>
              <Button>Edit project</Button>
            </Link>
            <Link href={`/${username}/${project.slug}/${project._id}/members`}>
              <Button variant="secondary" className="self-end">
                <span className="flex items-center gap-2">
                  <Users />
                  <p>Manage Members</p>
                </span>
              </Button>
            </Link>
          </div>
        )}
        {isMember && <LeaveProjectForm project={project} />}
      </div>
    </section>
  );
}

export default ProjectComponent;
