"use client";

import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import { cn } from "@/lib/utils";
import Burger from "../shared/icons/burger";
import Close from "../shared/icons/close";

interface NavMenuProps {
  currentUser?: SafeUser | null;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapse, setCollapse] = useState(false);
  return (
    <>
      {currentUser ? (
        <>
          <div
            className={cn(
              "flex cursor-pointer md:hidden",
              "transition-transform duration-200"
            )}
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            {collapse ? <Close /> : <Burger />}
          </div>
          <div
            className={cn(
              "md:static md:flex md:h-auto md:bg-transparent",
              collapse
                ? "fixed inset-0 top-[54px] z-10 h-screen bg-bgblack"
                : "hidden"
            )}
          >
            <div
              className={cn(
                "md:flex md:flex-row",
                "items-center md:gap-x-4 md:gap-y-0 md:p-0",
                collapse ? "flex flex-col gap-y-4 p-4" : "hidden"
              )}
            >
              <div className="text-sm">Github</div>

              {pathname === "/" ? (
                <Button
                  onClick={() => {
                    router.push("/profile");
                    setCollapse(false);
                  }}
                  className={cn(
                    "h-auto w-auto rounded-md px-6 py-2",
                    collapse && "w-full"
                  )}
                >
                  Profile
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    signOut();
                    router.refresh();
                  }}
                  className={cn(
                    "h-auto w-auto rounded-lg px-6 py-2",
                    collapse && "w-full"
                  )}
                  variant="subtle"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              router.push("/auth/signin");
            }}
            className="h-auto rounded-lg px-6 py-2"
          >
            Signin
          </Button>
        </>
      )}
    </>
  );
};

export default NavMenu;
