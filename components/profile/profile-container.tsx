"use client";

import { mlbbaccs } from "@prisma/client";
import { Progress } from "../shared/progress";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../shared/button";
import Link from "next/link";
import { ITopPlayed } from "@/lib/actions/getTopPlayedHero";
import Image from "next/image";
import CardBlack from "../shared/card-black";

import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";

export type MatchPLayedProps = {
  totalClassic: number | 0;
  totalRanked: number | 0;
};

interface MainAppProps {
  // currentUser: SafeUser | null;
  mlbbAcc: mlbbaccs | null | undefined;
  matchPlayed: MatchPLayedProps;
  winRate: {
    totalClassic: number | 0;
    totalRanked: number | 0;
  };
  ownedHero: any;
  err: boolean;
  mlbbBind: boolean;
  topPlayedHero: {
    topPlayedClassic: ITopPlayed[];
    topPlayedRanked: ITopPlayed[];
  };
}

const MainApp: React.FC<MainAppProps> = ({
  mlbbAcc,
  matchPlayed,
  winRate,
  ownedHero,
  err,
  mlbbBind,
  topPlayedHero,
}) => {
  useEffect(() => {
    if (err) {
      toast.error("Failed to fetch data");
      return () => {
        toast.error("Failed to fetch data");
      };
    }
  }, [err]);

  if (!mlbbBind) {
    return (
      <div className="max-w-[100px]">
        <p className="text-2xl font-semibold leading-6">Welcome</p>
        <Link href="/profile/bind">
          <Button>MLBB Bind</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row gap-5">
        {/* Left */}
        <div className="flex gap-5 text-softGray">
          <div className="w-fit">
            {/* Profile Head */}
            <CardBlack>
              <Image src={""} alt="" width={280} height={280} />
              <h1 className="mt-3 text-center font-heading text-xl">
                {mlbbAcc?.nickname}
              </h1>
              <button className="mx-auto mt-2 flex w-fit justify-center rounded-2xl bg-sblack px-10 font-heading">
                Follow
              </button>

              <div className="mt-4 flex flex-row justify-between px-8 font-heading">
                <div className="flex flex-col text-center">
                  <p className="text-2xl">123</p>
                  <p className="text-[14px]">FOLLOWING</p>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-2xl">1000</p>
                  <p className="text-[14px]">FOLLOWERS</p>
                </div>
              </div>
            </CardBlack>
          </div>
        </div>

        {/* Right */}
        <Tabs defaultValue="statistics" className="w-full">
          <TabsList>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="statistics" className="flex gap-5">
            <div className="flex h-fit w-fit flex-col gap-5">
              <div className="flex h-fit w-fit flex-row gap-x-5">
                <CardBlack className="w-72">
                  <h1 className="font-bold tracking-[-3%]">Hero Owned</h1>
                  <Info className="absolute right-5 top-5 text-softGray" />
                  <p className="mt-9 text-right text-3xl font-bold">
                    {ownedHero}
                  </p>
                </CardBlack>
                <CardBlack className="w-72">
                  <h1 className="font-bold tracking-[-3%]">Match Played</h1>
                  <Info className="absolute right-5 top-5 text-softGray" />
                  <p className="mt-9 text-right text-3xl font-bold">
                    {matchPlayed.totalClassic + matchPlayed.totalRanked}
                  </p>
                </CardBlack>
              </div>

              <div className="w-full">
                <CardBlack className="">
                  <h1 className="font-bold tracking-[-3%]">Match Insight</h1>
                  <Info className="absolute right-5 top-5 text-softGray" />
                  <div className="mt-4 flex gap-x-5">
                    <CardBlack>
                      <h2 className="font-bold tracking-[-3%]">
                        Ranked Matches
                      </h2>
                      <p className="mt-9 text-right text-3xl font-bold">{matchPlayed.totalRanked}</p>
                    </CardBlack>
                    <CardBlack>
                      <h2 className="font-bold tracking-[-3%]">
                        Classic Matches
                      </h2>
                      <p className="mt-9 text-right text-3xl font-bold">{matchPlayed.totalRanked}</p>
                    </CardBlack>
                  </div>
                </CardBlack>
              </div>
            </div>

            <div className="flex w-full flex-col gap-5">
              <CardBlack>
                <h1 className="mb-4 font-bold tracking-[-3%]">
                  Classic Top 5 Played
                </h1>
                {topPlayedHero?.topPlayedClassic.map((data, i) => {
                  return (
                    <div key={i}>
                      <div className="flex justify-between">
                        <p className="text-sm">
                          {data.name} - {data.total}x
                        </p>
                        <p className="text-sm">
                          {((data.win * 100) / data.total).toFixed(2)}%
                        </p>
                      </div>
                      <Progress
                        value={(data.win * 100) / data.total}
                        max={100}
                        className="mb-2"
                      />
                    </div>
                  );
                })}
              </CardBlack>
              <CardBlack>
                <h1 className="mb-4 font-bold tracking-[-3%]">
                  Ranked Top 5 Played
                </h1>
                {topPlayedHero?.topPlayedRanked.map((data, i) => {
                  return (
                    <div key={i}>
                      <div className="flex justify-between">
                        <p className="text-sm">
                          {data.name} - {data.total}x
                        </p>
                        <p className="text-sm">
                          {((data.win * 100) / data.total).toFixed(2)}%
                        </p>
                      </div>
                      <Progress
                        value={(data.win * 100) / data.total}
                        max={100}
                        className="mb-2"
                      />
                    </div>
                  );
                })}
              </CardBlack>
            </div>
          </TabsContent>

          <TabsContent value="posts">User Posts</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MainApp;
