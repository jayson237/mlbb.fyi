"use client";

import { Button } from "../shared/button";
import { useRouter } from "next/navigation";

const PostButton = () => {
  const route = useRouter();

  const handleClick = () => {
    route.push("/explore/stg");
  };
  return <Button onClick={handleClick}>Create a New Topic</Button>;
};

export default PostButton;
