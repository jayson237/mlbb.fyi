"use client";

import Link from "next/link";

import { Post } from "@prisma/client";

import { ArrowBigDown, ArrowBigUp, MessageCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { SafeUser } from "@/types";
import { fetcher } from "@/lib/fetcher-utils";
import useSWR from "swr";
import useMutCom from "@/lib/state/useMutCom";
import { useRouter } from "next/navigation";
import DateContainer from "./data-container";

interface PostBoxProps {
  post: Post;
  posts: Post[];
  index: number;
  currUser?: SafeUser | null;
}

const PostBox: React.FC<PostBoxProps> = ({ post, posts, index, currUser }) => {
  const togMut = useMutCom();
  const { data: comments, mutate } = useSWR(
    ["/api/comment/list", post.id],
    fetcher
  );

  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  const isLiked = post?.likes.includes(currUser?.id as string);
  const isDisliked = post?.dislikes.includes(currUser?.id as string);

  const [like, setLike] = useState<boolean>(isLiked);
  const [dislike, setDislike] = useState<boolean>(isDisliked);
  const [totalVotes, setTotalVotes] = useState<number>(post.totalVotes);
  const [loading, setLoading] = useState(false);

  const dateTime = post.createdAt.toString().split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];

  return (
    <div
      key={post.id}
      className={`relative flex grow justify-between gap-x-6 py-5 ${
        index + 1 < posts.length ? "pb-16" : "pb-12"
      }`}
    >
      <div className="flex min-w-0 flex-col">
        <Link href={`/explore/${post.id}`}>
          <p className="text-white-500 flex text-xl font-semibold leading-6 ease-in-out hover:text-navy-200 hover:duration-300">
            {post.title}
          </p>
        </Link>
        <div className="flex flex-row items-center gap-1">
          <DateContainer date={date.split("-")} time={time.split(":")} />
          <Link href={`/profile/${post.createdBy}/statistics`}>
            <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out hover:text-navy-300 hover:underline">
              {post.createdBy}
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-row items-center">
          <Star size={16} strokeWidth={0.5} />
          <p className="ml-2 mr-8 flex">
            {post.favourites.length >= 1000
              ? `${
                  (post.favourites.length - (post.favourites.length % 100)) /
                  1000
                }k`
              : post.favourites.length}
          </p>
          <MessageCircle size={16} strokeWidth={0.5} />
          {comments && (
            <p className="ml-2 flex">
              {comments.length >= 1000
                ? `${(comments.length - (comments.length % 100)) / 1000}k`
                : comments.length}
            </p>
          )}
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-center">
        {loading && (
          <div className="mr-3 mt-10 flex">
            <LoadingDots color="#FAFAFA" />
          </div>
        )}
        {!loading && !like && (
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
                  setTotalVotes(totalVotes + 2);
                  toast.success(msg.message);
                } else {
                  setTotalVotes(totalVotes + 1);
                  toast.success(msg.message);
                }
              }
            }}
          >
            <ArrowBigUp
              size={32}
              strokeWidth={0.5}
              className="transition-all ease-in-out hover:text-green-600 hover:duration-300"
            />
          </button>
        )}
        {!loading && like && (
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
                setTotalVotes(totalVotes - 1);
                toast.success(msg.message);
              }
            }}
          >
            <ArrowBigUp size={32} strokeWidth={0} className="fill-green-600" />
          </button>
        )}
        {!loading && (
          <p>
            {totalVotes >= 1000
              ? `${(totalVotes - (totalVotes % 100)) / 1000}k`
              : totalVotes}
          </p>
        )}
        {!loading && !dislike && (
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
                if (like) {
                  setLike(false);
                  setTotalVotes(totalVotes - 2);
                  toast.success(msg.message);
                } else {
                  setTotalVotes(totalVotes - 1);
                  toast.success(msg.message);
                }
              }
            }}
          >
            <ArrowBigDown
              size={32}
              strokeWidth={0.5}
              className="transition-all ease-in-out hover:text-red-600 hover:duration-300"
            />
          </button>
        )}
        {!loading && dislike && (
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
                setTotalVotes(totalVotes + 1);
                toast.success(msg.message);
              }
            }}
          >
            <ArrowBigDown size={32} strokeWidth={0} className="fill-red-600" />
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
