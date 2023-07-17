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
    name: "Recent",
    mode: "recent",
  },
  {
    name: "Following",
    mode: "follow",
  },
  {
    name: "Top Votes",
    mode: "top",
  },
];

const PostListContainer: React.FC<PostListContainerProps> = ({
  currentUser,
}) => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState("");
  const [searchTags, setSearchTags] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(-3);
  const [selectedSortMode, setSelectedSortMode] = useState("recent");
  const [selectedTab, setSelectedTab] = useState("Recent");
  const [tagCharacterCount, setTagCharacterCount] = useState(0);
  const [isTagInputFocused, setIsTagInputFocused] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = Number(event.target.value);
    setSelectedIndex(selectedIndex);
    setSearchTerm("");
    setSearchTags("");
    setFilter("");
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSelectedSortMode(selectedSort);
  };

  console.log(searchTags);
  return (
    <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[2000px]">
      <div className="mb-2">
        <div className="flex flex-row items-center gap-2">
          <form
            className="flex grow flex-row items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();

              if (selectedIndex !== -2) {
                setFilter(searchTerm);
              } else {
                setFilter("");
                setSearchTags(searchTerm);
              }
            }}
          >
            <div className="flex grow flex-row items-center gap-2 rounded-xl border border-navy-300 bg-transparent">
              <Input
                type="text"
                placeholder={
                  selectedIndex === -3
                    ? "Search posts..."
                    : selectedIndex === -2
                    ? "Search posts with a tag... (Up to 20 characters)"
                    : "Search users..."
                }
                value={searchTerm}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setSearchTerm(inputValue);
                  if (selectedIndex === -2) {
                    setTagCharacterCount(inputValue.length);
                  }
                }}
                className="flex h-9 rounded-l-xl border-r border-hidden"
                maxLength={selectedIndex === -2 ? 20 : 50}
                onFocus={() =>
                  selectedIndex === -2 && setIsTagInputFocused(true)
                }
                onBlur={() =>
                  selectedIndex === -2 && setIsTagInputFocused(false)
                }
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
            <option value={-3}>Post</option>
            <option value={-2}>Tag</option>
            <option value={-1}>User</option>
          </select>
        </div>
        {/* <div>
          {isTagInputFocused && (
            <p className="text-sm text-neutral-500">
              {tagCharacterCount} / {20} characters
            </p>
          )}
        </div> */}
      </div>
      {(selectedIndex === -3 || selectedIndex === -2) && currentUser && (
        <PostContainer currUser={currentUser} />
      )}
      {(selectedIndex === -3 || selectedIndex === -2) && (
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
            tag={searchTags}
            sortMode={selectedSortMode}
            currUser={currentUser}
          />
        </div>
      )}
      {selectedIndex === -1 && (
        <UserList filter={filter} currentUser={currentUser} />
      )}
    </div>
  );
};

export default PostListContainer;
