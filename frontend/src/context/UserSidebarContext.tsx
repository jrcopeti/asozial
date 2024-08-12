"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createContext, useState, useRef, useContext } from "react";
import type { UserSidebarContextTypes } from "@/types/User";
import { useProjectSidebarContext } from "./ProjectSidebarContext";

const defaultContextValue: UserSidebarContextTypes = {
  isUserSidebarOpen: false,
  toggleUserSidebar: () => {},
  userSidebarRef: { current: null },
  userHeaderRef: { current: null },
};

const UserSidebarContext =
  createContext<UserSidebarContextTypes>(defaultContextValue);

function UserSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const { projectSidebarRef } = useProjectSidebarContext();

  const userSidebarRef = useRef<HTMLDivElement>(null);
  const userHeaderRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    () => {
      if (isUserSidebarOpen) {
        setIsUserSidebarOpen(false);
      }
    },
    userSidebarRef,
    userHeaderRef,
    projectSidebarRef,
  );

  function toggleUserSidebar() {
    setIsUserSidebarOpen((isUserSidebarOpen) => !isUserSidebarOpen);
  }

  return (
    <UserSidebarContext.Provider
      value={{
        isUserSidebarOpen,
        toggleUserSidebar,
        userSidebarRef,
        userHeaderRef,
      }}
    >
      {children}
    </UserSidebarContext.Provider>
  );
}

function useUserSidebarContext() {
  const context = useContext(UserSidebarContext);
  if (context === undefined) {
    throw new Error("useUserSidebar must be used within a UserSidebarProvider");
  }
  return context;
}

export { useUserSidebarContext, UserSidebarProvider };