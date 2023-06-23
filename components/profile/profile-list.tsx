// @ts-nocheck
"use client";

import { useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";

import { fetcher } from "@/lib/fetcher-utils";

import { Post } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { MessagesSquare, Star } from "lucide-react";

interface ProfileListProps {
  username: string;
  type: string;
  isOwnProfile: boolean;
  hasPosts: boolean;
}

const ProfileList: React.FC<ProfileListProps> = ({
  username,
  type,
  isOwnProfile,
  hasPosts,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: posts } = useSWR([`/api/user/${type}`, username], fetcher);

  if (hasPosts) {
    return (
      <>
        {posts && posts.length > 0 && (
          <GradiantCard variant="clean" className="mb-8">
            <ul role="list">
              {posts.map((post: Post, index: number) => (
                <div
                  key={post.id}
                  className={`relative flex justify-between gap-x-6 py-5 ${
                    index + 1 < posts.length ? "pb-16" : "pb-12"
                  }`}
                >
                  <div className="flex min-w-0 flex-col">
                    <Link href={`/explore/${post.id}`}>
                      <p className="text-white-500 text-xl font-semibold leading-6 ease-in-out hover:text-navy-200 hover:duration-300">
                        {post.title}
                      </p>
                    </Link>
                    <div className="flex items-center">
                      <Link href={`/profile/${post.createdBy}/statistics`}>
                        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out hover:text-navy-300 hover:underline">
                          {post.createdBy}
                        </p>
                      </Link>
                    </div>
                  </div>

                  {index !== posts.length - 1 && (
                    <div className="absolute inset-x-0 bottom-0 mx-[-23px] h-0.5 bg-navy-400/30"></div>
                  )}
                </div>
              ))}
            </ul>
          </GradiantCard>
        )}
      </>
    );
  }

  return (
    <div className="mt-4 flex h-screen flex-col items-center justify-center">
      {type === "post" && <MessagesSquare className="mb-2 h-20 w-20" />}
      {type === "favourite" && <Star className="my-2 h-20 w-20" />}
      <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
        {isOwnProfile && type === "post"
          ? "You have yet to post something"
          : isOwnProfile && type === "favourite"
          ? "You have yet to star anything"
          : type === "post"
          ? "This user has no posts"
          : "This user has no favourite posts"}
      </p>
    </div>
  );
};

export default ProfileList;
