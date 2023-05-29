"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";
import { Button } from "../shared/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import ProfileBio from "./bio";
import Statistics from "./statistics";
import { SafeUser } from "@/types";
import { RefreshCcw } from "lucide-react";
import { GradiantCard } from "../shared/gradiant-card";
import { RefreshCcwIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";

export type MatchPLayedProps = {
  total: number;
};

interface MainAppProps {
  matchPlayed: {
    mode: string;
    total: number;
    winrate: number;
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
  currentUser?: SafeUser | null;
}

const MainApp: React.FC<MainAppProps> = ({
  matchPlayed,
  username,
  ownedHero,
  accId,
  currentUser,
}) => {
  const isOwnProfile = currentUser?.username === username;
  // console.log(currentUser?.username);
  // console.log(username);
  if (username && !accId) {
    return (
      <>
        <div className="flex flex-1 flex-col gap-5 md:flex-row">
          <div className="flex gap-5 text-softGray">
            <ProfileBio username={username} />
          </div>
          <Tabs defaultValue="statistics" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>
              {isOwnProfile && (
                <Button
                  className="h-8 rounded-full px-4 py-2"
                  variant="gradiantNavySec"
                >
                  <Link href="/profile/stg/bind" className="text-[12px]">
                    Bind account
                  </Link>
                </Button>
              )}
            </div>
            <TabsContent
              value="statistics"
              className="flex w-full flex-col gap-4 xl:flex-row"
            >
              <div className="flex w-full flex-col gap-4">
                {!isOwnProfile && (
                  <p className="pl-2 text-sm">
                    This user&apos;s Mobile Legends account hasn&apos;t been
                    bound yet
                  </p>
                )}
                <Statistics
                  matchPlayed={matchPlayed}
                  ownedHero={ownedHero}
                  isBound={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  } else if (username && accId) {
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
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="statistics"
              className="flex h-fit w-full flex-col gap-4 xl:flex-row"
            >
              <Statistics
                matchPlayed={matchPlayed}
                ownedHero={ownedHero}
                isBound={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="mb-48 text-2xl md:ml-3">Profile does not exist</p>
    </div>
  );
};

export default MainApp;
