"use client";

import { Button } from "../shared/button";
import { useState } from "react";
import PostForm from "./post-form";

interface PostTopBarProps {
  currUser?: string;
}

const PostTopBar: React.FC<PostTopBarProps> = ({ currUser }) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row gap-6">
        <div>Search Bar PlaceHolder </div>
        {currUser && (
          <Button onClick={() => setActive(!active)}>Create a New Topic</Button>
        )}
      </div>
      <div>{active && <PostForm />}</div>
    </>
  );
};

export default PostTopBar;
