import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const {
    postId,
    commentId,
    message,
  }: { postId: string; commentId: string; message: string } = await req.json();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Username already exists",
      },
      {
        status: 400,
      }
    );
  }

  const set = await prisma.reply.create({
    data: {
      body: message,
      userId: currentUser?.id,
      postId: postId,
      commentId: commentId,
      createdBy: currentUser?.username,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error adding reply. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successful reply!",
    },
    {
      status: 200,
    }
  );
}
