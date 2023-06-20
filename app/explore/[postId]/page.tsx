import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import getCurrentPost from "@/lib/actions/getCurrentPost";
import CommentForm from "@/components/explore/comment/comment-form";
import CommentList from "@/components/explore/comment/comment-list";
import PostContent from "@/components/explore/post/post-content";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getCurrentPost(params.postId);
  const currUser = await getCurrentUser();
  const img = currUser?.image;

  if (post) {
    const user = await getUser(post.createdBy);
    return (
      <div>
        <PostContent post={post} user={user} currUser={currUser} />
        {currUser && <CommentForm postId={params.postId} img={img || ""} />}
        <CommentList postId={params.postId} userId={currUser?.id} />
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="mb-48 font-heading text-2xl md:ml-3">
        Post does not exist...
      </p>
    </div>
  );
}
