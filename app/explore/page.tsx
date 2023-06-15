import PostList from "@/components/explore/post-list";
import PostTopBar from "@/components/explore/post-top-bar";
import getCurrentUser from "@/lib/actions/getCurrentUser";

async function ExplorePage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <div>
        <PostTopBar currUser={currentUser?.id} />
      </div>
      <div>
        <PostList />
      </div>
    </>
  );
}

export default ExplorePage;
