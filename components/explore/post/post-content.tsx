// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";

import {
  ArrowLeftCircle,
  ArrowBigDown,
  ArrowBigUp,
  Edit3,
  MessageCircle,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react";

import DeletePost from "./del-post";
import EditForm from "./edit-form";
import TimeStamp from "@/components/shared/time-stamp";
import LoadingDots from "@/components/shared/icons/loading-dots";
import DialogFit from "@/components/shared/dialog-fit";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { revalPath } from "@/lib/revalidate";
import { cn } from "@/lib/utils";

interface PostContentProp {
  post: Post;
  user: User | null;
  currUser?: SafeUser | null;
  comments: any;
}

const PostContent: React.FC<PostContentProp> = ({
  post,
  user,
  currUser,
  comments,
}) => {
  const router = useRouter();

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

  const [editActive, setEditActive] = useState<boolean>(false);
  const [favourite, setFavourite] = useState(isStarred);
  const [loading, setLoading] = useState(false);
  const [starLoading, setStarLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedable, setExpandedable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const optionRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const dateTime = new Date(post?.createdAt).toISOString().split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];

  function isExpandable(): boolean | undefined {
    if (containerRef.current && paragraphRef.current) {
      const conth = containerRef.current.clientHeight;
      const parah = parseInt(getComputedStyle(paragraphRef.current).lineHeight);

      const lineCount = conth / parah;
      return lineCount > 3;
    }
  }
  useEffect(() => {
    isExpandable() === true ? setExpandedable(true) : setExpandedable(false);
  }, []);

  // useEffect(() => {
  //   let handler = (event: MouseEvent) => {
  //     if (
  //       optionRef.current &&
  //       !optionRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const closeEdit = () => {
    setEditActive(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  async function handleLikeDislike(action: string) {
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
      revalPath("/explore/" + post.id);
      toast.success(msg.message);
    }
  }

  return (
    <>
      <div
        className="mb-4 ml-1 flex w-fit cursor-pointer flex-row items-center duration-300 hover:underline"
        onClick={() => {
          router.push("/explore");
        }}
      >
        <ArrowLeftCircle className="mr-3 h-8 w-8 " />
        <p className=" font-semibold">Back to explore</p>
      </div>
      <GradiantCard className="mb-1.5 grow" variant="clean">
        {editActive ? (
          <EditForm post={post} onCancel={() => closeEdit()} />
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <p className="font-heading text-3xl">{post?.title}</p>
                {currUser &&
                  currUser.username === user?.username &&
                  !editActive && (
                    <div className="mt-3 flex cursor-pointer flex-row">
                      <div
                        className="relative inline-block text-left"
                        ref={optionRef}
                      >
                        <button
                          type="button"
                          className="flex h-5 w-5 items-center justify-center rounded-full transition-all ease-in-out hover:text-navy-300 hover:duration-300 focus:outline-none"
                          onClick={handleClick}
                        >
                          <MoreVertical />
                        </button>
                        {isOpen && (
                          <div className="absolute right-0 mt-2 w-40 origin-top-right ">
                            <div
                              className="rounded-lg bg-lblack py-1"
                              role="none"
                            >
                              <button
                                className="block px-4 py-2 hover:text-navy-300 hover:duration-300"
                                onClick={() => {
                                  setEditActive(!editActive);
                                  setIsOpen(!isOpen);
                                }}
                              >
                                <div className="flex flex-row items-center gap-2">
                                  <Edit3 strokeWidth={2} className="h-5 w-5" />
                                  <p>Edit</p>
                                </div>
                              </button>
                              <DialogFit
                                title="Delete Post"
                                triggerChild={
                                  <div className="flex flex-row items-center gap-2 px-4 py-2 hover:text-red-400 hover:duration-300">
                                    <Trash2 className="h-5 w-5 ease-in-out" />
                                    <p>Delete</p>
                                  </div>
                                }
                              >
                                <DeletePost postId={post.id} />
                              </DialogFit>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
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
            </div>

            <div className="mb-8 mt-4 flex flex-col" ref={containerRef}>
              <p
                className={`${expanded || !expandedable ? "" : "line-clamp-3"}`}
                ref={paragraphRef}
              >
                {post.body}
              </p>
              <span>
                {expandedable && (
                  <button
                    onClick={toggleExpand}
                    className="font-bold text-navy-300 transition-all ease-in-out hover:underline hover:duration-300"
                  >
                    {!expanded ? "See more" : "See less"}
                  </button>
                )}
              </span>
            </div>
            <div>
              {post.image && (
                <Image
                  src={post.image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="mt-2 h-auto  w-auto"
                />
              )}
            </div>

            <div
              className={`${
                post.tags.length === 0 ? "mt-9" : "mt-4"
              } flex flex-row items-center`}
            >
              <div className="mr-4 flex flex-row items-center gap-2">
                {loading ? (
                  <div className="mr-3 mt-10 flex">
                    <LoadingDots color="#FAFAFA" />
                  </div>
                ) : (
                  <>
                    <button onClick={async () => handleLikeDislike("like")}>
                      <ArrowBigUp
                        size={32}
                        strokeWidth={0.5}
                        className={cn(
                          "transition-all ease-in-out hover:duration-300",
                          like
                            ? "fill-green-600"
                            : "fill-none hover:fill-green-600"
                        )}
                      />
                    </button>
                    <p>{post.likes.length - post.dislikes.length}</p>
                    <button onClick={async () => handleLikeDislike("dislike")}>
                      <ArrowBigDown
                        size={32}
                        strokeWidth={0.5}
                        className={cn(
                          "transition-all ease-in-out hover:duration-300",
                          dislike
                            ? "fill-red-600"
                            : "fill-none hover:fill-red-600"
                        )}
                      />
                    </button>
                  </>
                )}
              </div>
              {!isStarred && currUser && !favourite && (
                <button
                  onClick={async () => {
                    setStarLoading(true);
                    const fields = {
                      postId: post.id,
                    };
                    const set = await fetch("/explore/stg/api/favourite", {
                      method: "POST",
                      body: JSON.stringify(fields),
                    });
                    const msg = await set.json();
                    if (!set.ok) {
                      toast.error(msg.message);
                      setStarLoading(false);
                    } else {
                      setFavourite(true);
                      setStarLoading(false);
                      toast.success(msg.message);
                      revalPath("/explore" + post.id);
                    }
                  }}
                >
                  {starLoading ? (
                    <div className="mb-1.5">
                      <LoadingDots color="#FAFAFA" />
                    </div>
                  ) : (
                    <Star
                      className="transition-all ease-in-out  hover:text-yellow-300 hover:duration-300"
                      strokeWidth={1}
                      size={24}
                    />
                  )}
                </button>
              )}
              {isStarred && currUser && favourite && (
                <button
                  onClick={async () => {
                    setStarLoading(true);
                    const fields = {
                      postId: post.id,
                    };
                    const set = await fetch("/explore/stg/api/unfavourite", {
                      method: "POST",
                      body: JSON.stringify(fields),
                    });
                    const msg = await set.json();
                    if (!set.ok) {
                      toast.error(msg.message);
                      setStarLoading(false);
                    } else {
                      revalPath("/explore" + post.id);
                      setFavourite(false);
                      setStarLoading(false);
                      toast.success(msg.message);
                    }
                  }}
                >
                  {starLoading ? (
                    <div className="mb-1.5">
                      <LoadingDots color="#FAFAFA" />
                    </div>
                  ) : (
                    <Star
                      color="#FACC18"
                      size={24}
                      strokeWidth={2}
                      className="fill-yellow-300"
                    />
                  )}
                </button>
              )}
              <p className="ml-2 mr-8 flex">
                {post?.favourites.length >= 1000
                  ? `${
                      (post?.favourites.length -
                        (post?.favourites.length % 100)) /
                      1000
                    }k`
                  : post?.favourites.length || 0}
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
          </>
        )}
      </GradiantCard>
    </>
  );
};

export default PostContent;
