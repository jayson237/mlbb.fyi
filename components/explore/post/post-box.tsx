"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { cn, postFetcher } from "@/lib/utils";
import { SafeUser } from "@/types";
import { Post } from "@prisma/client";
import useMut from "@/lib/state/useMut";
import useSWR from "swr";

import { ArrowBigDown, ArrowBigUp, MessageCircle, Star } from "lucide-react";
import LoadingDots from "@/components/shared/icons/loading-dots";
import TimeStamp from "../../shared/time-stamp";
import { revalPath } from "@/lib/revalidate";

interface PostBoxProps {
  post: Post;
  posts: Post[];
  index: number;
  currUser?: SafeUser | null;
}

const PostBox: React.FC<PostBoxProps> = ({ post, posts, index, currUser }) => {
  const togMut = useMut();
  const { data: comments, mutate } = useSWR(
    ["/api/comment/list", post.id],
    postFetcher
  );

  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  const isLiked = post?.likes.includes(currUser?.id as string);
  const isDisliked = post?.dislikes.includes(currUser?.id as string);
  const isStarred = currUser?.favourite.includes(post.id as string);

  const [like, setLike] = useState<boolean>(isLiked);
  const [dislike, setDislike] = useState<boolean>(isDisliked);
  useEffect(() => {
    setLike(post?.likes.includes(currUser?.id as string));
    setDislike(post?.dislikes.includes(currUser?.id as string));
  }, [post]);
  const [totalVotes, setTotalVotes] = useState<number>(post.totalVotes);
  const [loading, setLoading] = useState(false);

  const dateTime = post.createdAt.toString().split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];

  async function handleLikeDislike(action: string, postId: string) {
    setLoading(true);

    const set = await fetch("/explore/stg/api/post-action?action=" + action, {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
      }),
    });
    const msg = await set.json();

    if (!set.ok) {
      toast.error(msg.message);
      setLoading(false);
    } else {
      setLoading(false);
      togMut.togMut();
      revalPath("/explore/" + postId);
      toast.success(msg.message);
    }
  }

  return (
    <div
      key={post.id}
      className={cn(
        "relative flex grow justify-between gap-x-6 py-5",
        index + 1 < posts.length ? "pb-16" : "pb-12"
      )}
    >
      {/* Title, Timestamp, Tags, and Command Starred Information */}
      <div className="flex min-w-0 flex-col">
        <Link
          href={`/explore/${post.id}`}
          className="text-white-500 mt-0.5 flex text-xl font-semibold leading-6 ease-in-out hover:text-navy-200 hover:duration-300"
        >
          {post.title}
        </Link>

        <div className="flex flex-row items-center gap-1">
          <TimeStamp date={date.split("-")} time={time.split(":")} />
          <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
            by
          </p>
          <Link href={`/profile/${post.createdBy}/statistics`}>
            <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out hover:text-navy-300 hover:underline">
              {post.createdBy}
            </p>
          </Link>
        </div>

        <div>
          <ul role="list" className="flex flex-row items-center gap-1">
            {post.tags?.map((tag: string) => (
              <p
                className="text-xs mt-2 truncate leading-5 text-navy-300 ease-in-out"
                key={tag}
              >{`#${tag}`}</p>
            ))}
          </ul>
        </div>

        <div
          className={`${
            post.tags.length === 0 ? "mt-9" : "mt-4"
          } flex flex-row items-center`}
        >
          {!isStarred ? (
            <Star size={24} strokeWidth={0.5} />
          ) : (
            <Star
              size={24}
              color="#FACC18"
              strokeWidth={2}
              className="fill-yellow-300"
            />
          )}
          <p className="ml-2 mr-8 flex">
            {post.favourites.length >= 1000
              ? `${
                  (post.favourites.length - (post.favourites.length % 100)) /
                  1000
                }k`
              : post.favourites.length}
          </p>

          <MessageCircle size={24} strokeWidth={0.5} />
          {comments && (
            <p className="ml-2 flex">
              {comments.length >= 1000
                ? `${(comments.length - (comments.length % 100)) / 1000}k`
                : comments.length}
            </p>
          )}
        </div>
      </div>

      {/* Like, Vote Count, and Dislike */}
      <div className="mb-2 flex min-w-0 flex-col items-center space-y-3">
        {loading ? (
          <div className="mr-3 mt-10 flex">
            <LoadingDots color="#FAFAFA" />
          </div>
        ) : (
          <>
            <button onClick={async () => handleLikeDislike("like", post.id)}>
              <ArrowBigUp
                size={32}
                strokeWidth={0.5}
                className={cn(
                  "transition-all ease-in-out hover:duration-300",
                  like ? "fill-green-600" : "fill-none hover:fill-green-600"
                )}
              />
            </button>
            <p>{post.likes.length - post.dislikes.length}</p>
            <button onClick={async () => handleLikeDislike("dislike", post.id)}>
              <ArrowBigDown
                size={32}
                strokeWidth={0.5}
                className={cn(
                  "transition-all ease-in-out hover:duration-300",
                  dislike ? "fill-red-600" : "fill-none hover:fill-red-600"
                )}
              />
            </button>
          </>
        )}
      </div>

      {index !== posts.length - 1 && (
        <div className="absolute inset-x-0 bottom-0 mx-[-23px] h-0.5 bg-navy-400/30"></div>
      )}
    </div>
  );
};

export default PostBox;
