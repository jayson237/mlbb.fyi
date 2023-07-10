"use client";

import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

import { Comment } from "@prisma/client";
import { fetcher } from "@/lib/fetcher-utils";

import { Edit3, Trash2 } from "lucide-react";
import DelComment from "./del-comment";
import EditCommentForm from "./edit-comment-form";
import DialogFit from "@/components/shared/dialog-fit";

interface CommentBoxProps {
  comment: Comment;
  postId: string;
  userId?: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment, postId, userId }) => {
  const { data: image } = useSWR(["/api/comment/pic", comment.userId], fetcher);
  const [editActive, setEditActive] = useState<boolean>(false);

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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const closeEdit = () => {
    setEditActive(false);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="mb-3 mt-8 flex flex-row items-center">
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
          <Link href={`/profile/${comment.createdBy}/statistics`}>
            <p className="font-heading text-xl">{comment?.createdBy}</p>
          </Link>
        </div>
        {userId === comment.userId && (
          <div className="mt-3 flex flex-row">
            <button onClick={() => setEditActive(!editActive)}>
              {editActive ? (
                <Edit3 className="mr-5 h-5 w-5" />
              ) : (
                <Edit3 className="mr-5 h-5 w-5 ease-in-out hover:text-navy-400 hover:duration-300" />
              )}
            </button>
            <DialogFit
              title="Delete Comment"
              triggerChild={
                <Trash2 className="h-5 w-5 ease-in-out hover:text-red-400 hover:duration-300" />
              }
            >
              <DelComment commentId={comment.id} />
            </DialogFit>
          </div>
        )}
      </div>
      {editActive ? (
        <div className="mb-8 ml-16 grow">
          <EditCommentForm
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
    </>
  );
};

export default CommentBox;
