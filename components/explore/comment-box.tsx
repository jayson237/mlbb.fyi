import { Comment } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher-utils";

interface CommentBoxProps {
  comment: Comment;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {
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
      </div>
      <div className="mb-8 ml-14">
        <p>{comment?.body}</p>
      </div>
    </div>
  );
};

export default CommentBox;
