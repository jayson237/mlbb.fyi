import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId }: { postId: string } = await req.json();
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
          message: "There is no such post",
        },
        {
          status: 400,
        }
      );
    }

    const comments = await prisma?.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        totalVotes: "desc",
      },
    });

    if (!comments) {
      return NextResponse.json(
        {
          message: "Cannot retrieve comments",
        },
        {
          status: 400,
        }
      );
    }

    const fields = {
      info: postInfo,
      comments: comments,
    };
    // console.log(fields);
    return NextResponse.json(fields);
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        message: "An error occured",
      },
      {
        status: 400,
      }
    );
  }
}
