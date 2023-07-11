"use client";

import { SafeUser } from "@/types";
import PostContainer from "./post-container";
import PostList from "./post-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/tabs";
import { Search } from "lucide-react";
import { useState } from "react";
import UserList from "./user-list";
import { Input } from "@/components/shared/input";

interface PostListContainerProps {
  currentUser?: SafeUser | null;
}

const ExploreTabList = [
  {
    name: "Top Votes",
    mode: "top",
  },
  {
    name: "Recent",
    mode: "recent",
  },
  {
    name: "Following",
    mode: "follow",
  },
];

const PostListContainer: React.FC<PostListContainerProps> = ({
  currentUser,
}) => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-2);
  const [selectedSortMode, setSelectedSortMode] = useState("top");
  const [selectedTab, setSelectedTab] = useState("Top Votes");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = Number(event.target.value);
    setSelectedIndex(selectedIndex);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSelectedSortMode(selectedSort);
  };

  return (
    <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[2000px]">
      <div className="mb-2">
        <div className="flex flex-row items-center gap-2">
          <form
            className="flex grow flex-row items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setFilter(searchTerm);
            }}
          >
            <div className="flex grow flex-row items-center gap-2 rounded-xl border border-navy-300 bg-transparent">
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
                className="flex h-9 rounded-l-xl border-r border-hidden"
              />
              <button>
                <Search className="mr-2 transition-all hover:text-navy-300 hover:duration-300" />
              </button>
            </div>
          </form>
          <select
            className="h-[2.45rem] w-24 rounded-xl border border-navy-300/50 bg-black p-2 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
            value={selectedIndex}
            onChange={handleChange}
          >
            <option value={-2}>Post</option>
            <option value={-1}>User</option>
          </select>
        </div>
      </div>
      {selectedIndex === -2 && currentUser && (
        <PostContainer currUser={currentUser} />
      )}
      {selectedIndex === -2 && (
        <div className="mt-5 flex flex-col gap-2">
          <Tabs value={selectedTab} className="mt-4 flex w-full">
            <TabsList className="flex shrink-0 space-x-4">
              {ExploreTabList.map((item, i) => {
                if (item.name === "Following" && !currentUser) {
                  return null;
                }
                return (
                  <TabsTrigger
                    value={item.name}
                    onClick={() => {
                      setSelectedTab(item.name);
                      setSelectedSortMode(item.mode);
                    }}
                    key={i}
                  >
                    {item.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <PostList
            filter={filter}
            sortMode={selectedSortMode}
            currUser={currentUser}
          />
        </div>
      )}
      {selectedIndex === -1 && <UserList filter={filter} />}
    </div>
  );
};

export default PostListContainer;
