import PostList from "@/components/explore/post-list";
import PostTopBar from "@/components/explore/post-top-bar";
import { GradiantCard } from "@/components/shared/gradiant-card";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { PanelTopClose } from "lucide-react";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

async function getRandomUser() {
  const productsCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * productsCount);
  return await prisma.user.findMany({
    take: 5,
    skip: skip,
    orderBy: {
      name: "desc",
    },
  });
}

async function ExplorePage() {
  const currentUser = await getCurrentUser();
  const randomUser = await getRandomUser();
  if (!currentUser) return null;

  return (
    <div className="relative flex w-full gap-1.5">
      <GradiantCard
        className="sticky top-14 h-72 w-0 max-w-[4rem] rounded-3xl md:w-full"
        variant="clean"
      >
        <PanelTopClose className="h-4 w-4" />
      </GradiantCard>
      <div className="no-scrollbar max-h-[90vh] w-full overflow-scroll md:w-[1720px]">
        <PostTopBar currUser={currentUser} />
        <PostList />
      </div>
      <GradiantCard
        className="sticky top-14 h-full max-h-[90vh] w-36 rounded-3xl"
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
                className="rounded-full"
              />
              <div className="-space-y-1">
                <Link
                  className="cursor-pointer duration-300 hover:underline hover:decoration-white hover:underline-offset-2"
                  href={`/profile/${user.username}`}
                  target="_blank"
                >
                  {user.name}
                </Link>
                <p className="text-stone-600">@{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      </GradiantCard>
    </div>
  );
}

export default ExplorePage;
