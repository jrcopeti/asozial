"use client";
import { useThemeContext } from "@/context/ThemeContext";

function Main({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useThemeContext();

  return (
    <main
      className={`flex h-full w-full transform transition-transform duration-300 ease-in-out ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      {children}
    </main>
  );
}

export default Main;
