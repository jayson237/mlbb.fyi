"use client";

import { Post } from "@prisma/client";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import useSWR from "swr";
import Loading from "../shared/loading";
import { GradiantCard } from "../shared/gradiant-card";

const PostList = () => {
  const { data: post } = useSWR("/api/post", fetcher);

  if (post) {
    return (
      <ul role="list" className="">
        {post?.map((post: Post) => (
          <GradiantCard
            key={post.id}
            className="mb-1.5 flex justify-between gap-x-6 py-5"
            variant="clean"
          >
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
            <div className="sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-500">
                Created at or updated at PlaceHolder
              </p>
            </div>
          </GradiantCard>
        ))}
      </ul>
    );
  }
  return <Loading />;
};

export default PostList;
