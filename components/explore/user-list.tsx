"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { postFetcher } from "@/lib/utils";
import useMut from "@/lib/state/useMut";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import useSWR from "swr";
import Link from "next/link";
import { SafeUser } from "@/types";
import { AlertTriangle, User } from "lucide-react";
import Loading from "@/components/shared/loading";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { revalPath } from "@/lib/revalidate";

interface UserListProps {
  filter: string;
  currentUser?: SafeUser | null;
}

const UserList: React.FC<UserListProps> = ({ filter, currentUser }) => {
  const router = useRouter();
  const togMut = useMut();
  const { data: users, mutate } = useSWR(
    ["/api/search-users", filter],
    postFetcher
  );
  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  if (users === "empty") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <AlertTriangle className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          User not found
        </p>
      </div>
    );
  }

  if (users === "not searched") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <User className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          Please insert username
        </p>
      </div>
    );
  }

  if (users === "invalid") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <AlertTriangle className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          Invalid input
        </p>
      </div>
    );
  }

  if (users) {
    return (
      <div>
        <GradiantCard variant="clean" className="mt-3">
          <ul className="mt-3 flex flex-col gap-5">
            {users.map((user: SafeUser, index: number) => {
              let isOwnProfile = currentUser?.username === user?.username;
              let isFollowing = currentUser?.following.includes(
                user?.id as string
              );
              let username = user?.username;
              return (
                <div
                  key={user.id}
                  className={`relative items-start py-5 ${
                    index + 1 < users.length ? "pb-16" : "pb-12"
                  }`}
                >
                  <div className="flex flex-row items-center">
                    <Image
                      src={user.image || "/nana.jpg"}
                      alt={user.name as string}
                      width={48}
                      height={48}
                      className="mr-4 h-12 w-12 rounded-full"
                    />
                    <div className="flex w-32 flex-col">
                      <Link
                        className="cursor-pointer text-2xl font-bold duration-300 hover:underline hover:decoration-white hover:underline-offset-2"
                        href={`/profile/${user.username}/statistics`}
                        target="_blank"
                      >
                        <p className=" font-heading text-[18px]">
                          {user.username}
                        </p>
                      </Link>
                      <p className="hidden text-gray-400 sm:block">
                        {user.name}
                      </p>
                    </div>

                    <div className="flex w-60 flex-row items-center gap-x-10">
                      <div className="hidden flex-col space-y-1 text-center sm:block">
                        <p className="font-sat text-xl font-semibold">
                          {user.following.length}
                        </p>
                        <p className=" font-heading text-sm">FOLLOWING</p>
                      </div>
                      <div className="hidden flex-col space-y-1 text-center sm:block">
                        <p className="font-sat text-xl font-semibold">
                          {user.followers.length}
                        </p>
                        <p className="font-heading text-sm">FOLLOWER</p>
                      </div>
                    </div>
                    <div className="grow" />
                    <div className="ml-auto flex">
                      {!isOwnProfile && !isFollowing && (
                        <Button
                          className="mx-auto mt-2 flex h-8 w-28 justify-center rounded-2xl px-10 py-1"
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
                              mutate();
                              revalPath("/explore");
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
                          className="mx-auto mt-2 flex h-8 w-28 justify-center rounded-2xl px-10 py-1"
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
                              mutate();
                              revalPath("/explore");
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
                  {index !== users.length - 1 && (
                    <div className="absolute inset-x-0 bottom-0 mx-[-23px] h-0.5 bg-navy-400/30"></div>
                  )}
                </div>
              );
            })}
          </ul>
        </GradiantCard>
      </div>
    );
  }

  return (
    <div>
      <Loading />
    </div>
  );
};

export default UserList;
