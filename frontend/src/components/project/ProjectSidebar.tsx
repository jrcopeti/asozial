"use client";

//Next
import Link from "next/link";
//Context
import { useSidebarsContext } from "@/context/SidebarsContext";

//UI
import { Button } from "../ui/button";

const links = [
  {
    name: "My Projects",
    href: "/projects",
  },
  {
    name: "Create Project",
    href: "/projects/new",
  },
  {
    name: "Explore Projects",
    href: "/projects/explore",
  },
];

function ProjectSidebar() {
  const { projectSidebarRef, isProjectSidebarOpen } = useSidebarsContext();

  return (
    <aside
      className={`z-50 flex h-full w-[14rem] flex-col gap-10 overflow-y-auto bg-neutral-300 px-[3.2rem] py-[2.4rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-neutral-700 dark:text-light lg:w-[18rem] ${isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      ref={projectSidebarRef}
    >
      <ul className="flex flex-col gap-10">
        {links.map((link) => (
          <li>
            <Button variant="outline">
              <Link href={link.href}>{link.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProjectSidebar;
