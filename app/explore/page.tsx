import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

import RandomUserContainer from "@/components/explore/random-user";
import PostListContainer from "@/components/explore/post/post-list-container";

async function getRandomUser() {
  const currentUser = await getCurrentUser();
  const productsCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * Math.min(productsCount, 10));

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: {
          in: [
            ...(currentUser?.id ? [currentUser.id] : []),
            ...(currentUser?.following || []),
          ],
        },
      },
      username: {
        not: null,
      },
    },
    take: 5,
    skip: skip,
    orderBy: {
      name: "desc",
    },
  });

  return users;
}

export default async function ExplorePage() {
  const currentUser = await getCurrentUser();
  const randomUsers = await getRandomUser();

  return (
    <div className="relative flex w-full gap-1.5">
      <PostListContainer currentUser={currentUser} />
      <RandomUserContainer randomUsers={randomUsers} />
    </div>
  );
}
