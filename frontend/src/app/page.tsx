"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/actions";
import bearlogoDark from "/public/bearlogoDark.jpg";
import bearlogoBlurredDark from "/public/bearLogoBlurredDark.jpg";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import LoadingSpinner from "@/components/common/ui/loading/LoadingSpinner";
import ToggleTheme from "@/components/common/ui/buttons/ToggleTheme";

const heroText = (text: string, strong: string) => {
  return (
    <h1 className="text-2xl font-thin text-slate-300">
      {text}{" "}
      <strong className="text-3xl font-normal text-white">{strong}</strong>
    </h1>
  );
};

function LandingPage() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div className="relative h-screen w-screen bg-[#1C2121]">
      <div className="absolute inset-0 z-0 mx-auto flex h-screen flex-col justify-center lg:w-1/2 xl:w-1/2">
        <Image
          src={bearlogoDark}
          alt="bear logo"
          //fill
          //objectFit="cover"
          placeholder="blur"
          blurDataURL={bearlogoBlurredDark.src}
          className="m-auto"
        />
      </div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-12 bg-black bg-opacity-80">
        <div className="mx-auto flex w-3/4 flex-col gap-12 lg:w-1/2 xl:w-1/2">
          <div className="flex flex-row items-baseline gap-4">
            <h1 className="text-left text-7xl text-light">asozial</h1>
            <p className="font-serif text-2xl font-light text-light">noun</p>
          </div>
          <p className="text-serif flex flex-row items-center gap-2 text-2xl text-slate-300">
            <strong className="text-2xl font-bold">:</strong>social media for
            the anti-social developer
          </p>
          <div className="row flex flex-col items-center justify-between gap-10 xxs:flex-col xxs:gap-10 xs:flex-col xs:gap-10 sm:flex-col sm:gap-10 md:flex-row md:gap-0 lg:flex-row lg:gap-0 xl:flex-row xl:gap-0 2xl:flex-row 2xl:gap-0">
            <div className="ga-6 flex flex-col">
              {heroText("Find your new", "clique")}
              {heroText("Build something", "sick")}
            </div>
            <form action={signIn} className="flex flex-row justify-end">
              <Button
                className="flex gap-3 bg-zinc-800 px-8"
                type="submit"
                onClick={() => setClicked(true)}
              >
                {clicked ? "Signing in..." : "Sign in with"}
                {clicked ? <LoadingSpinner /> : <FaGithub size={24} />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
