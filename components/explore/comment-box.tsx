import { Comment } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher-utils";
import { Edit3, Trash2 } from "lucide-react";
import DelDialog from "./del-dialog";
import DelCommentButton from "./del-comment-button";

interface CommentBoxProps {
  comment: Comment;
  userId?: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment, userId }) => {
  const { data: image } = useSWR(["/api/comment/pic", comment.userId], fetcher);

  return (
    <div>
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
              width={40}
              height={40}
              className="mr-4 object-none object-left"
              placeholder="blur"
              blurDataURL={
                image?.split("/image/upload/")[0] +
                "/image/upload/e_blur:400,h_100,w_100/" +
                image?.split("/image/upload/")[1]
              }
            />
          )}
          <Link href={`/profile/${comment.createdBy}/statistics`}>
            <p className="font-semibold">{comment?.createdBy}</p>
          </Link>
        </div>
        {userId === comment.userId && (
          <div className="flex flex-row">
            <Edit3 className="mr-5" />
            <DelDialog title="Delete" triggerChild={<Trash2 />}>
              <p className="flex justify-center">
                Click the button below to confirm deletion
              </p>
              <DelCommentButton commentId={comment.id} />
            </DelDialog>
          </div>
        )}
      </div>
      <div className="mb-8 ml-14 whitespace-pre-line">
        <p>{comment?.body}</p>
      </div>
    </div>
  );
};

export default CommentBox;
