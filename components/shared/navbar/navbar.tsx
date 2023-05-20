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
        "fixed inset-x-0 top-0 z-30 block bg-transparent py-3 backdrop-blur-sm xl:mx-auto",
        "w-full px-4"
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between">
          <NavLogo />
          <NavMenu currentUser={currentUser} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:w-[80rem] after:border-b-[1px] after:border-slate-100 after:opacity-20
