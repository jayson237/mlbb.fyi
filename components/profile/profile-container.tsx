"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";
import { Button } from "../shared/button";
import Link from "next/link";

import ProfileBio from "./bio";
import Statistics from "./statistics";
import { SafeUser } from "@/types";
import { MlbbAcc } from "@prisma/client";
import { User } from "@prisma/client";

export type MatchPLayedProps = {
  total: number;
};

interface MainAppProps {
  currentUser?: SafeUser | null;
  viewMatchPlayed: {
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
  viewOwnedHero: {
    total: number;
    data: {
      hero: string;
      id: number;
      _id: string;
    }[];
  };
  isProfileUser: User | null;
  isBoundProfileUser?: MlbbAcc | null;
}

const MainApp: React.FC<MainAppProps> = ({
  currentUser,
  viewMatchPlayed,
  viewOwnedHero,
  isProfileUser,
  isBoundProfileUser,
}) => {
  const isOwnProfile = currentUser?.username === isProfileUser?.username;

  if (isProfileUser && !isBoundProfileUser) {
    return (
      <>
        <div className="flex flex-1 flex-col gap-5 md:flex-row">
          <div className="mx-auto flex gap-5 text-softGray">
            <ProfileBio
              currentUser={currentUser}
              user={isProfileUser}
              isOwnProfile={isOwnProfile}
            />
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
                  <Link href="/profile/stg/bind" className="text-[10px]">
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
                  viewMatchPlayed={viewMatchPlayed}
                  viewOwnedHero={viewOwnedHero}
                  isBound={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  } else if (isProfileUser && isBoundProfileUser) {
    return (
      <>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Left */}

          <div className="mx-auto flex gap-5 text-softGray">
            {/* Profile Head */}
            <ProfileBio
              currentUser={currentUser}
              user={isProfileUser}
              mlbbAcc={isBoundProfileUser}
              isOwnProfile={isOwnProfile}
            />
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
              className="flex h-fit w-full flex-col items-center gap-4 xl:flex-row"
            >
              <Statistics
                viewMatchPlayed={viewMatchPlayed}
                viewOwnedHero={viewOwnedHero}
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
