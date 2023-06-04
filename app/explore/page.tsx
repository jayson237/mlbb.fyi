import PostButton from "@/components/explore/post-button";
import PostList from "@/components/explore/post-list";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getPosts from "@/lib/actions/getPosts";

async function ExplorePage() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();

  return (
    <>
      <div className="flex flex-row gap-6">
        <div>Search Bar PlaceHolder </div>
        {currentUser && <PostButton />}
      </div>
      <div>{posts && <PostList items={posts} />}</div>
    </>
  );
}

export default ExplorePage;
