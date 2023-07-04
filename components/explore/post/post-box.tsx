"use client";

import Link from "next/link";

import { Post } from "@prisma/client";

import { ArrowBigDown, ArrowBigUp, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { SafeUser } from "@/types";

interface PostBoxProps {
  post: Post;
  posts: Post[];
  index: number;
  currUser?: SafeUser | null;
}

const PostBox: React.FC<PostBoxProps> = ({ post, posts, index, currUser }) => {
  const isLiked = post?.likes.includes(currUser?.id as string);

  const [like, setLike] = useState<boolean>(isLiked);
  const [dislike, setDislike] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

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
        {!like && (
          <button
            onClick={async () => {
              setLoading(true);
              const fields = {
                postId: post.id,
              };
              const set = await fetch("/explore/stg/api/like", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                toast.error(msg.message);
                setLoading(false);
              } else {
                setLoading(false);
                setLike(true);
                if (dislike) {
                  setDislike(false);
                }
                toast.success(msg.message);
              }
            }}
          >
            {loading ? (
              <LoadingDots color="#FAFAFA" />
            ) : (
              <ArrowBigUp size={40} strokeWidth={0.5} />
            )}
          </button>
        )}
        {like && (
          <button
            onClick={async () => {
              setLoading(true);
              const fields = {
                postId: post.id,
              };
              const set = await fetch("/explore/stg/api/like", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                toast.error(msg.message);
                setLoading(false);
              } else {
                setLoading(false);
                setLike(false);
                toast.success(msg.message);
              }
            }}
          >
            {loading ? (
              <LoadingDots color="#FAFAFA" />
            ) : (
              <ArrowBigUp
                size={40}
                strokeWidth={0.5}
                className="fill-red-600"
              />
            )}
          </button>
        )}
        <p>0</p>
        {!dislike && (
          <button
            onClick={async () => {
              setLoading(true);
              const fields = {
                postId: post.id,
              };
              const set = await fetch("/explore/stg/api/dislike", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                toast.error(msg.message);
                setLoading(false);
              } else {
                setLoading(false);
                setDislike(true);
                toast.success(msg.message);
              }
            }}
          >
            {loading ? (
              <LoadingDots color="#FAFAFA" />
            ) : (
              <ArrowBigDown size={40} strokeWidth={0.5} />
            )}
          </button>
        )}
        {dislike && (
          <button
            onClick={async () => {
              setLoading(true);
              const fields = {
                postId: post.id,
              };
              const set = await fetch("/explore/stg/api/dislike", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                toast.error(msg.message);
                setLoading(false);
              } else {
                setLoading(false);
                setDislike(false);
                toast.success(msg.message);
              }
            }}
          >
            {loading ? (
              <LoadingDots color="#FAFAFA" />
            ) : (
              <ArrowBigDown
                size={40}
                strokeWidth={0.5}
                className="fill-red-600"
              />
            )}
          </button>
        )}
      </div>
      {index !== posts.length - 1 && (
        <div className="absolute inset-x-0 bottom-0 mx-[-23px] h-0.5 bg-navy-400/30"></div>
      )}
    </div>
  );
};

export default PostBox;
