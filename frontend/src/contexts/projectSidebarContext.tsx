"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createContext, useState, useRef } from "react";
import type { ProjectSidebarContextTypes } from "@/types/Project";

const defaultContextValue: ProjectSidebarContextTypes = {
  isProjectSidebarOpen: false,
  toggleProjectSidebar: () => {},
  projectSidebarRef: { current: null },
  projectHeaderRef: { current: null },
};

const ProjectSidebarContext =
  createContext<ProjectSidebarContextTypes>(defaultContextValue);

function ProjectSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(false);

  const projectSidebarRef = useRef<HTMLDivElement>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    () => setIsProjectSidebarOpen(false),
    projectSidebarRef,
    projectHeaderRef,
  );

  function toggleProjectSidebar() {
    setIsProjectSidebarOpen((isProjectSidebarOpen) => !isProjectSidebarOpen);
  }

  return (
    <ProjectSidebarContext.Provider
      value={{
        isProjectSidebarOpen,
        toggleProjectSidebar,
        projectSidebarRef,
        projectHeaderRef,
      }}
    >
      {children}
    </ProjectSidebarContext.Provider>
  );
}

export { ProjectSidebarContext, ProjectSidebarProvider };
