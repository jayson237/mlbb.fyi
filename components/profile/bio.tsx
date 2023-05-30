"use client";

import { GradiantCard } from "../shared/gradiant-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shared/tabs";
import Image from "next/image";
import { Button } from "../shared/button";
import { MlbbAcc } from "@prisma/client";
import { SafeUser } from "@/types";

export default function ProfileBio({
  username,
  mlbbAcc,
  userDesc,
  isOwnProfile,
}: {
  username: string;
  mlbbAcc?: MlbbAcc | null;
  userDesc?: string | null;
  isOwnProfile: boolean;
}) {
  return (
    <div className="flex-col">
      {/* Profile Head */}
      <GradiantCard className="mx-auto h-fit w-[15rem] max-w-full md:mx-0">
        <Image
          src={"/nana.jpg"}
          alt=""
          width={150}
          height={150}
          className="mx-auto rounded-full"
        />
        <h1 className="mt-3 text-center font-heading text-xl">{username}</h1>
        {!isOwnProfile && (
          <Button
            className="mx-auto mt-2 flex h-fit w-fit justify-center rounded-2xl px-10 py-1"
            variant="gradiantNavySec"
          >
            Follow
          </Button>
        )}

        <div className="mt-4 flex flex-row justify-between px-3 font-heading">
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

      <GradiantCard className="mx-auto mt-5 h-fit w-[15rem] max-w-full font-medium md:mx-0">
        <div className="flex flex-col">
          <p className={`${mlbbAcc ? "" : "hidden"}`}>
            ID: {mlbbAcc ? mlbbAcc.accId : "-"}
          </p>
          <p className={`${mlbbAcc ? "" : "hidden"}`}>
            IGN: {mlbbAcc ? mlbbAcc.nickname : "-"}
          </p>
          <p className="my-2 text-sm font-normal">{userDesc}</p>
        </div>
      </GradiantCard>
    </div>
  );
}
