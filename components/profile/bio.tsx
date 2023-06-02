"use client";

import { useState } from "react";
import { GradiantCard } from "../shared/gradiant-card";
import Image from "next/image";
import { Button } from "../shared/button";
import { MlbbAcc } from "@prisma/client";
import { SafeUser } from "@/types";
import LoadingDots from "../shared/icons/loading-dots";
import { toast } from "sonner";
import { User } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { Link } from "lucide-react";

interface ProfileBioProps {
  currentUser?: SafeUser | null;
  user: User | null;
  mlbbAcc?: MlbbAcc | null;
  isOwnProfile: boolean;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  currentUser,
  user,
  mlbbAcc,
  isOwnProfile,
}) => {
  const params = useParams();
  const { data: baseInfo, mutate } = useSWR<{
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  }>(`/api/user/basic-info?username=${params?.username}`, fetcher);

  // const baseInfo = useSWR("/api/user/basic-info", fetcher);
  // console.log(baseInfo.data);

  const username = user?.username;
  const isCurrUserFollowing = currentUser?.following.includes(
    user?.id as string
  );

  const noLinks = () => {
    let bool = false;
    if (
      user?.links[0] === "" &&
      user?.links[1] === "" &&
      user?.links[2] === ""
    ) {
      bool = true;
    }
    return bool;
  };

  const [isFollowing, setIsFollowing] = useState(isCurrUserFollowing);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
        <h1 className="mt-3 text-center font-heading text-xl">
          {baseInfo?.username}
        </h1>
        <p className="mb-4 px-2 text-center text-sm font-normal leading-4">
          {user?.desc}
        </p>

        {!isOwnProfile && !isFollowing && (
          <Button
            className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
            disabled={buttonDisabled}
            variant="gradiantNavySec"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              setButtonDisabled(true);
              const set = await fetch(`/profile/[username]/api/follow`, {
                method: "POST",
                body: JSON.stringify({ username }),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                setButtonDisabled(false);
                toast.error(msg.message);
              } else {
                mutate();
                setLoading(false);
                setIsFollowing(true);
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
            className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
            disabled={buttonDisabled}
            onClick={async (e) => {
              e.preventDefault();
              setButtonDisabled(true);
              setLoading(true);
              const set = await fetch(`/profile/[username]/api/unfollow`, {
                method: "POST",
                body: JSON.stringify({ username }),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                setButtonDisabled(false);
                toast.error(msg.message);
              } else {
                mutate();
                setLoading(false);
                setIsFollowing(false);
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
        <div className="mt-6 flex flex-row justify-between px-3 font-heading">
          <div className="flex flex-col text-center">
            <p className="text-xl">{user?.following.length}</p>
            <p className="text-[14px]">FOLLOWING</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="text-xl">{user?.followers.length}</p>
            <p className="text-[14px]">FOLLOWERS</p>
          </div>
        </div>
      </GradiantCard>

      <GradiantCard
        className={clsx(
          mlbbAcc || !noLinks()
            ? "mx-auto mt-5 h-fit w-[15rem] max-w-full font-normal md:mx-0"
            : "hidden"
        )}
      >
        <div className="flex flex-col">
          <p
            className={clsx(
              mlbbAcc ? "mb-2 flex items-center gap-2" : "hidden"
            )}
          >
            <Image src="/official.svg" alt="mlbb" width={20} height={20} />
            {mlbbAcc ? (
              <>
                {mlbbAcc.nickname}
                <span className="rounded-full bg-navy-600 px-2 text-sm font-semibold shadow-inner ">
                  {mlbbAcc.accId}
                </span>
              </>
            ) : (
              ""
            )}
          </p>
          {user?.links &&
            user.links.map((link, index) => {
              if (link !== "") {
                return (
                  <div
                    key={index}
                    className="flex items-center text-sm font-light"
                  >
                    <Link width={10} height={10} className="mr-2 shrink-0" />
                    {/* Link icon */}
                    <a
                      href={user?.links[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate"
                    >
                      {user?.links[index]}
                    </a>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </GradiantCard>
    </div>
  );
};

export default ProfileBio;
