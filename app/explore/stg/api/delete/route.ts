import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId }: { postId: string } = await req.json();

  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  const deletePost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  if (!getPost || !deletePost)
    return NextResponse.json(
      {
        message: "Error deleting post, please try again",
      },
      {
        status: 400,
      }
    );

  for (const x of getPost?.favourites as string[]) {
    const user = await prisma.user.findFirst({
      where: {
        id: x,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Error deleting post, please try again",
        },
        {
          status: 400,
        }
      );
    }

    const updatedList = user?.favourite.filter((id) => id !== getPost.id);

    const setUpdate = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favourite: updatedList,
      },
    });

    if (!setUpdate) {
      return NextResponse.json(
        {
          message: "Error deleting post, please try again",
        },
        {
          status: 400,
        }
      );
    }
  }

  return NextResponse.json(
    {
      message: "Successful! Please wait for to be redirected",
    },
    {
      status: 200,
    }
  );
}
