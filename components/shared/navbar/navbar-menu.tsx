"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogInIcon, LogOutIcon } from "lucide-react";

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
    name: "Github",
    active: false,
    href: "/github",
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
  const active = pathname?.split("/")[1];
  console.log("currentUser", currentUser);

  const [collapse, setCollapse] = useState(false);
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
          {MenuList.map((menu) => (
            <Link href={menu.href} key={menu.name} prefetch={false}>
              <li
                className={cn(
                  "cursor-pointer",
                  active === menu.name.toLowerCase() &&
                    "underline decoration-softBlue underline-offset-4"
                )}
              >
                {menu.name}
              </li>
            </Link>
          ))}
          {!currentUser ? (
            <li>
              <Button
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className="h-8 w-8 rounded-full bg-softGray p-2"
              >
                <LogInIcon className="translate-x-[-0.5px] stroke-2 font-black text-black" />
              </Button>
            </li>
          ) : (
            <li>
              <Button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="h-8 w-8 rounded-full bg-softGray p-2"
              >
                <LogOutIcon className="translate-x-[-0.5px] font-bold text-black" />
              </Button>
              {currentUser.email}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavMenu;
