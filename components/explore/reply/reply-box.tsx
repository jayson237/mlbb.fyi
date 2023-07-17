// @ts-nocheck
"use client";

import { postFetcher } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Reply } from "@prisma/client";
import {
  ArrowBigDown,
  ArrowBigUp,
  Edit3,
  MoreVertical,
  Trash2,
} from "lucide-react";
import DialogFit from "@/components/shared/dialog-fit";
import EditReplyForm from "./edit-reply-form";
import DelReplyButton from "./del-reply";
import { toast } from "sonner";
import LoadingDots from "@/components/shared/icons/loading-dots";
import TimeStamp from "@/components/shared/time-stamp";

interface ReplyBoxProps {
  reply: Reply;
  commentId: string;
  userId?: string;
}
const ReplyBox: React.FC<ReplyBoxProps> = ({ reply, commentId, userId }) => {
  const { data: image } = useSWR(
    ["/api/comment/pic", reply.userId],
    postFetcher
  );

  const [editActive, setEditActive] = useState<boolean>(false);

  const isLiked = reply?.likes.includes(userId as string);
  const isDisliked = reply?.dislikes.includes(userId as string);

  const [like, setLike] = useState<boolean>(isLiked);
  const [dislike, setDislike] = useState<boolean>(isDisliked);

  const [totalVotes, setTotalVotes] = useState<number>(reply.totalVotes);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedable, setExpandedable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const optionRef = useRef();

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

  const dateTime = reply.createdAt.toString().split("T");
  const date = dateTime[0];
  const time = dateTime[1].split(".")[0];

  return (
    <>
      <div className="mb-8 ml-5 mr-2 mt-4 flex-auto rounded-lg bg-gray-400/5 px-4 py-2">
        <div className="flex flex-row items-center justify-between">
          <div className="mb-3 mt-4 flex flex-row items-center">
            {image && (
              <Image
                src={
                  image?.split("/image/upload/")[0] +
                    "/image/upload/c_fill,h_150,w_150/" +
                    image?.split("/image/upload/")[1] || "/nana.jpg"
                }
                alt=""
                width={48}
                height={48}
                className="mr-4 rounded-full object-none object-left"
                placeholder="blur"
                blurDataURL={
                  image?.split("/image/upload/")[0] +
                  "/image/upload/e_blur:400,h_100,w_100/" +
                  image?.split("/image/upload/")[1]
                }
              />
            )}
            <Link href={`/profile/${reply.createdBy}/statistics`}>
              <p className="text-md font-heading">{reply?.createdBy}</p>
            </Link>
            <div className="mb-3 ml-4">
              <TimeStamp date={date.split("-")} time={time.split(":")} />
            </div>
          </div>
          {userId === reply.userId && !editActive && (
            <div className="mb-12 mt-3 flex cursor-pointer flex-row">
              <div className="relative inline-block text-left" ref={optionRef}>
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
                        title="Delete Post"
                        triggerChild={
                          <div className="flex flex-row items-center gap-2 px-4 py-2 hover:text-red-400 hover:duration-300">
                            <Trash2 className="h-5 w-5 ease-in-out" />
                            <p>Delete</p>
                          </div>
                        }
                      >
                        <DelReplyButton replyId={reply.id} />
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
            <EditReplyForm
              replyId={reply.id}
              replyBody={reply.body}
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
                {reply.body}
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
        <div className="flex flex-row items-center gap-5">
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
                    replyId: reply.id,
                  };
                  const set = await fetch("/explore/stg/api/repLike", {
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
                    replyId: reply.id,
                  };
                  const set = await fetch("/explore/stg/api/repLike", {
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
                  className="h-6 w-6
                  fill-green-600 md:h-8 md:w-8"
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
                    replyId: reply.id,
                  };
                  const set = await fetch("/explore/stg/api/repDislike", {
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
                    replyId: reply.id,
                  };
                  const set = await fetch("/explore/stg/api/repDislike", {
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
                  className="h-6 w-6
                  fill-red-600 md:h-8 md:w-8"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyBox;
