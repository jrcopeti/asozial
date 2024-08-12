"use client";
//React
import { useRef, useState } from "react";

//Next
import Image from "next/image";
import Link from "next/link";

//Hooks
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useCombinedRef from "@/hooks/useCombinedRef";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useSidebarsContext } from "@/context/SidebarsContext";

//UI
import { FaGithub, FaLinkedin, FaRegUserCircle } from "react-icons/fa";
import { IoMenu, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import ToggleTheme from "./ToggleTheme";
import { PiUserCircleGearDuotone, PiUserFocusBold } from "react-icons/pi";
import { TbUserSquareRounded } from "react-icons/tb";
import { Button } from "../ui/button";

const contributors = [
  {
    name: "José Copeti",
    email: "jrcopeti@gmail.com",
    github: "https://github.com/jrcopeti",
    linkedin: "https://www.linkedin.com/in/josecopeti/",
    website: "https://jrcopeti.hashnode.dev/",
  },
  {
    name: "Benjamin Elliott",
    email: "hello@benjamin.dev",
    github: "https://github.com/benjamindotdev",
    linkedin: "https://www.linkedin.com/in/benjamindotdev/",
    website: "https://benjamin.dev",
  },
  {
    name: "Mirko Fede",
    email: "mirko@asozial.com",
    github: "https://github.com/mirkoeffe",
    linkedin: "https://www.linkedin.com/in/mirko-fede/",
    website: "http://mirkoeffe.shop/",
  },
];

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
                variant="outline"
                className="dark:text-light"
                onClick={toggleUserSidebar}
                disabled={
                  width && width <= 640 ? !!isProjectSidebarOpen : undefined
                }
              >
                <IoMenu size={26} />
              </Button>

              <div className="flex items-center gap-1">
                <Link href="/dashboard">
                  <h1 className="cursor-pointer text-2xl">asozial</h1>
                </Link>

                <TbUserSquareRounded size={26} />
              </div>
            </section>

            <section className="flex items-center gap-2" ref={combinedRefs}>
              <button onClick={() => setIsOpen(!isOpen)}>Contributors</button>

              <ToggleTheme />

              <Button
                size="icon"
                variant="outline"
                className="dark:text-light"
                onClick={toggleProjectSidebar}
                disabled={
                  width && width <= 640 ? !!isUserSidebarOpen : undefined
                }
              >
                <IoMenu size={26} />
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
                  className="h-24 w-24 rounded-full border-4 border-dark dark:border-light"
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
