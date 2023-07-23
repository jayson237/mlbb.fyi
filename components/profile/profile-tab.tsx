"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { User } from "@prisma/client";
import { Tabs, TabsTrigger, TabsList } from "../shared/tabs";

interface ProfileTabProps {
  ProfileTabList: { name: string; href: string }[];
  isExistingUser?: User | null;
  children: React.ReactNode;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  ProfileTabList,
  isExistingUser,
  children,
}) => {
  const pathname = usePathname();
  const active = pathname?.split("/")[3];
  const [selectedProfileTab, setSelectedProfileTab] = useState(active);

  // useEffect(() => {
  //   const storedProfileTab =
  //     window.sessionStorage.getItem("selectedProfileTab");
  //   setSelectedProfileTab(storedProfileTab || "statistics");
  // }, []);

  // useEffect(() => {
  //   window.sessionStorage.setItem("selectedProfileTab", selectedProfileTab);
  // }, [selectedProfileTab]);

  return (
    <Tabs
      defaultValue="statistics"
      value={selectedProfileTab}
      className="w-full"
    >
      <div className="no-scrollbar flex h-[52px] justify-center overflow-x-scroll md:justify-start">
        <TabsList className="flex shrink-0 space-x-1">
          {ProfileTabList.map((item, i) => (
            <Link
              href={`/profile/${isExistingUser?.username + item.href}`}
              key={i}
              scroll={false}
            >
              <TabsTrigger
                value={item.name.toLowerCase()}
                onClick={() => setSelectedProfileTab(item.name.toLowerCase())}
              >
                {item.name}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export default ProfileTab;
