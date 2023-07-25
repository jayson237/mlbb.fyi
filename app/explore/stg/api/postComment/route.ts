import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { postId, message }: { postId: string; message: string } =
    await req.json();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Please log in first",
      },
      {
        status: 400,
      }
    );
  }

  if (!currentUser.username) {
    return NextResponse.json(
      {
        message: "Please set username first",
      },
      {
        status: 400,
      }
    );
  }

  const set = await prisma.comment.create({
    data: {
      body: message,
      userId: currentUser?.id,
      postId: postId,
      createdBy: currentUser.username,
      userImage: currentUser.image,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error adding comment. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successful comment!",
    },
    {
      status: 200,
    }
  );
}
