import ProjectCard from "./ProjectCard";
import { Project } from "@/types/Project";
import { notFound } from "next/navigation";

type SearchProjectsTableProps = {
  projects: Project[];
};

function SearchProjectsTable({ projects }: SearchProjectsTableProps) {
  if (projects.length === 0) {
    <p>No projects found</p>;
  }

  if (!projects) {
    notFound();
  }

  return (
    <article className="grid grid-cols-1 gap-4 pb-6 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-8 justify-items-center">
      {projects.map((project: Project) => (
        <ProjectCard key={project._id.toString()} project={project} />
      ))}
    </article>
  );
}

export default SearchProjectsTable;
