import getCurrentUser from "@/lib/actions/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prismadb";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { PanelTopClose } from "lucide-react";
import PostList from "@/components/explore/post/post-list";
import PostContainer from "@/components/explore/post/post-container";

async function getRandomUser() {
  const currentUser = await getCurrentUser();
  const productsCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * productsCount);

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
  const randomUser = await getRandomUser();

  return (
    <div className="relative flex w-full gap-1.5">
      <GradiantCard
        className="sticky top-14 hidden h-72 w-0 max-w-[4rem] rounded-3xl sm:block md:w-full"
        variant="clean"
      >
        <PanelTopClose className="h-4 w-4" />
      </GradiantCard>
      <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[2000px]">
        {currentUser && <PostContainer currUser={currentUser} />}
        <PostList />
      </div>
      <GradiantCard
        className="sticky top-14 hidden h-full max-h-[90vh] rounded-3xl md:block"
        variant="clean"
      >
        <h2 className="font-heading text-xl font-bold tracking-wide">
          Connect with other players
        </h2>

        <ul className="mt-3 flex flex-col gap-3">
          {randomUser.map((user) => (
            <li key={user.id} className="flex gap-3">
              <Image
                src={user.image || "/nana.jpg"}
                alt={user.name as string}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div className="-space-y-1">
                <Link
                  className="cursor-pointer duration-300 hover:underline hover:decoration-white hover:underline-offset-2"
                  href={`/profile/${user.username}`}
                  target="_blank"
                >
                  {user.username}
                </Link>
                <p className="text-gray-500">{user.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </GradiantCard>
    </div>
  );
}
