"use client";

import React from "react";
import { Comment } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import CommentBox from "./comment-box";
import Loading from "@/components/shared/loading";

interface CommentListProps {
  postId: string;
  userId?: string;
  comments: any;
}

const CommentList: React.FC<CommentListProps> = ({
  postId,
  userId,
  comments,
}) => {
  if (!comments || comments.length === 0) {
    return null;
  }

  if (comments) {
    return (
      <GradiantCard variant="clean" className=" mt-1.5">
        <ul role="list">
          {comments.map((comment: Comment, index: number) => (
            <React.Fragment key={comment.id}>
              <CommentBox comment={comment} postId={postId} userId={userId} />
              {index !== comments.length - 1 && (
                <div className="absolute inset-x-[1px] h-0.5 w-full bg-navy-400/30"></div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </GradiantCard>
    );
  }

  return <Loading />;
};

export default CommentList;
