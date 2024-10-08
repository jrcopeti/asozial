import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import AsozialLogo from "../ui/image/AsozialLogo";
import ContributorsImages from "./ContributorsImages";

function NavbarAsozialMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:scale-110">
        <span className="hidden xxs:hidden xs:hidden sm:hidden md:hidden lg:block lg:text-2xl xl:block xl:text-2xl">
          asozial
        </span>
        <span className="block lg:hidden xl:hidden">
          <AsozialLogo />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row items-center gap-2 text-xs italic">
          anti-social media since 2024
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer text-lg">
          <Link
            href="/about"
            className="flex w-full flex-row items-center justify-between gap-2 px-2"
          >
            <AsozialLogo /> about
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-lg">
          <Link
            href="/contributors"
            className="flex w-full flex-row items-center justify-between gap-2 px-2"
          >
            <ContributorsImages />
            contributors
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavbarAsozialMenu;
