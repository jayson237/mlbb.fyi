"use client";

import { useEffect } from "react";
import useSWR from "swr";
import useMut from "@/lib/state/useMut";
import { postFetcher } from "@/lib/utils";

import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";

import PostContent from "@/components/explore/post/post-content";
import CommentList from "./comment/comment-list";
import CommentForm from "./comment/comment-form";

interface PostProps {
  currentUser: SafeUser | null;
  post: Post;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ currentUser, post, user }) => {
  const togMut = useMut();
  const { data: comments, mutate } = useSWR(
    ["/api/comment/list", post.id],
    postFetcher
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
