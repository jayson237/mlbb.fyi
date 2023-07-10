import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { commentId }: { commentId: string } = await req.json();

  const deletePost = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  if (!deletePost)
    return NextResponse.json(
      {
        message: "Error deleting comment, please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successfully deleted comment!",
    },
    {
      status: 200,
    }
  );
}
