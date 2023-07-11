"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOutIcon, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";
import Close from "../icons/close";
import Burger from "../icons/burger";
import { Button } from "../button";
import { signOut } from "next-auth/react";
import getCurrentUser from "@/lib/actions/getCurrentUser";

interface NavMenuProps {
  currentUser?: SafeUser | null;
}

const MenuList = [
  {
    name: "Wiki",
    active: false,
    href: "/wiki/heroes",
  },
  {
    name: "Explore",
    active: false,
    href: "/explore",
  },
  {
    name: "Profile",
    active: false,
    href: `/profile`,
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapse, setCollapse] = useState(false);
  const isOwnProfile =
    pathname?.split("/")[1] === "profile" &&
    pathname?.split("/")[2] === currentUser?.username;
  const pathArray = pathname?.split("/");
  const active =
    pathArray?.[1] === "" || pathArray?.[1] === "wiki"
      ? pathArray?.[1]
      : isOwnProfile
      ? pathArray?.[1]
      : "explore";

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
            ? "fixed inset-0 top-[54px] z-10 h-screen bg-bgblack/80"
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
                      : "/profile/stg"
                    : menu.href
                }
                onClick={() => {
                  setCollapse(false);
                  // sessionStorage.clear();
                }}
                key={menu.name}
                prefetch={false}
              >
                <li
                  className={cn(
                    "cursor-pointer font-medium hover:text-navy-300 hover:transition-all hover:duration-300",
                    active === menu.name.toLowerCase() &&
                      "underline:ease-in-out underline decoration-navy-300 decoration-2 underline-offset-4"
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
                  setCollapse(!collapse);
                }}
                className="flex h-6 w-[72px] rounded-2xl p-2"
                variant="gradiantNavy"
              >
                <span className="stroke-[3] text-[16px] text-softGray">
                  Sign In
                </span>
              </Button>
            </li>
          ) : (
            <li className="flex gap-2">
              <Button
                onClick={() => {
                  router.push("/profile/stg");
                  setCollapse(!collapse);
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
