import getCurrentUser from "@/lib/actions/getCurrentUser";
import Image from "next/image";
import getUser from "@/lib/actions/getUser";
import getCurrentPost from "@/lib/actions/getCurrentPost";
import CommentForm from "@/components/explore/comment-form";
import CommentList from "@/components/explore/comment-list";
import PostPageBox from "@/components/explore/post-page-box";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getCurrentPost(params.postId);
  const currUser = await getCurrentUser();

  if (post) {
    const user = await getUser(post.createdBy);
    return (
      <div>
        <PostPageBox post={post} user={user} currUser={currUser?.username} />
        {currUser && (
          <div className="mb-3 mt-8 flex flex-row">
            <div>
              <Image
                src={
                  currUser?.image?.split("/image/upload/")[0] +
                    "/image/upload/c_fill,h_150,w_150/" +
                    currUser?.image?.split("/image/upload/")[1] || "/nana.jpg"
                }
                alt=""
                width={40}
                height={40}
                className="mr-4 items-start object-none object-left"
                placeholder="blur"
                blurDataURL={
                  currUser?.image?.split("/image/upload/")[0] +
                  "/image/upload/e_blur:400,h_100,w_100/" +
                  currUser?.image?.split("/image/upload/")[1]
                }
              />
            </div>
            <div className="mt-4 grow">
              <CommentForm postId={params.postId} />
            </div>
          </div>
        )}
        <CommentList postId={params.postId} userId={currUser?.id} />
      </div>
    );
  }

  return <div>Post does not exist</div>;
}
