"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";
import NavLogo from "./navbar-logo";
import NavMenu from "./navbar-menu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-30 mx-auto w-full bg-transparent px-4 py-3 backdrop-blur-lg"
        // "text-primary sticky top-0 z-10 w-full bg-zinc-100/30 backdrop-blur-xl",
        // "dark:bg-primary/30 dark:border-zinc-100 dark:text-zinc-100"
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <NavLogo />
        <NavMenu currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
