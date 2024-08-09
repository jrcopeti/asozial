"use client";
//React
import { useRef, useState } from "react";

//Next
import Image from "next/image";
import Link from "next/link";

//Hooks
import { useProjectSidebar } from "@/hooks/useProjectSidebar";
import { useThemeContext } from "@/context/ThemeContext";
import { useUserSidebar } from "@/hooks/useUserSidebar";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useCombinedRef from "@/hooks/useCombinedRef";
import { useWindowWidth } from "@/hooks/useWindowWidth";

//UI
import { FaGithub, FaLinkedin, FaRegUserCircle } from "react-icons/fa";
import { IoMenu, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

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

  const { toggleProjectSidebar, projectHeaderRef, isProjectSidebarOpen } =
    useProjectSidebar();

  const { toggleUserSidebar, userHeaderRef, isUserSidebarOpen } =
    useUserSidebar();

  const navRef = useRef<HTMLDivElement>(null);
  useOutsideClick(() => setIsOpen(false), navRef);
  const mergedRefs = useCombinedRef(navRef, projectHeaderRef, userHeaderRef);

  const { width } = useWindowWidth();

  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <nav
        ref={mergedRefs}
        className={`sticky top-0 z-40 flex w-full justify-between gap-2 border-b-2 px-6 py-2 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
      >
        {!isOpen && (
          <>
            <section className="flex items-center gap-2">
              <Link href="/dashboard">
                <h1 className="cursor-pointer text-2xl">asozial</h1>
              </Link>

              <button
                onClick={toggleUserSidebar}
                disabled={
                  width && width <= 640 ? !!isProjectSidebarOpen : undefined
                }
              >
                <FaRegUserCircle size={20} />
              </button>
            </section>

            <section className="flex items-center gap-2">
              <button onClick={() => setIsOpen(!isOpen)}>Contributors</button>
              <button className="" onClick={toggleTheme}>
                {theme === "light" ? (
                  <IoSunnyOutline size={26} />
                ) : (
                  <IoMoonOutline size={22} />
                )}
              </button>

              <button
                onClick={toggleProjectSidebar}
                disabled={
                  width && width <= 640 ? !!isUserSidebarOpen : undefined
                }
              >
                <IoMenu size={26} />
              </button>
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
                  className={`h-24 w-24 rounded-full border-4 ${theme === "light" ? "border-dark" : "border-light"}`}
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
