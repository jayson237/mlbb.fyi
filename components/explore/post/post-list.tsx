"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher-utils";

import { GradiantCard } from "@/components/shared/gradiant-card";
import PostBox from "./post-box";
import { Post } from "@prisma/client";
import { SafeUser } from "@/types";

interface PostListProps {
  filter: string;
  currUser?: SafeUser | null;
}

const PostList: React.FC<PostListProps> = ({ filter, currUser }) => {
  const { data: posts } = useSWR(["/api/post", filter], fetcher);

  if (posts === "empty") {
    return (
      <div className="grid justify-items-center">
        <h2 className="mt-10 font-heading text-xl font-bold tracking-wide">
          No such post exist yet
        </h2>
      </div>
    );
  }

  if (posts) {
    return (
      <>
        <GradiantCard variant="clean" className="mb-8">
          <ul role="list">
            {posts?.map((post: Post, index: number) => (
              <PostBox
                post={post}
                posts={posts}
                index={index}
                currUser={currUser}
              />
            ))}
          </ul>
        </GradiantCard>
      </>
    );
  }

  return null;
};

export default PostList;
