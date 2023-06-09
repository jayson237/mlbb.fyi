"use client";

import { Post } from "@prisma/client";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import useSWR from "swr";

const PostList = () => {
  const { data: post } = useSWR("/api/post", fetcher);

  return (
    <ul role="list" className="divide-y divide-gray-100/50">
      {post?.map((post: Post) => (
        <li key={post.id} className="flex justify-between gap-x-6 py-5">
          <div className="min-w-0 flex-auto">
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
        </li>
      ))}
    </ul>
  );
};

export default PostList;
