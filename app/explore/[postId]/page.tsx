import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import getCurrentPost from "@/lib/actions/getCurrentPost";

import Post from "@/components/explore/post";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const postId = params.postId;
  const post = await getCurrentPost(postId);
  const currentUser = await getCurrentUser();

  if (post) {
    const user = await getUser(post.createdBy);
    return <Post currentUser={currentUser} post={post} user={user} />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="mb-48 font-heading text-2xl md:ml-3">
        Post does not exist...
      </p>
    </div>
  );
}
