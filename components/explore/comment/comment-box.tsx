"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

import { postFetcher } from "@/lib/utils";
import { IFullComment } from "@/types";

import {
  ArrowBigDown,
  ArrowBigUp,
  Edit3,
  MessagesSquare,
  MoreVertical,
  Reply,
  Trash2,
} from "lucide-react";
import DelComment from "./del-comment";
import EditCommentForm from "./edit-comment-form";
import DialogFit from "@/components/shared/dialog-fit";
import ReplyForm from "../reply/reply-form";
import ReplyList from "../reply/reply-list";
import LoadingDots from "@/components/shared/icons/loading-dots";
import TimeStamp from "@/components/shared/time-stamp";

interface CommentBoxProps {
  comment: IFullComment;
  postId: string;
  userId?: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment, postId, userId }) => {
  const isLiked = comment?.likes.includes(userId as string);
  const isDisliked = comment?.dislikes.includes(userId as string);

  const [like, setLike] = useState<boolean>(isLiked);
  const [dislike, setDislike] = useState<boolean>(isDisliked);

  const [totalVotes, setTotalVotes] = useState<number>(comment.totalVotes);
  const [loading, setLoading] = useState(false);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [isAddingReply, setIsAddingReply] = useState<boolean>(false);
  const [isEnableReplyList, setIsEnableReplyList] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedable, setExpandedable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  function isExpandable(): boolean | undefined {
    if (containerRef.current && paragraphRef.current) {
      const conth = containerRef.current.clientHeight;
      const parah = parseInt(getComputedStyle(paragraphRef.current).lineHeight);
      const lineCount = conth / parah;
      return lineCount > 2;
    }
  }

  useEffect(() => {
    isExpandable() === true ? setExpandedable(true) : setExpandedable(false);
  }, []);

  // useEffect(() => {
  //   let handler = (event: MouseEvent) => {
  //     if (
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

  const dateTime = comment.createdAt.toString().split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="mb-3 mt-8 flex flex-row items-center">
          <Image
            src={
              comment.userImage === ""
                ? "/nana.jpg"
                : comment.userImage?.includes("/image/upload")
                ? `${
                    comment.userImage?.split("/image/upload/")[0]
                  }/image/upload/c_fill,h_150,w_150/${
                    comment.userImage?.split("/image/upload/")[1]
                  }`
                : comment.userImage || "/nana.jpg"
            }
            alt=""
            width={48}
            height={48}
            className="mr-4 h-12 w-12 rounded-full object-none object-left"
            placeholder="blur"
            blurDataURL={
              comment.userImage?.split("/image/upload/")[0] +
              "/image/upload/e_blur:400,h_100,w_100/" +
              comment.userImage?.split("/image/upload/")[1]
            }
          />

          <Link href={`/profile/${comment.createdBy}/statistics`}>
            <p className="text-lg mt-0.5 font-heading hover:underline">
              {comment?.createdBy}
            </p>
          </Link>
          <div className="mb-2.5 ml-4">
            <TimeStamp date={date.split("-")} time={time.split(":")} />
          </div>
        </div>
        {userId === comment.userId && !editActive && (
          <div className="mb-8 mt-3 flex cursor-pointer flex-row">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center rounded-full transition-all ease-in-out hover:text-navy-300 hover:duration-300 focus:outline-none"
                onClick={handleClick}
              >
                <MoreVertical />
              </button>
              {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right">
                  <div className="rounded-lg bg-lblack py-1" role="none">
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
                      title="Delete Comment"
                      triggerChild={
                        <div className="flex flex-row items-center gap-2 px-4 py-2 hover:text-red-400 hover:duration-300">
                          <Trash2 className="h-5 w-5 ease-in-out" />
                          <p>Delete</p>
                        </div>
                      }
                    >
                      <DelComment commentId={comment.id} />
                    </DialogFit>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {editActive ? (
        <div className="mb-8 ml-16 grow">
          <EditCommentForm
            postId={postId}
            commentId={comment.id}
            commentBody={comment?.body}
            onCancel={closeEdit}
          />
        </div>
      ) : (
        <>
          <div className="mb-8 ml-16 flex flex-col" ref={containerRef}>
            <p
              className={`${expanded || !expandedable ? "" : "line-clamp-2"}`}
              ref={paragraphRef}
            >
              {comment.body}
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
        </>
      )}
      <div className="mb-4 flex flex-row items-center gap-5 ">
        <div className="flex flex-row items-center gap-2">
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
                className="h-6 w-6
                transition-all ease-in-out hover:text-green-600 hover:duration-300 md:h-8 md:w-8"
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
                className="h-6 w-6 fill-green-600
                md:h-8 md:w-8"
              />
            </button>
          )}
          {!loading && (
            <p className="text-[10px] md:text-sm">
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
                className="h-6 w-6
                transition-all ease-in-out hover:text-red-600 hover:duration-300 md:h-8 md:w-8"
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
                className="h-6 w-6 fill-red-600 md:h-8 md:w-8"
              />
            </button>
          )}
        </div>
        {comment.replies && comment.replies.length !== 0 && (
          <div>
            <button
              className="flex cursor-pointer flex-row items-center transition-all ease-in-out hover:text-navy-300 hover:duration-300"
              onClick={() => setIsEnableReplyList(!isEnableReplyList)}
            >
              <MessagesSquare className="mr-2 h-5 w-5" />

              <p className="text-[10px] md:text-sm">
                {isEnableReplyList ? "Unshow" : "Show"} {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </p>
            </button>
          </div>
        )}
        <div>
          <button
            className="flex cursor-pointer flex-row items-center transition-all ease-in-out hover:text-navy-300 hover:duration-300"
            onClick={() => setIsAddingReply(!isAddingReply)}
          >
            <Reply className="mr-2 h-5 w-5" />
            <p className="text-[10px] md:text-sm">Reply</p>
          </button>
        </div>
      </div>
      {isAddingReply && (
        <div className="mt-2">
          <ReplyForm
            postId={postId}
            commentId={comment.id}
            onReplied={() => setIsAddingReply(false)}
          />
        </div>
      )}
      {isEnableReplyList && comment.replies && (
        <ReplyList userId={userId} postId={postId} replies={comment.replies} />
      )}
    </>
  );
};

export default CommentBox;
