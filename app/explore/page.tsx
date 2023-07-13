import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

import RandomUserContainer from "@/components/explore/random-user-container";
import PostListContainer from "@/components/explore/post/post-list-container";

async function getInitialRandomUser() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/explore/stg/api/getRandomUser`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function ExplorePage() {
  const currentUser = await getCurrentUser();
  const randomUsers = await getInitialRandomUser();

  return (
    <div className="relative flex w-full gap-1.5">
      <PostListContainer currentUser={currentUser} />
      <RandomUserContainer randomUsers={randomUsers.users} />
    </div>
  );
}
