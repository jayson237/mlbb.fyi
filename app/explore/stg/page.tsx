import PostForm from "@/components/explore/post-form";
import getCurrentUser from "@/lib/actions/getCurrentUser";
async function PostingPage() {
  const currentUser = await getCurrentUser();

  return (
    <main>
      <PostForm currentUser={currentUser} />
    </main>
  );
}

export default PostingPage;
