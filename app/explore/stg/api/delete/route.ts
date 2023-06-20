import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId }: { postId: string } = await req.json();

  const deletePost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  if (!deletePost)
    return NextResponse.json(
      {
        message: "Error deleting post, please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successful! Please wait for to be redirected",
    },
    {
      status: 200,
    }
  );
}
