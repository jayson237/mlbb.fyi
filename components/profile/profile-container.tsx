"use client";

import { mlbbaccs } from "@prisma/client";
import { Progress } from "../shared/progress";
import { useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import GradiantCard from "../shared/gradiant-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";
import Info from "../shared/icons/info";
import { Button } from "../shared/button";

export type MatchPLayedProps = {
  total: number;
};

interface MainAppProps {
  // currentUser: SafeUser | null;
  mlbbAcc?: mlbbaccs | null | undefined;
  matchPlayed?: any[];
  winRate?: {
    total: number;
  };
  ownedHero?: any;
  err?: boolean;
  mlbbBind?: boolean;
  username: string;
}

const MainApp: React.FC<MainAppProps> = ({
  mlbbAcc,
  matchPlayed,
  username,
  winRate,
  ownedHero,
  err,
  mlbbBind,
}) => {
  useEffect(() => {
    if (err) {
      toast.error("Failed to fetch data");
      return () => {
        toast.error("Failed to fetch data");
      };
    }
  }, [err]);

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Left */}
        <div className="flex gap-5 text-softGray">
          {/* Profile Head */}
          <GradiantCard className="mx-auto h-fit w-[18rem] max-w-full md:mx-0">
            <Image
              src={"/nana.jpg"}
              alt=""
              width={225}
              height={225}
              className="mx-auto rounded-full"
            />
            <h1 className="mt-3 text-center font-heading text-xl">
              {username}
            </h1>
            <Button
              className="mx-auto mt-2 flex h-fit w-fit justify-center rounded-2xl px-10 py-1"
              variant="gradiantNavySec"
            >
              Follow
            </Button>

            <div className="mt-4 flex flex-row justify-between px-8 font-heading">
              <div className="flex flex-col text-center">
                <p className="text-xl">123</p>
                <p className="text-[14px]">FOLLOWING</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-xl">1000</p>
                <p className="text-[14px]">FOLLOWERS</p>
              </div>
            </div>
          </GradiantCard>
        </div>

        {/* Right */}
        <Tabs defaultValue="statistics" className="w-full">
          <TabsList>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent
            value="statistics"
            className="flex flex-col gap-5 xl:flex-row"
          >
            <div className="flex w-full max-w-lg flex-col gap-y-5 md:w-fit">
              <div className="flex w-full flex-row gap-x-5 md:w-fit">
                <GradiantCard className="w-full md:w-60 md:max-w-[240px]">
                  <h1 className="font-bold tracking-[-3%]">Hero Owned</h1>
                  <Info />
                  <p className="mt-9 text-right text-3xl font-bold">
                    {ownedHero.total}
                  </p>
                </GradiantCard>
                <GradiantCard className="w-full md:w-60 md:max-w-[240px]">
                  <h1 className="font-bold tracking-[-3%]">Match Played</h1>
                  <Info />
                  <p className="mt-9 text-right text-3xl font-bold">
                    {matchPlayed && matchPlayed[0].total + matchPlayed[1].total}
                  </p>
                </GradiantCard>
              </div>

              <div className="w-full">
                <GradiantCard className="">
                  <h1 className="font-bold tracking-[-3%]">Match Insight</h1>
                  <Info />
                  <div className="mt-4 flex gap-x-5">
                    <GradiantCard>
                      <h2 className="font-bold tracking-[-3%]">
                        Ranked Matches
                      </h2>
                      <p className="mt-9 text-right text-3xl font-bold">
                        {matchPlayed && matchPlayed[1].total}
                      </p>
                    </GradiantCard>
                    <GradiantCard>
                      <h2 className="font-bold tracking-[-3%]">
                        Classic Matches
                      </h2>
                      <p className="mt-9 text-right text-3xl font-bold">
                        {matchPlayed && matchPlayed[0].total}
                      </p>
                    </GradiantCard>
                  </div>
                </GradiantCard>
              </div>
            </div>

            <div className="flex w-full max-w-lg flex-col gap-5">
              <GradiantCard>
                <h1 className="mb-4 font-bold tracking-[-3%]">
                  Classic Top 5 Played
                </h1>
                {matchPlayed &&
                  matchPlayed[0].data.map((data: any, i: number) => {
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
              </GradiantCard>
              <GradiantCard>
                <h1 className="mb-4 font-bold tracking-[-3%]">
                  Ranked Top 5 Played
                </h1>
                {matchPlayed &&
                  matchPlayed[1].data.map((data: any, i: number) => {
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
              </GradiantCard>
            </div>
          </TabsContent>

          <TabsContent value="posts">User Posts</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MainApp;
