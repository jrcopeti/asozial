"use client";
//React
import { useRef, useState } from "react";

//Next
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

//Hooks
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useCombinedRef from "@/hooks/useCombinedRef";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useSidebarsContext } from "@/context/SidebarsContext";

//Components
import ToggleTheme from "../ui/ToggleTheme";
//UI
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { TbUserSquareRounded } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import logo from "/public/logo.png";
import { contributors } from "@/constants";

import UserAvatar from "@/components/common/ui/UserAvatar";
import NavbarLinks from "./NavbarLinks";
import { Menu, SquareUserRound } from "lucide-react";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    toggleProjectSidebar,
    projectHeaderRef,
    isProjectSidebarOpen,
    toggleUserSidebar,
    userHeaderRef,
    isUserSidebarOpen,
  } = useSidebarsContext();

  const navRef = useRef<HTMLDivElement>(null);
  useOutsideClick(() => setIsOpen(false), navRef);
  const combinedRefs = useCombinedRef(navRef, projectHeaderRef, userHeaderRef);

  const { width } = useWindowWidth();

  const { data: session, status } = useSession();

  return (
    <>
      <nav
        ref={combinedRefs}
        className={`border-b-1 sticky top-0 z-50 flex w-full justify-between gap-2 bg-light px-6 py-2 text-dark dark:bg-dark dark:text-light`}
      >
        {!isOpen && (
          <>
            <section className="flex items-center gap-5">
              <Button
                size="icon"
                variant="ghost"
                className="hover:opacity-75 dark:text-light xl:hidden"
                onClick={toggleUserSidebar}
                disabled={
                  width && width <= 640 ? !!isProjectSidebarOpen : undefined
                }
              >
                <SquareUserRound size={33} />
              </Button>

              <Link className="flex items-center gap-2" href="/dashboard">
                <h1 className="cursor-pointer text-2xl tracking-wide">
                  asozial
                </h1>
                <Image src={logo} alt="logo" width={30} height={30} />
              </Link>
            </section>

            <NavbarLinks />

            <section className="flex items-center gap-2" ref={combinedRefs}>

              {status === "authenticated" &&
                session.user.image &&
                session.user.githubUsername && (
                  <UserAvatar
                    src={session.user.image}
                    username={session.user.githubUsername}
                    userId={session.user.id}
                    isInNavbar
                  />
                )}

              <Button
                variant="ghost"
                className="hidden hover:opacity-75 sm:block"

                onClick={() => setIsOpen(!isOpen)}
              >
                Contributors
              </Button>

              <ToggleTheme />

              <Button
                size="icon"
                variant="ghost"
                className="hover:opacity-75 dark:text-light xl:hidden"
                onClick={toggleProjectSidebar}
                disabled={
                  width && width <= 640 ? !!isUserSidebarOpen : undefined
                }
              >
                <Menu size={26} />
              </Button>
            </section>
          </>
        )}

        {isOpen && (
          <ul className="flex w-full flex-row flex-wrap justify-evenly py-10 font-sans">
            {contributors.map((contributor) => (
              <li
                key={contributor.name}
                className="flex flex-col items-center gap-2"
              >
                <h2 className="font-serif text-xl">{contributor.name}</h2>
                <Image
                  src={contributor.github + ".png"}
                  alt={contributor.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-dark p-1 dark:border-light"
                />
                <div className="flex flex-row gap-4">
                  <a
                    title="github"
                    href={contributor.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    title="linkedin"
                    href={contributor.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
                <a href={`mailto:${contributor.email}`}>{contributor.email}</a>
                <a href={contributor.website} target="_blank" rel="noreferrer">
                  {contributor.website}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;
