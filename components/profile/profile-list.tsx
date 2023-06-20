"use client";

import { Post } from "@prisma/client";
import { fetcher } from "@/lib/fetcher-utils";
import Link from "next/link";
import useSWR from "swr";
import { GradiantCard } from "@/components/shared/gradiant-card";

interface ProfileListProps {
  username: string;
  type: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ username, type }) => {
  const { data: post } = useSWR([`/api/user/${type}`, username], fetcher);

  if (post) {
    return (
      <GradiantCard variant="clean">
        <ul role="list" className="divide-y divide-gray-100/50">
          {post?.map((post: Post) => (
            <li key={post.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex  min-w-0 flex-col">
                <Link href={`/explore/${post.id}`}>
                  <p className=" text-white-500 text-xl font-semibold leading-6">
                    {post.title}
                  </p>
                </Link>
                <Link href={`/profile/${post.createdBy}/statistics`}>
                  <p className="text-xs mt-1 truncate leading-5 text-gray-500">
                    {post.createdBy}
                  </p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </GradiantCard>
    );
  }

  return null;
};

export default ProfileList;
