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
      )}
    >
      <div className="mx-auto flex max-w-[1080px] items-center justify-between">
        <NavLogo />
        <NavMenu currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
