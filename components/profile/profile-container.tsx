"use client";

import { mlbbaccs } from "@prisma/client";
import { Progress } from "../shared/progress";
import { useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { GradiantCard } from "../shared/gradiant-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";
import Info from "../shared/icons/info";
import { Button } from "../shared/button";

export type MatchPLayedProps = {
  total: number;
};

interface MainAppProps {
  matchPlayed?: {
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
  ownedHero?: {
    total: number;
    data: {
      hero: string;
      id: number;
      _id: string;
    }[];
  };
  username: string;
}

const MainApp: React.FC<MainAppProps> = ({
  matchPlayed,
  username,
  ownedHero,
}) => {
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
              width={203}
              height={203}
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
            className="flex flex-col gap-4 xl:flex-row"
          >
            <div className="flex w-full max-w-lg flex-col gap-y-4 md:w-fit">
              <div className="flex w-full flex-row gap-x-4 md:w-fit">
                <GradiantCard
                  className="md:max-w-[240px] w-full md:w-60"
                  title="Heroes Owned"
                >
                  {/* <Info /> */}
                  <p className="mt-8 text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl">
                    {ownedHero?.total}
                  </p>
                </GradiantCard>
                <GradiantCard
                  className="md:max-w-[240px] w-full md:w-60"
                  title="Matches Played"
                >
                  {/* <Info /> */}
                  <p className="mt-8 text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl">
                    {matchPlayed && matchPlayed[0].total + matchPlayed[1].total}
                  </p>
                </GradiantCard>
              </div>

              <div className="w-full">
                <GradiantCard className="" title="Match Insights">
                  {/* <Info /> */}
                  <div className="mt-4 flex gap-x-4">
                    <GradiantCard title="Ranked">
                      <p className="mt-8 text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl">
                        {matchPlayed && matchPlayed[1]?.total}
                      </p>
                    </GradiantCard>
                    <GradiantCard title="Classic">
                      <p className="mt-8 text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl">
                        {matchPlayed && matchPlayed[0].total}
                      </p>
                    </GradiantCard>
                  </div>
                </GradiantCard>
              </div>
            </div>

            <div className="flex w-full max-w-lg flex-col gap-4">
              <GradiantCard title="Classic Favourites">
                {matchPlayed &&
                  matchPlayed[0].data.map((data: any, i: number) => {
                    return (
                      <div key={i} className="mt-3">
                        <div className="flex justify-between">
                          <p className="text-sm">
                            {data.name} - {data.total}
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
              <GradiantCard title="Ranked Favourites">
                {matchPlayed &&
                  matchPlayed[1].data.map((data: any, i: number) => {
                    return (
                      <div key={i} className="mt-3">
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

          <TabsContent value="posts">
            <p className="pl-2">User Posts</p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MainApp;
