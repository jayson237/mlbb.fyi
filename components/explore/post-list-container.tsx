import { SafeUser } from "@/types";
import PostContainer from "./post/post-container";
import PostList from "./post/post-list";

interface PostListContainerProps {
  currentUser?: SafeUser | null;
}

const PostListContainer: React.FC<PostListContainerProps> = ({
  currentUser,
}) => {
  return (
    <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[2000px]">
      {currentUser && <PostContainer currUser={currentUser} />}
      <PostList />
    </div>
  );
};

export default PostListContainer;
