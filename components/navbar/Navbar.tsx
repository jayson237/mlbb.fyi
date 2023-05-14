import { cn } from "@/lib/utils";

import React from "react";

import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import { SafeUser } from "@/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-30 py-3 after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:w-[80rem] after:border-b-[1px] after:border-slate-100 after:opacity-20 xl:mx-auto",
        "w-full px-4"
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <NavLogo />
          <NavMenu currentUser={currentUser} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
