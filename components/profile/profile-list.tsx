// @ts-nocheck
"use client";

import { useEffect } from "react";
import useSWR from "swr";

import { postFetcher } from "@/lib/utils";
import { Post } from "@prisma/client";

import PostBox from "../explore/post/post-box";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { MessagesSquare, Star } from "lucide-react";
import { SafeUser } from "@/types";

interface ProfileListProps {
  username: string;
  type: string;
  isOwnProfile: boolean;
  hasPosts: boolean;
  currentUser: SafeUser | null;
}

const ProfileList: React.FC<ProfileListProps> = ({
  username,
  type,
  isOwnProfile,
  hasPosts,
  currentUser,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: posts } = useSWR([`/api/user/${type}`, username], postFetcher);

  if (hasPosts) {
    return (
      <>
        {posts && posts.length > 0 && (
          <GradiantCard variant="clean">
            <ul role="list">
              {posts?.map((post: Post, index: number) => (
                <PostBox
                  post={post}
                  posts={posts}
                  index={index}
                  currUser={currentUser}
                  key={post.id}
                />
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
