"use client";

import React from "react";
import { Reply } from "@prisma/client";

import Loading from "@/components/shared/loading";
import ReplyBox from "./reply-box";

interface CommentListProps {
  userId?: string;
  replies: Reply[];
}

const ReplyList: React.FC<CommentListProps> = ({ userId, replies }) => {
  if (!replies || replies.length === 0) {
    return null;
  }

  console.log(replies);
  if (replies) {
    return (
      <ul role="list">
        {replies.map((reply: Reply, index: number) => (
          <React.Fragment key={reply.id}>
            <ReplyBox
              reply={reply}
              commentId={reply.commentId}
              userId={userId}
            />
            {index !== replies.length - 1 && (
              <div className="absolute inset-x-[1px] h-0.5 w-full bg-navy-400/30"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    );
  }

  return <Loading />;
};

export default ReplyList;
