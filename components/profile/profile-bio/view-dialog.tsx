"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FolDialog from "@/components/fol-dialog";

interface ViewDialogProps {
  baseInfo?: {
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  };
}

const ViewDialog: React.FC<ViewDialogProps> = ({ baseInfo }) => {
  const [following, setFollowing] = useState<
    {
      name: string;
      username: string;
      image: string;
    }[]
  >();
  const [followers, setFollowers] = useState<
    {
      name: string;
      username: string;
      image: string;
    }[]
  >();
  return (
    <div className="mt-6 flex flex-row justify-between px-3 font-sat font-semibold">
      <div
        onClick={async () => {
          const get = await fetch(
            `/api/user/fol-info?type=following&username=${baseInfo?.username}`
          );
          const data = await get.json();
          setFollowing(data);
        }}
      >
        <FolDialog
          title="Following"
          triggerChild={
            <div className="flex cursor-pointer flex-col rounded-lg px-3 text-center duration-500 hover:bg-zinc-50/0">
              <p className="font-sat text-xl font-semibold">
                {baseInfo?.following.length}
              </p>
              <p className="text-[12px]">FOLLOWING</p>
            </div>
          }
        >
          <ul className="flex flex-col items-start">
            {following?.map((fol, i) => (
              <Link
                key={i}
                href={`/profile/${fol.username}`}
                className="w-full rounded-lg hover:bg-zinc-100/5"
              >
                <li className="flex items-center gap-4 p-2">
                  <Image
                    src={fol.image || "/nana.jpg"}
                    alt="pic"
                    width={44}
                    height={44}
                    className="rounded-full"
                    priority
                  />
                  <div>
                    <p>{fol.username}</p>

                    <p className="text-sm font-medium text-zinc-500">
                      {fol.name}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </FolDialog>
      </div>
      <div>
        <FolDialog
          title="Followers"
          triggerChild={
            <div
              className="flex cursor-pointer flex-col rounded-lg px-3 text-center duration-500 hover:bg-zinc-50/0"
              onClick={async () => {
                const get = await fetch(
                  `/api/user/fol-info?type=followers&username=${baseInfo?.username}`
                );
                const data = await get.json();
                setFollowers(data);
              }}
            >
              <p className="font-sat text-xl font-semibold">
                {baseInfo?.followers.length}
              </p>
              <p className="text-[12px]">FOLLOWER</p>
            </div>
          }
        >
          <ul className="flex flex-col items-start">
            {followers?.map((fol, i) => (
              <Link
                key={i}
                href={`/profile/${fol.username}`}
                className="w-full rounded-lg hover:bg-zinc-100/5"
              >
                <li className="flex items-center gap-4 p-2">
                  <Image
                    src={fol.image || "/nana.jpg"}
                    alt="pic"
                    width={44}
                    height={44}
                    className="rounded-full"
                    priority
                  />
                  <div>
                    <p>{fol.username}</p>
                    <p className="text-sm font-medium text-zinc-500">
                      {fol.name}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </FolDialog>
      </div>
    </div>
  );
};

export default ViewDialog;
