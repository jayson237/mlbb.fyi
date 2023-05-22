"use client";

import { mlbbaccs } from "@prisma/client";
import { Progress } from "../shared/progress";
import { useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { GradiantCard } from "../shared/gradiant-card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";
import Info from "../shared/icons/info";
import { Button } from "../shared/button";
import ProfileBio from "./bio";
import Statistics from "./statistics";

export type MatchPLayedProps = {
  total: number;
};

interface MainAppProps {
  matchPlayed: {
    mode: string;
    total: number;
    data: {
      id: string;
      total: number;
      win: number;
      name: string;
      _id: string;
    }[];
  }[];
  ownedHero: {
    total: number;
    data: {
      hero: string;
      id: number;
      _id: string;
    }[];
  };
  username: string;
  accId?: string | null;
  winRate: {
    totalClassic: number | 0;
    totalRanked: number | 0;
  } | null;
}

const MainApp: React.FC<MainAppProps> = ({
  matchPlayed,
  username,
  ownedHero,
  accId,
  winRate,
}) => {
  if (username && !accId) {
    return (
      <>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex gap-5 text-softGray">
            <ProfileBio username={username} />
          </div>
          <Tabs defaultValue="statistics" className="w-full">
            <TabsList>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Left */}

        <div className="flex gap-5 text-softGray">
          {/* Profile Head */}
          <ProfileBio username={username} />
        </div>

        {/* Right */}
        <Tabs defaultValue="statistics" className="w-full">
          <TabsList>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent
            value="statistics"
            className="flex w-full flex-col gap-4 xl:flex-row"
          >
            <Statistics
              matchPlayed={matchPlayed}
              winRate={winRate}
              ownedHero={ownedHero}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MainApp;
