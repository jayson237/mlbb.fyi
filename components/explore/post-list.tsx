"use client";

import { Post } from "@prisma/client";

interface PostsProps {
  items: Post[];
}

const PostList: React.FC<PostsProps> = ({ items }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100/50">
      {items.map((item) => (
        <li key={item.id} className="flex justify-between gap-x-6 py-5">
          <div className="min-w-0 flex-auto">
            <p className="text-white-500 text-base font-semibold leading-6">
              {item.title}
            </p>
            <p className="text-xs mt-1 truncate leading-5 text-gray-500">
              {item.createdBy}
            </p>
          </div>
          <div className="sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-500">
              Created at or updated at PlaceHolder
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
