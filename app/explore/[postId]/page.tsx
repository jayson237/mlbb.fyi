import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";

import Post from "@/components/explore/post";
import { IFullPost } from "@/types";

async function getPost(postId: string) {
  const get = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/info?postId=${postId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  return await get.json();
}

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const postId = params.postId;
  const post: IFullPost = await getPost(postId);
  const currentUser = await getCurrentUser();

  // console.log(post);
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
