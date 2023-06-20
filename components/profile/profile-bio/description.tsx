"use client";

import { LinkIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

import { User } from "@prisma/client";
import { MlbbAcc } from "@prisma/client";

import { GradiantCard } from "@/components/shared/gradiant-card";

interface ProfileDescProps {
  user: User | null;
  mlbbAcc?: MlbbAcc | null;
}

const ProfileDesc: React.FC<ProfileDescProps> = ({ user, mlbbAcc }) => {
  const isLinksEmpty = () => {
    let isEmpty = true;
    if (user?.links) {
      isEmpty = user.links.every((link) => link === "");
    }
    return isEmpty;
  };
  return (
    <GradiantCard
      className={clsx(
        mlbbAcc || !isLinksEmpty()
          ? "mx-auto mt-1.5 h-fit max-w-[16rem] font-normal md:mx-0"
          : "hidden"
      )}
      variant="clean"
    >
      <div className="flex flex-col">
        <p
          className={clsx(mlbbAcc ? "mb-2 flex items-center gap-2" : "hidden")}
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
                  <LinkIcon width={10} height={10} className="mr-2 shrink-0" />
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
  );
};

export default ProfileDesc;
