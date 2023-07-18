"use client";

import { useEffect } from "react";
import useSWR from "swr";
import useMut from "@/lib/state/useMut";

import { SafeUser } from "@/types";
import { Comment, Post, User } from "@prisma/client";

import PostContent from "@/components/explore/post/post-content";
import CommentList from "./comment/comment-list";
import CommentForm from "./comment/comment-form";
import { postFetcher } from "@/lib/utils";

interface PostProps {
  currentUser: SafeUser | null;
  post: Post;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ currentUser, post, user }) => {
  const togMut = useMut();

  // Mutable post info
  // const { data: postInfo, mutate } = useSWR<{
  //   likes: string[];
  //   dislikes: string[];
  //   favourites: string[];
  //   comments: Comment[];
  // }>(`api/post/info?postId=${post.id}`, getFetcher);

  const { data: postInfo, mutate } = useSWR(
    ["/api/post/info", post.id],
    postFetcher
  );

  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  return (
    <>
      <PostContent
        post={post}
        postInfo={postInfo?.info}
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
