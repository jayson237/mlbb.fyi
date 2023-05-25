"use client";

import getCurrentUser from "@/lib/actions/getCurrentUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";

import ProfileBio from "./bio";
import Statistics from "./statistics";
import { SafeUser } from "@/types";

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
  currentUser?: SafeUser | null;
}

const MainApp: React.FC<MainAppProps> = ({
  matchPlayed,
  username,
  ownedHero,
  accId,
  winRate,
  currentUser,
}) => {
  console.log(currentUser?.username);
  console.log(username);
  if (username && !accId) {
    const isOwnProfile = currentUser?.username === username;
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
            <TabsContent
              value="statistics"
              className="flex w-full flex-col gap-4 xl:flex-row"
            >
              <div className="flex w-full flex-col gap-4">
                <p className="pl-1">
                  {isOwnProfile
                    ? "To check out your stats, please sync your Mobile Legends account on the settings page"
                    : "This user's Mobile Legends account hasn't been linked yet"}
                </p>
                <Statistics
                  matchPlayed={matchPlayed}
                  winRate={winRate}
                  ownedHero={ownedHero}
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
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="mb-48 text-2xl md:ml-3">Profile does not exist</p>
    </div>
  );
};

export default MainApp;
