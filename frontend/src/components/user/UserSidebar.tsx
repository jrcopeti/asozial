"use client";
import { useUserSidebar } from "@/hooks/useUserSidebar";

function UserSidebar() {
  const { userSidebarRef, isUserSidebarOpen } = useUserSidebar();
  return (
    <aside
      className={`z-50 flex h-full w-[14rem] lg:w-[18rem] flex-col gap-10 px-[3.2rem] py-[2.4rem] text-3xl shadow-md ${isUserSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={userSidebarRef}
    >
      This is the User Sidebar component
    </aside>
  );
}

export default UserSidebar;
