"use client";
import { Project } from "@/types/Project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import UserAvatar from "../common/ui/image/UserAvatar";
import { setStatusIcon, techStackClass } from "@/utils";

type ProjectCardProps = {
  project: Project;
  isUser?: boolean;
  isExplore?: boolean;
};

const array = [1, 2, 3, 4, 5];

function ProjectCard({ project }: ProjectCardProps) {
  const username = project?.owner?.info.username;

  return (
    <>
      <Card
        className="max-h-[30rem] min-h-fit min-w-[20rem] max-w-[20rem] overflow-y-auto overflow-x-hidden border-dashed border-zinc-300 bg-inherit bg-zinc-100 pl-1 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10"
        key={project._id.toString()}
      >
        <CardHeader>
          <Link href={`/${username}/${project?.slug}/${project._id}`}>
            <CardTitle className="capitalize hover:opacity-75">
              {project.title}
            </CardTitle>
          </Link>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex w-full flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <p key={tech} className={techStackClass(tech)}>
              {tech}
            </p>
          ))}
        </CardContent>
        <div>
          <CardContent>
            <h4 className="flex gap-2 text-base font-semibold">
              Members
              <span className="font-normal">
                {`(${project.members?.membersJoined.length})`}
              </span>
            </h4>
          </CardContent>

          <CardContent className="flex flex-wrap gap-4">
            {project.members?.membersJoined &&
              project.members.membersJoined.map((member) => (
                <UserAvatar
                  key={member._id.toString()}
                  src={member.info.image}
                  username={member.info.username}
                  userId={member._id.toString()}
                />
              ))}
          </CardContent>
        </div>

        <CardContent className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-semibold">Owner</p>
            <UserAvatar
              src={project.owner.info.image}
              username={project.owner.info.username}
              userId={project.owner._id}
            />
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
            {setStatusIcon(project.status)} {project.status}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProjectCard;
