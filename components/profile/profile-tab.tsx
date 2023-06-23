"use client";

import { useState, useEffect } from "react";
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
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const storedTab = window.sessionStorage.getItem("selectedTab");
    setSelectedTab(storedTab || "statistics");
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <Tabs defaultValue="statistics" value={selectedTab} className="w-full">
      <div className="no-scrollbar flex h-[52px] justify-center overflow-x-scroll md:justify-start">
        <TabsList className="flex shrink-0 space-x-2">
          {ProfileTabList.map((item, i) => (
            <Link
              href={`/profile/${isExistingUser?.username + item.href}`}
              key={i}
              scroll={false}
            >
              <TabsTrigger
                value={item.name.toLowerCase()}
                onClick={() => setSelectedTab(item.name.toLowerCase())}
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
