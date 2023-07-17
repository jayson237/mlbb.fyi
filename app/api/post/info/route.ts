import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = req.url as string;
  const postId = url.split("?postId=")[1];
  if (!postId) {
    return NextResponse.json(
      {
        message: "There is no such post",
      },
      {
        status: 400,
      }
    );
  }

  const postInfo = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      likes: true,
      dislikes: true,
      favourites: true,
    },
  });

  if (!postInfo) {
    return NextResponse.json(
      {
        message: "Unable to retrieve post info",
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(postInfo);
}
