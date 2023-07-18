"use client";

import { useEffect } from "react";
import useSWR from "swr";
import useMut from "@/lib/state/useMut";
import { getFetcher } from "@/lib/utils";

import { SafeUser } from "@/types";
import { Comment, Post, User } from "@prisma/client";

import PostContent from "@/components/explore/post/post-content";
import CommentList from "./comment/comment-list";
import CommentForm from "./comment/comment-form";

interface PostProps {
  currentUser: SafeUser | null;
  post: Post;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ currentUser, post, user }) => {
  // const togMut = useMut();

  // Mutable post info
  const { data: postInfo, mutate } = useSWR<{
    likes: string[];
    dislikes: string[];
    favourites: string[];
    comments: Comment[];
  }>(`api/post/info?postId=${post.id}`, getFetcher);

  // useEffect(() => {
  //   togMut.toogleMutate && mutate();
  // }, [mutate, togMut]);

  return (
    <>
      <PostContent
        post={post}
        postInfo={postInfo}
        mutate={mutate}
        user={user}
        currUser={currentUser}
        comments={postInfo?.comments}
      />
      {currentUser && (
        <CommentForm postId={post?.id || ""} img={currentUser?.image || ""} />
      )}
      <CommentList
        postId={post?.id || ""}
        userId={currentUser?.id}
        comments={postInfo?.comments}
      />
    </>
  );
};

export default Post;
