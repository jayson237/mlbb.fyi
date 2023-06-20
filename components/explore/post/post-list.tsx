"use client";

import Link from "next/link";
import useSWR from "swr";

import { Post } from "@prisma/client";
import { fetcher } from "@/lib/utils";

import { GradiantCard } from "@/components/shared/gradiant-card";

const PostList = () => {
  const { data: posts } = useSWR("/api/post", fetcher);

  if (posts) {
    return (
      <GradiantCard variant="clean" className="mb-8">
        <ul role="list">
          {posts?.map((post: Post, index: number) => (
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
    );
  }
  return null;
};

export default PostList;
