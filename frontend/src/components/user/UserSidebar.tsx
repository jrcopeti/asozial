"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";
import useCombinedRef from "@/hooks/useCombinedRef";
import { useOutsideClick } from "@/hooks/useOutsideClick";

function UserSidebar() {
  const { userSidebarRef, isUserSidebarOpen, projectSidebarRef } =
    useSidebarsContext();

  // useOutsideClick(
  //   () => {
  //     if (isUserSidebarOpen) {
  //       toggleUserSidebar();
  //     }
  //   },
  //   userSidebarRef,
  //   projectSidebarRef,
  // );
  const combinedRef = useCombinedRef(userSidebarRef, projectSidebarRef);
  return (
    <aside
      className={`border-1 z-40 flex h-full w-[14rem] flex-col gap-10 px-[3.2rem] py-[2.4rem] text-3xl shadow-md lg:w-[18rem] ${isUserSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={userSidebarRef}
    >
      This is the User Sidebar component
    </aside>
  );
}

export default UserSidebar;
