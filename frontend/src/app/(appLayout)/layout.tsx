"use client";
//React
import React from "react";

//Hooks
import { useProjectSidebar } from "@/hooks/useProjectSidebar";
import { useUserSidebar } from "@/hooks/useUserSidebar";

//Components
import Main from "@/components/common/Main";
import Navbar from "@/components/common/Navbar";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import UserSidebar from "@/components/user/UserSidebar";

function layout({ children }: { children: React.ReactNode }) {
  const { isUserSidebarOpen } = useUserSidebar();
  const { isProjectSidebarOpen } = useProjectSidebar();
  const isOverlayVisible = isUserSidebarOpen || isProjectSidebarOpen;

  return (
    <>
      <Navbar />

      <div className="relative flex h-full w-full overflow-x-hidden">
        {isOverlayVisible && (
          <div className="fixed inset-0 z-30 bg-black opacity-20"></div>
        )}
        <aside
          className={`absolute left-0 top-0 z-50 h-full w-[14rem] bg-white transition-transform duration-300 lg:w-[18rem] ${
            isUserSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <UserSidebar />
        </aside>
        <main className={`flex-1 overflow-y-auto`}>
          <Main>{children}</Main>
        </main>
        <aside
          className={`absolute right-0 top-0 z-50 h-full w-[14rem] bg-white transition-transform duration-300 ease-in-out lg:w-[18rem] ${
            isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ProjectSidebar />
        </aside>
      </div>
    </>
  );
}

export default layout;
