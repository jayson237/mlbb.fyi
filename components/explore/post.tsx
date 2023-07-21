"use client";

import { IFullPost, SafeUser } from "@/types";
import { User } from "@prisma/client";

import PostContent from "@/components/explore/post/post-content";
import CommentList from "./comment/comment-list";
import CommentForm from "./comment/comment-form";

interface PostProps {
  currentUser: SafeUser | null;
  post: IFullPost;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ currentUser, post, user }) => {
  console.log(post);
  return (
    <>
      <PostContent
        post={post}
        user={user}
        currUser={currentUser}
        comments={post?.comments}
      />
      {currentUser && (
        <CommentForm postId={post?.id || ""} img={currentUser?.image || ""} />
      )}
      <CommentList
        postId={post?.id || ""}
        userId={currentUser?.id}
        comments={post?.comments}
      />
    </>
  );
};

export default Post;
