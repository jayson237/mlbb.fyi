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

  // console.log(userId);
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
          </React.Fragment>
        ))}
      </ul>
    );
  }

  return <Loading />;
};

export default ReplyList;
