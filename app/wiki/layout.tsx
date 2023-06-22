"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/tabs";
import Link from "next/link";

const WikiTabList = [
  {
    name: "Heroes",
    href: "/wiki/heroes",
  },
  {
    name: "Statistics",
    href: "/wiki/statistics",
  },
  {
    name: "Draft Pick",
    href: "/wiki/draft-pick",
  },
  {
    name: "Patch",
    href: "/wiki/patches",
  },
];

export interface LayoutWikiProps {
  children: React.ReactNode;
}

export default function LayoutWiki({ children }: LayoutWikiProps) {
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const storedTab = window.sessionStorage.getItem("selectedTab");
    setSelectedTab(storedTab || "heroes");
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <main>
      <h1 className="ml-3 max-w-4xl font-heading text-2xl leading-10 md:text-4xl">
        mlbb.fyi wiki, your latest and greatest Mobile Legends information in
        one place
      </h1>

      <Tabs value={selectedTab} defaultValue="heroes" className="mt-4 w-full">
        <div className="no-scrollbar h-[52px] overflow-x-scroll">
          <TabsList className="flex shrink-0 space-x-4">
            {WikiTabList.map((item, i) => (
              <Link href={item.href} key={i} scroll={false}>
                <TabsTrigger
                  value={item.href.split("/")[2]}
                  onClick={() => setSelectedTab(item.href.split("/")[2])}
                >
                  {item.name}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </div>
        {children}
      </Tabs>
    </main>
  );
}
