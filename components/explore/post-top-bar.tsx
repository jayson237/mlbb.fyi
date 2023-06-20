"use client";

import { SafeUser } from "@/types";
import PostForm from "./post-form";

interface PostTopBarProps {
  currUser?: SafeUser;
}

const PostTopBar: React.FC<PostTopBarProps> = ({ currUser }) => {
  return (
    <>
      <div className="mb-1.5 flex flex-row gap-6">
        {currUser && <PostForm currUser={currUser} />}
      </div>
    </>
  );
};

export default PostTopBar;
