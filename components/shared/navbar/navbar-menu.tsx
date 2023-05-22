"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogInIcon, LogOutIcon, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";
import Close from "../icons/close";
import Burger from "../icons/burger";
import { Button } from "../button";
import { signOut } from "next-auth/react";

interface NavMenuProps {
  currentUser?: SafeUser | null;
}

const MenuList = [
  {
    name: "Wiki",
    active: false,
    href: "/wiki",
  },
  {
    name: "Explore",
    active: false,
    href: "/explore",
  },
  {
    name: "Profile",
    active: false,
    href: "/profile",
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapse, setCollapse] = useState(false);

  const active = pathname?.split("/")[1];

  return (
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
        <ul
          className={cn(
            "md:flex md:flex-row",
            "items-center md:gap-x-6 md:gap-y-0 md:p-0",
            collapse ? "flex flex-col gap-y-4 p-4 font-semibold" : "hidden"
          )}
        >
          {MenuList.map((menu) => {
            if (menu.name === "Profile" && !currentUser) {
              return null;
            }
            return (
              <Link
                href={
                  menu.href === "/profile"
                    ? currentUser?.username
                      ? `/profile/${currentUser?.username}`
                      : "/profile"
                    : menu.href
                }
                onClick={() => {
                  setCollapse(false);
                }}
                key={menu.name}
                prefetch={false}
              >
                <li
                  className={cn(
                    "cursor-pointer font-medium hover:text-gray-300 hover:transition-all hover:duration-300",
                    active === menu.name.toLowerCase() &&
                      "underline decoration-navy-400 decoration-2 underline-offset-4"
                  )}
                >
                  {menu.name}
                </li>
              </Link>
            );
          })}

          {!currentUser ? (
            <li>
              <Button
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className="h-8 w-8 rounded-full p-2"
                variant="gradiantNavy"
              >
                <LogInIcon className="stroke-[3] text-softGray" />
              </Button>
            </li>
          ) : (
            <li className="flex gap-2">
              <Button
                onClick={() => {
                  router.push("/profile/settings");
                }}
                className="group h-8 w-8 rounded-full p-2"
                variant="gradiantNavy"
              >
                <Settings className="stroke-[3] text-softGray group-hover:rotate-180 group-hover:transition-all group-hover:duration-500" />
              </Button>
              <Button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="h-8 w-8 rounded-full p-2"
                variant="gradiantNavy"
              >
                <LogOutIcon className="stroke-[3] text-softGray" />
              </Button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavMenu;
