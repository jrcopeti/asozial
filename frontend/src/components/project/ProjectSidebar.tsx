"use client";
import { useProjectSidebar } from "@/hooks/useProjectSidebar";

function ProjectSidebar() {
  const { projectSidebarRef, isProjectSidebarOpen } = useProjectSidebar();
  console.log("projectSidebarRef", projectSidebarRef);
  return (
    <aside
      className={`z-50 flex h-full w-[14rem] lg:w-[18rem] flex-col gap-10 px-[3.2rem] py-[2.4rem] text-3xl shadow-md ${isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      ref={projectSidebarRef}
    >
      This is the Project Sidebar component
    </aside>
  );
}

export default ProjectSidebar;
