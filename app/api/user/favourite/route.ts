import prisma from "@/lib/prismadb";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        username: data,
      },
      select: {
        favourite: true,
      },
    });

    let posts: Post[] = [];

    for (const x of user?.favourite as string[]) {
      await prisma.post
        .findFirst({
          where: {
            id: x,
          },
        })
        .then((res) => {
          // @ts-ignore
          return posts.push(res);
        });
    }

    posts.reverse();

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
