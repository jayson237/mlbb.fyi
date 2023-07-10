"use client";

import { SafeUser } from "@/types";
import PostForm from "./post-form";

interface PostContainerProps {
  currUser?: SafeUser;
}

const PostContainer: React.FC<PostContainerProps> = ({ currUser }) => {
  return (
    <>
      <div className="my-1.5 flex flex-row gap-6">
        {currUser && <PostForm currUser={currUser} />}
      </div>
    </>
  );
};

export default PostContainer;
