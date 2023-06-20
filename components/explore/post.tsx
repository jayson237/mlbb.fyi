"use client";

import { useEffect } from "react";
import useSWR from "swr";
import useMutCom from "@/lib/state/useMutCom";
import { fetcher } from "@/lib/fetcher-utils";

import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";

import CommentForm from "@/components/explore/comment/comment-form";
import CommentList from "@/components/explore/comment/comment-list";
import PostContent from "@/components/explore/post/post-content";

interface PostProps {
  currentUser: SafeUser | null;
  post: Post;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ currentUser, post, user }) => {
  const togMut = useMutCom();
  const { data: comments, mutate } = useSWR(
    ["/api/comment/list", post.id],
    fetcher
  );
  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  return (
    <>
      <PostContent
        post={post}
        user={user}
        currUser={currentUser}
        comments={comments}
      />
      {currentUser && (
        <CommentForm postId={post?.id || ""} img={currentUser?.image || ""} />
      )}
      <CommentList
        postId={post?.id || ""}
        userId={currentUser?.id}
        comments={comments}
      />
    </>
  );
};

export default Post;
