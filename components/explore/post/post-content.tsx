// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

import { ArrowBigDown } from "lucide-react";
import { ArrowBigUp } from "lucide-react";
import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";

import {
  ArrowLeftCircle,
  Edit3,
  MessageCircle,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react";

import DeletePost from "./del-post";
import EditForm from "./edit-form";
import TimeStamp from "@/components/shared/time-stamp";
import { GradiantCard } from "@/components/shared/gradiant-card";
import LoadingDots from "@/components/shared/icons/loading-dots";
import DialogFit from "@/components/shared/dialog-fit";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher-utils";

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
  const [totalVotes, setTotalVotes] = useState<number>(post.totalVotes);

  const { data: image } = useSWR(["/api/postPic", post.id], fetcher);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [favourite, setFavourite] = useState(isStarred);
  const [loading, setLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedable, setExpandedable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const optionRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const dateTime = post.createdAt.toISOString().split("T");
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

  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const closeEdit = () => {
    setEditActive(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="mb-4 ml-1 flex cursor-pointer flex-row items-center"
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
                              className="rounded-lg bg-gray-400/5 py-1"
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
                {currUser &&
                  currUser.username !== user?.username &&
                  !favourite && (
                    <button
                      onClick={async () => {
                        setLoading(true);
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
                          setLoading(false);
                        } else {
                          setFavourite(true);
                          setLoading(false);
                          window.location.reload();
                          toast.success(msg.message);
                        }
                      }}
                    >
                      {loading ? (
                        <LoadingDots color="#FAFAFA" />
                      ) : (
                        <Star className="transition-all duration-300 ease-in-out hover:fill-yellow-300 hover:text-yellow-300" />
                      )}
                    </button>
                  )}
                {currUser &&
                  currUser.username !== user?.username &&
                  favourite && (
                    <button
                      onClick={async () => {
                        setLoading(true);
                        const fields = {
                          postId: post.id,
                        };
                        const set = await fetch(
                          "/explore/stg/api/unfavourite",
                          {
                            method: "POST",
                            body: JSON.stringify(fields),
                          }
                        );
                        const msg = await set.json();
                        if (!set.ok) {
                          toast.error(msg.message);
                          setLoading(false);
                        } else {
                          setFavourite(false);
                          setLoading(false);
                          window.location.reload();
                          toast.success(msg.message);
                        }
                      }}
                    >
                      {loading ? (
                        <LoadingDots color="#FAFAFA" />
                      ) : (
                        <Star
                          color="#FACC18"
                          strokeWidth={2}
                          className="fill-yellow-300"
                        />
                      )}
                    </button>
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
                  className="h-auto w-auto"
                />
              )}
            </div>
            <div
              className={`${
                post.tags.length === 0 ? "mt-9" : "mt-4"
              } flex flex-row items-center`}
            >
              <div className="mr-4 flex flex-row items-center gap-2">
                {loading && (
                  <div className="flex">
                    <LoadingDots color="#FAFAFA" />
                  </div>
                )}
                {!loading && !like && (
                  <button
                    onClick={async () => {
                      setLoading(true);
                      const fields = {
                        commentId: comment.id,
                      };
                      const set = await fetch("/explore/stg/api/comLike", {
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
                      strokeWidth={0.5}
                      className="
                h-8 w-8 transition-all ease-in-out hover:text-green-600 hover:duration-300"
                    />
                  </button>
                )}
                {!loading && like && (
                  <button
                    onClick={async () => {
                      setLoading(true);
                      const fields = {
                        commentId: comment.id,
                      };
                      const set = await fetch("/explore/stg/api/comLike", {
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
                    <ArrowBigUp
                      strokeWidth={0}
                      className=" h-8
                w-8 fill-green-600"
                    />
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
                        commentId: comment.id,
                      };
                      const set = await fetch("/explore/stg/api/comDislike", {
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
                      strokeWidth={0.5}
                      className="
                h-8 w-8 transition-all ease-in-out hover:text-red-600 hover:duration-300"
                    />
                  </button>
                )}
                {!loading && dislike && (
                  <button
                    onClick={async () => {
                      setLoading(true);
                      const fields = {
                        commentId: comment.id,
                      };
                      const set = await fetch("/explore/stg/api/comDislike", {
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
                    <ArrowBigDown
                      strokeWidth={0}
                      className=" h-8 w-8 fill-red-600"
                    />
                  </button>
                )}
              </div>
              {!isStarred ? (
                <Star size={20} strokeWidth={0.5} />
              ) : (
                <Star
                  size={20}
                  color="#FACC18"
                  strokeWidth={2}
                  className="fill-yellow-300"
                />
              )}
              <p className="ml-2 mr-8 flex">
                {post.favourites.length >= 1000
                  ? `${
                      (post.favourites.length -
                        (post.favourites.length % 100)) /
                      1000
                    }k`
                  : post.favourites.length}
              </p>

              <MessageCircle size={20} strokeWidth={0.5} />
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
