"use client";

import Link from "next/link";

import { Post } from "@prisma/client";

import { ArrowBigDown, ArrowBigUp, MessageCircle, Star } from "lucide-react";
import { useState } from "react";

interface PostBoxProps {
  post: Post;
  posts: Post[];
  index: number;
}

const PostBox: React.FC<PostBoxProps> = ({ post, posts, index }) => {
  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);

  return (
    <div
      key={post.id}
      className={`relative flex justify-between gap-x-6 py-5 ${
        index + 1 < posts.length ? "pb-16" : "pb-12"
      }`}
    >
      <div className="flex min-w-0 flex-col">
        <Link href={`/explore/${post.id}`}>
          <p className="text-white-500 mt-2 flex text-xl font-semibold leading-6 ease-in-out hover:text-navy-200 hover:duration-300">
            {post.title}
          </p>
        </Link>
        <div className="flex items-center">
          <Link href={`/profile/${post.createdBy}/statistics`}>
            <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out hover:text-navy-300 hover:underline">
              {post.createdBy}
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-row items-center">
          <Star size={16} strokeWidth={0.5} />
          <p className="ml-2 mr-8 flex">0</p>
          <MessageCircle size={16} strokeWidth={0.5} />
          <p className="ml-2 flex">0</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-center">
        <button>
          <ArrowBigUp size={40} strokeWidth={0.5} />
        </button>
        <p>0</p>
        <button>
          <ArrowBigDown size={40} strokeWidth={0.5} />
        </button>
      </div>
      {index !== posts.length - 1 && (
        <div className="absolute inset-x-0 bottom-0 mx-[-23px] h-0.5 bg-navy-400/30"></div>
      )}
    </div>
  );
};

export default PostBox;
