"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

import { revalPath } from "@/lib/revalidate";

import { Button } from "@/components/shared/button";
import FolDialog from "@/components/fol-dialog";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { SafeUser } from "@/types";

interface ViewDialogProps {
  baseInfo?: {
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  };
  currentUser?: SafeUser | null;
}

const ViewDialog: React.FC<ViewDialogProps> = ({ baseInfo, currentUser }) => {
  const path = usePathname();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [following, setFollowing] = useState<
    {
      id: string;
      name: string;
      username: string;
      image: string;
    }[]
  >();
  const [followers, setFollowers] = useState<
    {
      id: string;
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
          <ul className="flex flex-col">
            {following?.map((fol, i) => {
              let isOwnProfile = currentUser?.username === fol?.username;
              let isFollowing = currentUser?.following.includes(
                fol?.id as string
              );
              let username = fol?.username;
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-row items-center rounded-lg pr-2 hover:bg-zinc-100/5">
                    <Link
                      href={`/profile/${fol.username}/statistics`}
                      className="w-full rounded-lg"
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
                    <div className="mb-3 ml-auto flex">
                      {!isOwnProfile && !isFollowing && (
                        <Button
                          className="mx-auto mt-2 flex h-7 w-28 justify-center rounded-2xl px-10 py-1"
                          disabled={buttonDisabled}
                          variant="gradiantNavySec"
                          onClick={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            setButtonDisabled(true);

                            const set = await fetch(
                              `/profile/${currentUser?.username}/api/follow`,
                              {
                                method: "POST",
                                body: JSON.stringify({ username }),
                              }
                            );
                            const msg = await set.json();
                            if (!set.ok) {
                              setLoading(false);
                              setButtonDisabled(false);
                              toast.error(msg.message);
                            } else {
                              revalPath(path || "/explore");
                              setLoading(false);
                              setButtonDisabled(false);
                            }
                          }}
                        >
                          {loading ? (
                            <>
                              <LoadingDots color="#FAFAFA" />
                            </>
                          ) : (
                            "Follow"
                          )}
                        </Button>
                      )}
                      {!isOwnProfile && isFollowing && (
                        <Button
                          className="mx-auto mt-2 flex h-7 w-28 justify-center rounded-2xl px-10 py-1"
                          disabled={buttonDisabled}
                          onClick={async (e) => {
                            e.preventDefault();
                            setButtonDisabled(true);
                            setLoading(true);
                            const set = await fetch(
                              `/profile/${currentUser?.username}/api/unfollow`,
                              {
                                method: "POST",
                                body: JSON.stringify({ username }),
                              }
                            );
                            const msg = await set.json();
                            if (!set.ok) {
                              setLoading(false);
                              setButtonDisabled(false);
                              toast.error(msg.message);
                            } else {
                              revalPath(path || "/explore");
                              setLoading(false);
                              setButtonDisabled(false);
                            }
                          }}
                        >
                          {loading ? (
                            <>
                              <LoadingDots color="#FAFAFA" />
                            </>
                          ) : (
                            "Unfollow"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
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
          <ul className="flex flex-col">
            {followers?.map((fol, i) => {
              let isOwnProfile = currentUser?.username === fol?.username;
              let isFollowing = currentUser?.following.includes(
                fol?.id as string
              );
              let username = fol?.username;
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-row items-center rounded-lg pr-2 hover:bg-zinc-100/5">
                    <Link
                      href={`/profile/${fol.username}/statistics`}
                      className="w-full rounded-lg"
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
                    <div className="mb-3 ml-auto flex">
                      {!isOwnProfile && !isFollowing && (
                        <Button
                          className="mx-auto mt-2 flex h-7 w-28 justify-center rounded-2xl px-10 py-1"
                          disabled={buttonDisabled}
                          variant="gradiantNavySec"
                          onClick={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            setButtonDisabled(true);

                            const set = await fetch(
                              `/profile/${currentUser?.username}/api/follow`,
                              {
                                method: "POST",
                                body: JSON.stringify({ username }),
                              }
                            );
                            const msg = await set.json();
                            if (!set.ok) {
                              setLoading(false);
                              setButtonDisabled(false);
                              toast.error(msg.message);
                            } else {
                              revalPath(path || "/explore");
                              setLoading(false);
                              setButtonDisabled(false);
                            }
                          }}
                        >
                          {loading ? (
                            <>
                              <LoadingDots color="#FAFAFA" />
                            </>
                          ) : (
                            "Follow"
                          )}
                        </Button>
                      )}
                      {!isOwnProfile && isFollowing && (
                        <Button
                          className="mx-auto mt-2 flex h-7 w-28 justify-center rounded-2xl px-10 py-1"
                          disabled={buttonDisabled}
                          onClick={async (e) => {
                            e.preventDefault();
                            setButtonDisabled(true);
                            setLoading(true);
                            const set = await fetch(
                              `/profile/${currentUser?.username}/api/unfollow`,
                              {
                                method: "POST",
                                body: JSON.stringify({ username }),
                              }
                            );
                            const msg = await set.json();
                            if (!set.ok) {
                              setLoading(false);
                              setButtonDisabled(false);
                              toast.error(msg.message);
                            } else {
                              revalPath(path || "/explore");
                              setLoading(false);
                              setButtonDisabled(false);
                            }
                          }}
                        >
                          {loading ? (
                            <>
                              <LoadingDots color="#FAFAFA" />
                            </>
                          ) : (
                            "Unfollow"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </ul>
        </FolDialog>
      </div>
    </div>
  );
};

export default ViewDialog;
