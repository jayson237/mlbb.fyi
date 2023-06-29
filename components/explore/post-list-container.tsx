"use client";

import { SafeUser } from "@/types";
import PostContainer from "./post/post-container";
import PostList from "./post/post-list";
import { GradiantCard } from "../shared/gradiant-card";
import { Input } from "../shared/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface PostListContainerProps {
  currentUser?: SafeUser | null;
}

const PostListContainer: React.FC<PostListContainerProps> = ({
  currentUser,
}) => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[2000px]">
      <GradiantCard>
        <form
          className="flex flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setFilter(searchTerm);
          }}
        >
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearchTerm(inputValue);
            }}
            className="h-7 rounded-xl"
          />
          <button>
            <Search />
          </button>
        </form>
      </GradiantCard>
      {currentUser && <PostContainer currUser={currentUser} />}
      <PostList filter={filter} />
    </div>
  );
};

export default PostListContainer;
