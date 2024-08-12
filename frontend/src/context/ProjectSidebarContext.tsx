"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createContext, useState, useRef, useContext } from "react";
import type { ProjectSidebarContextTypes } from "@/types/Project";
import { useUserSidebarContext } from "./UserSidebarContext";

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
  const { userSidebarRef } = useUserSidebarContext();
  const projectSidebarRef = useRef<HTMLDivElement>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    () => {
      if (isProjectSidebarOpen) {
        setIsProjectSidebarOpen(false);
      }
    },
    projectSidebarRef,
    projectHeaderRef,
    userSidebarRef,
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

function useProjectSidebarContext() {
  const context = useContext(ProjectSidebarContext);
  if (context === undefined) {
    throw new Error(
      "useProjectSidebar must be used within a ProjectSidebarProvider",
    );
  }
  return context;
}

export { useProjectSidebarContext, ProjectSidebarProvider };