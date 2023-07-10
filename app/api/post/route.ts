import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

function compare(a: Post, b: Post) {
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return 0;
}

export async function POST(req: Request) {
  try {
    const { filter, sortMode }: { filter: string; sortMode: string } =
      await req.json();

    let posts: Post[] = [];

    if (sortMode === "top") {
      posts = await prisma.post.findMany({
        orderBy: {
          totalVotes: "desc",
        },
      });
    } else if (sortMode === "follow") {
      posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      const currentUser = await getCurrentUser();

      let followingPosts = posts;
      let temp: Post[] = [];
      posts = [];

      for (const x of currentUser?.following as string[]) {
        temp = followingPosts.filter((post) => post.userId.includes(x));
        //console.log(temp);
        posts = [...posts, ...temp];
      }

      posts.sort(compare);
    } else {
      posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (filter) {
      const filteredPosts = posts?.filter((post) =>
        post.title.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredPosts.length !== 0) {
        return NextResponse.json(filteredPosts, {
          status: 200,
        });
      }

      return NextResponse.json("empty", {
        status: 200,
      });
    }

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
