"use client";

import useSWR from "swr";
import useMut from "@/lib/state/useMut";
import { useEffect } from "react";

import { Post } from "@prisma/client";
import { SafeUser } from "@/types";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { AlertTriangle } from "lucide-react";
import Loading from "@/components/shared/loading";
import PostBox from "./post-box";

interface PostListProps {
  filter: string;
  tag: string;
  sortMode: string;
  currUser?: SafeUser | null;
}

export const fetcher = async (data: string) => {
  const fields = {
    filter: data[1],
    sortMode: data[2],
    tag: data[3],
  };

  return await fetch(data[0], {
    method: "POST",
    body: JSON.stringify(fields),
  }).then((res) => res.json());
};

const PostList: React.FC<PostListProps> = ({
  filter,
  tag,
  sortMode,
  currUser,
}) => {
  const togMut = useMut();
  const { data: posts, mutate } = useSWR(
    ["/api/post/filter", filter, sortMode, tag],
    fetcher
  );

  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  if (posts === "empty") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <AlertTriangle className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          There is no such post
        </p>
      </div>
    );
  }

  if (posts) {
    return (
      <>
        {posts && posts.length > 0 ? (
          <GradiantCard variant="clean">
            <ul role="list">
              {posts?.map((post: Post, index: number) => (
                <PostBox
                  post={post}
                  posts={posts}
                  index={index}
                  currUser={currUser}
                  key={post.id}
                />
              ))}
            </ul>
          </GradiantCard>
        ) : (
          <div className="mt-4 flex h-screen flex-col items-center justify-center">
            <AlertTriangle className="mb-2 h-20 w-20" />
            <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
              There is no post to be found yet
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <Loading />
    </div>
  );
};

export default PostList;
