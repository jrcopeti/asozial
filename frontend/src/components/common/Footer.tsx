"use client";
//Next
import Image from "next/image";

//Hooks
import { useThemeContext } from "@/context/ThemeContext";

function Footer() {
  const techStack = [
    {
      name: "Next.js",
      url: "https://nextjs.org/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/",
      icon: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
    },
    {
      name: "Node.js",
      url: "https://nodejs.org/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    },
    {
      name: "Express",
      url: "https://expressjs.com/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
    },
    {
      name: "Mongoose",
      url: "https://mongoosejs.com/",
      icon: "https://avatars.githubusercontent.com/u/7552965?s=400&v=4",
    },
  ];

  const { theme } = useThemeContext();

  return (
    <nav
      className={`h-10vh border-t-1 z-50 flex flex-col items-center gap-2 pb-2 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      <h1 className="text-base md:text-xl">
        A social app for asozial devs - 2024 ©
      </h1>
      <ul className="flex flex-row flex-wrap gap-6 font-sans">
        {techStack.map((tech) => (
          <li key={tech.name} className="flex flex-row items-center gap-2">
            <Image
              src={tech.icon}
              alt={tech.name}
              className="h-auto w-5 sm:h-auto sm:w-8 md:h-auto md:w-10"
              width={
                tech.name === "Next.js" ||
                tech.name === "Express" ||
                tech.name === "MongoDB"
                  ? 60
                  : 30
              }
              height={
                tech.name === "Next.js" ||
                tech.name === "Express" ||
                tech.name === "MongoDB"
                  ? 60
                  : 30
              }
            />
            <a title="url" href={tech.url} target="_blank" rel="noreferrer"></a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Footer;
