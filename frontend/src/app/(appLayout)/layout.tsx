"use client";
//React
import React, { useEffect } from "react";

//Hooks
import { useSidebarsContext } from "@/context/SidebarsContext";

//Components
import Main from "@/components/common/Main";
import Navbar from "@/components/common/Navbar";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import UserSidebar from "@/components/user/UserSidebar";
import AppFooter from "@/components/common/AppFooter";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isUserSidebarOpen, isProjectSidebarOpen } = useSidebarsContext();
  const isOverlayVisible = isUserSidebarOpen || isProjectSidebarOpen;

  return (
    <>
      <Navbar />

      <div className="relative flex h-full w-full overflow-x-hidden bg-light px-4 dark:bg-dark">
        <aside
          className={`absolute bottom-0 left-0 top-0 z-40 h-full w-[14rem] border-y bg-neutral-300 transition-transform duration-300 ease-in-out dark:bg-neutral-700 lg:w-[18rem] ${
            isUserSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <UserSidebar />
        </aside>
        <Main>
          {/* {isOverlayVisible && (
            <div className="absolute inset-0 z-40 bg-dark opacity-20 dark:opacity-50"></div>
          )} */}
          {children}
        </Main>

        <aside
          className={`absolute bottom-0 right-0 top-0 z-50 h-full w-[14rem] border-y bg-neutral-300 transition-transform duration-300 ease-in-out dark:bg-neutral-700 lg:w-[18rem] ${
            isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ProjectSidebar />
        </aside>
      </div>

      <AppFooter />
    </>
  );
}

export default AppLayout;
