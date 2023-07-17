"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";

import {
  ArrowLeftCircle,
  Edit3,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react";

import DeletePost from "./del-post";
import EditForm from "./edit-form";
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
  const isStarred = currUser?.favourite.includes(post.id as string);
  const { data: image } = useSWR(["/api/postPic", post.id], fetcher);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [favourite, setFavourite] = useState(isStarred);
  const [loading, setLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedable, setExpandedable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const [isOpen, setIsOpen] = useState(false);

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
              <div className="flex flex-row items-start justify-between">
                <p className="font-heading text-3xl">{post?.title}</p>
                {currUser &&
                  currUser.username === user?.username &&
                  !editActive && (
                    <div className="mt-3 flex cursor-pointer flex-row">
                      <div className="relative inline-block text-left">
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
              <div className="flex flex-row items-center font-medium text-gray-500">
                <p className="mr-1">by</p>
                <Link href={`/profile/${post.createdBy}/statistics`}>
                  <p className="hover:text-navy-300 hover:underline">
                    {post?.createdBy}
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
            <div className="my-4 flex flex-row gap-x-1">
              <p className="text-lg font-sat font-semibold">
                {comments && comments.length ? comments.length : 0}
              </p>
              <p className="text-lg mt-[2px] font-heading">
                {comments && comments.length < 2 ? "Comment" : "Comments"}
              </p>
            </div>
          </>
        )}
      </GradiantCard>
    </>
  );
};

export default PostContent;
