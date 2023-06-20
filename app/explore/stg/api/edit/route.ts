import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const {
    title,
    message,
    post,
  }: { title: string; message: string; post: Post } = await req.json();

  const findPost = await prisma.post.findFirst({
    where: {
      title: title,
      userId: currentUser?.id,
    },
  });

  if (findPost && post.body === message) {
    return NextResponse.json(
      {
        message: "You have already have that title. Please use another title.",
      },
      {
        status: 400,
      }
    );
  }

  const set = await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      title: title,
      body: message,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error editing post. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Edit Successful!",
    },
    {
      status: 200,
    }
  );
}
