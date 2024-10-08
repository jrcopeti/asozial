"use client";
import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchProjectsTable from "@/components/project/SearchProjectsTable";
import Pagination from "@/components/common/ui/Pagination";
import { SearchX } from "lucide-react";
import ProjectCardLoadingSkeleton from "@/components/project/ProjectCardsLoadingSkeleton";
import { Project } from "@/types/Project";

type ProjectTabsProps = {
  projects: Project[];
  totalPages: number;
  ownerProjects: Project[];
  ownerTotalPages: number;
  memberProjects: Project[];
  memberTotalPages: number;
  currentPage: number;
};

function ProjectTabs({
  projects,
  totalPages,
  ownerProjects,
  ownerTotalPages,
  memberProjects,
  memberTotalPages,
  currentPage,
}: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState("all-projects");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderProjects = (projects: Project[]) => {
    if (projects.length === 0) {
      return (
        <div className="flex w-full justify-center">
          <p className="flex items-center gap-2 text-lg font-light text-zinc-500 dark:text-zinc-400 lg:text-xl 2xl:text-2xl">
            <span>
              <SearchX />
            </span>{" "}
            No projects found for your search
          </p>
        </div>
      );
    }
    return <SearchProjectsTable projects={projects} />;
  };

  return (
    <Tabs
      defaultValue="all-projects"
      onValueChange={handleTabChange}
      className="flex w-full flex-col items-center gap-2"
    >
      <TabsList className="w-full md:grid md:w-1/2 md:grid-cols-3">
        <TabsTrigger value="all-projects">All projects</TabsTrigger>
        <TabsTrigger value="owner-projects">My projects</TabsTrigger>
        <TabsTrigger value="member-projects">Member</TabsTrigger>
      </TabsList>

      {/* All Projects */}
      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent className="2xl:max-w-screen-lg" value="all-projects">
          <div className="w-full flex-grow">{renderProjects(projects)}</div>
          <div className="mt-auto w-full">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </TabsContent>
      </Suspense>

      {/* Owner Projects */}
      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent
          className="w-full 2xl:max-w-screen-lg"
          value="owner-projects"
        >
          <div className="w-full flex-grow">
            {renderProjects(ownerProjects)}
          </div>
          <div className="mt-auto w-full">
            <Pagination
              totalPages={ownerTotalPages}
              currentPage={currentPage}
            />
          </div>
        </TabsContent>
      </Suspense>

      {/* Member Projects */}
      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent
          className="w-full 2xl:max-w-screen-lg"
          value="member-projects"
        >
          <div className="w-full flex-grow">
            {renderProjects(memberProjects)}
          </div>
          <div className="mt-auto w-full">
            <Pagination
              totalPages={memberTotalPages}
              currentPage={currentPage}
            />
          </div>
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}

export default ProjectTabs;
