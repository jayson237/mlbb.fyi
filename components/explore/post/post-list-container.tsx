"use client";

import { SafeUser } from "@/types";
import PostContainer from "./post-container";
import PostList from "./post-list";
import { GradiantCard } from "../../shared/gradiant-card";
import { Input } from "../../shared/input";
import { Search } from "lucide-react";
import { useState } from "react";
import UserList from "./user-list";

interface PostListContainerProps {
  currentUser?: SafeUser | null;
}

const PostListContainer: React.FC<PostListContainerProps> = ({
  currentUser,
}) => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-2);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = Number(event.target.value);
    setSelectedIndex(selectedIndex);
  };

  return (
    <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[2000px]">
      <GradiantCard>
        <div className="flex flex-row items-center gap-2">
          <form
            className="flex flex-grow flex-row items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setFilter(searchTerm);
            }}
          >
            <Input
              type="text"
              placeholder={
                selectedIndex === -2 ? "Search posts..." : "Search users..."
              }
              value={searchTerm}
              onChange={(e) => {
                const inputValue = e.target.value;
                setSearchTerm(inputValue);
              }}
              className="flex h-9 rounded-xl"
            />
            <button>
              <Search className="mb-1 transition-all hover:text-navy-300 hover:duration-300" />
            </button>
          </form>
          <select
            className="h-9 w-24 rounded-xl border border-navy-300/50 bg-black p-2 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
            value={selectedIndex}
            onChange={handleChange}
          >
            <option value={-2}>Post</option>
            <option value={-1}>User</option>
          </select>
        </div>
      </GradiantCard>
      {selectedIndex === -2 && currentUser && (
        <PostContainer currUser={currentUser} />
      )}
      {selectedIndex === -2 && (
        <PostList filter={filter} currUser={currentUser} />
      )}
      {selectedIndex === -1 && <UserList filter={filter} />}
    </div>
  );
};

export default PostListContainer;
