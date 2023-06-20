"use client";

import { Comment } from "@prisma/client";
import CommentBox from "./comment-box";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher-utils";
import Loading from "../../shared/loading";

interface CommentListProps {
  postId: string;
  userId?: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId, userId }) => {
  const { data: comments } = useSWR(["/api/comment/list", postId], fetcher);

  if (comments) {
    return (
      <ul role="list" className="divide-y divide-gray-100/50">
        {comments.map((comment: Comment) => (
          <CommentBox
            key={comment.id}
            comment={comment}
            postId={postId}
            userId={userId}
          />
        ))}
      </ul>
    );
  }

  return <Loading />;
};

export default CommentList;
